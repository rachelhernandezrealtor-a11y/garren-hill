import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getImageAdjust } from './imageAdjust';

/**
 * RoomDualHero — Two stacked images that crossfade/dissolve as you scroll.
 * The first image is fully visible at the top; as you scroll, it fades out
 * while the second image fades in underneath, creating a cinematic dissolve.
 *
 * Props:
 *  - image1     (string) first hero image URL (visible initially)
 *  - image2     (string) second image URL (revealed on scroll)
 *  - alt1       (string)
 *  - alt2       (string)
 *  - label      (string) tiny kicker text
 *  - title      (string) italic display title
 *  - whisper    (string) optional subtitle
 */
export default function RoomDualHero({ image1, image2, alt1, alt2, label, title, whisper }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Image 1: fully visible at start, fades out mid-scroll
  const img1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 1, 0]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.55], [1, 1.06]);

  // Image 2: hidden at start, fades in as image 1 fades out
  const img2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0, 0.7, 1]);
  const img2Scale = useTransform(scrollYProgress, [0.25, 0.65], [1.06, 1]);

  // White bloom during crossfade
  const bloomOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.55], [0, 0.15, 0]);

  // Text fades in with image 2
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.65], [20, 0]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: '160vh' }}>
      {/* Ivory base */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
        <div className="absolute inset-0" style={{ background: 'hsl(42 22% 95%)' }} />

        {/* Image 2 — underneath, revealed on scroll */}
        <motion.img
          src={image2}
          alt={alt2 || title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: img2Opacity,
            scale: img2Scale,
            filter: getImageAdjust(image2),
            imageRendering: '-webkit-optimize-contrast',
            willChange: 'transform, opacity',
          }}
        />

        {/* Image 1 — on top, fades out */}
        <motion.img
          src={image1}
          alt={alt1 || title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: img1Opacity,
            scale: img1Scale,
            filter: getImageAdjust(image1),
            imageRendering: '-webkit-optimize-contrast',
            willChange: 'transform, opacity',
          }}
        />

        {/* White bloom during crossfade */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
            opacity: bloomOpacity,
          }}
        />

        {/* Top gradient — blends from content above */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-[2]" style={{
          height: '20%',
          background: 'linear-gradient(to bottom, hsl(42 22% 95%) 0%, transparent 100%)',
        }} />

        {/* Bottom gradient for text readability */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]" style={{
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }} />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          boxShadow: 'inset 0 0 100px 30px rgba(0,0,0,0.08)',
        }} />

        {/* Text overlay — fades in with second image */}
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
              fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.5em',
              color: 'rgba(255,255,255,0.7)', marginBottom: '12px',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}>
              {label}
            </span>
          )}

          <h2 className="font-display italic" style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400,
            lineHeight: 1.08, color: '#fff', letterSpacing: '0.015em',
            margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            {title}
          </h2>

          {whisper && (
            <p className="font-serif italic mx-auto" style={{
              fontSize: 'clamp(0.82rem, 1.1vw, 1rem)', lineHeight: 1.6,
              fontWeight: 300, color: 'rgba(255,255,255,0.8)',
              maxWidth: '440px', marginTop: 'clamp(10px, 1.5vh, 18px)',
              marginBottom: 0, textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              {whisper}
            </p>
          )}
        </motion.div>

        {/* Scroll hint chevron — pulses gently, fades out as you scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[5] flex flex-col items-center pb-6"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          <span className="font-sans uppercase block" style={{
            fontSize: '0.48rem', fontWeight: 400, letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)', marginBottom: '6px',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>
            Scroll to reveal
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}