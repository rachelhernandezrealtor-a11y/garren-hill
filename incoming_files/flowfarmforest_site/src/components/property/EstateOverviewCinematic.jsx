import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMG_AERIAL = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg';
const IMG_FARM = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e7ec84dc8_newpic.jpg';

const ease = [0.16, 0.02, 0.12, 1];
const IMG_FILTER = 'saturate(0.72) contrast(1.28) brightness(0.74)';

export default function EstateOverviewCinematic() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.06]);

  const img2Ref = useRef(null);
  const { scrollYProgress: img2Progress } = useScroll({
    target: img2Ref,
    offset: ['start end', 'end start'],
  });
  const img2Y = useTransform(img2Progress, [0, 1], ['0%', '12%']);
  const img2Scale = useTransform(img2Progress, [0, 1], [1.02, 1.06]);

  return (
    <section className="relative w-full bg-black z-10 shadow-[0_-24px_60px_rgba(0,0,0,0.8)]">

      {/* ── Image 1: Wide aerial with text overlay ── */}
      <div ref={imgRef} className="relative w-full overflow-hidden" style={{ minHeight: '85vh' }}>
        <motion.img
          src={IMG_AERIAL}
          alt="Flow Farm — aerial overview"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 38%',
            filter: IMG_FILTER,
            y: imgY,
            scale: imgScale,
            willChange: 'transform',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom,
              rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.50) 35%,
              rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.50) 65%,
              rgba(0,0,0,0.25) 100%)`,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, transparent 40%,
              rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.50) 100%)`,
          }}
        />
        {/* Bottom fade to black for seamless transition */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '25%', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)' }} />

        {/* Text content — centered */}
        <div className="relative z-10 flex items-center justify-center w-full" style={{ minHeight: '85vh' }}>
          <div style={{ maxWidth: '720px', padding: '0 clamp(28px, 6vw, 56px)', textAlign: 'center' }}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2.0, delay: 0.1, ease }}
              className="font-sans uppercase block"
              style={{ fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.42em', color: 'rgba(255,255,255,0.50)', marginBottom: 'clamp(24px, 3.5vh, 36px)' }}
            >
              Estate Overview
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 2.8, delay: 0.3, ease }}
              className="font-serif"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 400, lineHeight: '1', letterSpacing: '-0.03em', color: '#ffffff', marginBottom: 'clamp(48px, 7vh, 80px)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
            >
              Built for enterprise.<br />Designed for legacy.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.2, delay: 0.7, ease }}
              style={{ marginBottom: 'clamp(36px, 5vh, 56px)' }}
            >
              <p className="font-sans" style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)', lineHeight: '1.7', letterSpacing: '0.012em', color: 'rgba(255,255,255,0.92)', marginBottom: '3px', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                Fifteen acres. Eight structures.
              </p>
              <p className="font-sans" style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)', lineHeight: '1.7', letterSpacing: '0.012em', color: 'rgba(255,255,255,0.92)', marginBottom: 0, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                A fully integrated working estate.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.4, delay: 1.2, ease }}
              className="font-sans"
              style={{ fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)', lineHeight: '2.0', letterSpacing: '0.008em', color: 'rgba(255,255,255,0.78)', maxWidth: '480px', margin: '0 auto', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
            >
              Including a three-acre veganic farm and fully integrated systems.
            </motion.p>
          </div>
        </div>
      </div>

      {/* No gap — bottom of aerial fades to black, top of farm fades from black */}

      {/* ── Image 2: Farm / cultivated land ── */}
      <div ref={img2Ref} className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(50vh, 60vh, 70vh)' }}>
        <motion.img
          src={IMG_FARM}
          alt="Flow Farm — cultivated farmland"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 48%',
            filter: IMG_FILTER,
            y: img2Y,
            scale: img2Scale,
            willChange: 'transform',
          }}
        />
        {/* Top fade from black for seamless transition */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '25%', background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)' }} />
        {/* Subtle overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.25) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, transparent 45%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.30) 80%, rgba(0,0,0,0.45) 100%)' }} />

        {/* Bottom fade to white — transitions into content below */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '40%', background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 40%, transparent 100%)' }} />
      </div>
    </section>
  );
}