import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryLightbox from '../property/cinematic/GalleryLightbox';
import VariantHeroStack from './VariantHeroStack';
import VariantSideFeature from './VariantSideFeature';
import VariantFullBleed from './VariantFullBleed';

const ease = [0.22, 0.1, 0.28, 1];

const LAYOUT_MAP = {
  heroStack: VariantHeroStack,
  sideFeature: VariantSideFeature,
  fullBleed: VariantFullBleed,
};

export default function GallerySection({ title, intro, images, variant = 'heroStack', index }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const Layout = LAYOUT_MAP[variant] || LAYOUT_MAP.heroStack;

  return (
    <>
      {/* Section module — everything grouped tightly */}
      <section className="py-1">
        {/* Header — tight to hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease }}
          className="mb-2.5"
        >
          <span className="block font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] uppercase text-foreground/12 mb-1">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-normal text-foreground tracking-tight leading-[1.06] m-0">
            {title}
          </h2>
          {intro && (
            <p className="font-sans text-[0.85rem] sm:text-[0.9rem] font-light text-foreground/25 leading-[1.65] mt-1.5 mb-0 max-w-lg">
              {intro}
            </p>
          )}
        </motion.div>

        {/* Images */}
        <Layout images={images} onImageClick={(i) => setLightboxIdx(i)} />
      </section>

      {/* Between-section spacing */}
      <div className="py-[clamp(40px,6vh,72px)]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.4, ease }}
          className="h-px mx-auto origin-center"
          style={{ maxWidth: '40px', background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)' }}
        />
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(images.length - 1, i + 1))}
        />
      )}
    </>
  );
}