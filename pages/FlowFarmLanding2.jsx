import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#BFA274';
const DARK = '#0a0a0a';

const NAV_LINKS = ['Story', 'Residence', 'Gallery', 'Estate', 'Systems', 'FAQ', 'Contact'];

const PHOTOS = {
  hero: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/46fb99d0e_TSDroneHouseRoof.jpg',
  exterior: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  highTunnel: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  compost: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg',
  cabana: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  foyer: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
  living1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  kitchen1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  kitchen2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/00b098c8-fea7-4300-bf34-6c2f557dd200/public',
  conservatory1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  dining: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public',
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
};

const STRUCTURES = [
  {
    id: 'residence',
    label: 'Main Residence',
    tag: 'Residence',
    sf: '8,519 SF',
    desc: 'Robert Clark AIA design. 6 beds, 7 baths. Reclaimed heart pine, glass conservatory, Sub-Zero/Wolf kitchen, geothermal, 30kW generator, 14.3kW solar, Control4.',
    img: PHOTOS.exterior,
    top: '38%',
    left: '42%',
  },
  {
    id: 'cabana',
    label: 'Cabana House',
    tag: 'Guest Retreat',
    sf: 'Private Suite',
    desc: 'Private guest retreat with full kitchen, 1 bed/1 bath, and private entrance. Complete separation from the main residence.',
    img: PHOTOS.cabana,
    top: '60%',
    left: '58%',
  },
  {
    id: 'tunnel',
    label: 'High Tunnel',
    tag: 'Greenhouse',
    sf: "96' x 36'",
    desc: 'Custom geothermal climate battery. Year-round specialty crops including pineapples, avocados, and citrus.',
    img: PHOTOS.highTunnel,
    top: '22%',
    left: '62%',
  },
  {
    id: 'workshop',
    label: 'Farm Workshop',
    tag: 'Infrastructure',
    sf: "30' x 40'",
    desc: 'Fully operational with plumbing, electrical, and walk-in cooler. 1,400ft double deer fencing enclosing 3 acres.',
    img: PHOTOS.workshop,
    top: '70%',
    left: '72%',
  },
  {
    id: 'compost',
    label: 'Compost + Biochar',
    tag: 'Farm Systems',
    sf: 'Covered Structure',
    desc: 'O2Compost aerated system and biochar kiln under covered structure with I-beam and chain hoist.',
    img: PHOTOS.compost,
    top: '78%',
    left: '55%',
  },
  {
    id: 'farm',
    label: '3-Acre Veganic Farm',
    tag: 'USDA Agricultural',
    sf: '3 Acres',
    desc: 'USDA-zoned veganic operation. Certified organic practices. Transferable farm infrastructure and operational systems.',
    img: PHOTOS.grounds,
    top: '25%',
    left: '30%',
  },
];

const SYSTEMS = [
  { label: 'Energy', items: ['30kW Kohler generator + 2x 1,000 gal propane', '14.3kW solar array (61 Samsung panels)', 'Sunny Island 10k solar battery backup', 'Geothermal loop: 20 wells x 300 ft deep'] },
  { label: 'Climate', items: ['5-zone Water Furnace geothermal HVAC', 'Energy Recovery Ventilator system', 'Lennox air purification on each zone', 'Fully conditioned + sealed crawl space'] },
  { label: 'Water', items: ['Private well up to 50 gpm', 'Whole house commercial water filtration', 'Private septic 2x 1,500 gal with pump', 'Whole house fire sprinkler system'] },
  { label: 'Smart Home', items: ['Control4 audio, video, lighting', 'Whole campus Wi-Fi (Araknis enterprise)', 'Whole house alarm system', 'Dual VacuMaid S2400 central vacuum'] },
  { label: 'Kitchen', items: ['Sub-Zero refrigerator, freezer + wine cooler', "Wolf 60\" dual fuel 6-burner + griddle/grill", '2 KitchenAid dishwashers', '2 sets Whirlpool washers + steam dryers'] },
  { label: 'Security', items: ['Brown Safe jewelry + vault door', '1,400 ft double deer fence (3 acres)', '500 ft single fence dog run (1 acre)', 'Whole house alarm system'] },
];

