"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    LayoutDashboard,
    Settings,
    LogOut,
    User,
    Bell,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Roles } from '@/constants/role';
import studentRoutes from '@/routes/student.routes';
import tutorRoutes from '@/routes/tutor.routes';
import adminRoutes from '@/routes/admin.routes';
import { NavigationItem } from '@/types/userRoute.type';
import { AuthUser } from '@/types';
import { getInitials } from '@/lib/utils/geInitials';



interface SidebarContentProps {
    mobile?: boolean;
    collapsed?: boolean;
    user: AuthUser;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
    mobile = false,
    collapsed = false,
    user
}) => {
    // Navigation items
    const navigationItems: NavigationItem[] = [];


    switch (user.role) {
        case Roles.student:
            navigationItems.push(...studentRoutes);
            break;

        case Roles.tutor:
            navigationItems.push(...tutorRoutes);
            break;

        case Roles.admin:
            navigationItems.push(...adminRoutes);
            break;

        default:
            break;
    }


    return (
        <div className="flex h-full flex-col">
            {/* Logo and Brand */}
            <div className={cn(
                "flex h-16 items-center border-b px-6",
                collapsed && !mobile && "justify-center px-2"
            )}>
                <Link
                    href="/"
                    className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-rose-700">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    {(!collapsed || mobile) && (
                        <div className="flex flex-col">
                            <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-xl font-bold text-transparent">SkillBridge</span>
                            <span className="text-xs text-muted-foreground">Learning Platform</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                {navigationItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                            "text-muted-foreground",
                            collapsed && !mobile && "justify-center"
                        )}
                    >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {(!collapsed || mobile) && (
                            <>
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                        {item.badge}
                                    </span>
                                )}
                            </>
                        )}
                    </a>
                ))}
            </nav>

            {/* Bottom Section - Settings & User */}
            <div className="border-t p-3 space-y-2">
                {/* Settings Button */}
                <a
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground text-muted-foreground",
                        collapsed && !mobile && "justify-center"
                    )}
                >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {(!collapsed || mobile) && <span>Settings</span>}
                </a>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-accent",
                                collapsed && !mobile && "justify-center px-2"
                            )}
                        >
                            <Avatar className="h-8 w-8 border-2 border-border">
                                <AvatarImage src={user?.image!} alt={user?.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            {(!collapsed || mobile) && (
                                <div className="flex flex-1 flex-col items-start text-left">
                                    <span className="text-sm font-medium text-foreground">
                                        {user.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SidebarContent;