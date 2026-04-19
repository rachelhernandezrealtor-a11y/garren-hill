import React from 'react';
import { propertyData } from './propertyData';

export default function PropertyExperienceDarkSection({ data, onOpenGallery }) {
  const hero = data.hero || propertyData.mainHouse.hero;
  const stats = data.stats || propertyData.mainHouse.stats;
  const signatureSpaces = data.signatureSpaces || propertyData.mainHouse.signatureSpaces;
  const featured = data.featured || propertyData.mainHouse.featured;
  const strip = data.strip || propertyData.mainHouse.strip;
  const ctas = data.ctas || propertyData.mainHouse.ctas;

  return (
    <section id="flowfarm-mainhouse" className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mb-8">
          {/* Left: Hero */}
          <article className="lg:col-span-4 relative h-96 md:h-full min-h-96 rounded-3xl overflow-hidden border border-white/12 shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center scale-102"
              style={{ backgroundImage: `url(${hero.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/78" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <button
                  onClick={() => onOpenGallery(featured.group)}
                  className="px-3 py-2.5 rounded-full bg-white/10 border border-white/18 text-white text-xs tracking-wider uppercase backdrop-blur-sm hover:bg-white/14 transition-all"
                >
                  Open Gallery ↗
                </button>
                <div className="text-xs tracking-wider uppercase text-white/72">
                  Explore the residence
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-3 leading-tight">
                  {hero.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-2xl">
                  {hero.copy}
                </p>
              </div>
            </div>
          </article>

          {/* Right: Info Cards */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Stats Card */}
            <article className="border border-white/12 rounded-3xl bg-gradient-to-b from-white/7 to-white/3 p-6 shadow-xl">
              <div className="flex justify-between items-start gap-3 mb-4">
                <div className="text-xs tracking-wider uppercase text-white/72">
                  At a glance
                </div>
                <div className="text-xs tracking-wider uppercase text-white/62">
                  NC guidelines
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {stats?.map((stat) => (
                  <div key={stat.key} className="border border-white/12 rounded-2xl bg-black/26 p-3.5">
                    <div className="text-xs tracking-wider uppercase text-white/72 mb-1">
                      {stat.key}
                    </div>
                    <div className="font-serif text-2xl text-white/95 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/72 leading-relaxed">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 text-sm text-white/72 leading-relaxed">
                {data.note}
              </div>
            </article>

            {/* Signature Spaces Card */}
            <article className="border border-white/12 rounded-3xl bg-gradient-to-b from-white/7 to-white/3 p-6 shadow-xl">
              <div className="text-xs tracking-wider uppercase text-white/72 mb-3">
                Signature spaces
              </div>
              <ul className="space-y-2.5 text-sm text-white/84 leading-relaxed">
                {signatureSpaces?.map((space, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: space }} />
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* Featured Photo Grid */}
        <article className="mt-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
            <div>
              <div className="text-xs tracking-wider uppercase text-white/72 mb-2">
                Featured images
              </div>
              <div className="text-sm leading-relaxed text-white/76 max-w-2xl">
                {featured.intro}
              </div>
            </div>
            <button
              onClick={() => onOpenGallery(featured.group)}
              className="px-4 py-3 rounded-full border border-amber-600/55 bg-amber-600/12 text-white/92 text-sm tracking-wider uppercase hover:bg-amber-600/18 transition-all whitespace-nowrap"
            >
              View More Photos ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:grid-rows-2 auto-rows-52">
            {featured.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onOpenGallery(featured.group, idx)}
                className={`relative group overflow-hidden rounded-2xl border border-white/12 bg-black/26 ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-102 group-hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/12 to-black/72" />
                
                {idx === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-3 py-2 rounded-full bg-white/10 border border-white/18 text-white text-xs tracking-widest uppercase backdrop-blur-sm">
                      Main House Highlights ↗
                    </span>
                  </div>
                )}

                {idx === featured.images.length - 1 && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-sm font-serif text-white">View Full Gallery</div>
                    <div className="text-xs tracking-wider uppercase text-white/72">Main House Photos ↗</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </article>

        {/* Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
          {strip?.map((card) => (
            <article key={card.label} className="border border-white/12 rounded-2xl bg-black/26 p-5">
              <div className="text-xs tracking-wider uppercase text-white/72 mb-2">
                {card.label}
              </div>
              <div className="font-serif text-lg text-white/94 mb-3">
                {card.title}
              </div>
              <div className="text-sm leading-relaxed text-white/72">
                {card.copy}
              </div>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row flex-wrap gap-3 mt-8 pt-8 border-t border-white/10">
          {ctas?.map((cta) => (
            cta.kind === 'link' ? (
              <a
                key={cta.label}
                href={cta.href}
                target="_blank"
                rel="noopener"
                className={`px-4 py-3 rounded-full text-xs tracking-wider uppercase transition-all ${
                  cta.style === 'primary'
                    ? 'border border-amber-600/55 bg-amber-600/12 text-white/92 hover:bg-amber-600/18'
                    : 'border border-white/18 bg-white/6 text-white/86 hover:bg-white/10'
                }`}
              >
                {cta.label} ↗
              </a>
            ) : (
              <button
                key={cta.label}
                onClick={() => onOpenGallery(cta.gallery)}
                className={`px-4 py-3 rounded-full text-xs tracking-wider uppercase transition-all ${
                  cta.style === 'primary'
                    ? 'border border-amber-600/55 bg-amber-600/12 text-white/92 hover:bg-amber-600/18'
                    : 'border border-white/18 bg-white/6 text-white/86 hover:bg-white/10'
                }`}
              >
                {cta.label} ↗
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
}