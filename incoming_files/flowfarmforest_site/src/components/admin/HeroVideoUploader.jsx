import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

const KEY_MAP = {
  uhd: 'story_hero_video_2160',
  hd: 'story_hero_video_1080',
};

export default function HeroVideoUploader({ target = 'uhd', onUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [detectedInfo, setDetectedInfo] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFileName(file.name);

    // Detect resolution client-side before uploading
    const detectResolution = (file) => new Promise((resolve) => {
      try {
        const url = URL.createObjectURL(file);
        const v = document.createElement('video');
        v.preload = 'metadata';
        v.onloadedmetadata = () => {
          const w = v.videoWidth || 0;
          const h = v.videoHeight || 0;
          URL.revokeObjectURL(url);
          resolve({ width: w, height: h });
        };
        v.onerror = () => {
          URL.revokeObjectURL(url);
          resolve({ width: 0, height: 0 });
        };
        v.src = url;
      } catch {
        resolve({ width: 0, height: 0 });
      }
    });

    try {
      const { width, height } = await detectResolution(file);
      const slot = (width >= 3840 || height >= 2160) ? 'uhd' : (width >= 1920 || height >= 1080) ? 'hd' : 'too_low';

      if (slot === 'too_low') {
        setDetectedInfo(`Detected ${width}×${height} — below 1080p; not saved`);
        alert('Video is below 1080p. Please upload at least 1920×1080 for quality.');
        return;
      }

      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const setting_key = KEY_MAP[slot] || KEY_MAP.uhd;
      const existing = await base44.entities.SiteSettings.filter({ setting_key });
      if (existing && existing[0]) {
        await base44.entities.SiteSettings.update(existing[0].id, { value: file_url });
      } else {
        await base44.entities.SiteSettings.create({ setting_key, value: file_url });
      }
      if (typeof onUpdated === 'function') onUpdated(file_url);
      setDetectedInfo(`Detected ${width}×${height} — saved as ${slot === 'uhd' ? '4K' : '1080p'}`);
    } finally {
      setUploading(false);
    }
  };

  const inputId = `videoUploadInput_${target}`;
  const label = target === 'hd' ? 'Upload 1080p' : 'Upload 4K';

  return (
    <div className="inline-flex items-center gap-2">
      <input
        id={inputId}
        type="file"
        accept="video/*,.mp4,.webm,.mov,.m4v"
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => document.getElementById(inputId)?.click()}
        disabled={uploading}
        className="h-8 text-xs"
        title={`Upload ${label} master for the hero`}
      >
        {uploading ? 'Uploading…' : label}
      </Button>
      {fileName && !uploading && (
        <div className="flex flex-col">
          <span className="text-xs text-white/80">{fileName}</span>
          {detectedInfo && <span className="text-[11px] text-amber-300/90">{detectedInfo}</span>}
        </div>
      )}
    </div>
  );
}