'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    MapPin,
    Calendar,
    Filter,
    Hand,
    ChevronRight,
    Star,
    CheckCircle
} from 'lucide-react';
import { Button, Input, Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Chip, ChipGroup, EmptyState } from '@/components/shared';
import { useToastActions, useAuth } from '@/lib/hooks';
import { companions, destinations } from '@/lib/data';
import { formatDate, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const ageRanges = ['all', '20-25', '26-30', '31-35', '36-40'];
const travelStyles = ['all', 'chill', 'party', 'adventurous', 'mixed'];

export default function CompanionsPage() {
    const [search, setSearch] = useState('');
    const [ageFilter, setAgeFilter] = useState('all');
    const [styleFilter, setStyleFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [wavedCompanions, setWavedCompanions] = useState<Set<string>>(
        new Set(companions.filter((c) => c.hasWaved).map((c) => c.id))
    );
    const { success } = useToastActions();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const filteredCompanions = companions.filter((comp) => {
        const matchesSearch = comp.name.toLowerCase().includes(search.toLowerCase()) ||
            comp.nationality.toLowerCase().includes(search.toLowerCase());
        const matchesAge = ageFilter === 'all' || comp.ageRange === ageFilter;
        const matchesStyle = styleFilter === 'all' || comp.travelStyle.includes(styleFilter as any);
        return matchesSearch && matchesAge && matchesStyle;
    });

    const handleWave = (companionId: string, name: string) => {
        if (!isAuthenticated) {
            router.push('/sign-in');
            return;
        }

        const newWaved = new Set(wavedCompanions);
        if (newWaved.has(companionId)) {
            newWaved.delete(companionId);
        } else {
            newWaved.add(companionId);
            success('Wave sent! 👋', `${name} will be notified that you're interested in connecting.`);
        }
        setWavedCompanions(newWaved);
    };

    const getDestName = (destId: string) => destinations.find((d) => d.id === destId)?.name || destId;

    return (
        <div className="section-container py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Find Companions</h1>
                <p className="text-neutral-500">Connect with solo travellers heading the same way</p>
            </div>

            {/* Search & Filters */}
            <div className="space-y-4 mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <Input
                            type="text"
                            placeholder="Search by name or nationality..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </Button>
                </div>

                {showFilters && (
                    <Card className="p-4 animate-fade-in">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-500 mb-2">Age range</p>
                                <ChipGroup>
                                    {ageRanges.map((age) => (
                                        <button key={age} onClick={() => setAgeFilter(age)}>
                                            <Chip
                                                variant={ageFilter === age ? 'active' : 'default'}
                                                className="cursor-pointer"
                                            >
                                                {age === 'all' ? 'All' : age}
                                            </Chip>
                                        </button>
                                    ))}
                                </ChipGroup>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500 mb-2">Travel style</p>
                                <ChipGroup>
                                    {travelStyles.map((style) => (
                                        <button key={style} onClick={() => setStyleFilter(style)}>
                                            <Chip
                                                variant={styleFilter === style ? 'active' : 'default'}
                                                className="capitalize cursor-pointer"
                                            >
                                                {style}
                                            </Chip>
                                        </button>
                                    ))}
                                </ChipGroup>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {/* Companions Grid */}
            {filteredCompanions.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanions.map((companion) => {
                        const hasWaved = wavedCompanions.has(companion.id);

                        return (
                            <Card key={companion.id} className="overflow-hidden">
                                <div className="p-5">
                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <Avatar className="w-14 h-14">
                                            <AvatarImage src={companion.avatar} alt={companion.name} />
                                            <AvatarFallback>{companion.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-neutral-900 truncate">
                                                    {companion.name}
                                                </h3>
                                                {companion.verificationStatus === 'trusted' && (
                                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-sm text-neutral-500">
                                                {companion.nationality} · {companion.ageRange}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                        {companion.bio}
                                    </p>

                                    {/* Interests */}
                                    <ChipGroup className="mb-4">
                                        {companion.interests.slice(0, 3).map((interest) => (
                                            <Chip key={interest} className="text-xs">{interest}</Chip>
                                        ))}
                                        {companion.interests.length > 3 && (
                                            <Chip className="text-xs">+{companion.interests.length - 3}</Chip>
                                        )}
                                    </ChipGroup>

                                    {/* Upcoming Destinations */}
                                    <div className="space-y-2 mb-4">
                                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                                            Upcoming trips
                                        </p>
                                        {companion.upcomingDestinations.slice(0, 2).map((trip, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-4 h-4 text-sunset-500" />
                                                <span className="font-medium text-neutral-900">
                                                    {trip.destinationName}
                                                </span>
                                                <span className="text-neutral-400">·</span>
                                                <span className="text-neutral-500 text-xs">
                                                    {formatDate(trip.dates.start)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Badges */}
                                    {companion.badges.length > 0 && (
                                        <div className="flex items-center gap-2 mb-4">
                                            {companion.badges.slice(0, 2).map((badge) => (
                                                <span
                                                    key={badge}
                                                    className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="border-t border-sand-100 p-4 flex gap-2">
                                    <Button
                                        variant={hasWaved ? 'ocean' : 'secondary'}
                                        onClick={() => handleWave(companion.id, companion.name)}
                                        className="flex-1 gap-2"
                                    >
                                        <Hand className={cn('w-4 h-4', hasWaved && 'animate-pulse')} />
                                        {hasWaved ? 'Waved ✓' : 'Wave 👋'}
                                    </Button>
                                    <Link href={`/companions/${companion.id}`} className="flex-1">
                                        <Button variant="ghost" className="w-full gap-2">
                                            View Profile
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <EmptyState
                    type="companions"
                    title="No companions found"
                    description="Try adjusting your filters or search term to find more travel buddies."
                />
            )}
        </div>
    );
}
