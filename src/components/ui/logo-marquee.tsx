'use client';

import { useState, type CSSProperties } from 'react';

export interface MarqueeLogo {
  name: string;
  src: string;
}

export interface LogoMarqueeProps {
  items: MarqueeLogo[];
  /** Time for one full pass. Longer = slower. */
  duration?: string;
  direction?: 'left' | 'right';
  /** Colour of the edge fade, so the strip melts into its section. */
  fadeColor?: string;
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

/**
 * Continuously scrolling logo strip.
 *
 * Built on the .mq-wrap / .mq-track / .mq-l rules already in globals.css, which
 * pause on hover and focus-within and are disabled outright under
 * prefers-reduced-motion. The track holds exactly two copies of the list so the
 * -50% keyframe loops seamlessly.
 *
 * The whole strip is aria-hidden: it repeats client names that the carousel
 * above already exposes, and announcing all of them twice is pure noise.
 */
export function LogoMarquee({
  items,
  duration = '45s',
  direction = 'left',
  fadeColor = 'var(--navy-900)',
  className = '',
}: LogoMarqueeProps) {
  const [paused, setPaused] = useState(false);

  if (!items || items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`mq-wrap relative overflow-hidden ${paused ? 'mq-paused' : ''}`}
        aria-hidden="true"
      >
        <div
          // Spacing lives on each chip, never as flex `gap`: with gap, one copy
          // measures wider than the -50% keyframe travels, so the loop hitches.
          className={`mq-track ${direction === 'left' ? 'mq-l' : 'mq-r'} items-center`}
          style={{ '--dur': duration } as CSSProperties}
        >
          {track.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="mr-5 flex h-24 w-52 shrink-0 items-center justify-center rounded-xl bg-white px-7 py-5"
              style={{ boxShadow: '0 10px 24px rgba(5,10,24,0.25)' }}
            >
              <img
                src={logo.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="max-h-11 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: `linear-gradient(90deg, ${fadeColor}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: `linear-gradient(270deg, ${fadeColor}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default LogoMarquee;
