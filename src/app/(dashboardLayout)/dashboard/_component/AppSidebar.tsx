"use client"

import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Menu } from 'lucide-react';
import SidebarContent, { UserData } from './SidebarContent';

interface SidebarContextType {
    openMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within an AppSidebar provider');
    }
    return context;
};

interface AppSidebarProps {
    user: UserData;
    children: React.ReactNode;
}

export const MobileMenuButton: React.FC = () => {
    const { openMobileSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={openMobileSidebar}
            className="lg:hidden"
        >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
    );
};

const AppSidebar: React.FC<AppSidebarProps> = ({ user, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const openMobileSidebar = () => setSidebarOpen(true);

    return (
        <SidebarContext.Provider value={{ openMobileSidebar }}>
            <div className="flex h-screen overflow-hidden w-full">
                {/* Desktop Sidebar */}
                <aside
                    className={cn(
                        "hidden lg:flex lg:flex-col border-r bg-card transition-all duration-300 relative",
                        sidebarCollapsed ? "lg:w-20" : "lg:w-64"
                    )}
                >
                    <SidebarContent user={user} collapsed={sidebarCollapsed} />

                    {/* Collapse Toggle Button */}
                    <button
                        title="Toggle Sidebar"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="absolute -right-3 top-20 z-50 hidden h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent lg:flex"
                    >
                        <ChevronLeft
                            className={cn(
                                "h-4 w-4 transition-transform",
                                sidebarCollapsed && "rotate-180"
                            )}
                        />
                    </button>
                </aside>

                {/* Mobile Sidebar */}
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetContent side="left" className="w-64 p-0 lg:hidden">
                        <SidebarContent user={user} mobile />
                    </SheetContent>
                </Sheet>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>

            </div>
        </SidebarContext.Provider>
    );
};

export default AppSidebar;