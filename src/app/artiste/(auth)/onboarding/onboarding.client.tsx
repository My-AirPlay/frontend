'use client';

import { onboardingStages, onboardingStagesKey, OnboardingSteps, userProfileStage } from '@/lib/constants';
import OnboardingBasciDetail from './_components/basic-details/basic-details';
import OnboardingBankDetail from './_components/bank-details/bank-details';
import OnboardingSocialMedia from './_components/social-media-links/social-media-links';
import PreviewOnboarding from './_components/preview-onboarding/preview-onboarding';
import React, { useState } from 'react';
import { useArtisteContext } from '@/contexts/AuthContextArtist';
import { getArtistProfile } from '@/contexts/AuthContextArtist';
import { redirect } from 'next/navigation';
import { Spinner } from '@/components/icons';

const OnboardingClientPage = () => {
	const { artist, isLoading } = useArtisteContext();
	const [currentStep, setCurrentStep] = useState(onboardingStages[artist?.stage || ''] || OnboardingSteps.BASIC_DETAIL);
	const screens = {
		[OnboardingSteps.BASIC_DETAIL]: <OnboardingBasciDetail email={artist?.email || ''} setCurrentStep={setCurrentStep} />,
		[OnboardingSteps.BANK]: <OnboardingBankDetail setCurrentStep={setCurrentStep} email={artist?.email || ''} />,
		[OnboardingSteps.SOCIAL_LINK]: <OnboardingSocialMedia email={artist?.email || ''} setCurrentStep={setCurrentStep} />,
		[OnboardingSteps.PREVIEW]: <PreviewOnboarding setCurrentStep={setCurrentStep} />
	};

	React.useEffect(() => {
		if (!isLoading && !artist) {
			redirect('/artiste/login');
		}

		if (!!artist && !onboardingStagesKey.includes(artist?.stage)) {
			redirect('/artiste/dashboard');
		}
		const fetchUser = async () => {
			const user = await getArtistProfile();
			if (user && user.stage !== userProfileStage.onboarding) {
				redirect('/artiste/dashboard');
			}
		};
		fetchUser();
	}, [isLoading, artist, onboardingStagesKey]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner />
			</div>
		);
	}
	return <>{screens[currentStep]}</>;
};

export default OnboardingClientPage;
