import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ease = [0.22, 0.1, 0.28, 1];

/*
 * Each room has connections showing where you can go from there.
 * This creates an interactive walkthrough of the main level flow.
 */
const ROOMS = [
  {
    id: 'entrance',
    name: 'The Entrance',
    subtitle: 'Where It Begins',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/23a893ae6_houseadd.jpg',
    caption: 'Full brick, copper-topped lanterns, and a Civil War–era heart pine door.',
    connections: ['foyer'],
  },
  {
    id: 'foyer',
    name: 'The Foyer',
    subtitle: 'Three Directions',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/955343688_foyer.jpg',
    caption: 'Heart pine underfoot, light overhead. The house opens in three directions — Great Room, Primary Suite, and Family Wing.',
    connections: ['great-room', 'primary-suite', 'family-wing'],
  },
  {
    id: 'great-room',
    name: 'The Great Room',
    subtitle: 'Volume & Light',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/13b7514e8_fireplace.jpg',
    caption: '27.5\' × 23.8\' with a 17\' vaulted ceiling, exposed timber trusses, and masonry fireplace. French doors open to the screened porch.',
    connections: ['kitchen', 'dining', 'porch', 'foyer'],
  },
  {
    id: 'kitchen',
    name: 'The Kitchen',
    subtitle: 'Built to Nourish',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7390c5246_KITCHENYES.jpg',
    caption: '60" Wolf range, Sub-Zero, 4 skylights, and a continuous sightline through to the conservatory. Professional capability, domestic warmth.',
    connections: ['conservatory', 'scullery', 'great-room', 'hallway-desk'],
  },
  {
    id: 'conservatory',
    name: 'The Conservatory',
    subtitle: 'Glass, Timber, Sky',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b2114e829_CONSERVATORYBEST.jpg',
    caption: 'An octagonal glass pavilion with its own geothermal zone. Neither inside nor out — open to sky and landscape on every side.',
    connections: ['kitchen', 'porch'],
  },
  {
    id: 'dining',
    name: 'The Dining Room',
    subtitle: 'Unhurried Evenings',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4c4ce32dd_sogoodtolivingroom.jpg',
    caption: 'A sculptural chandelier floats above glass and heart pine. Bay windows flood the alcove with natural light.',
    connections: ['great-room', 'conservatory'],
  },
  {
    id: 'porch',
    name: 'Screened Porch',
    subtitle: 'Three-Season Living',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d2f938a8_patio2.jpg',
    caption: '26.6\' × 11.1\' sheltered outdoor room — accessible from the Great Room and Conservatory. Dimmable circuits, ceiling fans, and wireless throughout.',
    connections: ['great-room', 'conservatory'],
  },
  {
    id: 'scullery',
    name: 'The Scullery',
    subtitle: 'Behind the Scenes',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/41e08fa40_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg',
    caption: 'A secondary galley with glass tile backsplash, granite counters, and full appliance suite. Adjacent to the kitchen.',
    connections: ['kitchen', 'hallway-desk'],
  },
  {
    id: 'hallway-desk',
    name: 'Hallway & Built-In Desk',
    subtitle: 'A Pause in the Plan',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/9cd1901c8_HEARTPINEHALLWAYWITHBUILTINDESK.jpg',
    caption: 'Granite top, custom cabinetry, cookbook shelving. A workstation woven into the heart pine corridor.',
    connections: ['kitchen', 'mudroom'],
  },
  {
    id: 'mudroom',
    name: 'The Mudroom',
    subtitle: 'Service Wing',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3cbece88f_MUDROOM.jpg',
    caption: '17.7\' × 16\' with a 17.8\' vaulted ceiling. Connects the 3-car garage to the kitchen axis and stair to the Guest Apartment above.',
    connections: ['hallway-desk', 'foyer'],
  },
  {
    id: 'primary-suite',
    name: 'The Primary Suite',
    subtitle: 'A Private Wing',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/8b298c854_primary1main.jpg',
    caption: 'Closed off by its own door — bedroom, spa bath, sitting room, closet, and a private stair to the executive office. A self-contained retreat.',
    connections: ['foyer', 'office'],
  },
  {
    id: 'office',
    name: 'Executive Office',
    subtitle: 'The Architectural Crown',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d33757f9_architecmarkofficetallbeampic.jpg',
    caption: '16.3\' cathedral ceiling, 5 skylights, dedicated Savant zone. Reached by private stair from the Primary Suite wing.',
    connections: ['primary-suite'],
  },
  {
    id: 'family-wing',
    name: 'The Family Wing',
    subtitle: 'Room to Grow',
    img: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1728556b0_Winglivingroom.jpg',
    caption: 'Two ensuite bedrooms, playroom, and laundry — a distinct wing separated from the entertaining spaces for privacy.',
    connections: ['foyer'],
  },
];

