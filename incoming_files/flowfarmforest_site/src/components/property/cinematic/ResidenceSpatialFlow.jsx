import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GALLERY_DATA from './galleryData';

const ease = [0.22, 0.1, 0.28, 1];

// Extract unique finishes and spatial descriptions
const SPACES = [
  {
    floor: 'Ground Floor',
    zones: [
      {
        title: 'Foyer & Entry',
        description: 'Reclaimed heart pine flooring with herringbone detail. Soaring entry with natural light through star pendant fixtures. The threshold speaks quietly—reclaimed doors open onto floors that whisper with age.',
      },
      {
        title: 'Living Room',
        description: 'Masonry fireplace anchors a 27.5\' × 23.8\' room beneath 17\' vaulted timber trusses. Heart pine throughout. French doors frame the screened porch beyond—a living room that breathes between indoors and out.',
      },
      {
        title: 'Kitchen & Scullery',
        description: 'Wolf 60" dual-fuel range commands a 19.4\' × 15.6\' kitchen with 4 skylights flooding the space. Heart pine island. Custom wood workstation sink. The scullery (9.5\' × 6.2\') flows seamlessly—a secondary galley for serious cooks.',
      },
      {
        title: 'Dining & Conservatory',
        description: '21.6\' × 11.6\' dining room connects through to an octagonal glass pavilion (19.5\' × 17.7\'). Custom millwork. Granite wet bar. The conservatory\'s timber-framed glass cupola creates a room that belongs equally to sky and land.',
      },
      {
        title: 'Primary Suite',
        description: '19.6\' × 18.5\' bedroom with cathedral ceiling. Sitting room (12.2\' × 18.5\'). Spa primary bath with freestanding tub, rain shower, and agate tile detail. Walk-in closet (11.7\' × 21.7\') with granite island and shoe wall. A private sanctuary.',
      },
      {
        title: 'Family Wing',
        description: 'Play room, two bedrooms with ensuite baths, laundry. Each space distinct yet connected—a wing designed for life lived together and apart. Custom glass tile showers. Heart pine throughout.',
      },
      {
        title: 'Service Wing & Mudroom',
        description: 'Mudroom (17.7\' × 16\') with vaulted ceiling and granite island. Heart pine coat racks. Farmhouse sink and laundry. The mudroom breathes like a room—designed to be seen, designed to function.',
      },
    ],
  },
  {
    floor: 'Second Floor',
    zones: [
      {
        title: 'Executive Office',
        description: '19.5\' × 18.9\' cathedral space with 5 skylights and timber trusses. Bay windows. Custom desk and shelving. The office is a think tank—skylit, open, made for focus and vision.',
      },
      {
        title: 'Guest Suite',
        description: '16.2\' × 12.6\' bonus room open to living room below. Separate guest bedroom (15.6\' × 11.5\') with ensuite bath and skylight. A complete retreat. Custom glass tile. Heart pine detail.',
      },
      {
        title: 'Guest Apartment',
        description: 'Above the mudroom: complete living room, kitchenette, bedroom, and bath. 8\' ceilings. Tray ceiling in bedroom. Fully independent—a second residence within the residence.',
      },
    ],
  },
];

const FLOW = [
  { from: 'Foyer', to: 'Living Room', connection: 'Primary axis through the home' },
  { from: 'Living Room', to: 'Kitchen', connection: 'Open sight lines for entertaining' },
  { from: 'Kitchen', to: 'Scullery', connection: 'Adjacent workspace, same finish palette' },
  { from: 'Kitchen', to: 'Conservatory', connection: 'Through dining room, sight line to glass pavilion' },
  { from: 'Living Room', to: 'Screened Porch', connection: 'French doors frame views, seamless transition' },
  { from: 'Foyer', to: 'Primary Suite', connection: 'Private residential wing, distinct identity' },
  { from: 'Foyer', to: 'Family Wing', connection: 'Living wing for family, separate from primary' },
  { from: 'Main Stair', to: 'Second Floor', connection: 'Architectural centerpiece connecting levels' },
];

export default function ResidenceSpatialFlow() {
  const [activeFloor, setActiveFloor] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease }}
      className="w-full bg-white py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#9A8C7A] mb-4">Interior Spaces</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#1C1C1A] mb-6">
            How the Spaces Connect
          </h2>
          <p className="text-base text-[#6B6B67] max-w-3xl mx-auto leading-relaxed">
            Every room speaks the same language—heart pine, natural light, and craftsmanship. The layout flows from public entertaining to private retreat, each transition considered, each connection deliberate.
          </p>
        </motion.div>

        {/* Floor Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="flex gap-4 justify-center mb-16 md:mb-20"
        >
          {SPACES.map((space, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFloor(idx)}
              className={`px-6 py-3 text-sm font-semibold tracking-[0.1em] uppercase rounded-full transition ${
                activeFloor === idx
                  ? 'bg-[#1C1C1A] text-white'
                  : 'bg-[#F0EBE5] text-[#1C1C1A] hover:bg-[#E8E4DC]'
              }`}
            >
              {space.floor}
            </button>
          ))}
        </motion.div>

        {/* Spaces Grid */}
        <motion.div
          key={activeFloor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="grid md:grid-cols-2 gap-12 mb-20 md:mb-28"
        >
          {SPACES[activeFloor].zones.map((zone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: idx * 0.08 }}
              className="border-l-2 border-[#D4CCBE] pl-6 py-4"
            >
              <h3 className="font-display text-2xl font-light text-[#1C1C1A] mb-3">
                {zone.title}
              </h3>
              <p className="text-[#6B6B67] leading-relaxed text-base">
                {zone.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Spatial Flow Connections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="bg-[#F9F7F2] rounded-3xl p-8 md:p-12 border border-[#E8E4DC]"
        >
          <h3 className="font-display text-3xl font-light text-[#1C1C1A] mb-8">
            Spatial Connections
          </h3>
          <div className="grid gap-6">
            {FLOW.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: idx * 0.05 }}
                className="flex items-start gap-6 pb-6 border-b border-[#E8E4DC] last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-semibold text-[#1C1C1A]">{item.from}</p>
                    <svg className="w-4 h-4 text-[#9A8C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <p className="text-sm font-semibold text-[#1C1C1A]">{item.to}</p>
                  </div>
                  <p className="text-sm text-[#9A8C7A] font-light italic">
                    {item.connection}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}