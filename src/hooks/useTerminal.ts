"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Output, FileSystem, TerminalState } from '@/lib/types';
import { initialFileSystem } from '@/lib/file-system';
import commands from '@/lib/commands';
import { suggestCommand } from '@/ai/flows/suggest-command';

export const useTerminal = () => {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileSystemRef = useRef<FileSystem>(initialFileSystem);
  const currentDirectoryRef = useRef('~');

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('terminal-history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedDir = localStorage.getItem('terminal-dir');
      if (savedDir) currentDirectoryRef.current = savedDir;
      
      const savedFs = localStorage.getItem('terminal-fs');
      if(savedFs) fileSystemRef.current = JSON.parse(savedFs);

    } catch (error) {
      console.error("Failed to load from localStorage", error);
    }
    
    // Welcome message
    addOutput({ type: 'output', text: "Welcome to CodeFlow Terminal. Type 'help' for a list of commands." });
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('terminal-history', JSON.stringify(history));
      localStorage.setItem('terminal-dir', currentDirectoryRef.current);
      localStorage.setItem('terminal-fs', JSON.stringify(fileSystemRef.current));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [history]);

  const addOutput = useCallback((output: Output | Output[]) => {
    setOutputs(prev => Array.isArray(output) ? [...prev, ...output] : [...prev, output]);
  }, []);

  const executeCommand = useCallback(async (commandStr: string) => {
    if (!commandStr) return;
    setIsLoading(true);
    
    addOutput({ type: 'input', text: commandStr, path: currentDirectoryRef.current });
    setHistory(prev => [commandStr, ...prev]);
    setHistoryIndex(-1);

    const [command, ...args] = commandStr.trim().split(' ');
    const handler = commands[command];

    const state: TerminalState = {
      fileSystem: fileSystemRef.current,
      currentDirectory: currentDirectoryRef.current,
      history,
    };

    if (handler) {
      try {
        const result = await handler(state, args);
        if (result.newOutputs.length > 0) {
          addOutput(result.newOutputs);
        }
        if (result.newState) {
          if (result.newState.currentDirectory) {
            currentDirectoryRef.current = result.newState.currentDirectory;
          }
           if (result.newState.fileSystem) {
            fileSystemRef.current = result.newState.fileSystem;
            localStorage.setItem('terminal-fs', JSON.stringify(fileSystemRef.current));
          }
          // Force a re-render to update the prompt path
          setInput(prev => prev + ' ');
          setInput(prev => prev.trim());
        }
      } catch (e) {
        addOutput({ type: 'error', text: e instanceof Error ? e.message : String(e) });
      }
    } else if (command === 'clear') {
        setOutputs([]);
    }
    else {
      addOutput({ type: 'error', text: `command not found: ${command}` });
    }
    setIsLoading(false);
  }, [addOutput, history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
      setInput('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(newIndex >= 0 ? history[newIndex] : '');
      }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        if(suggestions.length > 0){
            setInput(suggestions[0]);
            setSuggestions([]);
        }
    }
  };
  
  // Debounced effect for AI suggestions
  useEffect(() => {
    if (input.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await suggestCommand({
          userInput: input,
          commandHistory: history.slice(0, 10).join('\n'),
          currentDirectory: currentDirectoryRef.current,
        });
        setSuggestions(res.suggestions.slice(0, 5));
      } catch (error) {
        // console.error("Suggestion error:", error);
        // Fail silently on suggestion errors
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [input, history]);
  
  const applySuggestion = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    document.getElementById('terminal-input')?.focus();
  }

  return {
    input,
    outputs,
    suggestions,
    isLoading,
    currentPath: currentDirectoryRef.current,
    handleInputChange,
    handleInputKeyDown,
    applySuggestion,
    setInput,
  };
};
