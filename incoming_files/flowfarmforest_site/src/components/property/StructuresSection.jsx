import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Maximize, ArrowRight, Images, Play } from 'lucide-react';
import { structures } from './structuresData';
import StructureModal from './StructureModal';
import { base44 } from '@/api/base44Client';
import EditorialQuote from './EditorialQuote';
import { fadeUp, revealTransition, revealViewport } from './motionConfig';

function StructureCard({ structure, index, onSelect }) {
  // Stagger: odd cards get top margin offset for masonry feel
  const isOdd = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay: index * 0.08 }}
      className={`group cursor-pointer bg-white border border-foreground/[0.05] hover:border-foreground/12 transition-all duration-500 ${isOdd ? 'sm:mt-10' : ''}`}
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      onClick={() => onSelect(structure)}
    >
      <div className="relative overflow-hidden" style={{ height: 'clamp(200px, 22vw, 280px)' }}>
        <img
          src={structure.image}
          alt={structure.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary font-sans text-[7px] sm:text-[8px] tracking-wider uppercase px-2.5 py-1.5 font-medium">
            <Images className="w-2.5 h-2.5" /> {(structure.gallery || []).filter((item) => item?.src).length}
          </span>
          {structure.id === 1 && (
            <a href="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-foreground/90 text-white font-sans text-[7px] sm:text-[8px] tracking-wider uppercase px-2.5 py-1.5 font-medium hover:bg-foreground transition-colors">
              <Play className="w-2.5 h-2.5" /> 3D Tour
            </a>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 text-white">
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium">View Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <span className="font-sans text-[7px] sm:text-[8px] tracking-[0.35em] uppercase text-foreground/28 font-normal block mb-1.5">
          {structure.tagline}
        </span>
        <h3 className="font-serif text-base sm:text-lg font-semibold text-primary mb-2.5 leading-tight">
          {structure.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2.5 text-foreground/35 font-sans text-[9px] sm:text-[10px] font-light">
          {structure.beds > 0 && <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {structure.beds} Beds</span>}
          {structure.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {structure.baths} Baths</span>}
          <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {Math.round(structure.sqm * 10.764)} ft²</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function StructuresSection() {
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => setIsAdmin(u?.role === 'admin')).catch(() => {});
  }, []);

  return (
    <section id="structures" className="bg-[#f8f4ed] py-16 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 border-t border-black/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="mb-10 sm:mb-14 md:mb-18">
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-foreground/35 font-medium block mb-3">Estate Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.02] tracking-[-0.015em]">Structures</h2>
          <div className="h-px w-12 bg-foreground/12 mt-5" />
        </motion.div>

        {/* Staggered grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {structures.map((structure, index) => (
            <StructureCard key={structure.id} structure={structure} index={index} onSelect={setSelected} />
          ))}
        </div>

        {/* Pull quote below structures */}
        <div className="mt-12 sm:mt-16 md:mt-22 max-w-2xl mx-auto">
          <EditorialQuote text="Five distinct structures compose a private compound of over 12,000 square feet — each designed with intention" />
        </div>
      </div>

      <AnimatePresence>
        {selected && <StructureModal structure={selected} onClose={() => setSelected(null)} isAdmin={isAdmin} />}
      </AnimatePresence>
    </section>
  );
}