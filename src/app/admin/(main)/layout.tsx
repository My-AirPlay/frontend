'use client';
import React, { ReactNode } from 'react';
import { AdminLayout } from './misc/components';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Spinner } from '@/components/icons';
import NoAccessPage from './misc/components/NoAccessPage';

const ROUTE_TO_PAGE_KEY: Record<string, string> = {
	'/admin/dashboard': 'dashboard',
	'/admin/contracts': 'contracts',
	'/admin/tracks': 'tracks',
	'/admin/catalogue': 'catalogue',
	'/admin/sales': 'sales',
	'/admin/sales-history': 'sales_history',
	'/admin/artist-revenue': 'artist_revenue',
	'/admin/support': 'support',
	'/admin/json': 'json',
	'/admin/password': 'password_management'
};

const CANONICAL_PAGES = [
	{ key: 'dashboard', path: '/admin/dashboard' },
	{ key: 'contracts', path: '/admin/contracts' },
	{ key: 'tracks', path: '/admin/tracks' },
	{ key: 'catalogue', path: '/admin/catalogue' },
	{ key: 'sales', path: '/admin/sales' },
	{ key: 'sales_history', path: '/admin/sales-history' },
	{ key: 'artist_revenue', path: '/admin/artist-revenue' },
	{ key: 'support', path: '/admin/support' },
	{ key: 'json', path: '/admin/json' },
	{ key: 'password_management', path: '/admin/password' }
];

// Settings is super-admin-only, not page-gated
const SUPER_ADMIN_ROUTES = ['/admin/settings'];

interface AppLayoutProps {
	children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { admin, isLoading, isAuthenticating, hasPageAccess } = useAuthContext();
	const [accessDenied, setAccessDenied] = React.useState(false);

	React.useEffect(() => {
		if (isLoading || isAuthenticating) return;

		if (!admin) {
			router.replace('/admin/login');
			return;
		}

		// Handle mustChangePassword
		if (admin.mustChangePassword) {
			router.replace('/admin/change-password');
			return;
		}

		// Super admin routes
		if (SUPER_ADMIN_ROUTES.some(r => pathname.startsWith(r))) {
			if (!admin.isSuperAdmin) {
				// Redirect to first allowed page
				const first = CANONICAL_PAGES.find(p => hasPageAccess(p.key));
				if (first) {
					router.replace(first.path);
				} else {
					setAccessDenied(true);
				}
			}
			return;
		}

		// Find page key for current route
		const pageKey = Object.entries(ROUTE_TO_PAGE_KEY).find(([route]) => pathname.startsWith(route))?.[1];

		// If no page key found (e.g. policy pages), allow
		if (!pageKey) return;

		if (!hasPageAccess(pageKey)) {
			const first = CANONICAL_PAGES.find(p => hasPageAccess(p.key));
			if (first) {
				router.replace(first.path);
			} else {
				setAccessDenied(true);
			}
		}
	}, [admin, isLoading, isAuthenticating, pathname, hasPageAccess, router]);

	if (isLoading || isAuthenticating) {
		return (
			<div className="flex items-center justify-center w-screen h-screen">
				<Spinner />
			</div>
		);
	}

	if (accessDenied) {
		return (
			<AdminLayout>
				<NoAccessPage />
			</AdminLayout>
		);
	}

	return <AdminLayout>{children}</AdminLayout>;
};

export default AppLayout;
