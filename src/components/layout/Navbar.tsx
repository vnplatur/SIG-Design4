'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/sig-data';

type NavLink = { label: string; href: string; external?: boolean };

const LINKS: NavLink[] = [
  {
    label: 'About',
    href: 'https://www.omaninvestgateway.com/our-company/',
    external: true,
  },
  {
    label: 'Knowledge Hub',
    href: 'https://www.omaninvestgateway.com/oman-2/',
    external: true,
  },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Training', href: '#training' },
  { label: 'Media', href: '#media' },
];

const CTA = {
  label: 'Get in Touch',
  href: 'https://www.omaninvestgateway.com/contact/',
};

/** Scroll distance before the bar takes on a background. */
const SCROLL_THRESHOLD = 70;

/* Height of one label row. Both copies are exactly this tall and the stack
   shifts by exactly one row, so only ever one label is inside the window. */
const ROW = 'h-6';

/**
 * Nav link: regular weight at rest; on hover the bold copy rises from below
 * and replaces it. Never both at once — the viewport is one row tall and the
 * stack translates by exactly one row.
 */
function SwapLink({ link, onNavigate }: { link: NavLink; onNavigate?: () => void }) {
  const common = {
    // The label exists twice for the animation, so name the link explicitly.
    'aria-label': link.label,
    className: `group relative block ${ROW} overflow-hidden whitespace-nowrap rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--teal-400)]`,
    onClick: onNavigate,
    ...(link.external ? { target: '_blank', rel: 'noreferrer' } : {}),
  };

  const inner = (
    <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:transition-none">
      <span className={`flex ${ROW} shrink-0 items-center text-sm font-normal`}>
        {link.label}
      </span>
      <span
        aria-hidden="true"
        className={`flex ${ROW} shrink-0 items-center text-sm font-bold`}
      >
        {link.label}
      </span>
    </span>
  );

  return link.external ? (
    <a href={link.href} {...common}>
      {inner}
    </a>
  ) : (
    <Link href={link.href} {...common}>
      {inner}
    </Link>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* Background appears once past the threshold. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);
  /* Solid once scrolled, and also whenever the mobile menu is open — an open
     menu over a transparent bar would be unreadable. */
  const solid = scrolled || isOpen;

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled ? 'true' : 'false'}
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out ${
        solid
          ? 'border-b border-white/10 shadow-[0_10px_30px_-18px_rgba(5,10,24,0.9)] backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
      style={
        solid
          ? {
              // Deep teal at the tail, not --teal-600: that lighter teal left
              // white nav text at 4.54:1 once composited over a white section.
              backgroundImage:
                'linear-gradient(100deg, rgb(10 20 40 / 0.95) 0%, rgb(15 30 61 / 0.95) 60%, rgb(12 88 82 / 0.95) 100%)',
            }
          : { backgroundColor: 'transparent' }
      }
    >
      {/* 70px inset from the left edge on desktop, tightened on smaller screens */}
      <div className="flex h-20 items-center justify-between gap-6 pl-4 pr-4 sm:pl-8 sm:pr-8 lg:pl-[70px] lg:pr-[70px]">
        {/* Logo — hard left */}
        <Link
          href="/"
          aria-label="Smart Investment Gateway — home"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--teal-400)]"
          onClick={close}
        >
          {/* Plain <img>: a first-party SVG, and next/image would need
              `dangerouslyAllowSVG`, which lets any remote SVG through. */}
          <img
            src={BRAND.logo}
            alt="Smart Investment Gateway"
            width={59}
            height={40}
            className="h-9 w-auto lg:h-10"
          />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-x-8 lg:flex">
          {LINKS.map((l) => (
            <SwapLink key={l.label} link={l} />
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={CTA.href}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 items-center whitespace-nowrap rounded-full bg-gradient-to-br from-[color:var(--teal-400)] to-[color:var(--teal-600)] px-5 py-2.5 text-sm font-semibold text-[color:var(--navy-950)] transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex"
        >
          {CTA.label}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--teal-400)] lg:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="primary-menu"
        inert={!isOpen}
        className={`overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${
          isOpen ? 'max-h-[480px] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-4 sm:px-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((l) => {
              const cls =
                'rounded-lg px-3 py-3 text-base text-white/85 transition-colors hover:bg-white/10 hover:font-bold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--teal-400)]';
              return l.external ? (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onClick={close} className={cls}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} onClick={close} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <a
            href={CTA.href}
            target="_blank"
            rel="noreferrer"
            onClick={close}
            className="mt-2 rounded-full bg-gradient-to-br from-[color:var(--teal-400)] to-[color:var(--teal-600)] px-5 py-3 text-center text-sm font-semibold text-[color:var(--navy-950)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
