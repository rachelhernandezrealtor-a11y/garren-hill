import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

/**
 * Visual breathing space between tour sections.
 * A thin divider line with an optional italic phrase — feels like turning a page.
 */
export default function TourTransition({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease }}
      className="flex flex-col items-center py-14 md:py-24"
    >
      <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent)' }} />
      {text && (
        <p className="font-display italic text-[clamp(0.92rem,1.5vw,1.18rem)] font-light text-white/50 mt-6 text-center max-w-md leading-relaxed tracking-wide">
          {text}
        </p>
      )}
    </motion.div>
  );
}