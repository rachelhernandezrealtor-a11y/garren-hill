import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

export default function ContinueButton({ target, label }) {
  const handleClick = () => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1.0, ease }}
      className="flex justify-center"
      style={{ padding: 'clamp(16px, 3vh, 32px) 0' }}
    >
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2.5 font-sans uppercase cursor-pointer bg-transparent group"
        style={{
          fontSize: '0.56rem',
          fontWeight: 400,
          letterSpacing: '0.28em',
          color: 'rgba(28,28,26,0.35)',
          padding: '10px 24px',
          border: '1px solid rgba(28,28,26,0.08)',
          borderRadius: '1px',
          transition: 'all 0.4s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'rgba(28,28,26,0.65)';
          e.currentTarget.style.borderColor = 'rgba(28,28,26,0.22)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(28,28,26,0.35)';
          e.currentTarget.style.borderColor = 'rgba(28,28,26,0.08)';
        }}
      >
        {label}
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '0.65rem', lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </button>
    </motion.div>
  );
}