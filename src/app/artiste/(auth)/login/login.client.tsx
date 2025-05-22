'use client';
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { useFormik } from 'formik';
import { InferType } from 'yup';
import { redirect } from 'next/navigation';

import { userProfileStage } from '@/lib/constants';
import { loginSchema } from '@/lib/schemas';
import { useMutation } from '@tanstack/react-query';
import { loginArtistUser } from '@/app/artiste/(auth)/misc/api/mutations/auth.mutations';
import { getArtistProfile, useArtisteContext } from '@/contexts/AuthContextArtist';
import { Input } from '@/components/ui';

import AuthWrapper from '../misc/components/auth-wrapper';
import AuthActions from '../misc/components/auth-actions';

const LoginPageClient = () => {
	const router = useRouter();
	const { checkAuthStatus } = useArtisteContext();
	const { mutate, status } = useMutation({
		mutationFn: loginArtistUser,
		onSuccess: async ({ data, error }) => {
			await checkAuthStatus();
			if (error) {
				if (error.code === '500') return;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				toast.error((error.response?.data as any).message);
				return;
			}
			if (data.user.stage === userProfileStage.verifyEmail) {
				toast.success('Check your email to verify your acount');
				router.push('/artiste/verify');
				return;
			} else if (data.user.stage !== 'Complete') {
				toast.success('Welcome.');
				router.replace('/artiste/onboarding');
				return;
			} else {
				toast.success(`Welcome Back ${data.user.firstName}`);
				router.replace('/artiste/dashboard');
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
				redirect(user.stage === userProfileStage.onboarding ? '/artiste/onboarding' : '/artiste/dashboard');
			}
		};
		fetchUser();
	}, []);

	return (
		<>
			<AuthWrapper
				linkText={
					<p className="font-plus-jakarta-sans text-custom-registration_link  font-normal">
						Not a member?{' '}
						<Link href={'/artiste/register'} className="font-bold text-primary">
							Sign up
						</Link>{' '}
						now
					</p>
				}
				title="Sign in"
				description={
					<p className="text-sm text-center max-w-[320px] mx-auto">
						To upload music and videos, you must accept our <span className="text-primary">terms</span> and <span className="text-primary">conditions</span> on the registration website
					</p>
				}
			>
				<h1 className="font-black text-white text-center md:text-4xl text-2xl  mb-10"></h1>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 max-w-[450px] mx-auto">
					<Input type="email" placeholder="Email" inputSize={'authInput'} hasError={!!formik.errors.email} errormessage={formik.errors.email} {...formik.getFieldProps('email')} />
					<div>
						<Input type="password" placeholder="Password" inputSize={'authInput'} hasError={!!formik.errors.password} errormessage={formik.errors.password} {...formik.getFieldProps('password')} />
						<Link href={'/artiste/forgot-password'} className="text-primary text-14 font-plus-jakarta-sans font-medium">
							Forgot your password?
						</Link>
					</div>
					<AuthActions btnText="Sign In" isDisabled={!formik.isValid || status === 'pending'} isBusy={status == 'pending'} />
				</form>
			</AuthWrapper>
		</>
	);
};

export default LoginPageClient;
