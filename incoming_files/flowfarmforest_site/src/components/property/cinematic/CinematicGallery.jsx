import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getImageAdjust } from './imageAdjust';
import CrossfadeImage from './CrossfadeImage';
import { buildSrcSet, buildFormatSrcSet } from '@/lib/cdnImage';
import { SIZES_DEFAULT } from '@/lib/imageSizes';
import GalleryCursor from './GalleryCursor';
import { trackInteractionEvent } from '@/lib/trackInteractionEvent';
import DepthOnScroll from '@/components/effects/DepthOnScroll';

const ease = [0.22, 0.1, 0.28, 1];

function BlockVisibility({ children }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { margin: '200px 0px 400px 0px', once: false });
  return (
    <div ref={ref} style={{ contentVisibility: 'auto', containIntrinsicSize: '700px 450px' }}>
      {inView ? children : <div style={{ width: '100%', height: '100%' }} />}
    </div>
  );
}

/* ─── Single cinematic image with parallax ─── */
function GalleryImage({ image, aspect = '3/2', priority = false, onClick, galleryIndex }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 1], [1.06, 1.01, 1]);
  const pointerDownRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease }}
      onPointerDown={(e) => { pointerDownRef.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={(e) => {
        if (!onClick) return;
        const dx = Math.abs(e.clientX - pointerDownRef.current.x);
        const dy = Math.abs(e.clientY - pointerDownRef.current.y);
        if (dx < 8 && dy < 8) onClick();
      }}
      className="group"
      data-gallery-index={galleryIndex}
      style={{ cursor: onClick ? 'pointer' : undefined, contentVisibility: 'auto', containIntrinsicSize: '800px 600px' }}
    >
      <div className="overflow-hidden rounded-lg relative" style={{ aspectRatio: aspect }}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) saturate(1.05) brightness(1.1)', transform: 'scale(1.08)' }} />
        <picture>
          <source type="image/avif" srcSet={buildFormatSrcSet(image.src, 'avif')} sizes={SIZES_DEFAULT} />
          <source type="image/webp" srcSet={buildFormatSrcSet(image.src, 'webp')} sizes={SIZES_DEFAULT} />
          <motion.img
            src={image.src}
            alt={image.alt || image.caption || ''}
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              filter: image.adjust || getImageAdjust(image.src),
              y: imgY,
              scale: imgScale,
              willChange: 'transform',
            }}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
            srcSet={buildSrcSet(image.src)}
            sizes={SIZES_DEFAULT}
          />
        </picture>
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.1) 100%)',
        }} />
        {/* Bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
          height: '45%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
        }} />
        {/* Glass caption overlay */}
        {image.caption && (
          <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-4 max-w-[72%] pointer-events-none">
            <DepthOnScroll intensity={0.7} hoverLift={false} className="glass-bold glass-caption">
              <p className="m-0 font-sans text-[0.72rem] sm:text-[0.78rem] leading-[1.5] tracking-wide">{image.caption}</p>
            </DepthOnScroll>
          </div>
        )}
      </div>

    </motion.div>
  );
}

