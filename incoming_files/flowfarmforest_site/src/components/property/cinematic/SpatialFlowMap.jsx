import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ease = [0.22, 0.1, 0.28, 1];

/* ─── Room data by level ─── */
const LEVELS = [
  {
    id: 'first',
    label: 'First Floor',
    tagline: 'The Heart of the Home',
    sqft: '5,986 SF',
    wings: [
      {
        name: 'Grand Entrance',
        rooms: [
          { name: 'Covered Porch', dim: '10.1\' × 6.8\'', note: null, featured: false },
          { name: 'Foyer', dim: '9.4\' × 12.9\'', note: '8.3\' ceiling · Heart pine floors with Civil War–era front door', featured: false },
          { name: 'Powder Room', dim: '5.6\' × 11.5\'', note: 'Custom tile and polished fixtures', featured: false },
        ],
        connector: 'The foyer opens in three directions — toward the Great Room, the Primary Suite, and the Family Wing.',
      },
      {
        name: 'Entertaining Axis',
        rooms: [
          { name: 'Great Room', dim: '27.5\' × 23.8\'', note: '17\' vaulted ceiling · Exposed timber trusses · Masonry fireplace · 12+ dimmable circuits · Savant keypad scenes · French doors to screened porch', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/13b7514e8_fireplace.jpg' },
          { name: 'Kitchen', dim: '19.4\' × 15.6\'', note: '18\' trayed ceiling · 4 skylights · Tech Lighting mono-rail · Dreamscape LED strip 2700K · Under-cabinet lighting · 60" Wolf range · Sub-Zero · Custom butcher-block island', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2f7576434_SUNSHINEKITCHEN.jpg' },
          { name: 'Scullery', dim: '9.5\' × 6.2\'', note: 'Secondary workspace with custom cabinetry and stone counters', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/41e08fa40_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg' },
          { name: 'Kitchen Hallway & Desk', dim: null, note: 'Built-in desk with granite top · Custom dark cabinetry · Glass-front uppers · Cookbook shelving · Heart pine floors', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/408bd6f73_HEARTPINEHALLWAYWITHBUILTINDESK.jpg' },
          { name: 'Pantry', dim: '14.5\' × 7.5\'', note: null, featured: false },
          { name: 'Dining Room', dim: '21.6\' × 11.6\'', note: '16.3\' vaulted ceiling', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4c4ce32dd_sogoodtolivingroom.jpg' },
          { name: 'Conservatory', dim: '19.5\' × 17.7\'', note: '19.3\' vaulted ceiling · Octagonal glass pavilion · Dedicated geothermal zone', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b2114e829_CONSERVATORYBEST.jpg' },
        ],
        connector: 'The Great Room, Kitchen, Dining Room, and Conservatory form a continuous entertaining circuit — open, skylit, and connected to the outdoors.',
      },
      {
        name: 'Outdoor Living',
        rooms: [
          { name: 'Screened Porch', dim: '26.6\' × 11.1\'', note: '9.4\' ceiling · Dimmable lighting circuits · Fan speed control · Wireless access point · Direct access from Great Room and Living Room', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d2f938a8_patio2.jpg' },
        ],
        connector: 'The screened porch extends the living experience outward, sheltered yet open to the landscape.',
      },
      {
        name: 'Primary Suite',
        rooms: [
          { name: 'Primary Bedroom', dim: '19.6\' × 18.5\'', note: '15.8\' cathedral ceiling · 8+ dimmable circuits · Savant keypad · Emergency-backed outlets', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/955343688_foyer.jpg' },
          { name: 'Primary Bath', dim: '18.3\' × 18.6\'', note: '8.3\' ceiling · Spa-scaled proportions', featured: false },
          { name: 'Sitting Room', dim: '12.2\' × 18.5\'', note: '8.3\' ceiling', featured: false },
          { name: 'Walk-in Closet', dim: '11.7\' × 21.7\'', note: '8.3\' ceiling', featured: false },
        ],
        connector: 'The Primary Suite occupies its own wing — bedroom, bath, sitting room, and closet form a private retreat.',
      },
      {
        name: 'Family Wing',
        rooms: [
          { name: 'Play Room', dim: '13.6\' × 24.6\'', note: '8.3\' ceiling', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1728556b0_Winglivingroom.jpg' },
          { name: 'Bedroom', dim: '13.6\' × 11.6\'', note: 'Ensuite bath (11\' × 11.8\')', featured: false },
          { name: 'Bedroom', dim: '13.6\' × 11.5\'', note: 'Ensuite bath (11\' × 8.4\')', featured: false },
          { name: 'Laundry', dim: '11.1\' × 8.5\'', note: null, featured: false },
        ],
        connector: 'A distinct family wing with two ensuite bedrooms, playroom, and laundry — separated from the entertaining spaces for privacy.',
      },
      {
        name: 'Service Wing',
        rooms: [
          { name: 'Mudroom / Laundry', dim: '17.7\' × 16\'', note: '17.8\' vaulted ceiling · Connects to 3-car garage', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3cbece88f_MUDROOM.jpg' },
          { name: '3-Car Garage', dim: '23.5\' × 35.5\'', note: '9.5\' ceiling · Brick apron', featured: false },
        ],
        connector: 'The mudroom connects the garage to the kitchen axis and provides stair access to the Guest Apartment above.',
      },
    ],
  },
  {
    id: 'second',
    label: 'Second Floor',
    tagline: 'Work, Flex & Guest Living',
    sqft: '2,533 SF',
    wings: [
      {
        name: 'Executive Level',
        rooms: [
          { name: 'Executive Office', dim: '19.5\' × 18.9\'', note: '16.3\' cathedral ceiling · 5 skylights · 10 dimmable circuits · Savant climate & audio zone · Emergency-backed server power · Private stair', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d33757f9_architecmarkofficetallbeampic.jpg' },
          { name: 'Bonus / Flex Room', dim: '16.2\' × 12.6\'', note: '8.3\' ceiling · Open to Great Room below', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/c571e74b5_260115107LindenTrailF-9622.jpg' },
        ],
        connector: 'The office occupies the architectural crown of the main house — cathedral ceilings, skylights, and a private stair.',
      },
      {
        name: 'Upper Family Wing',
        rooms: [
          { name: 'Den', dim: '15.6\' × 14.2\'', note: '8.2\' ceiling', featured: false },
          { name: 'Bedroom', dim: '15.6\' × 11.5\'', note: '8.2\' ceiling · Full bath (12.8\' × 8.6\')', featured: false },
        ],
        connector: 'Accessible from the family wing stair — a den and ensuite bedroom provide flexible space above the first-floor bedrooms.',
      },
      {
        name: 'Guest Apartment',
        rooms: [
          { name: 'Living Room', dim: '17.5\' × 11.5\'', note: '8\' ceiling · Heart pine floors · Dining area · Views to kitchenette and bath', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b6297dd4b_GUESTSUITESITTINGROOM.jpg' },
          { name: 'Kitchenette', dim: '11.5\' × 8\'', note: 'Stainless refrigerator · Sink · Open shelving · Vaulted ceiling', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/36280f0c8_GUESTSUITEKITCHENETTE.jpg' },
          { name: 'Bath', dim: '5.6\' × 11.4\'', note: 'Full bath · Custom cherry vanity · Stone countertop · Sconce lighting · Linen tower', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/8ef1317f6_GUESTSUITEBATHROOM.jpg' },
          { name: 'Bedroom', dim: '11.4\' × 11.6\'', note: '8.2\' ceiling · Tray detail · Heart pine floors · Forest views', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/fb2a57cae_GUESTSUITETRAYCEILING.jpg' },
        ],
        connector: 'A fully self-contained apartment above the mudroom wing — reached by heart pine stairway. Ideal for extended guests or staff.',
      },
    ],
  },
  {
    id: 'lower',
    label: 'Lower Level',
    tagline: 'Entertainment & Retreat',
    sqft: '1,709 SF Finished',
    wings: [
      {
        name: 'Entertainment Suite',
        rooms: [
          { name: 'Recreation Room', dim: '31.3\' × 17.4\'', note: '10.8\' tray ceiling · 7 dimmable circuits · Savant lighting & surround audio · Emergency lighting circuit', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/82834dc6e_livingroom2.jpg' },
          { name: 'Theater', dim: '20.4\' × 17.3\'', note: '11.9\' tray ceiling · Dedicated home cinema · Savant A/V control · Dimmable LED accent lighting · Emergency-backed circuit', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ade467d88_260115107LindenTrailF-9595-3.jpg' },
          { name: 'Safe Room', dim: '7.4\' × 6.3\'', note: 'Concealed behind false wall', featured: false },
        ],
        connector: 'Walk-out basement level with nearly 11\' ceilings throughout — recreation, theater, and secure storage accessed from the main stair.',
      },
      {
        name: 'Mechanical Core',
        rooms: [
          { name: 'Geothermal Plant', dim: 'Full footprint access', note: '5 Water Furnace zones · 20 wells × 300\' · Lennox air purification · 2 superheaters for geothermal hot water', featured: true, img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1f6d29214_260115107LindenTrailInteriors-9905-HDR.jpg' },
          { name: 'Water Filtration', dim: null, note: 'Clear Water Solutions commercial system · Private well up to 50 gpm · Priority backup circuit', featured: false },
          { name: 'Electrical Distribution', dim: null, note: '600-amp service · 189+ dimmable circuits · Dedicated lighting panels · 4 architectural sheets of power plans', featured: false },
          { name: 'Araknis Networking', dim: null, note: 'Enterprise-grade switches, routers, and wireless access points · Campus-wide coverage · Professionally installed for residential and commercial-scale connectivity', featured: false },
          { name: 'Solar Battery System', dim: null, note: '14.3 kW array (61 panels) · Sunny Island 10k · 12 emergency outlets · Dedicated emergency lighting', featured: false },
          { name: 'Generator System', dim: null, note: '30 kW Kohler · 2× 1,000-gal buried propane · Automatic transfer switch', featured: false },
        ],
        connector: 'The sealed crawl space spans the full footprint — all mechanical systems are accessible in conditioned space, designed for decades of reliable operation.',
      },
    ],
  },
];

/* ─── Wing Component ─── */
function WingBlock({ wing, wingIndex, isOpen, onToggle }) {
  const hasFeaturedImg = wing.rooms.some(r => r.featured && r.img);
  const featuredRoom = wing.rooms.find(r => r.featured && r.img);

  return (
    <div style={{ marginBottom: '2px' }}>
      {/* Wing header */}
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between"
        style={{
          padding: 'clamp(14px, 2vw, 20px) clamp(16px, 2.5vw, 24px)',
          background: isOpen ? 'rgba(0,0,0,0.03)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Wing dot indicator */}
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: wing.rooms.some(r => r.featured) ? '#1C1C1A' : 'rgba(28,28,26,0.15)',
            flexShrink: 0,
          }} />
          <span className="font-sans" style={{
            fontSize: 'clamp(0.72rem, 0.82vw, 0.82rem)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
          }}>
            {wing.name}
          </span>
          <span className="font-sans" style={{
            fontSize: '0.68rem',
            color: 'rgba(0,0,0,0.3)',
            letterSpacing: '0.05em',
          }}>
            {wing.rooms.length} {wing.rooms.length === 1 ? 'space' : 'spaces'}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={14} style={{ color: 'rgba(0,0,0,0.3)' }} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 clamp(16px, 2.5vw, 24px) clamp(16px, 2vw, 24px)' }}>
              {/* Featured image if available */}
              {hasFeaturedImg && featuredRoom && (
                <div className="relative overflow-hidden" style={{ borderRadius: '8px', marginBottom: 'clamp(12px, 1.5vw, 18px)', aspectRatio: '16/9' }}>
                  <img
                    src={featuredRoom.img}
                    alt={featuredRoom.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0" style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    padding: 'clamp(16px, 2vh, 24px) clamp(12px, 1.5vw, 16px) clamp(8px, 1vh, 12px)',
                  }}>
                    <span className="font-serif" style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.1rem)', fontWeight: 400, color: '#fff' }}>{featuredRoom.name}</span>
                    {featuredRoom.dim && (
                      <span className="font-sans" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', marginLeft: '10px' }}>{featuredRoom.dim}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Room list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {wing.rooms.map((room, ri) => (
                  <div
                    key={ri}
                    className="flex items-start gap-3"
                    style={{
                      padding: 'clamp(8px, 1vw, 12px) 0',
                      borderBottom: ri < wing.rooms.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    }}
                  >
                    {/* Connection line dot */}
                    <div style={{ paddingTop: '6px', flexShrink: 0 }}>
                      <div style={{
                        width: room.featured ? 6 : 4,
                        height: room.featured ? 6 : 4,
                        borderRadius: '50%',
                        background: room.featured ? '#A48A6A' : 'rgba(28,28,26,0.12)',
                      }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-serif" style={{
                          fontSize: room.featured ? 'clamp(0.88rem, 1vw, 1rem)' : 'clamp(0.82rem, 0.92vw, 0.92rem)',
                          fontWeight: room.featured ? 500 : 400,
                          color: room.featured ? '#1C1C1A' : '#6B6B67',
                          lineHeight: 1.3,
                        }}>
                          {room.name}
                        </span>
                        <span className="font-sans" style={{
                          fontSize: '0.62rem',
                          letterSpacing: '0.1em',
                          color: '#A48A6A',
                          whiteSpace: 'nowrap',
                        }}>
                          {room.dim}
                        </span>
                      </div>
                      {room.note && (
                        <p className="font-sans" style={{
                          fontSize: 'clamp(0.68rem, 0.76vw, 0.76rem)',
                          lineHeight: 1.6,
                          color: '#6B6B67',
                          margin: '3px 0 0',
                        }}>
                          {room.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                </div>

              {/* Connector narrative */}
              <p className="font-serif italic" style={{
                fontSize: 'clamp(0.76rem, 0.88vw, 0.88rem)',
                lineHeight: 1.55,
                fontWeight: 300,
                color: '#6B6B67',
                marginTop: 'clamp(12px, 1.5vw, 18px)',
                paddingLeft: 'clamp(8px, 1vw, 14px)',
                borderLeft: '2px solid rgba(164,138,106,0.15)',
                maxWidth: '460px',
              }}>
                {wing.connector}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Level Component ─── */
function LevelSection({ level, levelIndex }) {
  const [openWings, setOpenWings] = useState(
    // Auto-open first wing of each level
    level.wings.reduce((acc, _, i) => ({ ...acc, [i]: i === 0 }), {})
  );

  const toggleWing = (i) => setOpenWings(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease, delay: levelIndex * 0.15 }}
    >
      {/* Level header */}
      <div style={{
        padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2.5vw, 24px) clamp(12px, 1.5vw, 16px)',
        borderBottom: '1px solid rgba(28,28,26,0.06)',
      }}>
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <span className="block font-sans uppercase" style={{
              fontSize: '0.54rem',
              fontWeight: 500,
              letterSpacing: '0.35em',
              color: '#A48A6A',
              marginBottom: '4px',
            }}>
              {level.label}
            </span>
            <h3 className="font-serif" style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
              fontWeight: 400,
              lineHeight: 1.06,
              color: '#1C1C1A',
              letterSpacing: '0.01em',
              margin: 0,
            }}>
              {level.tagline}
            </h3>
          </div>
          <span className="font-sans" style={{
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'rgba(0,0,0,0.2)',
            fontWeight: 500,
          }}>
            {level.sqft}
          </span>
        </div>
      </div>

      {/* Wings */}
      <div>
        {level.wings.map((wing, wi) => (
          <WingBlock
            key={wi}
            wing={wing}
            wingIndex={wi}
            isOpen={openWings[wi]}
            onToggle={() => toggleWing(wi)}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Connection Lines between levels ─── */
function LevelConnector({ label, caption, img }) {
  return (
    <div style={{ padding: 'clamp(4px, 0.8vh, 8px) clamp(12px, 2vw, 20px)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: img ? '80px 1fr' : '1fr',
        gap: 'clamp(10px, 1.5vw, 16px)',
        alignItems: 'center',
        padding: 'clamp(10px, 1.5vw, 16px)',
        background: 'rgba(28,28,26,0.015)',
        borderTop: '1px solid rgba(28,28,26,0.04)',
        borderBottom: '1px solid rgba(28,28,26,0.04)',
      }}>
        {img && (
          <div style={{ width: 80, height: 80, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
            <img src={img} alt={label} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
            <ChevronUp size={10} style={{ color: 'rgba(0,0,0,0.18)' }} />
            <div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.1)' }} />
            <ChevronDown size={10} style={{ color: 'rgba(0,0,0,0.18)' }} />
          </div>
          <div>
            <span className="block font-sans" style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B6B67',
              lineHeight: 1.3,
            }}>
              {label}
            </span>
            {caption && (
              <span className="block font-serif italic" style={{
                fontSize: '0.7rem',
                color: '#6B6B67',
                fontWeight: 300,
                lineHeight: 1.4,
                marginTop: 2,
              }}>
                {caption}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function SpatialFlowMap() {
  return (
    <section style={{ background: '#ECE7DF' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="text-center mx-auto px-6"
        style={{
          maxWidth: '560px',
          paddingTop: 'clamp(48px, 6vh, 72px)',
          paddingBottom: 'clamp(16px, 2vh, 24px)',
        }}
      >
        <span className="block font-sans uppercase" style={{
          fontSize: '0.54rem',
          fontWeight: 500,
          letterSpacing: '0.4em',
          color: '#A48A6A',
          marginBottom: '10px',
        }}>
          Spatial Architecture
        </span>
        <h2 className="font-display italic" style={{
          fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
          fontWeight: 400,
          lineHeight: 1.08,
          color: '#1C1C1A',
          letterSpacing: '0.015em',
          marginBottom: '10px',
        }}>
          How the Spaces Connect
        </h2>
        <p className="font-serif italic" style={{
          fontSize: 'clamp(0.84rem, 1.1vw, 1rem)',
          lineHeight: 1.5,
          fontWeight: 300,
          color: '#6B6B67',
          margin: '0 auto',
          maxWidth: '400px',
        }}>
          Over 10,000 square feet across three finished levels and five distinct wings — each with its own character, purpose, and independent control. Every system was designed for longevity, efficiency, and performance.
        </p>
      </motion.div>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center gap-3 mx-auto px-6" style={{ maxWidth: '600px', paddingBottom: 'clamp(20px, 3vh, 32px)' }}>
        {[
          { label: 'Heated Above Grade', value: '8,519 SF' },
          { label: 'Finished Below Grade', value: '1,709 SF' },
          { label: 'Total Living', value: '10,228 SF' },
          { label: 'Electrical Service', value: '600 Amp' },
          { label: 'Dimmable Circuits', value: '189+' },
          { label: 'Geothermal Zones', value: '5' },
          { label: 'Geothermal Wells', value: '20 × 300\''},
          { label: 'Architectural Sheets', value: '33' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 * i }}
            className="text-center"
            style={{
              padding: '10px 18px',
              background: 'rgba(28,28,26,0.02)',
              border: '1px solid rgba(28,28,26,0.06)',
              borderRadius: '20px',
            }}
          >
            <span className="block font-sans" style={{ fontSize: '0.88rem', fontWeight: 500, color: '#1C1C1A', lineHeight: 1.2 }}>{stat.value}</span>
            <span className="block font-sans" style={{ fontSize: '0.56rem', letterSpacing: '0.12em', color: '#6B6B67', textTransform: 'uppercase', marginTop: '2px' }}>{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Level cards */}
      <div className="mx-auto" style={{ maxWidth: '680px', padding: '0 clamp(12px, 2vw, 20px) clamp(48px, 6vh, 72px)' }}>
        <div style={{
          background: '#F6F4EF',
          border: '1px solid rgba(28,28,26,0.06)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(28,28,26,0.03)',
        }}>
          {LEVELS.map((level, li) => (
            <React.Fragment key={level.id}>
              {li === 1 && (
                <LevelConnector
                  label="Heart Pine Stairway"
                  caption="Multiple staircases connect the first floor to the executive office, family wing, and guest apartment above."
                  img="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3e5de52f9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg"
                />
              )}
              {li === 2 && (
                <LevelConnector
                  label="Center Stairwell"
                  caption="The main stair descends from the first floor to the walk-out entertainment level below."
                  img="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/a50108adb_centerstairwellhouse.jpg"
                />
              )}
              <LevelSection level={level} levelIndex={li} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}