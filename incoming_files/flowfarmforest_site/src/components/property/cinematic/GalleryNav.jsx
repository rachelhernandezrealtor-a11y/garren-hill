import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GalleryNav — minimal floating pill that shows current image position
 * and lets users scroll to prev/next image in the gallery.
 * Images are discovered by `data-gallery-index` attributes on DOM elements.
 */
export default function GalleryNav({ totalImages }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  // Find all gallery image elements
  const getImageEls = useCallback(() => {
    return Array.from(document.querySelectorAll('[data-gallery-index]'))
      .sort((a, b) => Number(a.dataset.galleryIndex) - Number(b.dataset.galleryIndex));
  }, []);

  // Track which image is most centered in viewport
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const els = getImageEls();
        if (els.length === 0) { ticking.current = false; return; }

        const viewCenter = window.innerHeight / 2;
        let closest = 0;
        let closestDist = Infinity;
        els.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elCenter - viewCenter);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });

        setCurrent(closest);

        // Show nav only after scrolling past the hero a bit
        const firstEl = els[0];
        if (firstEl) {
          const rect = firstEl.getBoundingClientRect();
          setVisible(rect.bottom < window.innerHeight * 0.6);
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [getImageEls]);

  const scrollTo = useCallback((index) => {
    const els = getImageEls();
    const target = els[index];
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const offset = window.scrollY + rect.top - window.innerHeight * 0.15;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, [getImageEls]);

  const goPrev = () => { if (current > 0) scrollTo(current - 1); };
  const goNext = () => { if (current < totalImages - 1) scrollTo(current + 1); };

  if (totalImages <= 1) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed z-50 flex flex-col items-center gap-1"
          style={{ right: 'clamp(12px, 2vw, 24px)', top: '50%', transform: 'translateY(-50%)' }}
        >
          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={current <= 0}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: 36, height: 36,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              opacity: current <= 0 ? 0.3 : 1,
              cursor: current <= 0 ? 'default' : 'pointer',
            }}
            aria-label="Previous image"
          >
            <ChevronUp className="w-4 h-4" style={{ color: '#1C1C1A' }} />
          </button>

          {/* Counter pill */}
          <div
            className="flex items-center justify-center font-sans"
            style={{
              width: 36, height: 40,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 18,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              fontSize: '0.56rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#6B6B67',
              lineHeight: 1,
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <span style={{ color: '#1C1C1A', fontWeight: 600 }}>{current + 1}</span>
            <span style={{ fontSize: '0.44rem', color: 'rgba(107,107,103,0.4)' }}>of</span>
            <span>{totalImages}</span>
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={current >= totalImages - 1}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: 36, height: 36,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              opacity: current >= totalImages - 1 ? 0.3 : 1,
              cursor: current >= totalImages - 1 ? 'default' : 'pointer',
            }}
            aria-label="Next image"
          >
            <ChevronDown className="w-4 h-4" style={{ color: '#1C1C1A' }} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}