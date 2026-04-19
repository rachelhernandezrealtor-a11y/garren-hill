import React from 'react';

export default function HomeSectionSeam({ tone = 'light' }) {
  const styles = tone === 'dark'
    ? {
        line: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
        glow: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 72%)',
      }
    : {
      line: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.16) 50%, transparent 100%)',
      glow: 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 72%)',
    };

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-[2] -mt-4 mb-[-1rem] h-10 overflow-visible sm:-mt-5 sm:mb-[-1.25rem] sm:h-12 md:-mt-6 md:mb-[-1.5rem] md:h-14 lg:-mt-7 lg:mb-[-1.75rem] lg:h-16">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: styles.line }} />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:h-28 sm:w-28" style={{ background: styles.glow }} />
    </div>
  );
}