import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, X } from 'lucide-react';

export default function AmenitiesManager({ amenity, onClose }) {
  const [uploading, setUploading] = useState(false);
  const [label, setLabel] = useState(amenity.label);
  const [copy, setCopy] = useState(amenity.copy || '');
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.CabanaAmenity.update(amenity.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabanaAmenities'] });
      onClose();
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await updateMutation.mutateAsync({ ...amenity, image: file_url });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    await updateMutation.mutateAsync({ ...amenity, label, copy });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 9999
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        padding: '32px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{amenity.label}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <img src={amenity.image} alt={amenity.label} style={{ width: '100%', borderRadius: '6px', marginBottom: '16px' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>Description</label>
          <textarea
            value={copy}
            onChange={(e) => setCopy(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              minHeight: '80px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <label style={{
          display: 'block',
          padding: '16px',
          border: '2px dashed #ddd',
          borderRadius: '6px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          textAlign: 'center',
          opacity: uploading ? 0.6 : 1,
          marginBottom: '16px'
        }}>
          <Upload style={{ width: '20px', height: '20px', margin: '0 auto 8px' }} />
          <div style={{ fontSize: '14px', color: '#666' }}>
            {uploading ? 'Uploading...' : 'Click to upload new image'}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '10px',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px',
              background: '#f0f0f0',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}