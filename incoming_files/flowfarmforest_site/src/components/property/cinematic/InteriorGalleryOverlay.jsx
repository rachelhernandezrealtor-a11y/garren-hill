import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import INTERIOR_GALLERY, { ROOMS } from './interiorGalleryData';

const WARM_GRADE = 'saturate(0.92) contrast(1.02) brightness(1.01) sepia(0.06) hue-rotate(-3deg)';

/* ─── Thumbnail grid item ─── */
function Thumb({ image, index, onClick, isActive }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
      onClick={onClick}
      className="relative group overflow-hidden"
      style={{
        aspectRatio: '4/3',
        borderRadius: '3px',
        border: isActive ? '2px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.08)',
        background: '#111',
        cursor: 'pointer',
      }}
    >
      <img
        src={image.src}
        alt={image.caption || ''}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ filter: WARM_GRADE }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
    </motion.button>
  );
}

/* ─── Full-screen viewer ─── */
function Viewer({ images, index, onClose, onNav }) {
  const img = images[index];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
      if (e.key === 'ArrowRight' && index < images.length - 1) onNav(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, images.length, onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
        <X className="w-5 h-5" />
      </button>

      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {index < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50">
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full px-4"
      >
        <img
          src={img.src}
          alt={img.caption || ''}
          className="w-full max-h-[80vh] object-contain"
          style={{ borderRadius: '4px', filter: WARM_GRADE }}
        />
        <div className="flex justify-between items-center mt-3 px-1">
          <p className="font-sans text-white/80 text-sm">{img.caption}</p>
          <span className="font-sans text-white/40 text-xs whitespace-nowrap ml-4">{index + 1} / {images.length}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main overlay ─── */
export default function InteriorGalleryOverlay({ onClose }) {
  const [activeRoom, setActiveRoom] = useState('All');
  const [viewerIndex, setViewerIndex] = useState(null);

  const filtered = activeRoom === 'All'
    ? INTERIOR_GALLERY
    : INTERIOR_GALLERY.filter(img => img.room === activeRoom);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && viewerIndex === null) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, viewerIndex]);

  const handleNav = useCallback((dir) => {
    setViewerIndex(prev => {
      const next = prev + dir;
      if (next < 0 || next >= filtered.length) return prev;
      return next;
    });
  }, [filtered.length]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] flex flex-col"
        style={{ background: '#0A0A09' }}
      >
        {/* ── Header ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
              Interior Gallery
            </h2>
            <span className="font-sans text-white/40" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
              {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}{activeRoom !== 'All' ? ` — ${activeRoom}` : ''}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Room filter ── */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-3 overflow-x-auto" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
            {ROOMS.map(room => {
              const count = room === 'All' ? INTERIOR_GALLERY.length : INTERIOR_GALLERY.filter(i => i.room === room).length;
              const isActive = activeRoom === room;
              return (
                <button
                  key={room}
                  onClick={() => setActiveRoom(room)}
                  className="font-sans uppercase transition-all duration-200 whitespace-nowrap"
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.16em',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                    background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '2px',
                    padding: '6px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {room} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Thumbnail grid ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 45vw), 1fr))' }}>
            {filtered.map((img, i) => (
              <Thumb
                key={img.src}
                image={img}
                index={i}
                onClick={() => setViewerIndex(i)}
                isActive={viewerIndex === i}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Full-screen viewer ── */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <Viewer
            images={filtered}
            index={viewerIndex}
            onClose={() => setViewerIndex(null)}
            onNav={handleNav}
          />
        )}
      </AnimatePresence>
    </>
  );
}