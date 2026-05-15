'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

interface MouseState {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface MouseContextType extends MouseState {
  cursorVariant: string;
  setCursorVariant: (v: string) => void;
}

const MouseContext = createContext<MouseContextType>({
  x: 0, y: 0, normalizedX: 0, normalizedY: 0,
  cursorVariant: 'default',
  setCursorVariant: () => {},
});

export const useMouse = () => useContext(MouseContext);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MouseState>({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setState({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <MouseContext.Provider value={{ ...state, cursorVariant, setCursorVariant }}>
      {children}
    </MouseContext.Provider>
  );
}