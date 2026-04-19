import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageLightbox from './ImageLightbox';
import { porchImages } from './data/screenedPorchData';

export default function ScreenedPorchSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % porchImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + porchImages.length) % porchImages.length);

  return (
    <>
      <section className="w-full bg-[#171614] text-white" style={{ padding: 'clamp(72px, 10vh, 120px) 0' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 grid grid-cols-1 gap-8 lg:mb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <span className="mb-4 block font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-white/50">
                Cabana Structure
              </span>
              <h2 className="font-display text-white tracking-[-0.015em]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', lineHeight: 0.98, marginBottom: '20px' }}>
                A flexible secondary structure with real scale and utility.
              </h2>
            </div>
            <p className="max-w-2xl font-sans text-white/72" style={{ fontSize: 'clamp(0.96rem, 1.02vw, 1.02rem)', lineHeight: 1.9, margin: 0 }}>
              This building already carries the spatial drama and installed infrastructure for hospitality, recreation, storage, or future adaptation. Tap any image to open it larger.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {porchImages.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group overflow-hidden border border-white/10 bg-white/5 text-left"
                style={{ borderRadius: '2px' }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                      {index === porchImages.length - 1 ? 'Plan View' : 'Gallery View'}
                    </div>
                    <div className="font-display text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', lineHeight: 1.08, marginBottom: '8px' }}>
                      {image.label}
                    </div>
                    <p className="font-sans text-white/74" style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.7 }}>
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxOpen}
        images={porchImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}