import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/dd6e2a053_Ye.jpg',
    alt: 'Estate grounds',
    title: 'Private Sanctuary',
    size: 'large'
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/616d1e236_tunnelgood.jpg',
    alt: 'Farm landscape',
    title: 'Veganic Farm',
    size: 'medium'
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/1adcdae00_107LindenTrail-82.jpg',
    alt: 'Forest pathway',
    title: 'Forest Land',
    size: 'medium'
  },
  {
    src: 'https://images.unsplash.com/photo-1500417320834-2a9a4f7f3267?w=800&q=80',
    alt: 'Sustainable garden',
    title: 'Sustainable Systems',
    size: 'small'
  },
  {
    src: 'https://images.unsplash.com/photo-1475621346813-498f80873452?w=800&q=80',
    alt: 'Property overview',
    title: 'Agricultural Zoning',
    size: 'small'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
};

export default function VisionPhotoGallery() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className="grid grid-cols-12 gap-4">

      {/* Large featured photo */}
      <div className="col-span-12 md:col-span-7 row-span-2 relative overflow-hidden rounded-lg">
        <img src={photos[0].src} alt={photos[0].alt} className="w-full h-96 md:h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white text-lg font-serif font-light">{photos[0].title}</h3>
      </div>

      {/* Medium photos */}
      <div className="col-span-12 md:col-span-5 relative overflow-hidden rounded-lg">
        <img src={photos[1].src} alt={photos[1].alt} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white text-base font-serif font-light">{photos[1].title}</h3>
      </div>

      <div className="col-span-12 md:col-span-5 relative overflow-hidden rounded-lg">
        <img src={photos[2].src} alt={photos[2].alt} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white text-base font-serif font-light">{photos[2].title}</h3>
      </div>

      {/* Small accent photos */}
      <div className="col-span-6 md:col-span-3 relative overflow-hidden rounded-lg">
        <img src={photos[3].src} alt={photos[3].alt} className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-2 left-2 text-white text-sm font-serif font-light">{photos[3].title}</h3>
      </div>

      <div className="col-span-6 md:col-span-3 relative overflow-hidden rounded-lg">
        <img src={photos[4].src} alt={photos[4].alt} className="w-full h-32 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-2 left-2 text-white text-sm font-serif font-light">{photos[4].title}</h3>
      </div>

    </motion.div>
  );
}