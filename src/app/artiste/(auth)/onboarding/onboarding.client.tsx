'use client';

import { onboardingStages, OnboardingSteps } from '@/lib/constants';
import OnboardingBasciDetail from './_components/basic-details/basic-details';
import OnboardingBankDetail from './_components/bank-details/bank-details';
import OnboardingSocialMedia from './_components/social-media-links/social-media-links';
import PreviewOnboarding from './_components/preview-onboarding/preview-onboarding';
import React, { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
// import { getArtistProfile } from '@/contexts/AuthContextArtist';
import { redirect, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/icons';
import RegistrationPaymentPage from './_components/payment-registration-fee';

const OnboardingClientPage = () => {
	const { artist, isLoading } = useAuthContext();
	const searchParams = useSearchParams();
	const forceStep = searchParams.get('step') ? parseInt(searchParams.get('step') as string) : OnboardingSteps.BASIC_DETAIL;
	const [currentStep, setCurrentStep] = useState<any>(onboardingStages[artist!.stage] || forceStep || OnboardingSteps.BASIC_DETAIL);
	const screens = {
		[OnboardingSteps.BASIC_DETAIL]: <OnboardingBasciDetail email={artist?.email || ''} setCurrentStep={setCurrentStep} />,
		[OnboardingSteps.BANK]: <OnboardingBankDetail setCurrentStep={setCurrentStep} email={artist?.email || ''} />,
		[OnboardingSteps.SOCIAL_LINK]: <OnboardingSocialMedia email={artist?.email || ''} setCurrentStep={setCurrentStep} />,
		[OnboardingSteps.PREVIEW]: <PreviewOnboarding setCurrentStep={setCurrentStep} />,
		[OnboardingSteps.PAY_REGISTRATION_FEE]: <RegistrationPaymentPage email={artist?.email || ''} />
	};

	React.useEffect(() => {
		if (!isLoading && !artist) {
			redirect('/artiste/login');
		} else if (!!artist && artist?.stage == 'complete' && !forceStep) {
			redirect('/artiste/dashboard');
		} else if (!!artist && (artist.stage === 'Add social links' || artist.stage === 'complete') && !artist.bankDetails.registrationFeeReference) {
			setCurrentStep(OnboardingSteps.PAY_REGISTRATION_FEE);
		}
	}, [isLoading, artist, forceStep]);

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
