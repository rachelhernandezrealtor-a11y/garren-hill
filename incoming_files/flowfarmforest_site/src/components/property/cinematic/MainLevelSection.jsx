import React from 'react';
import { motion } from 'framer-motion';
import { EditorialSequence, MudroomGuestSuiteGallery } from './ResidenceShared';
import CinematicBridge from './CinematicBridge';
import KitchenFeature from './KitchenFeature';
import ConservatoryFeature from './ConservatoryFeature';
import SculleryFeature from './SculleryFeature';
import FamilyWingFeature from './FamilyWingFeature';
import PrimarySuiteFeature from './PrimarySuiteFeature';


import DiningLivingFeature from './DiningLivingFeature';

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// ── EXTERIOR (unique photos not in ResidenceGalleryScroll or ResidenceEntrance) ──
const EXTERIOR_SEQUENCE = [
  { src: B+'bc9f57d35_107LindenTrailGrass-81.jpg', caption: 'Rear compound and fire pit' },
  { src: B+'d0aa34c28_107LindenTrailGrass-63.jpg', caption: '3-car garage — brick apron, 23.5\' × 35.5\'' },
];

// ── FOYER (9.4' × 12.9', 8.3' ceiling) ──
const FOYER_SEQUENCE = [
  { src: B+'3cd0985c9_foyer.jpg', caption: 'Heart pine underfoot, light overhead' },
  { src: B+'9200678d7_foyer5.jpg', caption: 'Entry door with Civil War–era bullet hole and reclaimed heart pine' },
  { src: B+'e0995354a_foyeryes.jpg', caption: 'The sitting alcove' },
  { src: B+'ba776ed77_foyersection.jpg', caption: 'Gallery and herringbone floor' },
  { src: B+'ba55df291_foyer2.jpg', caption: 'Entry door and star pendant' },
  { src: B+'27a8013d8_architguestpowder.jpg', caption: 'Powder room — agate tile detail' },
];

// ── GREAT ROOM (27.5' × 23.8', 17' vaulted ceiling) ──
const GREAT_ROOM_SEQUENCE = [
  { src: B+'a7a7e8ca5_fireplace.jpg', caption: 'Stone, timber, and an honest flame' },
  { src: B+'450bfe180_260115107LindenTrailF-9610.jpg', caption: 'Vaulted beams and reclaimed brick' },
  { src: B+'f84ed29bc_260115107LindenTrailF-9622.jpg', caption: 'Vaulted ceiling and French doors' },

  { src: B+'5843bc809_livingroom.jpg', caption: 'Soaring timber trusses frame the central volume' },
  { src: B+'512ade986_beamliving.jpg', caption: 'Beams and seating — the living room at ease' },
];

export default function MainLevelSection() {
  return (
    <>


      {/* Subtle editorial text bridge — single arrival moment */}
      <div className="text-center mx-auto" style={{
        maxWidth: '600px',
        paddingTop: 'clamp(64px, 9vh, 100px)',
        paddingBottom: 'clamp(64px, 9vh, 100px)',
        paddingLeft: 'clamp(24px, 6vw, 64px)',
        paddingRight: 'clamp(24px, 6vw, 64px)',
      }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 2, ease: [0.22, 0.1, 0.28, 1] }}
          className="font-display italic"
          style={{
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: '0.02em',
            color: '#9A8C7A',
            margin: 0,
          }}
        >
          Beyond the threshold, the home reveals itself in layers.
        </motion.p>
      </div>

      {/* ── FOYER GALLERY ── */}
      <div id="foyer-start" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <EditorialSequence images={FOYER_SEQUENCE.slice(1, -1)} />
      </div>

      <CinematicBridge
        fromImage={FOYER_SEQUENCE[FOYER_SEQUENCE.length - 1].src}
        toImage={GREAT_ROOM_SEQUENCE[0].src}
        fromAlt="The Foyer"
        toAlt="The Great Room"
        caption="Into the Great Room"
        light
      />

      {/* ── GREAT ROOM ── */}
      <div id="great-room" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <EditorialSequence images={GREAT_ROOM_SEQUENCE.slice(1)} />
      </div>

      <CinematicBridge
        fromImage="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/637bf912d_5AF265AE-F71F-4326-B9AE-21C92BC925F5_1_201_a.jpg"
        toImage={B+'7dcb51eed_SUNSHINEKITCHEN.jpg'}
        fromAlt="The Kitchen — timber beams and Wolf range"
        toAlt="The Kitchen — morning light"
        caption="Into the Kitchen"
        light
      />

      {/* ── KITCHEN (19.4' × 15.6', 18' trayed ceiling) ── */}
      <div id="kitchen-section">
        <KitchenFeature />
      </div>

      <CinematicBridge
        fromImage={B+'46690300f_KTOCONS.jpg'}
        toImage={B+'89e1b25c5_CONSERVATORYBEST.jpg'}
        fromAlt="Through the kitchen"
        toAlt="The Conservatory"
        caption="Into the Conservatory"
        light
      />

      {/* ── CONSERVATORY (19.5' × 17.7', 19.3' vaulted) ── */}
      <div id="conservatory-section">
        <ConservatoryFeature />
      </div>

      <CinematicBridge
        fromImage={B+'3c8ec3b2a_CONSERV3.jpg'}
        toImage={B+'67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg'}
        fromAlt="The Conservatory"
        toAlt="The Scullery"
        caption="Behind the Kitchen"
        light
      />

      {/* ── SCULLERY (9.5' × 6.2') ── */}
      <div id="scullery-section">
        <SculleryFeature />
      </div>

      <CinematicBridge
        fromImage={B+'ffc0435f6_HEARTPINEHALLWAYWITHBUILTINDESK.jpg'}
        toImage={B+'48fe6f4ea_verticaldiningroom.jpg'}
        fromAlt="Kitchen hallway — built-in desk"
        toAlt="The Dining Room"
        caption="Into the Dining Room"
        light
      />

      {/* ── DINING ROOM + LIVING ROOM + SCREENED PORCH ── */}
      <div id="dining-section">
        <DiningLivingFeature />
      </div>

      <CinematicBridge
        fromImage={B+'65ce09a4c_patio4.jpg'}
        toImage={B+'4e4b52f06_primary1pic2.jpg'}
        fromAlt="The Screened Porch"
        toAlt="The Primary Suite"
        caption="Into the Primary Suite"
        light
      />

      {/* ── PRIMARY SUITE WING (19.6' × 18.5', 15.8' cathedral) ── */}
      <div id="primary-suite">
        <PrimarySuiteFeature />
      </div>

      <CinematicBridge
        fromImage={B+'76c5b0b70_Jofficeoffcloet.jpg'}
        toImage={B+'41494cfdd_hallwaytokidwing.jpg'}
        fromAlt="The Private Office"
        toAlt="The Family Wing"
        caption="Into the Family Wing"
        light
      />

      {/* ── FAMILY WING (Study, Play Room, 2 Bedrooms, 2 Baths, Laundry) ── */}
      <div id="family-wing">
        <FamilyWingFeature />
      </div>

      <CinematicBridge
        fromImage={B+'e480e9280_MUDROOMLAUNDRY.jpg'}
        toImage={B+'59881eba8_260115107LindenTrailF-9475-2.jpg'}
        fromAlt="Mudroom laundry"
        toAlt="The Mudroom Wing"
        caption="Into the Service Wing"
        light
      />

      {/* ── MUDROOM & SERVICE WING (17.7' × 16', 17.8' vaulted) ── */}
      <div id="mudroom-guest">
        <MudroomGuestSuiteGallery />
      </div>
    </>
  );
}