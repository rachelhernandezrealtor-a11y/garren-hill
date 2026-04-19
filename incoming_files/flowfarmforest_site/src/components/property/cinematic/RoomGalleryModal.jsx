import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const CINEMA_GRADE = 'saturate(1.2) contrast(1.15) brightness(1.04) sepia(0.12) hue-rotate(-3deg)';
const ease = [0.22, 0.1, 0.28, 1];

export default function RoomGalleryModal({ room, images, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const img = images[currentIdx];

  const handlePrev = useCallback(() => {
    setCurrentIdx((p) => (p === 0 ? images.length - 1 : p - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIdx((p) => (p === images.length - 1 ? 0 : p + 1));
  }, [images.length]);

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          whileHover={{ background: 'rgba(255,255,255,0.15)', scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>

        {/* Main content */}
        <div className="w-full h-full flex flex-col items-center justify-center px-4 py-16 md:py-20">
          {/* Room title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-display text-white text-2xl md:text-4xl mb-2" style={{ fontWeight: 400 }}>
              {room.label}
            </h2>
            <p className="font-sans text-white/40 text-xs uppercase" style={{ letterSpacing: '0.1em' }}>
              {currentIdx + 1} of {images.length}
            </p>
          </motion.div>

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: '0 60px 150px rgba(0,0,0,0.6)' }}>
              <motion.img
                key={`${room.id}-${currentIdx}`}
                initial={{ opacity: 0, scale: 1.08, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease }}
                src={img.src}
                alt={img.alt}
                className="w-full"
                style={{
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  display: 'block',
                  filter: CINEMA_GRADE,
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
              }} />
              {/* Film grain */}
              <div className="absolute inset-0 pointer-events-none" style={{
                opacity: 0.03,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'repeat',
                mixBlendMode: 'overlay',
              }} />
            </div>
          </motion.div>

          {/* Caption */}
          {img.caption && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="font-sans text-white/60 text-center mt-6 md:mt-8 max-w-2xl"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', lineHeight: 1.6 }}
            >
              {img.caption}
            </motion.p>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="flex items-center gap-6 mt-12 md:mt-16"
          >
            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Indicator */}
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full transition-all"
                  animate={{
                    width: i === currentIdx ? 24 : 6,
                    backgroundColor: i === currentIdx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </motion.div>

          {/* Hint text */}
          <p className="font-sans text-white/30 text-xs uppercase mt-8 md:mt-10" style={{ letterSpacing: '0.1em' }}>
            Use arrow keys or buttons to navigate
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}