import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ParallaxSection({
  backgroundImage,
  title,
  subtitle,
  height = 'h-screen',
  parallaxStrength = 0.5,
  overlayOpacity = 0.4,
  children
}) {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Get section position relative to viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1) as section comes into view
      const scrollProgress = 1 - (sectionTop + sectionHeight) / (windowHeight + sectionHeight);
      
      // Clamp to reasonable range
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate translateY with restrained motion (0 to 100px)
      const translateAmount = clampedProgress * 100 * parallaxStrength;
      setOffsetY(translateAmount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxStrength]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${height}`}
    >
      {/* Background layer with parallax transform */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform',
          transition: 'none'
        }}
      />

      {/* Overlay layer for text contrast */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: overlayOpacity
        }}
      />

      {/* Content layer - stays stable, doesn't move with scroll */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 sm:mb-6"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-lg sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 sm:mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}