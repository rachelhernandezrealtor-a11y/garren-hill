/**
 * Gallery walkthrough sequence — organized as a guided private showing.
 *
 * Verified against Robert E. Clark AIA architect plans (HousePlansCombined.pdf):
 *   Sheet 7  — Ground Floor Plan 1/4"=1'-0"
 *   Sheet 8  — Loft Plan 1/4"=1'-0"
 *   Sheet 6  — Roof Plan & Basement Plan
 *   Sheet 19 — Ground Floor Power Plan (room labels)
 *   Sheet 27 — Revised Ground Floor (Addition: Play Room, Bedrooms, Office/Library)
 *
 * GROUND FLOOR spatial flow (as walked from the front door):
 *   Covered Porch → Foyer (center-south entry) → Powder Room (adjacent to foyer)
 *   → Living Room (large central space, masonry fireplace, vaulted trusses)
 *   → Dining Room (adjacent west of living room) → Kitchen (adjacent, with island)
 *   → Scullery (secondary galley off kitchen) → Kitchen Hallway & Desk (to mudroom corridor)
 *   → Conservatory (octagonal glass pavilion, east of kitchen/dining)
 *   → Screened Porch (off living room, south/rear)
 *   → Primary Suite wing (east): Bedroom → Sitting Room → Primary Bath → Walk-In Closet
 *   → Family Wing (west addition per Sheet 27): Office/Library → Play Room → Bedroom 1 + Bath → Bedroom 2 + Bath → Laundry
 *   → Service Wing: Mudroom/Laundry (17.7'×16', vaulted) → 3-Car Garage (west, adjacent)
 *
 * LOFT / SECOND FLOOR (Sheet 8):
 *   Executive Office (over living room, cathedral ceiling, 5 skylights)
 *   → Think Tank / Den → Guest Suite (bedroom + bath)
 *   → Guest Apartment (above mudroom wing): Living → Kitchenette → Bedroom → Bath
 *   → Corridors & Stairways
 *
 * CABANA / OUTBUILDINGS (Sheets 20-25):
 *   Garage → Cabana → Bunk House → Walk-In Cooler → Sports Court → Future Apartment
 *
 * ESTATE & LAND
 */

