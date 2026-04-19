import React from 'react';
import { EditorialSequence } from './ResidenceShared';

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

// Per floor plan:
// Office (19.5' × 18.9', 16.3' cathedral, 5 skylights)
// Bonus Room / Flex Room (16.2' × 12.6', 8.3' ceiling)
// Den (15.6' × 14.2', 8.2' ceiling)
// Bedroom (15.6' × 11.5', 8.2') + Bath (12.8' × 8.6')
// Guest Apartment: Living (17.5' × 11.5'), Kitchenette (11.5' × 8'), Bedroom (11.4' × 11.6'), Bath (5.6' × 11.4')

const IMAGES = [
  // Corridors & Stairways (first image shown in CinematicBridge above — start with hallway)
  { src: B+'099cb9a82_secondfloorhallway.jpg', caption: 'Second floor hallway — skylights overhead.' },
  { src: B+'c1240cf65_architectqualityhandrails.jpg', caption: 'Architect-quality handrails. Every joint, every turn considered.' },
  { src: B+'2eb818889_centerstairwellhouse.jpg', caption: 'The center stairwell — three finished levels connected by heart pine.' },
  // Full Bath in Hall — Second Floor (12.8' × 8.6')
  { src: B+'2497b7226_fullbathsecondarchitshotwithwindow.jpg', caption: 'Hall bath — vanity and skylight.' },
  { src: B+'9fbe3964b_fullbathsecondfloorshowertub.jpg', caption: 'Hall bath — shower and tub.' },
  { src: B+'c907521e8_fullbathsecondfloor.jpg', caption: 'Hall bath — full vanity.' },
  // Executive Office (19.5' × 18.9', 16.3' cathedral)
  { src: B+'f6b8bb6bb_markofficemoneyshot.jpg', caption: 'The executive office — 16-foot cathedral ceiling, timber trusses, ten dimmable circuits.' },
  { src: B+'0374dfba9_architecmarkofficetallbeampic.jpg', caption: 'Vaulted beams and workspace.' },
  { src: B+'98155bdd6_markoffice1.jpg', caption: 'Custom desk and shelving.' },
  { src: B+'3213e3625_nookinthinktankshowingwindows.jpg', caption: 'Think tank — reading nook and skylights.' },
  // Den / Think Tank (15.6' × 14.2')
  { src: B+'c27c0bc25_thinktankmain.jpg', caption: 'The think tank — flex room that converts to a private bedroom.' },
  { src: B+'7b6193607_thinktankorbedroom2.jpg', caption: 'Think tank — alternative view.' },
  // Guest Suite — Bonus Room area
  { src: B+'b38315480_GuestSuiteSecondFloor.jpg', caption: 'Guest suite — open to living room below.' },
  { src: B+'55048435a_GuestSuite2.jpg', caption: 'Guest suite — bedroom sitting area.' },
  { src: B+'a00bbd3ff_GuestSuite3.jpg', caption: 'Guest suite — bedroom reading nook.' },
  // Guest Apartment (above mudroom wing)
  { src: B+'95203cc47_GUESTSUITESITTINGROOM.jpg', caption: 'Guest apartment — living room.' },
  { src: B+'6c6ddb945_SITTINGROOMGUESTSUITE.jpg', caption: 'Guest apartment — sitting area with heart pine floors.' },
  { src: B+'ad2afce57_GUESTSUITEKITCHENETTE.jpg', caption: 'Kitchenette — stainless appliances and open shelving.' },
  { src: B+'be8ac3158_GUESTSUITETRAYCEILING.jpg', caption: 'Guest bedroom — tray ceiling and forest views.' },
  { src: B+'2f253f546_CUSTOMGLASSTILESHOWER.jpg', caption: 'Guest apartment — custom glass tile shower.' },
  { src: B+'bce39fcbc_GUESTSUITEBATHROOM.jpg', caption: 'Guest apartment — full bath.' },
];

export default function SecondFloorFeature() {
  return (
    <div>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <EditorialSequence images={IMAGES} />
      </div>
    </div>
  );
}