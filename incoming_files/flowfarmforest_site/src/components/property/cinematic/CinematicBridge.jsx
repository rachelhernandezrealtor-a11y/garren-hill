import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

const slowEase = [0.16, 0.1, 0.24, 1];

/**
 * CinematicBridge — scroll-triggered dissolve between two images.
 * As the user scrolls through, the "from" image dissolves into the "to" image
 * with a soft light bloom, like walking from one room to the next.
 *
 * Props:
 *   fromImage   — URL of the departing section's image
 *   toImage     — URL of the arriving section's image
 *   fromAlt     — alt text for departing image
 *   toAlt       — alt text for arriving image
 *   whisper     — optional italic text centered below the image
 *   caption     — optional small caption overlaid at bottom
 */
export default function CinematicBridge({
  fromImage,
  toImage,
  fromAlt = '',
  toAlt = '',
  whisper,
  caption,
  light = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Auto-reveal begins immediately as bridge enters viewport — no ivory flash
  // fromImage blooms in from the moment the element is visible
  const fromOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const toOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2, 0.32, 0.48], [0, 0.22, 0, 0.22, 0]);
  const fromScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1.02]);
  const toScale = useTransform(scrollYProgress, [0.3, 0.7], [1.06, 1]);

  return (
    <div ref={ref}>
      {/* Full-bleed dissolve — no padding, no borders, seamless flow */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          height: 'clamp(50vh, 60vh, 75vh)',
        }}
      >
        {/* FROM image — auto-reveals from ivory */}
        <motion.img
          src={fromImage}
          alt={fromAlt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: fromOpacity,
            scale: fromScale,
            filter: getImageAdjust(fromImage),
            imageRendering: '-webkit-optimize-contrast',
          }}
        />

        {/* TO image — dissolves in */}
        <motion.img
          src={toImage}
          alt={toAlt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: toOpacity,
            scale: toScale,
            filter: getImageAdjust(toImage),
            imageRendering: '-webkit-optimize-contrast',
          }}
        />

        {/* Light bloom — peaks mid-transition */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.35) 50%, transparent 80%)',
            opacity: bloomOpacity,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* Top edge fade — blends into section above */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: light ? '20%' : '25%',
          background: `linear-gradient(to bottom, ${light ? '#F6F4EF' : 'hsl(42 22% 95%)'} 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Bottom edge fade — blends toImage into the section below */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: light ? '15%' : '18%',
          background: `linear-gradient(to top, ${light ? '#F6F4EF' : 'hsl(42 22% 95%)'} 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Caption overlay */}
        {caption && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(24px, 4vw, 48px)',
              zIndex: 4,
              textAlign: 'center',
              opacity: toOpacity,
            }}
          >
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '0.5rem',
                fontWeight: 400,
                letterSpacing: '0.45em',
                color: 'rgba(255,255,255,0.7)',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              {caption}
            </span>
          </motion.div>
        )}

        {/* Cinematic vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow: light ? 'inset 0 0 80px 20px rgba(0,0,0,0.04)' : 'inset 0 0 120px 40px rgba(0,0,0,0.1)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>

    </div>
  );
}