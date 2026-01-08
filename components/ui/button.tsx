import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-sunset-500 text-white shadow-soft hover:bg-sunset-600 hover:shadow-soft-md active:bg-sunset-700',
                secondary:
                    'bg-white text-neutral-900 border border-sand-200 shadow-soft hover:bg-sand-50 hover:shadow-soft-md active:bg-sand-100',
                ghost:
                    'text-neutral-700 hover:bg-sand-100 active:bg-sand-200',
                ocean:
                    'bg-ocean-500 text-white shadow-soft hover:bg-ocean-600 hover:shadow-soft-md active:bg-ocean-700',
                destructive:
                    'bg-red-500 text-white shadow-soft hover:bg-red-600 hover:shadow-soft-md',
                link:
                    'text-sunset-500 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-6 py-3',
                sm: 'h-9 px-4 py-2 text-xs',
                lg: 'h-12 px-8 py-4 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
