import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function MapSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const maps = [
  {
    title: 'Property Site Plan',
    description: '15 acres across 25 parcels with private woodlands and farmstead',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/a997a5a62_ChatGPTImageMar52026at01_50_32AM.png'
  },
  {
    title: 'Regional Location',
    description: '3 miles from Pinehurst Village with strategic access to amenities',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/a997a5a62_ChatGPTImageMar52026at01_50_32AM.png'
  }];


  return (
    <section id="map" className="bg-background py-24 md:py-36 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20">

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Location</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-[1.15] mb-6 max-w-2xl">
            Strategic <em className="italic">Location</em>
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed text-sm font-light max-w-2xl">
            Positioned three miles from the heart of Pinehurst, Flow Farm offers private sanctuary with proximate access to world-class amenities, exceptional medical facilities, and vibrant community engagement.
          </p>
        </motion.div>

        {/* Map Graphics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {maps.map((map, index) =>
          <motion.div
            key={map.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group">

              {/* Elegant frame with shadow */}
              


















              {/* Caption below frame */}
              <div className="mt-6 text-center">
                
                
              </div>
            </motion.div>
          )}
        </motion.div>




      </div>
    </section>);

}