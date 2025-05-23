import { onboardingBasciInfoSchema, onboardingSocialLinkSchema } from '@/lib/schemas';
import { InferType } from 'yup';
import APIAxios from '@/utils/axios';
import { getArtistAccessToken } from '@/actions/auth/auth.action';
import { BankDetailFormValues } from '../../../onboarding/_components/bank-details/bank-details';
import { useMutation } from '@tanstack/react-query';

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

export const postOnbaordingBankDetail = async ({ bankDetail, email }: { email: string; bankDetail: BankDetailFormValues }) => {
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
interface PaymentAPIResponse {
	message: string;
	data: Data;
	updatedArtist: UpdatedArtist;
}

interface UpdatedArtist {
	_id: string;
	email: string;
	totalRoyaltyUSD: number;
	totalStreams: number;
	paidRoyalty: number;
	stage: string;
	hasManagement: boolean;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	verificationDetails: VerificationDetails;
	artistName: string;
	city: string;
	country: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	bankDetails: BankDetails;
	socialLinks: SocialLinks;
}

interface SocialLinks {
	instagram: string;
	facebook: string;
	tiktok: string;
	twitter: string;
	website: string;
	linkedIn: null;
	youtube: null;
	soundCloud: null;
}

interface BankDetails {
	bankName: string;
	accountName: string;
	accountNumber: string;
	ibanSwiftCode: string;
	currency: string;
	sortCode: string;
	paymentOption: string;
	bvn: string;
	bankCode: string;
	isAccountVerified: boolean;
	registrationFeeReference: string;
}

interface VerificationDetails {
	verificationCode: string;
	reason: string;
	createdAt: string;
}

interface Data {
	authorization_url: string;
	access_code: string;
	reference: string;
}
export const postInititatePayment = async ({ email }: { email: string }) => {
	const accessToken = await getArtistAccessToken();
	if (!accessToken) return;
	const { data } = await APIAxios.post(`artist/initiate_transfer/${email}`);

	return data as PaymentAPIResponse;
};

export const useInitiatePayment = () => {
	return useMutation({
		mutationFn: postInititatePayment,
		onSuccess(result) {
			if (!result) {
				return;
			}
		},
		onError(error) {
			console.log(error);
		}
	});
};
