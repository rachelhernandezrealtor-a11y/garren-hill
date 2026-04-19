const B = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';

const INTERIOR_GALLERY = [
  // ── Foyer ──
  { src: B+'3cd0985c9_foyer.jpg', caption: 'Heart pine underfoot, light overhead', room: 'Foyer' },
  { src: B+'9200678d7_foyer5.jpg', caption: 'Entry door with Civil War–era bullet hole and reclaimed heart pine', room: 'Foyer' },
  { src: B+'e0995354a_foyeryes.jpg', caption: 'The sitting alcove', room: 'Foyer' },
  { src: B+'ba776ed77_foyersection.jpg', caption: 'Gallery and herringbone floor', room: 'Foyer' },
  { src: B+'ba55df291_foyer2.jpg', caption: 'Entry door and star pendant', room: 'Foyer' },
  { src: B+'27a8013d8_architguestpowder.jpg', caption: 'Powder room — agate tile detail', room: 'Foyer' },

  // ── Great Room ──
  { src: B+'a7a7e8ca5_fireplace.jpg', caption: 'Stone, timber, and an honest flame', room: 'Great Room' },
  { src: B+'450bfe180_260115107LindenTrailF-9610.jpg', caption: 'Vaulted beams and reclaimed brick', room: 'Great Room' },
  { src: B+'f84ed29bc_260115107LindenTrailF-9622.jpg', caption: 'Vaulted ceiling and French doors', room: 'Great Room' },
  { src: B+'5843bc809_livingroom.jpg', caption: 'Soaring timber trusses frame the central volume', room: 'Great Room' },
  { src: B+'512ade986_beamliving.jpg', caption: 'Beams and seating — the living room at ease', room: 'Great Room' },

  // ── Kitchen ──
  { src: B+'7dcb51eed_SUNSHINEKITCHEN.jpg', caption: 'Morning light across the work surface', room: 'Kitchen' },
  { src: B+'34a1f0e81_WOLFCLOSEUP.jpg', caption: 'Wolf 60″ dual-fuel range', room: 'Kitchen' },
  { src: B+'223daee20_kitchenok.jpg', caption: 'Workstation sink — reclaimed heart pine', room: 'Kitchen' },
  { src: B+'46690300f_KTOCONS.jpg', caption: 'Through to the conservatory', room: 'Kitchen' },
  { src: B+'64a6417b1_kitchenbar.jpg', caption: 'Bar seating and cabinetry', room: 'Kitchen' },
  { src: B+'2d1d71d3d_KITCHEN2.jpg', caption: 'Full view toward the living room', room: 'Kitchen' },
  { src: B+'59aae5329_KITCHENTOOFFICETOMUD.jpg', caption: 'Through to hallway desk and mudroom', room: 'Kitchen' },

  // ── Conservatory ──
  { src: B+'89e1b25c5_CONSERVATORYBEST.jpg', caption: 'The glass pavilion captures light from every angle', room: 'Conservatory' },
  { src: B+'b87561484_MONEYSHOT.jpg', caption: 'Full-height glazing and timber cupola', room: 'Conservatory' },
  { src: B+'4e0025afb_SUNSHINECONSERVATORY.jpg', caption: 'Sunshine floods the conservatory dining area', room: 'Conservatory' },

  // ── Scullery ──
  { src: B+'67f9055b3_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg', caption: 'Glass tile, granite, polished chrome', room: 'Scullery' },
  { src: B+'816754381_SCULLERY.jpg', caption: 'Wine cooler, Sub-Zero, and mesh-front cabinets', room: 'Scullery' },
  { src: B+'6cb0fef12_SCULLERYSINK.jpg', caption: 'Scullery sink — close-up detail', room: 'Scullery' },
  { src: B+'ffc0435f6_HEARTPINEHALLWAYWITHBUILTINDESK.jpg', caption: 'Heart pine hallway with built-in desk', room: 'Scullery' },

  // ── Dining Room ──
  { src: B+'48fe6f4ea_verticaldiningroom.jpg', caption: 'A sculptural chandelier floats above glass and heart pine', room: 'Dining Room' },
  { src: B+'66fb33bbd_sogoodtolivingroom.jpg', caption: 'Through to the Great Room', room: 'Dining Room' },
  { src: B+'f7988d6a2_DININGROOM.jpg', caption: 'Bay windows flood the alcove with natural light', room: 'Dining Room' },
  { src: B+'8fb2a6e19_dininghori.jpg', caption: 'Dining room — horizontal view', room: 'Dining Room' },

  // ── Screened Porch ──
  { src: B+'ce057eac8_patio2.jpg', caption: 'The screened porch — three-season stillness', room: 'Screened Porch' },
  { src: B+'8157f1ac0_patio.jpg', caption: 'Brick and cedar ceiling', room: 'Screened Porch' },
  { src: B+'65ce09a4c_patio4.jpg', caption: 'View to the grounds', room: 'Screened Porch' },

  // ── Primary Suite ──
  { src: B+'e802ebf12_primary1main.jpg', caption: 'Cathedral ceiling and forest views', room: 'Primary Suite' },
  { src: B+'f5ac70bec_entrancetoprimarty.jpg', caption: 'Primary suite entrance', room: 'Primary Suite' },
  { src: B+'a6faeafb1_primary.jpg', caption: 'Heart pine floors and natural light', room: 'Primary Suite' },
  { src: B+'4e4b52f06_primary1pic2.jpg', caption: 'Cathedral ceiling — open sightlines to the forest', room: 'Primary Suite' },
  { src: B+'b273862dc_tightshotsitroomprimary.jpg', caption: 'Sitting room — bay windows and morning light', room: 'Primary Suite' },
  { src: B+'70363b373_primarywidetositrom.jpg', caption: 'Sitting room — wide view from the bedroom', room: 'Primary Suite' },
  { src: B+'1fdf34b75_spaprimarybath.jpg', caption: 'Primary bath — full spa with freestanding tub', room: 'Primary Suite' },
  { src: B+'d0bb8decd_primarytightshottubandshower.jpg', caption: 'Rain shower and soaking tub', room: 'Primary Suite' },
  { src: B+'dbcdc9712_primarybathgoodtoclosetdoor.jpg', caption: 'Vanity and storage', room: 'Primary Suite' },
  { src: B+'66e66a3e8_architecmasterbathwateron.jpg', caption: 'Agate tile and running water', room: 'Primary Suite' },
  { src: B+'eb3806b6b_closeupcenterislandprimarycloset.jpg', caption: 'Walk-in closet — granite-top center island', room: 'Primary Suite' },
  { src: B+'af5141830_fullshotprimcloset.jpg', caption: 'Full view with built-in cabinetry', room: 'Primary Suite' },
  { src: B+'a32b0b4a1_primaryclosetgreatshot.jpg', caption: 'Custom shelving, shoe wall, and built-in safe', room: 'Primary Suite' },
  { src: B+'24c620f54_PrimarySuiteClosetSafe.jpg', caption: 'Built-in safe — commercial grade', room: 'Primary Suite' },
  { src: B+'54885a55a_joffice2.jpg', caption: 'Private office — accessed through the dressing room', room: 'Primary Suite' },
  { src: B+'76c5b0b70_Jofficeoffcloet.jpg', caption: 'Skylights and reading nook', room: 'Primary Suite' },

  // ── Family Wing ──
  { src: B+'41494cfdd_hallwaytokidwing.jpg', caption: 'Heart pine corridor — the family wing begins', room: 'Family Wing' },
  { src: B+'db4f2b48a_tojoffice.jpg', caption: 'Bay window and heart pine', room: 'Family Wing' },
  { src: B+'81cc68968_Winglivingroom.jpg', caption: 'Play room — heart pine and French doors', room: 'Family Wing' },
  { src: B+'2e0a2eb05_fromkidwingtocentralstaircasetosecondfloor.jpg', caption: 'Central staircase from the family wing', room: 'Family Wing' },
  { src: B+'d811031de_wingbedroom1.jpg', caption: 'Bedroom suite one', room: 'Family Wing' },
  { src: B+'d945fdb8e_wingbathroomgood.jpg', caption: 'Ensuite bath — granite vanity', room: 'Family Wing' },
  { src: B+'5279bb41d_wingbathroom.jpg', caption: 'Bath 1 — frameless glass shower', room: 'Family Wing' },
  { src: B+'7c844edec_wingbathroomshowerglasstilecustom.jpg', caption: 'Custom glass tile shower', room: 'Family Wing' },
  { src: B+'3687126be_wingbedroom2.jpg', caption: 'Bedroom suite two', room: 'Family Wing' },
  { src: B+'a72e07aaf_260115107LindenTrailF-9658.jpg', caption: 'Bedroom 2 — heart pine and natural light', room: 'Family Wing' },
  { src: B+'016342efb_kidbed21pic.jpg', caption: 'Bedroom 2 — creative workspace', room: 'Family Wing' },
  { src: B+'986652c1b_verticalshotkid2glassshower.jpg', caption: 'Ensuite bath 2 — glass shower', room: 'Family Wing' },
  { src: B+'2374b0e06_kidbath2wide.jpg', caption: 'Second bath — dark cherry vanity', room: 'Family Wing' },
  { src: B+'20564d8f5_laundrytoom.jpg', caption: 'Laundry room — Whirlpool, subway tile', room: 'Family Wing' },
  { src: B+'d24a92375_laundryroom2.jpg', caption: 'Laundry — washer and farmhouse sink', room: 'Family Wing' },
  { src: B+'5a8a11144_laundryperk.jpg', caption: 'Built-in ironing board', room: 'Family Wing' },

  // ── Mudroom ──
  { src: B+'59881eba8_260115107LindenTrailF-9475-2.jpg', caption: 'The mudroom — 17-foot vaulted ceilings', room: 'Mudroom' },
  { src: B+'e480e9280_MUDROOMLAUNDRY.jpg', caption: 'Washer, dryer, and deep farm sink', room: 'Mudroom' },
  { src: B+'683c4a65a_MUDDPOWDERROOM.jpg', caption: 'Mudroom powder room', room: 'Mudroom' },
  { src: B+'b94cc0247_MUDROOM3.jpg', caption: 'Heart pine coat racks', room: 'Mudroom' },
  { src: B+'6759b6410_MUDROOM.jpg', caption: 'Entry from the garage', room: 'Mudroom' },
  { src: B+'29cac45c9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg', caption: 'Heart pine stairway to guest apartment', room: 'Mudroom' },

  // ── Upper Level ──
  { src: B+'099cb9a82_secondfloorhallway.jpg', caption: 'Second floor hallway — skylights overhead', room: 'Upper Level' },
  { src: B+'c1240cf65_architectqualityhandrails.jpg', caption: 'Architect-quality handrails', room: 'Upper Level' },
  { src: B+'2eb818889_centerstairwellhouse.jpg', caption: 'Center stairwell — three finished levels', room: 'Upper Level' },
  { src: B+'2497b7226_fullbathsecondarchitshotwithwindow.jpg', caption: 'Hall bath — vanity and skylight', room: 'Upper Level' },
  { src: B+'9fbe3964b_fullbathsecondfloorshowertub.jpg', caption: 'Hall bath — shower and tub', room: 'Upper Level' },
  { src: B+'c907521e8_fullbathsecondfloor.jpg', caption: 'Hall bath — full vanity', room: 'Upper Level' },
  { src: B+'f6b8bb6bb_markofficemoneyshot.jpg', caption: 'Executive office — cathedral ceiling, timber trusses', room: 'Upper Level' },
  { src: B+'0374dfba9_architecmarkofficetallbeampic.jpg', caption: 'Vaulted beams and workspace', room: 'Upper Level' },
  { src: B+'98155bdd6_markoffice1.jpg', caption: 'Custom desk and shelving', room: 'Upper Level' },
  { src: B+'3213e3625_nookinthinktankshowingwindows.jpg', caption: 'Think tank — reading nook and skylights', room: 'Upper Level' },
  { src: B+'c27c0bc25_thinktankmain.jpg', caption: 'Think tank — flex room', room: 'Upper Level' },
  { src: B+'7b6193607_thinktankorbedroom2.jpg', caption: 'Think tank — alternative view', room: 'Upper Level' },
  { src: B+'b38315480_GuestSuiteSecondFloor.jpg', caption: 'Guest suite — open to living room below', room: 'Upper Level' },
  { src: B+'55048435a_GuestSuite2.jpg', caption: 'Guest suite — bedroom sitting area', room: 'Upper Level' },
  { src: B+'a00bbd3ff_GuestSuite3.jpg', caption: 'Guest suite — reading nook', room: 'Upper Level' },
  { src: B+'95203cc47_GUESTSUITESITTINGROOM.jpg', caption: 'Guest apartment — living room', room: 'Upper Level' },
  { src: B+'6c6ddb945_SITTINGROOMGUESTSUITE.jpg', caption: 'Guest apartment — sitting area', room: 'Upper Level' },
  { src: B+'ad2afce57_GUESTSUITEKITCHENETTE.jpg', caption: 'Kitchenette — stainless appliances', room: 'Upper Level' },
  { src: B+'be8ac3158_GUESTSUITETRAYCEILING.jpg', caption: 'Guest bedroom — tray ceiling', room: 'Upper Level' },
  { src: B+'2f253f546_CUSTOMGLASSTILESHOWER.jpg', caption: 'Guest apartment — glass tile shower', room: 'Upper Level' },
  { src: B+'bce39fcbc_GUESTSUITEBATHROOM.jpg', caption: 'Guest apartment — full bath', room: 'Upper Level' },

  // ── Lower Level ──
  { src: B+'f2b3b20a3_walkoutbasement.jpg', caption: 'Walk-out lower level', room: 'Lower Level' },
  { src: B+'e3e772f98_MechanicalRoom.jpg', caption: 'Commercial water filtration', room: 'Lower Level' },
  { src: B+'6b2985178_CrawlspaceHvac.jpg', caption: 'Five geothermal zones, twenty wells at 300 feet', room: 'Lower Level' },
  { src: B+'7b98519f8_CrawlSpaceSolarBatteries.jpg', caption: '14.3 kW solar battery backup', room: 'Lower Level' },
  { src: B+'4167f4d9e_MechanicalRoom3.jpg', caption: '600-amp service, 189 dimming circuits', room: 'Lower Level' },
  { src: B+'3c4adc2bb_DoorSaferemoveitems.jpg', caption: 'Brown Safe vault door', room: 'Lower Level' },
];

export const ROOMS = [
  'All',
  'Foyer',
  'Great Room',
  'Kitchen',
  'Conservatory',
  'Scullery',
  'Dining Room',
  'Screened Porch',
  'Primary Suite',
  'Family Wing',
  'Mudroom',
  'Upper Level',
  'Lower Level',
];

export default INTERIOR_GALLERY;