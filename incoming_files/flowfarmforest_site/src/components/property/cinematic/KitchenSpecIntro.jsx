import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

const SPECS = [
  'Wolf 60″ Dual-Fuel Range',
  'Sub-Zero Refrigeration',
  'Butcher-Block Island',
  'Granite Counters',
  'Dual KitchenAid Dishwashers',
  'Workstation Sink',
];

export default function KitchenSpecIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease }}
      className="mx-auto px-6 text-center"
      style={{ maxWidth: '640px', paddingTop: 'clamp(20px, 3vh, 36px)', paddingBottom: 'clamp(20px, 3vh, 36px)' }}
    >
      <div className="flex flex-wrap justify-center gap-2">
        {SPECS.map((s, i) => (
          <span
            key={i}
            className="font-sans uppercase"
            style={{
              fontSize: '0.56rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#A48A6A',
              padding: '6px 14px',
              border: '1px solid rgba(164,138,106,0.20)',
              borderRadius: '20px',
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}