import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/99b35ecb7_love.jpg';

export default function SunsetAerial() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full"
      style={{ background: 'transparent', marginTop: '-2px', marginBottom: '-2px', overflow: 'hidden' }}
    >
      {/* Background image — full natural size, subtle parallax */}
      <motion.div style={{ y: imgY, willChange: 'transform' }}>
        <img
          src={IMG}
          alt="Flow Farm — aerial sunset view of estate and surrounding forest"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            filter: 'saturate(1.02) contrast(1.06) brightness(1.04) sepia(0.03)',
            imageRendering: '-webkit-optimize-contrast',
          }}
        />
      </motion.div>

      {/* Full cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, transparent 50%, rgba(0,0,0,0.04) 75%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top seam gradient to color‑match previous section */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: 'clamp(200px, 30vh, 400px)',
          background: 'linear-gradient(to bottom, rgba(201,177,143,0.42) 0%, rgba(201,177,143,0.22) 38%, rgba(201,177,143,0.10) 64%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Quote overlay — bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none" style={{ padding: '0 clamp(20px, 5vw, 64px) clamp(32px, 6vh, 80px)' }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(1.15rem, 2vw, 1.65rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.55,
            letterSpacing: '0.02em',
            color: 'rgba(255,255,255,0.75)',
            textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.4)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          A property with purpose—<br/>and the infrastructure to perform.
        </motion.p>
      </div>

    </section>
  );
}