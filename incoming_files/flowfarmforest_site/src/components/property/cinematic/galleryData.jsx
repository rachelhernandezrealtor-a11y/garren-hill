// Gallery data organized per architect's floor plan (107 Linden Trail)
// ══════════════════════════════════════════════════════
// FIRST FLOOR (5,986 SF above grade)
//   Grand Entrance: Covered Porch → Foyer → Powder Room
//   Entertaining Axis: Living Room → Kitchen → Scullery (9.5'×6.2') → Pantry (14.5'×7.5') → Dining Room → Conservatory
//   Outdoor Living: Screened Porch (26.6'×11.1')
//   Primary Suite Wing: Primary Bedroom → Sitting Room → Primary Bath → WIC
//   Family Wing: Study (15.5'×12.1') → Play Room → Bedroom 1 + Bath → Bedroom 2 + Bath → Laundry
//   Service Wing: Mudroom / Laundry (17.7'×16') → 3-Car Garage
//
// SECOND FLOOR (2,533 SF)
//   Executive Level: Office (19.5'×18.9') → Bonus/Flex Room (16.2'×12.6')
//   Upper Family Wing: Den (15.6'×14.2') → Bedroom + Bath
//   Guest Apartment (above mudroom): APT Living Room → Kitchenette → Bedroom → Bath
//   Corridors & Stairways
//
// LOWER LEVEL / WALK-OUT BASEMENT (1,709 SF finished)
//   Recreation Room (31.3'×17.4') → Theater (20.4'×17.3') → Safe Room
//   Mechanical Core / Conditioned Crawl Space (2,531 SF)
//
// CABANA HOUSE / OUTBUILDINGS
//   Garage → Oahana → Bunk House → Walk-In Cooler → Future Apartment (2F) → Future Sports Court
//
// EXTERIOR
// ESTATE & LAND
// ══════════════════════════════════════════════════════

