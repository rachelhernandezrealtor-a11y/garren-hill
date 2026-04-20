import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#B8986A';
const CREAM = '#F2EDE4';
const DARK = '#0d0b09';

const GH = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';

export default function GarrenHill() {
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: CREAM, fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '8rem 5vw', textAlign: 'center' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2rem' }}>
          Pinehurst, North Carolina
        </p>
        <h1 style={{ fontWeight: 400, fontSize: '3.5rem', lineHeight: 1.15, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
          Garren Hill
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', lineHeight: 2, margin: '0 0 3rem' }}>
          200 Hollycrest Drive, Pinehurst, NC — Built 1916
        </p>
        <img
          src={GH + '6e1617ac3_200HollycrestDrive-222.jpg'}
          alt="Garren Hill"
          style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block', marginBottom: '4rem' }}
        />
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem', lineHeight: 2 }}>
          5 Beds · 5 Baths · 7 Fireplaces · 4.15 Acres
        </p>
      </div>
    </div>
  );
}
