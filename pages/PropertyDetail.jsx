import { useState, useEffect, useRef } from 'react';
import { Property, PropertyPhoto } from '@/api/entities';


const GOLD = '#C9A96E';
const DARK = '#0a0a0a';
const CREAM = '#F5F0E8';

export default function PropertyDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [filter, setFilter] = useState('All');
  const fileRef = useRef();

  useEffect(() => {
    if (!id) return;
    Property.get(id).then(setProperty);
    PropertyPhoto.filter({ property_id: id }).then(data => setPhotos(data.sort((a,b) => (a.sort_order||0)-(b.sort_order||0))));
  }, [id]);

  const upload = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);
    let successCount = 0;
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress(`Uploading ${i + 1} of ${fileArray.length}...`);
      try {
        const file_url = URL.createObjectURL(file);
        if (file_url) {
          await PropertyPhoto.create({
            property_id: id,
            file_url,
            file_name: file.name,
            status: 'active',
            sort_order: photos.length + i
          });
          successCount++;
        }
      } catch(e) {
        console.error('Upload failed for', file.name, e);
      }
    }
    const updated = await PropertyPhoto.filter({ property_id: id });
    const sorted = updated.sort((a,b) => (a.sort_order||0)-(b.sort_order||0));
    setPhotos(sorted);
    await Property.update(id, { photo_count: updated.length, thumbnail_url: sorted[0]?.file_url });
    setUploadProgress(`Done! ${successCount} of ${fileArray.length} uploaded.`);
    setTimeout(() => setUploadProgress(''), 3000);
    setUploading(false);
  };

  const rooms = ['All', ...Array.from(new Set(photos.map(p => p.room || p.ai_room || 'Uncategorized').filter(Boolean)))];
  const filtered = filter === 'All' ? photos : photos.filter(p => (p.room || p.ai_room || 'Uncategorized') === filter);

  if (!property) return <div style={{ background: DARK, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '13px' }}>Loading...</p></div>;

  return (
    <div style={{ minHeight: '100vh', background: DARK, color: '#fff', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '1.4rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="/Properties" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>&larr; Properties</a>
          <p style={{ margin: 0, color: CREAM, fontSize: '1rem' }}>{property.address}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '11px' }}>{photos.length} photos</span>
          <button
            onClick={() => fileRef.current.click()}
            disabled={uploading}
            style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', padding: '0.7rem 1.6rem', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.5 : 1 }}>
            {uploading ? 'Uploading...' : '+ Upload Photos'}
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => upload(e.target.files)} />
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files); }}
        style={{ margin: '2rem 2.5rem', border: `1px dashed ${uploading ? GOLD : 'rgba(255,255,255,0.08)'}`, borderRadius: 2, padding: '2rem', textAlign: 'center', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'border-color 0.3s' }}
        onClick={() => !uploading && fileRef.current.click()}>
        <p style={{ margin: 0, color: uploading ? GOLD : 'rgba(255,255,255,0.15)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {uploadProgress || (uploading ? 'Uploading...' : 'Drag & drop photos here or click to browse')}
        </p>
      </div>

      {/* Room filter */}
      {rooms.length > 1 && (
        <div style={{ padding: '0 2.5rem 1.5rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {rooms.map(r => (
            <button key={r} onClick={() => setFilter(r)} style={{ background: filter === r ? GOLD : 'transparent', border: `1px solid ${filter === r ? GOLD : 'rgba(255,255,255,0.1)'}`, color: filter === r ? '#000' : 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '0.5rem 1.1rem', cursor: 'pointer' }}>
              {r}
            </button>
          ))}
        </div>
      )}

      {/* Photo grid */}
      {filtered.length === 0 && !uploading && (
        <div style={{ padding: '2rem 2.5rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>No photos yet. Upload some above.</p>
        </div>
      )}
      <div style={{ padding: '0 2.5rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
        {filtered.map(photo => (
          <div key={photo.id} style={{ position: 'relative', overflow: 'hidden', background: '#111' }}>
            <img src={photo.enhanced_url || photo.file_url} alt={photo.file_name} style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }} />
            {(photo.room || photo.ai_room) && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '0.5rem 0.7rem' }}>
                <p style={{ margin: 0, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{photo.room || photo.ai_room}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
