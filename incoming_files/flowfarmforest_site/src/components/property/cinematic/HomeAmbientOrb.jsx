import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomeAmbientOrb() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1400], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500, 1400], [0.22, 0.16, 0.05]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] hidden lg:block"
      style={{ y, opacity }}
    >
      <div
        className="mx-auto h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212,185,138,0.22) 0%, rgba(212,185,138,0.08) 34%, rgba(212,185,138,0) 72%)'
        }}
      />
    </motion.div>
  );
}