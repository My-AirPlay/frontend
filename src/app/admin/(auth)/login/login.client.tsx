'use client';
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { useFormik } from 'formik';
import { InferType } from 'yup';

import { loginSchema } from '@/lib/schemas';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@/contexts/AuthContext';
import { Input } from '@/components/ui';
import AuthWrapper from '@/app/artiste/(auth)/misc/components/auth-wrapper';
import AuthActions from '@/app/artiste/(auth)/misc/components/auth-actions';
import { loginAdminUser } from './api/mutations';
import { AxiosError } from 'axios';
import { getAdminProfile } from '@/actions/auth/auth.action';

// Canonical page ordering for "first allowed page" redirect
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

function getFirstAllowedPath(user: { isSuperAdmin: boolean; role?: { allowedPages: string[] } | null }): string {
	if (user.isSuperAdmin) return '/admin/dashboard';
	const allowed = user.role?.allowedPages || [];
	const first = CANONICAL_PAGES.find(p => allowed.includes(p.key));
	return first?.path || '/admin/dashboard';
}

const AdminLoginPageClient = () => {
	const router = useRouter();
	const { checkAuthStatus, logout } = useAuthContext();

	const { mutate, status } = useMutation({
		mutationFn: loginAdminUser,
		onSuccess: async result => {
			if (result.data) {
				const { mustChangePassword, user } = result.data;
				if (mustChangePassword) {
					await checkAuthStatus();
					router.replace('/admin/change-password');
				} else {
					await checkAuthStatus();
					toast.success('Welcome Back, Admin');
					router.replace(getFirstAllowedPath(user));
				}
			} else if (result.error) {
				const axiosError = result.error as AxiosError<{ message?: string }>;
				toast.error(axiosError.response?.data?.message || 'Login failed');
			}
		},
		onError: (error: AxiosError | Error) => {
			if (error instanceof AxiosError) {
				toast.error((error.response?.data as { message?: string })?.message || 'An unknown error occurred');
			} else {
				toast.error(error.message || 'An unknown error occurred');
			}
		}
	});

	const formik = useFormik<InferType<typeof loginSchema>>({
		initialValues: { email: '', password: '' },
		validationSchema: loginSchema,
		onSubmit(val) {
			mutate(val);
		}
	});

	React.useEffect(() => {
		const fetchUser = async () => {
			const user = await getAdminProfile();
			if (user) {
				router.replace(getFirstAllowedPath(user));
			} else {
				logout({ redirect: false });
			}
		};
		fetchUser();
	}, []);

	return (
		<AuthWrapper linkText={<p className="font-plus-jakarta-sans text-custom-registration_link font-normal">Access restricted to authorized personnel.</p>} title="Admin Sign In" description={<p className="text-sm text-center max-w-[320px] mx-auto">Enter your credentials to access the admin panel.</p>}>
			<h1 className="font-black text-white text-center md:text-4xl text-2xl mb-10"></h1>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-[450px] mx-auto">
				<Input type="email" placeholder="Email" inputSize={'authInput'} hasError={!!formik.errors.email} errormessage={formik.errors.email} {...formik.getFieldProps('email')} />
				<div>
					<Input type="password" placeholder="Password" inputSize={'authInput'} hasError={!!formik.errors.password} errormessage={formik.errors.password} {...formik.getFieldProps('password')} />
				</div>
				<AuthActions btnText="Sign In" isDisabled={!formik.isValid || status === 'pending'} isBusy={status === 'pending'} />
			</form>
		</AuthWrapper>
	);
};

export default AdminLoginPageClient;
