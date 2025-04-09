import { onboardingBankDetailSchema, onboardingBasciInfoSchema, onboardingSocialLinkSchema } from '@/lib/schemas';
import { InferType } from 'yup';
import APIAxios from '@/utils/axios';
import { getArtistAccessToken } from '@/actions/auth/auth.action';

export const postOnboardingPersonalDetail = async ({ userInfo, email }: { userInfo: InferType<typeof onboardingBasciInfoSchema>; email: string }) => {
	try {
		const accessToken = await getArtistAccessToken();
		if (!accessToken) return;
		const { data } = await APIAxios.post(
			'/artist/add-biodata',
			{
				userBioData: userInfo,
				email
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error
		};
	}
};

export const postOnbaordingBankDetail = async ({ bankDetail, email }: { email: string; bankDetail: InferType<typeof onboardingBankDetailSchema> }) => {
	try {
		const accessToken = await getArtistAccessToken();
		if (!accessToken) return;
		const { data } = await APIAxios.post(
			'/artist/add-bankdata',
			{
				userBankData: bankDetail,
				email
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error
		};
	}
};

export const postSocialLinks = async ({ email, socialLinks }: { email: string; socialLinks: InferType<typeof onboardingSocialLinkSchema> }) => {
	try {
		const accessToken = await getArtistAccessToken();
		if (!accessToken) return;
		const { data } = await APIAxios.post(
			'/artist/add-social-links',
			{
				userBio: socialLinks,
				email
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error
		};
	}
};
