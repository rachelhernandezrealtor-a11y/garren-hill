import React, { useState } from 'react';

export default function PropertyRoomCard({ room, onOpenGallery }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: '24px', background: '#fff', overflow: 'hidden', boxShadow: '0 20px 55px rgba(0,0,0,.08)' }}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#111', marginBottom: '6px' }}>
          {room.kicker}
        </div>
        <div style={{ fontSize: '12px', letterSpacing: '1.2px', color: '#6a6a6a', marginBottom: '12px', textTransform: 'uppercase' }}>
          {room.sub}
        </div>
      </div>

      <button
        onClick={() => onOpenGallery(room.group, 0)}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: 'inherit',
          textDecoration: 'none'
        }}
      >
        <img
          src={room.images[0].src}
          alt={room.images[0].alt}
          style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
        />
      </button>

      <div style={{ padding: '14px 16px 18px' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: 1.7, color: '#2b2b2b', margin: 0, maxWidth: '68ch' }}>
          {room.text}
        </p>

        {room.images.length > 1 ? (
          <details style={{ marginTop: '14px' }}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                borderRadius: '999px',
                padding: '14px 18px',
                fontSize: '12px',
                letterSpacing: '2.6px',
                textTransform: 'uppercase',
                border: '1px solid #111',
                transition: 'all .2s ease',
                userSelect: 'none',
                gap: '10px',
                textAlign: 'center',
                background: '#fff',
                color: '#111',
                cursor: 'pointer',
                listStyle: 'none'
              }}
            >
              View Gallery
            </summary>
            {expanded && (
              <div style={{ padding: '14px 0 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '10px' }}>
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenGallery(room.group, idx)}
                      style={{
                        display: 'block',
                        textDecoration: 'none',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: '100%',
                          height: '78px',
                          objectFit: 'cover',
                          display: 'block',
                          borderRadius: '14px',
                          boxShadow: '0 12px 30px rgba(0,0,0,.10)',
                          transition: 'transform .2s ease'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </details>
        ) : (
          <button
            onClick={() => onOpenGallery(room.group, 0)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              borderRadius: '999px',
              padding: '11px 18px',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: '1px solid #111',
              background: '#fff',
              color: '#111',
              cursor: 'pointer',
              marginTop: '14px',
              transition: 'all .2s ease'
            }}
          >
            Open Photo
          </button>
        )}
      </div>
    </article>
  );
}