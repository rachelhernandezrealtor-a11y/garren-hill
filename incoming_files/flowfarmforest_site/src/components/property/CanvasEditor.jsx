import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Upload, Type, Image as ImageIcon, Copy, MoveUp, MoveDown } from 'lucide-react';

export default function CanvasEditor({ storageKey, canvasHeight = 'h-[600px]' }) {
  const queryClient = useQueryClient();
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const { data: elements = [] } = useQuery({
    queryKey: ['canvasElements', storageKey],
    queryFn: async () => {
      const records = await base44.entities.ImageContent.filter({ content_id: storageKey });
      return records.map(r => JSON.parse(r.image_url || '[]')).flat();
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (newElements) => {
      const existing = await base44.entities.ImageContent.filter({ content_id: storageKey });
      const dataString = JSON.stringify(newElements);
      
      if (existing.length > 0) {
        return await base44.entities.ImageContent.update(existing[0].id, { image_url: dataString });
      } else {
        return await base44.entities.ImageContent.create({
          content_id: storageKey,
          image_url: dataString
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['canvasElements', storageKey]);
    }
  });

  const addImage = async (file) => {
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    
    const newElement = {
      id: Date.now().toString(),
      type: 'image',
      src: file_url,
      x: 20,
      y: 20,
      width: 300,
      height: 200,
      zIndex: elements.length
    };
    
    await saveMutation.mutateAsync([...elements, newElement]);
  };

  const addTextBox = async () => {
    const newElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Double click to edit',
      x: 50,
      y: 50,
      width: 200,
      height: 60,
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Playfair Display',
      zIndex: elements.length
    };
    
    await saveMutation.mutateAsync([...elements, newElement]);
  };

  const updateElement = async (id, updates) => {
    const updated = elements.map(el => el.id === id ? { ...el, ...updates } : el);
    await saveMutation.mutateAsync(updated);
  };

  const deleteElement = async (id) => {
    const filtered = elements.filter(el => el.id !== id);
    await saveMutation.mutateAsync(filtered);
    setSelectedElement(null);
  };

  const duplicateElement = async (id) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    const newElement = {
      ...element,
      id: Date.now().toString(),
      x: element.x + 20,
      y: element.y + 20,
      zIndex: elements.length
    };
    
    await saveMutation.mutateAsync([...elements, newElement]);
  };

  const changeLayer = async (id, direction) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    const newZIndex = direction === 'up' ? element.zIndex + 1 : element.zIndex - 1;
    await updateElement(id, { zIndex: newZIndex });
  };

  const handleMouseDown = (e, element) => {
    if (e.target.classList.contains('resize-handle')) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    
    setSelectedElement(element.id);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y
    });
  };

  const handleMouseMove = (e) => {
    if (!selectedElement || (!isDragging && !isResizing)) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const element = elements.find(el => el.id === selectedElement);
    if (!element) return;

    if (isDragging) {
      const newX = e.clientX - rect.left - dragStart.x;
      const newY = e.clientY - rect.top - dragStart.y;
      updateElement(selectedElement, { x: newX, y: newY });
    } else if (isResizing) {
      const newWidth = e.clientX - rect.left - element.x;
      const newHeight = e.clientY - rect.top - element.y;
      updateElement(selectedElement, { width: Math.max(50, newWidth), height: Math.max(30, newHeight) });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="w-full my-8">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" /> Add Image
        </button>
        <button
          onClick={addTextBox}
          className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded flex items-center gap-2"
        >
          <Type className="w-4 h-4" /> Add Text
        </button>
        {selectedElement && (
          <>
            <button
              onClick={() => duplicateElement(selectedElement)}
              className="px-4 py-2 text-xs font-medium border border-foreground/20 rounded flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> Duplicate
            </button>
            <button
              onClick={() => changeLayer(selectedElement, 'up')}
              className="px-4 py-2 text-xs font-medium border border-foreground/20 rounded flex items-center gap-2"
            >
              <MoveUp className="w-4 h-4" /> Forward
            </button>
            <button
              onClick={() => changeLayer(selectedElement, 'down')}
              className="px-4 py-2 text-xs font-medium border border-foreground/20 rounded flex items-center gap-2"
            >
              <MoveDown className="w-4 h-4" /> Backward
            </button>
            <button
              onClick={() => deleteElement(selectedElement)}
              className="px-4 py-2 text-xs font-medium border border-destructive text-destructive rounded flex items-center gap-2 ml-auto"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </>
        )}
      </div>

      <div
        ref={canvasRef}
        className={`relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg ${canvasHeight} overflow-hidden`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={(e) => {
          if (e.target === canvasRef.current) setSelectedElement(null);
        }}
      >
        {sortedElements.map((element) => (
          <div
            key={element.id}
            className={`absolute cursor-move select-none ${selectedElement === element.id ? 'ring-2 ring-primary' : ''}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              zIndex: element.zIndex
            }}
            onMouseDown={(e) => handleMouseDown(e, element)}
          >
            {element.type === 'image' ? (
              <img
                src={element.src}
                alt=""
                className="w-full h-full object-cover rounded"
                draggable={false}
              />
            ) : (
              <div
                className="w-full h-full p-2 bg-white/90 rounded flex items-center justify-center"
                style={{
                  fontSize: element.fontSize,
                  color: element.color,
                  fontFamily: element.fontFamily
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  const newContent = prompt('Edit text:', element.content);
                  if (newContent !== null) {
                    updateElement(element.id, { content: newContent });
                  }
                }}
              >
                {element.content}
              </div>
            )}
            
            {selectedElement === element.id && (
              <div
                className="resize-handle absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-tl cursor-nwse-resize"
                onMouseDown={(e) => e.stopPropagation()}
              />
            )}
          </div>
        ))}

        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <div className="text-center">
              <p className="text-sm">Click "Add Image" or "Add Text" to start</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => addImage(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}