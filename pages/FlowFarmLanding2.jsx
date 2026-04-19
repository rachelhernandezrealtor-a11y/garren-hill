import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#BFA274';
const DARK = '#0a0a0a';

const NAV_LINKS = ['Story', 'Residence', 'Gallery', 'Estate', 'Systems', 'Location', 'FAQ', 'Contact'];

const PHOTOS = {
  hero: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg',
  exterior: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  highTunnel: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  compost: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg',
  cabana: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  foyer: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
  foyer2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/f6d4f225-fac8-4702-a4fa-0a32538ba000/public',
  living1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  living3: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/3ea36a81-abc3-48b7-bf95-5dbddd664900/public',
  living4: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/7581b09c-9215-4bf9-73da-6b220e9b6400/public',
  dining: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public',
  kitchen1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  kitchen2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/00b098c8-fea7-4300-bf34-6c2f557dd200/public',
  kitchen3: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c8ebe094-9daf-4314-12b3-88a9c3503d00/public',
  kitchen4: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1506879b-aa01-4825-3f65-b6b560d9ea00/public',
  kitchen5: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/0c256e92-6641-4575-5407-c9eea2793e00/public',
  conservatory1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  conservatory3: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6482459c-9f90-4821-b6e3-043f45097500/public',
  conservatory4: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/c06c87de-e815-4718-1171-fc714d8eb800/public',
  detail: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/cb256b09-c335-4179-5ac0-edb492ef2500/public',
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
  cabana3: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/dfe672f3-7ffd-4022-ab32-d6b43db4cb00/public',
  cabana4: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/7ff76c9c-10c3-465c-1cf0-a11e765a5b00/public',
};

const GALLERY_PHOTOS = [
  PHOTOS.exterior, PHOTOS.foyer, PHOTOS.foyer2, PHOTOS.living1, PHOTOS.living2,
  PHOTOS.living3, PHOTOS.living4, PHOTOS.dining, PHOTOS.kitchen1, PHOTOS.kitchen2,
  PHOTOS.kitchen3, PHOTOS.kitchen4, PHOTOS.kitchen5, PHOTOS.conservatory1,
  PHOTOS.conservatory2, PHOTOS.conservatory3, PHOTOS.conservatory4, PHOTOS.detail,
  PHOTOS.cabana, PHOTOS.cabana2, PHOTOS.cabana3, PHOTOS.cabana4,
  PHOTOS.highTunnel, PHOTOS.workshop, PHOTOS.compost, PHOTOS.grounds,
];

const STRUCTURES = [
  {
    label: 'Main Residence',
    tag: 'Robert Clark AIA',
    sf: '8,519 SF',
    desc: '6 beds, 7 baths. Reclaimed Civil War-era heart pine floors. Glass conservatory with octagonal skylight dome. Sub-Zero + Wolf 60" kitchen. Geothermal HVAC. 30kW generator. 14.3kW solar. Control4 smart home.',
    img: PHOTOS.exterior,
  },
  {
    label: 'Cabana House',
    tag: 'Guest Retreat',
    sf: 'Private Suite',
    desc: 'Fully private guest retreat with 1 bed, 1 bath, full kitchen, and private entrance. Complete separation from main residence with its own living space.',
    img: PHOTOS.cabana,
  },
  {
    label: 'High Tunnel Greenhouse',
    tag: 'Agricultural',
    sf: "96' x 36'",
    desc: 'Custom climate battery geothermal heating. Year-round specialty crops -- pineapples, avocados, and citrus. Four Season Tools construction.',
    img: PHOTOS.highTunnel,
  },
  {
    label: 'Farm Workshop',
    tag: 'Infrastructure',
    sf: "30' x 40'",
    desc: 'Fully operational with plumbing, electrical, and walk-in cooler. 1,400ft double deer fencing enclosing 3 certified acres.',
    img: PHOTOS.workshop,
  },
  {
    label: 'Composting + Biochar',
    tag: 'Regenerative Systems',
    sf: 'Covered Structure',
    desc: 'O2Compost covered aerated system. Biochar kiln under covered structure with I-beam and chain hoist. Closed-loop regenerative waste management.',
    img: PHOTOS.compost,
  },
  {
    label: '3-Acre Veganic Farm',
    tag: 'USDA Agricultural',
    sf: '3 of 15 Acres',
    desc: 'USDA-zoned veganic operation with certified organic practices. 7 additional buildable acres. Transferable farm infrastructure and all operational systems.',
    img: PHOTOS.grounds,
  },
];

