import React, { useEffect, useState, useCallback } from 'react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { getGlobalEditMode, toggleGlobalEditMode } from '@/components/EditableText.jsx';
import { Pencil, X } from 'lucide-react';

export default function Inspector() {
  const { isEditMode, setIsEditMode } = useEditMode();
  const [editableElements, setEditableElements] = useState([]);

  // Keep globalEditMode in sync with EditModeContext
  useEffect(() => {
    if (getGlobalEditMode() !== isEditMode) {
      toggleGlobalEditMode();
    }
  }, [isEditMode]);

  // Toggle handler
  const handleToggle = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode, setIsEditMode]);

  // Collect editable elements when in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setEditableElements([]);
      return;
    }

    const collectElements = () => {
      const elements = [];
      document.querySelectorAll('[data-editable-id]').forEach((el) => {
        const id = el.getAttribute('data-editable-id');
        const label = el.getAttribute('data-editable-label') || id;
        if (id) elements.push({ id, label, el });
      });
      setEditableElements(elements);
    };

    collectElements();
    const observer = new MutationObserver(collectElements);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, [isEditMode]);

  const scrollToElement = (id) => {
    const el = document.querySelector(`[data-editable-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Collapsed state — just the toggle button
  if (!isEditMode) {
    return (
      <button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg bg-black/80 text-white text-xs font-medium backdrop-blur-sm hover:bg-black transition-all"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </button>
    );
  }

  // Expanded state — panel with element list
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl w-72 max-h-80 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-yellow-50">
        <span className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
          <Pencil className="w-3.5 h-3.5 text-yellow-600" />
          Edit Mode
        </span>
        <button onClick={handleToggle} className="text-gray-400 hover:text-gray-700 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-3">
        {editableElements.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No editable elements found on this page.</p>
        ) : (
          <ul className="space-y-1">
            {editableElements.map((element) => (
              <li key={element.id}>
                <button
                  onClick={() => scrollToElement(element.id)}
                  className="w-full text-left text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-50 text-gray-600 truncate transition-colors"
                >
                  {element.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <p className="text-[10px] text-gray-400">{editableElements.length} editable elements</p>
      </div>
    </div>
  );
}