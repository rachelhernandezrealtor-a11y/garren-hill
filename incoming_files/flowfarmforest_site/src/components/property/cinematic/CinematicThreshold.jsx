import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

/**
 * CinematicThreshold — full-bleed, scroll-driven auto-reveal for each room.
 * Starts as the ivory background, then the hero image dissolves in with a
 * soft bloom as you scroll — like walking through a doorway.
 *
 * Props:
 *  - label     (string)  tiny uppercase kicker
 *  - title     (string)  italic display title
 *  - whisper   (string)  optional description
 *  - image     (string)  hero image URL (full bleed)
 *  - imageAlt  (string)  alt text
 */
export default function CinematicThreshold({ label, title, whisper, image, imageAlt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Cinematic auto-reveal: dissolve in from ivory with soft bloom — matched to CinematicBridge timing
  const imgOpacity = useTransform(scrollYProgress, [0.02, 0.25], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0.02, 0.35], [1.08, 1]);
  // Soft white bloom peaks mid-transition then fades
  const bloomOpacity = useTransform(scrollYProgress, [0.04, 0.15, 0.3], [0, 0.2, 0]);
  // Text fades in slightly after image starts
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.4], [16, 0]);

  if (!image) {
    // No-image fallback: simple centered text
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 0.1, 0.28, 1] }}
        className="w-full flex flex-col items-center text-center"
        style={{ padding: 'clamp(48px, 8vh, 96px) clamp(24px, 5vw, 48px)' }}
      >
        {label && (
          <span className="block font-sans uppercase" style={{ fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.5em', color: '#A48A6A', marginBottom: '14px' }}>
            {label}
          </span>
        )}
        <h2 className="font-display italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, lineHeight: 1.08, color: '#1C1C1A', letterSpacing: '0.015em', margin: 0 }}>
          {title}
        </h2>
        {whisper && (
          <p className="font-serif italic mx-auto" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 1rem)', lineHeight: 1.65, fontWeight: 300, color: '#9A9893', maxWidth: '400px', marginTop: 'clamp(14px, 2vh, 22px)', marginBottom: 0 }}>
            {whisper}
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{
      height: 'clamp(55vh, 65vh, 80vh)',
    }}>
      {/* Ivory base — visible before reveal */}
      <div className="absolute inset-0" style={{ background: 'hsl(42 22% 95%)' }} />

      {/* Hero image — dissolves in on scroll */}
      <motion.img
        src={image}
        alt={imageAlt || title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: imgOpacity,
          scale: imgScale,
          filter: getImageAdjust(image),
          imageRendering: '-webkit-optimize-contrast',
          willChange: 'transform',
        }}
      />

      {/* White bloom — peaks mid-dissolve like light flooding in */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.35) 50%, transparent 80%)',
          opacity: bloomOpacity,
        }}
      />

      {/* Top gradient — blends from ivory above */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-[2]" style={{
        height: '25%',
        background: 'linear-gradient(to bottom, hsl(42 22% 95%) 0%, transparent 100%)',
      }} />

      {/* Bottom gradient — text readability + bleed into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]" style={{
        height: '55%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
      }} />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        boxShadow: 'inset 0 0 100px 30px rgba(0,0,0,0.08)',
      }} />

      {/* Text overlay — fades in after image begins */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[4] flex flex-col items-center text-center"
        style={{
          opacity: textOpacity,
          y: textY,
          padding: 'clamp(28px, 5vw, 56px)',
        }}
      >
        {label && (
          <span className="block font-sans uppercase" style={{
            fontSize: '0.5rem',
            fontWeight: 400,
            letterSpacing: '0.5em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
          }}>
            {label}
          </span>
        )}

        <h2 className="font-display italic" style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          fontWeight: 400,
          lineHeight: 1.08,
          color: '#fff',
          letterSpacing: '0.015em',
          margin: 0,
          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}>
          {title}
        </h2>

        {whisper && (
          <p className="font-serif italic mx-auto" style={{
            fontSize: 'clamp(0.82rem, 1.1vw, 1rem)',
            lineHeight: 1.6,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '440px',
            marginTop: 'clamp(10px, 1.5vh, 18px)',
            marginBottom: 0,
            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
          }}>
            {whisper}
          </p>
        )}
      </motion.div>
    </div>
  );
}