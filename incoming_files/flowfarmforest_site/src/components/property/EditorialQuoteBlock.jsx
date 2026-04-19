import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialQuoteBlock({ quote, author, role, style = 'elegant' }) {
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (style === 'elegant') {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={variants}
        className="w-full py-20 sm:py-28 lg:py-36 px-6 sm:px-8 bg-foreground/[0.02]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="space-y-6">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-relaxed font-light italic">
              "{quote}"
            </p>
            {author && (
              <div className="pt-6 border-t border-foreground/10">
                <p className="font-sans text-sm uppercase tracking-[0.2em] text-foreground/70 font-light">
                  {author}
                </p>
                {role && (
                  <p className="text-xs uppercase tracking-[0.15em] text-foreground/50 mt-2 font-light">
                    {role}
                  </p>
                )}
              </div>
            )}
          </blockquote>
        </div>
      </motion.section>
    );
  }

  if (style === 'minimal') {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={variants}
        className="w-full py-16 sm:py-24 lg:py-32 px-6 sm:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-light">
            {quote}
          </p>
          {author && (
            <p className="mt-8 text-sm text-foreground/60 font-light">
              — {author} {role && `(${role})`}
            </p>
          )}
        </div>
      </motion.section>
    );
  }
}