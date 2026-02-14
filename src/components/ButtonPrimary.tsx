import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

interface PrimaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    name?: string;
    asChild?: boolean;
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
    ({ className, name, children, variant, size, asChild, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "bg-gradient-to-br from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 border-0 text-background cursor-pointer",
                    className
                )}
                variant={variant || undefined}
                size={size}
                asChild={asChild}
                {...props}
            >
                {name || children}
            </Button>
        );
    }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;