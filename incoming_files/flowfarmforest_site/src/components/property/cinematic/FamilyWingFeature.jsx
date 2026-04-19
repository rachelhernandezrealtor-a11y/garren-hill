import React from 'react';
import { EditorialSequence } from './ResidenceShared';

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// Gallery-sourced color-matched images — per floor plan:
// Study (15.5' × 12.1', 15' vaulted), Play Room (13.6' × 24.6'),
// Bedroom 1 (13.6' × 11.6') + Bath (11' × 11.8'),
// Bedroom 2 (13.6' × 11.5') + Bath (11' × 8.4'),
// Laundry (11.1' × 8.5')
const IMAGES = [
  { src: B+'41494cfdd_hallwaytokidwing.jpg', caption: 'Heart pine corridor — the path narrows, the house quiets, and the family wing begins.' },
  { src: B+'db4f2b48a_tojoffice.jpg', caption: 'Bay window and heart pine — the office from above.' },
  { src: B+'81cc68968_Winglivingroom.jpg', caption: 'Play room — 13.6\' × 24.6\'. Heart pine, ceiling fans, and glass-paneled French doors.' },
  { src: B+'2e0a2eb05_fromkidwingtocentralstaircasetosecondfloor.jpg', caption: 'Central staircase from the family wing — connects all three levels.' },
  // Bedroom 1
  { src: B+'d811031de_wingbedroom1.jpg', caption: 'Bedroom suite one — 13.6\' × 11.6\'. Roman shades, reading nook, and forest views.' },
  { src: B+'d945fdb8e_wingbathroomgood.jpg', caption: 'Ensuite bath — granite vanity, custom cherry cabinetry.' },
  { src: B+'5279bb41d_wingbathroom.jpg', caption: 'Bath 1 wide view — frameless glass shower.' },
  { src: B+'7c844edec_wingbathroomshowerglasstilecustom.jpg', caption: 'Custom glass tile shower detail.' },
  // Bedroom 2
  { src: B+'3687126be_wingbedroom2.jpg', caption: 'Bedroom suite two — 13.6\' × 11.5\'.' },
  { src: B+'a72e07aaf_260115107LindenTrailF-9658.jpg', caption: 'Bedroom 2 — heart pine and natural light.' },
  { src: B+'016342efb_kidbed21pic.jpg', caption: 'Bedroom 2 — creative workspace.' },
  { src: B+'986652c1b_verticalshotkid2glassshower.jpg', caption: 'Ensuite bath 2 — glass shower.' },
  { src: B+'2374b0e06_kidbath2wide.jpg', caption: 'Second bath — dark cherry vanity with granite countertop.' },
  // Laundry
  { src: B+'20564d8f5_laundrytoom.jpg', caption: 'The laundry room — Whirlpool, subway tile, and custom cabinetry.' },
  { src: B+'d24a92375_laundryroom2.jpg', caption: 'Laundry — washer and farmhouse sink.' },
  { src: B+'5a8a11144_laundryperk.jpg', caption: 'Built-in ironing board — one of the details that define this house.' },
];

export default function FamilyWingFeature() {
  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Skip first image — already shown in CinematicBridge */}
        <EditorialSequence images={IMAGES.slice(1)} />
      </div>
    </div>
  );
}