import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence } from './ResidenceShared';

const ease = [0.22, 0.1, 0.28, 1];
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const DETAILS = [
  { label: 'Range', note: 'Wolf 60″ dual-fuel, commercial power' },
  { label: 'Refrigeration', note: 'Sub-Zero integrated columns' },
  { label: 'Island', note: 'Butcher-block top, prep sink, seating' },
  { label: 'Counters', note: 'Granite throughout, honed finish' },
  { label: 'Dishwashers', note: 'Dual KitchenAid, concealed panels' },
  { label: 'Skylights', note: 'Four overhead, flooding the island' },
];

// Curated kitchen gallery — unique perspectives only
const GALLERY_IMAGES = [
  { src: B+'7dcb51eed_SUNSHINEKITCHEN.jpg', caption: 'Morning light across the work surface' },

  { src: B+'34a1f0e81_WOLFCLOSEUP.jpg', caption: 'Wolf 60″ dual-fuel range — commercial power, residential refinement' },
  { src: B+'223daee20_kitchenok.jpg', caption: 'Workstation sink — integrated into reclaimed heart pine' },
  { src: B+'46690300f_KTOCONS.jpg', caption: 'Through to the conservatory' },
  { src: B+'64a6417b1_kitchenbar.jpg', caption: 'Bar seating and cabinetry' },
  { src: B+'2d1d71d3d_KITCHEN2.jpg', caption: 'Full view toward the living room' },
  { src: B+'59aae5329_KITCHENTOOFFICETOMUD.jpg', caption: 'Through to hallway desk and mudroom' },
];

export default function KitchenFeature() {
  return (
    <div>
      {/* ── Narrative + details band ── */}
      <div style={{ background: '#ECE7DF', color: '#1C1C1A' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8" style={{ padding: 'clamp(28px, 4vh, 48px) clamp(24px, 5vw, 48px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>
              <p className="font-serif italic" style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)', lineHeight: 1.6, fontWeight: 300, color: '#6B6B67', margin: '0 0 14px 0' }}>
                Four skylights flood the island with daylight. A Wolf 60-inch range commands the wall. This is a kitchen built to nourish, not just to display.
              </p>
              <p className="font-sans" style={{ fontSize: 'clamp(0.78rem, 0.9vw, 0.88rem)', lineHeight: 1.7, fontWeight: 300, color: 'rgba(107,107,103,0.7)', margin: 0 }}>
                A continuous sightline runs from the kitchen island through the conservatory and into the tree canopy beyond. Granite counters, dual dishwashers, and a workstation sink built into reclaimed heart pine — every surface serves a purpose.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.15, ease }} className="grid grid-cols-3 gap-x-4 gap-y-3">
              {DETAILS.map((d, i) => (
                <div key={i}>
                  <span className="block font-sans uppercase" style={{ fontSize: '0.48rem', fontWeight: 500, letterSpacing: '0.3em', color: '#A48A6A', marginBottom: '1px' }}>{d.label}</span>
                  <span className="font-sans" style={{ fontSize: '0.72rem', fontWeight: 300, lineHeight: 1.4, color: '#6B6B67' }}>{d.note}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: 'clamp(24px, 4vh, 48px)' }}>
        <EditorialSequence images={GALLERY_IMAGES.slice(1)} />
      </div>
    </div>
  );
}