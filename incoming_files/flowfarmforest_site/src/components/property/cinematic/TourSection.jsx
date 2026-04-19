import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GalleryLightbox from './GalleryLightbox';

const ease = [0.22, 0.1, 0.28, 1];

/**
 * A single room/space in the guided tour.
 * 
 * Layout: One strong lead image (full width, cinematic 16:10),
 * then a tight 2-column supporting grid below.
 * Each section feels like pausing in a room — not scrolling a gallery.
 */
export default function TourSection({ heading, description, photos, index }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const leadRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: leadRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 1], [1.06, 1.01, 1]);

  if (!photos || photos.length === 0) return null;

  const lead = photos[0];
  const supporting = photos.slice(1, 5); // max 4 supporting images — intentional restraint

  return (
    <section className="relative">
      {/* Section heading — left-aligned, calm */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.0, ease }}
        className="mb-7 sm:mb-8"
      >
        <div className="max-w-2xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-sans text-[0.52rem] font-medium tracking-[0.35em] uppercase text-white/30">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="font-display text-[clamp(1.45rem,2.5vw,2rem)] font-normal text-white tracking-tight leading-tight m-0">
              {heading}
            </h2>
          </div>
          {description && (
            <p className="font-sans text-[0.82rem] font-light text-white/60 leading-[1.9] max-w-xl m-0 ml-[calc(2ch+12px)]">
              {description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Lead image — cinematic, full-width, immersive with parallax */}
      <motion.figure
        ref={leadRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.2, ease }}
        className="m-0 mb-3 cursor-pointer group relative"
        onClick={() => setLightboxIdx(0)}
      >
        <div className="overflow-hidden rounded-lg relative" style={{ aspectRatio: '16 / 10' }}>
          <motion.img
            src={lead.src}
            alt={lead.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              y: imgY,
              scale: imgScale,
              willChange: 'transform',
              ...(lead.adjust ? { filter: lead.adjust } : {}),
            }}
          />
          {/* Subtle bottom gradient for caption legibility */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)' }} />
          <span className="absolute bottom-3 left-4 right-4 font-sans text-white/80 text-[0.68rem] font-light tracking-wide z-10" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            {lead.alt}
          </span>
        </div>
      </motion.figure>

      {/* Supporting images — tight 2-col, no more than 4 */}
      {supporting.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5">
          {supporting.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className="m-0 cursor-pointer group relative"
              onClick={() => setLightboxIdx(i + 1)}
            >
              <div className="overflow-hidden rounded-lg relative" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={photo.adjust ? { filter: photo.adjust } : undefined}
                />
              </div>
            </motion.figure>
          ))}
        </div>
      )}

      {/* "See all X photos" link when section has more than 5 */}
      {photos.length > 5 && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          onClick={() => setLightboxIdx(0)}
          className="mt-3 font-sans text-[0.62rem] font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          View all {photos.length} photographs →
        </motion.button>
      )}

      {/* Lightbox — navigate through ALL photos in this section */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          images={photos}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % photos.length)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + photos.length) % photos.length)}
        />
      )}
    </section>
  );
}