/* ─── Editorial text moment ─── */
function EditorialMoment({ description, details }) {
  if (!description && (!details || details.length === 0)) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.6, ease }}
      className="mx-auto"
      style={{ maxWidth: '820px', padding: '0' }}
    >
      <div className="px-5 sm:px-7 md:px-10 py-5 sm:py-6 md:py-8 glass-bold glass-card">
        {description && (
          <p className="font-serif italic text-center" style={{
            fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)', lineHeight: 1.8,
            fontWeight: 300, color: 'rgba(255,255,255,0.9)', margin: '0 0 16px'
          }}>
            {description}
          </p>
        )}
        {details && details.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {details.map((d, i) => (
              <span key={i} className="font-sans glass-chip">
                {d.label}{d.value ? `: ${d.value}` : ''}{d.note ? ` — ${d.note}` : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Layout blocks ─── */

/* Full-width hero image */
function HeroBlock({ image, prevImage, onClick, galleryIndex }) {
  const Comp = prevImage ? CrossfadeImage : GalleryImage;
  return (
    <div className="col-span-full" data-gallery-index={galleryIndex}>
      <Comp image={image} prevImage={prevImage} aspect="16/9" priority onClick={onClick} galleryIndex={galleryIndex} />
    </div>
  );
}

/* Side-by-side pair */
function PairBlock({ left, right, prevImage, onClickLeft, onClickRight, galleryIndexLeft, galleryIndexRight }) {
  return (
    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'clamp(12px, 2vw, 20px)' }}>
      <div data-gallery-index={galleryIndexLeft}>
        <CrossfadeImage image={left} prevImage={prevImage} aspect="4/5" onClick={onClickLeft} />
      </div>
      <div data-gallery-index={galleryIndexRight}>
        <CrossfadeImage image={right} prevImage={left} aspect="4/5" onClick={onClickRight} />
      </div>
    </div>
  );
}

/* Asymmetric feature — one large, one small stacked */
function FeatureBlock({ large, small, prevImage, onClickLarge, onClickSmall, reversed = false, galleryIndexLarge, galleryIndexSmall }) {
  const largeEl = <div data-gallery-index={galleryIndexLarge}><CrossfadeImage image={large} prevImage={prevImage} aspect="3/4" onClick={onClickLarge} /></div>;
  const smallEl = (
    <div className="flex flex-col justify-center" style={{ gap: 'clamp(12px, 2vw, 20px)' }}>
      <div data-gallery-index={galleryIndexSmall}><CrossfadeImage image={small} prevImage={large} aspect="4/3" onClick={onClickSmall} /></div>
    </div>
  );

  return (
    <div className="col-span-full grid grid-cols-1 md:grid-cols-5" style={{ gap: 'clamp(12px, 2vw, 20px)' }}>
      <div className={reversed ? 'md:col-span-2 md:order-1' : 'md:col-span-3'}>{reversed ? smallEl : largeEl}</div>
      <div className={reversed ? 'md:col-span-3 md:order-2' : 'md:col-span-2'}>{reversed ? largeEl : smallEl}</div>
    </div>
  );
}

/* Wide single image */
function WideBlock({ image, prevImage, onClick, galleryIndex }) {
  const Comp = prevImage ? CrossfadeImage : GalleryImage;
  return (
    <div className="col-span-full" data-gallery-index={galleryIndex}>
      <Comp image={image} prevImage={prevImage} aspect="21/9" onClick={onClick} galleryIndex={galleryIndex} />
    </div>
  );
}

/* ─── Editorial breath at end of gallery ─── */
function GalleryTail({ roomTitle, imageCount }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.6, ease: [0.22, 0.1, 0.28, 1] }}
      className="flex flex-col items-center text-center"
      style={{ padding: 'clamp(48px, 8vh, 96px) 24px clamp(24px, 4vh, 48px)' }}
    >
      <div className="w-12 h-px mb-6" style={{ background: 'rgba(154,140,122,0.25)' }} />
      {roomTitle && (
        <p className="font-sans uppercase" style={{
          fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.4em',
          color: 'rgba(154,140,122,0.45)', margin: '0 0 6px',
        }}>
          {roomTitle}
        </p>
      )}
      {imageCount > 0 && (
        <p className="font-sans" style={{
          fontSize: '0.56rem', fontWeight: 300, letterSpacing: '0.08em',
          color: 'rgba(154,140,122,0.35)', margin: 0,
        }}>
          {imageCount} photograph{imageCount !== 1 ? 's' : ''}
        </p>
      )}
    </motion.div>
  );
}

/**
 * CinematicGallery — builds a magazine-style editorial layout
 * from an array of images. Automatically selects composition
 * based on image count and position in the sequence.
 */
