import React, { useState, useRef, useEffect } from 'react';

export default function PropertyLightboxModal({ isOpen, onClose, galleries, group, index: initialIndex }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const lastTriggerRef = useRef(null);

  const items = (galleries && galleries.get && galleries.get(group)) || [];
  const item = items[activeIndex];

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, group]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, activeIndex, items.length, onClose]);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  if (!isOpen || !item) return null;

  const disableNav = items.length < 2;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background: 'rgba(0,0,0,.82)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(1100px, 100%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <figure style={{ margin: 0, background: '#111', border: '1px solid rgba(255,255,255,.10)', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,.45)' }}>
          <img
            src={item.src}
            alt={item.alt}
            style={{
              width: '100%',
              maxHeight: 'min(76vh, 840px)',
              objectFit: 'contain',
              background: '#0d0d0d',
              display: 'block'
            }}
          />
          <figcaption style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '14px',
            padding: '14px 16px',
            background: 'rgba(16,16,16,.94)',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            lineHeight: 1.5,
            textTransform: 'uppercase',
            letterSpacing: '.08em'
          }}>
            <span style={{ color: 'rgba(255,255,255,.90)', flex: 1 }}>
              {item.caption || item.alt || 'Gallery image'}
            </span>
            <span style={{ color: 'rgba(255,255,255,.62)', whiteSpace: 'nowrap' }}>
              {items.length > 1 ? `${activeIndex + 1} / ${items.length}` : '1 / 1'}
            </span>
          </figcaption>
        </figure>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-12px',
            right: 0,
            transform: 'translateY(-100%)',
            width: '46px',
            height: '46px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,.18)',
            background: 'rgba(255,255,255,.08)',
            color: '#fff',
            fontSize: '28px',
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        <button
          onClick={handlePrev}
          disabled={disableNav}
          style={{
            position: 'absolute',
            top: '50%',
            left: '16px',
            transform: 'translateY(-50%)',
            width: '54px',
            height: '54px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,.18)',
            background: 'rgba(255,255,255,.08)',
            color: '#fff',
            fontSize: '28px',
            lineHeight: 1,
            cursor: disableNav ? 'not-allowed' : 'pointer',
            display: 'grid',
            placeItems: 'center',
            backdropFilter: 'blur(8px)',
            opacity: disableNav ? 0.45 : 1
          }}
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          disabled={disableNav}
          style={{
            position: 'absolute',
            top: '50%',
            right: '16px',
            transform: 'translateY(-50%)',
            width: '54px',
            height: '54px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,.18)',
            background: 'rgba(255,255,255,.08)',
            color: '#fff',
            fontSize: '28px',
            lineHeight: 1,
            cursor: disableNav ? 'not-allowed' : 'pointer',
            display: 'grid',
            placeItems: 'center',
            backdropFilter: 'blur(8px)',
            opacity: disableNav ? 0.45 : 1
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}