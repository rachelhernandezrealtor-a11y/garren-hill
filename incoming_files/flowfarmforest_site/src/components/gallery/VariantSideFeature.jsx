import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryImage from './GalleryImage';

const ease = [0.22, 0.1, 0.28, 1];

export default function VariantSideFeature({ images, onImageClick }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  if (!images.length) return null;
  const hero = images[0];
  const side = images.slice(1, 3);

  const wrap = (idx, children) => (
    <div onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
      {children}
    </div>
  );
  const isDimmed = (idx) => hoveredIdx !== null && hoveredIdx !== idx;

  return (
    <div>
      {/* Hero + supporting side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4">
        {/* Hero — taller, dominant */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease }}
          className="-ml-4 sm:-ml-8 md:-ml-12 lg:-ml-16"
        >
          {wrap(0,
            <GalleryImage
              image={hero}
              aspect="3 / 4"
              onClick={() => onImageClick(0)}
              className="rounded-none sm:rounded-r-sm"
              style={{ maxHeight: '72vh' }}
              dimmed={isDimmed(0)}
            />
          )}
        </motion.div>

        {/* Supporting — stacked vertically beside hero */}
        {side.length > 0 && (
          <div className="flex flex-col gap-2 sm:gap-3 justify-end">
            {side.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.1 }}
              >
                {wrap(i + 1,
                  <GalleryImage
                    image={img}
                    aspect={i === 0 ? '4 / 3' : '3 / 2'}
                    muted
                    onClick={() => onImageClick(i + 1)}
                    dimmed={isDimmed(i + 1)}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}