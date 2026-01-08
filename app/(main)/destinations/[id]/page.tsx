'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Shield, Map, ChevronRight } from 'lucide-react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { destinations } from '@/lib/data';

interface DestinationPageProps {
    params: { id: string };
}

export default function DestinationPage({ params }: DestinationPageProps) {
    const destination = destinations.find((d) => d.id === params.id);

    if (!destination) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[300px] sm:h-[400px]">
                <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/app/destinations"
                    className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-lg text-white px-3 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="section-container">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                            <MapPin className="w-4 h-4" />
                            {destination.country}
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                            {destination.name}
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl">
                            {destination.vibeStatement}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="section-container py-8">
                {/* Map Button */}
                <Link href={`/app/destinations/${destination.id}/map`}>
                    <Button variant="secondary" className="gap-2 mb-8">
                        <Map className="w-4 h-4" />
                        View experiences on map
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </Link>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="neighbourhoods">Neighbourhoods</TabsTrigger>
                        <TabsTrigger value="safety">Safety</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">About {destination.name}</h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {destination.overview}
                            </p>
                            <h3 className="text-lg font-medium text-neutral-900 mb-3">Popular activities</h3>
                            <ChipGroup>
                                <Chip>Island hopping</Chip>
                                <Chip>Snorkeling</Chip>
                                <Chip>Beach bars</Chip>
                                <Chip>Kayaking</Chip>
                                <Chip>Sunset watching</Chip>
                            </ChipGroup>
                        </div>
                    </TabsContent>

                    <TabsContent value="neighbourhoods" className="mt-6">
                        <div className="space-y-4">
                            {destination.neighbourhoods.map((neighbourhood) => (
                                <div
                                    key={neighbourhood.id}
                                    className="bg-white rounded-2xl p-6 shadow-soft"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg font-semibold text-neutral-900">
                                            {neighbourhood.name}
                                        </h3>
                                        <Chip variant="vibe" vibe={neighbourhood.vibe.toLowerCase().split(' ')[0]}>
                                            {neighbourhood.vibe}
                                        </Chip>
                                    </div>
                                    <p className="text-neutral-600">{neighbourhood.description}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="safety" className="mt-6">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-neutral-900">Safety Tips</h2>
                            </div>
                            <ul className="space-y-3">
                                {destination.safetyTips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-sand-100 text-neutral-600 text-sm font-medium flex items-center justify-center shrink-0">
                                            {index + 1}
                                        </span>
                                        <span className="text-neutral-600">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-sand-100">
                                <Link href="/app/safety">
                                    <Button variant="ghost" className="gap-2">
                                        <Shield className="w-4 h-4" />
                                        View Safety Centre
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
