'use client';
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/contexts/AuthContext';

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, className }) => {
	const pathname = usePathname();
	const { artist, isLoading, isAuthenticating } = useAuthContext();
	useEffect(() => {
		if (artist && !isLoading && !isAuthenticating) {
			if (artist.stage !== 'complete' || !artist.bankDetails.paidRegistrationFee) {
				redirect('/artiste/onboarding');
			}
		}
	}, [artist, isLoading, isAuthenticating]);

	// Determine if we need full width (no padding) based on route
	const isFullWidth = pathname.startsWith('/artist-revenue') || pathname.startsWith('/help/tickets') || pathname.startsWith('/help/chat');

	return (
		<div className={cn('flex h-screen overflow-hidden', className)}>
			<Sidebar className="max-md:hidden md:m-4" />

			<div className="flex flex-col flex-1 overflow-hidden">
				<Header />
				<main className="flex-1 overflow-y-auto">
					<div className={cn(isFullWidth ? 'p-0' : 'p-6 max-md:px-4 lg:px-10 !h-full', 'flex flex-col max-w-full')}>{children}</div>
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default AdminLayout;
