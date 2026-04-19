import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/property/Navbar';
import GALLERY_DATA from '../components/property/cinematic/galleryData';
import WALKTHROUGH_SECTIONS from '../components/property/cinematic/gallerySequence';
import TourSection from '../components/property/cinematic/TourSection';
import TourTransition from '../components/property/cinematic/TourTransition';
import Footer from '../components/property/Footer';
import GalleryAmbientAccent from '../components/property/cinematic/GalleryAmbientAccent';
import FullBleedAutoSequence from '@/components/property/cinematic/FullBleedAutoSequence';

const ease = [0.22, 0.1, 0.28, 1];

/* Transitional phrases between major zones */
const ZONE_TRANSITIONS = {
  'powder-room': null,
  'living-room': 'Step through, and the house opens.',
  'dining-room': null,
  'kitchen': null,
  'scullery': null,
  'kitchen-hallway': null,
  'conservatory': 'Where glass meets sky.',
  'screened-porch': null,
  'primary-suite': 'The private wing begins here.',
  'family-wing': 'Down the corridor, a quieter world.',
  'mudroom': 'Where the working day meets the house.',
  'garage': null,
  'executive-office': 'Upstairs — the second floor.',
  'think-tank': null,
  'guest-suite': null,
  'guest-apartment': 'Above the mudroom, a separate life.',
  'corridors': null,
  'cabana': 'Beyond the main residence.',
  'estate': 'The land itself.',
};

export default function PhotoGallery() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = useMemo(() => {
    return WALKTHROUGH_SECTIONS
      .map(section => ({
        ...section,
        photos: GALLERY_DATA.filter(section.filter),
      }))
      .filter(s => s.photos.length > 0);
  }, []);

  const totalPhotos = sections.reduce((sum, s) => sum + s.photos.length, 0);

  return (
    <div className="cinematic-scroll min-h-screen bg-black text-white" style={{ overflowX: 'hidden' }}>
      <Navbar />

      {/* Hero header — sets the tone */}
      <div className="relative pt-[clamp(120px,16vh,200px)] pb-[clamp(36px,5vh,64px)] px-6 overflow-hidden">
        <GalleryAmbientAccent />
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease }} className="border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-8 sm:px-10 sm:py-12 shadow-[0_28px_90px_rgba(0,0,0,0.4)]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-white/60 no-underline hover:text-white transition-colors mb-8 block"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Estate
            </Link>

            <span className="block font-sans text-[0.58rem] font-semibold tracking-[0.4em] uppercase text-white/40 mb-4">
              Guided Gallery
            </span>
            <h1 className="font-display text-[clamp(2.6rem,5vw,4rem)] font-normal leading-[1.02] text-white tracking-tight mb-5">
              Estate at a Glance
            </h1>
            <p className="font-sans text-[0.9rem] font-light text-white/70 leading-[1.95] max-w-xl m-0 mb-4">
              A quieter way to move through the property — room by room, structure by structure, landscape by landscape.
            </p>
            <div className="mb-5 h-px w-14 bg-white/10" />
            <p className="font-sans text-[0.68rem] font-medium tracking-[0.18em] uppercase text-white/40 m-0">
              107 Linden Trail &middot; {totalPhotos} photographs &middot; {sections.length} spaces
            </p>
          </motion.div>
        </div>
      </div>

      {/* Walkthrough body */}
      <FullBleedAutoSequence max={8} className="mb-10" useAIQuotes />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-24 md:pb-28 relative">
        {sections.map((section, i) => (
          <div key={section.key} id={`section-${section.key}`}>
            {/* Transition text between zones */}
            {i > 0 && (
              <TourTransition text={ZONE_TRANSITIONS[section.key] || null} />
            )}
            <TourSection
              heading={section.heading}
              description={section.description}
              photos={section.photos}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
        className="text-center pb-24 px-6"
      >
        <div className="w-12 h-px mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)' }} />
        <p className="font-display italic text-[clamp(1.1rem,2vw,1.5rem)] font-light text-white/35 mb-5">
          Fifteen acres. One vision.
        </p>
        <Link
          to="/Home"
          className="font-sans text-[0.58rem] font-medium tracking-[0.35em] uppercase text-white/40 no-underline border-b border-white/20 pb-1 hover:text-white/60 transition-colors"
        >
          Return to Estate
        </Link>
      </motion.div>

      <Footer />

      {/* Sticky back button */}
      <Link
        to="/"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex items-center gap-2 font-sans text-[0.62rem] sm:text-[0.65rem] font-semibold tracking-[0.2em] uppercase bg-[#111] text-white/80 no-underline hover:text-white hover:bg-white/10 transition-all px-3.5 sm:px-4 py-2.5 rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/10"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Estate
      </Link>
    </div>
  );
}