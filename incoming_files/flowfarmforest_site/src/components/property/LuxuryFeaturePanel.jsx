import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function LuxuryFeaturePanel({ items = [], columns = 3 }) {
  const colClasses = {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`grid ${colClasses[columns]} gap-6 sm:gap-8 lg:gap-10`}>
      
      {items.map((item, i) => (
        <motion.div
          key={item.id || i}
          custom={i}
          variants={fadeInUp}
          className="group relative">
          
          {/* Premium card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 border border-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Card content */}
          <div className="relative p-6 sm:p-7 lg:p-8 rounded-lg hover:bg-white/50 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:translate-y-[-2px]">
            
            {/* Number badge */}
            {item.number !== undefined && (
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground/50 block mb-3 group-hover:text-foreground/70 transition-colors">
                {String(item.number).padStart(2, '0')}
              </span>
            )}
            
            {/* Title */}
            <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-primary mb-3 group-hover:text-primary/90 transition-colors duration-300 leading-tight">
              {item.title}
            </h3>
            
            {/* Description */}
            {item.description && (
              <p className="text-sm sm:text-base text-foreground/65 group-hover:text-foreground/80 transition-colors duration-300 font-light leading-relaxed">
                {item.description}
              </p>
            )}
            
            {/* Optional tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="font-sans text-xs uppercase tracking-[0.1em] text-foreground/40 group-hover:text-foreground/60 transition-colors px-2 py-1 border border-foreground/10 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}