import { createContext, useContext } from 'react';
import { ColorContextValue } from './types';

export const colorContext = createContext<ColorContextValue | null>(null);

export const ColorPickerProvider = colorContext.Provider;

export const useColorPicker = () => {
  const context = useContext(colorContext);
  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }
  return context;
};
