import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

/**
 * A cinematic floor-level divider that visually separates the residence
 * into spatial zones (Main Level, Upper Level, Lower Level, etc.)
 */
export default function FloorLevelDivider({ level, subtitle }) {
  return (
    <div style={{ background: '#F6F4EF', padding: 'clamp(80px, 14vh, 160px) clamp(20px, 5vw, 56px)', position: 'relative', zIndex: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="text-center mx-auto"
        style={{ maxWidth: '480px' }}
      >
        {/* Decorative rule */}
        <div
          className="mx-auto"
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(164,138,106,0.25), transparent)',
            marginBottom: 'clamp(20px, 3vh, 32px)',
          }}
        />
        <span
          className="block font-sans uppercase"
          style={{
            fontSize: '0.54rem',
            fontWeight: 400,
            letterSpacing: '0.5em',
            color: '#A48A6A',
            marginBottom: '12px',
          }}
        >
          {subtitle || 'Floor Level'}
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.0,
            letterSpacing: '0.01em',
            color: '#6B6B67',
            margin: 0,
          }}
        >
          {level}
        </h3>
        <div
          className="mx-auto"
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(164,138,106,0.25), transparent)',
            marginTop: 'clamp(20px, 3vh, 32px)',
          }}
        />
      </motion.div>
    </div>
  );
}