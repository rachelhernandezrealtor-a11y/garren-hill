import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalkTheLandModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl bg-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-accent" />
                <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent font-medium">
                  Immersive 3D Tour
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&"
              width="100%"
              height="650"
              style={{ border: 'none', display: 'block' }}
              allow="fullscreen; xr-spatial-tracking; vr"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}