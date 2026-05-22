'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MakingOfState {
  active: boolean;
  toggle: () => void;
}

const MakingOfCtx = createContext<MakingOfState>({ active: false, toggle: () => {} });

export function MakingOfProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && window.localStorage.getItem('akham-making-of');
    if (stored === '1') setActive(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('akham-making-of', active ? '1' : '0');
    }
  }, [active]);

  return (
    <MakingOfCtx.Provider value={{ active, toggle: () => setActive((v) => !v) }}>
      {children}
    </MakingOfCtx.Provider>
  );
}

export const useMakingOf = () => useContext(MakingOfCtx);
