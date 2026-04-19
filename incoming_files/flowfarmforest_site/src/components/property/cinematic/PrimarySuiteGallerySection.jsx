import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GALLERY_DATA from './galleryData';

const ease = [0.22, 0.1, 0.28, 1];

const PRIMARY_SUITE_SPECS = [
  { label: 'Layout & Approach', detail: 'Private east wing entry with dedicated circulation corridor; isolated from main residence traffic patterns' },
  { label: 'Lighting Design', detail: 'Precision architectural lighting with dimmable circuits throughout; recessed fixtures, custom sconces, and under-cabinet illumination; each zone independently controlled via Control 4 for ambient and task lighting' },
  { label: 'Audio & Speakers', detail: 'Integrated speaker system in every room; seamless audio distribution controlled through Control 4 automation; discreet in-wall and ceiling speakers preserve architectural integrity' },
  { label: 'Climate Systems', detail: 'Five-zone geothermal system with independent Primary Suite HVAC zone; precise temperature control via Control 4 smart integration' },
  { label: 'Materials & Finishes', detail: 'Reclaimed heart pine flooring and cabinetry; hand-finished custom millwork throughout; architectural-grade interior trim and moldings' },
  { label: 'Fenestration & Light', detail: 'Multiple casement and operable windows with custom cross-bracing; strategic glazing for natural light control and views; integrated motorized shade system controlled via Control 4' },
];

function PrimarySuiteLightbox({ image, onClose, allPhotos, currentIdx, onNext, onPrev }) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed left-0 right-0 bottom-0 top-0 bg-black/95 backdrop-blur z-50 flex items-center justify-center p-4"
      >
        <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full flex flex-col items-center justify-center">
          <motion.img
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            src={image.src}
            alt={image.alt}
            className="max-h-[85vh] max-w-full object-contain"
            style={{ filter: image.adjust || 'saturate(1.08) contrast(1.12) brightness(1.15) sepia(0.02)', boxShadow: '0 40px 100px rgba(0,0,0,0.9)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-8 md:p-12 text-white text-center"
          >
            <p className="font-display text-lg md:text-2xl font-light tracking-wide leading-relaxed mb-2" style={{textShadow: '0 4px 16px rgba(0,0,0,0.9)'}}>{image.alt}</p>
            <p className="text-xs opacity-60 font-light tracking-[0.15em] uppercase" style={{textShadow: '0 2px 8px rgba(0,0,0,0.9)'}}>{currentIdx + 1} of {allPhotos.length}</p>
          </motion.div>

          <button
            onClick={onClose}
            className="absolute top-6 md:top-8 right-6 md:right-8 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/8 hover:bg-white/15 border border-white/25 flex items-center justify-center text-white text-2xl transition backdrop-blur-sm"
          >
            ×
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/8 hover:bg-white/15 border border-white/25 flex items-center justify-center text-white text-xl transition disabled:opacity-20 backdrop-blur-sm"
            disabled={currentIdx === 0}
          >
            ‹
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/8 hover:bg-white/15 border border-white/25 flex items-center justify-center text-white text-xl transition disabled:opacity-20 backdrop-blur-sm"
            disabled={currentIdx === allPhotos.length - 1}
          >
            ›
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PrimarySuiteGallerySection() {
  const suitePhotos = GALLERY_DATA.filter(img => img.room === 'Primary Suite');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleImageClick = (img) => {
    const idx = suitePhotos.findIndex(i => i.src === img.src);
    setSelectedImage(img);
    setCurrentIdx(idx);
  };

  const handleNext = () => {
    if (currentIdx < suitePhotos.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedImage(suitePhotos[currentIdx + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedImage(suitePhotos[currentIdx - 1]);
    }
  };

  const heroImage = suitePhotos[0];

  if (!heroImage) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease }}
      className="w-full bg-gradient-to-b from-[#FAFAF8] to-[#F6F4EF] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* === HERO === */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="mb-16 md:mb-24 rounded-lg overflow-hidden"
          style={{ aspectRatio: '16/10', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
        >
          <button
            onClick={() => handleImageClick(heroImage)}
            className="relative w-full h-full group cursor-pointer"
          >
            <img
              src={heroImage.src}
              alt="Primary Suite"
              className="w-full h-full object-cover group-hover:brightness-[1.08] transition-all duration-700"
              style={{ filter: heroImage.adjust || 'saturate(1.05) contrast(1.04) brightness(1.18) sepia(0.06) hue-rotate(-2deg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 cinematic-vignette" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p style={{color: '#ffffff', fontSize: '14px', fontWeight: '300', letterSpacing: '0.16em', textTransform: 'uppercase', textShadow: '0 4px 16px rgba(0,0,0,0.95)'}}>Explore Gallery</p>
            </motion.div>
          </button>
        </motion.div>

        {/* === SPECS OVERLAY === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="mb-16 md:mb-24 p-8 md:p-12 bg-white border border-[#E8E4DC]/60 rounded-lg"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
        >
          <h3 className="font-display text-2xl md:text-3xl font-light text-[#1C1C1A] mb-8" style={{ letterSpacing: '0.01em' }}>Primary Suite — East Wing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PRIMARY_SUITE_SPECS.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="pb-6 border-b border-[#E8E4DC]/50 last:border-b-0 md:last:border-b md:odd:border-b-0"
              >
                <div className="text-sm font-light tracking-[0.12em] uppercase text-[#A89A84] mb-2">{spec.label}</div>
                <p className="text-base font-light text-[#5A5A56] leading-relaxed">{spec.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === GALLERY GRID === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {suitePhotos.slice(1).map((photo, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleImageClick(photo)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all cinematic-grain"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:brightness-[1.1] transition-all duration-700 cinematic-warm"
                style={{ filter: photo.adjust || 'saturate(1.05) contrast(1.04) brightness(1.18) sepia(0.06) hue-rotate(-2deg)' }}
              />
              <div className="absolute inset-0 cinematic-vignette" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500 flex items-center justify-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{color: '#ffffff', fontSize: '12px', fontWeight: '300', letterSpacing: '0.12em', textTransform: 'uppercase', textShadow: '0 2px 8px rgba(0,0,0,0.95)'}}
                >
                  View
                </motion.p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <PrimarySuiteLightbox
        image={selectedImage}
        allPhotos={suitePhotos}
        currentIdx={currentIdx}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </motion.section>
  );
}