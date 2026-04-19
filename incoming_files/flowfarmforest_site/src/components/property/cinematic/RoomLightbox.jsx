import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * Full-screen lightbox for room gallery images.
 * Supports keyboard nav (arrows, Escape) and swipe.
 */
export default function RoomLightbox({ images, index, onClose, onNav }) {
  const img = images[index];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < images.length - 1) onNav(1);
  }, [index, images.length, onClose, onNav]);

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
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <X className="w-5 h-5 text-white/80" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
          <span className="font-sans" style={{ fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>
            {index + 1} / {images.length}
          </span>
        </div>

        {/* Prev arrow */}
        {index > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Next arrow */}
        {index < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-6xl w-full px-4 sm:px-12"
        >
          <img
            src={img.src}
            alt={img.alt || img.caption || ''}
            className="w-full object-contain rounded-lg"
            style={{ maxHeight: '80vh', display: 'block', margin: '0 auto' }}
          />
          {img.caption && (
            <p className="text-center font-sans mt-4" style={{ fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '16px auto 0' }}>
              {img.caption}
            </p>
          )}
        </motion.div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-center px-4">
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ maxWidth: '90vw', scrollbarWidth: 'none' }}>
            {images.map((thumb, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onNav(i - index); }}
                className="flex-shrink-0 overflow-hidden transition-all"
                style={{
                  width: '48px', height: '36px', borderRadius: '3px',
                  border: i === index ? '2px solid rgba(255,255,255,0.8)' : '2px solid transparent',
                  opacity: i === index ? 1 : 0.4,
                  cursor: 'pointer', padding: 0, background: 'none',
                }}
              >
                <img src={thumb.src} alt="" className="w-full h-full object-cover" style={{ display: 'block' }} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}