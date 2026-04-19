import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85', alt: 'Grand salon' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85', alt: 'Living room' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=85', alt: 'Master bedroom' },
  { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=85', alt: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1600573472591-ee6981cf81f6?w=800&q=85', alt: 'Grounds' },
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=85', alt: 'Pool' },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  const navigate = (direction) => {
    if (lightbox === null) return;
    const next = lightbox + direction;
    if (next >= 0 && next < images.length) setLightbox(next);
  };

  return (
    <section id="gallery" className="bg-background py-24 md:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-accent" />
              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Gallery</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-[1.15]">
              A glimpse inside
            </h2>
          </div>
          <p className="font-sans text-muted-foreground text-xs font-light max-w-xs sm:text-right">
            Photography by Studio Bianchi & Associates — all images subject to copyright
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 auto-rows-max">
          {images.map((img, index) => {
            const heights = ['md:col-span-2 md:row-span-2', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2', 'md:col-span-1', 'md:col-span-1'];
            return (
            <motion.div
             key={index}
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: index * 0.06 }}
             className={`relative overflow-hidden cursor-pointer group ${heights[index]}`}
             onClick={() => setLightbox(index)}
             whileHover={{ y: -8 }}
             >
             <div className={`overflow-hidden h-full ${index === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
               <motion.img
                 src={img.src}
                 alt={img.alt}
                 whileHover={{ scale: 1.12 }}
                 transition={{ duration: 0.7, ease: 'easeOut' }}
                 className="w-full h-full object-cover"
                 animate={{ y: [0, -4, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
               />
             </div>
              {/* Overlay with caption */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-primary/30 flex items-end p-4">
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-white font-medium">
                  {img.alt}
                </motion.span>
              </motion.div>
            </motion.div>
            );
            })}
            </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/96 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              onClick={() => setLightbox(null)}
              whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </motion.button>
            {lightbox > 0 && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-2 sm:left-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
            {lightbox < images.length - 1 && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 sm:right-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3 px-14"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-[85vw] max-h-[80vh] object-contain"
              />
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/50">
                {images[lightbox].alt} — {lightbox + 1} / {images.length}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}