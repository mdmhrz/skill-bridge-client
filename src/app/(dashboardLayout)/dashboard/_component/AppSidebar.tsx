"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ChevronLeft } from 'lucide-react';
import SidebarContent, { UserData } from './SidebarContent';

interface AppSidebarProps {
    collapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
    mobileOpen: boolean;
    onMobileOpenChange: (open: boolean) => void;
    user: UserData;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
    collapsed,
    onCollapsedChange,
    mobileOpen,
    onMobileOpenChange,
    user
}) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex lg:flex-col border-r bg-card transition-all duration-300 relative",
                    collapsed ? "lg:w-20" : "lg:w-64"
                )}
            >
                <SidebarContent user={user} collapsed={collapsed} />

                {/* Collapse Toggle Button */}
                <button
                    title="Toggle Sidebar"

                    onClick={() => onCollapsedChange(!collapsed)}
                    className="absolute -right-3 top-20 z-50 hidden h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent lg:flex"
                >
                    <ChevronLeft
                        className={cn(
                            "h-4 w-4 transition-transform",
                            collapsed && "rotate-180"
                        )}
                    />
                </button>
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
                <SheetContent side="left" className="w-64 p-0 lg:hidden">
                    <SidebarContent user={user} mobile />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default AppSidebar;