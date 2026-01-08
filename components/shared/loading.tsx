import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <div
            className={cn(
                'animate-spin rounded-full border-2 border-sand-200 border-t-sunset-500',
                sizes[size],
                className
            )}
        />
    );
}

interface LoadingStateProps {
    message?: string;
    className?: string;
}

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 gap-4', className)}>
            <LoadingSpinner size="lg" />
            <p className="text-neutral-500 text-sm">{message}</p>
        </div>
    );
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-xl bg-sand-100',
                className
            )}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-2xl bg-white shadow-soft p-6 space-y-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
            </div>
        </div>
    );
}
