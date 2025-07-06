'use client';

import React, { useState, useRef, useEffect } from 'react';

export function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to the terminal!', 'Type `help` for a list of commands.']);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
        ref={contentRef} 
        className="p-4 h-full w-full overflow-y-auto text-sm" 
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
          className="bg-transparent border-none outline-none text-neutral-300 w-full pl-2"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
