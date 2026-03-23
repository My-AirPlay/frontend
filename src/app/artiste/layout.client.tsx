'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { userProfileStage } from '@/lib/constants';

export default function ArtisteClientLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { admin, artist, isLoading, isAuthenticating } = useAuthContext();

	React.useEffect(() => {
		if (!isLoading && !isAuthenticating) {
			if (artist) {
				if (artist.stage !== 'complete' && artist.stage !== userProfileStage.payment) {
					router.push('/artiste/onboarding');
				}
			} else if (admin) {
				router.replace('/admin/dashboard');
			} else {
				if (!pathname.includes('password')) {
					const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
					const redirectParam = currentUrl !== '/artiste/login' ? `?redirect=${encodeURIComponent(currentUrl)}` : '';
					router.replace(`/artiste/login${redirectParam}`);
				}
			}
		}
	}, [artist, isLoading, isAuthenticating, admin, router, pathname, searchParams]);

	return null;
}
