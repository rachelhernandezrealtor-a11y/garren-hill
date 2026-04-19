import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
  CinematicSlideshow — scroll-driven cross-fade film strip.
  Uses a single sticky viewport with scroll-linked opacity transitions.
  
  IMPORTANT: Keep image count reasonable (< 20) for performance.
  For larger tours, split into multiple slideshows.
*/

function Slide({ image, index, total, scrollYProgress }) {
  const slideStart = index / total;
  const slideEnd = (index + 1) / total;

  // Later images layer on top; they fade in at their scroll point
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.001]
      : [Math.max(0, slideStart - 0.008), slideStart + 0.015],
    [index === 0 ? 1 : 0, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [slideStart, slideEnd],
    [1.06, 1.0]
  );

  return (
    <motion.img
      src={image.src}
      alt={image.alt || image.caption || ''}
      loading={index < 4 ? 'eager' : 'lazy'}
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        opacity,
        scale,
        filter: 'saturate(1.02) contrast(1.05)',
        zIndex: index + 1,
        willChange: 'opacity, transform',
      }}
    />
  );
}

function CaptionLayer({ caption, index, total, scrollYProgress }) {
  const slideStart = index / total;
  const slideEnd = (index + 1) / total;
  const r = slideEnd - slideStart;

  const opacity = useTransform(
    scrollYProgress,
    [slideStart + r * 0.1, slideStart + r * 0.25, slideEnd - r * 0.25, slideEnd - r * 0.05],
    [0, 1, 1, 0]
  );

  if (!caption) return null;

  return (
    <motion.p
      className="absolute bottom-0 left-0 right-0 font-sans text-white px-6 pb-6 sm:px-10 sm:pb-10"
      style={{
        fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
        fontWeight: 300,
        letterSpacing: '0.03em',
        lineHeight: 1.5,
        textShadow: '0 1px 6px rgba(0,0,0,0.7)',
        opacity,
        zIndex: total + 10,
        pointerEvents: 'none',
        margin: 0,
      }}
    >
      {caption}
    </motion.p>
  );
}

export default function CinematicSlideshow({ images, id }) {
  const containerRef = useRef(null);
  const total = images.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 80vh scroll room per slide
  const totalHeight = total * 80;

  return (
    <div
      id={id}
      ref={containerRef}
      className="relative"
      style={{ height: `${totalHeight}vh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh', background: '#0a0a09' }}
      >
        {images.map((img, i) => (
          <Slide key={i} image={img} index={i} total={total} scrollYProgress={scrollYProgress} />
        ))}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 100px 30px rgba(0,0,0,0.08)',
            zIndex: total + 5,
          }}
        />

        {/* Bottom gradient for caption legibility */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '30%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.08) 60%, transparent)',
            zIndex: total + 8,
          }}
        />

        {/* Captions */}
        {images.map((img, i) => (
          <CaptionLayer key={`c-${i}`} caption={img.caption} index={i} total={total} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}