'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ScrollHeroContext = createContext<{ showContent: boolean }>({
  showContent: false,
});

export const useScrollHero = () => useContext(ScrollHeroContext);

/* ---------------------------------------------------------------
   ScrollExpandMedia
   Scroll-driven hero: media expands from a card to near-fullscreen
   as the user scrolls, then releases page scroll and reveals the
   children below.

   Accessibility:
   - Wheel/touch scroll is intercepted while expanding. Keyboard
     equivalents (Arrow / Page / Space / Home / End) drive the same
     progress, so the section is never a keyboard trap.
   - A focus-revealed "Skip animation" control jumps to the end.
   - prefers-reduced-motion renders the final readable state
     immediately and attaches no scroll interception at all.
--------------------------------------------------------------- */

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  /** Heading level for the title. Use 'h1' when this is the page's main hero. */
  titleAs?: 'h1' | 'h2';
  /** Colour utility for title / date / scroll cue. Override to match your brand. */
  textClassName?: string;
  /** Scrim over the background image. Strengthen it to keep hero text legible. */
  overlayClassName?: string;
  children?: ReactNode;
}

const YOUTUBE_PARAMS =
  'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1';

/** Build an autoplaying, chrome-less YouTube embed URL. */
function buildYouTubeSrc(src: string): string {
  if (src.includes('embed')) {
    return `${src}${src.includes('?') ? '&' : '?'}${YOUTUBE_PARAMS}`;
  }
  // `?v=` may be absent (short links, malformed input) — never emit `playlist=undefined`.
  const videoId = src.split('v=')[1]?.split('&')[0];
  const embed = src.replace('watch?v=', 'embed/');
  return `${embed}?${YOUTUBE_PARAMS}${videoId ? `&playlist=${videoId}` : ''}`;
}

