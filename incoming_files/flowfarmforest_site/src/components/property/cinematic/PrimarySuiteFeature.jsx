import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence } from './ResidenceShared';
import CinematicThreshold from './CinematicThreshold';

const ease = [0.22, 0.1, 0.28, 1];
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const HERO_IMG = B+'e802ebf12_primary1main.jpg';

const SUITE_DETAILS = [
  { label: 'Bedroom', note: '19.6\' × 18.5\', 15.8\' cathedral ceiling' },
  { label: 'Sitting Room', note: '12.2\' × 18.5\', bay windows' },
  { label: 'Spa Bath', note: '18.3\' × 18.6\', freestanding tub, rain shower, agate tile' },
  { label: 'Dressing Room', note: '11.7\' × 21.7\', granite island, built-in safe, shoe wall' },
  { label: 'Geothermal Zone', note: 'Independent climate control for the entire wing' },
];

// Gallery-sourced color-matched images (no duplicates)
const GALLERY_IMAGES = [
  { src: B+'f5ac70bec_entrancetoprimarty.jpg', caption: 'Primary suite entrance — the threshold between public and private' },
  { src: B+'a6faeafb1_primary.jpg', caption: 'Heart pine floors and natural light' },
  { src: B+'4e4b52f06_primary1pic2.jpg', caption: 'Cathedral ceiling — open sightlines to the forest' },
  // Sitting Room
  { src: B+'b273862dc_tightshotsitroomprimary.jpg', caption: 'Sitting room — bay windows and morning light' },
  { src: B+'70363b373_primarywidetositrom.jpg', caption: 'Sitting room — wide view from the bedroom' },
  // Spa Bath
  { src: B+'1fdf34b75_spaprimarybath.jpg', caption: 'Primary bath — full spa with freestanding tub' },
  { src: B+'d0bb8decd_primarytightshottubandshower.jpg', caption: 'Rain shower and soaking tub — agate tile throughout' },
  { src: B+'dbcdc9712_primarybathgoodtoclosetdoor.jpg', caption: 'Vanity and storage — door to the walk-in closet beyond' },
  { src: B+'66e66a3e8_architecmasterbathwateron.jpg', caption: 'Agate tile and running water' },
  // Walk-In Closet
  { src: B+'eb3806b6b_closeupcenterislandprimarycloset.jpg', caption: 'Walk-in closet — granite-top center island' },
  { src: B+'af5141830_fullshotprimcloset.jpg', caption: 'Full view with built-in cabinetry' },
  { src: B+'a32b0b4a1_primaryclosetgreatshot.jpg', caption: 'Custom shelving, shoe wall, and built-in safe' },
  { src: B+'24c620f54_PrimarySuiteClosetSafe.jpg', caption: 'Built-in safe — commercial grade' },
  // Private office — accessed through primary closet door
  { src: B+'54885a55a_joffice2.jpg', caption: 'Private office — accessed through the dressing room' },
  { src: B+'76c5b0b70_Jofficeoffcloet.jpg', caption: 'Skylights and reading nook' },
];

export default function PrimarySuiteFeature() {
  return (
    <div>
      <CinematicThreshold
        label="A Private Wing"
        title="The Primary Suite"
        whisper="Bedroom, spa bath, sitting room, dressing room — a self-contained retreat within its own geothermal zone."
        image={HERO_IMG}
        imageAlt="The Primary Suite — vaulted ceiling and forest views"
      />

      <div style={{ background: '#ECE7DF', color: '#1C1C1A' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center" style={{ padding: 'clamp(32px, 5vh, 56px) clamp(24px, 5vw, 48px)' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="font-serif italic" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.7, fontWeight: 300, color: '#6B6B67', margin: 0 }}>
            Bedroom, spa bath, sitting room, dressing room, and private staircase — a self-contained retreat designed by Robert E. Clark within its own geothermal zone.
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: 'clamp(24px, 4vh, 48px)' }}>
        {/* Skip first image — already shown in CinematicBridge */}
        <EditorialSequence images={GALLERY_IMAGES.slice(1)} />
      </div>
    </div>
  );
}