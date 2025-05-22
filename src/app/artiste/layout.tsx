import React from 'react';
import ArtisteClientLayout from './layout.client';

export const metadata = {
	title: 'My Airplay | Artiste',
	description: ''
};

export default function ArtisteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<ArtisteClientLayout />
		</>
	);
}
