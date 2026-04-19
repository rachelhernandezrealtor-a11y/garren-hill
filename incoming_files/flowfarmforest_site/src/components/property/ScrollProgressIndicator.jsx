import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressIndicator({ target }) {
  const { scrollYProgress } = useScroll(
    target
      ? {
          target,
          offset: ['start start', 'end end'],
        }
      : undefined
  );
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 pointer-events-none lg:flex">
      <div className="relative h-40 w-[1px] bg-black/8">
        <motion.div
          className="absolute bottom-0 left-0 right-0 origin-bottom bg-[#8C7A63]"
          style={{ scaleY, height: '100%' }}
        />
      </div>
      <div className="absolute -left-3 -top-7 h-2 w-2 rounded-full bg-[#b89a5a]/70 shadow-[0_0_18px_rgba(184,154,90,0.28)]" />
      <div className="absolute -right-[22px] top-[-18px] rotate-90 font-sans text-[0.52rem] font-medium uppercase tracking-[0.32em] text-black/24">
        Scroll
      </div>
    </div>
  );
}