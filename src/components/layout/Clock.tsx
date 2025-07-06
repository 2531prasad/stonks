'use client';

import { useEffect, useState } from 'react';
import { NumberFlow } from '@number-flow/react';

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return (
      <div className="flex w-[70px] justify-end items-center text-sm font-mono text-muted-foreground">
        <span>--:--:--</span>
      </div>
    );
  }

  const formatSegment = (value: number) => value.toString().padStart(2, '0');

  const hours = formatSegment(time.getHours());
  const minutes = formatSegment(time.getMinutes());
  const seconds = formatSegment(time.getSeconds());

  const renderDigits = (numberString: string) => {
    return numberString.split('').map((digit, index) => (
      <NumberFlow key={index} value={Number(digit)} />
    ));
  };

  return (
    <div className="flex w-[70px] justify-end items-center gap-0.5 text-sm font-mono text-muted-foreground">
      <span className="flex">{renderDigits(hours)}</span>
      <span>:</span>
      <span className="flex">{renderDigits(minutes)}</span>
      <span>:</span>
      <span className="flex">{renderDigits(seconds)}</span>
    </div>
  );
};

export default Clock;
