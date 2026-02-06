import React from 'react';
import { Button } from '@/components/ui/button';
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
    Settings,
    LogOut,
    User,
    Bell,
    Menu,
    Search,
} from 'lucide-react';
import { AppSidebar, MobileMenuButton, UserData } from './dashboard/_component';


interface DashboardLayoutProps {
    children: React.ReactNode;
    user?: UserData;
}

const DashboardLayout = ({
    children,
    user = {
        name: 'John Doe',
        email: 'john@example.com',
        image: undefined
    }
}: DashboardLayoutProps) => {

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar user={user}>
                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Top Header */}
                    <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
                        {/* Mobile Menu Button */}
                        <MobileMenuButton />

                        {/* Search Bar */}
                        <div className="flex flex-1 items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2">
                            {/* Notifications */}
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive"></span>
                                <span className="sr-only">Notifications</span>
                            </Button>

                            {/* User Avatar - Desktop Only */}
                            <div className="hidden lg:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent">
                                            <Avatar className="h-8 w-8 border-2 border-border">
                                                <AvatarImage src={user.image} alt={user.name} />
                                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
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
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
                        {children}
                    </main>
                </div>
            </AppSidebar>
        </div>
    );
};

export default DashboardLayout;