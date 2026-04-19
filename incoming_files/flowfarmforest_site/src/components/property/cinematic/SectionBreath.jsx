import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 0.1, 0.24, 1];

/**
 * A cinematic breathing space between editorial sections.
 * Renders a soft gradient wash with an optional whisper line of text
 * that fades in gently as the user scrolls into it.
 */
export default function SectionBreath({ whisper }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.35, 0.7, 0.95], [0, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative flex flex-col items-center justify-center"
    >
      {/* Top gradient fade — dissolves the previous section's edge */}
      <div
        className="w-full pointer-events-none"
        style={{
          height: 'clamp(40px, 6vh, 80px)',
          background: 'linear-gradient(to bottom, transparent, hsl(42 22% 95%))',
        }}
      />

      {/* Center breathing zone */}
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ padding: 'clamp(20px, 3vh, 40px) 0' }}
      >
        {/* Expanding center line */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="origin-center"
        >
          <div style={{
            width: 'clamp(32px, 5vw, 56px)',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)',
          }} />
        </motion.div>

        {/* Optional whisper text */}
        {whisper && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3, ease }}
            className="font-serif italic text-center mx-auto"
            style={{
              fontSize: 'clamp(0.72rem, 0.9vw, 0.85rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              color: 'rgba(107,107,103,0.45)',
              maxWidth: '340px',
              marginTop: 'clamp(14px, 2vh, 24px)',
              marginBottom: 0,
            }}
          >
            {whisper}
          </motion.p>
        )}
      </div>

      {/* Bottom gradient fade — dissolves into the next section */}
      <div
        className="w-full pointer-events-none"
        style={{
          height: 'clamp(40px, 6vh, 80px)',
          background: 'linear-gradient(to top, transparent, hsl(42 22% 95%))',
        }}
      />
    </motion.div>
  );
}