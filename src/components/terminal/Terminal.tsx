"use client";

import { useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { Terminal, Bot } from 'lucide-react';
import type { Output } from '@/lib/types';

const Prompt = ({ path }: { path: string }) => (
  <div className="flex-shrink-0">
    <span className="text-primary">user@codeflow</span>
    <span className="text-foreground">:</span>
    <span className="text-blue-400">{path}</span>
    <span className="text-foreground">$ </span>
  </div>
);

const OutputLine = ({ output }: { output: Output }) => {
  if (output.type === 'input') {
    return (
      <div className="flex">
        <Prompt path={output.path || '~'} />
        <span className="flex-1">{output.text}</span>
      </div>
    );
  }
  return (
    <div
      className={`whitespace-pre-wrap ${
        output.type === 'error' ? 'text-red-500' : 'text-foreground'
      }`}
    >
      {output.text}
    </div>
  );
};

export default function TerminalComponent() {
  const {
    input,
    outputs,
    suggestions,
    isLoading,
    currentPath,
    handleInputChange,
    handleInputKeyDown,
    applySuggestion,
    setInput,
  } = useTerminal();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputs, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
        className="flex flex-col h-[95vh] max-h-[900px] w-full max-w-4xl mx-auto bg-black bg-opacity-50 backdrop-blur-sm rounded-lg border border-border shadow-2xl overflow-hidden"
        onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between p-2 px-4 bg-zinc-900 border-b border-border">
        <div className="flex items-center gap-2">
            <Terminal className="text-accent" size={16}/>
            <h1 className="text-sm font-medium">CodeFlow Terminal</h1>
        </div>
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto text-sm">
        {outputs.map((output, index) => (
          <OutputLine key={index} output={output} />
        ))}
        {isLoading && <div className="text-muted-foreground">Executing...</div>}
      </div>
      {suggestions.length > 0 && (
          <div className="px-4 pb-2 text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
              <Bot size={14} className="text-accent flex-shrink-0" />
              <span>Suggestions:</span>
              {suggestions.map((s, i) => (
                  <button key={i} onClick={() => applySuggestion(s)} className="bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md">
                      {s}
                  </button>
              ))}
          </div>
      )}
      <div className="flex items-center p-4 pt-0">
        <Prompt path={currentPath} />
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 w-full bg-transparent outline-none"
          autoComplete="off"
          spellCheck="false"
          disabled={isLoading}
        />
        {!isLoading && <div className="w-2 h-4 bg-accent animate-blink" />}
      </div>
    </div>
  );
}
