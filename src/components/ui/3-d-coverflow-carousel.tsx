"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* Inline icons (zero external dependencies) */
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onCtaClick?: (item: CarouselItem) => void;
  /**
   * 'photo' — full-bleed imagery with a dark vignette (the original look).
   * 'logo'  — brand marks on a light card, never cropped, never dimmed.
   */
  variant?: "photo" | "logo";
  /** Accent colour for the eyebrow rule, dots and CTA. */
  accent?: string;
  /** Whether arrows/dots/play sit on a dark surface. Drives their contrast. */
  controlsOnDark?: boolean;
}

export const defaultDishes: CarouselItem[] = [
  {
    tag: "#Signature",
    titleLine1: "BUTTER CHICKEN",
    titleLine2: "– DELHI HERITAGE",
    desc: "Velvety roasted tomato and fenugreek gravy with tender charred chicken",
    img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ChefSpecial",
    titleLine1: "TANDOORI CHOPS",
    titleLine2: "– SMOKED SPICE",
    desc: "Grass-fed lamb chops charred in live charcoal tandoor with Kashmiri spices",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#Vegetarian",
    titleLine1: "PANEER TIKKA",
    titleLine2: "– CLAY ROASTED",
    desc: "Artisan cottage cheese marinated in spiced yogurt, bell peppers & saffron",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#CoastalCatch",
    titleLine1: "MALABAR PRAWNS",
    titleLine2: "– COCONUT GRAVY",
    desc: "Jumbo wild tiger prawns simmered in fragrant curry leaves and coconut milk",
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ArtisanBake",
    titleLine1: "TRUFFLE NAAN",
    titleLine2: "– CHARCOAL OVEN",
    desc: "Crispy puffed leavened bread brushed with pure ghee and black winter truffle",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
];

export function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
  variant = "photo",
  accent = "#c5a880",
  controlsOnDark = true,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Fail open: if IntersectionObserver never delivers a callback, autoplay must
  // still run. IO only ever turns this off, never on.
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);
  const total = items.length;
  const isLogo = variant === "logo";

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  /* Motion preference: never auto-advance, never animate, when reduce is set. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setIsPlaying(autoplay && !reduceMotion);
  }, [autoplay, reduceMotion]);

  /* Only advance while actually on screen: an off-screen carousel otherwise
     burns timers and greets the visitor mid-sequence. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || isPaused || reduceMotion || !isVisible || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, reduceMotion, isVisible, autoplayDelay, nextSlide, total]);

  /* Arrow keys are scoped to the carousel, not window: a global listener would
     steal Left/Right from the rest of the page even when this is off-screen. */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  const current = items[currentIndex];
  const transition = reduceMotion ? "none" : "all 800ms cubic-bezier(0.25, 1, 0.5, 1)";

  const navButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    backgroundColor: isLogo ? "rgba(10,20,40,0.72)" : "rgba(0,0,0,0.55)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    zIndex: 40,
    transition: "all 200ms ease",
  };

  return (
    <section
      ref={rootRef}
      className={`relative w-full flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{
        minHeight: isLogo ? "560px" : "760px",
        backgroundColor: isLogo ? "transparent" : "#0c0a09",
        color: "#ffffff",
        fontFamily: isLogo ? "inherit" : "system-ui, -apple-system, sans-serif",
      }}
      aria-roledescription="carousel"
      aria-label={sectionLabel || "Carousel"}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambience — photo variant only. A blurred, darkened logo is
          meaningless noise, so the logo variant inherits the section behind it. */}
      {!isLogo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <img
            src={current?.img}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.22) blur(32px)",
              transform: "scale(1.15)",
              transition: "opacity 1000ms ease, filter 1000ms ease",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.92) 100%)",
            }}
          />
        </div>
      )}

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: `linear-gradient(90deg, transparent, ${accent})` }} />
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: accent,
                margin: 0,
              }}
            >
              {sectionLabel}
            </p>
            <span style={{ width: "36px", height: "1px", background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
        )}

        {/* Status for assistive tech. Silent while auto-advancing so it does not
            chatter; announces once the user takes control. */}
        <div
          aria-live={isPlaying && !isPaused ? "off" : "polite"}
          aria-atomic="true"
          className="sr-only"
        >
          {`Slide ${currentIndex + 1} of ${total}: ${current?.titleLine1}`}
        </div>

        {/* 3D coverflow stage */}
        <div
          className="relative w-full flex justify-center items-center mb-8"
          style={{ perspective: "1400px", height: isLogo ? "300px" : "520px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            // Logos must stay legible: they get opacity + scale only, never the
            // brightness/blur used to push photos back in depth.
            const dim = (b: string, ph: string) => (isLogo ? b : ph);

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = dim("none", "brightness(0.4) blur(2px)");
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = `translateX(${isLogo ? 300 : 285}px) scale(0.84) rotateY(-24deg)`;
              opacity = isLogo ? 0.75 : 0.65;
              zIndex = 20;
              filter = dim("none", "brightness(0.75)");
            } else if (offset === 2) {
              transform = `translateX(${isLogo ? 540 : 510}px) scale(0.68) rotateY(-38deg)`;
              opacity = isLogo ? 0.45 : 0.38;
              zIndex = 10;
              filter = dim("none", "brightness(0.55) blur(1px)");
            } else if (offset === total - 1) {
              transform = `translateX(-${isLogo ? 300 : 285}px) scale(0.84) rotateY(24deg)`;
              opacity = isLogo ? 0.75 : 0.65;
              zIndex = 20;
              filter = dim("none", "brightness(0.75)");
            } else if (offset === total - 2) {
              transform = `translateX(-${isLogo ? 540 : 510}px) scale(0.68) rotateY(38deg)`;
              opacity = isLogo ? 0.45 : 0.38;
              zIndex = 10;
              filter = dim("none", "brightness(0.55) blur(1px)");
            }

            return (
              <div
                key={idx}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${total}`}
                aria-hidden={!isCenter}
                inert={!isCenter}
                onClick={() => !isCenter && goToSlide(idx)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{
                  position: "absolute",
                  width: isLogo ? "360px" : "330px",
                  height: isLogo ? "260px" : "500px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: isLogo ? "#ffffff" : "#171311",
                  border: isLogo
                    ? "1px solid rgba(10,20,40,0.10)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition,
                  boxShadow: isCenter
                    ? isLogo
                      ? "0 25px 60px rgba(5,10,24,0.45)"
                      : "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {isLogo ? (
                  /* Logo card: contained, uncropped, on a light surface. */
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "18px",
                      padding: "32px 36px",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`${item.titleLine1} logo`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "120px",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        textAlign: "center",
                        color: "#0a1428",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.titleLine1}
                    </p>
                    {item.desc && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.78rem",
                          textAlign: "center",
                          color: "#475569",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <img
                      src={item.img}
                      alt={item.titleLine1}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        padding: "20px 18px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        textAlign: "center",
                        zIndex: 20,
                        opacity: isCenter ? 1 : 0,
                        transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                        transition: reduceMotion ? "none" : "opacity 500ms ease, transform 500ms ease",
                        pointerEvents: isCenter ? "auto" : "none",
                      }}
                    >
                      <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            color: "rgba(255,255,255,0.9)",
                            textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "3px",
                          marginTop: "auto",
                          paddingBottom: "4px",
                        }}
                      >
                        {/* h3, not h2: this sits under the surrounding section heading. */}
                        <h3
                          style={{
                            fontSize: "1.65rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            color: "#ffffff",
                            margin: 0,
                            lineHeight: 1.1,
                            textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                          }}
                        >
                          {item.titleLine1}
                        </h3>

                        {item.titleLine2 && (
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: "#f3f0ea",
                              lineHeight: 1.2,
                              textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                            }}
                          >
                            {item.titleLine2}
                          </span>
                        )}

                        <div
                          style={{
                            width: "34px",
                            height: "2px",
                            backgroundColor: accent,
                            borderRadius: "2px",
                            margin: "5px auto 4px",
                            boxShadow: `0 0 8px ${accent}b3`,
                          }}
                        />

                        {item.desc && (
                          <p
                            style={{
                              fontSize: "0.82rem",
                              fontStyle: "italic",
                              color: "rgba(255,255,255,0.9)",
                              maxWidth: "280px",
                              margin: "0 0 10px",
                              lineHeight: 1.3,
                              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                            }}
                          >
                            {item.desc}
                          </p>
                        )}

                        {item.ctaText && (
                          <a
                            href={item.ctaUrl || "#"}
                            onClick={(e) => {
                              if (onCtaClick) {
                                e.preventDefault();
                                onCtaClick(item);
                              }
                            }}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "9px 18px",
                              borderRadius: "9999px",
                              background: `linear-gradient(135deg, ${accent} 0%, #a48256 100%)`,
                              color: "#110d0c",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                              cursor: "pointer",
                              transition: "transform 200ms ease, box-shadow 200ms ease",
                            }}
                          >
                            <span>{item.ctaText}</span>
                            <ArrowRightIcon />
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{ ...navButtonStyle, left: "24px" }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          style={{ ...navButtonStyle, right: "24px" }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination dots + play/pause. Auto-rotating content needs an explicit
            stop control, not hover-pause alone. */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", zIndex: 30 }}>
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.titleLine1}`}
              aria-current={idx === currentIndex}
              style={{
                // 8px pill, but a 24x24 hit area (WCAG 2.2 target size).
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "24px",
                width: "24px",
                padding: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "8px",
                  width: idx === currentIndex ? "28px" : "8px",
                  borderRadius: "9999px",
                  backgroundColor:
                    idx === currentIndex
                      ? accent
                      : controlsOnDark
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(10,20,40,0.28)",
                  transition: reduceMotion ? "none" : "all 300ms ease",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
