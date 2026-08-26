'use client';

import { BRAND, FOOTER_NAV, CONTACT, SOCIAL, LEGAL } from '@/lib/sig-data';

/* Inline brand marks — consistent stroke/fill, no emoji, no icon dependency. */
const Icon = {
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21H9z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M17.53 3H20.5l-6.5 7.43L21.75 21h-5.9l-4.62-6.04L5.94 21H2.97l6.96-7.95L2.5 3h6.05l4.18 5.52ZM16.5 19.2h1.64L7.6 4.7H5.84Z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M23 12s0-3.2-.4-4.74a2.5 2.5 0 0 0-1.76-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.84.4A2.5 2.5 0 0 0 1.4 7.26C1 8.8 1 12 1 12s0 3.2.4 4.74a2.5 2.5 0 0 0 1.76 1.77c1.54.39 8.84.39 8.84.39s7.3 0 8.84-.4a2.5 2.5 0 0 0 1.76-1.76C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15.5 12Z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M22 16.9v2.5a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 3.7 2 2 0 0 1 4 1.5h2.5a2 2 0 0 1 2 1.7c.1.9.35 1.8.7 2.6a2 2 0 0 1-.45 2.1L7.6 9.2a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.83.35 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const SOCIAL_ICONS: Record<string, () => React.JSX.Element> = {
  LinkedIn: Icon.LinkedIn,
  Facebook: Icon.Facebook,
  X: Icon.X,
  Instagram: Icon.Instagram,
  YouTube: Icon.YouTube,
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--navy-950)] text-white">
      {/* Teal glow, kept subtle so it never competes with the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--teal-600), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* ---------- Top: brand + navigation ---------- */}
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src={BRAND.logo}
              alt="Smart Investment Gateway"
              width={65}
              height={44}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-sm text-base text-[color:var(--teal-300)]">
              {BRAND.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {LEGAL.blurb}
            </p>

            {/* Social */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {SOCIAL.map((s) => {
                const Glyph = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Smart Investment Gateway on ${s.label}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[color:var(--teal-400)] hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--teal-400)]"
                    >
                      {Glyph ? <Glyph /> : s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nav columns */}
          <nav aria-label="Footer" className="lg:col-span-5">
            <div className="grid gap-10 sm:grid-cols-3">
              {FOOTER_NAV.map((col) => (
                <div key={col.title}>
                  <h2 className="eyebrow mb-4 text-[color:var(--teal-400)]">
                    {col.title}
                  </h2>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="ulink text-sm text-white/75 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-4 text-[color:var(--teal-400)]">Contact</h2>

            <ul className="space-y-3 text-sm">
              {CONTACT.emails.map((e) => (
                <li key={e}>
                  <a
                    href={`mailto:${e}`}
                    className="group inline-flex items-start gap-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    <span className="mt-0.5 shrink-0 text-[color:var(--teal-400)]">
                      <Icon.Mail />
                    </span>
                    <span className="break-all">{e}</span>
                  </a>
                </li>
              ))}

              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    <span className="shrink-0 text-[color:var(--teal-400)]">
                      <Icon.Phone />
                    </span>
                    <span className="tabular">{p}</span>
                  </a>
                </li>
              ))}

              <li className="flex items-start gap-2.5 text-white/75">
                <span className="mt-0.5 shrink-0 text-[color:var(--teal-400)]">
                  <Icon.Pin />
                </span>
                <address className="not-italic leading-relaxed">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>

            <a
              href={`${BRAND.site}/contact/`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-7"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col gap-4 border-t border-white/12 py-7 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>{LEGAL.copyright}</p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* white/45 measures 4.49:1 on --navy-950 — just under AA. */}
            <li className="text-white/60">{LEGAL.cr}</li>
            <li>
              <a
                href={LEGAL.privacy}
                target="_blank"
                rel="noreferrer"
                className="ulink transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href={LEGAL.terms}
                target="_blank"
                rel="noreferrer"
                className="ulink transition-colors hover:text-white"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
