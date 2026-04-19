import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Home, ChevronDown } from 'lucide-react';
import { getImageAdjust } from './imageAdjust';

/**
 * RoomNavBridge — seamless, scroll-driven transition between rooms.
 * 
 * Architecture:
 * 1. Compact prev/next/home nav bar
 * 2. "Keep scrolling" hint that pulses
 * 3. Next room hero dissolves in via parallax as user scrolls
 * 4. Clicking anywhere on the hero navigates to the next room
 */
export default function RoomNavBridge({ currentRoom, nextRoom, prevRoom }) {
  const navigate = useNavigate();
  const bridgeRef = useRef(null);
  const hintRef = useRef(null);
  const hintInView = useInView(hintRef, { once: false, margin: '-20% 0px' });

  // Scroll tracking for the dissolve hero
  const { scrollYProgress } = useScroll({ target: bridgeRef, offset: ['start end', 'end start'] });

  // Image dissolves in early and stays
  const imgOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0.0, 0.35], [1.08, 1]);
  // Parallax rise — image shifts up slightly as you scroll
  const imgY = useTransform(scrollYProgress, [0.05, 0.6], ['3%', '0%']);
  // Bloom flash during dissolve
  const bloomOpacity = useTransform(scrollYProgress, [0.05, 0.12, 0.25], [0, 0.25, 0]);
  // Text appears after image settles
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [20, 0]);
  // Top gradient fades out as image fully appears
  const topFadeOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);

  const goTo = (slug) => {
    navigate('/room/' + slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div style={{ background: '#F6F4EF' }}>

      {/* ── Compact navigation bar ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8" style={{ paddingTop: 'clamp(12px, 2vh, 24px)', paddingBottom: 0 }}>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => { navigate('/Home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            className="flex items-center gap-2 font-sans uppercase transition-all hover:opacity-60"
            style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.2em', color: '#9A8C7A', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Home className="w-3 h-3" />
            <span className="hidden sm:inline">Estate</span>
          </button>
          <div className="flex-1 h-px mx-4" style={{ background: 'rgba(154,140,122,0.12)' }} />
          <div className="flex items-center gap-4">
            {prevRoom && (
              <button
                onClick={() => goTo(prevRoom.slug)}
                className="flex items-center gap-1.5 font-sans uppercase transition-all hover:opacity-60"
                style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.2em', color: '#9A8C7A', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hidden sm:inline">{prevRoom.title}</span>
                <span className="sm:hidden">Prev</span>
              </button>
            )}
            {nextRoom && (
              <button
                onClick={() => goTo(nextRoom.slug)}
                className="flex items-center gap-1.5 font-sans uppercase transition-all hover:opacity-60"
                style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.2em', color: '#9A8C7A', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span className="hidden sm:inline">{nextRoom.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── "Keep scrolling" hint ── */}
      {nextRoom && (
        <div ref={hintRef} className="flex flex-col items-center" style={{ padding: 'clamp(24px, 4vh, 48px) 0 clamp(8px, 1vh, 16px)' }}>
          <motion.div
            animate={hintInView ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0 }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sans uppercase" style={{
              fontSize: '0.46rem', fontWeight: 400, letterSpacing: '0.45em', color: 'rgba(154,140,122,0.5)',
            }}>
              Keep scrolling
            </span>
            <motion.div
              animate={hintInView ? { y: [0, 5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(154,140,122,0.35)' }} />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ── Dissolve hero for next room ── */}
      {nextRoom && (
        <div
          ref={bridgeRef}
          className="relative overflow-hidden w-full cursor-pointer group"
          style={{ height: 'clamp(60vh, 70vh, 85vh)' }}
          onClick={() => goTo(nextRoom.slug)}
        >
          {/* Ivory base visible during dissolve */}
          <div className="absolute inset-0" style={{ background: '#F6F4EF' }} />

          {/* Next room hero — parallax rise + dissolve */}
          <motion.img
            src={nextRoom.heroImage}
            alt={nextRoom.heroAlt || nextRoom.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
            style={{
              opacity: imgOpacity,
              scale: imgScale,
              y: imgY,
              filter: getImageAdjust(nextRoom.heroImage),
              imageRendering: '-webkit-optimize-contrast',
              willChange: 'transform, opacity',
            }}
          />

          {/* Bloom flash during dissolve */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,248,238,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
              opacity: bloomOpacity,
            }}
          />

          {/* Top fade — blends gallery ivory into the image, fades as image solidifies */}
          <motion.div
            className="absolute top-0 left-0 right-0 pointer-events-none z-[2]"
            style={{
              height: '45%',
              background: 'linear-gradient(to bottom, #F6F4EF 0%, rgba(246,244,239,0.5) 50%, transparent 100%)',
              opacity: topFadeOpacity,
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]" style={{
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
          }} />

          {/* Cinematic vignette */}
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{
            boxShadow: 'inset 0 0 100px 30px rgba(0,0,0,0.06)',
          }} />

          {/* Text overlay — room label, title, continue prompt */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[4] flex flex-col items-center text-center"
            style={{ opacity: textOpacity, y: textY, padding: 'clamp(28px, 5vw, 56px)' }}
          >
            <span className="block font-sans uppercase" style={{
              fontSize: '0.46rem', fontWeight: 400, letterSpacing: '0.55em',
              color: 'rgba(255,255,255,0.6)', marginBottom: '10px',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}>
              {nextRoom.label}
            </span>
            <h2 className="font-display italic" style={{
              fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, lineHeight: 1.08,
              color: '#fff', letterSpacing: '0.015em', margin: 0,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}>
              {nextRoom.title}
            </h2>
            <div className="flex items-center gap-2 mt-4 font-sans uppercase group-hover:gap-3 transition-all duration-300" style={{
              fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.75)', textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              <span>Continue the tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── End of tour — no next room ── */}
      {!nextRoom && (
        <div className="flex flex-col items-center gap-5" style={{ padding: 'clamp(48px, 8vh, 96px) 24px' }}>
          <div className="w-12 h-px" style={{ background: 'rgba(154,140,122,0.2)' }} />
          <p className="font-sans text-center" style={{ fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(154,140,122,0.45)', margin: 0 }}>
            End of Tour
          </p>
          <button
            onClick={() => { navigate('/Home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            className="font-sans uppercase transition-all hover:opacity-60"
            style={{ fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.25em', color: '#9A8C7A', background: 'none', border: '1px solid rgba(154,140,122,0.25)', padding: '12px 32px', borderRadius: '3px', cursor: 'pointer' }}
          >
            Return to Estate Overview
          </button>
        </div>
      )}
    </div>
  );
}