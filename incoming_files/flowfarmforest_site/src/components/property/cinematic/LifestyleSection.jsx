import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5064633b_JPEGimage.jpg';
const ease = [0.22, 0.1, 0.28, 1];

export default function LifestyleSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(50vh, 60vh, 70vh)' }}>
      <motion.img
        src={IMG}
        alt="Flow Farm forest canopy — privacy and seclusion"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(0.7) contrast(1.1) brightness(0.72)', y: imgY, willChange: 'transform' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.35) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, transparent 40%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.45) 100%)' }} />

      <div className="relative z-10 flex items-center justify-center w-full" style={{ minHeight: 'clamp(50vh, 60vh, 70vh)' }}>
        <div style={{ maxWidth: '600px', padding: '0 clamp(28px, 6vw, 56px)', textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.2, ease }}
            className="font-serif"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 300, lineHeight: '1.15', color: '#ffffff', marginBottom: 'clamp(24px, 3.5vh, 36px)', textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            This is not just a home.<br />This is a system.<br />This is rare.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.5, ease }}
            className="font-sans"
            style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: '1.9', color: 'rgba(255,255,255,0.72)', maxWidth: '440px', margin: '0 auto', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            Privacy. Self-sufficiency. Land. Design.<br />
            Everything here was built with intention — and built to last.
          </motion.p>
        </div>
      </div>
    </section>
  );
}