import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SectionRenderer({ section, onContentChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(section.content || {});

  const handleSave = () => {
    onContentChange(formData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="p-3 bg-gray-50 rounded text-sm text-gray-600">
        <p>Section: {section.section_type}</p>
        {Object.keys(formData).length > 0 && (
          <p className="mt-2 text-xs">Configured with {Object.keys(formData).length} properties</p>
        )}
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="mt-2">
          Edit Content
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
      <h4 className="font-semibold text-sm">Edit {section.section_type}</h4>

      {/* Dynamic form fields based on section type */}
      {section.section_type === 'HeroSection' && (
        <>
          <div>
            <label className="text-xs font-medium">Video URL</label>
            <Input
              value={formData.videoUrl || ''}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="Vimeo video URL"
            />
          </div>
        </>
      )}

      {section.section_type === 'NewVisionSection' && (
        <>
          <div>
            <label className="text-xs font-medium">Title</label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Description</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </>
      )}

      {section.section_type === 'EstateCompoundSection' && (
        <>
          <div>
            <label className="text-xs font-medium">Background Image URL</label>
            <Input
              value={formData.bgImage || ''}
              onChange={(e) => setFormData({ ...formData, bgImage: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium">Title</label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
        </>
      )}

      {/* Generic fallback for unknown sections */}
      {!['HeroSection', 'NewVisionSection', 'EstateCompoundSection'].includes(section.section_type) && (
        <p className="text-xs text-gray-500">Custom section - add properties as needed</p>
      )}

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}