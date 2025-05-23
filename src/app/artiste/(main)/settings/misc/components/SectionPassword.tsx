'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';

import { useRequestResetPasswordOTP } from '../api';
import { SmallSpinner } from '@/components/icons';

export default function SectionPassword() {
	const { artist } = useAuthContext();

	const { mutate, isPending } = useRequestResetPasswordOTP();
	const handleRequestOTP = () => {
		if (!artist) return;
		mutate(
			{ email: artist.email },
			{
				onSuccess: () => {
					toast.success('OTP sent to your email');
				},
				onError: error => {
					toast.error(error.message || 'Something went wrong');
				}
			}
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold flex items-center gap-2">Password</h2>
			</div>

			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col items-center gap-4 py-4">
						<div className="text-center">
							<p className="text-muted-foreground mb-4">Change your password to keep your account secure</p>
							<Button onClick={handleRequestOTP} className="px-8">
								Request OTP to Change Password
								{isPending && <SmallSpinner />}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
