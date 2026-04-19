import React, { useState } from 'react';

export default function GalleryImage({ image, aspect = '16 / 9', muted, onClick, className = '', style = {}, dimmed = false }) {
  const [hovered, setHovered] = useState(false);
  const isHero = !muted;

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{
        aspectRatio: aspect,
        opacity: dimmed && !hovered ? 0.82 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.22,0.1,0.28,1)',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt || ''}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: [
            image.adjust || '',
            muted ? 'brightness(0.92)' : '',
            dimmed && !hovered ? 'saturate(0.9)' : '',
            hovered && muted ? 'brightness(1.02) contrast(1.03)' : '',
            hovered && isHero ? 'contrast(1.06) brightness(1.01)' : '',
          ].filter(Boolean).join(' ') || undefined,
          transform: hovered
            ? isHero ? 'scale(1.025)' : 'scale(1.018)'
            : 'scale(1)',
          transition: 'transform 1.1s cubic-bezier(0.22,0.1,0.28,1), filter 0.9s cubic-bezier(0.22,0.1,0.28,1)',
          willChange: 'transform',
        }}
      />

      {/* Vignette for hero images */}
      {isHero && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.10) 100%)',
          }}
        />
      )}

      {/* Hero hover depth shadow */}
      {isHero && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: hovered
              ? 'inset 0 0 80px rgba(0,0,0,0.06)'
              : 'inset 0 0 0 rgba(0,0,0,0)',
            transition: 'box-shadow 1s cubic-bezier(0.22,0.1,0.28,1)',
          }}
        />
      )}
    </div>
  );
}