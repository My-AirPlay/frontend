'use client';
import { onboardingSocialLinkSchema } from '@/lib/schemas';
import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { FormField } from '../form-step/form-step.interface';
import FormStep from '../form-step/form-step';
import { Button } from '@/components/ui/button';
import { OnboardingSteps } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import { postSocialLinks } from '@/app/artiste/(auth)/misc/api/mutations/onboarding.mutation';
import { toast } from 'sonner';
import { handleClientError } from '@/lib/utils';
import { useRouter } from 'nextjs-toploader/app';
interface OnboardingSocialMedialProps {
	setCurrentStep: (a: OnboardingSteps) => void;
	email: string;
}
const OnboardingSocialMedia = ({ email }: OnboardingSocialMedialProps) => {
	const { replace } = useRouter();
	const { mutateAsync, status } = useMutation({
		mutationFn: postSocialLinks,
		onSuccess(result) {
			if (!result) {
				toast.error('Something went wrong. Try again');
				return;
			}
			if (result.error) {
				handleClientError(result.error);
				return;
			}
			replace('/artiste/dashboard');
		}
	});
	const formik = useFormik({
		validateOnChange: true,
		validationSchema: onboardingSocialLinkSchema,
		initialValues: {
			instagram: '',
			twitter: '',
			facebook: '',
			soundcloud: '',
			tiktok: '',
			website: ''
		},
		onSubmit: value => {
			mutateAsync({
				email,
				socialLinks: value
			});
		}
	});
	const fields = useMemo<FormField[]>(() => {
		return [
			{
				id: 'instagram',
				label: 'Instagram',
				props: {
					placeholder: 'Social Link'
				}
			},

			{
				id: 'twitter',
				label: 'X (Formally Twitter)',
				props: {
					placeholder: 'Social Link'
				}
			},
			{
				id: 'facebook',
				label: 'Facebook',
				props: {
					placeholder: 'Social Link'
				}
			},
			{
				id: 'tiktok',
				label: 'TikTok',
				props: {
					placeholder: 'Social Link'
				}
			},
			{
				id: 'website',
				label: 'Website',
				props: {
					placeholder: 'Social Link'
				}
			}
		];
	}, []);
	return (
		<div>
			<FormStep formFields={fields} formik={formik} title="SOCIAL MEDIA LINKS" description="Please use your real name and data. It will be used for security purposes to make sure you and only you have access to your account including withdrawals (if applicable).">
				<div className="flex justify-between md:items-center gap-12 w-full md:flex-row flex-col">
					<Button size={'lg'} type="submit" className="max-w-[275px] h-[75px] " disabled={!formik.isValid || status === 'pending'}>
						Submit
					</Button>
				</div>
			</FormStep>
		</div>
	);
};

export default OnboardingSocialMedia;
