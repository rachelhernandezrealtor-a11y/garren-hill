import React from 'react';

/**
 * SectionSeam — placed between stacked full-width sections.
 * A barely perceptible feathered haze that softens the join.
 */
export default function SectionSeam({
  reach = 80,
  tint = '#F6F4EF',
  opacity = 0.12,
}) {
  return (
    <div
      className="w-full pointer-events-none select-none"
      style={{
        position: 'relative',
        zIndex: 10,
        height: 0,
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      {/* Wider, softer feathered haze for cinematic section dissolves */}
      <div
        style={{
          position: 'absolute',
          top: `${-reach * 0.5}px`,
          left: 0,
          right: 0,
          height: `${reach}px`,
          background: tint,
          opacity: opacity * 0.25,
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary warm glow for depth */}
      <div
        style={{
          position: 'absolute',
          top: `${-reach * 0.3}px`,
          left: '10%',
          right: '10%',
          height: `${reach * 0.6}px`,
          background: 'radial-gradient(ellipse at center, rgba(164,138,106,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}