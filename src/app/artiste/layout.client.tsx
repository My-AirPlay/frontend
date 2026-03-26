'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { userProfileStage } from '@/lib/constants';

const AUTH_ROUTES = ['/artiste/login', '/artiste/register', '/artiste/forgot-password', '/artiste/verify', '/artiste/onboarding', '/artiste/passwordRecovery'];

export default function ArtisteClientLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { admin, artist, isLoading, isAuthenticating } = useAuthContext();

	const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

	React.useEffect(() => {
		if (!isLoading && !isAuthenticating) {
			if (artist) {
				if (artist.stage !== 'complete' && artist.stage !== userProfileStage.payment) {
					router.push('/artiste/onboarding');
				}
			} else if (admin) {
				router.replace('/admin/dashboard');
			} else if (!isAuthRoute) {
				const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
				router.replace(`/artiste/login?redirect=${encodeURIComponent(currentUrl)}`);
			}
		}
	}, [artist, isLoading, isAuthenticating, admin, router, pathname, searchParams, isAuthRoute]);

	return null;
}
