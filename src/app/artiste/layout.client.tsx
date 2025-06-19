'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import React from 'react';
import { userProfileStage } from '@/lib/constants';

export default function ArtisteClientLayout() {
	const router = useRouter();
	const pathname = usePathname();
	const { admin, artist, isLoading, isAuthenticating } = useAuthContext();

	React.useEffect(() => {
		if (!isLoading && !isAuthenticating) {
			if (pathname.startsWith('/') && !artist && !admin) {
				return;
			}
			if (artist) {
				if (artist.stage !== 'complete' && artist.stage !== userProfileStage.payment) {
					router.push('/artiste/onboarding');
				}
			} else if (admin) {
				router.replace('/admin/dashboard');
			} else {
				if (!pathname.includes('password')) {
					router.replace('/artiste/login');
				}
			}
		}
	}, [artist, isLoading, isAuthenticating, admin, router, pathname]);

	return null;
}
