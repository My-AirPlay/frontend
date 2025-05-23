'use client';

import { useInitiatePayment } from '../../../misc/api/mutations/onboarding.mutation';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { useState } from 'react';

const RegistrationPaymentPage = ({ email }: { email: string }) => {
	const { artist, isLoading } = useAuthContext();
	const { mutate: initiatePayment, isPending } = useInitiatePayment();
	const router = useRouter();
	const [buttonText, setButtonText] = useState('Make Payment');

	const handleSkip = () => {
		redirect('/artiste/dashboard');
	};
	const handleGeneratePaymentLink = () => {
		if (buttonText === 'Continue') {
			if (!artist?.bankDetails.registrationFeeReference) {
				toast.error('Failed to verify payment. Please try again.', {
					duration: 10000
				});
				setButtonText('Make Payment');
				return;
			}
			redirect('/artiste/dashboard');
		}
		const newTab = window.open('', '_blank');
		initiatePayment(
			{ email },
			{
				onSuccess: result => {
					if (!result) {
						toast.error('Something went wrong. Try again', {
							duration: 10000
						});
						return;
					}
					setButtonText('Continue');
					newTab.location.href = result.data.authorization_url;
				},
				onError: () => {
					toast.error('Failed to generate payment link. Please try again.', {
						duration: 10000
					});
				}
			}
		);
	};

	return (
		<div className="flex flex-col items-center justify-center h-full min-h-[80vh] p-4">
			{isPending ? (
				<div className="flex flex-col items-center justify-center text-sm">
					<Spinner />
					<p className="mt-2">Generating payment link...</p>
				</div>
			) : (
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Complete Your Registration</CardTitle>
						<CardDescription>You&apos;re almost there! Complete your subscription to start distributing your music.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="bg-muted p-4 rounded-lg">
							<div className="flex justify-between items-center mb-2">
								<span className="font-medium">Annual Subscription Fee:</span>
								<span className="text-xl font-bold">₦40,000</span>
							</div>
							<p className="text-sm text-muted-foreground">This is a yearly subscription that covers all distribution services.</p>
						</div>

						<div className="space-y-2">
							<h3 className="font-medium">What&apos;s included in your subscription:</h3>
							<ul className="list-disc pl-5 space-y-1 text-sm">
								<li>Unlimited music distribution to major streaming platforms</li>
								<li>Real-time analytics and royalty tracking</li>
								<li>Customized shareable smart links</li>
								<li>Daily statistics and performance metrics</li>
								<li>Video uploads to showcase your music</li>
							</ul>
						</div>
						<div className="text-sm text-muted-foreground">
							<p>Your email: {email}</p>
							<p className="mt-2">
								By proceeding, you agree to our{' '}
								<a href="/policies/terms" className="underline hover:text-foreground">
									Terms and Conditions
								</a>{' '}
								and{' '}
								<a href="/policies/privacy" className="underline hover:text-foreground">
									Privacy Policy
								</a>
								.
							</p>
						</div>
					</CardContent>
					<CardFooter className="gap-8">
						<Button onClick={handleGeneratePaymentLink} className="w-full">
							{buttonText}
						</Button>
						<Button variant="secondary" onClick={handleSkip} className="w-full">
							Skip
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
};

export default RegistrationPaymentPage;
