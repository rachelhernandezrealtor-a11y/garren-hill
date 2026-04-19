import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true, margin: '-100px' },
};

export default function EditorialGalleryGrid({ galleries = [] }) {
  // Default galleries if none provided
  const defaultGalleries = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      caption: 'Foyer & Arrival'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600210174918-abf94db90e5d?w=800&q=80',
      caption: 'Great Room'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18a2e9ba0?w=800&q=80',
      caption: 'Kitchen & Dining'
    }
  ];

  const items = galleries.length > 0 ? galleries : defaultGalleries;

  return (
    <motion.div {...fadeInUp} className="w-full mb-16 sm:mb-20 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {items.map((gallery, idx) => (
          <motion.div
            key={gallery.id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={gallery.image}
              alt={gallery.caption}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
              <p className="font-serif text-xl sm:text-2xl font-light text-white leading-tight">
                {gallery.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}