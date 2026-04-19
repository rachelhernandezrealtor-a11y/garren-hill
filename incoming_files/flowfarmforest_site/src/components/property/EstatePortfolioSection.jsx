import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const CATEGORIES = ['All', 'Aerial Images', 'Main Residence', 'Guest House', 'Farm'];

export default function EstatePortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { data: images = [] } = useQuery({
    queryKey: ['portfolioImages'],
    queryFn: () => base44.entities.SavedImage.list('-created_date', 200),
  });

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.section === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i > 0 ? i - 1 : filtered.length - 1));
  const next = () => setLightboxIndex(i => (i < filtered.length - 1 ? i + 1 : 0));

  return (
    <section className="bg-background py-24 md:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-8 sm:w-12 bg-accent" />
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-accent font-medium">Estate Portfolio</span>
            <div className="h-px w-8 sm:w-12 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-[1.15] max-w-3xl mx-auto">
            Complete <em className="italic">visual</em> narrative
          </h2>
          <p className="font-sans text-muted-foreground text-sm font-light max-w-2xl mx-auto mt-6 leading-relaxed">
            Explore the full spectrum of aerial views, architectural detail, and landscape design across the entire estate.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-foreground border-border hover:border-foreground/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-sans text-muted-foreground text-sm">No images in this category yet.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, index) => (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden cursor-pointer block w-full break-inside-avoid rounded-sm"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-end p-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-white text-[10px] tracking-[0.2em] uppercase font-medium">
                    {img.title}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-white/60 text-[9px] tracking-wide uppercase mt-1">
                    {img.section}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 px-14 max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].image_url}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="text-center">
                <p className="font-sans text-white/80 text-sm">{filtered[lightboxIndex].title}</p>
                <p className="font-sans text-white/40 text-[10px] tracking-[0.25em] uppercase mt-1">
                  {filtered[lightboxIndex].section} — {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}