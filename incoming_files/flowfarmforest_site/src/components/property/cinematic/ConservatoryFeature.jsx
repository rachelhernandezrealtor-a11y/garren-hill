import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence } from './ResidenceShared';

const ease = [0.22, 0.1, 0.28, 1];
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const HIGHLIGHTS = [
  'Octagonal glass pavilion',
  'Timber-and-glass cupola',
  'Dedicated geothermal zone',
  'Granite wet bar',
  'Screened porch access',
  'Custom mirrored millwork',
];

// Gallery-sourced color-matched images (no duplicates)
const GALLERY = [
  { src: B+'89e1b25c5_CONSERVATORYBEST.jpg', caption: 'The glass pavilion captures light from every angle.' },
  { src: B+'b87561484_MONEYSHOT.jpg', caption: 'Full-height glazing and timber cupola — the jewel of the residence.' },
  { src: B+'4e0025afb_SUNSHINECONSERVATORY.jpg', caption: 'Sunshine floods the conservatory dining area.' },
];

export default function ConservatoryFeature() {
  return (
    <div>
      {/* ── Details band ── */}
      <div style={{ background: '#F6F4EF' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center" style={{ padding: 'clamp(28px, 4vh, 48px) clamp(24px, 5vw, 48px)' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }}
            className="font-serif italic mx-auto"
            style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', lineHeight: 1.65, fontWeight: 300, color: '#6B6B67', maxWidth: '560px', margin: '0 auto' }}
          >
            Neither inside nor out. An octagonal glass pavilion with a dedicated geothermal zone — year-round comfort open to sky and landscape on every side.
          </motion.p>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: 'clamp(24px, 4vh, 48px)' }}>
        <EditorialSequence images={GALLERY.slice(1)} />
      </div>
    </div>
  );
}