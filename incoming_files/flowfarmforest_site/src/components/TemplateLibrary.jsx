import React, { useState } from 'react';
import { SECTION_TEMPLATES, CATEGORIES } from './TemplateRegistry';
import { Button } from '@/components/ui/button';
import { Zap, Trees, Lightbulb, Building2, Home, Star, Leaf, Wind, Palette, Sprout, Layers, DoorOpen, Hotel } from 'lucide-react';

const iconMap = {
  Zap, Trees, Lightbulb, Building2, Home, Star, Leaf, Wind, Palette, Sprout, Layers, DoorOpen, Hotel
};

export default function TemplateLibrary({ onAddSection }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? Object.entries(SECTION_TEMPLATES)
    : Object.entries(SECTION_TEMPLATES).filter(([_, t]) => t.category === selectedCategory);

  const handleDragStart = (e, sectionType) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({ sectionType }));
  };

  const handleAddClick = (sectionType) => {
    onAddSection(sectionType);
  };

  return (
    <div className="bg-white border-r border-gray-200 p-4 h-full overflow-y-auto w-80">
      <h2 className="font-serif text-xl font-light mb-4">Add Sections</h2>
      
      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('All')}
          className="text-xs"
        >
          All
        </Button>
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="space-y-2">
        {filteredTemplates.map(([sectionType, template]) => {
          const IconComponent = iconMap[template.icon];
          return (
            <div
              key={sectionType}
              draggable
              onDragStart={(e) => handleDragStart(e, sectionType)}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-move transition-colors bg-white"
            >
              <div className="flex items-start gap-2 mb-2">
                {IconComponent && <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-900">{template.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{template.description}</p>
                </div>
              </div>
              <Button
                onClick={() => handleAddClick(sectionType)}
                size="sm"
                variant="outline"
                className="w-full text-xs"
              >
                Add
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}