import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

/**
 * RoomBridge — lightweight directional transition between rooms.
 * No image overlay — just a clean typographic breath between sections.
 */
export default function RoomBridge({
  narrative,
  fromRoom,
  toRoom,
}) {
  return (
    <div
      className="w-full"
      style={{
        background: 'linear-gradient(180deg, #f8f7f5 0%, #f3f1ed 50%, #f8f7f5 100%)',
        padding: 'clamp(28px, 4vh, 48px) clamp(20px, 5vw, 56px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease }}
        className="mx-auto text-center"
        style={{ maxWidth: '520px' }}
      >
        {/* Room labels */}
        {(fromRoom || toRoom) && (
          <div className="flex items-center justify-center gap-3 mb-3">
            {fromRoom && (
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: '0.52rem',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  color: 'rgba(0,0,0,0.22)',
                }}
              >
                {fromRoom}
              </span>
            )}
            {fromRoom && toRoom && (
              <span style={{ color: 'rgba(0,0,0,0.15)', fontSize: '0.65rem' }}>→</span>
            )}
            {toRoom && (
              <span
                className="font-sans uppercase"
                style={{
                  fontSize: '0.52rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  color: 'rgba(0,0,0,0.38)',
                }}
              >
                {toRoom}
              </span>
            )}
          </div>
        )}

        {/* Narrative */}
        {narrative && (
          <p
            className="font-serif italic"
            style={{
              fontSize: 'clamp(0.92rem, 1.2vw, 1.12rem)',
              lineHeight: 1.6,
              fontWeight: 300,
              color: 'rgba(0,0,0,0.3)',
              margin: 0,
            }}
          >
            {narrative}
          </p>
        )}

        {/* Subtle line */}
        <div
          className="mx-auto"
          style={{
            width: '32px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)',
            marginTop: 'clamp(16px, 2.5vh, 24px)',
          }}
        />
      </motion.div>
    </div>
  );
}