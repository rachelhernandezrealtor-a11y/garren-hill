import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Bed, Bath, Maximize, Images, Play, Trash2 } from 'lucide-react';
import ImageUploadDropZone from '../ImageUploadDropZone';

function GalleryTab({ gallery = [], onGalleryChange, isAdmin }) {
  const [active, setActive] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const safeGallery = gallery.filter((item) => item?.src);
  const activeImage = safeGallery[active] || safeGallery[0];

  if (!activeImage) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex aspect-video items-center justify-center border border-border bg-secondary/40 px-6 text-center">
          <div>
            <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">Photo Gallery</div>
            <p className="mt-3 font-sans text-sm text-muted-foreground">No gallery images are available for this structure yet.</p>
          </div>
        </div>

        {isAdmin && (
          <ImageUploadDropZone
            onImageUpload={(url) => {
              const newGallery = [...safeGallery, { src: url, caption: 'New Image' }];
              onGalleryChange(newGallery);
              setActive(newGallery.length - 1);
            }}
            isLoading={isUploading}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none z-[1]" />
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={activeImage.src}
            alt={activeImage.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-cover"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </AnimatePresence>

        {/* Prev / Next */}
        {active > 0 && (
          <button
            onClick={() => setActive(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary/70 hover:bg-primary text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {active < safeGallery.length - 1 && (
          <button
            onClick={() => setActive(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-primary/70 hover:bg-primary text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5 bg-gradient-to-t from-primary/70 to-transparent">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/80">
            {activeImage.caption} — {Math.min(active + 1, safeGallery.length)} / {safeGallery.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
        {safeGallery.map((img, i) => (
          <div key={i} className="flex-shrink-0 relative">
            <button
              onClick={() => setActive(i)}
              className={`w-20 h-14 overflow-hidden border border-black/5 transition-all duration-200 ${
                i === active ? 'ring-2 ring-accent ring-offset-1 opacity-100' : 'opacity-70 hover:opacity-95'
              }`}
            >
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  const updated = safeGallery.filter((_, idx) => idx !== i);
                  onGalleryChange(updated);
                  if (active >= updated.length) setActive(Math.max(0, updated.length - 1));
                }}
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-destructive text-white rounded-full hover:bg-destructive/90"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <ImageUploadDropZone
          onImageUpload={(url) => {
            const newGallery = [...safeGallery, { src: url, caption: 'New Image' }];
            onGalleryChange(newGallery);
            setActive(newGallery.length - 1);
          }}
          isLoading={isUploading}
        />
      )}
    </div>
  );
}

function VideoTab({ videoId, videoCaption }) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video bg-primary overflow-hidden">
        {!playing ? (
          <>
            <img src={thumbnail} alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button
                onClick={() => setPlaying(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-accent hover:bg-accent/90 text-white transition-all duration-300 hover:scale-105"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
              </button>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/70">Play Video</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-primary to-transparent">
              <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/60">{videoCaption}</span>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Property Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {!playing && (
        <div className="p-4 bg-secondary/50 border border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-accent/10 border border-accent/20">
              <Play className="w-3.5 h-3.5 text-accent" />
            </div>
            <div>
              <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed">{videoCaption}</p>
              <p className="font-sans text-[10px] text-muted-foreground/60 mt-1 tracking-wide">Produced by Sotheby's International Realty Media</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StructureModal({ structure, onClose, isAdmin = false, onStructureChange }) {
  const [tab, setTab] = useState('gallery');
  const [localStructure, setLocalStructure] = useState(structure);

  if (!structure) return null;

  const handleGalleryChange = (newGallery) => {
    setLocalStructure({ ...localStructure, gallery: newGallery });
    onStructureChange?.({ ...localStructure, gallery: newGallery });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full sm:max-w-4xl bg-card max-h-[96vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
         <div className="px-6 sm:px-8 pt-8 pb-5 border-b border-border">
          <div className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent font-medium mb-1">{localStructure.tagline}</div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-primary">{localStructure.name}</h3>
          <div className="flex flex-wrap items-center gap-5 mt-3 text-muted-foreground font-sans text-xs font-light">
            {localStructure.beds > 0 && (
              <span className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-accent" /> {localStructure.beds} Bedrooms</span>
            )}
            {localStructure.baths > 0 && (
              <span className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-accent" /> {localStructure.baths} Bathrooms</span>
            )}
            <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-accent" /> {localStructure.sqm} m²</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab('gallery')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase font-medium transition-colors border-b-2 ${
              tab === 'gallery'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            <Images className="w-3.5 h-3.5" />
            Photo Gallery
            <span className="text-[9px] opacity-60">({(localStructure.gallery || []).filter((item) => item?.src).length})</span>
          </button>
          <button
            onClick={() => setTab('video')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase font-medium transition-colors border-b-2 ${
              tab === 'video'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Video Tour
          </button>
        </div>

        {/* Tab content */}
        <div className="p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {tab === 'gallery' ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <GalleryTab gallery={localStructure.gallery || []} onGalleryChange={handleGalleryChange} isAdmin={isAdmin} />
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <VideoTab videoId={localStructure.videoId} videoCaption={localStructure.videoCaption} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-border">
           <p className="font-sans text-muted-foreground leading-relaxed text-sm font-light">{localStructure.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}