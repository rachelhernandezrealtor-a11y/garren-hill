import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FarmCropGallery({
  images = [],
  intervalMs = 4500,
  className = ''
}) {
  const FALLBACKS = useMemo(() => (
    images.length > 0 ? images : [
      { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ff2d6c245_harvest-background-universal-2000x1500.jpg', caption: 'Harvest Assortment' },
      { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/91707c607_Tomato_Transplants.jpg', caption: 'Tomato Transplants (Greenhouse)' },
      { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/33190880d_flowmelons.jpg', caption: 'Heirloom Melon Varietals' },
    ]
  ), [images]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused || FALLBACKS.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % FALLBACKS.length);
    }, Math.max(2200, intervalMs));
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, intervalMs, FALLBACKS.length]);

  const go = (dir) => setIndex((i) => (i + dir + FALLBACKS.length) % FALLBACKS.length);

  const current = FALLBACKS[index];

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[18rem] sm:h-[24rem] lg:h-[32rem]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={current?.url}
            alt={current?.caption || 'Farm crop'}
            className="absolute inset-0 w-full h-full object-cover cinematic-warm"
            initial={{ opacity: 0.0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
        {/* Caption */}
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
          <div className="glass-caption border border-white/20 bg-black/20 rounded-xl px-3 py-2">
            <p className="mb-0 text-[0.8rem] sm:text-[0.9rem] text-white/90 leading-tight">{current?.caption}</p>
          </div>
          {/* Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button aria-label="Previous" onClick={() => go(-1)} className="h-9 w-9 grid place-items-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-black/40 transition">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button aria-label="Next" onClick={() => go(1)} className="h-9 w-9 grid place-items-center rounded-full border border-white/30 bg-black/30 text-white hover:bg-black/40 transition">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 py-3">
        {FALLBACKS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#C9B18F]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}