'use client';

import { Navbar } from '@/components/layout';
import { Footer } from '@/components/layout';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-sand-50 flex flex-col">
            <Navbar />

            {/* Main content - add padding for nav */}
            <main className="flex-1 pt-14 md:pt-16 pb-16 md:pb-0">
                {children}
            </main>

            {/* Footer - hidden on mobile due to bottom nav */}
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
}
