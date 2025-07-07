'use client';

import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Terminal } from '@/apps/Terminal';

const appRegistry = {
  terminal: {
    component: Terminal,
    defaultSize: { width: 640, height: 400 },
    title: 'Terminal',
  },
};

type AppKey = keyof typeof appRegistry;

export interface AppWindow {
  id: string;
  appKey: AppKey;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
  zIndex: number;
}

interface WindowsContextType {
  windows: AppWindow[];
  openWindow: (appKey: AppKey) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<AppWindow>) => void;
  getAppConfig: (
    appKey: AppKey
  ) => (typeof appRegistry)[keyof typeof appRegistry];
}

const WindowsContext = createContext<WindowsContextType | undefined>(undefined);

const getNextZIndex = (windows: AppWindow[]) => {
  if (windows.length === 0) return 10;
  return Math.max(...windows.map((w) => w.zIndex)) + 1;
};

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedWindows = localStorage.getItem('app-windows');
      if (savedWindows) {
        const parsedWindows = JSON.parse(savedWindows);
        setWindows(parsedWindows);
      }
    } catch (error) {
      console.error('Failed to load windows from localStorage', error);
      localStorage.removeItem('app-windows');
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('app-windows', JSON.stringify(windows));
    }
  }, [windows, isLoaded]);

  const openWindow = useCallback(
    (appKey: AppKey) => {
      setWindows((currentWindows) => {
        const appConfig = appRegistry[appKey];
        if (!appConfig) {
          console.error(`App with key "${appKey}" not found in registry.`);
          return currentWindows;
        }

        const existingWindow = currentWindows.find((w) => w.appKey === appKey);

        if (existingWindow) {
          const nextZIndex = getNextZIndex(currentWindows);
          return currentWindows.map((w) =>
            w.id === existingWindow.id ? { ...w, zIndex: nextZIndex } : w
          );
        }

        const newWindow: AppWindow = {
          id: `${appKey}-${Date.now()}`,
          appKey: appKey,
          position: {
            x: window.innerWidth / 2 - appConfig.defaultSize.width / 2,
            y: Math.max(0, window.innerHeight / 2 - appConfig.defaultSize.height / 2 - 56),
          },
          size: appConfig.defaultSize,
          zIndex: getNextZIndex(currentWindows),
        };
        return [...currentWindows, newWindow];
      });
    },
    []
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.filter((w) => w.id !== id)
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((currentWindows) => {
      const windowToFocus = currentWindows.find((w) => w.id === id);
      if (!windowToFocus) return currentWindows;

      const maxZIndex = getNextZIndex(currentWindows) - 1;
      if (windowToFocus.zIndex === maxZIndex) {
        return currentWindows;
      }

      return currentWindows.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      );
    });
  }, []);

  const updateWindow = useCallback(
    (id: string, updates: Partial<AppWindow>) => {
      setWindows((currentWindows) =>
        currentWindows.map((w) => (w.id === id ? { ...w, ...updates } : w))
      );
    },
    []
  );

  const getAppConfig = useCallback(
    (appKey: AppKey) => appRegistry[appKey],
    []
  );

  return (
    <WindowsContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        updateWindow,
        getAppConfig,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowsProvider');
  }
  return context;
}
