import React from 'react';
import { motion } from 'framer-motion';
import { revealTransition, revealViewport } from './motionConfig';

/**
 * Sotheby's-style pull quote with refined border and typography.
 */
export default function EditorialQuote({ text, attribution, className = '' }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={revealTransition}
      className={`relative pl-7 sm:pl-10 py-1 ${className}`}
    >
      {/* Refined left accent line */}
      <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-foreground/20 via-foreground/8 to-transparent" />
      <p className="font-serif text-lg sm:text-xl md:text-[1.65rem] font-light text-foreground/56 leading-[1.62] italic tracking-[0.005em]">
        "{text}"
      </p>
      {attribution && (
        <cite className="block mt-5 font-sans text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-foreground/25 not-italic font-normal">
          {attribution}
        </cite>
      )}
    </motion.blockquote>
  );
}