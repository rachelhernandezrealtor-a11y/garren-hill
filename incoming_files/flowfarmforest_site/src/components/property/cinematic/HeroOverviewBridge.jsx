import React from 'react';

/**
 * HeroOverviewBridge — a single continuous gradient element
 * that spans the boundary between CinematicHero and EstateOverview.
 * Uses negative margins to overlap both sections, creating one
 * seamless transition with no visible seam or dark band.
 */
export default function HeroOverviewBridge() {
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
      {/* Single continuous gradient — reaches up into hero bottom and down into overview top */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          /* Extend upward into the hero */
          top: 'clamp(-200px, -28vh, -100px)',
          /* Extend downward into the overview */
          bottom: 'clamp(-200px, -28vh, -100px)',
          /* Total height = top reach + bottom reach */
          height: 'clamp(400px, 56vh, 800px)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 12%, rgba(0,0,0,0.06) 24%, rgba(0,0,0,0.14) 35%, rgba(0,0,0,0.28) 44%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.28) 56%, rgba(0,0,0,0.14) 65%, rgba(0,0,0,0.06) 76%, rgba(0,0,0,0.02) 88%, transparent 100%)',
        }}
      />
    </div>
  );
}