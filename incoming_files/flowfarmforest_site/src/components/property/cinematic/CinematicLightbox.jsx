import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import MobileGallery from './MobileGallery';
import DepthOnScroll from '@/components/effects/DepthOnScroll';

export default function CinematicLightbox({ images, index: indexProp, activeIndex, onClose, onNav, onPrev, onNext }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const index = indexProp ?? activeIndex ?? null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < images.length - 1;
  const img = index !== null ? images[index] : null;

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) { onNav ? onNav(index - 1) : onPrev && onPrev(); }
    if (e.key === 'ArrowRight' && hasNext) { onNav ? onNav(index + 1) : onNext && onNext(); }
  }, [index, hasPrev, hasNext, onClose, onNav]);

  useEffect(() => {
    if (index === null) return;
    // On mobile, MobileGallery owns the body lock — don't double-lock
    if (!isMobile) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [index, isMobile]);

  useEffect(() => {
    if (index === null) return;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, handleKey]);

  if (index === null || !img) return null;

  if (isMobile) {
    return <MobileGallery images={images} index={index} onClose={onClose} onNav={onNav} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex flex-col"
        style={{ background: 'rgba(8,8,6,0.92)', backdropFilter: 'blur(12px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Sticky top bar — close button lives here, outside scroll */}
        <div className="flex-shrink-0 flex items-center justify-end px-6 py-4" style={{ zIndex: 10 }}>
          {/* Prev / Next also outside scroll */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={() => { if (!hasPrev) return; onNav ? onNav(index - 1) : onPrev && onPrev(); }}
              disabled={!hasPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronLeft className="w-5 h-5 text-white/70" />
            </button>
            <span className="font-sans text-xs text-white/40" style={{ letterSpacing: '0.1em' }}>
              {index + 1} / {images.length}
            </span>
            <button
              onClick={() => { if (!hasNext) return; onNav ? onNav(index + 1) : onNext && onNext(); }}
              disabled={!hasNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ChevronRight className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all ml-auto"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div
          className="lightbox-body flex-1 flex flex-col items-center justify-center px-4 pb-8"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 0.1, 0.28, 1] }}
            className="max-w-5xl w-full mx-auto"
          >
            <div className="relative">
              <img
                src={img.src}
                alt={img.alt || img.caption || ''}
                className="w-full max-h-[75vh] object-contain rounded-md"
                style={{ boxShadow: '0 24px 72px rgba(0,0,0,0.45)' }}
              />
              {img.caption && (
                <div className="absolute left-3 right-3 bottom-3 flex justify-center pointer-events-none">
                  <DepthOnScroll intensity={0.6} hoverLift={false} className="glass-bold glass-caption">
                    <p className="m-0 font-sans text-[0.78rem] leading-[1.55]">{img.caption}</p>
                  </DepthOnScroll>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}