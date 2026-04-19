import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import ROOMS from './roomTourData';
import CinematicGallery from './CinematicGallery';
import CinematicLightbox from './CinematicLightbox';
import DepthOnScroll from '@/components/effects/DepthOnScroll';

const ease = [0.22, 0.1, 0.28, 1];

export default function AllPhotosGallery() {
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Compile all images sequentially from all rooms
  const allImages = ROOMS.flatMap(room => room.images);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxActive(true);
  };

  const handlePrevImage = () => {
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex(prev => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      {/* Sticky header */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/10" style={{ background: 'linear-gradient(180deg, rgba(16,14,12,0.78) 0%, rgba(16,14,12,0.52) 100%)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <DepthOnScroll intensity={0.75} hoverLift={false} className="">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3"
            >
            <Link
              to="/estate-at-a-glance"
              className="p-2 hover:bg-white/10 hover:scale-[1.03] rounded-lg transition-all duration-300"
              title="Back to gallery"
            >
              <ArrowLeft className="w-4 h-4 text-white/60" />
            </Link>
            <div>
              <p className="font-sans uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.4)', margin: '0 0 6px' }}>
                Flow Farm Archive
              </p>
              <h1 className="font-display" style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                fontWeight: 400,
                color: '#fff',
                margin: 0,
              }}>
                Estate Gallery
              </h1>
            </div>
          </motion.div>
          </DepthOnScroll>

          <Link
            to="/"
            className="p-2 hover:bg-white/10 hover:scale-[1.03] rounded-lg transition-all duration-300"
            title="Home"
          >
            <Home className="w-4 h-4 text-white/60" />
          </Link>
        </div>
      </div>

      {/* Main gallery — no room breaks */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease }}
        className="w-full pt-32 pb-16 text-white"
        style={{ background: '#000' }}
      >
        <DepthOnScroll intensity={0.75} hoverLift={false} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center ff-glass-text">
          <div className="mx-auto mb-6 h-px w-14 bg-white/10" />
          <p className="mx-auto mb-5 max-w-2xl font-sans text-[0.8rem] leading-[1.9] text-white/60">
            A curated visual sequence of the residence, grounds, and supporting structures — composed as an editorial walkthrough rather than a conventional listing gallery.
          </p>
          <p className="font-sans text-[0.62rem] font-medium tracking-[0.24em] uppercase text-white/40 m-0">
            Complete photographic archive
          </p>
        </DepthOnScroll>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CinematicGallery
            images={allImages}
            onImageClick={handleImageClick}
          />
        </div>

        {/* Footer summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.6, ease }}
          className="flex flex-col items-center text-center mt-16"
          style={{ padding: 'clamp(48px, 8vh, 96px) 24px clamp(24px, 4vh, 48px)' }}
        >
          <div className="w-12 h-px mb-6" style={{ background: 'rgba(255,255,255,0.25)' }} />
          <p className="font-sans uppercase" style={{
            fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.45)', margin: '0 0 6px',
          }}>
            Complete Estate
          </p>
          <p className="font-sans" style={{
            fontSize: '0.56rem', fontWeight: 300, letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.35)', margin: 0,
          }}>
            {allImages.length} photograph{allImages.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      </motion.section>

      {/* Lightbox */}
      {lightboxActive && (
        <CinematicLightbox
          images={allImages}
          index={lightboxIndex}
          onClose={() => setLightboxActive(false)}
          onNav={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
}