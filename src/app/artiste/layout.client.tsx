'use client';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { userProfileStage } from '@/lib/constants';

export default function ArtisteClientLayout() {
	const router = useRouter();
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
				router.replace('/artiste/login');
			}
		}
	}, [artist, isLoading, isAuthenticating, admin, router]);

	return <></>;
}
