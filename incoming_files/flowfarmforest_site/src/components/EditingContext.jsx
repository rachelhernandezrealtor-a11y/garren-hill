import React, { createContext, useContext, useState, useCallback } from 'react';

export const EditingContext = createContext(undefined);

export function EditingProvider({ children }) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const selectElement = useCallback((element, content) => {
    setSelectedElement(element);
    setSelectedContent(content);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElement(null);
    setSelectedContent(null);
  }, []);

  return (
    <EditingContext.Provider value={{
      selectedContent,
      selectedElement,
      selectElement,
      clearSelection,
    }}>
      {children}
    </EditingContext.Provider>
  );
}

export function useEditing() {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error('useEditing must be used within EditingProvider');
  }
  return context;
}