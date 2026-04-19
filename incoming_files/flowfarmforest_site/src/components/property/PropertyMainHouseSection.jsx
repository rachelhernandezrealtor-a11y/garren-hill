import React from 'react';

export default function PropertyMainHouseSection({ data, onOpenGallery }) {
  return (
    <section style={{ background: 'linear-gradient(180deg, rgba(15,17,21,.9), rgba(23,27,34,.9))', padding: 'clamp(54px, 7vw, 92px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 22px' }}>
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: '18px', alignItems: 'start', marginBottom: '18px' }}>
          
          {/* Hero */}
          <article style={{
            position: 'relative',
            minHeight: '420px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,.12)',
            boxShadow: '0 18px 50px rgba(0,0,0,.28)'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${data.hero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scale(1.02)'
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.78))'
            }} />

            <div style={{
              position: 'relative',
              zIndex: 1,
              minHeight: '420px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <button
                  onClick={() => onOpenGallery('mainhouse-highlights')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,.10)',
                    border: '1px solid rgba(255,255,255,.18)',
                    color: 'rgba(255,255,255,.88)',
                    fontSize: '12px',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    transition: 'transform .15s ease, background .15s ease'
                  }}
                >
                  Open Gallery ↗
                </button>
                <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)' }}>
                  Explore the residence
                </div>
              </div>

              <div>
                <h3 style={{ margin: 0, marginBottom: '8px', fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: '24px', letterSpacing: '-.01em', color: 'rgba(255,255,255,.95)' }}>
                  {data.title}
                </h3>
                <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '14.7px', lineHeight: 1.75, color: 'rgba(255,255,255,.80)', maxWidth: '66ch' }}>
                  {data.copy}
                </p>
              </div>
            </div>
          </article>

          {/* Side Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Stats Card */}
            <article style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,.12)', background: 'linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03))', boxShadow: '0 18px 50px rgba(0,0,0,.28)', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)' }}>
                  At a glance
                </div>
                <div style={{ fontSize: '12px', letterSpacing: '.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,.62)' }}>
                  NC guidelines
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {data.stats?.map((stat) => (
                  <div key={stat.key} style={{ padding: '14px', borderRadius: '14px', background: 'rgba(0,0,0,.26)', border: '1px solid rgba(255,255,255,.12)' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.72)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                      {stat.key}
                    </div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginTop: '6px', color: 'rgba(255,255,255,.95)' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12.5px', marginTop: '4px', color: 'rgba(255,255,255,.72)', lineHeight: 1.55 }}>
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,.10)', fontFamily: 'Poppins, sans-serif', fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,.72)' }}>
                {data.note}
              </div>
            </article>

            {/* Signature Spaces */}
            <article style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,.12)', background: 'linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03))', boxShadow: '0 18px 50px rgba(0,0,0,.28)', padding: '18px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)', marginBottom: '10px' }}>
                Signature spaces
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,.84)', lineHeight: 1.78, fontSize: '14px' }}>
                {data.signatureSpaces?.map((space, idx) => (
                  <li key={idx}>{space}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* Featured Photo Grid */}
        <article style={{ marginTop: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)', marginBottom: '6px' }}>
                Featured images
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,.76)', maxWidth: '64ch' }}>
                Living, kitchen, conservatory, dining, and craftsmanship highlights—each clickable into the shared lightbox gallery.
              </div>
            </div>
            <button
              onClick={() => onOpenGallery('mainhouse-highlights')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(216,202,166,.55)',
                background: 'rgba(216,202,166,.12)',
                color: 'rgba(255,255,255,.92)',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                letterSpacing: '.10em',
                textTransform: 'uppercase',
                transition: 'transform .15s ease, background .15s ease',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              View More Photos ↗
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gridTemplateRows: '180px 180px',
            gap: '12px'
          }}>
            {data.featured?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onOpenGallery('mainhouse-highlights', idx)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '18px',
                  border: '1px solid rgba(255,255,255,.12)',
                  background: 'rgba(255,255,255,.04)',
                  display: 'block',
                  textDecoration: 'none',
                  minHeight: '180px',
                  boxShadow: '0 16px 40px rgba(0,0,0,.35)',
                  gridRow: idx === 0 ? '1 / span 2' : 'auto',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${img.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'scale(1.02)'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.72))'
                }} />
                
                {idx === 0 && (
                  <div style={{
                    position: 'absolute',
                    left: '14px',
                    right: '14px',
                    bottom: '14px',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,.10)',
                      border: '1px solid rgba(255,255,255,.18)',
                      color: 'rgba(255,255,255,.88)',
                      fontSize: '12px',
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)'
                    }}>
                      Main House Highlights ↗
                    </span>
                  </div>
                )}

                {idx === data.featured.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    right: '14px',
                    zIndex: 10,
                    color: 'rgba(255,255,255,.92)'
                  }}>
                    <div style={{ fontSize: '18px', fontFamily: 'Playfair Display, serif' }}>View Full Gallery</div>
                    <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)' }}>Main House Photos ↗</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </article>

        {/* Feature Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '12px', marginTop: '18px' }}>
          {data.strip?.map((card) => (
            <article key={card.label} style={{ borderRadius: '18px', border: '1px solid rgba(255,255,255,.12)', background: 'rgba(0,0,0,.26)', padding: '16px 14px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)', marginBottom: '8px' }}>
                {card.label}
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'Playfair Display, serif', fontSize: '18px', color: 'rgba(255,255,255,.94)' }}>
                {card.title}
              </div>
              <div style={{ marginTop: '7px', fontFamily: 'Poppins, sans-serif', fontSize: '13.7px', lineHeight: 1.65, color: 'rgba(255,255,255,.72)' }}>
                {card.copy}
              </div>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'flex-start' }}>
          {data.ctas?.map((cta) => (
            cta.gallery ? (
              <button
                key={cta.label}
                onClick={() => onOpenGallery(cta.gallery)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '999px',
                  border: cta.type === 'primary' ? '1px solid rgba(216,202,166,.55)' : '1px solid rgba(255,255,255,.18)',
                  background: cta.type === 'primary' ? 'rgba(216,202,166,.12)' : 'rgba(255,255,255,.06)',
                  color: cta.type === 'primary' ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.86)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '.10em',
                  textTransform: 'uppercase',
                  transition: 'transform .15s ease, background .15s ease',
                  cursor: 'pointer'
                }}
              >
                {cta.label} ↗
              </button>
            ) : (
              <a
                key={cta.label}
                href={cta.href}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '999px',
                  border: cta.type === 'primary' ? '1px solid rgba(216,202,166,.55)' : '1px solid rgba(255,255,255,.18)',
                  background: cta.type === 'primary' ? 'rgba(216,202,166,.12)' : 'rgba(255,255,255,.06)',
                  color: cta.type === 'primary' ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.86)',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '.10em',
                  textTransform: 'uppercase',
                  transition: 'transform .15s ease, background .15s ease',
                  textDecoration: 'none'
                }}
              >
                {cta.label} ↗
              </a>
            )
          ))}
        </div>
      </div>
    </section>
  );
}