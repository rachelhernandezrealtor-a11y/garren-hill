import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Eye, EyeOff, Settings } from 'lucide-react';
import SectionRenderer from './SectionRenderer';

export default function PageBuilder({ pageName = 'Custom', sections: initialSections, onSectionsChange }) {
  const [sections, setSections] = useState(initialSections || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const availableSectionTypes = [
    'HeroSection', 'EstateGroundsSection', 'NewVisionSection', 'StructuresSection',
    'FeaturesSection', 'EstateCompoundSection', 'SustainabilitySection',
    'InfrastructureSection', 'ScreenedPorchSection', 'ArchitecturalFeaturesSection',
    'StewardshipSection', 'BasementSection', 'FoyerSection', 'GuestHouseSection'
  ];

  useEffect(() => {
    setSections(initialSections || []);
  }, [initialSections]);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const newSections = Array.from(sections);
    const [movedSection] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, movedSection);

    const reorderedSections = newSections.map((s, idx) => ({
      ...s,
      order: idx
    }));

    setSections(reorderedSections);
    onSectionsChange?.(reorderedSections);

    // Update in DB
    for (let section of reorderedSections) {
      if (section.id) {
        await base44.entities.PageSection.update(section.id, { order: section.order });
      }
    }
  };

  const handleAddSection = async (sectionType) => {
    const newSection = {
      page_name: pageName,
      section_type: sectionType,
      order: sections.length,
      title: sectionType,
      content: {},
      visible: true
    };

    const created = await base44.entities.PageSection.create(newSection);
    const updatedSections = [...sections, created];
    setSections(updatedSections);
    onSectionsChange?.(updatedSections);
    setShowAddModal(false);
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm('Delete this section?')) return;
    await base44.entities.PageSection.delete(id);
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    onSectionsChange?.(updated);
  };

  const handleToggleVisible = async (section) => {
    const updated = { ...section, visible: !section.visible };
    if (section.id) {
      await base44.entities.PageSection.update(section.id, { visible: updated.visible });
    }
    const updatedSections = sections.map(s => s.id === section.id ? updated : s);
    setSections(updatedSections);
    onSectionsChange?.(updatedSections);
  };

  const handleUpdateContent = async (section, newContent) => {
    if (section.id) {
      await base44.entities.PageSection.update(section.id, { content: newContent });
    }
    const updated = sections.map(s => s.id === section.id ? { ...s, content: newContent } : s);
    setSections(updated);
    onSectionsChange?.(updated);
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-4 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
            >
              {sections.filter(s => s.visible).map((section, index) => (
                <Draggable key={section.id || `new-${index}`} draggableId={section.id || `new-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative border-l-4 border-primary pl-4 py-2 ${snapshot.isDragging ? 'bg-yellow-100' : 'bg-white'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div {...provided.dragHandleProps} className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                          <span className="text-sm font-medium text-primary">⋮⋮</span>
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleVisible(section)}
                            title={section.visible ? 'Hide' : 'Show'}
                          >
                            {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSection(section)}
                            title="Edit"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSection(section.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <SectionRenderer section={section} onContentChange={(newContent) => handleUpdateContent(section, newContent)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={() => setShowAddModal(!showAddModal)} className="mt-6 gap-2 bg-primary">
        <Plus className="w-4 h-4" /> Add Section
      </Button>

      {showAddModal && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-3">Select Section Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableSectionTypes.map(type => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => handleAddSection(type)}
                className="justify-start text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}