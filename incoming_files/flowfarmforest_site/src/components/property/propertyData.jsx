const TOUR = {
  interior: "https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&",
  exterior: "https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a"
};

const IMG = {
  foyer1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public",
  foyer2: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/f6d4f225-fac8-4702-a4fa-0a32538ba000/public",

  living1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public",
  living2: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public",
  living3: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/3ea36a81-abc3-48b7-bf95-5dbddd664900/public",
  living4: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/7581b09c-9215-4bf9-73da-6b220e9b6400/public",

  dining1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public",

  kitchen1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public",
  kitchen2: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/00b098c8-fea7-4300-bf34-6c2f557dd200/public",
  kitchen3: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c8ebe094-9daf-4314-12b3-88a9c3503d00/public",
  kitchen4: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1506879b-aa01-4825-3f65-b6b560d9ea00/public",
  kitchen5: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/0c256e92-6641-4575-5407-c9eea2793e00/public",
  kitchen6: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/5de6bd94-77f1-43d1-7308-b13022f6db00/public",
  kitchen7: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1ea7117a-c0af-4dce-9ac2-56f941482600/public",
  kitchen8: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/5a49df66-bc37-4fb2-24ff-cb0730b79200/public",
  kitchen9: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/77a7a793-2256-49f4-f213-0eba0932f000/public",

  conservatory1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public",
  conservatory2: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public",
  conservatory3: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6482459c-9f90-4821-b6e3-043f45097500/public",
  conservatory4: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c06c87de-e815-4718-1171-fc714d8eb800/public",

  detail1: "https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/cb256b09-c335-4179-5ac0-edb492ef2500/public"
};

