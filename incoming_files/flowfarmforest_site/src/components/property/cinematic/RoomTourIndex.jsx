import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import ROOMS from './roomTourData';
import { getImageAdjust } from './imageAdjust';
import GalleryBridge from './GalleryBridge';

const ease = [0.22, 0.1, 0.28, 1];

function RoomCard({ room, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 1, delay: index * 0.06, ease }}
      onClick={() => onClick(room.slug)}
      className="group text-left relative overflow-hidden"
      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', borderRadius: '8px' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', borderRadius: '8px' }}>
        <img
          src={room.heroImage}
          alt={room.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.06]"
          style={{ filter: getImageAdjust(room.heroImage), display: 'block' }}
          loading="lazy"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.04) 70%, rgba(0,0,0,0.06) 100%)',
        }} />
        {/* Hover brightener */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
        }} />

        {/* Room number — top left */}
        <span className="absolute top-3 left-3 font-sans" style={{
          fontSize: '0.52rem', fontWeight: 400, letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.45)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Photo count — top right */}
        <span className="absolute top-3 right-3 font-sans flex items-center gap-1" style={{
          fontSize: '0.5rem', fontWeight: 400, letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.45)',
        }}>
          <Camera className="w-2.5 h-2.5" strokeWidth={1.5} />
          {room.images.length}
        </span>

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ zIndex: 2 }}>
          <span className="block font-sans uppercase" style={{
            fontSize: '0.44rem', fontWeight: 400, letterSpacing: '0.32em',
            color: 'rgba(255,255,255,0.5)', marginBottom: '4px',
          }}>
            {room.label}
          </span>
          <span className="block font-display" style={{
            fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', fontWeight: 400,
            color: '#fff', lineHeight: 1.15, letterSpacing: '0.01em',
          }}>
            {room.title}
          </span>
          {/* Hover arrow */}
          <div className="mt-2 flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span className="font-sans uppercase" style={{ fontSize: '0.48rem', fontWeight: 500, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>View Gallery</span>
            <ArrowRight className="w-3 h-3 text-white/60" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function RoomTourIndex() {
  const navigate = useNavigate();

  const goToRoom = (slug) => {
    navigate('/room/' + slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease }}
      data-nav-theme="light"
      className="w-full"
      style={{ background: '#F6F4EF' }}
    >
      <div className="max-w-6xl mx-auto" style={{ padding: 'clamp(64px, 10vh, 120px) clamp(20px, 5vw, 48px)' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.6, ease }}
          className="text-center mx-auto"
          style={{ maxWidth: '560px', marginBottom: 'clamp(20px, 3vh, 32px)' }}
        >
          <span className="block font-sans uppercase" style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.4em', color: '#A48A6A', marginBottom: '14px' }}>
            Walk the Residence
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 400, lineHeight: 1.06, color: '#1C1C1A', margin: '0 0 16px' }}>
            Explore Every Room
          </h2>
          <p className="font-sans" style={{ fontSize: 'clamp(0.84rem, 0.95vw, 0.95rem)', lineHeight: 1.8, fontWeight: 300, color: 'rgba(0,0,0,0.42)', margin: 0 }}>
            Each space has its own gallery. Walk through in order, or choose any room to begin.
          </p>
        </motion.div>

        {/* Begin the Tour — Virtual Tour + All Photos */}
         <motion.div
           initial={{ opacity: 0, y: 8 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, delay: 0.1, ease }}
           className="text-center flex flex-col sm:flex-row items-center justify-center gap-3"
           style={{ marginBottom: 'clamp(40px, 6vh, 64px)' }}
         >
           <a
             href="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&"
             target="_blank"
             rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans uppercase transition-all hover:gap-4 duration-300"
            style={{
              fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em',
              color: '#1C1C1A', background: 'transparent',
              border: '1px solid rgba(28,28,26,0.2)', borderRadius: '2px',
              padding: '13px 32px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center',
              textDecoration: 'none',
            }}
          >
           Virtual Tour
           <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <span style={{ color: 'rgba(0,0,0,0.2)' }}>•</span>
          <a
             href="/all-photos"
            className="inline-flex items-center gap-3 font-sans uppercase transition-all hover:gap-4 duration-300"
            style={{
              fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em',
              color: '#1C1C1A', background: 'transparent',
              border: '1px solid rgba(28,28,26,0.2)', borderRadius: '2px',
              padding: '13px 32px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center',
              textDecoration: 'none',
            }}
          >
           All Photos
           <ArrowRight className="w-3.5 h-3.5" />
          </a>
         </motion.div>

        {/* Room grid — portrait cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.slug} room={room} index={i} onClick={goToRoom} />
          ))}
        </div>

        {/* Summary divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
          className="mx-auto text-center"
          style={{ marginTop: 'clamp(40px, 6vh, 64px)', maxWidth: '400px' }}
        >
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(164,138,106,0.2), transparent)', marginBottom: '16px' }} />
          <p className="font-serif italic" style={{ fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', fontWeight: 300, lineHeight: 1.6, color: 'rgba(0,0,0,0.25)', margin: 0 }}>
            {ROOMS.length} rooms &middot; {ROOMS.reduce((sum, r) => sum + r.images.length, 0)} photographs
          </p>
        </motion.div>

        {/* Gallery bridge */}
        <GalleryBridge text="Discover what's beyond the residence." />
      </div>
    </motion.section>
  );
}