import React from 'react';
import { motion } from 'framer-motion';

/*
 * Quote sits ON the seam between SunsetAerial and OpportunityHero.
 * It pulls upward with negative margin so it overlaps the bottom
 * of the aerial image — no black gap, no separate block.
 */
export default function SunsetQuoteSeam() {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        zIndex: 20,
        marginTop: 'clamp(-140px, -18vh, -90px)',
        marginBottom: 'clamp(-140px, -18vh, -90px)',
        padding: 'clamp(32px, 6vh, 80px) 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p style={{
          fontFamily: "'DM Serif Display', 'Canela', 'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.55,
          letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
          textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.4)',
        }}>A property with purpose—</p>
        <p style={{
          fontFamily: "'DM Serif Display', 'Canela', 'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.55,
          letterSpacing: '0.02em',
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
          textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.4)',
        }}>and the infrastructure to perform.</p>
      </motion.div>
    </div>
  );
}