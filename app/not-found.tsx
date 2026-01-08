import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sunset-100 to-ocean-100 flex items-center justify-center mx-auto mb-6">
                    <Compass className="w-10 h-10 text-neutral-400" />
                </div>

                <h1 className="text-4xl font-bold text-neutral-900 mb-4">Page not found</h1>
                <p className="text-neutral-500 mb-8">
                    Looks like you&apos;ve wandered off the trail. Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/">
                        <Button variant="secondary" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back home
                        </Button>
                    </Link>
                    <Link href="/destinations">
                        <Button>
                            Explore destinations
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
