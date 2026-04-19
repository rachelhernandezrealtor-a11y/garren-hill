import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

export default function GalleryPhotoCard({ photo, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.03, 0.3) }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-muted/30">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: photo.adjust || undefined }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <p className="mt-2 font-sans text-[0.72rem] font-light text-muted-foreground/50 leading-snug line-clamp-2 m-0">
        {photo.alt}
      </p>
    </motion.div>
  );
}