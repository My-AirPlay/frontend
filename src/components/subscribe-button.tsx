'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useInitiatePayment } from '@/app/artiste/(auth)/misc/api/mutations/onboarding.mutation';
import { formatFee } from '@/lib/release-allowance';

/**
 * Opens the Paystack checkout for the yearly subscription in a new tab. Paystack
 * tells the server when the payment lands; "I've paid" re-fetches the artist so
 * the page picks it up without a reload.
 */
export default function SubscribeButton() {
	const { artist, checkAuthStatus } = useAuthContext();
	const { mutate: initiatePayment, isPending } = useInitiatePayment();
	const [opened, setOpened] = useState(false);
	const [checking, setChecking] = useState(false);

	const subscribe = () => {
		if (!artist?.email) return;
		// Open synchronously, or the browser treats it as a pop-up and blocks it.
		const tab = window.open('', '_blank');
		initiatePayment(
			{ email: artist.email },
			{
				onSuccess: result => {
					const url = result?.data?.authorization_url;
					if (!url) {
						tab?.close();
						toast.error('Could not start the payment. Please try again.');
						return;
					}
					if (tab) tab.location.href = url;
					else window.location.href = url;
					setOpened(true);
				},
				onError: () => {
					tab?.close();
					toast.error('Could not start the payment. Please try again.');
				}
			}
		);
	};

	const confirm = async () => {
		setChecking(true);
		await checkAuthStatus();
		setChecking(false);
	};

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Button size="sm" onClick={subscribe} disabled={isPending}>
				{isPending ? 'Opening checkout...' : `Subscribe: ${formatFee()} / year`}
			</Button>
			{opened && (
				<Button size="sm" variant="outline" onClick={confirm} disabled={checking}>
					{checking ? 'Checking...' : "I've paid"}
				</Button>
			)}
		</div>
	);
}
