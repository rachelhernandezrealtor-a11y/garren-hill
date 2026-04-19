import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryImage from './GalleryImage';

const ease = [0.22, 0.1, 0.28, 1];

export default function VariantHeroStack({ images, onImageClick }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  if (!images.length) return null;
  const hero = images[0];
  const grid = images.slice(1);

  const wrap = (idx, children) => (
    <div onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
      {children}
    </div>
  );
  const isDimmed = (idx) => hoveredIdx !== null && hoveredIdx !== idx;

  return (
    <div>
      {/* Hero — full-bleed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease }}
        style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}
      >
        {wrap(0,
          <GalleryImage
            image={hero}
            aspect="2.35 / 1"
            onClick={() => onImageClick(0)}
            className="rounded-none"
            dimmed={isDimmed(0)}
          />
        )}
      </motion.div>

      {/* Supporting — directly beneath hero, tight gap */}
      {grid.length > 0 && (
        <div className="mt-2 sm:mt-3">
          {grid.length === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              style={{ maxWidth: '55%' }}
            >
              {wrap(1, <GalleryImage image={grid[0]} aspect="3 / 2" muted onClick={() => onImageClick(1)} dimmed={isDimmed(1)} />)}
            </motion.div>
          ) : (
            <div className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: '1.4fr 1fr', maxWidth: '85%' }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
              >
                {wrap(1, <GalleryImage image={grid[0]} aspect="4 / 3" muted onClick={() => onImageClick(1)} dimmed={isDimmed(1)} />)}
              </motion.div>
              <div className="flex flex-col gap-2 sm:gap-3 pt-2">
                {grid.slice(1).map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.08 }}
                  >
                    {wrap(i + 2, <GalleryImage image={img} aspect="3 / 2" muted onClick={() => onImageClick(i + 2)} dimmed={isDimmed(i + 2)} />)}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}