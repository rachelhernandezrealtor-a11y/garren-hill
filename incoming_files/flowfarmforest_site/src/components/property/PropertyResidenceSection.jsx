import React from 'react';
import PropertyRoomCard from './PropertyRoomCard';

export default function PropertyResidenceSection({ data, onOpenGallery }) {
  return (
    <section id="ff-residence" style={{ background: '#fff', padding: 'clamp(34px, 5vw, 64px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 22px', transform: 'translateX(-14px)' }}>
        <div style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: 'clamp(18px, 2.2vw, 28px)', padding: 'clamp(22px, 3.4vw, 46px) clamp(18px, 3.2vw, 40px)', background: '#fff', boxShadow: '0 28px 64px rgba(0,0,0,.06)' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '12px', fontSize: '12px', letterSpacing: '3.4px', textTransform: 'uppercase', color: '#7a7a7a' }}>
            {data.kicker}
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 58px)', lineHeight: 1.08, letterSpacing: '-0.5px', margin: '0 0 16px 0', color: '#111' }}>
            {data.title}
          </h2>
          <div style={{ width: '96px', height: '1px', background: 'rgba(0,0,0,.15)', marginBottom: '18px' }} />

          {/* Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            {data.chips?.map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(0,0,0,.12)',
                  background: '#fafafa',
                  fontSize: '11px',
                  letterSpacing: '2.6px',
                  textTransform: 'uppercase',
                  color: '#111',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  cursor: 'pointer'
                }}
              >
                {chip.label}
              </a>
            ))}
          </div>

          {/* Hero Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: '18px', alignItems: 'start', margin: '12px 0 16px 0' }}>
            <button
              onClick={() => onOpenGallery(data.hero.group || 'living', 0)}
              style={{
                position: 'relative',
                display: 'block',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <img
                src={data.hero.src}
                alt={data.hero.alt}
                style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 18px 50px rgba(0,0,0,.12)' }}
              />
              <div style={{ marginTop: '10px', fontSize: '11px', letterSpacing: '2.2px', textTransform: 'uppercase', color: '#6a6a6a' }}>
                {data.hero.caption}
              </div>
            </button>

            <div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '12px', marginBottom: '14px' }}>
                {data.stats?.map((stat) => (
                  <div key={stat.key} style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: '18px', padding: '14px', background: '#fafafa' }}>
                    <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#111', marginBottom: '8px' }}>
                      {stat.key}
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, fontSize: '26px', lineHeight: 1.1, color: '#111', marginBottom: '6px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#6a6a6a' }}>
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '14px' }}>
                {data.actions?.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener"
                    style={{
                      border: '1px solid #111',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '14px 24px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      letterSpacing: '2.6px',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      whiteSpace: 'normal',
                      lineHeight: 1.25,
                      color: action.type === 'solid' ? '#fff' : '#111',
                      background: action.type === 'solid' ? '#111' : '#fff',
                      transition: 'all .25s ease'
                    }}
                  >
                    {action.label}
                  </a>
                ))}
              </div>

              <div style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#7a7a7a', marginTop: '12px', lineHeight: 1.6 }}>
                {data.note}
              </div>
            </div>
          </div>

          {/* Body */}
          {data.body?.map((paragraph, idx) => (
            <p key={idx} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(15px, 1.35vw, 17px)', lineHeight: 1.78, color: '#2b2b2b', margin: '0 0 12px 0', maxWidth: '92ch' }}>
              {paragraph}
            </p>
          ))}

          {/* Smart Home Callout */}
          {data.smartHome && (
            <div style={{ margin: '18px 0 6px 0', borderRadius: '24px', padding: '18px', background: '#111', color: '#fff', boxShadow: '0 18px 55px rgba(0,0,0,.18)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)', marginBottom: '6px' }}>
                {data.smartHome.kicker}
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.18, margin: '0 0 8px 0', color: '#fff' }}>
                {data.smartHome.title}
              </h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,.86)', margin: '0 0 10px 0', maxWidth: '92ch' }}>
                {data.smartHome.body}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.smartHome.tags?.map((tag) => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '10px 12px', borderRadius: '999px', border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.06)', color: '#fff', fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mini Grid */}
          {data.features && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '16px', margin: '18px 0 14px 0' }}>
              {data.features.map((item) => (
                <div key={item.title} style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: '18px', padding: '14px 14px 12px', background: '#fafafa' }}>
                  <div style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#111', marginBottom: '8px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#2b2b2b' }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rooms Portfolio */}
          {data.rooms && (
            <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid rgba(0,0,0,.10)' }}>
              <div style={{ marginBottom: '12px', fontSize: '12px', letterSpacing: '3.4px', textTransform: 'uppercase', color: '#7a7a7a' }}>
                Interior Portfolio
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.15, margin: '0 0 10px 0', color: '#111' }}>
                A room-by-room visual walkthrough.
              </h3>
              <div style={{ width: '96px', height: '1px', background: 'rgba(0,0,0,.15)', marginBottom: '18px' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '20px', marginTop: '14px' }}>
                {data.rooms.map((room) => (
                  <PropertyRoomCard key={room.id} room={room} onOpenGallery={onOpenGallery} />
                ))}
              </div>

              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(13px, 1.05vw, 15px)', letterSpacing: '.28em', textTransform: 'uppercase', color: '#444', margin: '18px 0 0 0', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,.10)', lineHeight: 1.55 }}>
                {data.tagline}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}