import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Zap, Sun, Droplets, Wind, Cpu, ShieldCheck, Network, X, Save, Plus } from 'lucide-react';

const iconMap = {
  Zap, Sun, Droplets, Wind, Cpu, ShieldCheck, Network
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function EditableSustainabilitySection() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const { data: blocks = [], isLoading } = useQuery({
    queryKey: ['sustainabilityContent'],
    queryFn: () => base44.entities.SustainabilityContent.list()
  });

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SustainabilityContent.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sustainabilityContent'] });
      setEditingId(null);
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.SustainabilityContent.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sustainabilityContent'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.SustainabilityContent.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sustainabilityContent'] });
    }
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const newBlocks = [...sortedBlocks];
    const [reorderedItem] = newBlocks.splice(source.index, 1);
    newBlocks.splice(destination.index, 0, reorderedItem);

    newBlocks.forEach((block, idx) => {
      if (block.order !== idx) {
        updateMutation.mutate({ id: block.id, data: { order: idx } });
      }
    });
  };

  const startEdit = (block) => {
    setEditingId(block.id);
    setEditData({ ...block });
  };

  const saveEdit = () => {
    updateMutation.mutate({ id: editingId, data: editData });
  };

  const renderBlock = (block, index) => {
    const isEditing = editingId === block.id;
    const IconComponent = iconMap[block.icon_name] || Zap;

    if (isEditing) {
      return (
        <div key={block.id} className="p-4 bg-primary/5 rounded border border-primary/20">
          <input
            type="text"
            placeholder="Title"
            value={editData.title || ''}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded text-sm"
          />
          <textarea
            placeholder="Content"
            value={editData.content || ''}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            className="w-full p-2 mb-2 border rounded text-sm"
            rows="3"
          />
          {block.block_type === 'system_card' && (
            <input
              type="text"
              placeholder="Subtitle"
              value={editData.subtitle || ''}
              onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
              className="w-full p-2 mb-2 border rounded text-sm"
            />
          )}
          {block.block_type === 'image' && (
            <>
              <input
                type="text"
                placeholder="Image URL"
                value={editData.image_url || ''}
                onChange={(e) => setEditData({ ...editData, image_url: e.target.value })}
                className="w-full p-2 mb-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Image Caption"
                value={editData.image_caption || ''}
                onChange={(e) => setEditData({ ...editData, image_caption: e.target.value })}
                className="w-full p-2 mb-2 border rounded text-sm"
              />
            </>
          )}
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="px-3 py-1 bg-primary text-white rounded text-sm flex items-center gap-1"
            >
              <Save className="w-3 h-3" /> Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="px-3 py-1 bg-gray-300 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteMutation.mutate(block.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm ml-auto"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <Draggable key={block.id} draggableId={block.id} index={index}>
        {(provided, snapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-4 border rounded cursor-grab active:cursor-grabbing transition-all ${snapshot.isDragging ? 'opacity-50 bg-gray-100' : 'bg-white hover:border-primary/50'}`}
            onClick={() => startEdit(block)}
          >
            {block.block_type === 'header' && (
              <div>
                <span className="text-xs uppercase text-accent">{block.subtitle}</span>
                <h2 className="font-serif text-2xl font-light text-primary mt-2">{block.title}</h2>
                {block.content && <p className="text-sm mt-2 italic">{block.content}</p>}
              </div>
            )}
            {block.block_type === 'callout' && (
              <div className="p-4 bg-foreground/5 rounded border border-foreground/10">
                <p className="font-sans text-sm font-light">{block.content}</p>
              </div>
            )}
            {block.block_type === 'text' && (
              <p className="font-sans text-sm font-light text-foreground/80">{block.content}</p>
            )}
            {block.block_type === 'image' && (
              <div>
                <img src={block.image_url} alt={block.image_caption} className="w-full rounded" />
                <p className="text-xs uppercase text-muted-foreground mt-2">{block.image_caption}</p>
              </div>
            )}
            {block.block_type === 'system_card' && (
              <div className="flex items-center gap-4 p-3 border border-border hover:border-foreground/30">
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-lg font-light">{block.title}</h3>
                  <p className="text-xs uppercase text-muted-foreground">{block.subtitle}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </Draggable>
    );
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <section id="sustainability" className="bg-background py-24 md:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="content">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-6"
              >
                {sortedBlocks.map((block, idx) => renderBlock(block, idx))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          onClick={() => {
            const maxOrder = Math.max(...sortedBlocks.map(b => b.order), -1);
            createMutation.mutate({
              section_key: `new_${Date.now()}`,
              block_type: 'text',
              order: maxOrder + 1,
              title: 'New Block',
              content: 'Edit this content...'
            });
          }}
          className="mt-6 px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Block
        </button>
      </div>
    </section>
  );
}