'use client';
import PreviewTable from '@/components/preview-table/preview-table';
import { Button } from '@/components/ui/button';
import { OnboardingSteps } from '@/lib/constants';
import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

interface PreviewOnboardingProps {
	setCurrentStep: (a: OnboardingSteps) => void;
}
const PreviewOnboarding = ({ setCurrentStep }: PreviewOnboardingProps) => {
	const { artist } = useAuthContext();
	const data = [
		[
			{
				title: 'Account Type',
				value: 'Artist'
			},
			{
				title: 'First Name',
				value: artist!.firstName || ''
			},
			{
				title: 'Last Name',
				value: artist!.lastName || ''
			},
			{
				title: 'Phone Number',
				value: artist!.phoneNumber || ''
			},
			{
				title: 'Country',
				value: artist!.country || ''
			},
			{
				title: 'City',
				value: artist!.city
			},
			{
				title: 'Artist Name',
				value: artist!.artistName
			}
		],
		[
			{
				title: 'Bank Name',
				value: artist!.bankDetails.bankName
			},
			{
				title: 'Currency',
				value: artist!.bankDetails.currency
			},
			{
				title: 'Account Number',
				value: artist!.bankDetails.accountNumber
			},
			{
				title: 'Account Name',
				value: artist!.bankDetails.accountName
			}
		]
	];
	return (
		<div className="fixed left-0 top-0 h-svh w-svw bg-custom-edit-modal z-50 py-14 px-5 overflow-y-auto">
			<div className="max-w-[961px] mx-auto md:w-full w-fit">
				<h1 className="text-custom-primary font-inter font-semibold text-xl mb-[18px]">REVEIW YOUR INFORMATION</h1>
				<p className="font-plus-jakarta-sans font-normal text-base text-white pb-4 mb-2">Please check your information for errors. If everything looks good, proceed to the next step. Otherwise, go back and edit further.</p>
				<h2 className="text-white font-plus-jakarta-sans font-bold text-base mb-9">Personal Basic Information</h2>
				<PreviewTable previewData={data} />
				<div className="flex justify-between items-center  gap-12 w-full md:flex-row flex-col">
					<Button size={'lg'} className="max-w-[275px] bg-transparent border-2 border-white h-[75px] " onClick={() => setCurrentStep(OnboardingSteps.BASIC_DETAIL)}>
						Edit
					</Button>
					<Button size={'lg'} className="max-w-[275px] h-[75px] " onClick={() => setCurrentStep(OnboardingSteps.PAY_REGISTRATION_FEE)}>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PreviewOnboarding;
