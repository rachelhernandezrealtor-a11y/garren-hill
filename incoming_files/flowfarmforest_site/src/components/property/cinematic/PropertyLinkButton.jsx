import React from 'react';
import { ArrowUpRight, Play, Compass, LayoutGrid, FileText, Zap } from 'lucide-react';

const ICONS = {
  video: Play,
  virtualTour: Compass,
  walkingTour4D: LayoutGrid,
  floorPlan: FileText,
  architectPlans: FileText,
  electricalPlan: Zap,
};

/**
 * Sotheby's-style refined property link.
 * @param {'light'|'dark'|'glass'} variant — visual style
 * @param {string} linkType — key from ICONS map
 */
export default function PropertyLinkButton({ href, label, linkType, variant = 'light', onClick, className = '' }) {
  const Icon = ICONS[linkType] || ArrowUpRight;
  const isExternal = href && href !== '#';

  const palettes = {
    light: {
      color: '#6B6B67',
      hoverColor: '#1C1C1A',
      lineColor: 'rgba(28,28,26,0.12)',
      lineHover: 'rgba(28,28,26,0.45)',
      iconColor: '#A48A6A',
    },
    dark: {
      color: 'rgba(255,255,255,0.52)',
      hoverColor: 'rgba(255,255,255,0.88)',
      lineColor: 'rgba(255,255,255,0.12)',
      lineHover: 'rgba(255,255,255,0.48)',
      iconColor: 'rgba(255,255,255,0.28)',
    },
    glass: {
      color: 'rgba(255,255,255,0.6)',
      hoverColor: '#fff',
      lineColor: 'rgba(255,255,255,0.15)',
      lineHover: 'rgba(255,255,255,0.55)',
      iconColor: 'rgba(255,255,255,0.32)',
    },
    luxe: {
      color: '#6B6B67',
      hoverColor: '#1C1C1A',
      lineColor: 'transparent',
      lineHover: 'transparent',
      iconColor: '#A48A6A',
    },
  };

  const p = palettes[variant] || palettes.light;

  const isLuxe = variant === 'luxe';

  const sharedStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isLuxe ? '10px' : '7px',
    fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: isLuxe ? '0.56rem' : '0.62rem',
    fontWeight: isLuxe ? 500 : 500,
    letterSpacing: isLuxe ? '0.28em' : '0.2em',
    textTransform: 'uppercase',
    color: p.color,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: isLuxe ? '1px solid rgba(28,28,26,0.10)' : 'none',
    borderRadius: isLuxe ? '0' : undefined,
    padding: isLuxe ? '14px 32px' : '8px 0',
    position: 'relative',
    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
    overflow: 'hidden',
  };

  const hoverHandlers = {
    onMouseEnter: (e) => {
      e.currentTarget.style.color = p.hoverColor;
      if (isLuxe) {
        e.currentTarget.style.background = 'rgba(28,28,26,0.04)';
        e.currentTarget.style.borderColor = 'rgba(28,28,26,0.18)';
      }
      const line = e.currentTarget.querySelector('[data-line]');
      if (line) {
        line.style.transform = 'scaleX(1)';
        line.style.background = p.lineHover;
      }
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = p.color;
      if (isLuxe) {
        e.currentTarget.style.background = 'none';
        e.currentTarget.style.borderColor = 'rgba(28,28,26,0.10)';
      }
      const line = e.currentTarget.querySelector('[data-line]');
      if (line) {
        line.style.transform = 'scaleX(0)';
        line.style.background = p.lineColor;
      }
    },
  };

  const inner = (
    <>
      <span>{label}</span>
      {isExternal && <ArrowUpRight style={{ width: 10, height: 10, opacity: 0.4, strokeWidth: 1.5, flexShrink: 0 }} />}
      {/* Animated underline */}
      <span
        data-line
        style={{
          position: 'absolute',
          left: '20px',
          right: 0,
          bottom: '4px',
          height: '1px',
          background: p.lineColor,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.4s ease',
        }}
      />
    </>
  );

  if (href && href !== '#') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={sharedStyle}
        {...hoverHandlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={sharedStyle}
      {...hoverHandlers}
    >
      {inner}
    </button>
  );
}