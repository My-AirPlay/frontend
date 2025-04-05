import React from 'react';
import { ArtistAuthProvider } from '@/contexts';

export const metadata = {
    title: 'My Airplay | Artiste',
    description: '',
};

export default function ArtisteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ArtistAuthProvider>
            <>{children}</>
        </ArtistAuthProvider>
    );
}