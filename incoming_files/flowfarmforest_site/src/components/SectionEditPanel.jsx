import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Save } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function SectionEditPanel({ section, onClose, onSave }) {
  const [content, setContent] = useState(section?.content || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setContent(section?.content || {});
  }, [section]);

  const handleSave = async () => {
    if (!section?.id) return;
    
    setIsSaving(true);
    try {
      await base44.entities.PageSection.update(section.id, { content });
      toast.success('Section updated');
      onSave?.();
    } catch (error) {
      toast.error('Failed to save section');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setContent({ ...content, [key]: value });
  };

  if (!section) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h2 className="font-serif text-lg font-light">{section.section_type}</h2>
          <p className="text-xs text-gray-500 mt-1">{section.title}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.keys(content).length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-12">No editable content</p>
        ) : (
          Object.entries(content).map(([key, value]) => (
            <div key={key}>
              <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                {key.replace(/_/g, ' ')}
              </label>
              {typeof value === 'string' && value.length > 100 ? (
                <textarea
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24"
                />
              ) : typeof value === 'boolean' ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">{value ? 'Enabled' : 'Disabled'}</span>
                </label>
              ) : (
                <Input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 flex gap-2">
        <Button
          onClick={() => setContent(section?.content || {})}
          variant="ghost"
          size="sm"
          className="text-gray-600"
        >
          Revert
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1"
          size="sm"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}