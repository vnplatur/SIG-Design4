// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';

/**
 * Real WebGL layer (Three.js).
 * A rotating point-cloud sphere ("investment network") + drifting particle haze,
 * with a subtle mouse-driven camera. Deliberately restrained: it sits behind the
 * hero video and reads as depth and light, not as a graphics demo.
 *
 * Performance guards:
 *  - DPR capped at 1.75
 *  - Pauses when the section scrolls out of view (IntersectionObserver)
 *  - Pauses on tab blur
 *  - Fully skipped under prefers-reduced-motion (static gradient remains)
 */
export default function WebGLField({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (disposed || !hostRef.current) return;

      const w = () => host.clientWidth;
      const h = () => host.clientHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050a18, 0.055);

      const camera = new THREE.PerspectiveCamera(52, w() / h(), 0.1, 100);
      camera.position.set(0, 0, 15);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(w(), h());
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const root = new THREE.Group();
      scene.add(root);

      /* ---------- 1. Point-cloud sphere (the "network") ---------- */
      const COUNT = 2600;
      const R = 6.2;
      const pos = new Float32Array(COUNT * 3);
      const col = new Float32Array(COUNT * 3);
      const cTeal = new THREE.Color(0x2dd4bf);
      const cWhite = new THREE.Color(0xffffff);
      const cBlue = new THREE.Color(0x3b82f6);

      for (let i = 0; i < COUNT; i++) {
        // Fibonacci sphere for even distribution
        const t = i / COUNT;
        const inc = Math.acos(1 - 2 * t);
        const az = Math.PI * (1 + Math.sqrt(5)) * i;
        const jitter = 1 + (Math.random() - 0.5) * 0.16;
        const r = R * jitter;

        pos[i * 3] = r * Math.sin(inc) * Math.cos(az);
        pos[i * 3 + 1] = r * Math.cos(inc) * 0.82;
        pos[i * 3 + 2] = r * Math.sin(inc) * Math.sin(az);

        const mix = Math.random();
        const c = mix > 0.82 ? cWhite : mix > 0.34 ? cTeal : cBlue;
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }

      const sphereGeo = new THREE.BufferGeometry();
      sphereGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      sphereGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const sphereMat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const sphere = new THREE.Points(sphereGeo, sphereMat);
      root.add(sphere);

      /* ---------- 2. Wireframe latitude rings (orbit / trade routes) ---------- */
      const ringGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(R + 0.5 + i * 0.9, 0.006, 8, 220);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i === 1 ? 0x5eead4 : 0x1e40af,
          transparent: true,
          opacity: 0.34 - i * 0.07,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + (i - 1) * 0.36;
        ring.rotation.y = i * 0.42;
        ringGroup.add(ring);
      }
      root.add(ringGroup);

      /* ---------- 3. Drifting foreground haze ---------- */
      const HAZE = 420;
      const hPos = new Float32Array(HAZE * 3);
      const hVel = new Float32Array(HAZE);
      for (let i = 0; i < HAZE; i++) {
        hPos[i * 3] = (Math.random() - 0.5) * 34;
        hPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
        hPos[i * 3 + 2] = (Math.random() - 0.5) * 16 + 2;
        hVel[i] = 0.004 + Math.random() * 0.012;
      }
      const hazeGeo = new THREE.BufferGeometry();
      hazeGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3));
      const hazeMat = new THREE.PointsMaterial({
        size: 0.045,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const haze = new THREE.Points(hazeGeo, hazeMat);
      scene.add(haze);

      /* ---------- Interaction ---------- */
      const target = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };

      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        if (!host.clientWidth) return;
        camera.aspect = w() / h();
        camera.updateProjectionMatrix();
        renderer.setSize(w(), h());
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      /* ---------- Visibility gating ---------- */
      let onScreen = true;
      let tabActive = !document.hidden;
      const io = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen) loop();
        },
        { threshold: 0.01 }
      );
      io.observe(host);

      const onVis = () => {
        tabActive = !document.hidden;
        if (tabActive && onScreen) loop();
      };
      document.addEventListener('visibilitychange', onVis);

      /* ---------- Render loop ---------- */
      let raf = 0;
      let running = false;
      const clock = new THREE.Clock();

      const frame = () => {
        if (!onScreen || !tabActive) {
          running = false;
          return;
        }
        const t = clock.getElapsedTime();

        eased.x += (target.x - eased.x) * 0.045;
        eased.y += (target.y - eased.y) * 0.045;

        root.rotation.y = t * 0.055 + eased.x * 0.32;
        root.rotation.x = Math.sin(t * 0.16) * 0.06 + eased.y * 0.18;
        ringGroup.rotation.z = t * 0.03;

        camera.position.x = eased.x * 1.5;
        camera.position.y = -eased.y * 1.0;
        camera.lookAt(0, 0, 0);

        const hp = hazeGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < HAZE; i++) {
          hp[i * 3 + 1] += hVel[i];
          if (hp[i * 3 + 1] > 11) hp[i * 3 + 1] = -11;
        }
        hazeGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };

      const loop = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(frame);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVis);
        sphereGeo.dispose();
        sphereMat.dispose();
        hazeGeo.dispose();
        hazeMat.dispose();
        ringGroup.children.forEach((m) => {
          const mesh = m as any;
          mesh.geometry?.dispose?.();
          mesh.material?.dispose?.();
        });
        renderer.dispose();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
