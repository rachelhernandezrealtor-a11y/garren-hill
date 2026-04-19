import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, X, List } from 'lucide-react';

const ROOMS = [
  { id: 'exterior-gallery', label: 'Exterior' },
  { id: 'foyer-start', label: 'Foyer' },
  { id: 'great-room', label: 'Great Room' },
  { id: 'kitchen-section', label: 'Kitchen' },
  { id: 'scullery-section', label: 'Scullery' },
  { id: 'dining-section', label: 'Dining Room' },
  { id: 'conservatory-section', label: 'Conservatory' },
  { id: 'connected-living', label: 'Connected Living' },
  { id: 'primary-suite', label: 'Primary Suite' },
  { id: 'family-wing', label: 'Family Wing' },
  { id: 'mudroom-guest', label: 'Mudroom & Guest' },
  { id: 'second-floor', label: 'Second Floor' },
  { id: 'basement-section', label: 'Basement' },
];

function getActiveRoom() {
  const scrollY = window.scrollY + window.innerHeight * 0.4;
  let active = 0;
  for (let i = ROOMS.length - 1; i >= 0; i--) {
    const el = document.getElementById(ROOMS[i].id);
    if (el && el.offsetTop <= scrollY) {
      active = i;
      break;
    }
  }
  return active;
}

export default function RoomNavigator({ visible, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const onScroll = () => setActiveIdx(getActiveRoom());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  const goTo = useCallback((idx) => {
    const el = document.getElementById(ROOMS[idx]?.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setExpanded(false);
    }
  }, []);

  const goPrev = useCallback(() => {
    if (activeIdx > 0) goTo(activeIdx - 1);
  }, [activeIdx, goTo]);

  const goNext = useCallback(() => {
    if (activeIdx < ROOMS.length - 1) goTo(activeIdx + 1);
  }, [activeIdx, goTo]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 0.1, 0.28, 1] }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-2"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Compact pill */}
          <div
            className="flex flex-col items-center gap-0 rounded-full overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            {/* Up */}
            <button
              onClick={goPrev}
              disabled={activeIdx === 0}
              className="flex items-center justify-center transition-colors"
              style={{
                width: 40, height: 36,
                color: activeIdx === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                cursor: activeIdx === 0 ? 'default' : 'pointer',
                background: 'transparent', border: 'none',
              }}
            >
              <ChevronUp size={16} />
            </button>

            {/* Room label — click to expand list */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 transition-colors"
              style={{
                padding: '6px 14px',
                color: '#fff',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Poppins, sans-serif',
                background: 'transparent', border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <List size={12} style={{ opacity: 0.6 }} />
              {ROOMS[activeIdx]?.label}
            </button>

            {/* Down */}
            <button
              onClick={goNext}
              disabled={activeIdx === ROOMS.length - 1}
              className="flex items-center justify-center transition-colors"
              style={{
                width: 40, height: 36,
                color: activeIdx === ROOMS.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                cursor: activeIdx === ROOMS.length - 1 ? 'default' : 'pointer',
                background: 'transparent', border: 'none',
              }}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex flex-col items-center gap-1 py-1">
            {ROOMS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIdx ? 3 : 3,
                  height: i === activeIdx ? 14 : 6,
                  borderRadius: 2,
                  background: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-colors"
            style={{
              width: 28, height: 28,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
            }}
          >
            <X size={12} />
          </button>

          {/* Expanded room list */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute right-12 top-0 rounded-lg overflow-hidden"
                style={{
                  background: 'rgba(0,0,0,0.82)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                  minWidth: 180,
                }}
              >
                <div className="py-2">
                  <span
                    className="block px-4 py-1 font-sans uppercase"
                    style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}
                  >
                    Room by Room
                  </span>
                  {ROOMS.map((room, i) => (
                    <button
                      key={room.id}
                      onClick={() => goTo(i)}
                      className="block w-full text-left px-4 py-1.5 transition-colors font-sans"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: i === activeIdx ? 600 : 400,
                        color: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.55)',
                        background: i === activeIdx ? 'rgba(255,255,255,0.08)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <span style={{ opacity: 0.4, marginRight: 8, fontSize: '0.6rem' }}>{String(i + 1).padStart(2, '0')}</span>
                      {room.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}