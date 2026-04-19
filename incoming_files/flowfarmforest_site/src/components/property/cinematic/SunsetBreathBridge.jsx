import React from 'react';

/**
 * SunsetBreathBridge — a single continuous gradient element
 * that spans the boundary between SunsetAerial and EstateBreath.
 * Eliminates the doubled-gradient seam by replacing both sections'
 * independent top/bottom fades with one seamless transition.
 */
export default function SunsetBreathBridge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{
        position: 'relative',
        zIndex: 15,
        height: 0,
        overflow: 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 'clamp(-200px, -28vh, -100px)',
          height: 'clamp(400px, 56vh, 800px)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 12%, rgba(0,0,0,0.06) 24%, rgba(0,0,0,0.14) 35%, rgba(0,0,0,0.28) 44%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.28) 56%, rgba(0,0,0,0.14) 65%, rgba(0,0,0,0.06) 76%, rgba(0,0,0,0.02) 88%, transparent 100%)',
        }}
      />
    </div>
  );
}