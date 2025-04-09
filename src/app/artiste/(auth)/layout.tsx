'use client';
import CustomAppLayout from '@/components/app-layout/app-layout';
import { getArtistProfile } from '@/contexts/AuthContextArtist';
import { urls, userProfileStage } from '@/lib/constants';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';
interface AuthLayoutProps {
	children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
	React.useEffect(() => {
		const fetchUser = async () => {
			const user = await getArtistProfile();
			if (user) {
				redirect(user.stage === userProfileStage.onboarding ? urls.onboarding : urls.dashboard);
			}
		};
		fetchUser();
	}, []);

	return <CustomAppLayout showIcons>{children}</CustomAppLayout>;
};

export default AuthLayout;
