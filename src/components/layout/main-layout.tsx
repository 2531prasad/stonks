'use client';

import {
  Book,
  Cpu,
  LayoutDashboard,
  LogOut,
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = React.useState(50);
  const isCollapsed = sidebarWidth < 80;
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex flex-col h-[100dvh] w-full bg-background">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <Rnd
            size={{ width: sidebarWidth, height: '100%' }}
            position={{ x: 0, y: 0 }}
            minWidth={50}
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
              data-collapsible={isCollapsed}
              data-state={isCollapsed ? 'collapsed' : 'expanded'}
            >
              <div className="flex-1 overflow-y-auto p-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:items-center">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Dashboard">
                      <Link href="/">
                        <LayoutDashboard />
                        <span className="group-data-[collapsible=true]:hidden">
                          Dashboard
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/ai')} tooltip="Compute">
                      <Link href="/ai">
                        <Cpu />
                        <span className="group-data-[collapsible=true]:hidden">
                          Compute
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Finance">
                      <Wallet />
                      <span className="group-data-[collapsible=true]:hidden">
                        Finance
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Travel">
                      <Plane />
                      <span className="group-data-[collapsible=true]:hidden">
                        Travel
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Academic">
                      <Book />
                      <span className="group-data-[collapsible=true]:hidden">
                        Academic
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
              <div className="p-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:items-center">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Account">
                      <User />
                      <span className="group-data-[collapsible=true]:hidden">
                        Account
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Settings">
                      <Settings />
                      <span className="group-data-[collapsible=true]:hidden">
                        Settings
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Log Out">
                      <LogOut />
                      <span className="group-data-[collapsible=true]:hidden">
                        Log Out
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </div>
          </Rnd>
          <main
            className="flex-1 flex flex-col overflow-auto"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <div className="flex-1 p-4 sm:p-6 bg-secondary/40">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
