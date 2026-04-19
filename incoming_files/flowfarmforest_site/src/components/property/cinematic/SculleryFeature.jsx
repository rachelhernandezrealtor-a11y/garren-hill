import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence } from './ResidenceShared';

const ease = [0.22, 0.1, 0.28, 1];

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// Gallery-sourced color-matched images
const IMAGES = [
  { src: B+'67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg', caption: 'Glass tile, granite, polished chrome — the scullery matches every surface of the principal kitchen.' },
  { src: B+'816754381_SCULLERY.jpg', caption: 'Wine cooler, Sub-Zero, and mesh-front cabinets line a galley built for serious entertaining.' },
  { src: B+'6cb0fef12_SCULLERYSINK.jpg', caption: 'Scullery sink — close-up detail.' },
];

// Kitchen hallway / built-in desk
const SCULLERY_DETAILS = [
  { label: 'Sink', note: 'Stainless undermount, commercial sprayer' },
  { label: 'Counters', note: 'Granite, matched to principal kitchen' },
  { label: 'Backsplash', note: 'Custom glass tile mosaic' },
  { label: 'Appliances', note: 'Sub-Zero wine cooler, secondary fridge' },
  { label: 'Cabinets', note: 'Mesh-front uppers, soft-close' },
  { label: 'Layout', note: '9.5′ × 6.2′ galley, pass-through' },
];

const HALLWAY_IMAGES = [
  { src: B+'ffc0435f6_HEARTPINEHALLWAYWITHBUILTINDESK.jpg', caption: 'Heart pine hallway with built-in desk — command central between kitchen and mudroom.' },
];

export default function SculleryFeature() {
  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Skip first image — already shown in CinematicBridge */}
        <EditorialSequence images={IMAGES.slice(1)} />
      </div>

      {/* ── Kitchen Hallway & Built-in Desk ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: 'clamp(24px, 4vh, 48px)' }}>
        <EditorialSequence images={HALLWAY_IMAGES} />
      </div>

      {/* ── Feature chips ── */}
      <div style={{ background: '#ECE7DF', color: '#1C1C1A' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8" style={{ padding: 'clamp(24px, 3vh, 40px) clamp(24px, 5vw, 48px)' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} className="grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-3">
            {SCULLERY_DETAILS.map((d, i) => (
              <div key={i}>
                <span className="block font-sans uppercase" style={{ fontSize: '0.48rem', fontWeight: 500, letterSpacing: '0.3em', color: '#A48A6A', marginBottom: '1px' }}>{d.label}</span>
                <span className="font-sans" style={{ fontSize: '0.72rem', fontWeight: 300, lineHeight: 1.4, color: '#6B6B67' }}>{d.note}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>


    </div>
  );
}