const FAQ_ITEMS = [
  { q: 'Is the Pinehurst golf membership transferable?', a: 'Yes. A Pinehurst Country Club Signature Golf Membership is included with the sale, providing unlimited access to Course No. 7 and No. 9.' },
  { q: 'What is the agricultural zoning status?', a: 'The property is USDA-zoned with 3 acres in active veganic farm operation and 7 additional buildable acres within the 15-acre total.' },
  { q: 'How far is the property from Pinehurst?', a: 'Flow Farm Party is approximately 3 miles from the Historic Village of Pinehurst, with multiple private access points via Linden Trail, Linden Road, Mollie Lane, and Skene Lane.' },
  { q: 'What airport access is available?', a: 'Moore County Regional Airport for private aviation is nearby. Raleigh-Durham International Airport is approximately 1 hour away.' },
  { q: 'Is the farm operational?', a: 'Yes. The 3-acre veganic farm is fully operational with certified infrastructure including the high tunnel greenhouse, composting system, biochar kiln, and farm workshop.' },
  { q: 'What backup systems are in place?', a: 'The estate has a 30kW Kohler generator with 2x 1,000 gallon buried propane tanks, 14.3kW solar array, and Sunny Island 10k solar battery backup for complete energy independence.' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(191,162,116,0.15)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <span style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Flow Farm Party
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.slice(0, -1).map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              {link}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo('contact')}
          style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, padding: '0.5rem 1.25rem', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>
          Private Inquiry
        </button>
      </div>
      <style>{`.desktop-nav { display: flex; } @media(max-width:768px){.desktop-nav{display:none;}}`}</style>
    </nav>
  );
}

