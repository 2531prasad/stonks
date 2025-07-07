
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

export function Calculator() {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
  };

  const calculateResult = (exp: string): string => {
    try {
      // Basic validation to prevent unsafe evaluation
      if (/[^0-9+\-*/().\s]/.test(exp)) {
        return 'Error';
      }
      // Using Function constructor for safer evaluation than eval()
      const result = new Function(`return ${exp}`)();
      if (isNaN(result) || !isFinite(result)) {
        return 'Error';
      }
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expression.trim() === '') return;

    const result = calculateResult(expression);
    setDisplay(result);
    setExpression('');
  };

  const handleClear = () => {
    setExpression('');
    setDisplay('0');
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isMobile) {
      inputRef.current?.focus();
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col h-full w-full bg-transparent p-2 gap-2">
      <div className="flex-1 flex items-end justify-end p-4 bg-black rounded-lg">
        <p className="text-4xl font-mono text-right break-all">{display}</p>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleFormSubmit} className="flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={expression}
            onChange={handleInputChange}
            className="w-full text-lg h-12 rounded-lg border-0"
            placeholder="Type an expression..."
            autoFocus={!isMobile}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <Button onClick={handleClear} variant="destructive" className="h-12 px-4 text-lg font-bold rounded-lg">
          AC
        </Button>
      </div>
    </div>
  );
}
