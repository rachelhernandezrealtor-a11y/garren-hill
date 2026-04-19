import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialDivider({ showLabel = false, label = '', spacing = 'lg' }) {
  const spacingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24 lg:py-32'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col items-center justify-center ${spacingClasses[spacing]}`}>
      
      {/* Top decorative line */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      {/* Center ornament */}
      <div className="my-6 sm:my-8">
        <div className="w-1 h-1 bg-primary rounded-full" />
        <div className="w-1 h-1 bg-primary rounded-full mt-1" />
      </div>
      
      {/* Optional label */}
      {showLabel && label && (
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-foreground/50 mb-6">
          {label}
        </p>
      )}
      
      {/* Bottom decorative line */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </motion.div>
  );
}