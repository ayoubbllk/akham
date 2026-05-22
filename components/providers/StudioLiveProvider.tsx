'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface StudioLiveState {
  active: boolean;
  setActive: (v: boolean) => void;
}

const Ctx = createContext<StudioLiveState>({ active: true, setActive: () => {} });

export function StudioLiveProvider({ children }: { children: ReactNode }) {
  // Démo : true par défaut. Brancher à une source réelle (CMS, API, websocket).
  const [active, setActive] = useState(true);
  return <Ctx.Provider value={{ active, setActive }}>{children}</Ctx.Provider>;
}

export const useStudioLive = () => useContext(Ctx);
