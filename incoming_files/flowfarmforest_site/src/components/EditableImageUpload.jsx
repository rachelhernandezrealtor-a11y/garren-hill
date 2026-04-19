import React, { useState, useEffect } from 'react';
import { useEditMode } from './EditModeContext';
import { base44 } from '@/api/base44Client';

export function EditableImageUpload({ id, src, alt, className = '', onImageChange }) {
  const { isEditMode, editedContent, updateContent } = useEditMode();
  const [localSrc, setLocalSrc] = useState(src);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLocalSrc(editedContent[id] !== undefined ? editedContent[id] : src);
  }, [editedContent[id], id, src]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setLocalSrc(file_url);
      updateContent(id, file_url);
      onImageChange?.(file_url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (isEditMode) {
    return (
      <div className="relative group">
        <img src={localSrc} alt={alt} className={className} onError={() => {}} />
        <label className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors opacity-0 group-hover:opacity-100">
          {uploading ? 'Uploading...' : 'Change'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
    );
  }

  return <img src={localSrc} alt={alt} className={className} />;
}