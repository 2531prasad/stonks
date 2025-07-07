'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { Card, CardHeader } from '@/components/ui/card';
import { X, Minus, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWindows } from '@/contexts/DashboardContext';

export function Explorer() {
  const { windows, closeWindow, focusWindow, updateWindow, getAppConfig } = useWindows();

  const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sortedWindows.map((win) => {
        const appConfig = getAppConfig(win.appKey);
        if (!appConfig) return null;

        const App = appConfig.component;
        const title = appConfig.title;
        
        return (
          <Rnd
            key={win.id}
            size={win.size}
            position={win.position}
            onDragStart={() => focusWindow(win.id)}
            onDragStop={(e, d) => {
              updateWindow(win.id, { position: { x: d.x, y: d.y } });
            }}
            onResizeStart={() => focusWindow(win.id)}
            onResizeStop={(e, direction, ref, delta, position) => {
              updateWindow(win.id, {
                size: { width: ref.style.width, height: ref.style.height },
                position,
              });
            }}
            minWidth={320}
            minHeight={200}
            dragHandleClassName="drag-handle"
            style={{ zIndex: win.zIndex, position: 'absolute' }}
            className="pointer-events-auto"
            bounds="parent"
          >
            <Card 
              className="h-full w-full flex flex-col bg-black/80 backdrop-blur-sm border-neutral-700 text-neutral-300 rounded-lg overflow-hidden shadow-2xl"
              onMouseDownCapture={() => focusWindow(win.id)}
            >
              <CardHeader className="drag-handle cursor-move flex flex-row items-center justify-between p-2 border-b border-neutral-700 h-8">
                <p className="text-xs text-neutral-400 pl-2">{title}</p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full">
                    <Square className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-neutral-400 hover:bg-red-500 hover:text-white rounded-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
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
