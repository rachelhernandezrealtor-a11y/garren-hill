import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageAdjust } from './imageAdjust';


const ease = [0.22, 0.1, 0.28, 1];

/* ─── Inline quote strip ─── */
export function QuoteStrip({ children }) {
  return (
    <div className="flex justify-center" style={{ background: '#F6F4EF', padding: 'clamp(64px, 12vh, 140px) clamp(20px, 5vw, 56px)', position: 'relative', zIndex: 2 }}>
      <p className="font-serif italic text-center" style={{ fontSize: 'clamp(0.88rem, 1.15vw, 1.08rem)', lineHeight: 1.65, fontWeight: 300, color: 'rgba(107,107,103,0.7)', maxWidth: '680px', margin: '0 auto' }}>
        {children}
      </p>
    </div>
  );
}

/* ─── Single cinematic image — standalone vertical moment ─── */
function CinematicImage({ image, index }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);
  const isLead = index === 0;

  // Only lead image gets scroll-driven bloom; others get simple whileInView fade
  const useScrollReveal = isLead;
  const revealOpacity = useTransform(scrollYProgress, [0.02, 0.22], [0, 1]);
  const revealScale = useTransform(scrollYProgress, [0.02, 0.3], [1.06, 1]);
  const bloomOpacity = useTransform(scrollYProgress, [0.04, 0.14, 0.28], [0, 0.18, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: useScrollReveal ? 0 : 20 }}
      whileInView={useScrollReveal ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={useScrollReveal ? undefined : { duration: 1.4, delay: 0.05, ease }}
      style={useScrollReveal ? { opacity: revealOpacity } : {}}
    >
      <div className="overflow-hidden rounded-xl relative" style={{ aspectRatio: isLead ? '16/10' : '3/2' }}>
        <motion.img
          src={image.src}
          alt={image.alt || image.caption || ''}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            filter: image.adjust || getImageAdjust(image.src),
            imageRendering: '-webkit-optimize-contrast',
            y: imgY,
            willChange: 'transform',
            scale: useScrollReveal ? revealScale : 1.04,
          }}
          loading={index < 2 ? 'eager' : 'lazy'}
        />
        {/* Bloom overlay for lead image only */}
        {useScrollReveal && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
              opacity: bloomOpacity,
            }}
          />
        )}
        {/* Bottom gradient for caption legibility */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))' }} />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)' }} />
      </div>
      {/* Caption below image */}
      {image.caption && (
        <p className="font-sans text-center mt-3" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.6, color: 'rgba(107,107,103,0.65)' }}>
          {image.caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Inline lightbox ─── */
function InlineLightbox({ images, index, onClose, onNav }) {
  const img = images[index];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white z-50 transition-colors">
          <X className="w-7 h-7" />
        </button>
        {index > 0 && (
          <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {index < images.length - 1 && (
          <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl w-full"
        >
          <img src={img.src} alt={img.alt || img.caption || ''} className="w-full max-h-[78vh] object-contain rounded-lg" />
          <p className="text-white/80 text-center font-sans text-sm mt-4">{img.caption}</p>
          <p className="text-white/40 text-center font-sans text-xs mt-1">{index + 1} / {images.length}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Inline editorial text moment ─── */
function InlineEditorial({ description, details }) {
  if (!description && (!details || details.length === 0)) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.6, ease: [0.22, 0.1, 0.28, 1] }}
      className="text-center mx-auto"
      style={{ maxWidth: '580px', padding: 'clamp(16px, 3vh, 32px) 0' }}
    >
      {description && (
        <p className="font-serif italic" style={{
          fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)', lineHeight: 1.7,
          fontWeight: 300, color: 'rgba(107,107,103,0.72)', margin: '0 0 20px',
        }}>
          {description}
        </p>
      )}
      {details && details.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2" style={{ marginTop: description ? '0' : '0' }}>
          {details.map((d, i) => (
            <span key={i} className="font-sans" style={{
              fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(107,107,103,0.5)',
              border: '1px solid rgba(107,107,103,0.15)', borderRadius: '20px',
              padding: '5px 14px', whiteSpace: 'nowrap',
            }}>
              {d.label}: {d.value}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Render a sequence of images as a clean vertical cinematic flow ─── */
/* Each image scrolls in with subtle parallax. Click any image → navigable lightbox. */
export function EditorialSequence({ images, onImageClick, description, details }) {
  // Insert editorial text after the 1st image
  const editorialAfterIndex = images.length >= 2 ? 0 : -1;

  return (
    <div style={{ paddingTop: 'clamp(8px, 1vh, 16px)', paddingBottom: 'clamp(16px, 3vh, 32px)' }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col" style={{ gap: 'clamp(32px, 5vh, 56px)' }}>
        {images.map((img, i) => (
          <React.Fragment key={i}>
            <div onClick={onImageClick ? () => onImageClick(i) : undefined} style={onImageClick ? { cursor: 'pointer' } : undefined}>
              <CinematicImage image={img} index={i} />
            </div>
            {i === editorialAfterIndex && (
              <InlineEditorial description={description} details={details} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─── Editorial chapter title (was a separate file, now inline) ─── */
export function EditorialChapterTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 2.0, ease: [0.16, 0.1, 0.24, 1] }}
      className="text-center"
      style={{ padding: 'clamp(20px, 3vh, 40px) 24px clamp(16px, 2vh, 32px)' }}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 0.1, 0.24, 1] }}
          className="block font-sans uppercase"
          style={{ fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.4em', color: 'rgba(0,0,0,0.20)', marginBottom: '12px' }}
        >
          {subtitle}
        </motion.span>
      )}
      <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, lineHeight: 1.08, color: '#1C1C1A', letterSpacing: '0.01em', margin: 0 }}>
        {title}
      </h3>
    </motion.div>
  );
}

/* ─── Inline mudroom gallery — gallery-sourced color-matched URLs ─── */
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';
const MUDROOM_IMAGES = [
  { src: B+'59881eba8_260115107LindenTrailF-9475-2.jpg', caption: 'The mudroom — 17-foot vaulted ceilings, clerestory windows, and a granite island at the center of it all.' },
  { src: B+'e480e9280_MUDROOMLAUNDRY.jpg', caption: 'Washer, dryer, and a deep farm sink — set beneath picture windows overlooking the grounds.' },
  { src: B+'683c4a65a_MUDDPOWDERROOM.jpg', caption: 'Mudroom powder room — herringbone tile and walk-in shower.' },
  { src: B+'b94cc0247_MUDROOM3.jpg', caption: 'Heart pine coat racks and built-in storage.' },
  { src: B+'6759b6410_MUDROOM.jpg', caption: 'Entry from the garage — Dutch door, slate tile.' },
  { src: B+'29cac45c9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg', caption: 'Heart pine stairway — ascending to the guest apartment above the mudroom wing.' },
];

export function MudroomGuestSuiteGallery() {
  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <EditorialSequence images={MUDROOM_IMAGES.slice(1)} />
      </div>
    </div>
  );
}