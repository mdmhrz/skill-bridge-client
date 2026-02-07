import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import React from 'react';

const Logo = ({ logoColor, TextColor }: { logoColor?: string; TextColor?: string }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-rose-700", logoColor)}>
                <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className='flex flex-col gap-0'>
                <span className={cn("bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-xl font-bold text-transparent", TextColor)}>
                    Skill Bridge
                </span>
                <span className='text-xs text-muted-foreground'>Learning Platform</span>
            </div>
        </div>
    );
};

export default Logo;