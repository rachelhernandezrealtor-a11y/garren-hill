import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/property/Navbar';
import CinematicChaptersHome from '@/components/property/cinematic/CinematicChaptersHome';
import FullBleedAutoSequence from '@/components/property/cinematic/FullBleedAutoSequence';
import StoryBridgeHero from '@/components/property/cinematic/StoryBridgeHero';
import FullPropertyVideoSection from '@/components/property/cinematic/FullPropertyVideoSection';


export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div ref={pageRef} className="cinematic-scroll" style={{ width: '100%', position: 'relative', background: '#000' }}>
      <Navbar />
      <StoryBridgeHero />
      <FullPropertyVideoSection />
      <CinematicChaptersHome />
    </div>
  );
}