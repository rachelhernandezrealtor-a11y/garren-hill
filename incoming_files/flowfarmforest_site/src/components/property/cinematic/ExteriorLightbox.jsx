import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CINEMA_GRADE = 'saturate(1.2) contrast(1.15) brightness(1.04) sepia(0.12) hue-rotate(-3deg)';

export default function ExteriorLightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 0.1, 0.28, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.92)' }}
        onClick={onClose}
      >
        {/* Close */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>

        {/* Prev */}
        {index > 0 && (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
        )}

        {/* Next */}
        {index < images.length - 1 && (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        )}

        {/* Image */}
        <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{ boxShadow: '0 50px 120px rgba(0,0,0,0.4)' }}
          >
            <motion.img
              key={img.src}
              initial={{ opacity: 0, scale: 1.15, rotateX: 15, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: -15, y: -40 }}
              transition={{ duration: 1, ease: [0.22, 0.1, 0.28, 1] }}
              src={img.src}
              alt={img.alt}
              className="w-full"
              style={{
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                filter: CINEMA_GRADE,
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)',
              mixBlendMode: 'multiply',
            }} />
            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none" style={{
              opacity: 0.04,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay',
            }} />
          </motion.div>
          {/* Caption + counter */}
          <div className="flex justify-between items-center mt-3 px-1">
            {img.caption && (
              <span className="font-sans text-white/70" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                {img.caption}
              </span>
            )}
            <span className="font-sans text-white/40 ml-auto" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
              {index + 1} / {images.length}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}