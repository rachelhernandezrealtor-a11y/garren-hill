import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

function CinematicPhotoScroll({ photos, onImageClick }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Single container with all images absolutely positioned and layered seamlessly
  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ 
          height: 'clamp(600px, 100vh, 900px)',
          background: '#0a0a0a',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        {/* All images layered absolutely with subtle atmospheric depth */}
        {photos.map((photo, idx) => {
          const depthBlur = idx * 0.4; // Minimal blur for subtle depth
          const atmosphericFade = idx * 0.05; // Light fade for continuity
          
          return (
            <motion.button
              key={idx}
              onClick={() => {
                setSelectedImage(photo);
                onImageClick?.(photo);
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 - atmosphericFade }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease, delay: idx * 0.05 }}
              className="absolute inset-0 w-full h-full cursor-pointer group"
              style={{
                zIndex: photos.length - idx,
                opacity: 1 - atmosphericFade,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover cinematic-warm"
                style={{
                  filter: `saturate(1.05) contrast(1.04) brightness(1.12) sepia(0.06) hue-rotate(-2deg) blur(${depthBlur}px)`,
                  objectPosition: 'center 35%',
                  willChange: 'filter'
                }}
              />
              {/* Minimal vignette for subtle depth */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,${idx * 0.008}) 100%)`,
                  zIndex: 1
                }}
              />
              <div className="cinematic-grain absolute inset-0" />
            </motion.button>
          );
        })}

        {/* Minimal overlay for subtle depth */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* Interactive hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <p className="text-xs opacity-70 font-light tracking-[0.15em] uppercase text-white text-center">
            Click to Explore
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default CinematicPhotoScroll;