'use client';

import { useState } from 'react';
import { Terminal } from '@/apps/Terminal';

export default function DashboardPage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  return (
    <>
      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
         <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[60vh]">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              A clean slate.
            </h3>
            <p className="text-sm text-muted-foreground">
              Your dashboard is ready to build on. Try closing the terminal window.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