const ADJ = 'brightness(1.12) contrast(1.04) saturate(0.90) hue-rotate(-3deg)';
const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const GALLERY_DATA = [

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Grand Entrance
  // ═══════════════════════════════════════════════════════

  // Foyer (9.4' × 12.9', 8.3' ceiling)
  { src: B+'3cd0985c9_foyer.jpg', alt: 'Foyer — Heart Pine Underfoot, Light Overhead', category: 'First Floor', room: 'Foyer', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'9200678d7_foyer5.jpg', alt: 'Foyer — Entry & Reclaimed Heart Pine', category: 'First Floor', room: 'Foyer', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'e0995354a_foyeryes.jpg', alt: 'Foyer — The Sitting Alcove', category: 'First Floor', room: 'Foyer', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'ba776ed77_foyersection.jpg', alt: 'Foyer — Gallery & Herringbone Floor', category: 'First Floor', room: 'Foyer', adjust: ADJ },
  { src: B+'ba55df291_foyer2.jpg', alt: 'Foyer — Entry Door & Star Pendant', category: 'First Floor', room: 'Foyer', adjust: ADJ },
  { src: B+'123331490_foyergood.jpg', alt: 'Foyer — Reclaimed Door Open', category: 'First Floor', room: 'Foyer', adjust: ADJ },

  // Powder Room (5.6' × 11.5')
  { src: B+'bd374d013_260115107LindenTrailF-9727.jpg', alt: 'Powder Room — Gold Fixtures & Etched Basin', category: 'First Floor', room: 'Powder Room' },
  { src: B+'27a8013d8_architguestpowder.jpg', alt: 'Powder Room — Agate Tile Detail', category: 'First Floor', room: 'Powder Room', adjust: ADJ },

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Entertaining Axis
  // ═══════════════════════════════════════════════════════

  // Living Room (27.5' × 23.8', 17' vaulted ceiling)
  { src: B+'a7a7e8ca5_fireplace.jpg', alt: 'Living Room — Masonry Fireplace', category: 'First Floor', room: 'Living Room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'450bfe180_260115107LindenTrailF-9610.jpg', alt: 'Living Room — Vaulted Beams & Brick', category: 'First Floor', room: 'Living Room' },
  { src: B+'f84ed29bc_260115107LindenTrailF-9622.jpg', alt: 'Living Room — Vaulted Ceiling & French Doors', category: 'First Floor', room: 'Living Room', adjust: 'brightness(1.12) contrast(1.04) saturate(0.91) hue-rotate(-2deg)' },
  { src: B+'7a2958f66_260115107LindenTrailF-9619.jpg', alt: 'Living Room — Grand Piano Alcove', category: 'First Floor', room: 'Living Room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },
  { src: B+'5843bc809_livingroom.jpg', alt: 'Living Room — Soaring Timber Trusses', category: 'First Floor', room: 'Living Room', adjust: 'brightness(1.12) contrast(1.05) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'fe0463ad6_livingroom2.jpg', alt: 'Living Room — French Doors to Screened Porch', category: 'First Floor', room: 'Living Room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },
  { src: B+'512ade986_beamliving.jpg', alt: 'Living Room — Beams & Seating', category: 'First Floor', room: 'Living Room', adjust: ADJ },
  { src: B+'21d70e6d8_livingroom4.jpg', alt: 'Living Room — Full Trusses & Piano', category: 'First Floor', room: 'Living Room', adjust: ADJ },

  // Kitchen (19.4' × 15.6', 18' trayed ceiling, 4 skylights)
  { src: B+'7dcb51eed_SUNSHINEKITCHEN.jpg', alt: 'Kitchen — Sunshine', category: 'First Floor', room: 'Kitchen' },
  { src: B+'7f2cea89d_KITCHEN1.jpg', alt: 'Kitchen — Island, Range & Conservatory', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.32) contrast(1.08) saturate(0.84) hue-rotate(-8deg)' },
  { src: B+'34a1f0e81_WOLFCLOSEUP.jpg', alt: 'Kitchen — Wolf 60" Dual-Fuel Range', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)' },
  { src: B+'223daee20_kitchenok.jpg', alt: 'Kitchen — Workstation Sink & Heart Pine', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.32) contrast(1.06) saturate(0.86) hue-rotate(-7deg)' },
  { src: B+'46690300f_KTOCONS.jpg', alt: 'Kitchen — Through to Conservatory', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.22) contrast(1.06) saturate(0.86) hue-rotate(-7deg)' },
  { src: B+'2d1d71d3d_KITCHEN2.jpg', alt: 'Kitchen — Full View to Living Room', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)' },
  { src: B+'64a6417b1_kitchenbar.jpg', alt: 'Kitchen — Bar & Seating', category: 'First Floor', room: 'Kitchen', adjust: ADJ },
  { src: B+'d5a40285f_KitchentoConservatory.jpg', alt: 'Kitchen — Wide to Conservatory', category: 'First Floor', room: 'Kitchen', adjust: ADJ },
  { src: B+'59aae5329_KITCHENTOOFFICETOMUD.jpg', alt: 'Kitchen — To Hallway Desk & Mudroom', category: 'First Floor', room: 'Kitchen', adjust: ADJ },

  { src: B+'bfda33343_KITCHENYES.jpg', alt: 'Kitchen — Island & Range Wide', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.30) contrast(1.06) saturate(0.86) hue-rotate(-5deg)' },
  { src: B+'1d567e611_Kitchen.jpg', alt: 'Kitchen — Heart Pine Island', category: 'First Floor', room: 'Kitchen', adjust: ADJ },
  { src: B+'25f289c9d_KTC2.jpg', alt: 'Kitchen — Range & Countertop Detail', category: 'First Floor', room: 'Kitchen', adjust: ADJ },
  { src: B+'64997f891_SOGOODKITCHEN.jpg', alt: 'Kitchen — Full Space Overview', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.18) contrast(1.06) saturate(0.86) hue-rotate(-5deg)' },
  { src: B+'1ed121d5b_KITCH.jpg', alt: 'Kitchen — Island to Conservatory', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.18) contrast(1.06) saturate(0.86) hue-rotate(-5deg)' },
  { src: B+'4fa4245b6_WOLFDOUBLEGASRANGE.jpg', alt: 'Kitchen — Wolf Double Gas Range Detail', category: 'First Floor', room: 'Kitchen', adjust: 'brightness(1.36) contrast(1.10) saturate(0.78) hue-rotate(-10deg)' },
  { src: B+'b82d587b7_CUSTOMWOODSINK.jpg', alt: 'Kitchen — Custom Wood Sink & Workstation', category: 'First Floor', room: 'Kitchen', adjust: ADJ },

  // Scullery (9.5' × 6.2' — secondary galley adjacent to kitchen)
  { src: B+'67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg', alt: 'Scullery — Glass Tile & Granite Counters', category: 'First Floor', room: 'Scullery & Pantry', adjust: 'brightness(1.14) contrast(1.05) saturate(0.87) hue-rotate(-5deg)' },
  { src: B+'816754381_SCULLERY.jpg', alt: 'Scullery — Full Galley View', category: 'First Floor', room: 'Scullery & Pantry', adjust: 'brightness(1.14) contrast(1.05) saturate(0.87) hue-rotate(-5deg)' },
  { src: B+'6cb0fef12_SCULLERYSINK.jpg', alt: 'Scullery — Sink Close-Up', category: 'First Floor', room: 'Scullery & Pantry', adjust: 'brightness(1.14) contrast(1.05) saturate(0.87) hue-rotate(-5deg)' },

  // Kitchen Hallway & Built-In Desk (connects Kitchen → Mudroom)
  { src: B+'ffc0435f6_HEARTPINEHALLWAYWITHBUILTINDESK.jpg', alt: 'Kitchen Hallway — Built-In Desk', category: 'First Floor', room: 'Kitchen Hallway & Desk', adjust: 'brightness(1.18) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // Dining Room (21.6' × 11.6', 16.3' vaulted ceiling)
  { src: B+'66fb33bbd_sogoodtolivingroom.jpg', alt: 'Dining Room — Through to Living Room', category: 'First Floor', room: 'Dining Room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.88) hue-rotate(-5deg)' },
  { src: B+'48fe6f4ea_verticaldiningroom.jpg', alt: 'Dining Room — Sculptural Chandelier & Heart Pine', category: 'First Floor', room: 'Dining Room', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-5deg)' },
  { src: B+'f7988d6a2_DININGROOM.jpg', alt: 'Dining Room — Bay Windows & Natural Light', category: 'First Floor', room: 'Dining Room', adjust: 'brightness(1.14) contrast(1.05) saturate(0.88) hue-rotate(-5deg)' },
  { src: B+'8fb2a6e19_dininghori.jpg', alt: 'Dining Room — Horizontal View', category: 'First Floor', room: 'Dining Room', adjust: ADJ },

  // Conservatory (19.5' × 17.7', 19.3' vaulted ceiling — octagonal glass pavilion)
  { src: B+'89e1b25c5_CONSERVATORYBEST.jpg', alt: 'Conservatory — The Glass Pavilion', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.30) contrast(1.06) saturate(0.87) hue-rotate(-5deg)' },
  { src: B+'b87561484_MONEYSHOT.jpg', alt: 'Conservatory — Full-Height Glazing & Timber Cupola', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.14) contrast(1.03) saturate(0.92) hue-rotate(-3deg)' },
  { src: B+'508b1e89c_260115107LindenTrailF-9565.jpg', alt: 'Conservatory — Timber-Framed Glass Ceiling', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.22) contrast(1.05) saturate(0.93) hue-rotate(-2deg)' },
  { src: B+'b7bc4ea33_CONSER.jpg', alt: 'Conservatory — Granite Wet Bar & Views', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.56) contrast(1.06) saturate(0.87) hue-rotate(-5deg)' },
  { src: B+'30c296bd2_CUSTOMHUTCH.jpg', alt: 'Conservatory — Custom Millwork & Mirrored Cabinetry', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.30) contrast(1.07) saturate(0.83) hue-rotate(-7deg)' },
  { src: B+'3c8ec3b2a_CONSERV3.jpg', alt: 'Conservatory — Dining Area & Cupola', category: 'First Floor', room: 'Conservatory', adjust: 'brightness(1.30) contrast(1.06) saturate(0.87) hue-rotate(-5deg)' },
  { src: B+'4e0025afb_SUNSHINECONSERVATORY.jpg', alt: 'Conservatory — Sunshine & Dining', category: 'First Floor', room: 'Conservatory', adjust: ADJ },

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Outdoor Living
  // ═══════════════════════════════════════════════════════

  // Screened Porch (26.6' × 11.1', 9.4' ceiling)
  { src: B+'ce057eac8_patio2.jpg', alt: 'Screened Porch — Three-Season Living', category: 'First Floor', room: 'Screened Porch', adjust: 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'8157f1ac0_patio.jpg', alt: 'Screened Porch — Brick & Cedar Ceiling', category: 'First Floor', room: 'Screened Porch', adjust: 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'65ce09a4c_patio4.jpg', alt: 'Screened Porch — View to Grounds', category: 'First Floor', room: 'Screened Porch', adjust: 'brightness(1.16) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Primary Suite Wing
  // ═══════════════════════════════════════════════════════

  // Primary Bedroom (19.6' × 18.5', 15.8' cathedral ceiling)
  { src: B+'f5ac70bec_entrancetoprimarty.jpg', alt: 'Primary Suite — Entrance Hall', category: 'First Floor', room: 'Primary Suite' },
  { src: B+'e802ebf12_primary1main.jpg', alt: 'Primary Bedroom — Vaulted Ceiling', category: 'First Floor', room: 'Primary Suite' },
  { src: B+'a6faeafb1_primary.jpg', alt: 'Primary Bedroom — Heart Pine & Light', category: 'First Floor', room: 'Primary Suite' },
  { src: B+'4e4b52f06_primary1pic2.jpg', alt: 'Primary Bedroom — Cathedral Ceiling', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },

  // Sitting Room (12.2' × 18.5', 8.3' ceiling)
  { src: B+'b273862dc_tightshotsitroomprimary.jpg', alt: 'Primary Sitting Room — Bay Windows', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },
  { src: B+'70363b373_primarywidetositrom.jpg', alt: 'Primary Sitting Room — Wide View', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },

  // Primary Bath (18.3' × 18.6', 8.3' ceiling)
  { src: B+'1fdf34b75_spaprimarybath.jpg', alt: 'Primary Bath — Full Spa View', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },
  { src: B+'dbcdc9712_primarybathgoodtoclosetdoor.jpg', alt: 'Primary Bath — Vanity & Storage', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },
  { src: B+'d0bb8decd_primarytightshottubandshower.jpg', alt: 'Primary Bath — Freestanding Tub & Rain Shower', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },
  { src: B+'66e66a3e8_architecmasterbathwateron.jpg', alt: 'Primary Bath — Agate Tile & Running Water', category: 'First Floor', room: 'Primary Suite', adjust: ADJ },

  // Walk-In Closet (11.7' × 21.7', 8.3' ceiling)
  { src: B+'eb3806b6b_closeupcenterislandprimarycloset.jpg', alt: 'Primary Closet — Granite-Top Center Island', category: 'First Floor', room: 'Primary Suite', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'af5141830_fullshotprimcloset.jpg', alt: 'Primary Closet — Full View with Built-In Cabinetry', category: 'First Floor', room: 'Primary Suite', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'a32b0b4a1_primaryclosetgreatshot.jpg', alt: 'Primary Closet — Shoe Wall & Island', category: 'First Floor', room: 'Primary Suite', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },
  { src: B+'24c620f54_PrimarySuiteClosetSafe.jpg', alt: 'Primary Closet — Built-In Safe', category: 'First Floor', room: 'Primary Suite', adjust: 'brightness(1.18) contrast(1.04) saturate(0.90) hue-rotate(-3deg)' },

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Family Wing
  // ═══════════════════════════════════════════════════════

  // Study (15.5' × 12.1', 15' vaulted ceiling — per floor plan, in Family Wing)
  // (No dedicated photos currently available for the Study)

  // Play Room (13.6' × 24.6', 8.3' ceiling)
  { src: B+'81cc68968_Winglivingroom.jpg', alt: 'Family Wing — Play Room', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },

  // Bedroom 1 (13.6' × 11.6') + Ensuite Bath (11' × 11.8', 8.3' ceiling)
  { src: B+'d811031de_wingbedroom1.jpg', alt: 'Family Wing — Bedroom 1', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'d945fdb8e_wingbathroomgood.jpg', alt: 'Family Wing — Ensuite Bath 1', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'5279bb41d_wingbathroom.jpg', alt: 'Family Wing — Bath 1 Wide View', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'7c844edec_wingbathroomshowerglasstilecustom.jpg', alt: 'Family Wing — Custom Glass Tile Shower', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },

  // Bedroom 2 (13.6' × 11.5') + Ensuite Bath (11' × 8.4', 8.3' ceiling)
  { src: B+'3687126be_wingbedroom2.jpg', alt: 'Family Wing — Bedroom 2', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'a72e07aaf_260115107LindenTrailF-9658.jpg', alt: 'Family Wing — Bedroom 2 & Heart Pine', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'016342efb_kidbed21pic.jpg', alt: 'Family Wing — Bedroom 2 Detail', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'ec0bd5b59_kidbedroom2secondpic.jpg', alt: 'Family Wing — Bedroom 2 Alt View', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'986652c1b_verticalshotkid2glassshower.jpg', alt: 'Family Wing — Ensuite Bath 2 Shower', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },
  { src: B+'2374b0e06_kidbath2wide.jpg', alt: 'Family Wing — Ensuite Bath 2 Wide', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.24) contrast(1.05) saturate(0.87) hue-rotate(-4deg)' },

  // Family Wing Laundry (11.1' × 8.5')
  { src: B+'20564d8f5_laundrytoom.jpg', alt: 'Family Wing — Laundry Room', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.16) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },
  { src: B+'d24a92375_laundryroom2.jpg', alt: 'Family Wing — Laundry Washer & Sink', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.16) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },
  { src: B+'5a8a11144_laundryperk.jpg', alt: 'Family Wing — Built-In Ironing Board', category: 'First Floor', room: 'Family Wing', adjust: 'brightness(1.16) contrast(1.05) saturate(0.89) hue-rotate(-3deg)' },

  // ═══════════════════════════════════════════════════════
  // FIRST FLOOR — Service Wing
  // ═══════════════════════════════════════════════════════

  // Mudroom / Laundry (17.7' × 16', 17.8' vaulted ceiling)
  { src: B+'59881eba8_260115107LindenTrailF-9475-2.jpg', alt: 'Mudroom — Vaulted Ceilings & Granite Island', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: 'brightness(1.16) contrast(1.06) saturate(0.85) hue-rotate(-5deg)' },
  { src: B+'b94cc0247_MUDROOM3.jpg', alt: 'Mudroom — Heart Pine Coat Racks', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'6759b6410_MUDROOM.jpg', alt: 'Mudroom — Full View with Island', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: ADJ },
  { src: B+'937c5f9c6_mudroom2doorentrances.jpg', alt: 'Mudroom — Dual Entries & Bench', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: ADJ },

  // Mudroom Powder Room
  { src: B+'683c4a65a_MUDDPOWDERROOM.jpg', alt: 'Mudroom — Powder Room', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: ADJ },

  // Mudroom Laundry
  { src: B+'e480e9280_MUDROOMLAUNDRY.jpg', alt: 'Mudroom — Laundry & Farmhouse Sink', category: 'First Floor', room: 'Mudroom & Service Wing', adjust: ADJ },

  // ═══════════════════════════════════════════════════════
  // SECOND FLOOR — Executive Level
  // ═══════════════════════════════════════════════════════

  // Office (19.5' × 18.9', 16.3' cathedral ceiling, 5 skylights)
  { src: B+'f6b8bb6bb_markofficemoneyshot.jpg', alt: 'Executive Office — Cathedral Ceiling & Timber Trusses', category: 'Second Floor', room: 'Executive Office', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'db4f2b48a_tojoffice.jpg', alt: 'Executive Office — Bay Window & Heart Pine', category: 'Second Floor', room: 'Executive Office', adjust: 'brightness(1.10) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'0374dfba9_architecmarkofficetallbeampic.jpg', alt: 'Executive Office — Vaulted Beams & Workspace', category: 'Second Floor', room: 'Executive Office', adjust: ADJ },
  { src: B+'98155bdd6_markoffice1.jpg', alt: 'Executive Office — Custom Desk & Shelving', category: 'Second Floor', room: 'Executive Office', adjust: ADJ },
  { src: B+'54885a55a_joffice2.jpg', alt: 'Executive Office — Dual Monitor Workspace', category: 'Second Floor', room: 'Executive Office', adjust: ADJ },
  { src: B+'76c5b0b70_Jofficeoffcloet.jpg', alt: 'Executive Office — Skylights & Lounge', category: 'Second Floor', room: 'Executive Office', adjust: ADJ },
  { src: B+'3213e3625_nookinthinktankshowingwindows.jpg', alt: 'Think Tank — Reading Nook & Skylights', category: 'Second Floor', room: 'Executive Office', adjust: ADJ },

  // Bonus Room / Flex Room (16.2' × 12.6', 8.3' ceiling — open to Living Room below)
  { src: B+'b38315480_GuestSuiteSecondFloor.jpg', alt: 'Guest Suite — Open to Living Room Below', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },

  // ═══════════════════════════════════════════════════════
  // SECOND FLOOR — Upper Family Wing
  // ═══════════════════════════════════════════════════════

  // Den (15.6' × 14.2', 8.2' ceiling)
  { src: B+'c27c0bc25_thinktankmain.jpg', alt: 'Think Tank — Flex Room', category: 'Second Floor', room: 'Think Tank / Bedroom', adjust: ADJ },
  { src: B+'7b6193607_thinktankorbedroom2.jpg', alt: 'Think Tank — Alt View', category: 'Second Floor', room: 'Think Tank / Bedroom', adjust: ADJ },
  { src: B+'2de103f3f_thinktankorbedroom.jpg', alt: 'Think Tank — View 3', category: 'Second Floor', room: 'Think Tank / Bedroom', adjust: ADJ },

  // Bedroom (15.6' × 11.5', 8.2' ceiling) + Full Bath (12.8' × 8.6')
  { src: B+'55048435a_GuestSuite2.jpg', alt: 'Guest Suite — Bedroom Sitting Area', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },
  { src: B+'a00bbd3ff_GuestSuite3.jpg', alt: 'Guest Suite — Bedroom Reading Nook', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },
  { src: B+'869e4df24_fullbathsecondarchitshotwithwindow.jpg', alt: 'Guest Suite — Bath Vanity & Skylight', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },
  { src: B+'9d5f75f50_fullbathsecondfloorshowertub.jpg', alt: 'Guest Suite — Bath Shower & Tub', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },
  { src: B+'0961e0e5e_fullbathsecondfloor.jpg', alt: 'Guest Suite — Full Bath Vanity', category: 'Second Floor', room: 'Guest Suite', adjust: ADJ },

  // Bath (11.6' × 9.7' — separate from bedroom bath, per floor plan)
  // (Shared with Bonus Room / Flex Room area)

  // ═══════════════════════════════════════════════════════
  // SECOND FLOOR — Guest Apartment (above Mudroom wing)
  // ═══════════════════════════════════════════════════════

  // APT Living Room (17.5' × 11.5', 8' ceiling)
  { src: B+'95203cc47_GUESTSUITESITTINGROOM.jpg', alt: 'Guest Apartment — Living Room', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'6c6ddb945_SITTINGROOMGUESTSUITE.jpg', alt: 'Guest Apartment — Sitting Area', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // Kitchenette (11.5' × 8')
  { src: B+'ad2afce57_GUESTSUITEKITCHENETTE.jpg', alt: 'Guest Apartment — Kitchenette', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // Bedroom (11.4' × 11.6', 8.2' ceiling)
  { src: B+'be8ac3158_GUESTSUITETRAYCEILING.jpg', alt: 'Guest Apartment — Bedroom & Tray Ceiling', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // Bath (5.6' × 11.4')
  { src: B+'2f253f546_CUSTOMGLASSTILESHOWER.jpg', alt: 'Guest Apartment — Glass Tile Shower', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },
  { src: B+'bce39fcbc_GUESTSUITEBATHROOM.jpg', alt: 'Guest Apartment — Full Bath', category: 'Second Floor', room: 'Guest Apartment', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // ═══════════════════════════════════════════════════════
  // SECOND FLOOR — Corridors & Stairways
  // ═══════════════════════════════════════════════════════
  { src: B+'14b9d56f2_Architectfeatureslonghallwaywideshotsecondfloor.jpg', alt: 'Upper Corridor — Heart Pine & Skylight', category: 'Second Floor', room: 'Corridors & Stairways' },
  { src: B+'099cb9a82_secondfloorhallway.jpg', alt: 'Second Floor Hallway — Skylights', category: 'Second Floor', room: 'Corridors & Stairways', adjust: ADJ },
  { src: B+'29cac45c9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg', alt: 'Heart Pine Stairway to Guest Suite', category: 'Second Floor', room: 'Corridors & Stairways' },
  { src: B+'2eb818889_centerstairwellhouse.jpg', alt: 'Center Stairwell — Three Finished Levels', category: 'Second Floor', room: 'Corridors & Stairways' },
  { src: B+'c1240cf65_architectqualityhandrails.jpg', alt: 'Architect-Quality Handrails', category: 'Second Floor', room: 'Corridors & Stairways' },
  { src: B+'2e0a2eb05_fromkidwingtocentralstaircasetosecondfloor.jpg', alt: 'Central Staircase from Family Wing', category: 'Second Floor', room: 'Corridors & Stairways', adjust: ADJ },
  { src: B+'41494cfdd_hallwaytokidwing.jpg', alt: 'Heart Pine Corridor to Family Wing', category: 'Second Floor', room: 'Corridors & Stairways', adjust: 'brightness(1.22) contrast(1.05) saturate(0.88) hue-rotate(-4deg)' },

  // ═══════════════════════════════════════════════════════
  // LOWER LEVEL / WALK-OUT BASEMENT (1,709 SF finished)
  // ═══════════════════════════════════════════════════════

  // Recreation Room (31.3' × 17.4', 10.8' tray ceiling)
  // Theater (20.4' × 17.3', 11.9' tray ceiling)
  // Safe Room (7.4' × 6.3' — behind false wall)
  // Mechanical Core: Conditioned Crawl Space (2,531 SF), Geothermal Plant, Water Filtration, Electrical, Solar, Generator
  // (No dedicated interior photos currently available for lower level)

  // ═══════════════════════════════════════════════════════
  // CABANA HOUSE & OUTBUILDINGS
  // First Floor: Garage (20.3'×19.8') → Oahana (18.9'×29.4') → Bunk House (15.1'×11.6') → Walk-In Cooler (7'×9')
  // Future: Sports Court (20'×40', 20.3' ceiling) → Future Bath (13.7'×8.4')
  // Second Floor: Future Living/Dining (19'×30.1') → Future Kitchen → Future Bedroom (13.4'×11.6') → Storage
  // ═══════════════════════════════════════════════════════
  { src: B+'346ee953a_CabanaHouseMain.jpg', alt: 'Cabana House — Front Elevation', category: 'Guest Residence (Cabana House)', room: 'Cabana House' },
  { src: B+'2850d00a4_SideExteriorCabanaHouse.jpg', alt: 'Cabana House — Side Exterior', category: 'Guest Residence (Cabana House)', room: 'Cabana House' },
  { src: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/f6ba866c-4da9-4e83-1ddf-0a8359884a00/public', alt: 'Future Guest Apartment — Unfinished, Ready for Interior Finishes (19\'×30.1\' Living/Dining, 13.4\'×11.6\' Bedroom, Kitchen & Bath, 8.3\' Ceilings)', category: 'Guest Residence (Cabana House)', room: 'Future Guest Apartment' },
  { src: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6e75a23a-4f7c-4034-4ba1-f6ce1f36fa00/public', alt: 'Future Sports Court — 20\'×40\', 20.3\' Ceiling', category: 'Guest Residence (Cabana House)', room: 'Sports Court' },
  { src: B+'d507f3c66_jpegCabana.jpg', alt: 'Cabana House — Floor Plan with Walk-In Cooler (7\'×9\'), Garage, Oahana & Sports Court', category: 'Guest Residence (Cabana House)', room: 'Floor Plan' },

  // ═══════════════════════════════════════════════════════
  // OUTBUILDINGS — Workshop, Greenhouse, Biochar
  // ═══════════════════════════════════════════════════════
  { src: B+'bcd5e803e_FarmWorkshop.jpg', alt: 'Workshop — 1,200 SF Multi-Bay Equipment & Tool Storage', category: 'Outbuildings', room: 'Workshop' },
  { src: B+'10459209f_HighTunnel.jpg', alt: 'High Tunnel — 30\' × 96\' Four-Season Growing Structure', category: 'Outbuildings', room: 'High Tunnel' },
  { src: B+'b5a0967e7_CompostingandBioChar.jpg', alt: 'Biochar & Compost Pavilion — Aerated O2Compost System & Biochar Kiln', category: 'Outbuildings', room: 'Biochar Pavilion' },

  // ═══════════════════════════════════════════════════════
  // EXTERIOR — Main Residence
  // ═══════════════════════════════════════════════════════
  { src: B+'967c6b791_107LindenTrailGrass-65.jpg', alt: 'Main Residence — Front Exterior', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'c52b24ca5_107LindenTrailGrass-67.jpg', alt: 'Main Residence — Brick Steps & Front Door', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'3c2f14dfa_107LindenTrailGrass-66.jpg', alt: 'Main Residence — Entry Portico Detail', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'9dfc3b699_107LindenTrailGrass-74.jpg', alt: 'Main Residence — Screened Porch & Conservatory', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'bc9f57d35_107LindenTrailGrass-81.jpg', alt: 'Main Residence — Rear Compound & Fire Pit', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'fc6c3b2e1_107LindenTrailGrass-77.jpg', alt: 'Main Residence — Side Elevation', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'d0aa34c28_107LindenTrailGrass-63.jpg', alt: '3-Car Garage — Brick Apron', category: 'Exterior', room: '3-Car Garage', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },

  // ═══════════════════════════════════════════════════════
  // ESTATE & LAND
  // ═══════════════════════════════════════════════════════
  { src: B+'c893c1665_Goodcrop.jpg', alt: 'Courtyard & Conservatory — Elevated View', category: 'Exterior', room: 'Main Residence', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'2a1ce3d2a_Drone2.jpg', alt: 'Full Estate Aerial — Residence, Farm & Lake', category: 'Estate & Land' },
  { src: B+'595faa261_107LindenTrail-29.jpg', alt: 'Full Compound Aerial — Residence, Farm & Cabana', category: 'Estate & Land' },
  { src: B+'542bb3bad_107LindenTrailGrass-52.jpg', alt: 'Residence & Cabana — Overhead', category: 'Estate & Land' },
  { src: B+'e75aca465_107LindenTrailGrass-44.jpg', alt: 'Estate & Farm — Summer Green Aerial', category: 'Estate & Land' },
  { src: B+'6a500f8fa_042B2179-3AF2-4F38-8CDB-77F3D7946646_1_201_a.jpg', alt: 'Wide Aerial — Estate, Farm & Lake Beyond', category: 'Estate & Land' },
  { src: B+'1bdea90d6_5EFA6733-BDCF-4B82-99F8-634B29FCDE0C_1_105_c.jpg', alt: 'Aerial — Residence, Cultivation Beds & Workshop', category: 'Estate & Land' },

  { src: B+'554b75d9d_FarmWorkshop.jpg', alt: 'Farm Workshop & High Tunnel', category: 'Estate & Land' },
  { src: B+'c832d59cd_HighTunnel.jpg', alt: 'High Tunnel Aerial', category: 'Estate & Land' },
  { src: B+'7ed3ff619_107LindenTrail-78.jpg', alt: 'Residence from Farm Fields', category: 'Estate & Land' },
  { src: B+'543963574_fruittrees.jpg', alt: 'Citrus & Fruit Trees Under Glass', category: 'Estate & Land' },
  { src: B+'9c58675e2_lemon.jpg', alt: 'Citrus Row — Oranges & Lemons', category: 'Estate & Land' },
  { src: B+'9cd68047f_107LindenTrailGrass-18.jpg', alt: 'Farm Workshop & Woodshed Aerial', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'6612810f9_107LindenTrailGrass-21.jpg', alt: 'Wide Aerial — Estate, Lake & Community', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'67f223885_107LindenTrailGrass-27.jpg', alt: 'Aerial — Full Estate, Farm & Outbuildings', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'94103a05a_107LindenTrailGrass-57.jpg', alt: 'Aerial — Residence, High Tunnel & Lake Beyond', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'0bbd8b8cb_107LindenTrailGrass-70.jpg', alt: 'Covered Woodshed & Fenced Pasture', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'585331166_tunnelgood.jpg', alt: 'High Tunnel Interior — Tomato Rows', category: 'Estate & Land' },
  { src: B+'22f99e725_107LindenTrail-72.jpg', alt: 'Farm Workshop & Equipment Shelter', category: 'Estate & Land', adjust: 'brightness(1.04) contrast(1.01) saturate(0.88) hue-rotate(-2deg)' },
  { src: B+'05473d20c_107LindenTrail-91.jpg', alt: 'Overhead — Roof Detail, Conservatory & Solar Panels', category: 'Estate & Land' },
];

export default GALLERY_DATA;