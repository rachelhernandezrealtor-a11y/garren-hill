import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryCursor({ visible, x, y, label = 'View' }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.86 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed z-[90] hidden lg:block"
          style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-[rgba(20,18,14,0.72)] backdrop-blur-xl">
            <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/88">
              {label}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}