import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function SinglePhoto({ storageKey, position, overlayText, onOverlayTextChange, onDelete }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageSize, setImageSize] = useState('h-64 sm:h-80');
  const [objectFit, setObjectFit] = useState('contain');
  const [isResizing, setIsResizing] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [backgroundMode, setBackgroundMode] = useState(false);
  const [isDraggingPosition, setIsDraggingPosition] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.3);
  const [isEditingText, setIsEditingText] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [textMode, setTextMode] = useState('overlay'); // 'overlay' or 'background'
  const fileInputRef = React.useRef(null);

  const defaultImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop';

  const { data: photoRecord } = useQuery({
    queryKey: ['residencePhoto', storageKey, position],
    queryFn: async () => {
      const records = await base44.entities.ResidencePhoto.filter({
        section_key: storageKey,
        position: position,
        is_deleted: { $ne: true }
      });
      return records[0] || null;
    }
  });

  // Initialize state from database
  React.useEffect(() => {
    if (photoRecord) {
      setBackgroundMode(photoRecord.background_mode || false);
      setImageSize(photoRecord.image_size || 'h-64 sm:h-80');
      setImagePosition(photoRecord.image_position || { x: 50, y: 50 });
      setTextMode(photoRecord.text_mode || 'overlay');
      if (photoRecord.overlay_text) {
        onOverlayTextChange?.(photoRecord.overlay_text);
      }
    }
  }, [photoRecord]);

  const imageUrl = photoRecord?.image_url || defaultImage;

  const saveMutation = useMutation({
    mutationFn: async (updates) => {
      if (photoRecord) {
        return await base44.entities.ResidencePhoto.update(photoRecord.id, updates);
      } else {
        return await base44.entities.ResidencePhoto.create({
          section_key: storageKey,
          position,
          ...updates
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['residencePhoto', storageKey, position]);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (photoRecord) {
        return await base44.entities.ResidencePhoto.update(photoRecord.id, { is_deleted: true });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['residencePhoto', storageKey, position]);
    }
  });

  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await saveMutation.mutateAsync({ image_url: file_url });
    } finally {
      setLoading(false);
    }
  };



  const handleImageMouseDown = (e) => {
    if (backgroundMode && !isEditingText) {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingPosition(true);
    }
  };

  const handleImageMouseMove = (e) => {
    if (isDraggingPosition && backgroundMode) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      const newPos = { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
      setImagePosition(newPos);
    }
  };

  const handleImageMouseUp = () => {
    if (isDraggingPosition) {
      saveMutation.mutate({ image_position: imagePosition });
    }
    setIsDraggingPosition(false);
  };

  const handleTextMouseDown = (e) => {
    if (!isEditingText) {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingText(true);
    }
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingText && !isEditingText) {
        const container = document.getElementById(`bg-container-${storageKey}-${position}`);
        if (container) {
          const rect = container.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 100;
          const y = (e.clientY - rect.top) / rect.height * 100;
          setTextPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingText(false);
    };

    if (isDraggingText) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingText, isEditingText, storageKey, position]);

  const toggleBackgroundMode = (e) => {
    e.stopPropagation();
    const newMode = !backgroundMode;
    setBackgroundMode(newMode);
    if (newMode) {
      setObjectFit('cover');
      saveMutation.mutate({ background_mode: true });
    } else {
      saveMutation.mutate({ background_mode: false });
    }
  };

  if (photoRecord?.is_deleted) return null;

  return (
    <div
      className={`relative group w-full ${backgroundMode ? '-mx-4 sm:-mx-6 lg:-mx-8 my-0' : 'my-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const draggedTextData = e.dataTransfer.getData('text/plain');
        if (draggedTextData) {
          try {
            const textData = JSON.parse(draggedTextData);
            setTextMode('background');
            onOverlayTextChange?.(textData);
          } catch {}
        }
      }}>

      {backgroundMode ?
      <div
        id={`bg-container-${storageKey}-${position}`}
        className={`w-full ${imageSize} relative overflow-hidden ${isDraggingPosition ? 'cursor-move' : ''}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`
        }}
        onMouseDown={handleImageMouseDown}
        onMouseMove={handleImageMouseMove}
        onMouseUp={handleImageMouseUp}>

          {/* Dark overlay */}
          



          
          {/* Text overlay - only show if in overlay mode */}
          {textMode === 'overlay' && (overlayText.title || overlayText.subtitle || isEditingText) &&
        <div
          className="absolute z-10 px-8"
          style={{
            left: `${textPosition.x}%`,
            top: `${textPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isDraggingText ? 'grabbing' : isEditingText ? 'default' : 'grab',
            pointerEvents: 'auto'
          }}
          onMouseDown={handleTextMouseDown}
          draggable={!isEditingText}
          onDragStart={(e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', JSON.stringify(overlayText));
          }}>

              {isEditingText ?
          <div className="w-full max-w-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
                  <input
              type="text"
              value={overlayText.title}
              onChange={(e) => {
                const newText = { ...overlayText, title: e.target.value };
                onOverlayTextChange?.(newText);
              }}
              placeholder="Enter title..."
              className="w-full bg-white/90 backdrop-blur-sm text-center font-serif text-3xl sm:text-4xl md:text-5xl font-light px-6 py-3 rounded-lg border-2 border-white/50" />

                  <textarea
              value={overlayText.subtitle}
              onChange={(e) => {
                const newText = { ...overlayText, subtitle: e.target.value };
                onOverlayTextChange?.(newText);
              }}
              placeholder="Enter subtitle..."
              className="w-full bg-white/90 backdrop-blur-sm text-center font-sans text-sm md:text-base px-6 py-3 rounded-lg border-2 border-white/50 resize-none"
              rows={3} />

                  <button
              onClick={() => {
                setIsEditingText(false);
                saveMutation.mutate({ overlay_text: overlayText });
              }}
              className="w-full px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-white/90">

                    Done Editing
                  </button>
                </div> :

          <div
            className="text-center cursor-grab active:cursor-grabbing transition-opacity hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingText(true);
            }}>

                  {overlayText.title &&
            <h2 className="font-serif text-white mb-4 text-sm font-light leading-tight sm:text-xl md:text-3xl lg:text-4xl drop-shadow-lg drop-cap">
                      {overlayText.title}
                    </h2>
            }
                  {overlayText.subtitle &&
            <p className="font-sans text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                      {overlayText.subtitle}
                    </p>
            }
                </div>
          }
            </div>
        }
        </div> :

      <div className="relative">
          <img
          src={imageUrl}
          alt={`Photo ${position + 1}`}
          className={`w-full rounded-lg bg-gray-50 ${imageSize}`}
          style={{ objectFit }} />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-900/15 via-transparent to-transparent pointer-events-none" />
          
          {/* Background text layer overlay */}
          {textMode === 'background' && (overlayText.title || overlayText.subtitle) &&
          <div 
            className="absolute inset-0 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer group/text"
            onClick={() => setIsEditingText(true)}>
            {overlayText.title &&
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 text-center drop-shadow-lg group-hover/text:opacity-80 transition-opacity">
              {overlayText.title}
            </h3>
            }
            {overlayText.subtitle &&
            <p className="font-sans text-sm text-white/90 leading-relaxed text-center max-w-2xl drop-shadow-lg group-hover/text:opacity-80 transition-opacity">
              {overlayText.subtitle}
            </p>
            }
            <div className="mt-4 flex gap-2 opacity-0 group-hover/text:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingText(true);
                }}
                className="px-3 py-1 text-xs font-medium bg-white text-primary hover:bg-white/90 border border-white rounded">
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTextMode('overlay');
                }}
                className="px-3 py-1 text-xs font-medium bg-white text-primary hover:bg-white/90 border border-white rounded">
                Back to Overlay
              </button>
            </div>
          </div>
          }
        </div>
      }

      {isHovered &&
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-foreground/10 rounded-b-lg p-3 flex flex-col gap-2 z-20">
          <div className="flex gap-2">
            <select
            onChange={(e) => {
              setImageSize(e.target.value);
              saveMutation.mutate({ image_size: e.target.value });
            }}
            value={imageSize}
            className="px-3 py-2 text-xs font-medium text-foreground bg-white hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

              <option value="h-48 sm:h-64">Small</option>
              <option value="h-64 sm:h-80">Medium</option>
              <option value="h-80 sm:h-96">Large</option>
              <option value="h-[32rem] sm:h-[40rem] md:h-[48rem]">X-Large</option>
              <option value="h-screen">Full Screen</option>
            </select>
            {!backgroundMode &&
          <select
            onChange={(e) => setObjectFit(e.target.value)}
            value={objectFit}
            className="px-3 py-2 text-xs font-medium text-foreground bg-white hover:bg-foreground/5 border border-foreground/20 rounded transition-colors"
            onClick={(e) => e.stopPropagation()}>

                <option value="contain">Contain</option>
                <option value="cover">Cover</option>
              </select>
          }
            <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="flex-1 px-3 py-2 text-xs font-medium text-foreground hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

              {loading ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
            onClick={toggleBackgroundMode}
            className={`flex-1 px-3 py-2 text-xs font-medium ${backgroundMode ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/5'} border border-foreground/20 rounded transition-colors`}>

              {backgroundMode ? '✓ Background Mode' : 'Set as Background'}
            </button>
            {onDelete &&
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteMutation.mutate();
              onDelete();
            }}
            disabled={deleteMutation.isPending}
            className="px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/5 border border-destructive/20 rounded transition-colors disabled:opacity-50">

                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
          }
            {backgroundMode &&
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImagePosition({ x: 50, y: 50 });
              saveMutation.mutate({ image_position: { x: 50, y: 50 } });
            }}
            className="px-3 py-2 text-xs font-medium text-foreground hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

                Reset Position
              </button>
          }
          </div>

          {backgroundMode &&
        <>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-foreground/60 whitespace-nowrap">Overlay Darkness:</span>
                <input
              type="range"
              min="0"
              max="0.8"
              step="0.1"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
              className="flex-1" />

                <span className="text-[10px] text-foreground/60">{Math.round(overlayOpacity * 100)}%</span>
              </div>
              
              <div className="flex gap-2">
                {textMode === 'overlay' &&
            <>
                    <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingText(true);
                }}
                className="flex-1 px-3 py-2 text-xs font-medium text-foreground hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

                      {overlayText.title || overlayText.subtitle ? 'Edit Text' : '+ Add Text'}
                    </button>
                    {(overlayText.title || overlayText.subtitle) &&
              <>
                        <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTextPosition({ x: 50, y: 50 });
                    saveMutation.mutate({ image_position: { x: 50, y: 50 } });
                  }}
                  className="px-3 py-2 text-xs font-medium text-foreground hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

                          Reset Position
                        </button>
                        <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTextMode('background');
                    saveMutation.mutate({ text_mode: 'background' });
                  }}
                  className="px-3 py-2 text-xs font-medium text-foreground hover:bg-foreground/5 border border-foreground/20 rounded transition-colors">

                          → Background
                        </button>
                      </>
              }
                  </>
            }
              </div>

              <p className="text-[10px] text-foreground/60 text-center">Drag image to reposition • Drag text to move overlay</p>
            </>
        }
        </div>
      }



      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files?.[0])}
        className="hidden" />

    </div>);

}