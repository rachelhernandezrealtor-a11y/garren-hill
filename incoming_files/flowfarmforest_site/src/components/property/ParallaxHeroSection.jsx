import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ParallaxHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center']
  });

  // Parallax effect: background moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const backgroundImage = 'https://images.unsplash.com/photo-1500382017468-7049fae79eba?w=1920&q=80';

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={backgroundImage}
          alt="Flow Farm Estate"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

      {/* Text Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-start pl-8 sm:pl-12 md:pl-16 lg:pl-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-sm md:max-w-md lg:max-w-lg"
        >
          <p className="font-serif text-3xl sm:text-4xl md:text-5xl leading-relaxed text-white font-light">
            Flow Farm is designed for both residential elegance and agricultural operation: the architecturally significant main residence, private cabana house, climate-controlled high-tunnel greenhouse, operational farm workshop, regenerative compost area, and biochar production zone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}