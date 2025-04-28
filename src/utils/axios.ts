import Axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const APIAxios = Axios.create({
	baseURL: API_BASE_URL
});

export const setAxiosDefaultToken = (token: string) => {
	APIAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
	delete APIAxios.defaults.headers.common.Authorization;
};

export const handleInactiveAccountRedirect = () => {
	if (typeof window !== 'undefined') {
		window.location.href = '/artiste/login';
	}
};

APIAxios.interceptors.response.use(
	response => response,
	error => {
		console.log(error, 'ERROR');
		if (error?.status == 500) {
			toast.error('We are having a problem on our end -- SERVER ERROR PLACEHOLDER', { duration: 10000, id: '900' });
			return Promise.reject(error);
		}
		if (error?.message === 'Network Error' || error?.code == 'ERR_NETWORK') {
			toast.error('Check your internet connection -- NETWORK ERROR PLACEHOLDER', { duration: 10000, id: '90009' });
			return Promise.reject(error);
		}
		if ((error && error.status === 401) || error?.code == 'token_not_valid') {
			toast.error('Session Expired, Login in again to continue', {
				duration: 10000
			});
			deleteAxiosDefaultToken();
			if (typeof window !== undefined) {
				console.log('window location');
				window.location.href = '/';
			}
			return Promise.reject(error);
		} else {
			return Promise.reject(error);
		}
	}
);

export default APIAxios;
