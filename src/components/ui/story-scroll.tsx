'use client';

import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

/**
 * Story Scroll — panels pin as you scroll and the next one stacks over them.
 *
 * Pattern observed from the public demo of "Story Scroll" by Samira Boudjadja
 * (https://21st.dev/@boudjadjasamira/components/story-scroll). That build pins
 * with GSAP ScrollTrigger: each section becomes `position: fixed` with an
 * increasing z-index (1, 2, 3 …) while the final one stays in flow.
 *
 * The published source is paywalled, so this is an original implementation of
 * the same effect using `position: sticky`, which needs no GSAP and no extra
 * dependencies — and, unlike a pinned/fixed approach, keeps every panel in
 * normal document flow so page height and anchor links stay correct.
 */

export interface FlowArtProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export interface FlowSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Pin this panel so later panels stack over it. Turn off for a section that
   * runs its own sticky/pinned scroll internally — nested pinning fights.
   */
  pin?: boolean;
  /** Injected by FlowArt; controls stacking order. */
  index?: number;
  'aria-label'?: string;
}

export function FlowSection({
  children,
  className,
  style,
  pin = true,
  index = 0,
  ...rest
}: FlowSectionProps) {
  const [topOffset, setTopOffset] = useState<string>('0px');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pin) return;

    const el = elementRef.current;
    if (!el) return;

    const updateTop = () => {
      const rectHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      if (rectHeight > viewportHeight) {
        setTopOffset(`${viewportHeight - rectHeight}px`);
      } else {
        setTopOffset('0px');
      }
    };

    updateTop();

    const resizeObserver = new ResizeObserver(updateTop);
    resizeObserver.observe(el);

    window.addEventListener('resize', updateTop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateTop);
    };
  }, [pin]);

  return (
    <div
      ref={elementRef}
      data-flow-section=""
      data-pinned={pin ? 'true' : 'false'}
      className={cn(
        'w-full',
        // Each panel needs an opaque background of its own, otherwise the
        // panel beneath shows through once they overlap.
        //
        // Unpinned panels MUST still be positioned: `z-index` is ignored on a
        // `static` element, so a static panel is painted underneath every
        // sticky panel (positioned, z-index >= 1) regardless of DOM order —
        // which buries it completely.
        pin ? 'sticky' : 'relative',
        className
      )}
      style={{
        zIndex: index + 1,
        top: pin ? topOffset : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default function FlowArt({ children, className, ...rest }: FlowArtProps) {
  const items = Children.toArray(children);

  return (
    <div
      data-flow-art=""
      className={cn('relative w-full', className)}
      {...rest}
    >
      {items.map((child, i) =>
        isValidElement<FlowSectionProps>(child)
          ? cloneElement(child, { key: i, index: i })
          : child
      )}
    </div>
  );
}
