'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Font = 'azeret' | 'victor' | 'noto';

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
  fontName: string;
}

const fontMap: Record<Font, string> = {
  azeret: 'Azeret Mono',
  victor: 'Victor Mono',
  noto: 'Noto Sans Mono',
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<Font>('azeret');

  useEffect(() => {
    const storedFont = localStorage.getItem('app-font') as Font;
    if (storedFont && fontMap[storedFont]) {
      setFontState(storedFont);
    }
  }, []);

  const setFont = (newFont: Font) => {
    if (fontMap[newFont]) {
      setFontState(newFont);
      localStorage.setItem('app-font', newFont);
    }
  };
  
  useEffect(() => {
    const classes = Object.keys(fontMap).map(f => `font-${f}`);
    const newClass = `font-${font}`;
    
    document.documentElement.classList.remove(...classes);
    document.documentElement.classList.add(newClass);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont, fontName: fontMap[font] }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
