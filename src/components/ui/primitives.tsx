'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from 'framer-motion';
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react';

/* ---------------------------------------------------------------
   Reveal — fade + rise, viewport triggered
--------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   MaskLines — per-line clip-path reveal for editorial headlines
--------------------------------------------------------------- */
export function MaskLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------
   Magnetic — element drifts toward cursor
--------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Tilt — 3D perspective card with cursor light
--------------------------------------------------------------- */
export function Tilt({
  children,
  className = '',
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
        {glare && <span className="cursor-light rounded-[inherit]" aria-hidden="true" />}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Counter — count-up on viewport entry
--------------------------------------------------------------- */
export function Counter({
  to,
  suffix = '',
  duration = 2.2,
  className = '',
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const ms = duration * 1000;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------
   Parallax — translate based on scroll progress through viewport
--------------------------------------------------------------- */
export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  distance = 60,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  distance?: number;
  priority?: boolean;
}) {
  const { ref, y } = useParallax(distance);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ y }}
        className="absolute inset-0 h-[126%] w-full -top-[13%] object-cover"
      />
    </div>
  );
}

/* ---------------------------------------------------------------
   SectionLabel — numbered eyebrow with animated rule
--------------------------------------------------------------- */
export function SectionLabel({
  index,
  children,
  tone = 'dark',
}: {
  index: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
}) {
  const c = tone === 'dark' ? 'text-white/55' : 'text-[color:var(--grey-600)]';
  const line = tone === 'dark' ? 'bg-white/25' : 'bg-[color:var(--grey-300)]';
  return (
    <div className={`flex items-center gap-4 ${c}`}>
      <span className="eyebrow text-[color:var(--teal-500)]">{index}</span>
      <motion.span
        className={`h-px ${line} origin-left`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: 56 }}
      />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------
   Arrow icon (inline SVG — no emoji)
--------------------------------------------------------------- */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`arr ${className}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