export const propertyData = {
  residence: {
    kicker: "Main Residence",
    title: "Architectural gravity, smart-home orchestration, hospitality-ready flow.",
    chips: [
      { label: "Foyer", href: "#ff-room-foyer" },
      { label: "Grand Living", href: "#ff-room-living" },
      { label: "Dining", href: "#ff-room-dining" },
      { label: "Kitchen + Scullery", href: "#ff-room-kitchen" },
      { label: "Conservatory", href: "#ff-room-conservatory" },
      { label: "Craftsmanship", href: "#ff-room-detail" }
    ],
    hero: {
      group: "living",
      image: {
        src: IMG.living1,
        alt: "Grand Living Room with vaulted ceiling and architectural beams",
        caption: "Grand Living Room • Vaulted volume • Signature beams"
      }
    },
    stats: [
      { key: "Above Grade", value: "8,519 SF", sub: "finished heated living space" },
      { key: "Lower Level", value: "1,709 SF", sub: "partially finished walk-out" },
      { key: "Design Intent", value: "Hospitality", sub: "retreat-ready flow + privacy" },
      { key: "Smart Estate", value: "Control4", sub: "audio • video • lighting scenes" }
    ],
    actions: [
      { label: "Virtual Tour Interior", href: TOUR.interior, style: "outline" }
    ],
    note: "Measurements follow NC Residential Square Footage Guidelines (listing purposes, effective 11/24/2025).",
    body: [
      `Designed by acclaimed architect <strong>Robert Clark</strong> as one of his final works, the residence is a culminating expression of proportion, flow, and livable grandeur. It encompasses <strong>8,519 SF</strong> above grade, plus <strong>1,709 SF</strong> of partially finished walk-out lower level, and an additional <strong>2,531 SF conditioned crawl space</strong> with accessible mechanical systems.`,
      `The first floor is anchored by a grand central living room measuring <strong>27.5' × 23.8'</strong> with a <strong>17' vaulted ceiling</strong>, flowing into a sunken formal dining room and a gourmet kitchen supported by pantry and service spaces. A glass-wrapped conservatory (<strong>19.5' × 17.7'</strong>) acts as a luminous hinge between interior luxury and the regenerative landscape beyond.`,
      `The primary suite occupies a private wing with a cathedral-ceiling bedroom, dedicated sitting room, spa-style bath, and an exceptional dressing room (<strong>WIC 11.7' × 21.7'</strong>). Throughout, reclaimed Civil War-era heart pine is custom-laid in artisan patterns—extended through bedrooms, hallways, and even closets. This is comprehensive craftsmanship.`
    ],
    smartHome: {
      kicker: "Smart Home + Enterprise-Grade Connectivity",
      title: "A residence that performs like a modern campus.",
      body: `Entire-house sound system with speakers in every room. Multi-tier lighting in every room (dimmers, spotlights, scenes) automated via phone or wall switch. Whole-home <strong>Control4</strong> audio, video, and lighting orchestration. <strong>Enterprise-grade Araknis networking</strong> ensures secure, estate-wide connectivity—supporting both private living and commercial-scale operations.`,
      tags: ["Whole-home audio", "Lighting scenes", "Control4 platform", "Araknis network"]
    },
    miniGrid: [
      {
        title: "Kitchen & Hosting",
        text: `Sub-Zero refrigeration suite (refrigerator, freezer, combo, wine cooler), Wolf 60" dual-fuel range with griddle/grill, double ovens + warming drawer, and two KitchenAid dishwashers.`
      },
      {
        title: "Resilience & Systems",
        text: "30 kW Kohler generator with 2 × 1,000-gallon buried propane tanks; 14.3 kW solar array (61 Samsung panels); private well up to 50 gpm."
      },
      {
        title: "Geothermal + Air Quality",
        text: "20 deep geothermal wells (approx. 300' each) feeding five HVAC zones (WaterFurnace), Lennox air purification, ERV fresh air circulation."
      },
      {
        title: "Security + Connectivity",
        text: "Whole-house alarm, fire sprinkler infrastructure, Brown Safe jewelry vault, whole-campus Wi\u2011Fi, Control4 smart home platform."
      }
    ],
    rooms: [
      {
        id: "ff-room-foyer",
        group: "foyer",
        kicker: "Welcoming Foyer",
        sub: "Arrival sequence • First impressions",
        text: "A gracious entry that sets the tone—clean sightlines, warm materials, and a calm sense of arrival.",
        previewLabel: "Preview Foyer Photos",
        gallery: [
          { src: IMG.foyer1, alt: "Welcoming foyer", caption: "Welcoming foyer" },
          { src: IMG.foyer2, alt: "Foyer detail", caption: "Foyer detail" }
        ]
      },
      {
        id: "ff-room-living",
        group: "living",
        kicker: "Grand Living Room",
        sub: "27.5\u2019 \u00d7 23.8\u2019 • 17\u2019 vaulted ceiling • Signature beams",
        text: "A dramatic central volume that establishes the home\u2019s scale and architectural presence.",
        previewLabel: "Preview Living Room Gallery",
        gallery: [
          { src: IMG.living1, alt: "Grand living room", caption: "Grand living room" },
          { src: IMG.living2, alt: "Living detail", caption: "Living detail" },
          { src: IMG.living3, alt: "Living angle", caption: "Living angle" },
          { src: IMG.living4, alt: "Living perspective", caption: "Living perspective" }
        ]
      },
      {
        id: "ff-room-dining",
        group: "dining",
        kicker: "Formal Dining Room",
        sub: "Seamless flow from living to kitchen",
        text: "Designed for long-table hosting with effortless connection to the home\u2019s culinary core.",
        openLabel: "Open Dining Photo",
        gallery: [
          { src: IMG.dining1, alt: "Formal dining room", caption: "Formal dining room" }
        ]
      },
      {
        id: "ff-room-kitchen",
        group: "kitchen",
        kicker: "Chef\u2019s Kitchen + Scullery",
        sub: "Wolf • Sub\u2011Zero • KitchenAid • Eat\u2011in bar • Service capacity",
        text: `A gourmet kitchen anchored by an eat-in bar and premium appliances—including a <strong>Wolf 60" dual fuel range</strong> with 6 burners, griddle, grill, ovens, and warming drawer, plus <strong>two KitchenAid dishwashers</strong>. Extensive built-ins and an oversized scullery/pantry support daily living and large-scale entertaining, with multiple <strong>Sub\u2011Zero</strong> refrigeration solutions including a wine cooler.`,
        previewLabel: "Preview Kitchen + Scullery Gallery",
        gallery: [
          { src: IMG.kitchen1, alt: "Kitchen overview", caption: "Kitchen overview" },
          { src: IMG.kitchen2, alt: "Kitchen angle", caption: "Kitchen angle" },
          { src: IMG.kitchen3, alt: "Kitchen detail", caption: "Kitchen detail" },
          { src: IMG.kitchen4, alt: "Kitchen detail", caption: "Kitchen detail" },
          { src: IMG.kitchen5, alt: "Kitchen detail", caption: "Kitchen detail" },
          { src: IMG.kitchen6, alt: "Kitchen detail", caption: "Kitchen detail" },
          { src: IMG.kitchen7, alt: "Kitchen detail", caption: "Kitchen detail" },
          { src: IMG.kitchen8, alt: "Scullery / Sub\u2011Zero", caption: "Scullery / Sub\u2011Zero" },
          { src: IMG.kitchen9, alt: "Scullery / refrigeration", caption: "Scullery / refrigeration" }
        ]
      },
      {
        id: "ff-room-conservatory",
        group: "conservatory",
        kicker: "Glass\u2011Wrapped Conservatory",
        sub: "Vaulted ceilings • Natural light • Landscape views",
        text: "A tranquil, light-filled conservatory extends from the main living areas—bringing natural light deep into the home and creating a serene space overlooking the surrounding landscape.",
        previewLabel: "Preview Conservatory Gallery",
        gallery: [
          { src: IMG.conservatory1, alt: "Conservatory", caption: "Conservatory" },
          { src: IMG.conservatory2, alt: "Conservatory detail", caption: "Conservatory detail" },
          { src: IMG.conservatory3, alt: "Conservatory angle", caption: "Conservatory angle" },
          { src: IMG.conservatory4, alt: "Conservatory perspective", caption: "Conservatory perspective" }
        ]
      },
      {
        id: "ff-room-detail",
        group: "detail",
        kicker: "Craftsmanship Detail",
        sub: "Built\u2011in hallway desk • Pattern\u2011laid heart pine",
        text: "A built\u2011in workspace set into the hallway showcases the home\u2019s pattern\u2011laid heart pine—detail-level execution carried throughout the residence.",
        openLabel: "Open Detail Photo",
        gallery: [
          { src: IMG.detail1, alt: "Built-in hallway desk with pattern-laid heart pine", caption: "Built-in hallway desk with pattern-laid heart pine" }
        ]
      }
    ],
    tagline: "A residence that reads like a private home — and performs like a hospitality estate."
  },

  mainHouse: {
    hero: {
      image: IMG.living1,
      title: "Architectural Presence, Everyday Ease",
      copy: "The home\u2019s core living spaces are anchored by soaring ceilings and a natural indoor-outdoor flow, with a private primary wing and flexible guest/auxiliary suites for staff, visitors, or programming.",
      gallery: "mainhouse-highlights"
    },
    stats: [
      { key: "Above Grade", value: "8,519 SF", sub: "finished heated living space" },
      { key: "Lower Level", value: "1,709 SF", sub: "partially finished walk-out" },
      { key: "Garage", value: "3-Car", sub: "attached + direct access" },
      { key: "Flexible Living", value: "Apt Suite", sub: "kitchenette + living + bath" }
    ],
    signatureSpaces: [
      "<strong>Grand Living Room</strong> (approx. 27.5\u2019 x 23.8\u2019) with a dramatic <strong>17\u2019 vaulted ceiling</strong>",
      "<strong>Glass-wrapped Conservatory</strong> (approx. 19.5\u2019 x 17.7\u2019) with vaulted ceiling volume",
      "<strong>Formal Dining Room</strong> (approx. 21.6\u2019 x 11.6\u2019) designed for long-table hosting",
      "<strong>Chef\u2019s Kitchen + Scullery/Pantry</strong> built for daily flow and scaled entertaining",
      "<strong>Screened Porch</strong> (approx. 26.6\u2019 x 11.1\u2019) for seamless indoor-outdoor living",
      "<strong>Private Primary Wing</strong> with sitting room, spa bath, and oversized dressing room",
      "<strong>Walk-out Lower Level</strong> with theater + recreation + secure safe room"
    ],
    featured: {
      group: "mainhouse-highlights",
      intro: "Living, kitchen, conservatory, dining, and craftsmanship highlights—each clickable into the shared lightbox gallery.",
      images: [
        { src: IMG.living1, alt: "Grand living room highlight", caption: "Main House Highlights • Grand Living Room" },
        { src: IMG.kitchen1, alt: "Chef\u2019s kitchen highlight", caption: "Chef\u2019s kitchen highlight" },
        { src: IMG.conservatory1, alt: "Conservatory highlight", caption: "Glass-wrapped conservatory highlight" },
        { src: IMG.dining1, alt: "Dining highlight", caption: "Formal dining room highlight" },
        { src: IMG.detail1, alt: "Craftsmanship highlight", caption: "Craftsmanship detail highlight" }
      ]
    },
    strip: [
      {
        label: "Hosting",
        title: "Entertain without effort",
        copy: "A central great room, dining, kitchen, conservatory, and porch arranged like a well-rehearsed orchestra."
      },
      {
        label: "Privacy",
        title: "Retreat-level separation",
        copy: "The primary wing lives apart from the home\u2019s social heart, with additional suites for guests or staff."
      },
      {
        label: "Flexibility",
        title: "Built for real life (and big visions)",
        copy: "Office, den, bonus/flex rooms, apartment suite, and a lower level ready for programming or play."
      }
    ],
    note: "Measurements and totals are based on NC Residential Square Footage Guidelines (listing purposes, effective 11/24/2025).",
    ctas: [
      { kind: "link", label: "Explore Interior Tour", href: TOUR.interior, style: "primary" },
      { kind: "link", label: "Explore Exterior Tour", href: TOUR.exterior, style: "secondary" },
      { kind: "gallery", label: "Open Photo Gallery", gallery: "mainhouse-highlights", style: "secondary" }
    ]
  }
};