import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialHeroSection({ image, title, subtitle }) {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-end">
      {/* Full-width cinematic background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Centered text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 sm:px-8 pb-20 sm:pb-32 flex flex-col items-center text-center max-w-2xl"
      >
        {subtitle && (
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-4 sm:mb-6 font-light">
            {subtitle}
          </p>
        )}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight font-light mb-6">
          {title}
        </h1>
      </motion.div>
    </section>
  );
}