const WALKTHROUGH_SECTIONS = [

  // ═══════════════════════════════════
  // EXTERIOR — ARRIVAL (approaching from Linden Trail)
  // ═══════════════════════════════════
  {
    key: 'exterior',
    heading: 'Arrival',
    description: 'Brick steps, entry portico, and covered porch — the first impression from Linden Trail.',
    filter: (p) => p.category === 'Exterior' && p.room === 'Main Residence',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — GRAND ENTRANCE
  // Sheet 7: Foyer (center-south) → Powder Room (adjacent)
  // ═══════════════════════════════════
  {
    key: 'foyer',
    heading: 'The Foyer',
    description: 'Reclaimed heart pine herringbone, star pendant, and sitting alcove. The house introduces itself.',
    filter: (p) => p.room === 'Foyer',
  },
  {
    key: 'powder-room',
    heading: 'Powder Room',
    description: 'Gold fixtures, etched basin, and agate tile — directly adjacent to the foyer.',
    filter: (p) => p.room === 'Powder Room',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — MAIN LIVING
  // Sheet 7: Foyer opens north into the Living Room (central, largest space)
  // ═══════════════════════════════════
  {
    key: 'living-room',
    heading: 'Living Room',
    description: '17\' vaulted timber trusses, masonry fireplace, and French doors to the screened porch. The center of the house, fully pre-wired for integrated smart home lighting and audio.',
    filter: (p) => p.room === 'Living Room',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — ENTERTAINING AXIS
  // Sheet 7: Dining is adjacent west of Living Room; Kitchen adjacent to Dining with island between
  // Scullery is a secondary galley off the kitchen; Conservatory is the octagonal glass pavilion east of kitchen/dining
  // ═══════════════════════════════════
  {
    key: 'dining-room',
    heading: 'Dining Room',
    description: 'Vaulted ceiling, sculptural chandelier, and bay windows — sightline through to the living room.',
    filter: (p) => p.room === 'Dining Room',
  },
  {
    key: 'kitchen',
    heading: 'The Kitchen',
    description: 'Wolf 60″ dual-fuel range, four skylights, custom wood workstation sink, and heart pine island. Automated shading and dimming circuits adjust to natural light.',
    filter: (p) => p.room === 'Kitchen',
  },
  {
    key: 'scullery',
    heading: 'Scullery & Pantry',
    description: 'Secondary galley off the kitchen — glass tile backsplash and granite counters. Supported by dedicated refrigeration circuits.',
    filter: (p) => p.room === 'Scullery & Pantry',
  },
  {
    key: 'kitchen-hallway',
    heading: 'Kitchen Hallway & Desk',
    description: 'Heart pine corridor connecting the kitchen to the mudroom, featuring a built-in workstation with integrated communications routing.',
    filter: (p) => p.room === 'Kitchen Hallway & Desk',
  },
  {
    key: 'conservatory',
    heading: 'The Conservatory',
    description: 'Octagonal glass pavilion with timber cupola, granite wet bar, and custom mirrored cabinetry. Pre-wired for motorized shades and climate control.',
    filter: (p) => p.room === 'Conservatory',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — OUTDOOR LIVING
  // Sheet 7: Screened Porch opens off the south side of the Living Room
  // ═══════════════════════════════════
  {
    key: 'screened-porch',
    heading: 'Screened Porch',
    description: 'Three-season living with brick floor and cedar ceiling — accessed through French doors from the living room.',
    filter: (p) => p.room === 'Screened Porch',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — PRIMARY SUITE WING (east side per Sheet 7)
  // Flow: Entry hall → Primary Bedroom → Sitting Room → Master Bath → Walk-In Closet
  // ═══════════════════════════════════
  {
    key: 'primary-suite',
    heading: 'Primary Suite',
    description: 'East wing — cathedral-ceiling bedroom, bay-window sitting room, spa bath with freestanding tub, and granite-top walk-in closet. Features dedicated security, lighting, and climate integration.',
    filter: (p) => p.room === 'Primary Suite',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — FAMILY WING (west addition per Sheet 27)
  // Flow: Office/Library → Vestibule → Play Room → Bedroom 1 + Bath → Bedroom 2 + Bath → Laundry
  // ═══════════════════════════════════
  {
    key: 'family-wing',
    heading: 'Family Wing',
    description: 'West addition — play room, two en-suite bedrooms, and dedicated laundry. Engineered with comprehensive network drops for modern connectivity.',
    filter: (p) => p.room === 'Family Wing',
  },

  // ═══════════════════════════════════
  // GROUND FLOOR — SERVICE WING (Sheet 7, west/north)
  // Mudroom/Laundry connects to 3-Car Garage
  // ═══════════════════════════════════
  {
    key: 'mudroom',
    heading: 'Mudroom & Service Wing',
    description: 'Vaulted ceiling, granite island, farmhouse sink, dual entries, powder room, and laundry.',
    filter: (p) => p.room === 'Mudroom & Service Wing',
  },
  {
    key: 'garage',
    heading: '3-Car Garage',
    description: 'Brick apron, directly adjacent to the mudroom — connects to the service corridor.',
    filter: (p) => p.room === '3-Car Garage',
  },

  // ═══════════════════════════════════
  // SECOND FLOOR — EXECUTIVE LEVEL (Sheet 8)
  // Office is the large room over the living room, with cathedral ceiling and 5 skylights
  // ═══════════════════════════════════
  {
    key: 'executive-office',
    heading: 'Executive Office',
    description: 'Above the living room — cathedral ceiling, timber trusses, bay window, and reading nook. Designed as a connected hub with extensive data and power runs.',
    filter: (p) => p.room === 'Executive Office',
  },

  // ═══════════════════════════════════
  // SECOND FLOOR — UPPER FAMILY WING (Sheet 8)
  // Den / Think Tank → Bedroom + Bath
  // ═══════════════════════════════════
  {
    key: 'think-tank',
    heading: 'Think Tank',
    description: 'Upper-level den — flex room serving as studio, den, or additional bedroom, completely wired for multimedia.',
    filter: (p) => p.room === 'Think Tank / Bedroom',
  },
  {
    key: 'guest-suite',
    heading: 'Guest Suite',
    description: 'Second-floor bedroom with sitting area, full bath, and dedicated thermostat zoning for independent comfort.',
    filter: (p) => p.room === 'Guest Suite',
  },

  // ═══════════════════════════════════
  // SECOND FLOOR — GUEST APARTMENT (Sheet 8, above mudroom wing)
  // Living Room → Kitchenette → Bedroom → Bath
  // ═══════════════════════════════════
  {
    key: 'guest-apartment',
    heading: 'Guest Apartment',
    description: 'Private apartment above the mudroom — living room, kitchenette, bedroom, and bath with independent HVAC control.',
    filter: (p) => p.room === 'Guest Apartment',
  },

  // ═══════════════════════════════════
  // SECOND FLOOR — CORRIDORS & STAIRWAYS
  // ═══════════════════════════════════
  {
    key: 'corridors',
    heading: 'Corridors & Stairways',
    description: 'Heart pine transitions connecting three finished levels, illuminated by recessed lighting on central dimming circuits.',
    filter: (p) => p.room === 'Corridors & Stairways',
  },

  // ═══════════════════════════════════
  // CABANA HOUSE & OUTBUILDINGS (Sheets 20-25)
  // Ground: Garage → Cabana → Bunk House → Walk-In Cooler → Sports Court
  // Loft: Future Living/Dining → Kitchen → Bedroom → Storage
  // ═══════════════════════════════════
  {
    key: 'cabana',
    heading: 'Guest Residence & Outbuildings',
    description: 'Cabana house, workshop, greenhouse, biochar pavilion, high tunnel, and walk-in cooler — supported by their own dedicated electrical load centers.',
    filter: (p) => p.category === 'Guest Residence (Cabana House)' || p.category === 'Outbuildings',
  },

  // ═══════════════════════════════════
  // ESTATE & LAND
  // ═══════════════════════════════════
  {
    key: 'estate',
    heading: 'Estate & Land',
    description: 'Fifteen acres — residence, cabana, farm workshop, high tunnel, and forest. Includes a 1,400 ft double deer fence enclosing ~3 acres, and a 500 ft dog run enclosing ~1 acre with a children\'s tree house on two oak trees.',
    filter: (p) => p.category === 'Estate & Land',
  },
];

export default WALKTHROUGH_SECTIONS;