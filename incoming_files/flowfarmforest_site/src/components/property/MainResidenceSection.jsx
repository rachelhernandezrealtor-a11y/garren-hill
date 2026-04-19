import React from 'react';

export default function MainResidenceSection({ backgroundImage, title, subtitle }) {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-center">
        <div className="order-2 lg:order-1">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/55 mb-4">
            Main Residence
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-5 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-sm sm:text-base leading-8 text-foreground/70 mb-0">
              {subtitle}
            </p>
          )}
        </div>

        <div className="order-1 lg:order-2 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {backgroundImage ? (
            <img
              src={backgroundImage}
              alt={title || 'Main Residence'}
              className="block w-full aspect-[4/3] object-cover"
            />
          ) : (
            <div className="aspect-[4/3] bg-muted" />
          )}
        </div>
      </div>
    </section>
  );
}