/** Keyboard equivalents for the wheel gesture, as a fraction of total progress. */
const KEY_STEPS: Record<string, number> = {
  ArrowDown: 0.08,
  ArrowUp: -0.08,
  PageDown: 0.25,
  PageUp: -0.25,
  ' ': 0.25,
  Home: -1,
  End: 1,
};

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.isContentEditable ||
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT'
  );
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  titleAs = 'h2',
  textClassName = 'text-blue-200',
  overlayClassName = 'bg-black/10',
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Refs mirror state so the window listeners stay attached once instead of
  // being torn down and re-added on every wheel tick.
  const progressRef = useRef<number>(0);
  const expandedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);

  const applyProgress = useCallback((next: number): void => {
    const clamped = Math.min(Math.max(next, 0), 1);
    progressRef.current = clamped;
    setScrollProgress(clamped);

    if (clamped >= 1) {
      expandedRef.current = true;
      setMediaFullyExpanded(true);
      setShowContent(true);
    } else if (clamped < 0.75) {
      setShowContent(false);
    }
  }, []);

  const collapse = useCallback((): void => {
    expandedRef.current = false;
    setMediaFullyExpanded(false);
  }, []);

  /* ---- Respect prefers-reduced-motion: skip the effect entirely ---- */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = (): void => {
      setReduceMotion(query.matches);
      if (query.matches) {
        progressRef.current = 1;
        expandedRef.current = true;
        setScrollProgress(1);
        setShowContent(true);
        setMediaFullyExpanded(true);
      }
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  /* ---- Reset when the media type changes ---- */
  useEffect(() => {
    if (reduceMotion) return;
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType, reduceMotion]);

  /* ---- Scroll / touch / keyboard interception ---- */
  useEffect(() => {
    if (reduceMotion) return;

    const handleWheel = (e: WheelEvent): void => {
      if (expandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault();
          collapse();
        }
        return;
      }
      e.preventDefault();
      applyProgress(progressRef.current + e.deltaY * 0.0009);
    };

    const handleTouchStart = (e: TouchEvent): void => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const startY = touchStartYRef.current;
      if (!startY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = startY - touchY;

      if (expandedRef.current) {
        if (deltaY < -20 && window.scrollY <= 5) {
          e.preventDefault();
          collapse();
        }
        return;
      }

      e.preventDefault();
      // Higher sensitivity when scrolling back up, which feels sluggish otherwise.
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      applyProgress(progressRef.current + deltaY * scrollFactor);
      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    // Keyboard parity: without this the scroll lock below traps keyboard users,
    // because every key-driven scroll is immediately reset back to the top.
    const handleKeyDown = (e: KeyboardEvent): void => {
      const step = KEY_STEPS[e.key];
      if (step === undefined || isTypingTarget(e.target)) return;

      if (expandedRef.current) {
        if (step < 0 && window.scrollY <= 5) {
          e.preventDefault();
          collapse();
        }
        return;
      }
      e.preventDefault();
      applyProgress(progressRef.current + step);
    };

    const handleScroll = (): void => {
      if (expandedRef.current) return;

      // If the browser restores a scroll position on refresh, or the user
      // scrolls down past the threshold (e.g., via browser navigation/anchors),
      // immediately skip to the expanded state to prevent a scroll trap.
      if (window.scrollY > 30) {
        progressRef.current = 1;
        expandedRef.current = true;
        setScrollProgress(1);
        setShowContent(true);
        setMediaFullyExpanded(true);
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Immediate check on mount/attachment to see if we've restored scroll position
    if (window.scrollY > 30) {
      progressRef.current = 1;
      expandedRef.current = true;
      setScrollProgress(1);
      setShowContent(true);
      setMediaFullyExpanded(true);
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reduceMotion, applyProgress, collapse]);

  /* ---- Viewport class ---- */
  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const isYouTube = mediaType === 'video' && mediaSrc.includes('youtube.com');
  const TitleTag = titleAs;

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        {/* Keyboard / AT escape hatch — visible only when focused. */}
        {!mediaFullyExpanded && (
          <button
            type="button"
            onClick={() => applyProgress(1)}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
          >
            Skip animation
          </button>
        )}

        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-screen h-screen object-cover"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              />
            ) : (
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                sizes="100vw"
                className="w-screen h-screen"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: `0px 0px 50px rgba(0, 0, 0, 0.3), 0 0 0 9999px rgba(5, 10, 24, ${0.75 * (1 - scrollProgress)})`,
                }}
              >
                {mediaType === 'video' ? (
                  // No video player here! The single background video shows through the transparent card.
                  // We just render the inner glass highlight overlay card border.
                  <div className="relative w-full h-full border border-white/20 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute inset-0 bg-black/10"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.2 * (1 - scrollProgress) }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      sizes="(max-width: 768px) 95vw, 1280px"
                      className="w-full h-full object-cover rounded-xl"
                    />

                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className={`text-2xl ${textClassName}`}
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className={`font-medium text-center ${textClassName}`}
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                {/* One heading element wrapping two animated spans: assistive tech
                    reads the whole title instead of two disconnected fragments. */}
                <TitleTag
                  // Without this the two spans concatenate into one run-together word.
                  aria-label={title}
                  className={`flex flex-col items-center gap-4 text-center text-4xl md:text-5xl lg:text-6xl font-bold transition-none ${textClassName}`}
                >
                  <motion.span
                    className="block transition-none"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {firstWord}
                  </motion.span>
                  {restOfTitle && (
                    <motion.span
                      className="block transition-none"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {restOfTitle}
                    </motion.span>
                  )}
                </TitleTag>
              </div>
              {/* Overlay Content on Top of Expanded Media */}
              <ScrollHeroContext.Provider value={{ showContent }}>
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 md:p-16 max-w-4xl mx-auto pointer-events-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ pointerEvents: showContent ? 'auto' : 'none' }}
                  aria-hidden={!showContent}
                >
                  <div className="pointer-events-auto">
                    {children}
                  </div>
                </motion.div>
              </ScrollHeroContext.Provider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
