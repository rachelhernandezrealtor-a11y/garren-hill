import React, { useState } from 'react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { Pencil, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export default function EditableSection({ section, children, onSectionUpdate, onSectionDelete }) {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editContent, setEditContent] = useState(section.content || {});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await base44.entities.PageSection.update(section.id, {
        content: editContent,
        title: editContent.title || section.title
      });
      if (onSectionUpdate) {
        onSectionUpdate({ ...section, content: editContent });
      }
      setShowEditor(false);
    } catch (error) {
      console.error('Failed to save section:', error);
      alert('Failed to save section');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete ${section.title || section.section_type}?`)) {
      setLoading(true);
      try {
        await base44.entities.PageSection.delete(section.id);
        if (onSectionDelete) {
          onSectionDelete(section.id);
        }
      } catch (error) {
        console.error('Failed to delete section:', error);
        alert('Failed to delete section');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isEditMode) {
    return <div className="w-full">{children}</div>;
  }

  if (showEditor) {
    return (
      <div className="relative border-4 border-blue-500 bg-blue-50 p-6 rounded-lg">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-4">{section.title || section.section_type}</h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(editContent).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key}</label>
                {typeof value === 'string' && value.length > 100 ? (
                  <textarea
                    value={value}
                    onChange={(e) => setEditContent({ ...editContent, [key]: e.target.value })}
                    className="w-full p-2 border rounded text-sm min-h-20"
                  />
                ) : (
                  <input
                    type="text"
                    value={JSON.stringify(value)}
                    onChange={(e) => {
                      try {
                        setEditContent({ ...editContent, [key]: JSON.parse(e.target.value) });
                      } catch {
                        setEditContent({ ...editContent, [key]: e.target.value });
                      }
                    }}
                    className="w-full p-2 border rounded text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
            <Button onClick={() => setShowEditor(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full transition-all ${isEditMode ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => isEditMode && setIsHovered(true)}
      onMouseLeave={() => isEditMode && setIsHovered(false)}
    >
      {isHovered && isEditMode && (
        <div className="absolute top-0 left-0 right-0 z-50 flex gap-2 p-2 bg-blue-500 text-white rounded-t-lg">
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <span className="text-xs ml-auto py-1">{section.title || section.section_type}</span>
        </div>
      )}
      <div className={`w-full ${isHovered && isEditMode ? 'border-2 border-blue-500 rounded' : ''}`}>
        {children}
      </div>
    </div>
  );
}