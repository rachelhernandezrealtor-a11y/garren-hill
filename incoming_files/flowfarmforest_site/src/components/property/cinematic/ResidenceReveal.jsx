import React from 'react';
import ResidenceSpecs from './ResidenceSpecs';

export default function ResidenceReveal() {
  return (
    <section data-nav-theme="light" className="relative w-full" style={{ background: '#ECE7DF', zIndex: 2 }}>
      <div
        className="relative mx-auto px-6 sm:px-10 text-center"
        style={{
          maxWidth: '800px',
          paddingTop: 'clamp(16px, 2vh, 24px)',
          paddingBottom: 'clamp(32px, 4vh, 48px)',
        }}
      >
        <ResidenceSpecs />
      </div>
    </section>
  );
}