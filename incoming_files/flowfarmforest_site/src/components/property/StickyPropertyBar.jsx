import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Bedrooms', value: '6' },
  { label: 'Bathrooms', value: '7.5' },
  { label: 'Above Grade', value: '8,519 SF' },
  { label: 'Total', value: '10,228 SF' },
  { label: 'Acreage', value: '15' },
];

const PRICE = '$5,250,000';

export default function StickyPropertyBar({ visible, darkMode = false }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -56, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.1, 0.28, 1] }}
      className="fixed left-0 right-0 z-40 pointer-events-none"
      style={{ top: 0 }}
    >
      <div
        className="w-full pointer-events-auto flex items-center justify-center"
        style={{
          height: '44px',
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: 'none',
          boxShadow: 'none',
          transition: 'background 0.5s ease, box-shadow 0.5s ease, border-bottom 0.5s ease',
        }}
      >
        <div className="flex items-center" style={{ gap: 'clamp(8px, 2vw, 24px)' }}>
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span style={{ width: '1px', height: '16px', background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', flexShrink: 0, transition: 'background 0.5s ease' }} />
              )}
              <span className="flex items-baseline gap-1.5">
                <span
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(11px, 1.1vw, 14px)',
                    fontWeight: 400,
                    color: darkMode ? '#fff' : 'rgba(0,0,0,0.75)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                    textShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.4)' : 'none',
                    transition: 'color 0.5s ease',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="font-sans uppercase hidden sm:inline"
                  style={{
                    fontSize: 'clamp(7px, 0.7vw, 9px)',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.32)',
                    lineHeight: 1,
                    textShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.4)' : 'none',
                    transition: 'color 0.5s ease',
                  }}
                >
                  {s.label}
                </span>
              </span>
            </React.Fragment>
          ))}
          <span style={{ width: '1px', height: '16px', background: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', flexShrink: 0, transition: 'background 0.5s ease' }} />
          <span
            className="font-serif"
            style={{
              fontSize: 'clamp(11px, 1.1vw, 14px)',
              fontWeight: 500,
              color: darkMode ? '#fff' : 'rgba(0,0,0,0.82)',
              letterSpacing: '0.01em',
              lineHeight: 1,
              textShadow: darkMode ? '0 1px 4px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.4)' : 'none',
              transition: 'color 0.5s ease',
            }}
          >
            {PRICE}
          </span>
        </div>
      </div>
    </motion.div>
  );
}