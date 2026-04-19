import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence } from './ResidenceShared';
import PropertyLinkButton from './PropertyLinkButton';
import LINKS from './propertyLinks';

const ease = [0.22, 0.1, 0.28, 1];
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// Per floor plan:
// Recreation Room (31.3' × 17.4', 10.8' tray ceiling)
// Theater (20.4' × 17.3', 11.9' tray ceiling)
// Safe Room (7.4' × 6.3')
// Unfinished Storage (27.3' × 55.4', 8.9' ceiling)
// Conditioned Crawl Space (2,531 SF)
// Mechanical Core: Geothermal, Solar, Water Filtration, 600-amp service

const IMAGES = [
  // Mechanical & infrastructure
  { src: B+'e3e772f98_MechanicalRoom.jpg', caption: 'Commercial water filtration. The private well delivers up to 50 gpm.' },
  { src: B+'6b2985178_CrawlspaceHvac.jpg', caption: 'Five geothermal zones. Twenty wells at 300 feet. Lennox air purification throughout.' },
  { src: B+'7b98519f8_CrawlSpaceSolarBatteries.jpg', caption: '14.3 kW solar array feeds a Sunny Island battery backup.' },
  { src: B+'4167f4d9e_MechanicalRoom3.jpg', caption: '600-amp service. 189 individually addressable dimming circuits.' },
  { src: B+'3c4adc2bb_DoorSaferemoveitems.jpg', caption: 'Brown Safe vault door — commercial-grade secure storage.' },
];

export default function BasementFeature() {
  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <EditorialSequence images={IMAGES} />
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}
          className="text-center mx-auto" style={{ maxWidth: '540px', paddingBottom: 'clamp(24px, 4vh, 48px)' }}
        >
          <p className="font-serif italic" style={{ fontSize: 'clamp(0.92rem, 1.2vw, 1.1rem)', lineHeight: 1.6, fontWeight: 300, color: '#6B6B67', margin: 0 }}>
            The mechanical core houses the estate's most critical infrastructure — geothermal HVAC, solar battery backup, commercial water filtration, and a sealed crawl space spanning the full footprint.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3" style={{ padding: 'clamp(24px, 3vh, 36px) clamp(20px, 5vw, 56px)' }}>
          <PropertyLinkButton href={LINKS.electricalPlan} label="Electrical Plans" linkType="electricalPlan" variant="luxe" />
          <PropertyLinkButton href={LINKS.architectPlans} label="Architect Plans" linkType="architectPlans" variant="luxe" />
        </div>
      </div>
    </div>
  );
}