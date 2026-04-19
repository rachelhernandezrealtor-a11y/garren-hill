import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

// Sotheby's-grade subtle text colors
const TEXT_LIGHT = 'rgba(28,28,26,0.6)';
const TEXT_DARK = 'rgba(255,252,245,0.7)';
const SUB_LIGHT = 'rgba(154,140,122,0.8)';
const SUB_DARK = 'rgba(255,252,245,0.4)';

/**
 * NarrativeSeam — a breath between sections.
 * Uses gradient fades to melt into the sections above and below it.
 *
 * Props:
 *   quote      — the editorial line
 *   sub        — small kicker above the quote (optional)
 *   fromColor  — background of the section above (hex), defaults to #F6F4EF
 *   toColor    — background of the section below (hex), defaults to #F6F4EF
 *   bg         — own background color (hex), defaults to #0d0b08
 *   textColor  — quote text color
 */
export default function NarrativeSeam({
  quote,
  sub,
  fromColor = '#F6F4EF',
  toColor = '#F6F4EF',
  bg = '#0d0b08',
  textColor
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Refined color logic for luxury aesthetic
  const isDark = bg === '#3a3430' || bg === '#0d0b08' || bg.startsWith('#0') || bg === '#000' || bg === '#111';
  const resolvedText = textColor || (isDark ? TEXT_DARK : TEXT_LIGHT);
  const resolvedSub = isDark ? SUB_DARK : SUB_LIGHT;

  return (
    <div
      ref={ref}
      data-nav-theme={isDark ? 'dark' : 'light'}
      className="relative w-full"
      style={{ background: bg, position: 'relative', zIndex: 1 }}>
      
      {/* Fade in from section above */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 'clamp(60px, 8vh, 100px)',
          background: `linear-gradient(to bottom, ${fromColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 2
        }} />
      

      {/* Content */}
      




























      

      {/* Fade out into section below */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'clamp(60px, 8vh, 100px)',
          background: `linear-gradient(to top, ${toColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 2
        }} />
      
    </div>);

}