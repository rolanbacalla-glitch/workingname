import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-11 w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 ease-out',
                    'focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-100',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
