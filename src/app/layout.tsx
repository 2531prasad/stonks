import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarProvider,
  Sidebar,
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Pro",
  description: "A professional dashboard built with Next.js and ShadCN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider className="isolate">
            <Sidebar collapsible="icon" className="border-r">
              <SidebarHeader className="flex items-center justify-between p-2">
                 <div className="flex items-center gap-2 p-2">
                    <HomeIcon className="size-6 text-primary"/>
                    <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">My App</span>
                 </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" isActive={true} tooltip="Dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Finance">
                      <Wallet />
                      <span>Finance</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                     <SidebarMenuButton href="#" tooltip="Travel">
                      <Plane />
                      <span>Travel</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="#" tooltip="Academic">
                      <Book />
                      <span>Academic</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton href="#" tooltip="Account">
                        <User />
                        <span>Account</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                       <SidebarMenuButton href="#" tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                       <SidebarMenuButton href="#" tooltip="Log Out">
                        <LogOut />
                        <span>Log Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
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
        </SidebarProvider>
      </body>
    </html>
  );
}
