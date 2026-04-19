import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/property/Navbar';

import LocationContext from '@/components/property/location/LocationContext';
import LocationAdvantages from '@/components/property/location/LocationAdvantages';
import LocationClosing from '@/components/property/location/LocationClosing';
import Footer from '@/components/property/Footer';
import LocationAmbientAccent from '@/components/property/location/LocationAmbientAccent';
import FullBleedAutoSequence from '@/components/property/cinematic/FullBleedAutoSequence';

export default function Location() {
  return (
    <div className="cinematic-scroll relative" style={{ width: '100%', position: 'relative', overflowX: 'hidden', overflowY: 'visible', background: '#000' }}>
      <LocationAmbientAccent />
      <Navbar />
      <LocationContext />
      {/* Cohesive full‑bleed runway from photo archive */}
      <FullBleedAutoSequence max={6} useAIQuotes />
      <LocationAdvantages />
      <LocationClosing />
      <Footer />
    </div>
  );
}