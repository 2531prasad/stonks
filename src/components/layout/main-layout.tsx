'use client';

import {
  Book,
  Cpu,
  LayoutDashboard,
  LogOut,
  Palette,
  Plane,
  Settings,
  User,
  Wallet,
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
import { usePathname, useRouter } from 'next/navigation';
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
import { useWindows } from '@/contexts/DashboardContext';
import { HeaderRight } from './HeaderRight';

const mainNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
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
  const { setFont } = useFont();
  const [openCommand, setOpenCommand] = React.useState(false)
  const router = useRouter()
  const { openWindow } = useWindows();

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
          <HeaderRight setOpenCommand={setOpenCommand} />
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
          >
            <div className="flex-1 p-4 sm:p-6">
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
          <CommandGroup heading="Actions">
            <CommandItem
              value="cmd"
              onSelect={() => runCommand(() => openWindow('terminal'))}
            >
              <Cpu className="mr-2 h-4 w-4" />
              <span>Summon Terminal</span>
            </CommandItem>
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
