'use client';
import React, { ReactNode } from 'react';
import { AdminLayout } from './misc/components';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Spinner } from '@/components/icons';
import { onboardingStages, userProfileStage } from '@/lib/constants';

interface AppLayoutProps {
	children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	const router = useRouter();
	const { admin, artist, isLoading, isAuthenticating } = useAuthContext();

	React.useEffect(() => {
		if (!isLoading && !isAuthenticating) {
			if (artist) {
				if (artist.stage !== 'complete' && artist.stage !== userProfileStage.payment) {
					router.push('/artiste/onboarding');
				} else if (artist.stage === 'complete') {
					router.replace('/artiste/dashboard');
				} else if (admin) {
					return;
				} else {
					router.replace('/artiste/login');
				}
			}
		}
	}, [artist, isLoading, isAuthenticating, admin, router]);

	if (isLoading || isAuthenticating) {
		return (
			<div className="flex items-center justify-center w-screen h-screen">
				<Spinner />
			</div>
		);
	}

	return <AdminLayout>{children}</AdminLayout>;
};

export default AppLayout;
