import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

const WIDE_STEP = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/d7a423bb3_frontstep.jpg';
const CLOSE_DOOR = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/c69337fa4_frontdoorentryphoto.jpg';

const ease = [0.22, 0.1, 0.28, 1];

export default function ApproachBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [phase, setPhase] = useState(0); // 0=wide, 1=close

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 2000);
    return () => clearTimeout(t1);
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      {/* Layer 1: Wide front step — zooms in as it fades */}
      <motion.img
        src={WIDE_STEP}
        alt="Brick steps and timber column — the approach"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: getImageAdjust(WIDE_STEP) }}
        animate={{
          scale: phase === 0 ? 1 : 1.2,
          opacity: phase === 0 ? 1 : 0,
        }}
        transition={{ duration: 2.5, ease }}
      />

      {/* Layer 2: Close-up door — emerges from behind */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.25 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          scale: phase >= 1 ? 1 : 1.25,
        }}
        transition={{ duration: 2.8, ease }}
      >
        <img
          src={CLOSE_DOOR}
          alt="Reclaimed heart pine door — 107 Linden Trail"
          className="w-full h-full object-cover"
          style={{ filter: getImageAdjust(CLOSE_DOOR) }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)' }}
        />
      </motion.div>

      {/* Warm bloom during transition */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255,245,230,0.85) 0%, rgba(255,255,255,0.2) 55%, transparent 85%)',
              zIndex: 3,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 2.2, ease }}
          />
        )}
      </AnimatePresence>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '40%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)',
        zIndex: 2,
      }} />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: 'clamp(20px, 3vw, 40px)', zIndex: 4 }}>
        <motion.span
          className="block font-sans text-white"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.78rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.5,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
          animate={{ opacity: phase === 0 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Brick steps, timber column, cedar shake tower beyond
        </motion.span>
        <motion.span
          className="block font-sans text-white"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.78rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.5,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            position: 'absolute',
            bottom: 'clamp(20px, 3vw, 40px)',
            left: 'clamp(20px, 3vw, 40px)',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: phase === 1 ? 1 : 0,
            y: phase === 1 ? 0 : 8,
          }}
          transition={{ duration: 1, delay: phase === 1 ? 0.6 : 0, ease }}
        >
          Reclaimed heart pine door — lantern light and brick
        </motion.span>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.08)',
        zIndex: 1,
      }} />
    </div>
  );
}