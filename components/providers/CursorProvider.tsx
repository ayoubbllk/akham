'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type CursorVariant = 'default' | 'video' | 'image' | 'cta' | 'link';

interface CursorState {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
}

const CursorCtx = createContext<CursorState>({ variant: 'default', setVariant: () => {} });

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default');
  return (
    <CursorCtx.Provider value={{ variant, setVariant }}>{children}</CursorCtx.Provider>
  );
}

export const useCursor = () => useContext(CursorCtx);

/** Convenience helpers for components that want to register cursor variants */
export function cursorHandlers(variant: CursorVariant) {
  return {
    'data-cursor': variant,
  };
}
