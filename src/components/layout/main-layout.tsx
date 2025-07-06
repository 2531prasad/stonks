'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeIcon, LayoutDashboard, Wallet, Plane, Book, Settings, User, Bell, Search, LogOut } from 'lucide-react'
import React from "react";
import { Rnd } from "react-rnd";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const [sidebarWidth, setSidebarWidth] = React.useState(288);
    const isCollapsed = sidebarWidth < 80;

    return (
        <SidebarProvider>
            <div className="h-[100dvh] w-full bg-background">
                <Rnd
                    size={{ width: sidebarWidth, height: '100%' }}
                    position={{ x: 0, y: 0 }}
                    minWidth={72}
                    maxWidth={400}
                    disableDragging={true}
                    enableResizing={{ right: true }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setSidebarWidth(parseInt(ref.style.width, 10));
                    }}
                    resizeHandleClasses={{
                        right: 'w-px bg-border hover:bg-primary transition-colors cursor-col-resize'
                    }}
                    className="z-10"
                >
                    <div
                        className="group flex h-full flex-col border-r bg-background overflow-hidden"
                        data-collapsible={isCollapsed}
                        data-state={isCollapsed ? 'collapsed' : 'expanded'}
                    >
                        <SidebarHeader className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-2 p-2 group-data-[state=collapsed]:justify-center">
                            <HomeIcon className="size-6 text-primary"/>
                            <span className="font-semibold text-lg group-data-[collapsible=true]:hidden">My App</span>
                        </div>
                        </SidebarHeader>
                        <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                            <SidebarMenuButton href="#" isActive={true} tooltip="Dashboard" className="group-data-[state=collapsed]:justify-center">
                                <LayoutDashboard />
                                <span className="group-data-[collapsible=true]:hidden">Dashboard</span>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Finance" className="group-data-[state=collapsed]:justify-center">
                                <Wallet />
                                <span className="group-data-[collapsible=true]:hidden">Finance</span>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Travel" className="group-data-[state=collapsed]:justify-center">
                                <Plane />
                                <span className="group-data-[collapsible=true]:hidden">Travel</span>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                            <SidebarMenuButton href="#" tooltip="Academic" className="group-data-[state=collapsed]:justify-center">
                                <Book />
                                <span className="group-data-[collapsible=true]:hidden">Academic</span>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        </SidebarContent>
                        <SidebarFooter className="p-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="#" tooltip="Account" className="group-data-[state=collapsed]:justify-center">
                                <User />
                                <span className="group-data-[collapsible=true]:hidden">Account</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="#" tooltip="Settings" className="group-data-[state=collapsed]:justify-center">
                                <Settings />
                                <span className="group-data-[collapsible=true]:hidden">Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton href="#" tooltip="Log Out" className="group-data-[state=collapsed]:justify-center">
                                <LogOut />
                                <span className="group-data-[collapsible=true]:hidden">Log Out</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        </SidebarFooter>
                    </div>
                </Rnd>
                <main
                className="h-full flex flex-col transition-all duration-150 ease-in-out"
                style={{ marginLeft: sidebarWidth }}
                >
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 sm:px-6">
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
                <div className="flex-1 overflow-auto p-4 sm:p-6 bg-secondary/40">
                    {children}
                </div>
                </main>
            </div>
        </SidebarProvider>
    )
}