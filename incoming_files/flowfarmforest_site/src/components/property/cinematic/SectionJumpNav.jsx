import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Home, Leaf, Zap, MapPin, ChevronDown, X } from 'lucide-react';

const MASTER_SECTIONS = [
  { id: 'section-overview', label: 'Overview', shortLabel: 'Overview', icon: Map },
  { id: 'section-residence', label: 'The Residence', shortLabel: 'Residence', icon: Home },
  { id: 'section-farm', label: 'The Farm', shortLabel: 'Farm', icon: Leaf },
  { id: 'section-infrastructure', label: 'Infrastructure', shortLabel: 'Systems', icon: Zap },
  { id: 'grounds', label: 'Walk the Land', shortLabel: 'Map', icon: MapPin },
  { id: 'section-location', label: 'Location', shortLabel: 'Location', icon: MapPin },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72; // navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function SectionJumpNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionsList = typeof document !== 'undefined' ? MASTER_SECTIONS.filter(s => document.getElementById(s.id)) : MASTER_SECTIONS;

  // Show nav once hero is scrolled past (~80vh) and hide over the map (#grounds)
  useEffect(() => {
    const onScroll = () => {
      // Determine visibility
      const baseVisible = window.scrollY > window.innerHeight * 0.6;
      const groundsEl = document.getElementById('grounds');
      let suppress = false;
      if (groundsEl) {
        const r = groundsEl.getBoundingClientRect();
        suppress = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3;
      }
      setVisible(baseVisible && !suppress);

      // Detect active section from existing anchors
      const available = MASTER_SECTIONS.filter(s => document.getElementById(s.id));
      let current = null;
      for (const s of available) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          current = s.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeSection = sectionsList.find(s => s.id === activeId);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── DESKTOP: vertical pill on right side ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center py-4 pointer-events-none"
          >
            <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent left-1/2 -translate-x-1/2" />
            <div className="flex flex-col gap-6 relative">
              {sectionsList.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    style={{ pointerEvents: 'auto' }}
                    title={s.label}
                    className="group flex items-center justify-center relative w-6 h-6"
                  >
                    {/* Label tooltip */}
                    <span className="absolute right-full mr-4 font-sans text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 drop-shadow-md">
                      {s.label}
                    </span>
                    {/* Dot */}
                    <div className={`relative flex items-center justify-center w-full h-full transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100 hover:scale-125'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>
                      {isActive && <div className="absolute inset-0 rounded-full bg-[#C9B18F]/20 blur-sm" />}
                      <div className={`w-2 h-2 rounded-full border transition-all duration-500 ${isActive ? 'bg-[#C9B18F] border-[#C9B18F] shadow-[0_0_10px_rgba(201,177,143,0.6)]' : 'bg-black border-white/40 group-hover:border-white/90 group-hover:bg-white/20'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── MOBILE: bottom pill bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden"
          >
            {/* Collapsed pill */}
            {!mobileOpen && (
              <button
                onClick={() => setMobileOpen(true)}
                className="ff-glass-chip gap-2.5 px-4 py-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9B18F]" />
                <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white">
                  {activeSection?.shortLabel || 'Navigate'}
                </span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>
            )}

            {/* Expanded tray */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-bold glass-card rounded-2xl overflow-hidden min-w-[240px] text-white/90"
                >
                  {/* Close row */}
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[#C9B18F]/20">
                    <span className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">Jump To</span>
                    <button onClick={() => setMobileOpen(false)} className="text-white/40 hover:text-white transition-colors p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Section list */}
                  <div className="py-2">
                    {sectionsList.map((s) => {
                      const Icon = s.icon;
                      const isActive = activeId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => { scrollToSection(s.id); setMobileOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 border-l ${isActive ? 'bg-[#C9B18F]/10 border-[#C9B18F]/50' : 'border-transparent hover:bg-white/5'}`}
                        >
                          <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#C9B18F]' : 'text-white/60'}`} />
                          <span className={`font-sans text-[0.75rem] font-medium tracking-wide ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {s.label}
                          </span>
                          {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C9B18F] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}