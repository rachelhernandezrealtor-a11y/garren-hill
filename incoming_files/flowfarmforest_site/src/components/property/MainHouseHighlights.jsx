import React from 'react';
import { motion } from 'framer-motion';

export default function MainHouseHighlights({ data, onOpenGallery }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-black py-24 md:py-36 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
        >
          {/* Hero Image */}
          <div className="lg:col-span-2">
            <button
              onClick={() => onOpenGallery(data.hero.gallery)}
              className="relative w-full overflow-hidden rounded-lg group cursor-pointer h-96"
            >
              <img
                src={data.hero.image}
                alt="Main house hero"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
              <div className="absolute inset-0 flex items-end justify-between p-6">
                <div className="flex-1 pr-4">
                  <h3 className="font-serif text-2xl font-light text-white mb-2">
                    {data.hero.title}
                  </h3>
                  <p className="font-sans text-sm text-white/80 leading-relaxed max-w-md">
                    {data.hero.copy}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenGallery(data.hero.gallery);
                  }}
                  className="flex-shrink-0 px-3 py-2 rounded-full bg-white/10 border border-white/30 text-white text-xs font-sans uppercase tracking-widest hover:bg-white/15 transition-all backdrop-blur-sm"
                >
                  Open Gallery ↗
                </button>
              </div>
            </button>
          </div>

          {/* Side Cards */}
          <div className="space-y-4">
            {/* Stats Card */}
            <div className="border border-white/10 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-sans text-xs text-white/70 uppercase tracking-widest">
                  At a glance
                </span>
                <span className="font-sans text-xs text-white/50 uppercase">
                  NC guidelines
                </span>
              </div>

              <div className="space-y-3">
                {data.stats.map((stat) => (
                  <div key={stat.key} className="pb-3 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="font-sans text-xs text-white/60 uppercase tracking-widest mb-1">
                      {stat.key}
                    </div>
                    <div className="font-serif text-xl font-light text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="font-sans text-xs text-white/70">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 pt-4 border-t border-white/10 font-sans text-xs text-white/60 leading-relaxed">
                {data.note}
              </p>
            </div>

            {/* Signature Spaces Card */}
            <div className="border border-white/10 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <span className="font-sans text-xs text-white/70 uppercase tracking-widest block mb-3">
                Signature spaces
              </span>
              <ul className="space-y-2 text-xs font-sans text-white/80 leading-relaxed">
                {data.signatureSpaces.map((space, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + space }} />
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Featured Images Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div>
              <span className="font-sans text-xs text-white/60 uppercase tracking-widest block">
                Featured images
              </span>
              <p className="font-sans text-sm text-white/70 mt-2 max-w-lg">
                {data.featured.intro}
              </p>
            </div>
            <button
              onClick={() => onOpenGallery(data.featured.group)}
              className="flex-shrink-0 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white text-xs font-sans uppercase tracking-widest hover:bg-white/15 transition-all backdrop-blur-sm"
            >
              View More Photos ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.featured.images.map((image, idx) => {
              const isLarge = idx === 0;
              const isLast = idx === data.featured.images.length - 1;

              return (
                <button
                  key={image.src}
                  onClick={() =>
                    onOpenGallery(
                      data.featured.group,
                      idx
                    )
                  }
                  className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                    isLarge ? 'md:row-span-2 min-h-96 md:min-h-auto' : 'h-48'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />

                  {isLarge && (
                    <div className="absolute inset-0 flex items-end p-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs font-sans uppercase tracking-widest backdrop-blur-sm">
                        Main House Highlights ↗
                      </span>
                    </div>
                  )}

                  {isLast && (
                    <div className="absolute inset-0 flex flex-col items-end justify-end p-4">
                      <div className="text-right">
                        <div className="font-serif text-lg font-light text-white">
                          View Full Gallery
                        </div>
                        <div className="font-sans text-xs text-white/70 uppercase tracking-widest">
                          Main House Photos ↗
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Strip Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {data.strip.map((item) => (
            <div
              key={item.label}
              className="border border-white/10 bg-white/5 rounded-lg p-4 backdrop-blur-sm"
            >
              <span className="font-sans text-xs text-white/60 uppercase tracking-widest">
                {item.label}
              </span>
              <h3 className="font-serif text-lg font-light text-white mt-2 mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                {item.copy}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {data.ctas.map((cta, i) => {
            const isPrimary = cta.style === 'primary';
            const isSecondary = cta.style === 'secondary';

            if (cta.kind === 'gallery') {
              return (
                <button
                  key={cta.label}
                  onClick={() => onOpenGallery(cta.gallery)}
                  className={`px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                    isSecondary
                      ? 'border border-white/30 bg-white/10 text-white hover:bg-white/15'
                      : 'border border-white/30 bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {cta.label} <span>↗</span>
                </button>
              );
            }

            return (
              <a
                key={cta.label}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                  isPrimary
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/30 bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {cta.label} <span>↗</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}