import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TemplateLibrary from './TemplateLibrary';
import SectionCard from './SectionCard';
import SectionEditPanel from './SectionEditPanel';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import HeroSection from '@/components/property/HeroSection';
import NewVisionSection from '@/components/property/NewVisionSection';
import StructuresSection from '@/components/property/StructuresSection';
import FeaturesSection from '@/components/property/FeaturesSection';
import EstateGroundsSection from '@/components/property/EstateGroundsSection';
import EstateCompoundSection from '@/components/property/EstateCompoundSection';
import SustainabilitySection from '@/components/property/SustainabilitySection';
import InfrastructureSection from '@/components/property/InfrastructureSection';
import ScreenedPorchSection from '@/components/property/ScreenedPorchSection';

const sectionComponents = {
  HeroSection,
  EstateGroundsSection,
  NewVisionSection,
  StructuresSection,
  FeaturesSection,
  EstateCompoundSection,
  SustainabilitySection,
  InfrastructureSection,
  ScreenedPorchSection
};

export default function PageBuilderV2({ sections: initialSections, onSectionsChange }) {
  const [sections, setSections] = useState(initialSections);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [clickSelectMode, setClickSelectMode] = useState(false);
  const previewRef = useRef(null);
  const highlightRef = useRef(null);
  
  const pageName = sections.length > 0 ? sections[0].page_name : 'Unknown Page';

  const scrollToSection = (sectionId) => {
    if (previewRef.current) {
      const element = previewRef.current.querySelector(`[data-section-id="${sectionId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightRef.current = sectionId;
        element.style.outline = '3px solid #3b82f6';
        element.style.outlineOffset = '4px';
        setTimeout(() => {
          element.style.outline = 'none';
          highlightRef.current = null;
        }, 2500);
      }
    }
  };

  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const handleAddSection = async (sectionType) => {
    const newSection = {
      page_name: pageName,
      section_type: sectionType,
      order: Math.max(...sections.map(s => s.order || 0), 0) + 1,
      title: sectionType,
      visible: true,
      content: {}
    };

    try {
      const created = await base44.entities.PageSection.create(newSection);
      const updated = [...sections, created].sort((a, b) => a.order - b.order);
      setSections(updated);
      onSectionsChange(updated);
      toast.success('Section added');
    } catch (error) {
      toast.error('Failed to add section');
      console.error(error);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await base44.entities.PageSection.delete(sectionId);
      const updated = sections.filter(s => s.id !== sectionId);
      setSections(updated);
      onSectionsChange(updated);
      toast.success('Section removed');
    } catch (error) {
      toast.error('Failed to delete section');
      console.error(error);
    }
  };

  const handleToggleVisibility = async (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    try {
      await base44.entities.PageSection.update(sectionId, { visible: !section.visible });
      const updated = sections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s);
      setSections(updated);
      onSectionsChange(updated);
    } catch (error) {
      toast.error('Failed to update section');
      console.error(error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index) return;

    const items = Array.from(sections);
    const [reordered] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reordered);

    // Update order values
    const updated = items.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSections(updated);

    // Batch update orders
    try {
      for (const section of updated) {
        await base44.entities.PageSection.update(section.id, { order: section.order });
      }
      onSectionsChange(updated);
      toast.success('Order updated');
    } catch (error) {
      toast.error('Failed to save order');
      console.error(error);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // All changes are saved in real-time, this is just a confirmation
      toast.success('All changes saved');
    } catch (error) {
      toast.error('Failed to save');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Delete all sections? This cannot be undone.')) return;
    
    try {
      for (const section of sections) {
        await base44.entities.PageSection.delete(section.id);
      }
      setSections([]);
      onSectionsChange([]);
      toast.success('All sections deleted');
    } catch (error) {
      toast.error('Failed to delete sections');
      console.error(error);
    }
  };

  const handlePreviewClick = (e) => {
    if (!clickSelectMode) return;
    
    let target = e.target;
    while (target && !target.hasAttribute('data-section-id')) {
      target = target.parentElement;
    }
    
    if (target) {
      const sectionId = target.getAttribute('data-section-id');
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        setEditingSection(section);
        scrollToSection(sectionId);
      }
    }
  };

  const handleEditPanelSave = () => {
    const updated = sections.map(s => s.id === editingSection.id ? editingSection : s);
    setSections(updated);
    onSectionsChange(updated);
  };

  const renderSection = (section) => {
    const Component = sectionComponents[section.section_type];
    return Component ? (
      <div 
        key={section.id} 
        data-section-id={section.id}
        className={clickSelectMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all' : ''}
        onClick={handlePreviewClick}
      >
        <Component {...section.content} />
      </div>
    ) : null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left: Template Library */}
      <TemplateLibrary onAddSection={handleAddSection} />

      {/* Middle: Sections List */}
      <div className="w-80 flex flex-col border-r border-gray-200 bg-white">
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="font-serif text-2xl font-light">{pageName}</h1>
          <p className="text-sm text-gray-500 mt-1">{sections.length} sections</p>
          <Button
            onClick={() => setClickSelectMode(!clickSelectMode)}
            variant={clickSelectMode ? 'default' : 'outline'}
            size="sm"
            className="w-full mt-3"
          >
            {clickSelectMode ? '✓ Click to Select' : 'Click to Select'}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {sections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4 text-sm">No sections yet</p>
              <Button onClick={() => handleAddSection('HeroSection')} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`transition-colors space-y-2 ${
                      snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                    }`}
                  >
                    {sections.map((section, index) => (
                      <SectionCard
                        key={section.id}
                        section={section}
                        index={index}
                        onDelete={handleDeleteSection}
                        onToggleVisibility={handleToggleVisibility}
                        onEdit={(section) => {
                          setEditingSection(section);
                          scrollToSection(section.id);
                        }}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 flex gap-2">
          <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            size="sm"
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleDeleteAll}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 text-sm text-gray-600">
          Live Preview {clickSelectMode && <span className="text-blue-600 font-medium">(Click enabled)</span>}
        </div>
        <div className="flex-1 overflow-y-auto" ref={previewRef}>
          {sections.filter(s => s.visible).map(section => renderSection(section))}
        </div>
      </div>

      {/* Edit Panel */}
      {editingSection && (
        <SectionEditPanel
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSave={handleEditPanelSave}
        />
      )}
    </div>
  );
}