function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section id="story" style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#000' }}>
      <div style={{
        position: 'absolute', inset: '-6%',
        opacity: videoReady ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }}>
        <iframe
          src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          onLoad={() => setVideoReady(true)}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 'max(177.78vh, 100vw)',
            height: 'max(56.25vw, 100vh)',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}
        />
      </div>
      {!videoReady && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${PHOTOS.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem' }}>
        <p style={{ color: GOLD, fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.5rem' }}>
          107 Linden Trail -- Aberdeen, NC
        </p>
        <h1 style={{ color: '#fff', fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontFamily: 'Georgia, serif', fontWeight: 300, lineHeight: 1.05, margin: '0 0 1.5rem' }}>
          Flow Farm Party
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '3rem' }}>
          Agritourism Established. Legacy Ready.
        </p>
        <p style={{ color: GOLD, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontFamily: 'Georgia, serif', marginBottom: '3rem' }}>
          $5,250,000
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => document.getElementById('residence')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.5)`, color: '#fff', padding: '0.85rem 2rem', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>
            Discover the Estate
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, padding: '0.85rem 2rem', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>
            Private Inquiry
          </button>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
      </div>
    </section>
  );
}

function StorySection() {
  const STATS = [
    { value: '15', label: 'Contiguous Acres' },
    { value: '3 mi', label: 'From Pinehurst' },
    { value: '6', label: 'Structures' },
    { value: '$5.25M', label: 'Asking Price' },
  ];
  return (
    <section style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.25rem' }}>
              The Opportunity
            </p>
            <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, margin: '0 0 1.5rem' }}>
              Flow Farm Party: A Foundation for What Comes Next.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.85, fontFamily: 'sans-serif', margin: '0 0 1.25rem' }}>
              A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury. A rare convergence of land, architecture, and infrastructure.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.85, fontFamily: 'sans-serif', margin: 0 }}>
              This private estate offers energy independence, favorable tax positioning, rare zoning flexibility, enterprise potential, future expansion opportunity, and a transferable Pinehurst Country Club Signature Golf Membership with exclusive unlimited access to Course No. 7 and No. 9.
            </p>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e5e5e5', border: '1px solid rgba(255,255,255,0.1)' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: DARK, padding: '2rem', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, marginBottom: '0.5rem' }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResidenceSection() {
  const [activeImg, setActiveImg] = useState(0);
  const GALLERY = [PHOTOS.foyer, PHOTOS.living1, PHOTOS.living2, PHOTOS.kitchen1, PHOTOS.kitchen2, PHOTOS.conservatory1, PHOTOS.conservatory2, PHOTOS.dining];
  const LABELS = ['Foyer', 'Living Room', 'Living Room', 'Kitchen', 'Kitchen', 'Conservatory', 'Conservatory', 'Dining Room'];

  return (
    <section id="residence" style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>Main Residence</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: '0 0 1rem' }}>8,519 Square Feet</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', fontFamily: 'sans-serif', margin: 0 }}>6 Bedrooms -- 7 Bathrooms -- Designed by Robert E. Clark AIA</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ position: 'relative', paddingBottom: '66%', overflow: 'hidden' }}>
            <img src={GALLERY[activeImg]} alt={LABELS[activeImg]}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.35rem 0.75rem' }}>
              <span style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>{LABELS[activeImg]}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.85, fontFamily: 'sans-serif', marginBottom: '2rem' }}>
                The main residence anchors the estate with architectural presence and a direct relationship to the surrounding land. Reclaimed Civil War-era heart pine floors, custom-laid artisan patterns throughout including bedrooms, hallways, and closets.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {['Glass Conservatory', 'Sub-Zero / Wolf Kitchen', 'Geothermal HVAC', 'Control4 Smart Home', 'Solar + Generator', 'Heart Pine Floors'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 4, height: 4, background: GOLD, borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontFamily: 'sans-serif' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.75rem' }}>Browse Rooms</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {GALLERY.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ padding: 0, border: `2px solid ${i === activeImg ? GOLD : 'transparent'}`, cursor: 'pointer', width: 52, height: 40, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={img} alt={LABELS[i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="https://my.matterport.com/show/?m=xZRfSiQPuQ8" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, padding: '0.85rem 2.5rem', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'sans-serif' }}>
            Launch Virtual 3D Tour
          </a>
        </div>
      </div>
    </section>
  );
}

function EstateSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="estate" style={{ background: '#111', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>The Property</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: '0 0 1rem' }}>Six Structures. Fifteen Acres.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: 'sans-serif', margin: 0 }}>Click any structure to explore</p>
        </div>
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <img src={PHOTOS.hero} alt="Estate aerial view"
            style={{ width: '100%', height: 'clamp(320px, 50vw, 560px)', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
          {STRUCTURES.map(s => (
            <button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
              style={{
                position: 'absolute', top: s.top, left: s.left, transform: 'translate(-50%, -50%)',
                background: active === s.id ? GOLD : 'rgba(10,10,10,0.75)',
                border: `1px solid ${GOLD}`,
                color: active === s.id ? '#000' : GOLD,
                padding: '0.3rem 0.7rem', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'sans-serif', whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}>
              {s.label}
            </button>
          ))}
        </div>
        {active && (() => {
          const s = STRUCTURES.find(x => x.id === active);
          if (!s) return null;
          return (
            <div style={{ background: DARK, border: `1px solid #e5e5e5`, padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', alignItems: 'center' }}>
              <img src={s.img} alt={s.label} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div>
                <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>{s.tag}</p>
                <h3 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 300, margin: '0 0 0.4rem' }}>{s.label}</h3>
                <p style={{ color: GOLD, fontSize: '0.8rem', fontFamily: 'sans-serif', margin: '0 0 1rem' }}>{s.sf}</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, fontFamily: 'sans-serif', margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          );
        })()}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {STRUCTURES.map(s => (
            <div key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
              style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', height: 160, border: active === s.id ? `2px solid ${GOLD}` : '2px solid transparent' }}>
              <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                <p style={{ color: GOLD, fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 0.2rem' }}>{s.tag}</p>
                <p style={{ color: '#fff', fontSize: '0.82rem', fontFamily: 'Georgia, serif', margin: 0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ALL_PHOTOS = [
    PHOTOS.exterior, PHOTOS.grounds, PHOTOS.foyer, PHOTOS.living1, PHOTOS.living2,
    PHOTOS.kitchen1, PHOTOS.kitchen2, PHOTOS.conservatory1, PHOTOS.conservatory2,
    PHOTOS.dining, PHOTOS.cabana, PHOTOS.cabana2, PHOTOS.highTunnel, PHOTOS.workshop, PHOTOS.compost,
  ];
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>Photo Gallery</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: 0 }}>The Estate in Detail</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {ALL_PHOTOS.map((p, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', paddingBottom: i % 5 === 0 ? '66%' : '75%' }}>
              <img src={p} alt="Flow Farm Party" loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </div>
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <img src={ALL_PHOTOS[lightbox]} alt="Flow Farm Party"
            style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain' }}
            onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>x</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length); }}
            style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: `1px solid rgba(255,255,255,0.3)`, color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem 0.9rem', lineHeight: 1 }}>&lt;</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % ALL_PHOTOS.length); }}
            style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: `1px solid rgba(255,255,255,0.3)`, color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem 0.9rem', lineHeight: 1 }}>&gt;</button>
        </div>
      )}
    </section>
  );
}

function SystemsSection() {
  return (
    <section id="systems" style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>Infrastructure</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: '0 0 1rem' }}>Engineered for Independence</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: 'sans-serif', maxWidth: 560, margin: '0 auto' }}>
            1,200 amps of total power capacity. Geothermal. Solar. Generator backup. A complete off-grid capability within a luxury estate.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {SYSTEMS.map(sys => (
            <div key={sys.label} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2rem' }}>
              <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.25rem' }}>{sys.label}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {sys.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>--</span>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'sans-serif' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1.25rem' }}>Location</p>
            <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, margin: '0 0 1.5rem' }}>
              Private by Nature. Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.85, fontFamily: 'sans-serif', marginBottom: '2rem' }}>
              Multiple points of access including primary entrance from Linden Trail and additional access via Linden Road, Mollie Lane, and Skene Lane. Private drive creates immediate separation and discretion.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['3 miles from Historic Village of Pinehurst', 'Moore County Regional Airport -- private aviation', 'Raleigh-Durham International -- approx. 1 hour', 'FirstHealth Moore Regional Hospital'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>--</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 0, overflow: 'hidden', border: `1px solid rgba(191,162,116,0.2)` }}>
            <iframe
              title="Flow Farm Party Location"
              width="100%"
              height="360"
              frameBorder="0"
              style={{ display: 'block', filter: 'grayscale(30%) contrast(1.1)' }}
              src="https://maps.google.com/maps?q=107+Linden+Trail,+Aberdeen,+NC+28315&t=k&z=14&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background: '#111', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>FAQ</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: 0 }}>Common Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid #ddd' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: DARK, fontSize: '0.95rem', fontFamily: 'sans-serif', fontWeight: 500 }}>{item.q}</span>
                <span style={{ color: GOLD, fontSize: '1.25rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }}>+</span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: '1.5rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.8, fontFamily: 'sans-serif', margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #ddd' }} />
        </div>
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
    <section id="contact" style={{ background: DARK, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: GOLD, fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '1rem' }}>Contact</p>
          <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, margin: '0 0 1rem' }}>Private Inquiry</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', fontFamily: 'sans-serif', margin: 0 }}>All inquiries are handled with complete discretion</p>
        </div>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Thank you.</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>Your inquiry has been received. We will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[['name', 'Full Name', 'text'], ['email', 'Email Address', 'email'], ['phone', 'Phone Number', 'tel']].map(([field, placeholder, type]) => (
              <input key={field} type={type} placeholder={placeholder} value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '1rem 1.25rem', fontSize: '0.88rem', fontFamily: 'sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            ))}
            <textarea placeholder="Message" value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={4}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '1rem 1.25rem', fontSize: '0.88rem', fontFamily: 'sans-serif', outline: 'none', resize: 'vertical', gridColumn: '1 / -1', width: '100%', boxSizing: 'border-box' }}
            />
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <button type="submit"
                style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, padding: '1rem 3rem', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'sans-serif' }}>
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
        <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 0.5rem' }}>Rachel Hernandez</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 0.5rem' }}>rachelhernandezrealtor@gmail.com</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'sans-serif', margin: '1.5rem 0 0' }}>
            107 Linden Trail -- Aberdeen, NC 28315
          </p>
        </div>
      </div>
    </section>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Navbar />
      <Hero />
      <StorySection />
      <ResidenceSection />
      <EstateSection />
      <GallerySection />
      <SystemsSection />
      <LocationSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
