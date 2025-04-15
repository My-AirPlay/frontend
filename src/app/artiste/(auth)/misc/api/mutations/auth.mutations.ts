import { InferType } from 'yup';
import { loginSchema, registerSchema } from '../../../../../../lib/schemas';
import { AxiosError } from 'axios';
import { userProfileStage } from '../../../../../../lib/constants';
import APIAxios, { setAxiosDefaultToken } from '@/utils/axios';
import { setArtistAccessToken } from '@/actions/auth/auth.action';

export interface IRegisterationArtistDetails {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reports: any[];
	_id: string;
	email: string;
	password: string;
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
}

interface BankDetails {
	bankName: string;
	accountName: string;
	accountNumber: number;
	ibanSwiftCode: string | null;
	currency: string | null;
	sortCode: string | null;
	paymentOption: string | null;
}

interface VerificationDetails {
	verificationCode: string;
	reason: string;
	createdAt: string;
}

export const registerUser = async (userInfo: InferType<typeof registerSchema>) => {
	try {
		const { data } = await APIAxios.post('/artist/signup', {
			password: userInfo.password,
			email: userInfo.email
		});

		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error as AxiosError
		};
	}
};
interface IArtistLoginAPIResponse {
	accessToken: string;
	refreshToken: string;
	user: IRegisterationArtistDetails;
}

export const loginArtistUser = async (userInfo: InferType<typeof loginSchema>) => {
	try {
		const { data } = await APIAxios.post<IArtistLoginAPIResponse>('/artist/signin', userInfo);
		setAxiosDefaultToken(data.accessToken);
		if (data.user.stage !== userProfileStage.verifyEmail) {
			await setArtistAccessToken({
				access: data.accessToken,
				refresh: data.refreshToken
			});
		}

		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error as AxiosError
		};
	}
};

export const verifyUser = async ({ email, verificationCode }: { email: string; verificationCode: string }) => {
	try {
		const { data } = await APIAxios.post('/artist/verify-email', {
			email,
			verificationCode
		});
		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error as AxiosError
		};
	}
};

export const forgotPassword = async ({ email }: { email: string }) => {
	try {
		const { data } = await APIAxios.post('/artist/request-password-reset', {
			email
		});
		return {
			data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error as AxiosError
		};
	}
};
export const resetPassword = async ({ token, newPassword }: { token: string; newPassword: string }) => {
	try {
		const { data } = await APIAxios.post(
			'/artist/password-reset',
			{
				newPassword
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
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
			error: error as AxiosError
		};
	}
};
