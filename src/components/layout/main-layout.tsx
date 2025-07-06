'use client';

import {
  Book,
  Cpu,
  LayoutDashboard,
  LogOut,
  Palette,
  Plane,
  Search,
  Settings,
  User,
  Wallet,
  Bell,
} from 'lucide-react';
import React from 'react';
import { Rnd } from 'react-rnd';
import {
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFont } from '@/components/font-provider';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '../ui/shooting-stars';

const mainNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/ai', icon: Cpu, label: 'Compute' },
  { href: '#', icon: Wallet, label: 'Finance' },
  { href: '#', icon: Plane, label: 'Travel' },
  { href: '#', icon: Book, label: 'Academic' },
];

const footerNavItems = [
  { href: '#', icon: User, label: 'Account' },
  { href: '#', icon: Settings, label: 'Settings' },
  { href: '#', icon: LogOut, label: 'Log Out' },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = React.useState(72);
  const isCollapsed = sidebarWidth < 80;
  const pathname = usePathname();
  const { font, setFont } = useFont();
  const [openCommand, setOpenCommand] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenCommand((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpenCommand(false)
    command()
  }, [])


  return (
    <SidebarProvider open={!isCollapsed}>
      <div className="relative flex flex-col h-screen w-full bg-background">
        <StarsBackground />
        <ShootingStars />
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-transparent px-4 sm:px-6 z-10">
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
             <Button
                variant="outline"
                onClick={() => setOpenCommand(true)}
                className="w-full justify-start rounded-lg bg-secondary pl-8 text-sm text-muted-foreground md:w-[200px] lg:w-[320px]"
              >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                Search...
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
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
              <DropdownMenuRadioGroup value={font} onValueChange={(value) => setFont(value as any)}>
                <DropdownMenuRadioItem value="azeret">Azeret Mono</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="victor">Victor Mono</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="noto">Noto Sans Mono</DropdownMenuRadioItem>
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
        </header>

        <div className="relative flex flex-1 overflow-hidden min-h-0 z-10">
          <Rnd
            size={{ width: sidebarWidth, height: '100%' }}
            position={{ x: 0, y: 0 }}
            minWidth={72}
            maxWidth={400}
            disableDragging={true}
            enableResizing={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setSidebarWidth(parseInt(ref.style.width, 10));
            }}
            resizeHandleStyles={{
              right: {
                width: '4px',
                right: '0px',
              },
            }}
            resizeHandleClasses={{
              right: 'hover:bg-primary transition-colors cursor-col-resize',
            }}
            className="z-10"
          >
            <div
              className="group flex h-full flex-col border-r bg-background overflow-hidden"
              data-collapsible={isCollapsed ? 'icon' : undefined}
              data-state={isCollapsed ? 'collapsed' : 'expanded'}
            >
              <SidebarContent className="flex flex-col">
                <SidebarGroup className="flex-1">
                  <SidebarMenu>
                    {mainNavItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          href={item.href}
                          isActive={
                            item.href === '#'
                              ? false
                              : item.href === '/'
                              ? pathname === '/'
                              : pathname.startsWith(item.href)
                          }
                          tooltip={item.label}
                        >
                          <item.icon className="transition-all" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarMenu>
                    {footerNavItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton href={item.href} tooltip={item.label}>
                          <item.icon className="transition-all" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </div>
          </Rnd>
          <main
            className="flex-1 flex flex-col overflow-auto transition-all duration-200 ease-in-out"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <div className="flex-1 p-4 sm:p-6 bg-background">
              {children}
            </div>
          </main>
        </div>
      </div>
       <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {mainNavItems.filter(item => item.href !== '#').map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setFont('azeret'))}>
              <Palette className="mr-2 h-4 w-4" />
              Set Font to Azeret Mono
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setFont('victor'))}>
              <Palette className="mr-2 h-4 w-4" />
              Set Font to Victor Mono
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setFont('noto'))}>
              <Palette className="mr-2 h-4 w-4" />
              Set Font to Noto Sans Mono
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  );
}
