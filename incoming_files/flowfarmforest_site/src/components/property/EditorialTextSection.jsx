import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialTextSection({ content, alignment = 'center', kicker, quote }) {
  const alignmentClasses = {
    left: 'lg:max-w-2xl lg:pr-12',
    right: 'lg:max-w-2xl lg:ml-auto lg:pl-12',
    center: 'lg:max-w-3xl mx-auto'
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className={`w-full py-16 sm:py-24 lg:py-32 px-6 sm:px-8 ${alignmentClasses[alignment]}`}
    >
      {kicker && (
        <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-4 font-light">
          {kicker}
        </p>
      )}

      <div className="prose prose-sm sm:prose-base text-foreground/85 max-w-none leading-relaxed">
        {content}
      </div>

      {quote && (
        <blockquote className="mt-12 sm:mt-16 pt-8 border-t border-foreground/10">
          <p className="font-serif text-lg sm:text-2xl italic text-foreground leading-relaxed font-light">
            "{quote}"
          </p>
        </blockquote>
      )}
    </motion.section>
  );
}