import React from 'react';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/192707303_forestforbase.png';

export default function EstateBreath() {
  return (
    <div style={{ width: '100%', background: '#000', lineHeight: 0, position: 'relative', marginTop: '-1px' }}>
      <img
        src={IMG}
        alt="Flow Farm — aerial view of estate forest canopy at sunset"
        style={{ display: 'block', width: '100%', height: 'auto', imageRendering: 'crisp-edges' }}
      />
      {/* No top gradient — Sunset Aerial fades down into us */}
      {/* Bottom fade — ultra-long, low-opacity atmospheric blend into next section */}
      <div
        style={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: 'clamp(400px, 60vh, 800px)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.01) 18%, rgba(0,0,0,0.03) 32%, rgba(0,0,0,0.07) 44%, rgba(0,0,0,0.13) 55%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.30) 74%, rgba(0,0,0,0.42) 82%, rgba(0,0,0,0.56) 90%, rgba(0,0,0,0.70) 96%, rgba(0,0,0,0.80) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Centered editorial text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 32px' }}>
          <div
            style={{
              width: 40,
              height: 1,
              margin: '0 auto 12px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'DM Serif Display', 'Canela', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#fff',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}>
              7 <span style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontStyle: 'normal', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', letterSpacing: '0.3em', textTransform: 'uppercase', verticalAlign: 'baseline' }}>Acres</span>
            </div>
            <div style={{
              fontFamily: "'DM Serif Display', 'Canela', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.6)',
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
              margin: '10px 0',
            }}>
              of
            </div>
            <div style={{
              fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 2px 16px rgba(0,0,0,0.35)',
            }}>
              Pristine Forest
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              margin: '12px auto 0',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
}