// Curated gallery — editorial selection, grouped by experience
// Each section: first image = full-width hero, rest = supporting grid

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const CURATED_SECTIONS = [

  // ── Arrival & First Impression ──
  {
    title: 'Arrival & First Impression',
    images: [
      { src: B+'967c6b791_107LindenTrailGrass-65.jpg', alt: 'Arrival framed in reclaimed heart pine', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
      { src: B+'3cd0985c9_foyer.jpg', alt: 'Heart pine underfoot, light overhead', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'e431e3195_guestpowder.jpg', alt: 'Gold and stone powder room', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Grand Living ──
  {
    title: 'Grand Living',
    images: [
      { src: B+'5843bc809_livingroom.jpg', alt: 'Grand living beneath timber trusses', adjust: 'brightness(1.12) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'a7a7e8ca5_fireplace.jpg', alt: 'Masonry hearth and gathering room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'ce057eac8_patio2.jpg', alt: 'Three-season porch and distant green', adjust: 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Culinary & Entertaining ──
  {
    title: 'Culinary & Entertaining',
    images: [
      { src: B+'bfda33343_KITCHENYES.jpg', alt: "Chef's kitchen built for scale", adjust: 'brightness(1.30) contrast(1.06) saturate(0.86) hue-rotate(-5deg)' },
      { src: B+'48fe6f4ea_verticaldiningroom.jpg', alt: 'Dining beneath a sculptural chandelier', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-5deg)' },
      { src: B+'89e1b25c5_CONSERVATORYBEST.jpg', alt: 'Light-filled glass pavilion', adjust: 'brightness(1.30) contrast(1.06) saturate(0.87) hue-rotate(-5deg)' },
      { src: B+'67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg', alt: 'Scullery tucked behind the kitchen', adjust: 'brightness(1.14) contrast(1.05) saturate(0.87) hue-rotate(-5deg)' },
    ],
  },

  // ── Owner's Retreat ──
  {
    title: "Owner's Retreat",
    images: [
      { src: B+'e802ebf12_primary1main.jpg', alt: 'Private retreat with cathedral light' },
      { src: B+'d0bb8decd_primarytightshottubandshower.jpg', alt: 'Spa-like bath with freestanding tub', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
      { src: B+'a32b0b4a1_primaryclosetgreatshot.jpg', alt: 'Dressing room with granite island', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Family Wing ──
  {
    title: 'Family Wing',
    images: [
      { src: B+'41494cfdd_hallwaytokidwing.jpg', alt: 'Heart pine corridor to the family wing', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'d811031de_wingbedroom1.jpg', alt: 'Bedroom suite one', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
      { src: B+'20564d8f5_laundrytoom.jpg', alt: 'The family wing laundry room', adjust: 'brightness(1.16) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },
    ],
  },

  // ── Guest Suites & Private Quarters ──
  {
    title: 'Guest Suites & Private Quarters',
    images: [
      { src: B+'95203cc47_GUESTSUITESITTINGROOM.jpg', alt: 'Guest quarters for independent living', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'55048435a_GuestSuite2.jpg', alt: 'Second-floor sitting room', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Flexible Living & Creative Spaces ──
  {
    title: 'Flexible Living & Creative Spaces',
    images: [
      { src: B+'f6b8bb6bb_markofficemoneyshot.jpg', alt: 'Cathedral office with timber overhead', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
      { src: B+'c27c0bc25_thinktankmain.jpg', alt: 'Flex room for whatever comes next', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Service Wing & Mudroom ──
  {
    title: 'Service Wing & Mudroom',
    images: [
      { src: B+'59881eba8_260115107LindenTrailF-9475-2.jpg', alt: 'Mudroom designed for real life', adjust: 'brightness(1.16) contrast(1.06) saturate(0.85) hue-rotate(-5deg)' },
      { src: B+'e480e9280_MUDROOMLAUNDRY.jpg', alt: 'Farmhouse sink and folding station', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Upper Level & Corridors ──
  {
    title: 'Upper Level & Corridors',
    images: [
      { src: B+'2eb818889_centerstairwellhouse.jpg', alt: 'The center stairwell connecting all levels' },
      { src: B+'099cb9a82_secondfloorhallway.jpg', alt: 'Second floor hallway with skylights overhead', adjust: 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
    ],
  },

  // ── Lower Level & Infrastructure ──
  {
    title: 'Lower Level & Infrastructure',
    images: [
      { src: B+'3c4adc2bb_DoorSaferemoveitems.jpg', alt: 'Brown Safe vault door', adjust: 'brightness(1.15) contrast(1.05) saturate(0.9) hue-rotate(-3deg)' },
      { src: B+'e3e772f98_MechanicalRoom.jpg', alt: 'Commercial water filtration and mechanical core', adjust: 'brightness(1.15) contrast(1.05) saturate(0.9) hue-rotate(-3deg)' },
      { src: B+'7b98519f8_CrawlSpaceSolarBatteries.jpg', alt: 'Solar array feeds a Sunny Island battery backup', adjust: 'brightness(1.15) contrast(1.05) saturate(0.9) hue-rotate(-3deg)' },
    ],
  },

  // ── The Estate ──
  {
    title: 'The Estate',
    images: [
      { src: B+'2a1ce3d2a_Drone2.jpg', alt: 'Estate views across cultivated ground' },
      { src: B+'595faa261_107LindenTrail-29.jpg', alt: 'Full compound in afternoon light' },
      { src: B+'585331166_tunnelgood.jpg', alt: 'Inside the high tunnel, mid-season' },
    ],
  },

  // ── Garage & Outbuildings ──
  {
    title: 'Garage & Outbuildings',
    images: [
      { src: B+'d0aa34c28_107LindenTrailGrass-63.jpg', alt: 'Three-car garage on brick', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
      { src: B+'346ee953a_CabanaHouseMain.jpg', alt: 'Cabana house across the courtyard' },
    ],
  },
];

export default CURATED_SECTIONS;