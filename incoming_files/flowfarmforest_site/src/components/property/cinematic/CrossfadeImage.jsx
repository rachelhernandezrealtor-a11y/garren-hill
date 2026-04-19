import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';
import { buildSrcSet } from '@/lib/cdnImage';
import { SIZES_DEFAULT } from '@/lib/imageSizes';

// Local fallback for formatted srcset (avoids build errors if library export missing)
const buildFormatSrcSetLocal = (url, format, widths = [480, 768, 1024, 1280, 1600, 2048], q = 70) => {
  if (!url) return undefined;
  const join = (u, params) => {
    const qstr = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    return u.includes('?') ? `${u}&${qstr}` : `${u}?${qstr}`;
  };
  return widths.map((w) => `${join(url, { w, q, format })} ${w}w`).join(', ');
};

/**
 * CrossfadeImage — single image with scroll-triggered fade and scale
 */
export default function CrossfadeImage({ image, aspect = '3/2', priority = false, onClick }) {
  const ref = useRef(null);
  const pointerDownRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 80%'] });

  const currentOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const currentScale = useTransform(scrollYProgress, [0.1, 0.7], [1.04, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: [0.22, 0.1, 0.28, 1] }}
      onPointerDown={(e) => { pointerDownRef.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={(e) => {
        if (!onClick) return;
        const dx = Math.abs(e.clientX - pointerDownRef.current.x);
        const dy = Math.abs(e.clientY - pointerDownRef.current.y);
        if (dx < 8 && dy < 8) onClick();
      }}
      className="group"
      style={{ cursor: onClick ? 'pointer' : undefined, contentVisibility: 'auto', containIntrinsicSize: '800px 600px' }}
    >
      <div className="overflow-hidden rounded-lg relative" style={{ aspectRatio: aspect }}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) saturate(1.05) brightness(1.1)', transform: 'scale(1.08)' }} />
        <picture>
          <source type="image/avif" srcSet={buildFormatSrcSetLocal(image.src, 'avif')} sizes={SIZES_DEFAULT} />
          <source type="image/webp" srcSet={buildFormatSrcSetLocal(image.src, 'webp')} sizes={SIZES_DEFAULT} />
          <motion.img
            src={image.src}
            alt={image.alt || image.caption || ''}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              filter: image.adjust || getImageAdjust(image.src),
              opacity: currentOpacity,
              scale: currentScale,
              willChange: 'transform, opacity',
            }}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
            srcSet={buildSrcSet(image.src)}
            sizes={SIZES_DEFAULT}
          />
        </picture>
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.1) 100%)',
        }} />
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[2]" style={{
          height: '45%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
        }} />
      </div>
      {image.caption && (
        <p className="font-sans text-center mt-3" style={{
          fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 300,
          letterSpacing: '0.02em', lineHeight: 1.55,
          color: 'rgba(107,107,103,0.6)',
        }}>
          {image.caption}
        </p>
      )}
    </motion.div>
  );
}