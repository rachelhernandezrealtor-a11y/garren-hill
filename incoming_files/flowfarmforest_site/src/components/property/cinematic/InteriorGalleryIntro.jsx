import React from 'react';
import { motion } from 'framer-motion';
import ROOMS from './roomTourData';

import { useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function InteriorGalleryIntro() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  // Parallax offsets for a highly editorial, slow-moving staggered layout
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const img1 = ROOMS[1].heroImage; // Great Room (grand scale)
  const img2 = ROOMS[0].heroImage; // Foyer (intimate detail)
  const img3 = ROOMS[3].heroImage; // Conservatory (light)

  return (
    <section ref={ref} className="relative w-full bg-black py-32 md:py-48 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 mb-24 md:mb-32 text-center relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#C9B18F]/40" />
            <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F] mb-0">
              The Interior Dialogue
            </p>
            <div className="h-px w-16 bg-[#C9B18F]/40" />
          </div>
          <h2 className="font-display text-[clamp(3.2rem,6vw,6.5rem)] font-medium leading-[1.02] text-white tracking-tight mb-8 drop-shadow-xl mx-auto max-w-[14ch] text-balance">
            A Masterclass in Scale and Restraint.
          </h2>
          <p className="font-sans text-[1.1rem] md:text-[1.25rem] leading-[1.85] text-white/60 max-w-2xl mx-auto font-light text-balance">
            More than a residence, it is a curated experience of light and texture. The spaces reject the superfluous, favoring the profound gravity of reclaimed heart pine and the quiet drama of soaring timber trusses. Every sightline is a deliberate composition; every room, an exercise in absolute intention.
          </p>
        </motion.div>
      </div>

      {/* Editorial Staggered Layout */}
      <div className="max-w-[100rem] mx-auto px-6 relative mt-16 md:mt-40 mb-16 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 relative">
          
          {/* Main Large Image */}
          <motion.div 
            className="md:col-span-8 md:col-start-3 relative z-10"
            style={{ y: y1 }}
          >
            <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[2px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
              <img src={img1} alt="Great Room" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-[1.03]" style={{ filter: 'saturate(1.05) contrast(1.05) brightness(0.95)' }} />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Overlapping Secondary Image */}
          <motion.div 
            className="md:col-span-4 md:col-start-9 md:-mt-48 relative z-20"
            style={{ y: y2 }}
          >
            <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5">
              <img src={img2} alt="Foyer Detail" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-[1.03]" style={{ filter: 'saturate(1.05) contrast(1.1) brightness(0.9)' }} />
            </div>
          </motion.div>

          {/* Third Image - Hidden on mobile, overlaps on the left */}
          <motion.div 
            className="md:col-span-4 md:col-start-1 md:-mt-[28rem] relative z-30 hidden md:block"
            style={{ y: y3 }}
          >
            <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/5">
              <img src={img3} alt="Conservatory" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-[1.03]" style={{ filter: 'saturate(1.05) contrast(1.05) brightness(0.85)' }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}