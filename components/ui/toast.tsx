'use client';

import * as React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/hooks';
import { Toast as ToastType } from '@/lib/types';

function ToastItem({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
    const icons = {
        default: Info,
        success: CheckCircle,
        error: AlertCircle,
    };

    const colors = {
        default: 'bg-white border-sand-200',
        success: 'bg-white border-green-200',
        error: 'bg-white border-red-200',
    };

    const iconColors = {
        default: 'text-ocean-500',
        success: 'text-green-500',
        error: 'text-red-500',
    };

    const Icon = icons[toast.variant || 'default'];

    return (
        <div
            className={cn(
                'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-soft-md animate-slide-up',
                colors[toast.variant || 'default']
            )}
        >
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColors[toast.variant || 'default'])} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900">{toast.title}</p>
                {toast.description && (
                    <p className="mt-1 text-sm text-neutral-500">{toast.description}</p>
                )}
            </div>
            <button
                onClick={onRemove}
                className="shrink-0 rounded-lg p-1 text-neutral-400 hover:text-neutral-600 hover:bg-sand-100 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
