import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

function CinematicImage({ image, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 2.2, delay: 0.1, ease }}
      className="w-full overflow-hidden relative"
      style={{ height: 'clamp(50vh, 62vh, 72vh)' }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center 42%',
          filter: 'brightness(1.0) contrast(1.06) saturate(0.92) sepia(0.02)',
          y: imgY,
          willChange: 'transform',
        }}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      {/* Cinematic bottom gradient + vignette */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.15) 100%)' }} />
      {/* Caption */}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="absolute bottom-6 left-6 sm:left-10 font-sans text-white z-10"
        style={{
          fontSize: 'clamp(0.68rem, 0.85vw, 0.8rem)',
          fontWeight: 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}
      >
        {image.caption}
      </motion.span>
    </motion.div>
  );
}

export default function LandChapter() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start center', 'center end'],
  });
  const bgY = useTransform(heroScroll, [0, 1], ['-6%', '6%']);

  return (
    <>
    <section data-nav-theme="light" className="relative w-full" style={{ background: '#F6F4EF', paddingBottom: 'clamp(20px, 3vh, 32px)' }}>
      {/* Light editorial hero with forest image accent */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'clamp(50vh, 58vh, 66vh)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Parallax forest background — lighter treatment */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgY,
            willChange: 'transform',
          }}
        >
          <img
            src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/57358cb76_107LindenTrailGrass-34.jpg"
            alt="Forest canopy at Flow Farm"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 30%',
              filter: 'brightness(1.08) contrast(1.02) saturate(0.88) sepia(0.06)',
              minHeight: '120%',
            }}
          />
        </motion.div>

        {/* Darker overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Text content */}
        <div
          className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8"
          style={{
            paddingTop: 'clamp(56px, 7vh, 96px)',
            paddingBottom: 'clamp(60px, 8vh, 96px)',
          }}
        >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.0, ease }}
          className="block font-sans uppercase"
          style={{
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.38em',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 'clamp(22px, 3vh, 32px)',
          }}
        >
          The Land
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.8, delay: 0.15, ease }}
          className="font-display"
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '0.01em',
            marginBottom: 'clamp(30px, 4vh, 48px)',
            color: '#fff',
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          Veganic Agriculture.<br />
          Fully Realized.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.4, ease }}
          className="font-sans"
          style={{
            fontSize: 'clamp(0.94rem, 1.1vw, 1.06rem)',
            lineHeight: 1.9,
            maxWidth: '600px',
            color: 'rgba(255,255,255,0.78)',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            margin: 0,
          }}
        >
          Three acres of working farmland, a greenhouse, and a high tunnel — generating income, building soil, and establishing the agricultural credentials that unlock farmer exemption benefits. Flow Farm goes beyond organic: no pesticides, no chemicals, no animal byproducts of any kind. A system that works on its own terms, reducing operational costs while supporting whatever vision comes next.
        </motion.p>
        </div>
      </div>



    </section>

    {/* Seam breath */}
    <div className="relative w-full flex items-center justify-center" style={{ padding: 'clamp(20px, 3vh, 36px) 24px', pointerEvents: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease }}
        className="text-center"
      >
        <p className="font-serif italic text-center" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', fontWeight: 300, lineHeight: 1.55, color: 'rgba(28,28,26,0.25)', maxWidth: '500px', margin: 0 }}>
          "Plants feeding plants.
        </p>
        <p className="font-serif italic text-center" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.25rem)', fontWeight: 300, lineHeight: 1.55, color: 'rgba(28,28,26,0.25)', maxWidth: '500px', margin: 0 }}>
          Land that gets better with time."
        </p>
      </motion.div>
    </div>
    </>
  );
}