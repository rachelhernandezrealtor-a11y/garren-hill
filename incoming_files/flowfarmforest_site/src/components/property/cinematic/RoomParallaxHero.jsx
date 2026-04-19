import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getImageAdjust } from './imageAdjust';

/**
 * RoomParallaxHero — Immersive depth-layered parallax.
 * Up to 3 room images are stacked and move at different speeds on scroll,
 * creating the sensation of walking through the space.
 *
 * Back layer  : moves slowest  (farthest away)
 * Mid layer   : moves at medium speed
 * Front layer : moves fastest (closest / foreground)
 */
export default function RoomParallaxHero({ images, label, title, whisper }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Back layer — slowest parallax, slight zoom in
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const backScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Mid layer — begins fading in early so crossfade is visible quickly
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const midScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const midOpacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.5, 0.85, 1], [0, 0.15, 0.6, 0.8, 0.85, 0.4]);

  // Front layer — fades in a little earlier for smoother layering
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const frontScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const frontOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.75, 1], [0, 0, 0.3, 0.5, 0.45, 0]);

  // Text — floats gently
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '60px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  // Darkening overlay as you scroll deeper
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0.3]);

  const isInView = useInView(ref, { once: true });

  const layers = images.slice(0, 3);
  const hasThree = layers.length >= 3;
  const hasTwo = layers.length >= 2;

  // Fade-to-ivory at bottom of hero — smooth reveal into gallery
  const revealOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section ref={ref} className="relative w-full" style={{ height: '140vh' }}>
      {/* Fixed viewport container */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* Ivory base */}
        <div className="absolute inset-0" style={{ background: 'hsl(42 22% 95%)' }} />

        {/* BACK LAYER — full-bleed, slowest, with entrance animation */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.22, 0.1, 0.28, 1] }}
          style={{ y: backY, scale: backScale, willChange: 'transform' }}
        >
          <img
            src={layers[0]?.src || layers[0]}
            alt={layers[0]?.caption || title}
            className="w-full h-full object-cover"
            style={{ filter: getImageAdjust(layers[0]?.src || layers[0]) }}
          />
        </motion.div>

        {/* MID LAYER — offset and cropped, medium speed */}
        {hasTwo && (
          <motion.div
            className="absolute inset-0"
            style={{
              y: midY,
              scale: midScale,
              opacity: midOpacity,
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="absolute"
              style={{
                top: '8%', left: '5%', right: '5%', bottom: '8%',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={layers[1]?.src || layers[1]}
                alt={layers[1]?.caption || ''}
                className="w-full h-full object-cover"
                style={{ filter: getImageAdjust(layers[1]?.src || layers[1]) }}
              />
            </div>
          </motion.div>
        )}

        {/* FRONT LAYER — small inset, fastest drift */}
        {hasThree && (
          <motion.div
            className="absolute inset-0"
            style={{
              y: frontY,
              scale: frontScale,
              opacity: frontOpacity,
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="absolute"
              style={{
                top: '20%', left: '15%', right: '15%', bottom: '20%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
              }}
            >
              <img
                src={layers[2]?.src || layers[2]}
                alt={layers[2]?.caption || ''}
                className="w-full h-full object-cover"
                style={{ filter: getImageAdjust(layers[2]?.src || layers[2]) }}
              />
            </div>
          </motion.div>
        )}

        {/* Scroll-darkening overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{ background: '#000', opacity: overlayOpacity }}
        />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.15)',
        }} />

        {/* Bottom gradient for text */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[3]" style={{
          height: '55%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)',
        }} />

        {/* Text overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[5] flex flex-col items-center text-center"
          style={{
            y: textY,
            opacity: textOpacity,
            padding: 'clamp(32px, 6vw, 64px)',
            paddingBottom: 'clamp(56px, 8vw, 88px)',
          }}
        >
          {label && (
            <span className="block font-sans uppercase" style={{
              fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.5em',
              color: 'rgba(255,255,255,0.7)', marginBottom: '12px',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}>
              {label}
            </span>
          )}

          <h2 className="font-display italic" style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400,
            lineHeight: 1.08, color: '#fff', letterSpacing: '0.015em',
            margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            {title}
          </h2>

          {whisper && (
            <p className="font-serif italic mx-auto" style={{
              fontSize: 'clamp(0.82rem, 1.1vw, 1rem)', lineHeight: 1.6,
              fontWeight: 300, color: 'rgba(255,255,255,0.8)',
              maxWidth: '440px', marginTop: 'clamp(10px, 1.5vh, 18px)',
              marginBottom: 0, textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              {whisper}
            </p>
          )}
        </motion.div>

        {/* Scroll hint — gentle bouncing chevron */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[6] flex justify-center"
          style={{ opacity: textOpacity, paddingBottom: 'clamp(16px, 3vh, 28px)' }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-sans uppercase" style={{
              fontSize: '0.45rem', fontWeight: 400, letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.45)',
            }}>
              Scroll
            </span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ opacity: 0.5 }}>
              <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Fade-to-ivory overlay — smooth reveal into gallery */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[7]"
          style={{
            background: 'hsl(42 22% 95%)',
            opacity: revealOpacity,
          }}
        />
      </div>
    </section>
  );
}