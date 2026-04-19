import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

const WIDE_STEP = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/f98119ec1_107LindenTrailGrass-67.jpg';
const CLOSE_DOOR = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/c69337fa4_frontdoorentryphoto.jpg';
const DOOR_OPEN = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/69e32034b_foyergood.jpg';
const FOYER = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/955343688_foyer.jpg';

const ease = [0.22, 0.1, 0.28, 1];

const CAPTIONS = [
  'Brick steps, timber column, cedar shake tower beyond',
  'Reclaimed heart pine door — lantern light and brick',
  'The door opens — star pendant and herringbone floor',
  'Heart pine underfoot, light overhead — the residence begins here',
];

export default function ResidenceEntrance() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3800);
    const t3 = setTimeout(() => setPhase(3), 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Phase 0: Wide front step */}
      <motion.img
        src={WIDE_STEP}
        alt="The approach — brick steps"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        style={{ filter: getImageAdjust(WIDE_STEP) }}
        animate={{
          scale: phase === 0 ? 1 : 1.2,
          opacity: phase === 0 ? 1 : 0,
        }}
        transition={{ duration: 2.2, ease }}
      />

      {/* Phase 1: Close-up door */}
      <motion.img
        src={CLOSE_DOOR}
        alt="Reclaimed heart pine door"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        style={{ filter: getImageAdjust(CLOSE_DOOR) }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{
          opacity: phase === 1 ? 1 : phase > 1 ? 0 : 0,
          scale: phase === 1 ? 1 : phase > 1 ? 1.25 : 1.2,
        }}
        transition={{ duration: 2.4, ease }}
      />

      {/* Phase 2: Door open */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: phase === 2 ? 1 : phase > 2 ? 0 : 0,
          scale: phase === 2 ? 1 : phase > 2 ? 1.15 : 1.1,
        }}
        transition={{ duration: 2.4, ease }}
      >
        <img
          src={DOOR_OPEN}
          alt="Front door open — foyer glimpse"
          className="w-full h-full object-contain sm:object-cover"
          style={{ filter: getImageAdjust(DOOR_OPEN) }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)' }} />
      </motion.div>

      {/* Phase 3: Full foyer — seamless reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{
          opacity: phase >= 3 ? 1 : 0,
          scale: phase >= 3 ? 1 : 1.15,
        }}
        transition={{ duration: 2.8, ease }}
        style={{ zIndex: phase >= 3 ? 5 : 0 }}
      >
        <img
          src={FOYER}
          alt="The Foyer — heart pine underfoot"
          className="w-full h-full object-contain sm:object-cover"
          style={{ filter: getImageAdjust(FOYER) }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.12) 100%)' }} />
      </motion.div>

      {/* Light bloom on each transition */}
      <AnimatePresence>
        {(phase === 1 || phase === 2 || phase === 3) && (
          <motion.div
            key={phase}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: phase === 3
                ? 'radial-gradient(ellipse at 50% 45%, rgba(255,250,240,0.9) 0%, rgba(255,255,255,0.15) 50%, transparent 80%)'
                : phase === 2
                  ? 'radial-gradient(ellipse at 50% 45%, rgba(255,250,240,0.9) 0%, rgba(255,255,255,0.2) 50%, transparent 80%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(255,245,230,0.85) 0%, rgba(255,255,255,0.2) 55%, transparent 85%)',
              zIndex: 3,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, phase === 3 ? 0.3 : phase === 2 ? 0.35 : 0.2, 0] }}
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

      {/* Captions — one per phase */}
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: 'clamp(20px, 3vw, 40px)', zIndex: 4 }}>
        {CAPTIONS.map((cap, i) => (
          <motion.span
            key={i}
            className="block font-sans text-white"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.78rem)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              position: i > 0 ? 'absolute' : 'relative',
              bottom: i > 0 ? 'clamp(20px, 3vw, 40px)' : undefined,
              left: i > 0 ? 'clamp(20px, 3vw, 40px)' : undefined,
            }}
            animate={{
              opacity: phase === i ? 1 : 0,
              y: phase === i ? 0 : 8,
            }}
            transition={{ duration: 0.8, delay: phase === i ? 0.4 : 0, ease }}
          >
            {cap}
          </motion.span>
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.08)',
        zIndex: 1,
      }} />

    </div>
  );
}