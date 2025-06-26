'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { useFormik } from 'formik';
import { InferType } from 'yup';
import { redirect } from 'next/navigation';

import { loginSchema } from '@/lib/schemas'; // Assuming admin login uses the same schema
import { useMutation } from '@tanstack/react-query';
import { useAuthContext, getArtistProfile } from '@/contexts/AuthContext'; // Assuming useArtisteContext is a typo and it's useAuthContext
import { Input } from '@/components/ui';

// Assuming AuthWrapper and AuthActions can be reused or adapted.
// If not, admin-specific versions or adjustments would be needed.
import AuthWrapper from '@/app/artiste/(auth)/misc/components/auth-wrapper';
import AuthActions from '@/app/artiste/(auth)/misc/components/auth-actions';
import { setArtistAccessToken } from '@/actions/auth/auth.action'; // To set tokens
import { AxiosError } from 'axios';
import { loginArtistUser } from '@/app/artiste/(auth)/misc/api/mutations/auth.mutations';

const AdminLoginPageClient = () => {
	const router = useRouter();
	const { checkAuthStatus, logout } = useAuthContext(); // Changed from useArtisteContext
	const { mutate, status } = useMutation({
		mutationFn: loginArtistUser,
		onSuccess: async data => {
			// Simplified success logic for admin
			// Assuming data contains { access: string, refresh: string, user: object }
			if (data.data && data.data.accessToken) {
				await setArtistAccessToken({ access: data.data.accessToken, refresh: data.data.accessToken });
				await checkAuthStatus();
				toast.success('Welcome Back, Admin');
				router.replace('/admin/dashboard'); // Redirect to admin dashboard
			} else {
				// Handle cases where tokens are not returned
				toast.error('Login failed: Invalid response from server.');
			}
		},
		onError: (error: AxiosError | Error) => {
			// Improved error typing
			if (error instanceof AxiosError) {
				toast.error((error.response?.data as { message?: string })?.message || error.message || 'An unknown error occurred');
			} else {
				toast.error(error.message || 'An unknown error occurred');
			}
		}
	});

	const formik = useFormik<InferType<typeof loginSchema>>({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: loginSchema,
		onSubmit(val) {
			mutate(val);
		}
	});

	React.useEffect(() => {
		const fetchUser = async () => {
			const user = await getArtistProfile();
			if (user) {
				// If admin is already logged in, redirect to dashboard
				redirect('/admin/dashboard');
			} else {
				logout();
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<AuthWrapper
				// linkText for admin could be different or removed
				// For example, no public sign-up for admins
				linkText={<p className="font-plus-jakarta-sans text-custom-registration_link font-normal">Access restricted to authorized personnel.</p>}
				title="Admin Sign In"
				description={<p className="text-sm text-center max-w-[320px] mx-auto">Enter your credentials to access the admin panel.</p>}
			>
				<h1 className="font-black text-white text-center md:text-4xl text-2xl mb-10"></h1>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-[450px] mx-auto">
					<Input type="email" placeholder="Email" inputSize={'authInput'} hasError={!!formik.errors.email} errormessage={formik.errors.email} {...formik.getFieldProps('email')} />
					<div>
						<Input type="password" placeholder="Password" inputSize={'authInput'} hasError={!!formik.errors.password} errormessage={formik.errors.password} {...formik.getFieldProps('password')} />
						{/* Admin forgot password link - adjust if needed */}
						<Link href={'/admin/forgot-password'} className="text-primary text-14 font-plus-jakarta-sans font-medium">
							Forgot your password?
						</Link>
					</div>
					<AuthActions btnText="Sign In" isDisabled={!formik.isValid || status === 'pending'} isBusy={status == 'pending'} />
				</form>
			</AuthWrapper>
		</>
	);
};

export default AdminLoginPageClient;
