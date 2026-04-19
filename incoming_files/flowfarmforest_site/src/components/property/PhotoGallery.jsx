import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { base44 } from '@/api/base44Client';
import { trackInteractionEvent } from '@/lib/trackInteractionEvent';

const gallery = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Exterior',
    title: 'Main Residence'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Interior',
    title: 'Great Room'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Grounds',
    title: 'Estate Grounds'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Exterior',
    title: 'Front Entrance'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Interior',
    title: 'Master Suite'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    category: 'Amenities',
    title: 'Pool Area'
  }
];

export default function PhotoGallery() {
  const { isEditMode } = useEditMode();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(gallery.map(img => img.category))];
  const filtered = filter === 'All' ? gallery : gallery.filter(img => img.category === filter);

  const handleDelete = async () => {
    const sections = await base44.entities.PageSection.filter({ page_name: 'Home', section_type: 'PhotoGallery' });
    if (sections.length > 0) {
      await base44.entities.PageSection.delete(sections[0].id);
      window.location.reload();
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev - 1 + filtered.length) % filtered.length;
      trackInteractionEvent('gallery_lightbox_navigated', {
        direction: 'previous',
        image_title: filtered[nextIndex]?.title || null,
        category: filtered[nextIndex]?.category || null,
      });
      return nextIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % filtered.length;
      trackInteractionEvent('gallery_lightbox_navigated', {
        direction: 'next',
        image_title: filtered[nextIndex]?.title || null,
        category: filtered[nextIndex]?.category || null,
      });
      return nextIndex;
    });
  };

  const handleCloseLightbox = () => {
    trackInteractionEvent('gallery_lightbox_closed', {
      image_title: filtered[currentIndex]?.title || null,
      category: filtered[currentIndex]?.category || null,
    });
    setLightboxOpen(false);
  };

  return (
    <section id="gallery" className="bg-background py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-border relative">
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors z-50">
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Visual Tour</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight sm:leading-[1.15] max-w-2xl mb-8">
            Estate Gallery
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentIndex(0);
                  trackInteractionEvent('gallery_filter_selected', { category: cat });
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-all rounded-full ${
                  filter === cat
                    ? 'bg-accent text-white'
                    : 'border border-border hover:border-accent text-foreground'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => {
                setCurrentIndex(filtered.indexOf(image));
                setLightboxOpen(true);
                trackInteractionEvent('gallery_image_opened', {
                  image_title: image.title,
                  category: image.category,
                  position: filtered.indexOf(image) + 1,
                });
              }}
              className="relative overflow-hidden aspect-square rounded-lg cursor-pointer group">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white">
                  <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/70 mb-1">
                    {image.category}
                  </p>
                  <p className="font-serif text-lg">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl">
              <img
                src={filtered[currentIndex].src}
                alt={filtered[currentIndex].title}
                className="responsive-image-contain max-h-[75vh] sm:max-h-[80vh] rounded-lg"
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6">
                <p className="font-sans text-xs sm:text-sm text-white/70 mb-1 sm:mb-2">
                  {filtered[currentIndex].category}
                </p>
                <h3 className="font-serif text-lg sm:text-2xl text-white mb-1 sm:mb-2">
                  {filtered[currentIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/60">
                  {currentIndex + 1} of {filtered.length}
                </p>
              </div>

              {/* Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Close */}
              <button
                onClick={handleCloseLightbox}
                className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors">
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}