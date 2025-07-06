'use client';

import {
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeIcon, LayoutDashboard, Wallet, Plane, Book, Settings, User, Bell, Search, LogOut } from 'lucide-react'
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import React from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <SidebarProvider className="isolate">
            <PanelGroup 
              direction="horizontal" 
              className="h-full w-full"
              onLayout={(layout) => {
                const isNowCollapsed = layout[0] < 15;
                if(isNowCollapsed !== isCollapsed) {
                  setIsCollapsed(isNowCollapsed);
                }
              }}
            >
              <Panel defaultSize={20} minSize={10} maxSize={25} collapsible={true} collapsedSize={4}>
                  <div
                    className="group flex h-full flex-col border-r"
                    data-collapsible={isCollapsed}
                    data-state={isCollapsed ? 'collapsed' : 'expanded'}
                  >
                    <SidebarHeader className="flex items-center justify-between p-2">
                       <div className="flex items-center gap-2 p-2">
                          <HomeIcon className="size-6 text-primary"/>
                          <span className="font-semibold text-lg group-data-[collapsible=true]:hidden">My App</span>
                       </div>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton href="#" isActive={true} tooltip="Dashboard">
                            <LayoutDashboard />
                            <span className="group-data-[collapsible=true]:hidden">Dashboard</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton href="#" tooltip="Finance">
                            <Wallet />
                            <span className="group-data-[collapsible=true]:hidden">Finance</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                           <SidebarMenuButton href="#" tooltip="Travel">
                            <Plane />
                            <span className="group-data-[collapsible=true]:hidden">Travel</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton href="#" tooltip="Academic">
                            <Book />
                            <span className="group-data-[collapsible=true]:hidden">Academic</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="p-2">
                      <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Account">
                              <User />
                              <span className="group-data-[collapsible=true]:hidden">Account</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                             <SidebarMenuButton href="#" tooltip="Settings">
                              <Settings />
                              <span className="group-data-[collapsible=true]:hidden">Settings</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                           <SidebarMenuItem>
                             <SidebarMenuButton href="#" tooltip="Log Out">
                              <LogOut />
                              <span className="group-data-[collapsible=true]:hidden">Log Out</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarFooter>
                  </div>
              </Panel>
              <PanelResizeHandle className="w-px bg-border hover:bg-primary transition-colors" />
              <Panel minSize={50}>
                  <SidebarInset>
                      <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                          <SidebarTrigger className="md:hidden"/>
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
                      <main className="flex-1 overflow-auto p-4 sm:p-6 bg-secondary/40">
                          {children}
                      </main>
                  </SidebarInset>
              </Panel>
            </PanelGroup>
        </SidebarProvider>
    )
}
