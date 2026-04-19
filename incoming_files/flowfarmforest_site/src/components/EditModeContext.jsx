import React, { createContext, useContext, useState } from 'react';

export const EditModeContext = createContext(undefined);

export function EditModeProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
}