export default function InteractiveRoomFlow() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef(null);
  const active = ROOMS[activeIdx];

  const goTo = (id) => {
    const idx = ROOMS.findIndex(r => r.id === id);
    if (idx >= 0) setActiveIdx(idx);
  };
  const prev = () => setActiveIdx(i => Math.max(0, i - 1));
  const next = () => setActiveIdx(i => Math.min(ROOMS.length - 1, i + 1));

  // Scroll thumbnail strip to keep active in view
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.children[activeIdx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIdx]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 0 clamp(32px, 5vh, 64px)' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="text-center mx-auto px-6"
        style={{ maxWidth: '560px', paddingBottom: 'clamp(24px, 4vh, 40px)' }}
      >
        <span className="block font-sans uppercase" style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.4em', color: '#A48A6A', marginBottom: '10px' }}>
          Interactive Walkthrough
        </span>
        <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.08, color: '#1C1C1A', letterSpacing: '0.01em', marginBottom: '10px' }}>
          How the Rooms Connect
        </h3>
        <p className="font-sans" style={{ fontSize: 'clamp(0.76rem, 0.88vw, 0.88rem)', lineHeight: 1.6, fontWeight: 300, color: '#6B6B67', margin: 0 }}>
          Tap any room to explore. Follow the connections to see how each space flows into the next.
        </p>
      </motion.div>

      {/* Main viewer */}
      <div className="relative mx-auto px-4 sm:px-6" style={{ maxWidth: '1000px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ borderRadius: '12px', width: '100%', maxHeight: '70vh' }}>
              <img
                src={active.img}
                alt={active.name}
                style={{
                  width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'cover', display: 'block',
                  filter: 'brightness(1.04) contrast(1.01) saturate(0.96)',
                }}
              />

              {/* Gradient overlay bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '55%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* Room info overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 3vw, 36px)', zIndex: 2 }}>
                <span className="font-sans uppercase" style={{ fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '6px' }}>
                  {active.subtitle}
                </span>
                <h4 className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', fontWeight: 400, color: '#fff', lineHeight: 1.08, margin: '0 0 8px', letterSpacing: '0.01em' }}>
                  {active.name}
                </h4>
                <p className="font-sans" style={{ fontSize: 'clamp(0.72rem, 0.85vw, 0.85rem)', lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: '560px' }}>
                  {active.caption}
                </p>
              </div>

              {/* Nav arrows */}
              {activeIdx > 0 && (
                <button
                  onClick={prev}
                  style={{
                    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#fff', zIndex: 3,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              {activeIdx < ROOMS.length - 1 && (
                <button
                  onClick={next}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#fff', zIndex: 3,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              )}

              {/* Room counter */}
              <div style={{
                position: 'absolute', top: 16, right: 16, zIndex: 3,
                padding: '6px 14px', borderRadius: '20px',
                background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span className="font-sans" style={{ fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>
                  {activeIdx + 1} / {ROOMS.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Connection buttons — "From here, go to..." */}
        {active.connections.length > 0 && (
          <motion.div
            key={active.id + '-conn'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            style={{ marginTop: 'clamp(16px, 2vh, 24px)' }}
          >
            <span className="font-sans uppercase" style={{ fontSize: '0.52rem', fontWeight: 500, letterSpacing: '0.35em', color: '#A48A6A', display: 'block', marginBottom: '10px', textAlign: 'center' }}>
              Connected Spaces
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {active.connections.map(connId => {
                const room = ROOMS.find(r => r.id === connId);
                if (!room) return null;
                return (
                  <button
                    key={connId}
                    onClick={() => goTo(connId)}
                    className="group flex items-center gap-2"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '24px',
                      border: '1px solid rgba(28,28,26,0.12)',
                      background: 'rgba(28,28,26,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#1C1C1A'; e.currentTarget.style.color = '#F6F4EF'; e.currentTarget.style.borderColor = '#1C1C1A'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(28,28,26,0.02)'; e.currentTarget.style.color = '#1C1C1A'; e.currentTarget.style.borderColor = 'rgba(28,28,26,0.12)'; }}
                  >
                    <ArrowRight size={10} style={{ opacity: 0.5 }} />
                    <span className="font-sans" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                      {room.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ marginTop: 'clamp(20px, 3vh, 32px)', padding: '0 16px' }}>
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {ROOMS.map((room, i) => (
            <button
              key={room.id}
              onClick={() => setActiveIdx(i)}
              style={{
                flexShrink: 0,
                width: 'clamp(80px, 10vw, 110px)',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
                opacity: i === activeIdx ? 1 : 0.45,
                transition: 'opacity 0.3s',
              }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '6px',
                overflow: 'hidden',
                border: i === activeIdx ? '2px solid #1C1C1A' : '2px solid transparent',
                transition: 'border-color 0.3s',
              }}>
                <img src={room.img} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <span className="font-sans block text-center" style={{
                fontSize: '0.52rem',
                fontWeight: i === activeIdx ? 600 : 400,
                letterSpacing: '0.06em',
                color: i === activeIdx ? '#1C1C1A' : '#6B6B67',
                marginTop: '4px',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {room.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}