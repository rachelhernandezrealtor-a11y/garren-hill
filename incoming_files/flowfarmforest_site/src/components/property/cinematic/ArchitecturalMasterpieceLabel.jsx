import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ArchitecturalMasterpieceLabel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Vertical parallax against scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={containerRef} className="sticky top-0 z-0 w-full h-[100svh] min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
      {/* Slow continuous pan/zoom simulating drone video */}
      <motion.div 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y }}
      >
        <motion.img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/967c6b791_107LindenTrailGrass-65.jpg"
          alt="Main Residence Masterpiece"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05, x: "0%" }}
          animate={{ scale: 1.12, x: "-1.5%" }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{ filter: 'brightness(1.08) contrast(1.1) saturate(1.1)' }}
        />
      </motion.div>

      {/* Gradient Overlays for Cinematic Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      {/* Floating Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto text-center px-6"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 sm:w-16 bg-[#C9B18F]/60" />
          <p className="font-sans text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#C9B18F] mb-0 drop-shadow-md">
            Editorial Pause
          </p>
          <div className="h-px w-10 sm:w-16 bg-[#C9B18F]/60" />
        </div>
        
        <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.95] text-white tracking-tight text-balance mb-6 drop-shadow-2xl">
          The House That Quietly<br/>Steals the Whole Show
        </h2>
        
        <p className="font-sans text-[1.1rem] md:text-[1.35rem] leading-[1.6] font-light text-white/90 max-w-3xl mx-auto drop-shadow-lg text-balance">
          Architect-designed, materially rich, and impossible to confuse with ordinary luxury.
        </p>
      </motion.div>
    </section>
  );
}