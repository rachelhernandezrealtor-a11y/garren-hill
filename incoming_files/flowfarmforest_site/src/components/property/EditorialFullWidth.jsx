import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialFullWidth({ image, height = 'lg' }) {
  const heightClasses = {
    sm: 'h-[300px] sm:h-[400px]',
    md: 'h-[400px] sm:h-[500px] lg:h-[600px]',
    lg: 'h-[500px] sm:h-[600px] lg:h-[700px]',
    xl: 'h-[600px] sm:h-[700px] lg:h-[800px]'
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-12 sm:py-20 lg:py-28 px-6 sm:px-8"
    >
      <div className="max-w-7xl mx-auto overflow-hidden rounded-lg">
        <img
          src={image}
          alt="Full-width editorial moment"
          className={`w-full ${heightClasses[height]} object-cover hover:scale-105 transition-transform duration-700`}
        />
      </div>
    </motion.section>
  );
}