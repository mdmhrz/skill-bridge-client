'use client'
import LogoutButton from '@/components/modules/auth/LogoutButton';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

const LogoutComponent = () => {
    return (
        <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <LogoutButton className='bg-transparent text-destructive hover:bg-transparent -ml-4'></LogoutButton>
        </DropdownMenuItem>)
};

export default LogoutComponent;