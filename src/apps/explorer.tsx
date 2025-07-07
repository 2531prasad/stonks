
'use client';

import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { Card, CardHeader } from '@/components/ui/card';
import { X, Minus, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWindows, type AppWindow } from '@/contexts/WindowsContext';
import { cn } from '@/lib/utils';

export function Explorer() {
  const { windows, closeWindow, focusWindow, updateWindow, getAppConfig } = useWindows();
  const explorerRef = useRef<HTMLDivElement>(null);

  const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  const handleDragStop = (win: AppWindow, e: any, d: { x: number; y: number }) => {
    let newPosition = { x: d.x, y: d.y };

    if (explorerRef.current) {
      const bounds = explorerRef.current.getBoundingClientRect();
      const winWidth = parseFloat(win.size.width.toString());
      const winHeight = parseFloat(win.size.height.toString());

      const visibleMargin = 60; // Pixels of the window that must remain visible

      // Check left boundary
      if (d.x + winWidth < visibleMargin) {
        newPosition.x = visibleMargin - winWidth;
      }

      // Check right boundary
      if (d.x > bounds.width - visibleMargin) {
        newPosition.x = bounds.width - visibleMargin;
      }

      // Check bottom boundary
      if (d.y > bounds.height - visibleMargin) {
        newPosition.y = bounds.height - visibleMargin;
      }
      
      // Top boundary is already handled by #window-bounds, but let's be safe.
      if (d.y < 0) {
        newPosition.y = 0;
      }

      updateWindow(win.id, { position: newPosition });
    } else {
      // Fallback if ref isn't available
      updateWindow(win.id, { position: newPosition });
    }
  };


  return (
    <div
      ref={explorerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {sortedWindows.map((win) => {
        const appConfig = getApp.config(win.appKey);
        if (!appConfig) return null;

        const App = appConfig.component;
        const title = appConfig.title;
        const hasChrome = (appConfig as any).chrome !== 'none';
        
        return (
          <Rnd
            key={win.id}
            size={win.size}
            position={win.position}
            onDragStart={() => focusWindow(win.id)}
            onDragStop={(e, d) => handleDragStop(win, e, d)}
            onResizeStart={() => focusWindow(win.id)}
            onResizeStop={(e, direction, ref, delta, position) => {
              updateWindow(win.id, {
                size: { width: ref.style.width, height: ref.style.height },
                position,
              });
            }}
            minWidth={hasChrome ? 320 : 200}
            minHeight={hasChrome ? 200 : 100}
            dragHandleClassName="drag-handle"
            style={{ zIndex: win.zIndex, position: 'absolute' }}
            className="pointer-events-auto group"
            bounds="#window-bounds"
            cancel="input,textarea,button,select,option"
          >
            <Card 
              className={cn(
                "h-full w-full flex flex-col text-card-foreground rounded-lg overflow-hidden shadow-2xl shadow-black/40 relative border-border",
                !hasChrome && "drag-handle",
                hasChrome ? "bg-card/60" : "bg-card"
              )}
              onMouseDownCapture={() => focusWindow(win.id)}
            >
              {hasChrome ? (
                <CardHeader className="drag-handle cursor-move flex flex-row items-center justify-between p-2 border-b border-neutral-700/50 h-8">
                  <p className="text-xs text-neutral-400 pl-2">{title}</p>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full" aria-label="Minimize">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full" aria-label="Maximize">
                      <Square className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-neutral-400 hover:bg-red-500 hover:text-white rounded-full"
                      aria-label="Close"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeWindow(win.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              ) : (
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 bg-black/30 hover:bg-red-500 text-neutral-400 hover:text-white rounded-full"
                    aria-label="Close"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <App />
              </div>
            </Card>
          </Rnd>
        );
      })}
    </div>
  );
}