const SYSTEMS_DATA = [
  {
    label: 'Energy Independence',
    icon: 'bolt',
    items: [
      '30kW Kohler generator + 2x 1,000 gal buried propane tanks',
      '14.3kW solar array -- 61 Samsung panels',
      'Sunny Island 10k solar battery backup',
      'Geothermal loop: 20 deep wells x 300 ft each',
      '1,200 amp total power capacity',
    ],
  },
  {
    label: 'Climate Systems',
    icon: 'temp',
    items: [
      '5-zone Water Furnace geothermal HVAC',
      'Energy Recovery Ventilator system',
      'Lennox air purification on each zone',
      '2x Water Furnace superheater geothermal hot water',
      'Fully conditioned + sealed crawl space',
    ],
  },
  {
    label: 'Water + Safety',
    icon: 'drop',
    items: [
      'Private well up to 50 gpm',
      'Whole house commercial water filtration (Clear Water Solutions)',
      'Private septic 2x 1,500 gal with pump',
      'Whole house fire sprinkler system',
      'Brown Safe jewelry + vault door',
    ],
  },
  {
    label: 'Smart Home',
    icon: 'home',
    items: [
      'Control4 audio, video, and lighting throughout',
      'Whole campus Wi-Fi (Araknis enterprise networking)',
      'Whole house alarm system',
      'Dual VacuMaid S2400 central vacuum system',
      'Energy efficient insulation + mylar wrap whole house',
    ],
  },
  {
    label: 'Gourmet Kitchen',
    icon: 'chef',
    items: [
      'Sub-Zero refrigerator, freezer, fridge/freezer combo + wine cooler',
      'Wolf 60" dual fuel -- 6 burners, griddle, grill + warming drawer',
      '2 KitchenAid dishwashers',
      '2 sets Whirlpool washers + steam dryers',
      'Full scullery with additional prep space',
    ],
  },
  {
    label: 'Farm + Land',
    icon: 'leaf',
    items: [
      "High tunnel greenhouse 96'x36' (Four Season Tools)",
      'Custom climate battery geothermal for high tunnel heating',
      "Operational farm workshop 30'x40' with walk-in cooler",
      "Children's treehouse on two oak trees",
      "1,400 ft double deer fence + 500 ft dog run fence",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: 'Is the Pinehurst golf membership transferable?',
    a: 'Yes. A Pinehurst Country Club Signature Golf Membership transfers with the sale, providing unlimited access to Course No. 7 and No. 9 -- the same course that has hosted the US Open multiple times.',
  },
  {
    q: 'What is the agricultural tax status?',
    a: 'The property carries USDA agricultural zoning with 3 acres in active veganic farm operation, qualifying for favorable agricultural tax positioning. An additional 7 buildable acres offer significant expansion opportunity.',
  },
  {
    q: 'How far is the property from Pinehurst?',
    a: 'Flow Farm is approximately 3 miles from the Historic Village of Pinehurst. Multiple private access points via Linden Trail, Linden Road, Mollie Lane, and Skene Lane provide discretion and flexibility.',
  },
  {
    q: 'What airport access is available?',
    a: 'Moore County Regional Airport for private aviation is minutes away. Raleigh-Durham International Airport is approximately 1 hour. FirstHealth Moore Regional Hospital provides premier medical access.',
  },
  {
    q: 'Is the farm fully operational?',
    a: 'Yes. The 3-acre veganic farm is fully operational with certified infrastructure: high tunnel greenhouse, O2Compost aerated composting, biochar kiln, and farm workshop. All systems and equipment transfer with the property.',
  },
  {
    q: 'What energy backup systems are in place?',
    a: 'The estate operates with complete energy independence: 30kW Kohler generator with 2x 1,000 gallon buried propane tanks, 14.3kW solar array with 61 Samsung panels, Sunny Island 10k solar battery backup, and a geothermal loop of 20 wells each 300 feet deep.',
  },
  {
    q: 'Are there development or subdivision rights?',
    a: 'Yes. The 15-acre estate includes 7 buildable acres with favorable zoning that offers enterprise, agritourism, and future expansion potential. Multiple road frontages create subdivision flexibility.',
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid rgba(191,162,116,0.2)` : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, padding: '0 2rem' }}>
        <span style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Flow Farm</span>
        <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }}>
          {NAV_LINKS.slice(0, -1).map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
            >{link}</button>
          ))}
        </div>
        <button onClick={() => scrollTo('contact')} style={{
          background: 'transparent', border: `1px solid ${GOLD}`,
          color: GOLD, padding: '0.5rem 1.4rem', fontSize: '0.68rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
          fontFamily: 'sans-serif', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = '#000'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = GOLD; }}
        >Private Inquiry</button>
      </div>
    </nav>
  );
}

function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="story" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#000' }}>

      {/* Full bleed video */}
      <div style={{ position: 'absolute', inset: '-6%', opacity: videoReady ? 1 : 0, transition: 'opacity 2s ease' }}>
        <iframe
          src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setVideoReady(true)}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 'max(177.78vh, 100vw)', height: 'max(56.25vw, 100vh)',
            transform: 'translate(-50%, -50%)', border: 'none',
          }}
        />
      </div>
      {!videoReady && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${PHOTOS.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}

      {/* Dark gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)' }} />

      {/* Address bar top */}
      <div style={{
        position: 'absolute', top: 90, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '1.2rem', zIndex: 10,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>107 Linden Trail, Aberdeen, NC</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem' }}>|</span>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>3 Miles From Pinehurst</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem' }}>|</span>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Pinehurst ETJ</span>
      </div>

      {/* Main hero content - left aligned like original */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '0 6vw', paddingTop: '9rem', paddingBottom: '7rem',
      }}>
        <h1 style={{
          color: '#fff',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: '1.2rem',
          lineHeight: 1.1,
          marginBottom: '0.4rem',
          textShadow: '0 4px 60px rgba(0,0,0,0.5)',
          maxWidth: 820,
        }}>
          Agritourism<br />Established.<br />Legacy Ready.
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.6rem',
          lineHeight: 1.7,
          fontFamily: 'sans-serif',
          maxWidth: 520,
          marginBottom: '0.6rem',
        }}>
          Fifteen acres of working farmland, forest, and a fully self-sustaining compound -- three miles from Pinehurst Resort. Transferable Pinehurst Country Club membership available.
        </p>
        <button onClick={() => scrollTo('residence')} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.55)',
          color: '#fff', padding: '0.4rem 1rem', fontSize: '0.5rem',
          letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer',
          fontFamily: 'sans-serif', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
        >Enter Flow Farm</button>
      </div>

      {/* Stat tickers bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
        display: 'flex', alignItems: 'stretch',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
      }}>
        {[
          { num: '15', label: 'USDA Acres' },
          { num: '7', label: 'Buildable Acres' },
          { num: '3', label: 'Acre Veganic Farm' },
          { num: '$5.25M', label: 'Offered At' },
        ].map((stat, i, arr) => (
          <div key={stat.label} style={{
            flex: 1, padding: '0.3rem 0.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
          }}>
            <span style={{
              color: '#fff',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
          fontSize: '0.75rem',
              lineHeight: 1,
          marginBottom: '0.1rem',
            }}>{stat.num}</span>
            <span style={{
              color: 'rgba(255,255,255,0.55)',
          fontSize: '0.4rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}>{stat.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}

function StorySection() {
  return (
    <section id="story-detail" style={{ background: DARK, padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        <div>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'sans-serif' }}>The Property</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.2, marginBottom: '2rem' }}>
            Flow Farm: A Foundation<br />for What Comes Next.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem', fontFamily: 'sans-serif' }}>
            A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury. Fifteen acres of private land, three miles from the Historic Village of Pinehurst -- operating farm, world-class residence, and investment-grade infrastructure in a single offering.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '2.5rem', fontFamily: 'sans-serif' }}>
            Designed by Robert E. Clark AIA in one of his final commissions, the main residence anchors 15 acres of curated land with six total structures, complete energy independence, and a transferable Pinehurst Country Club Signature Golf Membership with unlimited access to Course No. 7 and No. 9.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              ['15', 'Total Acres'],
              ['6', 'Structures'],
              ['8,519', 'SF Residence'],
              ['1,200', 'Amp Power'],
            ].map(([num, label]) => (
              <div key={label} style={{ borderTop: `1px solid rgba(191,162,116,0.25)`, paddingTop: '1rem' }}>
                <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '2rem', marginBottom: '0.25rem' }}>{num}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img src={PHOTOS.exterior} alt="Flow Farm Estate" style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', bottom: '-2rem', left: '-2rem',
            background: DARK, border: `1px solid rgba(191,162,116,0.2)`,
            padding: '1.5rem 2rem',
          }}>
            <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.4rem' }}>Pinehurst Country Club</p>
            <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}>Signature Golf Membership Included</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'sans-serif', marginTop: '0.3rem' }}>Unlimited access -- Course No. 7 + No. 9</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResidenceSection() {
  const [activeTab, setActiveTab] = useState('Living Room');
  const rooms = [
    { label: 'Living Room', imgs: [PHOTOS.living1, PHOTOS.living2, PHOTOS.living3, PHOTOS.living4], desc: "27.5' x 23.8' grand living room with 17' vaulted ceiling and reclaimed Civil War-era heart pine floors. Custom-laid artisan patterns throughout." },
    { label: 'Kitchen', imgs: [PHOTOS.kitchen1, PHOTOS.kitchen2, PHOTOS.kitchen3, PHOTOS.kitchen4, PHOTOS.kitchen5], desc: "Gourmet kitchen with full scullery. Sub-Zero refrigerator, freezer, fridge/freezer combo + wine cooler. Wolf 60\" dual fuel stove with 6 burners, griddle, grill + warming drawer. 2 KitchenAid dishwashers." },
    { label: 'Conservatory', imgs: [PHOTOS.conservatory1, PHOTOS.conservatory2, PHOTOS.conservatory3, PHOTOS.conservatory4], desc: "19.5' x 17.7' glass-wrapped conservatory with octagonal skylight dome. A signature architectural element flooding the residence with natural light year-round." },
    { label: 'Foyer', imgs: [PHOTOS.foyer, PHOTOS.foyer2], desc: 'Grand entrance foyer setting the tone for the entire residence. Heart pine floors, soaring ceilings, and meticulous millwork detail throughout.' },
    { label: 'Dining', imgs: [PHOTOS.dining], desc: 'Formal dining room with custom heart pine floors and seamless connection to the gourmet kitchen and living spaces.' },
  ];
  const active = rooms.find(r => r.label === activeTab);
  const [imgIndex, setImgIndex] = useState(0);

  const handleTab = (label) => { setActiveTab(label); setImgIndex(0); };

  return (
    <section id="residence" style={{ background: '#0d0d0d', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Main Residence</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>8,519 Square Feet of Considered Design</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Robert E. Clark AIA -- 6 Bedrooms -- 7 Bathrooms</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {rooms.map(r => (
            <button key={r.label} onClick={() => handleTab(r.label)} style={{
              background: activeTab === r.label ? GOLD : 'transparent',
              border: `1px solid ${activeTab === r.label ? GOLD : 'rgba(255,255,255,0.2)'}`,
              color: activeTab === r.label ? '#000' : 'rgba(255,255,255,0.6)',
              padding: '0.5rem 1.4rem', fontSize: '0.68rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'all 0.2s',
            }}>{r.label}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src={active.imgs[imgIndex]} alt={activeTab} style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} />
            {active.imgs.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {active.imgs.map((img, i) => (
                  <div key={i} onClick={() => setImgIndex(i)} style={{
                    width: 60, height: 45, cursor: 'pointer', border: imgIndex === i ? `2px solid ${GOLD}` : '2px solid transparent',
                    overflow: 'hidden', flexShrink: 0,
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ padding: '2rem 0' }}>
            <h3 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.8rem', marginBottom: '1.5rem' }}>{activeTab}</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontSize: '0.95rem', fontFamily: 'sans-serif', marginBottom: '2rem' }}>{active.desc}</p>
            <div style={{ borderTop: `1px solid rgba(191,162,116,0.2)`, paddingTop: '1.5rem' }}>
              <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>Residence Features</p>
              {['Reclaimed Civil War-era heart pine throughout', 'Glass conservatory with octagonal skylight dome', 'Geothermal climate control -- 5 zones', '30kW generator + 14.3kW solar array', 'Control4 smart home -- audio, video, lighting', 'Primary suite WIC 11.7\' x 21.7\''].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span style={{ color: GOLD, fontSize: '0.5rem', marginTop: '0.45rem' }}>&#9632;</span>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" style={{ background: DARK, padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Photo Gallery</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>The Estate</h2>
        </div>
        <div style={{ columns: '4 240px', gap: '0.75rem' }}>
          {GALLERY_PHOTOS.map((src, i) => (
            <div key={i} onClick={() => setLightbox(i)} style={{ breakInside: 'avoid', marginBottom: '0.75rem', cursor: 'pointer', overflow: 'hidden' }}>
              <img src={src} alt="Flow Farm" loading="lazy" style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }}>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length); }} style={{
            position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2rem',
            cursor: 'pointer', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>&#8249;</button>
          <img src={GALLERY_PHOTOS[lightbox]} alt="Flow Farm" style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain' }} />
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_PHOTOS.length); }} style={{
            position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2rem',
            cursor: 'pointer', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>&#8250;</button>
          <button onClick={() => setLightbox(null)} style={{
            position: 'fixed', top: '1.5rem', right: '1.5rem',
            background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer',
          }}>&#10005;</button>
          <p style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
            {lightbox + 1} / {GALLERY_PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  );
}

function EstateSection() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const PINS = [
    {
      label: "Main Residence",
      tag: "Robert Clark AIA",
      sf: "8,519 SF",
    top: "22%", left: "52%",
      desc: "6 beds, 7 baths. Reclaimed Civil War-era heart pine floors throughout. Glass conservatory with octagonal skylight dome. Sub-Zero + Wolf 60\" dual fuel kitchen with full scullery. Control4 smart home.",
      img: PHOTOS.exterior,
      systems: ["20 Geothermal Wells x 300 ft", "14.3 kW Solar + Battery Backup", "30kW Kohler Generator", "Control4 Audio/Video/Lighting", "5-Zone Water Furnace HVAC", "1,200 Amp Power", "Whole House Fire Sprinkler", "Commercial Water Filtration"],
      matterport: "https://my.matterport.com/show/?m=xZRfSiQPuQ8",
      color: "#BFA274",
    },
    {
      label: "Cabana House",
      tag: "Guest Retreat",
      sf: "Private Suite",
    top: "38%", left: "60%",
      desc: "Fully private guest retreat with 1 bed, 1 bath, full kitchen, and private entrance. Solar panels on roof. Connected to estate-wide geothermal, water filtration, and smart home systems.",
      img: PHOTOS.cabana,
      systems: ["Solar Panel Array", "Geothermal Connected", "Private Entrance", "Full Kitchen", "Campus Wi-Fi", "Water Filtration"],
      matterport: null,
      color: "#BFA274",
    },
    {
      label: "3-Acre Veganic Farm",
      tag: "USDA Agricultural",
      sf: "3 of 15 Acres",
    top: "18%", left: "68%",
      desc: "USDA-zoned veganic operation with certified organic practices. 1,400 ft double deer fence. 7 additional buildable acres with multiple road frontages. Agritourism eligible.",
      img: PHOTOS.grounds,
      systems: ["USDA Agricultural Zoning", "1,400 ft Double Deer Fence", "Private Well 50 gpm", "Closed-Loop Composting", "7 Buildable Acres", "Agritourism Eligible"],
      matterport: null,
      color: "#7BAE7F",
    },
    {
      label: "High Tunnel",
      tag: "Greenhouse 96 x 36 ft",
      sf: "Four Season Tools",
    top: "64%", left: "54%",
      desc: "Custom climate battery geothermal air-to-soil heating. Year-round specialty crop production including pineapples, avocados, and citrus.",
      img: PHOTOS.highTunnel,
      systems: ["Geothermal Air-to-Soil Heat", "Year-Round Production", "Pineapple + Avocado + Citrus", "Connected to Walk-In Cooler", "Four Season Tools Build"],
      matterport: null,
      color: "#7BAE7F",
    },
    {
      label: "Farm Workshop",
      tag: "Infrastructure Hub",
      sf: "30 x 40 ft",
    top: "76%", left: "48%",
      desc: "Fully operational with full plumbing, electrical, and 12x8 walk-in cooler. Central hub connecting high tunnel, compost, and biochar operations.",
      img: PHOTOS.workshop,
      systems: ["12x8 Walk-In Cooler", "Full Plumbing + Electrical", "I-Beam + Chain Hoist", "O2Compost Hub", "Biochar Kiln Access", "Deer Fence Perimeter"],
      matterport: null,
      color: "#BFA274",
    },
    {
      label: "Compost + Biochar",
      tag: "Regenerative Systems",
      sf: "Covered Structure",
    top: "76%", left: "58%",
      desc: "O2Compost aerated composting and biochar kiln under covered structure with I-beam and chain hoist. Fully closed-loop regenerative waste system feeding back to the veganic farm.",
      img: PHOTOS.compost,
      systems: ["O2Compost Aerated System", "Biochar Kiln", "I-Beam + Chain Hoist", "Closed-Loop Waste Mgmt", "Feeds Veganic Farm", "Covered Structure"],
      matterport: null,
      color: "#7BAE7F",
    },
  ];

  return (
    <section id="estate" style={{ background: "#000", padding: "8rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "sans-serif" }}>Six Structures</p>
          <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "0.75rem" }}>A Complete Private Estate</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em" }}>Click any structure to explore</p>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <img src={PHOTOS.aerial} alt="Flow Farm Estate Aerial" style={{ width: "100%", display: "block", height: "auto" }} />

        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)" }} />

        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(191,162,116,0.6), 0 0 0 0 rgba(191,162,116,0.3); }
            70% { box-shadow: 0 0 0 8px rgba(191,162,116,0), 0 0 0 16px rgba(191,162,116,0); }
            100% { box-shadow: 0 0 0 0 rgba(191,162,116,0), 0 0 0 0 rgba(191,162,116,0); }
          }
          @keyframes pulsegn {
            0% { box-shadow: 0 0 0 0 rgba(123,174,127,0.6), 0 0 0 0 rgba(123,174,127,0.3); }
            70% { box-shadow: 0 0 0 8px rgba(123,174,127,0), 0 0 0 16px rgba(123,174,127,0); }
            100% { box-shadow: 0 0 0 0 rgba(123,174,127,0), 0 0 0 0 rgba(123,174,127,0); }
          }
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(-50%) translateX(-12px); }
            to { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
        `}</style>

        {PINS.map((pin, i) => (
          <div key={pin.label} style={{ position: "absolute", top: pin.top, left: pin.left, transform: "translate(-50%, -50%)", zIndex: 10 }}>
            <div
              onClick={() => setActive(active === i ? null : i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
            >
              <div style={{
                width: active === i ? 18 : hovered === i ? 16 : 12,
                height: active === i ? 18 : hovered === i ? 16 : 12,
                borderRadius: "50%",
                background: pin.color,
                border: "2px solid rgba(255,255,255,0.9)",
                animation: active === i ? "none" : (pin.color === "#7BAE7F" ? "pulsegn 2s infinite" : "pulse 2s infinite"),
                transition: "all 0.2s",
                boxShadow: active === i ? ("0 0 20px " + pin.color + ", 0 0 40px " + pin.color + "44") : "none",
              }} />
              <div style={{
                background: active === i ? "rgba(191,162,116,0.15)" : "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid " + (active === i ? pin.color : "rgba(255,255,255,0.2)"),
                padding: "0.25rem 0.6rem",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}>
                <span style={{ color: active === i ? pin.color : "rgba(255,255,255,0.85)", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "sans-serif" }}>{pin.label}</span>
              </div>
            </div>
          </div>
        ))}

        {active !== null && (
          <div style={{
            position: "absolute", top: "50%", left: "2%",
            transform: "translateY(-50%)",
            width: 310,
            background: "rgba(6,6,6,0.82)",
            backdropFilter: "blur(28px) saturate(1.4)",
            border: "1px solid rgba(191,162,116,0.2)",
            boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
            zIndex: 30,
            overflow: "hidden",
            animation: "cardIn 0.25s ease-out",
          }}>
            <div style={{ position: "relative" }}>
              <img src={PINS[active].img} alt={PINS[active].label} style={{ width: "100%", height: 155, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(6,6,6,0.9) 100%)" }} />
              <div style={{ position: "absolute", bottom: "0.75rem", left: "1.25rem" }}>
                <p style={{ color: PINS[active].color, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.2rem" }}>{PINS[active].tag}</p>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.15rem" }}>{PINS[active].label}</h3>
              </div>
            </div>
            <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.76rem", lineHeight: 1.75, fontFamily: "sans-serif", marginBottom: "1rem" }}>{PINS[active].desc}</p>
              <p style={{ color: "rgba(191,162,116,0.5)", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.55rem" }}>Connected Systems</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: PINS[active].matterport ? "1rem" : 0 }}>
                {PINS[active].systems.map(s => (
                  <span key={s} style={{
                    background: "rgba(191,162,116,0.07)",
                    border: "1px solid rgba(191,162,116,0.18)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.58rem",
                    padding: "0.2rem 0.5rem",
                    fontFamily: "sans-serif",
                    letterSpacing: "0.04em",
                  }}>{s}</span>
                ))}
              </div>
              {PINS[active].matterport && (
                <a href={PINS[active].matterport} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", width: "100%", marginTop: "1rem",
                  background: "linear-gradient(135deg, rgba(191,162,116,0.12), rgba(191,162,116,0.04))",
                  border: "1px solid " + GOLD,
                  color: GOLD, padding: "0.6rem", fontSize: "0.6rem",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "sans-serif",
                  textDecoration: "none", textAlign: "center", boxSizing: "border-box",
                  transition: "all 0.2s",
                }}>Launch Virtual 3D Tour</a>
              )}
            </div>
            <button onClick={() => setActive(null)} style={{
              position: "absolute", top: "0.6rem", right: "0.6rem",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)", width: 26, height: 26,
              cursor: "pointer", fontSize: "0.8rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>x</button>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {PINS.map((pin, i) => (
            <button key={pin.label} onClick={() => setActive(active === i ? null : i)} style={{
              background: active === i ? "rgba(191,162,116,0.12)" : "transparent",
              border: "1px solid " + (active === i ? GOLD : "rgba(255,255,255,0.15)"),
              color: active === i ? GOLD : "rgba(255,255,255,0.4)",
              padding: "0.4rem 0.9rem", fontSize: "0.58rem", letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif",
              transition: "all 0.2s",
            }}>{pin.label}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section style={{ background: '#000', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Virtual Tour</p>
        <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '3rem' }}>Experience Flow Farm</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe src="https://www.youtube.com/embed/ySZBMvFm4mQ" frameBorder="0" allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: '1rem' }}>Main Residence Tour</p>
          </div>
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe src="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0" frameBorder="0" allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: '1rem' }}>3D Matterport Walkthrough</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="systems" style={{ background: DARK, padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Infrastructure</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>Built for Independence</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '1rem', fontFamily: 'sans-serif', fontSize: '0.9rem', maxWidth: 600, margin: '1rem auto 0' }}>
            Complete energy, water, and operational autonomy. Every system engineered for long-term performance and efficiency.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {SYSTEMS_DATA.map((s, i) => (
            <button key={s.label} onClick={() => setActive(i)} style={{
              background: active === i ? GOLD : 'transparent',
              border: `1px solid ${active === i ? GOLD : 'rgba(255,255,255,0.2)'}`,
              color: active === i ? '#000' : 'rgba(255,255,255,0.6)',
              padding: '0.5rem 1.2rem', fontSize: '0.65rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', transition: 'all 0.2s',
            }}>{s.label}</button>
          ))}
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', border: `1px solid rgba(191,162,116,0.15)`, padding: '3rem' }}>
          <h3 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.5rem', marginBottom: '2rem' }}>{SYSTEMS_DATA[active].label}</h3>
          {SYSTEMS_DATA[active].items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < SYSTEMS_DATA[active].items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span style={{ color: GOLD, fontSize: '0.5rem', marginTop: '0.5rem', flexShrink: 0 }}>&#9632;</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontFamily: 'sans-serif', lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="location" style={{ background: '#0d0d0d', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Location</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>Private by Nature. Pinehurst by Proximity.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>107 Linden Trail, Aberdeen, NC 28315</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div style={{ width: '100%', height: 400, overflow: 'hidden', border: `1px solid rgba(191,162,116,0.15)` }}>
              <iframe
                title="Flow Farm Location"
                src="https://maps.google.com/maps?q=107+Linden+Trail,Aberdeen,NC+28315&t=k&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="400" frameBorder="0" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
              />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.5rem' }}>Access Points</p>
              {['Primary: Linden Trail (private drive)', 'Secondary: Linden Road', 'Additional: Mollie Lane', 'Additional: Skene Lane'].map(a => (
                <div key={a} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: GOLD, fontSize: '0.5rem' }}>&#9632;</span>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>{a}</p>
                </div>
              ))}
            </div>
            <div>
              <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.5rem' }}>Nearby</p>
              {[
                ['3 miles', 'Historic Village of Pinehurst'],
                ['Minutes', 'Moore County Regional Airport'],
                ['1 hour', 'Raleigh-Durham International Airport'],
                ['Minutes', 'FirstHealth Moore Regional Hospital'],
                ['Minutes', 'Pinehurst Country Club (Course 7 + 9)'],
              ].map(([dist, label]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>{label}</p>
                  <p style={{ color: GOLD, fontSize: '0.8rem', fontFamily: 'sans-serif' }}>{dist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background: DARK, padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Questions</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>Frequently Asked</h2>
        </div>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1.5rem 0', textAlign: 'left',
            }}>
              <span style={{ color: open === i ? '#fff' : 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.4 }}>{item.q}</span>
              <span style={{ color: GOLD, fontSize: '1.4rem', marginLeft: '1.5rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
            </button>
            {open === i && (
              <div style={{ paddingBottom: '1.5rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: '0.9rem', fontFamily: 'sans-serif' }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: '#0d0d0d', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: GOLD, fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'sans-serif' }}>Private Inquiry</p>
        <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>Request Private Showing</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '0.9rem', marginBottom: '3rem' }}>
          Offered exclusively by Rachel Hernandez. All inquiries handled with complete discretion.
        </p>
        {sent ? (
          <div style={{ border: `1px solid rgba(191,162,116,0.3)`, padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Thank You</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>We will be in touch shortly to arrange your private showing.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {[
              { key: 'name', label: 'Full Name', type: 'text' },
              { key: 'email', label: 'Email Address', type: 'email' },
              { key: 'phone', label: 'Phone Number', type: 'tel' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', padding: '0.85rem 1rem', fontSize: '0.9rem', fontFamily: 'sans-serif',
                    outline: 'none', boxSizing: 'border-box',
                  }} required />
              </div>
            ))}
            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff', padding: '0.85rem 1rem', fontSize: '0.9rem', fontFamily: 'sans-serif',
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }} placeholder="I am interested in scheduling a private showing..." />
            </div>
            <button type="submit" style={{
              width: '100%', background: GOLD, border: 'none', color: '#000',
              padding: '1rem', fontSize: '0.75rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600,
            }}>Submit Inquiry</button>
          </form>
        )}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>Rachel Hernandez, Realtor</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontFamily: 'sans-serif' }}>rachelhernandezrealtor@gmail.com</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(191,162,116,0.1)', padding: '3rem 2rem', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>Flow Farm -- 107 Linden Trail, Aberdeen, NC</p>
      <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem', fontFamily: 'sans-serif' }}>Offered at $5,250,000 -- Rachel Hernandez, Realtor -- All Rights Reserved 2026</p>
    </footer>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <StorySection />
      <ResidenceSection />
      <GallerySection />
      <EstateSection />
      <VideoSection />
      <SystemsSection />
      <LocationSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
