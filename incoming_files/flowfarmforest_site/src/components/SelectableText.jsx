import React, { useContext, useRef, useState } from 'react';
import { EditingContext } from '@/components/EditingContext';
import { Zap } from 'lucide-react';

export default function SelectableText({ children, className = '' }) {
  const editingContext = useContext(EditingContext);
  const [isHovered, setIsHovered] = React.useState(false);
  const elementRef = React.useRef(null);

  const handleSelect = () => {
    if (elementRef.current) {
      const content = elementRef.current.textContent || elementRef.current.value;
      editingContext?.selectElement(
        { element: elementRef.current, type: 'text' },
        content
      );
    }
  };

  return (
    <div
      ref={elementRef}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <button
          onClick={handleSelect}
          className="absolute -right-8 top-0 bg-blue-600 text-white p-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Edit with AI"
        >
          <Zap className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}