export default function CinematicGallery({ images, onImageClick, description, details, roomTitle }) {
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
  if (!images || images.length === 0) return null;

  const click = (i) => () => {
    trackInteractionEvent('gallery_image_open', {
      position: i,
      total_images: images.length,
      group: roomTitle || '',
      image_alt: images[i]?.alt || '',
      image_caption: images[i]?.caption || ''
    });
    if (onImageClick) onImageClick(i);
  };

  // Build layout blocks from images
  const blocks = [];
  let idx = 0;
  let blockIndex = 0;
  let editorialInserted = false;

  while (idx < images.length) {
    const remaining = images.length - idx;

    // First image: always a hero — no crossfade on the first
    if (idx === 0) {
      blocks.push(
  <BlockVisibility key={`vb${blockIndex}`}>
    <HeroBlock key={`b${blockIndex}`} image={images[0]} onClick={click(0)} galleryIndex={0} />
  </BlockVisibility>
);
      idx += 1;
      blockIndex++;

      // Insert editorial after hero
      if (description || (details && details.length > 0)) {
        blocks.push(
          <BlockVisibility key="editorial-vb">
            <div className="col-span-full">
              <EditorialMoment description={description} details={details} />
            </div>
          </BlockVisibility>
        );
        editorialInserted = true;
      }
      continue;
    }

    // Previous image for crossfade (the image just before current idx)
    const prevImg = idx > 0 ? images[idx - 1] : null;

    // Pair — need 2+ remaining, and we rotate compositions
    if (remaining >= 2 && blockIndex % 3 === 1) {
      blocks.push(
        <BlockVisibility key={`vb${blockIndex}`}>
          <PairBlock
            key={`b${blockIndex}`}
            left={images[idx]}
            right={images[idx + 1]}
            prevImage={prevImg}
            onClickLeft={click(idx)}
            onClickRight={click(idx + 1)}
            galleryIndexLeft={idx}
            galleryIndexRight={idx + 1}
          />
        </BlockVisibility>
      );
      idx += 2;
      blockIndex++;
      continue;
    }

    // Feature asymmetric — need 2+ remaining
    if (remaining >= 2 && blockIndex % 3 === 2) {
      const reversed = blockIndex % 2 === 0;
      blocks.push(
        <BlockVisibility key={`vb${blockIndex}`}>
          <FeatureBlock
            key={`b${blockIndex}`}
            large={images[idx]}
            small={images[idx + 1]}
            prevImage={prevImg}
            onClickLarge={click(idx)}
            onClickSmall={click(idx + 1)}
            reversed={reversed}
            galleryIndexLarge={idx}
            galleryIndexSmall={idx + 1}
          />
        </BlockVisibility>
      );
      idx += 2;
      blockIndex++;
      continue;
    }

    // Single full-width — default for remaining singles
    blocks.push(
      <BlockVisibility key={`vb${blockIndex}`}>
        <div key={`b${blockIndex}`} className="col-span-full" data-gallery-index={idx}>
          <CrossfadeImage image={images[idx]} prevImage={prevImg} aspect="3/2" onClick={click(idx)} />
        </div>
      </BlockVisibility>
    );
    idx += 1;
    blockIndex++;
  }

  // If no editorial was inserted (no description/details), that's fine
  if (!editorialInserted && (description || (details && details.length > 0))) {
    blocks.splice(1, 0,
      <BlockVisibility key="editorial-vb-2">
        <div className="col-span-full">
          <EditorialMoment description={description} details={details} />
        </div>
      </BlockVisibility>
    );
  }

  return (
    <div
      style={{ paddingTop: 'clamp(8px, 1vh, 16px)', paddingBottom: 0 }}
      onMouseMove={(e) => setCursor({ visible: true, x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setCursor((prev) => ({ ...prev, visible: false }))}
    >
      <GalleryCursor visible={!!onImageClick && cursor.visible} x={cursor.x} y={cursor.y} label="Open" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col" style={{ gap: 'clamp(28px, 4vh, 48px)' }}>
        {blocks}
      </div>
      {/* Editorial breath — quiet moment before the next room */}
      <GalleryTail roomTitle={roomTitle} imageCount={images.length} />
    </div>
  );
}