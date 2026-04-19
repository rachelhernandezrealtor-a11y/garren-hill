import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackInteractionEvent } from '@/lib/trackInteractionEvent';

export default function ImageLightbox({ isOpen, images, currentIndex, onClose, onNext, onPrev }) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen || !currentImage) return;
    trackInteractionEvent('gallery_lightbox_viewed', {
      image_alt: currentImage.alt || null,
      position: currentIndex + 1,
      total_images: images.length,
    });
  }, [isOpen, currentImage, currentIndex, images.length]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.2 }}
             onClick={() => {
               trackInteractionEvent('gallery_lightbox_closed', {
                 image_alt: currentImage?.alt || null,
                 position: currentIndex + 1,
               });
               onClose();
             }}
             className="fixed inset-0 bg-black/85 backdrop-blur z-50"
           />

           {/* Modal Container */}
           <motion.div
             initial={{ opacity: 0, scale: 0.97 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.97 }}
             transition={{ duration: 0.25 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
           >
             <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col">
               {/* Image */}
               <div className="relative overflow-hidden flex-1 flex items-center justify-center">
                 <img
                   src={currentImage.src}
                   alt={currentImage.alt}
                   className="max-w-full max-h-full object-contain"
                 />
               </div>

               {/* Alt text */}
               {currentImage.alt && (
                 <motion.p
                   initial={{ opacity: 0, y: 8 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.15 }}
                   className="text-white/60 text-xs text-center mt-3 font-light tracking-wide"
                 >
                   {currentImage.alt}
                 </motion.p>
               )}

               {/* Close Button */}
               <motion.button
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                 onClick={() => {
                   trackInteractionEvent('gallery_lightbox_closed', {
                     image_alt: currentImage?.alt || null,
                     position: currentIndex + 1,
                   });
                   onClose();
                 }}
                 className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white p-1.5 transition-all duration-200"
               >
                 <X className="w-4 h-4" />
               </motion.button>

               {/* Navigation Buttons */}
               {images.length > 1 && (
                 <>
                   <motion.button
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                     onClick={onPrev}
                     className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white p-1.5 transition-all duration-200"
                   >
                     <ChevronLeft className="w-4 h-4" />
                   </motion.button>

                   <motion.button
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                     onClick={onNext}
                     className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white p-1.5 transition-all duration-200"
                   >
                     <ChevronRight className="w-4 h-4" />
                   </motion.button>

                   {/* Counter */}
                   <motion.p
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.15 }}
                     className="text-white/50 text-xs text-center mt-2 font-light"
                   >
                     {currentIndex + 1} / {images.length}
                   </motion.p>
                 </>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}