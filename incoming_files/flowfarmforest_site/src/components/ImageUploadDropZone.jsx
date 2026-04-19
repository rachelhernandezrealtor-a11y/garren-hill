import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ImageUploadDropZone({ onImageUpload, isLoading }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files) => {
    if (!files.length) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onImageUpload(file_url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        dragActive 
          ? 'border-accent bg-accent/10' 
          : 'border-border hover:border-accent/50'
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
      />
      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
      <p className="font-sans text-sm font-light text-muted-foreground">
        {isLoading ? 'Uploading...' : 'Drag image here or click to upload'}
      </p>
    </div>
  );
}