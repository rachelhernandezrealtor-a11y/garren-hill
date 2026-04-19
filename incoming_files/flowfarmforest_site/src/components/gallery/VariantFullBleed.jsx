import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryImage from './GalleryImage';

const ease = [0.22, 0.1, 0.28, 1];

export default function VariantFullBleed({ images, onImageClick }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  if (!images.length) return null;
  const hero = images[0];
  const rest = images.slice(1);

  const wrap = (idx, children) => (
    <div onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
      {children}
    </div>
  );
  const isDimmed = (idx) => hoveredIdx !== null && hoveredIdx !== idx;

  return (
    <div>
      {/* Full-bleed hero */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, ease }}
        style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}
      >
        {wrap(0,
          <GalleryImage
            image={hero}
            aspect="2.5 / 1"
            onClick={() => onImageClick(0)}
            className="rounded-none"
            dimmed={isDimmed(0)}
          />
        )}
      </motion.div>

      {/* Supporting — tight beneath hero, centered */}
      {rest.length > 0 && (
        <div
          className="mt-2 sm:mt-3 mx-auto grid gap-3 sm:gap-4"
          style={{
            gridTemplateColumns: rest.length === 1 ? '1fr' : '1.3fr 0.7fr',
            maxWidth: '70%',
          }}
        >
          {rest.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.08 }}
              className={i === 1 ? 'pt-2' : ''}
            >
              {wrap(i + 1,
                <GalleryImage
                  image={img}
                  aspect={i === 0 ? '16 / 10' : '4 / 3'}
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
  );
}