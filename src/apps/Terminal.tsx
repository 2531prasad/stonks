'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { X, Minus, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TerminalProps {
  onClose: () => void;
}

export function Terminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to the terminal!', 'Type `help` for a list of commands.']);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newOutput = [...output, `$ ${input}`];
    
    const command = input.trim().toLowerCase();

    if (command === 'clear') {
        setOutput([]);
    } else if (command === 'help') {
        newOutput.push('Available commands: clear, help, date, hello');
        setOutput(newOutput);
    } else if (command === 'date') {
        newOutput.push(new Date().toLocaleString());
        setOutput(newOutput);
    } else if (command === 'hello') {
        newOutput.push('Hello there! How can I help you today?');
        setOutput(newOutput);
    }
    else {
        newOutput.push(`command not found: ${input}`);
        setOutput(newOutput);
    }
    
    setInput('');
  };

  useEffect(() => {
    if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [output]);

  if (!isClient) {
    return null
  }

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 320,
        y: window.innerHeight / 2 - 200,
        width: 640,
        height: 400,
      }}
      minWidth={320}
      minHeight={200}
      dragHandleClassName="drag-handle"
      className="z-20"
    >
      <Card className="h-full flex flex-col bg-black/80 backdrop-blur-sm border-neutral-700 text-white rounded-lg overflow-hidden">
        <CardHeader className="drag-handle cursor-move flex flex-row items-center justify-between p-2 border-b border-neutral-700">
          <p className="text-xs text-neutral-400 pl-2">Terminal</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full">
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-neutral-700 hover:text-white rounded-full">
              <Square className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-400 hover:bg-red-500 hover:text-white rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent 
            ref={contentRef} 
            className="p-4 flex-1 overflow-y-auto text-sm" 
            onClick={() => inputRef.current?.focus()}
        >
          <div className="font-mono">
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
          </div>
          <form onSubmit={handleFormSubmit} className="flex items-center pt-2 font-mono">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="bg-transparent border-none outline-none text-white w-full pl-2"
              autoComplete="off"
            />
          </form>
        </CardContent>
      </Card>
    </Rnd>
  );
}
