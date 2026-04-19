// Gallery data — editorial selection, curated for impact.
// Hero image always leads: widest, most impressive shot.
// Supporting images trimmed to avoid clutter.

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const GALLERY_SECTIONS = [
  {
    title: 'Arrival & First Impression',
    intro: 'Reclaimed heart pine, herringbone floors, and a sense of place from the first step.',
    variant: 'heroStack',
    images: [
      { src: B+'967c6b791_107LindenTrailGrass-65.jpg', alt: 'The residence, framed by oak canopy', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
      { src: B+'3cd0985c9_foyer.jpg', alt: 'Heart pine underfoot, light overhead', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'ba776ed77_foyersection.jpg', alt: 'Gallery hall in herringbone', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },
  {
    title: 'Grand Living',
    intro: 'Soaring timber trusses, a masonry hearth, and rooms that breathe.',
    variant: 'sideFeature',
    images: [
      { src: B+'5843bc809_livingroom.jpg', alt: 'Grand living beneath timber trusses', adjust: 'brightness(1.12) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'a7a7e8ca5_fireplace.jpg', alt: 'Masonry hearth and gathering room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'f84ed29bc_260115107LindenTrailF-9622.jpg', alt: 'French doors open to the porch', adjust: 'brightness(1.12) contrast(1.04) saturate(0.91) hue-rotate(-2deg)' },
    ],
  },
  {
    title: 'Culinary & Entertaining',
    intro: 'A professional kitchen, octagonal glass conservatory, and spaces designed to gather.',
    variant: 'heroStack',
    images: [
      { src: B+'bfda33343_KITCHENYES.jpg', alt: "Chef's kitchen, island to conservatory", adjust: 'brightness(1.30) contrast(1.06) saturate(0.86) hue-rotate(-5deg)' },
      { src: B+'89e1b25c5_CONSERVATORYBEST.jpg', alt: 'Light-filled glass pavilion', adjust: 'brightness(1.30) contrast(1.06) saturate(0.87) hue-rotate(-5deg)' },
      { src: B+'48fe6f4ea_verticaldiningroom.jpg', alt: 'Dining beneath a sculptural chandelier', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-5deg)' },
      { src: B+'b87561484_MONEYSHOT.jpg', alt: 'Timber cupola and floor-to-ceiling glass', adjust: 'brightness(1.14) contrast(1.03) saturate(0.92) hue-rotate(-3deg)' },
    ],
  },
  {
    title: "Owner's Retreat",
    intro: 'Cathedral ceilings, spa-like baths, and a dressing room with granite island.',
    variant: 'sideFeature',
    images: [
      { src: B+'e802ebf12_primary1main.jpg', alt: 'Private retreat with cathedral light' },
      { src: B+'d0bb8decd_primarytightshottubandshower.jpg', alt: 'Spa-like bath with freestanding tub', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'a32b0b4a1_primaryclosetgreatshot.jpg', alt: 'Dressing room with granite island', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },
  {
    title: 'Guest Suites & Private Quarters',
    intro: 'Independent guest living with private kitchenette, sitting room, and ensuite bath.',
    variant: 'heroStack',
    images: [
      { src: B+'95203cc47_GUESTSUITESITTINGROOM.jpg', alt: 'Guest quarters for independent living', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'ad2afce57_GUESTSUITEKITCHENETTE.jpg', alt: 'Private kitchenette above the wing', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'be8ac3158_GUESTSUITETRAYCEILING.jpg', alt: 'Tray ceiling and quiet comfort', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
    ],
  },
  {
    title: 'Flexible Living & Creative Spaces',
    intro: 'Cathedral offices, flex rooms, and play spaces that adapt to every chapter.',
    variant: 'sideFeature',
    images: [
      { src: B+'f6b8bb6bb_markofficemoneyshot.jpg', alt: 'Cathedral office with timber overhead', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'db4f2b48a_tojoffice.jpg', alt: 'Bay window desk and natural light', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'c27c0bc25_thinktankmain.jpg', alt: 'Flex room for whatever comes next', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },
  {
    title: 'Service Wing & Mudroom',
    intro: 'Vaulted ceilings, a granite island, farmhouse sink — utility elevated to craft.',
    variant: 'fullBleed',
    images: [
      { src: B+'59881eba8_260115107LindenTrailF-9475-2.jpg', alt: 'Mudroom designed for real life', adjust: 'brightness(1.16) contrast(1.06) saturate(0.85) hue-rotate(-5deg)' },
      { src: B+'b94cc0247_MUDROOM3.jpg', alt: 'Heart pine cubbies and coat hooks', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
    ],
  },
  {
    title: 'The Estate',
    intro: 'Cultivated fields, high tunnels, and twelve acres of managed landscape from above.',
    variant: 'fullBleed',
    images: [
      { src: B+'2a1ce3d2a_Drone2.jpg', alt: 'Estate panorama across cultivated ground' },
      { src: B+'595faa261_107LindenTrail-29.jpg', alt: 'Full compound in afternoon light' },
      { src: B+'e75aca465_107LindenTrailGrass-44.jpg', alt: 'Summer green stretching to the horizon', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
    ],
  },
  {
    title: 'Garage & Outbuildings',
    intro: 'Cabana house, three-car garage, and structures built to the same exacting standard.',
    variant: 'heroStack',
    images: [
      { src: B+'346ee953a_CabanaHouseMain.jpg', alt: 'Cabana house across the courtyard' },
      { src: B+'d0aa34c28_107LindenTrailGrass-63.jpg', alt: 'Three-car garage on brick', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
    ],
  },
];

export default GALLERY_SECTIONS;