/*
 * Room Tour Data — defines the walkthrough sequence.
 * Each room becomes its own gallery page, connected by
 * cinematic bridge transitions at the bottom.
 */

const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const ROOMS = [
  /* ─── 1. Foyer ─── */
  {
    slug: 'foyer',
    category: 'Entry & Living',
    title: 'The Foyer',
    label: 'Stepping Inside',
    whisper: 'Heart pine underfoot, light overhead. The residence begins here.',
    heroImage: B + '955343688_foyer.jpg',
    heroAlt: 'The Foyer — heart pine and light',
    description: '9.4\' × 12.9\', 8.3\' ceiling. The front door — reclaimed heart pine with a Civil War–era bullet hole — opens onto herringbone floors and a star pendant overhead.',
    images: [
      { src: B + '3cd0985c9_foyer.jpg', caption: 'Heart pine underfoot, light overhead' },
      { src: B + '9200678d7_foyer5.jpg', caption: 'Entry door with Civil War–era bullet hole and reclaimed heart pine' },
      { src: B + 'e0995354a_foyeryes.jpg', caption: 'The sitting alcove' },
      { src: B + 'ba776ed77_foyersection.jpg', caption: 'Gallery and herringbone floor' },
      { src: B + 'ba55df291_foyer2.jpg', caption: 'Entry door and star pendant' },
      { src: B + '27a8013d8_architguestpowder.jpg', caption: 'Powder room — agate tile detail' },
    ],
  },

  /* ─── 2. Great Room ─── */
  {
    slug: 'great-room',
    category: 'Entry & Living',
    title: 'The Great Room',
    label: 'Volume & Light',
    whisper: 'Stone, timber, and an honest flame. The heart of the house.',
    heroImage: B + '13b7514e8_fireplace.jpg',
    heroAlt: 'The Great Room — stone hearth and timber trusses',
    description: '27.5\' × 23.8\', 17\' vaulted ceiling. Exposed timber trusses, masonry fireplace, and French doors opening to the screened porch.',
    images: [
      { src: B + 'a7a7e8ca5_fireplace.jpg', caption: 'Stone, timber, and an honest flame' },
      { src: B + '450bfe180_260115107LindenTrailF-9610.jpg', caption: 'Vaulted beams and reclaimed brick' },
      { src: B + 'f84ed29bc_260115107LindenTrailF-9622.jpg', caption: 'Vaulted ceiling and French doors' },
      { src: B + '5843bc809_livingroom.jpg', caption: 'Soaring timber trusses frame the central volume' },
      { src: B + '512ade986_beamliving.jpg', caption: 'Beams and seating — the living room at ease' },
    ],
  },

  /* ─── 3. Kitchen ─── */
  {
    slug: 'kitchen',
    category: 'Kitchen & Dining',
    title: 'The Kitchen',
    label: 'Built to Nourish',
    whisper: 'Four skylights, a Wolf 60-inch range, and sightlines through to the conservatory.',
    heroImage: B + '7dcb51eed_SUNSHINEKITCHEN.jpg',
    heroAlt: 'The Kitchen — morning light',
    description: '19.4\' × 15.6\', 18\' trayed ceiling. Wolf 60″ dual-fuel range, Sub-Zero integrated columns, granite counters, dual dishwashers, and a workstation sink built into reclaimed heart pine.',
    details: [
      { label: 'Range', note: 'Wolf 60″ dual fuel stove and ovens (6-burners, griddle, grill, warming drawer)' },
      { label: 'Refrigeration', note: 'Sub-Zero refrigerator, freezer, and refrigerator/freezer combo' },
      { label: 'Island', note: 'Butcher-block top, prep sink, seating' },
      { label: 'Counters', note: 'Granite throughout, honed finish' },
      { label: 'Dishwashers', note: '2 KitchenAid dishwashers, concealed panels' },
      { label: 'Skylights', note: 'Four overhead, flooding the island' },
    ],
    images: [
      { src: B + '7dcb51eed_SUNSHINEKITCHEN.jpg', caption: 'Morning light across the work surface' },
      { src: B + '34a1f0e81_WOLFCLOSEUP.jpg', caption: 'Wolf 60″ dual-fuel range — commercial power, residential refinement' },
      { src: B + '223daee20_kitchenok.jpg', caption: 'Workstation sink — integrated into reclaimed heart pine' },
      { src: B + '46690300f_KTOCONS.jpg', caption: 'Through to the conservatory' },
      { src: B + '64a6417b1_kitchenbar.jpg', caption: 'Bar seating and cabinetry' },
      { src: B + '2d1d71d3d_KITCHEN2.jpg', caption: 'Full view toward the living room' },
      { src: B + '59aae5329_KITCHENTOOFFICETOMUD.jpg', caption: 'Through to hallway desk and mudroom' },
    ],
  },

  /* ─── 4. Conservatory ─── */
  {
    slug: 'conservatory',
    category: 'Kitchen & Dining',
    title: 'The Conservatory',
    label: 'Glass, Timber, Sky',
    whisper: 'An octagonal glass pavilion with its own geothermal zone — year-round comfort open to sky and landscape on every side.',
    heroImage: B + '89e1b25c5_CONSERVATORYBEST.jpg',
    heroAlt: 'The Conservatory — glass pavilion',
    description: '19.5\' × 17.7\', 19.3\' vaulted ceiling. Timber-and-glass cupola, granite wet bar, screened porch access, and custom mirrored millwork.',
    images: [
      { src: B + '89e1b25c5_CONSERVATORYBEST.jpg', caption: 'The glass pavilion captures light from every angle.' },
      { src: B + 'b87561484_MONEYSHOT.jpg', caption: 'Full-height glazing and timber cupola — the jewel of the residence.' },
      { src: B + '4e0025afb_SUNSHINECONSERVATORY.jpg', caption: 'Sunshine floods the conservatory dining area.' },
    ],
  },

  /* ─── 5. Scullery ─── */
  {
    slug: 'scullery',
    category: 'Kitchen & Dining',
    title: 'The Scullery',
    label: 'Behind the Kitchen',
    whisper: 'Glass tile, granite, polished chrome — a secondary galley built for serious entertaining.',
    heroImage: B + '67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg',
    heroAlt: 'The Scullery — glass tile backsplash',
    description: '9.5\' × 6.2\' galley. Sub-Zero wine cooler, secondary fridge, mesh-front cabinets.',
    details: [
      { label: 'Sink', note: 'Stainless undermount, commercial sprayer' },
      { label: 'Counters', note: 'Granite, matched to principal kitchen' },
      { label: 'Backsplash', note: 'Custom glass tile mosaic' },
      { label: 'Appliances', note: 'Sub-Zero wine cooler, secondary fridge' },
      { label: 'Cabinets', note: 'Mesh-front uppers, soft-close' },
      { label: 'Layout', note: '9.5′ × 6.2′ galley, pass-through' },
    ],
    images: [
      { src: B + '67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg', caption: 'Glass tile, granite, polished chrome — the scullery matches every surface of the principal kitchen.' },
      { src: B + '816754381_SCULLERY.jpg', caption: 'Wine cooler, Sub-Zero, and mesh-front cabinets line a galley built for serious entertaining.' },
      { src: B + '6cb0fef12_SCULLERYSINK.jpg', caption: 'Scullery sink — close-up detail.' },
      { src: B + 'ffc0435f6_HEARTPINEHALLWAYWITHBUILTINDESK.jpg', caption: 'Heart pine hallway with built-in desk — command central between kitchen and mudroom.' },
    ],
  },

  /* ─── 6. Dining Room ─── */
  {
    slug: 'dining-room',
    category: 'Kitchen & Dining',
    title: 'The Dining Room',
    label: 'Unhurried Evenings',
    whisper: 'A sculptural chandelier floats above glass and heart pine.',
    heroImage: B + '48fe6f4ea_verticaldiningroom.jpg',
    heroAlt: 'The Dining Room — chandelier and heart pine',
    description: '21.6\' × 11.6\', 16.3\' vaulted ceiling. Bay windows and sightlines through to the Great Room.',
    images: [
      { src: B + '48fe6f4ea_verticaldiningroom.jpg', caption: 'A sculptural chandelier floats above glass and heart pine' },
      { src: B + '66fb33bbd_sogoodtolivingroom.jpg', caption: 'Through to the Great Room — timber trusses and fireplace beyond' },
      { src: B + 'f7988d6a2_DININGROOM.jpg', caption: 'Bay windows flood the alcove with natural light' },
      { src: B + '8fb2a6e19_dininghori.jpg', caption: 'Dining room — horizontal view across the vaulted space' },
    ],
  },

  /* ─── 7. Screened Porch ─── */
  {
    slug: 'screened-porch',
    category: 'Entry & Living',
    title: 'The Screened Porch',
    label: 'Three-Season Living',
    whisper: 'Brick and cedar ceiling — protected outdoor living.',
    heroImage: B + 'ce057eac8_patio2.jpg',
    heroAlt: 'The Screened Porch — three-season stillness',
    description: '26.6\' × 11.1\', 9.4\' ceiling. Accessible from the Great Room and Conservatory.',
    images: [
      { src: B + 'ce057eac8_patio2.jpg', caption: 'The screened porch — three-season stillness' },
      { src: B + '8157f1ac0_patio.jpg', caption: 'Brick and cedar ceiling — protected outdoor living' },
      { src: B + '65ce09a4c_patio4.jpg', caption: 'View to the grounds from the screened porch' },
    ],
  },

  /* ─── 8. Primary Suite ─── */
  {
    slug: 'primary-suite',
    category: 'Primary Suite',
    title: 'The Primary Suite',
    label: 'A Private Wing',
    whisper: 'Filtered water from a private well. Music in the bath. A retreat that answers to no one.',
    heroImage: B + 'e802ebf12_primary1main.jpg',
    heroAlt: 'The Primary Suite — vaulted ceiling and forest views',
    description: '19.6\' × 18.5\', 15.8\' cathedral ceiling. Its own geothermal zone keeps the air perfect year-round. The spa bath draws from a 50-gpm private well through commercial-grade filtration — every drop clean, soft, and cold. Whole-home audio fills the soaking tub with music at a touch. Bedroom, sitting room, walk-in closet with granite island, and a private office reached by its own staircase.',
    images: [
      { src: B + 'e802ebf12_primary1main.jpg', caption: 'The Primary Suite — vaulted ceiling and forest views' },
      { src: B + 'a6faeafb1_primary.jpg', caption: 'Heart pine floors and natural light — the suite\'s own geothermal zone keeps the air still and perfect' },
      { src: B + '4e4b52f06_primary1pic2.jpg', caption: 'Cathedral ceiling — open sightlines to the forest canopy beyond' },
      { src: B + 'b273862dc_tightshotsitroomprimary.jpg', caption: 'Sitting room — bay windows, morning light, and whole-home audio at a touch' },
      { src: B + '70363b373_primarywidetositrom.jpg', caption: 'Sitting room — wide view from the bedroom' },
      { src: B + '1fdf34b75_spaprimarybath.jpg', caption: 'The spa bath — freestanding tub fed by private well (up to 50 gpm) with commercial filtration, music overhead' },
      { src: B + 'd0bb8decd_primarytightshottubandshower.jpg', caption: 'Rain shower and soaking tub — agate tile throughout, every drop from the estate\'s own aquifer' },
      { src: B + 'dbcdc9712_primarybathgoodtoclosetdoor.jpg', caption: 'Vanity and storage — door to the walk-in closet beyond' },
      { src: B + '66e66a3e8_architecmasterbathwateron.jpg', caption: 'Fresh water, agate tile, and quiet — the everyday luxury of a private well' },
      { src: B + 'eb3806b6b_closeupcenterislandprimarycloset.jpg', caption: 'Walk-in closet — granite-top center island, 189 dimmable circuits light even this room' },
      { src: B + 'af5141830_fullshotprimcloset.jpg', caption: 'Full view — built-in cabinetry, shoe wall, and concealed safe' },
      { src: B + 'a32b0b4a1_primaryclosetgreatshot.jpg', caption: 'Custom shelving and built-in safe — commercial grade' },
      { src: B + '54885a55a_joffice2.jpg', caption: 'Private office — accessed through the dressing room, skylights overhead' },
      { src: B + '76c5b0b70_Jofficeoffcloet.jpg', caption: 'Skylights and reading nook — the quietest corner of the house' },
      { src: B + '421162842_tojoffice.jpg', caption: 'Glass-paneled French doors — the boundary between the primary wing and the family wing beyond' },
    ],
  },

  /* ─── 9. Family Wing ─── */
  {
    slug: 'family-wing',
    category: 'Family Wing',
    title: 'The Family Wing',
    label: 'Room to Grow',
    whisper: 'Two ensuite bedrooms, playroom, study, and laundry — a distinct wing for privacy.',
    heroImage: B + '41494cfdd_hallwaytokidwing.jpg',
    heroAlt: 'The Family Wing — heart pine corridor',
    description: 'Study (15.5\' × 12.1\'), Play Room (13.6\' × 24.6\'), two ensuite bedrooms, and laundry.',
    images: [
      { src: B + '41494cfdd_hallwaytokidwing.jpg', caption: 'Heart pine corridor — the path narrows, the house quiets, and the family wing begins.' },
      { src: B + 'db4f2b48a_tojoffice.jpg', caption: 'Bay window and heart pine — the office from above.' },
      { src: B + '81cc68968_Winglivingroom.jpg', caption: 'Play room — 13.6\' × 24.6\'. Heart pine, ceiling fans, and glass-paneled French doors.' },
      { src: B + '2e0a2eb05_fromkidwingtocentralstaircasetosecondfloor.jpg', caption: 'Central staircase from the family wing — connects all three levels.' },
      { src: B + 'd811031de_wingbedroom1.jpg', caption: 'Bedroom suite one — 13.6\' × 11.6\'. Roman shades, reading nook, and forest views.' },
      { src: B + 'd945fdb8e_wingbathroomgood.jpg', caption: 'Ensuite bath — granite vanity, custom cherry cabinetry.' },
      { src: B + '5279bb41d_wingbathroom.jpg', caption: 'Bath 1 wide view — frameless glass shower.' },
      { src: B + '7c844edec_wingbathroomshowerglasstilecustom.jpg', caption: 'Custom glass tile shower detail.' },
      { src: B + '3687126be_wingbedroom2.jpg', caption: 'Bedroom suite two — 13.6\' × 11.5\'.' },
      { src: B + 'a72e07aaf_260115107LindenTrailF-9658.jpg', caption: 'Bedroom 2 — heart pine and natural light.' },
      { src: B + '016342efb_kidbed21pic.jpg', caption: 'Bedroom 2 — creative workspace.' },
      { src: B + '986652c1b_verticalshotkid2glassshower.jpg', caption: 'Ensuite bath 2 — glass shower.' },
      { src: B + '2374b0e06_kidbath2wide.jpg', caption: 'Second bath — dark cherry vanity with granite countertop.' },
      { src: B + '20564d8f5_laundrytoom.jpg', caption: 'The laundry room — one of 2 sets of Whirlpool washers and steam dryers, subway tile, and custom cabinetry.' },
      { src: B + 'd24a92375_laundryroom2.jpg', caption: 'Laundry — washer and farmhouse sink.' },
      { src: B + '5a8a11144_laundryperk.jpg', caption: 'Built-in ironing board — one of the details that define this house.' },
    ],
  },

  /* ─── 10. Mudroom & Service Wing ─── */
  {
    slug: 'mudroom',
    category: 'Service & Infrastructure',
    title: 'The Mudroom',
    label: 'Service Wing',
    whisper: '17-foot vaulted ceilings, clerestory windows, and a granite island at the center.',
    heroImage: B + '59881eba8_260115107LindenTrailF-9475-2.jpg',
    heroAlt: 'The Mudroom — vaulted ceiling and clerestory windows',
    description: '17.7\' × 16\', 17.8\' vaulted ceiling. Connects the 3-car garage to the kitchen axis.',
    images: [
      { src: B + '59881eba8_260115107LindenTrailF-9475-2.jpg', caption: 'The mudroom — 17-foot vaulted ceilings, clerestory windows, and a granite island at the center of it all.' },
      { src: B + 'e480e9280_MUDROOMLAUNDRY.jpg', caption: 'Second set of Whirlpool washers and steam dryers with a deep farm sink — set beneath picture windows.' },
      { src: B + '683c4a65a_MUDDPOWDERROOM.jpg', caption: 'Mudroom powder room — herringbone tile and walk-in shower.' },
      { src: B + 'b94cc0247_MUDROOM3.jpg', caption: 'Heart pine coat racks and built-in storage.' },
      { src: B + '6759b6410_MUDROOM.jpg', caption: 'Entry from the garage — Dutch door, slate tile.' },
      { src: B + '29cac45c9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg', caption: 'Heart pine stairway — ascending to the guest apartment above the mudroom wing.' },
    ],
  },

  /* ─── 11. Upper Level ─── */
  {
    slug: 'upper-level',
    category: 'Upper Level',
    title: 'The Upper Level',
    label: 'Ascending',
    whisper: 'Office, think tank, guest suites, and a self-contained apartment — the second floor is its own world.',
    heroImage: B + '099cb9a82_secondfloorhallway.jpg',
    heroAlt: 'Second floor hallway — skylights overhead',
    description: 'Office (19.5\' × 18.9\', 16.3\' cathedral), den, guest suite, and independent guest apartment.',
    images: [
      { src: B + '099cb9a82_secondfloorhallway.jpg', caption: 'Second floor hallway — skylights overhead.' },
      { src: B + 'c1240cf65_architectqualityhandrails.jpg', caption: 'Architect-quality handrails. Every joint, every turn considered.' },
      { src: B + '2eb818889_centerstairwellhouse.jpg', caption: 'The center stairwell — three finished levels connected by heart pine.' },
      { src: B + '2497b7226_fullbathsecondarchitshotwithwindow.jpg', caption: 'Hall bath — vanity and skylight.' },
      { src: B + '9fbe3964b_fullbathsecondfloorshowertub.jpg', caption: 'Hall bath — shower and tub.' },
      { src: B + 'c907521e8_fullbathsecondfloor.jpg', caption: 'Hall bath — full vanity.' },
      { src: B + 'f6b8bb6bb_markofficemoneyshot.jpg', caption: 'The executive office — 16-foot cathedral ceiling, timber trusses, ten dimmable circuits.' },
      { src: B + '0374dfba9_architecmarkofficetallbeampic.jpg', caption: 'Vaulted beams and workspace.' },
      { src: B + '98155bdd6_markoffice1.jpg', caption: 'Custom desk and shelving.' },
      { src: B + '3213e3625_nookinthinktankshowingwindows.jpg', caption: 'Think tank — reading nook and skylights.' },
      { src: B + 'c27c0bc25_thinktankmain.jpg', caption: 'The think tank — flex room that converts to a private bedroom.' },
      { src: B + '7b6193607_thinktankorbedroom2.jpg', caption: 'Think tank — alternative view.' },
      { src: B + 'b38315480_GuestSuiteSecondFloor.jpg', caption: 'Guest suite — open to living room below.' },
      { src: B + '55048435a_GuestSuite2.jpg', caption: 'Guest suite — bedroom sitting area.' },
      { src: B + 'a00bbd3ff_GuestSuite3.jpg', caption: 'Guest suite — bedroom reading nook.' },
    ],
  },

  /* ─── 12. Guest Apartment ─── */
  {
    slug: 'guest-apartment',
    category: 'Upper Level',
    title: 'The Guest Apartment',
    label: 'Above the Mudroom',
    whisper: 'A self-contained apartment with its own kitchenette, bedroom, bath, and living room — reached by heart pine stairway.',
    heroImage: B + '95203cc47_GUESTSUITESITTINGROOM.jpg',
    heroAlt: 'The Guest Apartment — living room',
    description: 'APT. Living Room (17.5\' × 11.5\'), kitchenette, bedroom (11.4\' × 11.6\'), and full bath. Accessed via stairway from the mudroom wing — a completely independent residence above.',
    images: [
      { src: B + '95203cc47_GUESTSUITESITTINGROOM.jpg', caption: 'Guest apartment — living room.' },
      { src: B + '6c6ddb945_SITTINGROOMGUESTSUITE.jpg', caption: 'Guest apartment — sitting area with heart pine floors.' },
      { src: B + 'ad2afce57_GUESTSUITEKITCHENETTE.jpg', caption: 'Kitchenette — stainless appliances and open shelving.' },
      { src: B + 'be8ac3158_GUESTSUITETRAYCEILING.jpg', caption: 'Guest bedroom — tray ceiling and forest views.' },
      { src: B + '2f253f546_CUSTOMGLASSTILESHOWER.jpg', caption: 'Guest apartment — custom glass tile shower.' },
      { src: B + 'bce39fcbc_GUESTSUITEBATHROOM.jpg', caption: 'Guest apartment — full bath.' },
    ],
  },

  /* ─── 13. Lower Level ─── */
  {
    slug: 'lower-level',
    category: 'Service & Infrastructure',
    title: 'The Private Infrastructure Core',
    label: 'Infrastructure & Possibility',
    whisper: '600 amps. 189 dimmable circuits. Five geothermal zones. The mechanical heart of the estate.',
    heroImage: B + 'e3e772f98_MechanicalRoom.jpg',
    heroAlt: 'The mechanical core — commercial water filtration',
    description: 'Beneath the estate lies a partially finished, fully encapsulated, and conditioned lower level designed to support over 12,000 square feet of integrated living space. Engineered for resilience, independence, and long-term performance—with an open canvas ready to be customized.',
    images: [
      { src: B + 'e3e772f98_MechanicalRoom.jpg', caption: 'Clear Water Solutions commercial filtration. Private well (50 gpm), 2x 1500 gal septic tanks.' },
      { src: B + '6b2985178_CrawlspaceHvac.jpg', caption: 'HVAC by Harry Boody: Geothermal loop (20x 300ft wells), 5 Water Furnace zones, Lennox purification, ERV system.' },
      { src: B + '7b98519f8_CrawlSpaceSolarBatteries.jpg', caption: '14.3 kW solar array (61 Samsung panels) feeds a Sunny Island 10k battery backup (batteries offline).' },
      { src: B + '4167f4d9e_MechanicalRoom3.jpg', caption: '30 kW Kohler generator (2x 1000 gal propane tanks). Dual VacuMaid S2400 central vac, Control 4 smart home system.' },
      { src: B + '3c4adc2bb_DoorSaferemoveitems.jpg', caption: 'Brown Safe (jewelry + vault door) — commercial-grade secure storage.' },
    ],
  },
];

export default ROOMS;