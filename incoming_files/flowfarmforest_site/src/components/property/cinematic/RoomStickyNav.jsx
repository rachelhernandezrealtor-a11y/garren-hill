import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ROOMS from './roomTourData';

/**
 * Sticky horizontal room navigation bar.
 * Shows all rooms as a scrollable strip with the current room highlighted.
 * Includes a back-to-home button.
 */
export default function RoomStickyNav({ currentSlug }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const currentIndex = ROOMS.findIndex(r => r.slug === currentSlug);

  // Auto-scroll to keep current room in view
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.children[currentIndex + 1]; // +1 for the home button
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [currentIndex]);

  const goToRoom = (slug) => {
    navigate('/room/' + slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div
      className="relative z-40 w-full"
      style={{
        background: 'rgba(246,244,239,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(28,28,26,0.06)',
      }}
    >
      <div className="flex items-center gap-0 max-w-full">
        {/* Back to home */}
        <button
          onClick={() => { navigate('/Home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 h-10 font-sans uppercase transition-all hover:opacity-70"
          style={{
            fontSize: '0.48rem', fontWeight: 500, letterSpacing: '0.2em',
            color: '#9A8C7A', background: 'none', border: 'none',
            borderRight: '1px solid rgba(28,28,26,0.08)', cursor: 'pointer',
          }}
        >
          <ArrowLeft className="w-3 h-3" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {/* Room strip */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-0 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {ROOMS.map((room, i) => {
            const isCurrent = room.slug === currentSlug;
            return (
              <button
                key={room.slug}
                onClick={() => goToRoom(room.slug)}
                className="flex-shrink-0 flex items-center h-10 px-3 sm:px-4 font-sans transition-all"
                style={{
                  fontSize: '0.5rem',
                  fontWeight: isCurrent ? 600 : 400,
                  letterSpacing: '0.12em',
                  color: isCurrent ? '#1C1C1A' : '#9A8C7A',
                  background: isCurrent ? 'rgba(28,28,26,0.05)' : 'transparent',
                  border: 'none',
                  borderBottom: isCurrent ? '2px solid #1C1C1A' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ opacity: 0.4, marginRight: '6px', fontSize: '0.42rem' }}>{String(i + 1).padStart(2, '0')}</span>
                {room.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}