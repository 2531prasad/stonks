'use client';

import { Bell, Palette, Search, User } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFont } from '@/components/font-provider';
import Clock from './Clock';

interface HeaderRightProps {
  setOpenCommand: (open: boolean) => void;
}

export function HeaderRight({ setOpenCommand }: HeaderRightProps) {
  const { font, setFont } = useFont();

  return (
    <>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Button
          variant="outline"
          onClick={() => setOpenCommand(true)}
          className="w-full justify-start rounded-lg bg-secondary pl-8 text-sm text-muted-foreground md:w-[200px] lg:w-[320px]"
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
          Search...
          <div className="pointer-events-none ml-auto hidden items-center gap-1 sm:flex">
            <kbd>
              <span className="text-xs">⌘</span>
            </kbd>
            <kbd>K</kbd>
          </div>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Palette className="h-5 w-5" />
            <span className="sr-only">Change font</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={font}
            onValueChange={(value) => setFont(value as any)}
          >
            <DropdownMenuRadioItem value="azeret">
              Azeret Mono
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="victor">
              Victor Mono
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="noto">
              Noto Sans Mono
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <User className="h-5 w-5" />
        <span className="sr-only">User menu</span>
      </Button>
      <Clock />
    </>
  );
}
