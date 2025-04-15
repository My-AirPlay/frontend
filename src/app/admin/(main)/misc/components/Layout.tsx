'use client';
import React, { Suspense } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/icons';

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, className }) => {
	const pathname = usePathname();

	// Determine if we need full width (no padding) based on route
	const isFullWidth = pathname.startsWith('/artist-revenue') || pathname.startsWith('/help/tickets') || pathname.startsWith('/help/chat');

	return (
		<div className={cn('flex h-screen overflow-hidden', className)}>
			<Sidebar className="max-md:hidden" />

			<div className="flex flex-col flex-1 overflow-hidden">
				<Header />
				<Suspense
					fallback={
						<div className="flex items-center justify-center size-full">
							<Spinner />
						</div>
					}
				>
					<main className="flex-1 overflow-y-auto">
						<div className={cn(isFullWidth ? 'p-0' : 'p-6 max-md:px-4 lg:px-10', 'max-w-full')}>{children}</div>
					</main>
				</Suspense>
				<Footer />
			</div>
		</div>
	);
};

export default AdminLayout;
