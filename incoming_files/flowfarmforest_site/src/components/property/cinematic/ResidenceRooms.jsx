import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images } from 'lucide-react';
import MainLevelSection from './MainLevelSection';
import UpperLevelSection from './UpperLevelSection';
import LowerLevelSection from './LowerLevelSection';
import InteriorGalleryOverlay from './InteriorGalleryOverlay';

export default function ResidenceRooms() {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <section data-nav-theme="light" className="w-full" style={{ background: '#F6F4EF' }}>
      {/* Browse All button — sticky at bottom */}
      <div className="sticky bottom-6 z-40 flex justify-center pointer-events-none" style={{ marginBottom: '-60px' }}>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={() => setShowGallery(true)}
          className="pointer-events-auto inline-flex items-center gap-2 font-sans uppercase transition-all duration-300 hover:scale-105"
          style={{
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#fff',
            background: 'rgba(28,28,26,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '3px',
            padding: '10px 22px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          <Images className="w-3.5 h-3.5" />
          Browse All Interior Photos
        </motion.button>
      </div>

      <MainLevelSection />
      <UpperLevelSection />
      <LowerLevelSection />

      {/* Gallery overlay */}
      <AnimatePresence>
        {showGallery && <InteriorGalleryOverlay onClose={() => setShowGallery(false)} />}
      </AnimatePresence>
    </section>
  );
}