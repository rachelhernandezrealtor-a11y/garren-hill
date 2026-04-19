import React from 'react';
import { SECTION_TEMPLATES } from './TemplateRegistry';
import { Button } from '@/components/ui/button';
import { Grip, Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

export default function SectionCard({ 
  section, 
  index, 
  onDelete, 
  onToggleVisibility, 
  onEdit 
}) {
  const template = SECTION_TEMPLATES[section.section_type] || {
    title: section.title || section.section_type,
    description: 'Custom section'
  };

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white border rounded-lg p-4 mb-3 transition-colors ${
            snapshot.isDragging ? 'shadow-lg bg-blue-50 border-blue-300' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
              <Grip className="w-5 h-5" />
            </div>

            {/* Section Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">{template.title}</h3>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => onToggleVisibility(section.id)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
              >
                {section.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </Button>

              <Button
                onClick={() => onEdit(section)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-600 hover:text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => onDelete(section.id)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-600 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Visibility Indicator */}
          {!section.visible && (
            <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
              Hidden from public view
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}