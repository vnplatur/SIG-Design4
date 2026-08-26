// Source: UI Layouts — https://www.ui-layouts.com/r/tailwind-image-accordion.json
//
// Adapted for this project:
//  - prop-driven `items` instead of a hardcoded team list
//  - each panel titled with <h3>, not <h1> (the original emits one <h1> per
//    panel, which would put four <h1>s inside a section that already has an
//    <h2>, on a page that already has its own <h1>)
//  - real hrefs, decorative alt (the link text already names each panel)
//  - brand-coloured focus ring and a stronger bottom scrim for text contrast
//
// Sizing is upstream's: `w-full` plus a conditional `w-[20%]` whose compound
// selector out-specifies it (0,3,0 vs 0,1,0), so non-active panels collapse.

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageAccordionItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  href?: string;
}

export interface TailwindImageAccordionProps {
  items: ImageAccordionItem[];
  className?: string;
  /** Height of each panel. */
  heightClassName?: string;
}

export function TailwindImageAccordion({
  items,
  className = '',
  heightClassName = 'h-72 md:h-[420px]',
}: TailwindImageAccordionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'group flex max-md:flex-col justify-center gap-2 w-full mx-auto',
        className
      )}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="group/article relative w-full rounded-xl overflow-hidden md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/2 before:z-[1] before:bg-linear-to-t before:from-black/85 before:via-black/40 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100 after:absolute after:inset-0 after:bg-[color:var(--navy-950)]/40 after:backdrop-blur-sm after:rounded-lg after:transition-all focus-within:ring-3 focus-within:ring-[color:var(--teal-400)]"
        >
          <a
            className="absolute inset-0 text-white z-10 p-4 flex flex-col justify-end"
            href={item.href ?? '#'}
            target={item.href?.startsWith('http') ? '_blank' : undefined}
            rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
          >
            {item.description && (
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--teal-300)] md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
                {item.description}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-semibold leading-tight md:whitespace-normal md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500">
              {item.title}
            </h3>
          </a>

          <Image
            className={cn('object-cover w-full', heightClassName)}
            src={item.url}
            width={960}
            height={480}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt=""
          />
        </article>
      ))}
    </div>
  );
}

export default TailwindImageAccordion;
