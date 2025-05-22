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
// import { loginAdminUser } from '@/app/admin/(auth)/misc/api/mutations/auth.mutations'; // This will need to be created
import { getAdminProfile, useAdminContext } from '@/contexts/AuthContextAdmin';
import { Input } from '@/components/ui';

// Assuming AuthWrapper and AuthActions can be reused or adapted.
// If not, admin-specific versions or adjustments would be needed.
import AuthWrapper from '@/app/artiste/(auth)/misc/components/auth-wrapper';
import AuthActions from '@/app/artiste/(auth)/misc/components/auth-actions';
import APIAxios from '@/utils/axios'; // For a direct API call for login
import { setAdminAccessToken } from '@/actions/auth/auth.action'; // To set tokens
import { AxiosError } from 'axios';

const AdminLoginPageClient = () => {
	const router = useRouter();
	const { checkAuthStatus } = useAdminContext();
	const { mutate, status } = useMutation({
		mutationFn: async (credentials: InferType<typeof loginSchema>) => {
			const response = await APIAxios.post('/admin/auth/login', credentials); // Example admin login endpoint
			return response.data; // Adjust based on your API response structure
		},
		onSuccess: async data => {
			// Simplified success logic for admin
			// Assuming data contains { access: string, refresh: string, user: object }
			if (data && data.access && data.refresh) {
				await setAdminAccessToken({ access: data.access, refresh: data.refresh });
				await checkAuthStatus(); // Re-check auth status to update context
				toast.success(`Welcome Back, ${data.user?.firstName || 'Admin'}!`);
				router.replace('/admin/dashboard'); // Redirect to admin dashboard
			} else {
				// Handle cases where tokens are not returned
				toast.error(data?.message || 'Login failed: Invalid response from server.');
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
			const user = await getAdminProfile();
			if (user) {
				// If admin is already logged in, redirect to dashboard
				redirect('/admin/dashboard');
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
