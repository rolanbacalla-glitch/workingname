import * as React from 'react';
import { MapPin, Users, Calendar, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    type: 'destinations' | 'experiences' | 'companions' | 'general';
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({ type, title, description, action, className }: EmptyStateProps) {
    const icons = {
        destinations: Compass,
        experiences: Calendar,
        companions: Users,
        general: MapPin,
    };

    const gradients = {
        destinations: 'from-ocean-100 to-sand-100',
        experiences: 'from-sunset-100 to-sand-100',
        companions: 'from-purple-100 to-sand-100',
        general: 'from-sand-100 to-sand-50',
    };

    const iconColors = {
        destinations: 'text-ocean-400',
        experiences: 'text-sunset-400',
        companions: 'text-purple-400',
        general: 'text-neutral-400',
    };

    const Icon = icons[type];

    return (
        <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
            <div className={cn(
                'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br',
                gradients[type]
            )}>
                <Icon className={cn('w-10 h-10', iconColors[type])} />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-500 max-w-sm mb-6">{description}</p>
            {action}
        </div>
    );
}
