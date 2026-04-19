import React from 'react';
import { motion } from 'framer-motion';

export default function KeyFeatureBox({ title, description, index }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/20 px-8 py-10 sm:py-12 hover:bg-white/10 hover:border-white/30 transition-all duration-300 min-h-[140px] flex flex-col justify-center">
      
      <div className="absolute top-4 left-6 w-6 h-6 border-t-2 border-l-2 border-white/30 group-hover:border-white/50 transition-colors" />
      
      <h3 className="font-serif text-xl sm:text-2xl text-white font-light leading-tight">
        {title}
      </h3>
      
      <div className="absolute bottom-4 right-6 w-6 h-6 border-b-2 border-r-2 border-white/30 group-hover:border-white/50 transition-colors" />
    </motion.div>
  );
}