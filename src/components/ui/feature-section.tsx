// Pattern: "Feature Section" (FeatureSteps) by Ayushmaan Singh / Serenity UI,
// https://21st.dev/@ayushmxxn/components/feature-section
//
// NOTE: the upstream implementation is paywalled on 21st.dev ("Component source
// is locked"), so this is an original implementation written against that
// component's PUBLIC API and its published feature list — not a copy of the
// locked file. If you have a 21st.dev membership, drop the real source in here;
// the props below match its documented signature.
//
// Documented behaviour implemented: auto-advancing steps with progress,
// smooth transitions, responsive layout, image carousel, customizable timing,
// theme integration, progress indicators.
//
// Added beyond the spec: pause on hover/focus, an explicit play/pause control,
// and prefers-reduced-motion support — auto-rotating content needs a real stop
// mechanism (WCAG 2.2.2), which the published feature list does not mention.

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
  href?: string;
}

export interface FeatureStepsProps {
  features: Feature[];
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
  className?: string;
}

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function FeatureSteps({
  features,
  title,
  autoPlayInterval = 4000,
  imageHeight = 'h-[500px]',
  className = '',
}: FeatureStepsProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // fail open, as with the carousel
  const rootRef = useRef<HTMLDivElement | null>(null);
  const total = features.length;

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(q.matches);
    apply();
    q.addEventListener('change', apply);
    return () => q.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || isPaused || reduceMotion || !isVisible || total <= 1) return;
    const id = setInterval(next, autoPlayInterval);
    return () => clearInterval(id);
  }, [isPlaying, isPaused, reduceMotion, isVisible, autoPlayInterval, next, total]);

  if (!features || total === 0) return null;

  const active = features[current];
  const running = isPlaying && !isPaused && !reduceMotion;

  return (
    <div
      ref={rootRef}
      className={cn('w-full', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {title && (
        <h2 className="h-sec mb-10 text-center text-[color:var(--navy-900)]">
          {title}
        </h2>
      )}

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Steps */}
        <ol className="flex flex-col gap-2">
          {features.map((feature, index) => {
            const isActive = index === current;
            return (
              <li key={feature.title}>
                <button
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-current={isActive}
                  className={cn(
                    'group relative w-full cursor-pointer rounded-xl border p-5 text-left transition-colors',
                    isActive
                      ? 'border-[color:var(--teal-500)] bg-white shadow-[0_10px_30px_-18px_rgba(5,10,24,0.5)]'
                      : 'border-[color:var(--grey-300)]/60 bg-transparent hover:bg-white/60'
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Progress indicator */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-[color:var(--teal-600)] text-white'
                          : 'bg-[color:var(--grey-100)] text-[color:var(--grey-600)]'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-[color:var(--teal-600)]">
                        {feature.step}
                      </span>
                      <span className="mt-1 block text-lg font-semibold leading-snug text-[color:var(--navy-900)]">
                        {feature.title}
                      </span>
                      <span
                        className={cn(
                          'mt-1 block text-sm leading-relaxed text-[color:var(--grey-600)]',
                          isActive ? 'line-clamp-none' : 'line-clamp-2'
                        )}
                      >
                        {feature.content}
                      </span>
                    </span>
                  </div>

                  {/* Elapsed bar for the active step */}
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-0.5 w-full overflow-hidden rounded-full bg-[color:var(--grey-100)]"
                  >
                    <span
                      className={cn(
                        'block h-full bg-[color:var(--teal-500)] transition-[width] ease-linear',
                        isActive ? 'w-full' : 'w-0'
                      )}
                      style={{
                        transitionDuration:
                          isActive && running ? `${autoPlayInterval}ms` : '200ms',
                      }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Image carousel */}
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-2xl bg-[color:var(--navy-900)]',
            imageHeight
          )}
        >
          {features.map((feature, index) => (
            <div
              key={feature.image}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                index === current ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden={index !== current}
            >
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,10,24,0.15) 0%, rgba(5,10,24,0.35) 55%, rgba(5,10,24,0.88) 100%)',
                }}
              />
            </div>
          ))}

          {/* Caption for the active item */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <p className="eyebrow mb-2 text-[color:var(--teal-300)]">
              {active.step}
            </p>
            <p className="text-xl font-semibold leading-snug text-white md:text-2xl">
              {active.title}
            </p>
            {active.href && (
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[color:var(--navy-900)] transition-colors hover:bg-white"
              >
                Read article
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Playback control — auto-advancing content needs a real stop. */}
      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause auto-advance' : 'Resume auto-advance'}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--grey-300)] px-4 text-xs font-medium text-[color:var(--grey-600)] transition-colors hover:bg-white"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <p aria-live="polite" className="sr-only">
            {`Item ${current + 1} of ${total}: ${active.title}`}
          </p>
        </div>
      )}
    </div>
  );
}

export default FeatureSteps;
