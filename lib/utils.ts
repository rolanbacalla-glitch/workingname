import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format date for display
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

// Format time for display
export function formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Price level display
export function getPriceDisplay(level: 1 | 2 | 3): string {
    return '₱'.repeat(level);
}

// Generate unique ID
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

// Get category icon name (for Lucide)
export function getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
        food: 'Utensils',
        island: 'Waves',
        nightlife: 'Music',
        hike: 'Mountain',
        culture: 'Landmark',
    };
    return icons[category] || 'MapPin';
}

// Get vibe color class
export function getVibeColor(vibe: string): string {
    const colors: Record<string, string> = {
        chill: 'bg-ocean-100 text-ocean-700',
        party: 'bg-sunset-100 text-sunset-700',
        adventurous: 'bg-green-100 text-green-700',
        mixed: 'bg-purple-100 text-purple-700',
    };
    return colors[vibe] || 'bg-sand-100 text-neutral-700';
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

// Local storage helpers
export function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function setToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error('Failed to save to localStorage');
    }
}
