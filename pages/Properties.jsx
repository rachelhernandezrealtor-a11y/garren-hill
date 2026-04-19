import { useState, useEffect } from 'react';
import { Property } from '@/api/entities';

export default function Properties() {
  const [props, setProps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Property.list().then(data => { setProps(data); setLoading(false); });
  }, []);

  const card = { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A96E' }}>Photo Hub</p>
        <a href="/FlowFarmLanding2" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>Flow Farm Site</a>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ margin: 0, fontWeight: 400, fontSize: '1.8rem', color: '#F5F0E8' }}>Properties</h1>
          <button
            onClick={() => {
              const addr = prompt('Property address?');
              if (addr) Property.create({ address: addr, status: 'Active', photo_count: 0 }).then(() => Property.list().then(setProps));
            }}
            style={{ background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '0.8rem 1.8rem', cursor: 'pointer' }}>
            + New Property
          </button>
        </div>

        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '13px' }}>Loading...</p>
        ) : props.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '13px' }}>No properties yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {props.map(p => (
              <div key={p.id} style={card} onClick={() => window.location.href = `/PropertyDetail?id=${p.id}`}>
                {p.thumbnail_url
                  ? <img src={p.thumbnail_url} alt="" style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }} />
                  : <div style={{ aspectRatio: '3/2', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>No Photos</p>
                    </div>
                }
                <div style={{ padding: '1.2rem 1.4rem' }}>
                  <p style={{ margin: '0 0 0.3rem', fontSize: '1rem', color: '#F5F0E8' }}>{p.address}</p>
                  <p style={{ margin: 0, fontFamily: 'sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{p.city}{p.city && p.state ? ', ' : ''}{p.state} &mdash; {p.photo_count || 0} photos</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
