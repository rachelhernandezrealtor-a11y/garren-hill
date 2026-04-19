import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ROOMS from './roomTourData';

const ease = [0.22, 0.1, 0.28, 1];

// Group rooms by floor level and extract connections
const FLOOR_LEVELS = {
  'Main Level': ROOMS.filter(r => r.category === 'Entry & Living' || r.category === 'Kitchen & Dining'),
  'Primary Suite': ROOMS.filter(r => r.category === 'Primary Suite'),
  'Family Wing': ROOMS.filter(r => r.category === 'Family Wing'),
  'Upper Level': ROOMS.filter(r => r.category === 'Upper Level'),
  'Lower Level': ROOMS.filter(r => r.category === 'Service & Infrastructure'),
};

// Define spatial positions for visual layout (grid coords)
const ROOM_POSITIONS = {
  'Foyer': { x: 2, y: 1, w: 1, h: 1 },
  'Great Room': { x: 1, y: 2, w: 2, h: 2 },
  'Kitchen': { x: 3, y: 2, w: 2, h: 1.5 },
  'Scullery': { x: 3, y: 3.5, w: 1, h: 1 },
  'Dining': { x: 1, y: 4, w: 2, h: 1 },
  'Powder Room': { x: 3, y: 1, w: 1, h: 0.8 },
  'Primary Suite': { x: 1, y: 1, w: 2, h: 1.5 },
  'Primary Bath': { x: 1, y: 2.5, w: 1, h: 0.8 },
  'Guest House': { x: 4, y: 1, w: 1.5, h: 1.5 },
  'Basement': { x: 1, y: 1, w: 3, h: 2 },
};

function RoomNode({ room, isActive, onClick }) {
  const pos = ROOM_POSITIONS[room.label] || { x: Math.random() * 4, y: Math.random() * 4, w: 1, h: 1 };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      onClick={onClick}
      style={{
        gridColumn: `${pos.x} / span ${pos.w}`,
        gridRow: `${pos.y} / span ${pos.h}`,
      }}
      className="relative cursor-pointer group"
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}
        style={{
          padding: 'clamp(14px, 2vw, 20px)',
          background: '#fff',
          border: isActive ? '1.5px solid #1C1C1A' : '1px solid rgba(212,196,176,0.4)',
          borderRadius: '12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          boxShadow: isActive ? '0 16px 40px rgba(0,0,0,0.12)' : '0 4px 14px rgba(0,0,0,0.06)',
          transition: 'all 0.5s cubic-bezier(0.22, 0.1, 0.28, 1)',
        }}
      >
        <h4 className="font-display" style={{ fontSize: 'clamp(0.85rem, 1vw, 1.1rem)', fontWeight: 300, margin: 0, color: '#1C1C1A', lineHeight: 1.2, letterSpacing: '0.01em' }}>
          {room.label}
        </h4>
        <p className="font-sans" style={{ fontSize: '0.7rem', color: '#ADA496', margin: '4px 0 0 0', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {room.images?.length || 0} photos
        </p>
      </motion.div>
    </motion.div>
  );
}

function FloorLevelView({ levelName, rooms }) {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease }}
      className="w-full"
    >
      {/* Floor title */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display"
          style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 300,
            color: '#1C1C1A',
            margin: 0,
            marginBottom: '8px',
            letterSpacing: '0.01em',
          }}
        >
          {levelName}
        </motion.h3>
        <div style={{ width: '40px', height: '1px', background: '#C9B89A' }} />
      </div>

      {/* Spatial grid layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, minmax(100px, 1fr))',
          gap: 'clamp(12px, 2vw, 18px)',
          aspectRatio: '5/4',
          minHeight: '500px',
          padding: 'clamp(20px, 3vw, 32px)',
          background: 'linear-gradient(135deg, rgba(246,244,239,0.5) 0%, rgba(240,236,229,0.5) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        {rooms.map((room) => (
          <RoomNode
            key={room.slug}
            room={room}
            isActive={activeRoom === room.slug}
            onClick={() => {
              setActiveRoom(room.slug);
              setTimeout(() => navigate(`/room/${room.slug}`), 600);
            }}
          />
        ))}
      </div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="font-sans text-center"
        style={{
          fontSize: '0.8rem',
          color: '#ADA496',
          marginTop: 'clamp(20px, 3vh, 32px)',
          fontWeight: 400,
          letterSpacing: '0.06em',
        }}
      >
        Click any room to explore its details
      </motion.p>
    </motion.div>
  );
}

export default function RoomsConnectMap() {
  const [activeLevel, setActiveLevel] = useState('Main Level');
  const levels = Object.keys(FLOOR_LEVELS);

  return (
    <section
      data-nav-theme="light"
      className="w-full"
      style={{
        background: '#F6F4EF',
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 6vw, 64px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="text-center mb-12"
        >
          <span
            className="block font-sans uppercase"
            style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.32em',
              color: '#9A8C7A',
              marginBottom: 'clamp(14px, 2vh, 20px)',
            }}
          >
            How Rooms Connect
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#1C1C1A',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Spatial Flow & Layout
          </h2>
        </motion.div>

        {/* Floor level tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              style={{
                padding: '12px 20px',
                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                fontWeight: activeLevel === level ? 400 : 300,
                letterSpacing: '0.08em',
                border: activeLevel === level ? '1.5px solid #1C1C1A' : '1px solid rgba(0,0,0,0.1)',
                background: activeLevel === level ? '#1C1C1A' : 'transparent',
                color: activeLevel === level ? '#fff' : '#1C1C1A',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (activeLevel !== level) {
                  e.target.style.background = 'rgba(0,0,0,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeLevel !== level) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {level}
            </button>
          ))}
        </motion.div>

        {/* Floor view */}
        <FloorLevelView levelName={activeLevel} rooms={FLOOR_LEVELS[activeLevel] || []} />
      </div>
    </section>
  );
}