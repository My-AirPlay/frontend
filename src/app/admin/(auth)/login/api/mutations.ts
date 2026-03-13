import { InferType } from 'yup';
import { loginSchema } from '@/lib/schemas';
import { AxiosError } from 'axios';
import APIAxios, { setAxiosDefaultToken } from '@/utils/axios';
import { setAdminAccessToken } from '@/actions/auth/auth.action';
import { IAdminUser } from '@/contexts/AuthContext';

interface IAdminLoginResponse {
	accessToken: string;
	refreshToken: string;
	mustChangePassword: boolean;
	user: IAdminUser;
}

export const loginAdminUser = async (userInfo: InferType<typeof loginSchema>) => {
	try {
		const { data } = await APIAxios.post<IAdminLoginResponse>('/admin/signin', userInfo);
		setAxiosDefaultToken(data.accessToken);
		await setAdminAccessToken({
			access: data.accessToken,
			refresh: data.refreshToken
		});
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as AxiosError };
	}
};
