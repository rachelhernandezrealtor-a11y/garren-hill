import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

/**
 * Optional details band — shows description + spec chips for rooms that have them.
 */
export default function RoomDetailsBand({ description, details }) {
  if (!description && (!details || details.length === 0)) return null;

  return (
    <div style={{ background: '#ECE7DF', color: '#1C1C1A' }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8" style={{ padding: 'clamp(28px, 4vh, 48px) clamp(24px, 5vw, 48px)' }}>
        <div className={`grid grid-cols-1 ${details?.length ? 'md:grid-cols-2' : ''} gap-6 md:gap-12 items-start`}>
          {description && (
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>
              <p className="font-serif italic" style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)', lineHeight: 1.65, fontWeight: 300, color: '#6B6B67', margin: 0 }}>
                {description}
              </p>
            </motion.div>
          )}
          {details && details.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.15, ease }} className="grid grid-cols-3 gap-x-4 gap-y-3">
              {details.map((d, i) => (
                <div key={i}>
                  <span className="block font-sans uppercase" style={{ fontSize: '0.48rem', fontWeight: 500, letterSpacing: '0.3em', color: '#A48A6A', marginBottom: '1px' }}>{d.label}</span>
                  <span className="font-sans" style={{ fontSize: '0.72rem', fontWeight: 300, lineHeight: 1.4, color: '#6B6B67' }}>{d.note}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}