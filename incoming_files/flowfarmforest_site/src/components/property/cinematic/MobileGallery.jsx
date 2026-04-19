import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MobileGallery({ images, index, onClose, onNav }) {
  const isOpen = index !== null && index !== undefined;
  const BAR_HEIGHT = 56;
  const areaRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const indexRef = useRef(index);
  indexRef.current = index;

  // Lock body scroll — position:fixed + overscroll-behavior:none is the iOS-safe approach
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Swipe handlers — touchAction:'none' on the container means the browser
  // hands ALL touch events to JS; no preventDefault needed.
  useEffect(() => {
    const el = areaRef.current;
    if (!el || !isOpen) return;

    const onStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      setDragging(true);
      setDragOffset(0);
    };

    const onMove = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDragOffset(dx);
      }
    };

    const onEnd = (e) => {
      const idx = indexRef.current;
      const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
      const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
      setDragging(false);
      setDragOffset(0);
      touchStartX.current = null;
      touchStartY.current = null;

      // Tap
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        const tapX = e.changedTouches[0].clientX;
        if (tapX < window.innerWidth / 2 && idx > 0) onNav(idx - 1);
        else if (tapX >= window.innerWidth / 2 && idx < images.length - 1) onNav(idx + 1);
        return;
      }

      // Swipe
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && idx < images.length - 1) onNav(idx + 1);
        else if (dx > 0 && idx > 0) onNav(idx - 1);
      }
    };

    // All passive — touchAction:none on the el is what blocks native browser handling
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
    };
  }, [isOpen, images.length, onNav]);

  if (!isOpen) return null;

  const imgAreaHeight = `calc(100dvh - ${BAR_HEIGHT * 2}px)`;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        background: '#080806',
        // touchAction:none on the root — browser does zero native touch behaviour
        touchAction: 'none',
        userSelect: 'none', WebkitUserSelect: 'none',
      }}
    >
      {/* Top bar */}
      <div style={{
        height: BAR_HEIGHT, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', background: 'rgba(0,0,0,0.85)', zIndex: 10,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          {(index ?? 0) + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
          }}
        >
          <X style={{ width: 20, height: 20, color: 'rgba(255,255,255,0.8)' }} />
        </button>
      </div>

      {/* Image swipe area — touchAction:none here is the critical declaration */}
      <div
        ref={areaRef}
        style={{
          position: 'relative', flexShrink: 0, height: imgAreaHeight,
          overflow: 'hidden', touchAction: 'none',
        }}
      >
        {/* Sliding track */}
        <div style={{
          display: 'flex', height: '100%',
          width: `${images.length * 100}vw`,
          transform: `translateX(calc(${-index * 100}vw + ${dragOffset}px))`,
          transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}>
          {images.map((img, i) => (
            <div key={i} style={{
              width: '100vw', height: '100%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={img.src}
                alt={img.alt || img.caption || ''}
                draggable={false}
                style={{
                  maxWidth: '100%', maxHeight: '100%',
                  objectFit: 'contain', display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Prev arrow */}
        {index > 0 && (
          <button onClick={() => onNav(index - 1)} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            zIndex: 6, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <ChevronLeft style={{ width: 20, height: 20, color: '#fff' }} />
          </button>
        )}

        {/* Next arrow */}
        {index < images.length - 1 && (
          <button onClick={() => onNav(index + 1)} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            zIndex: 6, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <ChevronRight style={{ width: 20, height: 20, color: '#fff' }} />
          </button>
        )}
      </div>

      {/* Caption bar */}
      <div style={{
        height: BAR_HEIGHT, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 24px', background: 'rgba(0,0,0,0.85)', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.4)',
          fontSize: '0.65rem', margin: 0, letterSpacing: '0.06em',
        }}>
          {images[index]?.caption || 'Swipe or tap to browse'}
        </p>
      </div>
    </div>
  );
}