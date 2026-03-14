'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuthContext } from '@/contexts/AuthContext';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui/button';
import AuthWrapper from '@/app/artiste/(auth)/misc/components/auth-wrapper';
import APIAxios from '@/utils/axios';

const CANONICAL_PAGES = [
	{ key: 'dashboard', path: '/admin/dashboard' },
	{ key: 'contracts', path: '/admin/contracts' },
	{ key: 'tracks', path: '/admin/tracks' },
	{ key: 'catalogue', path: '/admin/catalogue' },
	{ key: 'sales', path: '/admin/sales' },
	{ key: 'sales_history', path: '/admin/sales-history' },
	{ key: 'artist_revenue', path: '/admin/artist-revenue' },
	{ key: 'support', path: '/admin/support' },
	{ key: 'json', path: '/admin/json' },
	{ key: 'password_management', path: '/admin/password' }
];

const ChangePasswordClient = () => {
	const router = useRouter();
	const { checkAuthStatus } = useAuthContext();
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { mutate, isPending } = useMutation({
		mutationFn: async (password: string) => {
			const { data } = await APIAxios.put('/admin/change-password', {
				newPassword: password
			});
			return data;
		},
		onSuccess: async () => {
			toast.success('Password changed successfully');
			// Fetch fresh profile to get updated user data for redirect
			const { getAdminProfile } = await import('@/actions/auth/auth.action');
			const user = await getAdminProfile();
			await checkAuthStatus();

			// Redirect to first allowed page using fresh data
			if (user?.isSuperAdmin) {
				router.replace('/admin/dashboard');
			} else {
				const allowed = user?.role?.allowedPages || [];
				const first = CANONICAL_PAGES.find((p: any) => allowed.includes(p.key));
				router.replace(first?.path || '/admin/dashboard');
			}
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			toast.error(error.response?.data?.message || 'Failed to change password');
		}
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword.length < 8) {
			toast.error('Password must be at least 8 characters');
			return;
		}
		if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(newPassword)) {
			toast.error('Password must contain at least one letter and one number');
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}
		mutate(newPassword);
	};

	return (
		<AuthWrapper linkText={null} title="Change Your Password" description={<p className="text-sm text-center max-w-[320px] mx-auto">You must set a new password before continuing.</p>}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[450px] mx-auto">
				<Input type="password" placeholder="New Password" inputSize={'authInput'} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
				<Input type="password" placeholder="Confirm New Password" inputSize={'authInput'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
				<Button type="submit" disabled={isPending || !newPassword || !confirmPassword} size="lg" className="w-full">
					{isPending ? 'Changing...' : 'Set New Password'}
				</Button>
			</form>
		</AuthWrapper>
	);
};

export default ChangePasswordClient;
