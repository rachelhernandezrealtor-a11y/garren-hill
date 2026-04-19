import React, { useEffect, useMemo, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const BG_IMAGE_URL = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/6ca799ad0_generated_image.png';

const INITIAL_PINS = [
  { id: 'main-residence', name: 'Main Residence', x: 59, y: 40, labelX: 44, labelY: 56 },
  { id: 'cabana-house', name: 'Guest House', x: 66, y: 44, labelX: 56, labelY: 49 },
  { id: 'high-tunnel', name: 'High Tunnel', x: 52, y: 60, labelX: 63, labelY: 34 },
  { id: 'farm-workshop', name: 'Farm Workshop', x: 71, y: 51, labelX: 70, labelY: 43 },
  { id: 'compost-area', name: 'Compost Area', x: 74, y: 58, labelX: 74, labelY: 31 },
  { id: 'biochar-area', name: 'Biochar Kiln', x: 46, y: 66, labelX: 78, labelY: 37 },
  { id: 'veganic-farm', name: '3-Acre Veganic Farm', x: 63, y: 79, labelX: 79, labelY: 74 },
];

const PIN_DETAILS = {
  'main-residence': 'The main residence anchors the estate with architectural presence and a direct relationship to the surrounding land.',
  'cabana-house': 'An architecturally matching guest house shell, framed and ready for your custom finishing touches—perfect for hosting family, friends, or longer stays.',
  'high-tunnel': 'The high tunnel supports extended-season growing and reinforces the farm’s productive, year-round capability.',
  'farm-workshop': 'An operational workshop that gives the farm real utility for tools, storage, and daily working use.',
  'compost-area': 'The compost area supports soil health and regenerative growing systems already established on the property.',
  'biochar-area': 'The biochar kiln adds another layer of long-view land stewardship and soil-building infrastructure.',
  'veganic-farm': 'The 3-acre veganic farm is the productive heart of the property, giving the land both beauty and operating value.'
};

const PIN_META = {
  'main-residence': { eyebrow: 'Residence', stat: 'Anchor' },
  'cabana-house': { eyebrow: 'Hospitality', stat: 'Guest retreat' },
  'high-tunnel': { eyebrow: 'Cultivation', stat: 'Season extension' },
  'farm-workshop': { eyebrow: 'Operations', stat: 'Working utility' },
  'compost-area': { eyebrow: 'Soil system', stat: 'Regenerative loop' },
  'biochar-area': { eyebrow: 'Stewardship', stat: 'Long-view infrastructure' },
  'veganic-farm': { eyebrow: 'Production', stat: '3-acre core' }
};

const PIN_SYSTEMS = {
  'main-residence': ['20 Geothermal Wells', '14.3 kW Solar Array', 'Comml. Water Filtration'],
  'cabana-house': ['Subterranean Conduits', 'Independent HVAC', 'Shared Deep Well'],
  'high-tunnel': ['Automated Drip', 'Passive Solar', 'Climate Vents'],
  'farm-workshop': ['600-Amp Main Service', 'Sunny Island Batteries', '30 kW Kohler Gen'],
  'compost-area': ['Closed-Loop Biomass', 'Active Soil Regeneration'],
  'biochar-area': ['Carbon Sequestration', 'Thermal Energy Capture'],
  'veganic-farm': ['50 GPM Deep-Water Well', 'Multi-Zone Irrigation', 'USDA Soil Grid']
};

const PIN_IMAGES = {
  'main-residence': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  'cabana-house': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/53a1ee6da_forestacreage2.jpg',
  'high-tunnel': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/10459209f_HighTunnel.jpg',
  'farm-workshop': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/bcd5e803e_FarmWorkshop.jpg',
  'compost-area': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5a0967e7_CompostingandBioChar.jpg',
  'biochar-area': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5a0967e7_CompostingandBioChar.jpg',
  'veganic-farm': 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ffe63bb65_PNGimage.jpg'
};

const PIN_CARD_LAYOUTS = {
  'main-residence': { side: 'left', desktop: 'left-4 top-[17%]', mobile: 'left-4 top-4 max-w-[240px]' },
  'cabana-house': { side: 'right', desktop: 'right-4 top-[14%]', mobile: 'right-4 top-4 max-w-[240px]' },
  'high-tunnel': { side: 'left', desktop: 'left-4 top-[41%]', mobile: 'left-4 bottom-4 max-w-[240px]' },
  'farm-workshop': { side: 'right', desktop: 'right-4 top-[39%]', mobile: 'right-4 top-4 max-w-[240px]' },
  'compost-area': { side: 'left', desktop: 'left-4 top-[67%]', mobile: 'bottom-3 right-3 left-auto w-[calc(100%-2.5rem)] max-w-[260px]' },
  'biochar-area': { side: 'right', desktop: 'right-4 top-[64%]', mobile: 'left-4 bottom-4 max-w-[240px]' },
  'veganic-farm': { side: 'right', desktop: 'right-4 top-[82%]', mobile: 'bottom-3 right-3 left-auto w-[calc(100%-2.5rem)] max-w-[260px]' }
};

function getConnectorPath(pin, layout) {
  const cardX = layout.side === 'left' ? 8 : 92;
  const cardYMatch = layout.desktop.match(/top-\[(\d+)%\]/);
  const cardY = cardYMatch ? Number(cardYMatch[1]) + 5 : pin.y;
  const midX = layout.side === 'left' ? Math.max(pin.x - 8, cardX + 10) : Math.min(pin.x + 8, cardX - 10);

  return `${cardX},${cardY} ${midX},${cardY} ${pin.x},${pin.y}`;
}

function StructurePin({ pin, selected, onActivate, onDragStart, onSelect }) {
  return (
    <>
      <button
        type="button"
        onMouseEnter={() => onActivate(pin.id)}
        onFocus={() => onActivate(pin.id)}
        onClick={() => onSelect(pin.id)}
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-110"
        style={{ left: `${pin.x}%`, top: `${pin.y}%`, zIndex: selected ? 6 : 4, transform: 'translate(-50%, -50%)' }}
        aria-label={pin.name}
      >
        <span className={`relative flex items-center justify-center transition-all duration-500 ${selected ? 'h-7 w-7' : 'h-4 w-4'}`}>
          {selected && (
             <motion.span 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-4px] rounded-full border border-dashed border-[#C9B18F]/70"
             />
          )}
          <span className={`absolute inset-0 rounded-full border border-white/50 transition-all duration-700 ${selected ? 'animate-[ping_3s_ease-out_infinite] scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
          <span className={`relative rounded-full transition-all duration-500 ${selected ? 'h-3 w-3 bg-white shadow-[0_0_20px_rgba(255,255,255,1)]' : 'h-2 w-2 bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.4)]'}`} />
        </span>
      </button>

      <button
        type="button"
        onMouseDown={(event) => onDragStart(event, pin.id)}
        onTouchStart={(event) => onDragStart(event, pin.id)}
        onClick={() => onSelect(pin.id)}
        onMouseEnter={() => onActivate(pin.id)}
        onFocus={() => onActivate(pin.id)}
        className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans uppercase tracking-[0.15em] transition-all duration-500 cursor-pointer flex items-center rounded-full border px-3 py-1.5 ${
          selected ? 'gap-2 border-white/40 bg-black/85 text-[9px] sm:text-[10px] text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'gap-1.5 border-white/20 bg-black/50 text-[8px] sm:text-[9px] text-white/90 hover:bg-black/70 hover:border-white/30 hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]'
        }`}
        style={{ left: `${pin.labelX}%`, top: `${pin.labelY}%`, zIndex: selected ? 7 : 5, transform: 'translate(-50%, -50%)' }}
        aria-label={`Move ${pin.name} label`}
      >
        <span className={`shrink-0 rounded-full transition-all duration-500 ${selected ? 'h-1.5 w-1.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'h-1 w-1 bg-white/60'}`} />
        <span>{pin.name}</span>
      </button>
    </>
  );
}

function SideCard({ pin, active, onHover, onSelect, featured = false }) {
  const cardClassName = featured
    ? 'group text-left transition-all duration-300 border border-black/10 bg-white px-4 py-4 shadow-[0_14px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
    : `group text-left transition-all duration-300 border px-4 py-4 ${active ? 'border-black/12 bg-white shadow-[0_16px_34px_rgba(0,0,0,0.08)]' : 'border-black/8 bg-white/78 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)]'}`;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(pin.id)}
      onFocus={() => onHover(pin.id)}
      onClick={() => onSelect(pin.id)}
      className={cardClassName}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-2 font-sans text-[0.58rem] font-medium uppercase tracking-[0.28em] text-black/34">{PIN_META[pin.id]?.eyebrow}</p>
          <p className={`${featured ? 'mb-2 text-[1.05rem]' : 'mb-2 text-[0.98rem]'} font-display leading-[1.08] text-black`}>{pin.name}</p>
        </div>
        <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.55rem] font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 ${active || featured ? 'border-black/14 bg-black text-white' : 'border-black/10 bg-white text-black/45 group-hover:border-black/16 group-hover:text-black/65'}`}>
          {active || featured ? 'On' : 'Key'}
        </div>
      </div>
      <p className={`${featured ? 'mb-3 text-[0.72rem]' : 'mb-0 text-[0.68rem]'} font-sans leading-[1.65] text-black/56`}>
        {featured ? PIN_DETAILS[pin.id] : PIN_META[pin.id]?.stat}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-black/8 pt-3">
        <p className="mb-0 font-sans text-[0.58rem] font-medium uppercase tracking-[0.24em] text-black/34">{PIN_META[pin.id]?.stat}</p>
        <p className="mb-0 font-sans text-[0.58rem] uppercase tracking-[0.22em] text-black/40">Select</p>
      </div>
    </button>
  );
}

export default function WalkTheLand({ backgroundImageUrl = BG_IMAGE_URL, children = null, mapKey = 'default-aerial-map' }) {
  const savedPinsByMap = {
    'default-aerial-map': INITIAL_PINS,
    'opportunity-aerial-map': INITIAL_PINS,
    'forest-aerial-map': INITIAL_PINS,
  };

  const defaultSelectedPinId = mapKey === 'forest-aerial-map' ? 'veganic-farm' : (savedPinsByMap[mapKey] || INITIAL_PINS)[0].id;

  const [pins, setPins] = useState(savedPinsByMap[mapKey] || INITIAL_PINS);
  const [activePinId, setActivePinId] = useState(defaultSelectedPinId);
  const [selectedPinId, setSelectedPinId] = useState(defaultSelectedPinId);
  const mapRef = useRef(null);
  const draggingPinIdRef = useRef(null);

  const selectedPin = useMemo(() => pins.find((pin) => pin.id === selectedPinId) || pins[0], [pins, selectedPinId]);
  const selectedCardLayout = selectedPin ? PIN_CARD_LAYOUTS[selectedPin.id] || PIN_CARD_LAYOUTS['main-residence'] : PIN_CARD_LAYOUTS['main-residence'];

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const panXSpring = useSpring(mvX, springConfig);
  const panYSpring = useSpring(mvY, springConfig);

  useEffect(() => {
    if (selectedPin) {
      mvX.set((50 - selectedPin.x) * 0.06);
      mvY.set((50 - selectedPin.y) * 0.06);
    }
  }, [selectedPin, mvX, mvY]);

  const updatePinPosition = (clientX, clientY) => {
    const mapRect = mapRef.current?.getBoundingClientRect();
    const pinId = draggingPinIdRef.current;
    if (!mapRect || !pinId) return;

    const x = clamp(((clientX - mapRect.left) / mapRect.width) * 100, 4, 96);
    const y = clamp(((clientY - mapRect.top) / mapRect.height) * 100, 6, 94);

    setPins((currentPins) =>
      currentPins.map((pin) => {
        if (pin.id !== pinId) return pin;
        const offsetX = pin.labelX - pin.x;
        const offsetY = pin.labelY - pin.y;
        return {
          ...pin,
          x,
          y,
          labelX: clamp(x + offsetX, 4, 96),
          labelY: clamp(y + offsetY, 6, 94),
        };
      })
    );
  };

  useEffect(() => {
    let isMounted = true;

    const loadSavedPins = async () => {
      const savedLayouts = await base44.entities.MapPinLayout.filter({ map_key: mapKey });
      const savedLayout = savedLayouts?.[0];
      const defaultPins = savedPinsByMap[mapKey] || INITIAL_PINS;

      if (isMounted && savedLayout?.pins?.length) {
        const hydratedPins = defaultPins.map((defaultPin) => {
          const savedPin = savedLayout.pins.find((pin) => pin.id === defaultPin.id);
          return savedPin ? { ...defaultPin, ...savedPin, name: defaultPin.name } : defaultPin;
        });
        setPins(hydratedPins);
      } else if (isMounted) {
        setPins(defaultPins);
      }

      if (isMounted) {
        setActivePinId(defaultSelectedPinId);
        setSelectedPinId(defaultSelectedPinId);
      }
    };

    loadSavedPins();
    return () => {
      isMounted = false;
    };
  }, [mapKey, defaultSelectedPinId]);

  const handleDragStart = (event, pinId) => {
    event.preventDefault();
    draggingPinIdRef.current = pinId;
    setActivePinId(pinId);
    setSelectedPinId(pinId);

    const move = (moveEvent) => {
      const point = 'touches' in moveEvent ? moveEvent.touches[0] : moveEvent;
      updatePinPosition(point.clientX, point.clientY);
    };

    const end = () => {
      draggingPinIdRef.current = null;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);

    const point = 'touches' in event ? event.touches[0] : event;
    updatePinPosition(point.clientX, point.clientY);
  };

  const handleMapMove = (event) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect || !selectedPin) return;

    const point = 'touches' in event ? event.touches[0] : event;
    const relativeX = (point.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (point.clientY - rect.top) / rect.height - 0.5;

    mvX.set((50 - selectedPin.x) * 0.06 + (relativeX * -2));
    mvY.set((50 - selectedPin.y) * 0.06 + (relativeY * -2));
  };

  const handleMapLeave = () => {
    if (selectedPin) {
      mvX.set((50 - selectedPin.x) * 0.06);
      mvY.set((50 - selectedPin.y) * 0.06);
    }
  };

  const handleSelectPin = (pinId) => {
    setActivePinId(pinId);
    setSelectedPinId(pinId);
  };

  return (
    <section id="grounds" className="w-full overflow-visible text-white px-0 py-0 sm:px-0 sm:py-0 lg:px-0 lg:py-0 bg-transparent">
      <div className="mx-auto max-w-[90rem]">
        {/* Header */}
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="mb-5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.34em] text-white/40">Interactive estate map</p>
            <h2 className="mb-0 font-display text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-[0.92] text-white">Walk the Land</h2>
          </div>
          <div className="max-w-[38ch] font-sans text-[0.95rem] leading-[1.8] text-white/60">
            <p className="mb-0">Hover, tap, and explore the estate as a complete operating system—each point reveals how the land, structures, and infrastructure work together.</p>
          </div>
        </div>

        {/* Unified View Container */}
        <div className="relative w-full group">
          
          {/* Full Screen Map */}
          <div
            ref={mapRef}
            onMouseMove={handleMapMove}
            onMouseLeave={handleMapLeave}
            onTouchMove={handleMapMove}
            onTouchEnd={handleMapLeave}
            className="relative w-full flex items-center justify-center"
          >

            
            <motion.div
              className="relative w-full will-change-transform z-[1]"
              style={{
                x: useTransform(panXSpring, x => `${x}%`),
                y: useTransform(panYSpring, y => `${y}%`),
                scale: 1.03
              }}
            >
              <img
                src={backgroundImageUrl}
                alt="Aerial view of the estate"
                className="block w-full h-auto"
                style={{ filter: 'none' }}
              />


              
              <div className="absolute inset-0 isolate z-[2]">
                {children ? (
                  <div className="absolute inset-0">{children}</div>
                ) : (
                  <>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full pointer-events-none z-[1]">
                      <motion.path
                        d={`M ${pins.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                        fill="none"
                        stroke="rgba(201,177,143,0.35)"
                        strokeWidth="0.25"
                        strokeDasharray="0.5 1.5"
                        initial={{ pathLength: 0, strokeDashoffset: 0 }}
                        animate={{ pathLength: 1, strokeDashoffset: -20 }}
                        transition={{ 
                          pathLength: { duration: 3, ease: "easeOut" },
                          strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                      />
                      <motion.path
                        d={`M ${pins.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="0.15"
                      />
                    </svg>
                    {pins.map((pin) => (
                      <StructurePin
                        key={pin.id}
                        pin={pin}
                        selected={pin.id === selectedPinId}
                        onActivate={setActivePinId}
                        onDragStart={handleDragStart}
                        onSelect={handleSelectPin}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Floating Content Card */}
          <div
            className={`absolute ${selectedPin?.id === 'cabana-house' ? 'top-4 sm:top-6 lg:top-8 right-0 left-auto sm:right-0 lg:right-0' : (selectedPin?.id === 'main-residence' ? 'top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-auto' : 'top-[44%] lg:top-[48%] left-4 right-4 sm:left-6 sm:right-auto lg:left-8')} sm:w-[280px] lg:w-[320px] pointer-events-none z-10`}
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait">
              {selectedPin && (
                <motion.div 
                  key={selectedPin.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto"
                >
                  <div className="relative p-4 sm:p-5 bg-gradient-to-b from-black/10 to-black/40">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-0 font-sans text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[#C9B18F]"
                      >
                        {PIN_META[selectedPin.id]?.eyebrow}
                      </motion.p>
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 font-sans text-[0.5rem] uppercase tracking-[0.2em] text-white/70"
                      >
                        {PIN_META[selectedPin.id]?.stat}
                      </motion.span>
                    </div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-2 font-display text-[1.2rem] sm:text-[1.3rem] font-normal leading-[1.1] text-white"
                    >
                      {selectedPin.name}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-sans text-[0.75rem] leading-[1.5] text-white/80 mb-4"
                    >
                      {PIN_DETAILS[selectedPin.id]}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="border-t border-white/10 pt-3 mb-2"
                    >
                      <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#C9B18F] mb-2.5">Connected Systems</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PIN_SYSTEMS[selectedPin.id]?.map((sys, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm font-sans text-[0.6rem] uppercase tracking-wider text-white/70">
                            {sys}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Dynamic Tour Links */}
                    {(selectedPin.id === 'main-residence' || selectedPin.id === 'veganic-farm') && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.48 }}
                        className="mt-3 pt-3 border-t border-white/10"
                      >
                        <a 
                          href={selectedPin.id === 'main-residence' ? '#virtual-3d-tour' : '#4d-land-tour'}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#C9B18F]/15 border border-[#C9B18F]/30 px-3 py-2 font-sans text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#C9B18F] transition-all hover:bg-[#C9B18F]/25 hover:text-white"
                        >
                          {selectedPin.id === 'main-residence' ? 'Launch Virtual 3D Tour' : 'Launch 4D Land Tour'}
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </motion.div>
                    )}
                    
                    {/* Navigation dots */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 flex gap-1.5 flex-wrap items-center"
                    >
                      {pins.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => handleSelectPin(p.id)}
                          className={`h-1 transition-all duration-300 rounded-full ${p.id === selectedPinId ? 'w-5 bg-white' : 'w-1 bg-white/30 hover:bg-white/60'}`}
                          aria-label={`Select ${p.name}`}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


      </div>
    </section>
  );
}