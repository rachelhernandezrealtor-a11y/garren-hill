import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

/**
 * DualPhotoFade — two images stacked, crossfading on scroll.
 * Used as the closing moment of a gallery section to transition
 * between the last two photos in a cinematic dissolve.
 *
 * Props:
 *  - image1  { src, caption, alt?, adjust? }
 *  - image2  { src, caption, alt?, adjust? }
 *  - onClick (optional) click handler
 */
export default function DualPhotoFade({ image1, image2, onClick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Image 1 starts visible, fades out
  const img1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.75], [1, 1, 0]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.75], [1, 1.04]);

  // Image 2 starts hidden, fades in
  const img2Opacity = useTransform(scrollYProgress, [0.35, 0.65, 0.9], [0, 0.6, 1]);
  const img2Scale = useTransform(scrollYProgress, [0.35, 0.9], [1.04, 1]);

  // Bloom during crossfade
  const bloomOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.12, 0]);

  // Caption crossfade
  const caption1Opacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  const caption2Opacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.4, ease: [0.22, 0.1, 0.28, 1] }}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <div className="overflow-hidden rounded-xl relative" style={{ aspectRatio: '3/2', width: '100%' }}>
        {/* Base image for sizing — always rendered, invisible */}
        <img
          src={image1.src}
          alt=""
          className="w-full h-full object-cover invisible"
          style={{ display: 'block' }}
        />

        {/* Image 2 — underneath */}
        <motion.img
          src={image2.src}
          alt={image2.alt || image2.caption || ''}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: img2Opacity,
            scale: img2Scale,
            filter: image2.adjust || getImageAdjust(image2.src),
            willChange: 'transform, opacity',
          }}
          loading="lazy"
        />

        {/* Image 1 — on top, fades out */}
        <motion.img
          src={image1.src}
          alt={image1.alt || image1.caption || ''}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: img1Opacity,
            scale: img1Scale,
            filter: image1.adjust || getImageAdjust(image1.src),
            willChange: 'transform, opacity',
          }}
          loading="lazy"
        />

        {/* Bloom overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
            opacity: bloomOpacity,
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
          height: '40%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))',
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)',
        }} />
      </div>

      {/* Crossfading captions */}
      <div className="relative" style={{ minHeight: '24px', marginTop: '12px' }}>
        <motion.p
          className="font-sans text-center absolute inset-x-0"
          style={{
            fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)', fontWeight: 300,
            letterSpacing: '0.02em', lineHeight: 1.6,
            color: 'rgba(107,107,103,0.65)',
            opacity: caption1Opacity, margin: 0,
          }}
        >
          {image1.caption}
        </motion.p>
        <motion.p
          className="font-sans text-center absolute inset-x-0"
          style={{
            fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)', fontWeight: 300,
            letterSpacing: '0.02em', lineHeight: 1.6,
            color: 'rgba(107,107,103,0.65)',
            opacity: caption2Opacity, margin: 0,
          }}
        >
          {image2.caption}
        </motion.p>
      </div>
    </motion.div>
  );
}