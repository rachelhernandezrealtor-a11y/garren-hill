import React from 'react';

export default function AmbientOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ position: 'fixed' }}
    >
      {/* Central warm radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,177,143,0.10) 0%, rgba(201,177,143,0.06) 38%, rgba(0,0,0,0.06) 72%, rgba(0,0,0,0.0) 100%)',
        }}
      />
      {/* Top feathered haze */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: '18vh',
          background:
            'linear-gradient(to bottom, rgba(201,177,143,0.10) 0%, rgba(201,177,143,0.04) 38%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Bottom feathered haze */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: '18vh',
          background:
            'linear-gradient(to top, rgba(201,177,143,0.10) 0%, rgba(201,177,143,0.04) 38%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}