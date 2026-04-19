import React from 'react';
import { EditorialSequence } from './ResidenceShared';

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// Dining Room (21.6' × 11.6', 16.3' vaulted ceiling)
const DINING_IMAGES = [
  { src: B+'48fe6f4ea_verticaldiningroom.jpg', caption: 'A sculptural chandelier floats above glass and heart pine' },
  { src: B+'66fb33bbd_sogoodtolivingroom.jpg', caption: 'Through to the Great Room — timber trusses and fireplace beyond' },
  { src: B+'f7988d6a2_DININGROOM.jpg', caption: 'Bay windows flood the alcove with natural light' },
  { src: B+'8fb2a6e19_dininghori.jpg', caption: 'Dining room — horizontal view across the vaulted space' },
];

// Living Room (27.5' × 23.8', 17' vaulted ceiling) — views toward French doors
const LIVING_IMAGES = [
];

// Screened Porch (26.6' × 11.1', 9.4' ceiling)
const PORCH_IMAGES = [
  { src: B+'ce057eac8_patio2.jpg', caption: 'The screened porch — three-season stillness' },
  { src: B+'8157f1ac0_patio.jpg', caption: 'Brick and cedar ceiling — protected outdoor living' },
  { src: B+'65ce09a4c_patio4.jpg', caption: 'View to the grounds from the screened porch' },
];

export default function DiningLivingFeature() {
  // Skip first dining image — already shown in CinematicBridge
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <EditorialSequence
        images={[...DINING_IMAGES.slice(1), ...LIVING_IMAGES, ...PORCH_IMAGES]}
      />
    </div>
  );
}