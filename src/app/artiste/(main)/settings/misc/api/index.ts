import APIAxios from '@/utils/axios';
import { BankFormValues, ProfileFormValues } from '../schemas';
import { useMutation } from '@tanstack/react-query';

const updateProfile = async (profile: ProfileFormValues) => {
	const bioResponse = await APIAxios.post('/artist/update-bio', {
		...profile
	});

	return bioResponse.data;
};

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: updateProfile
	});
};

export const forgotPasswordRequestOTP = async ({ email }: { email: string }) => {
	const { data } = await APIAxios.post('/artist/request-password-reset', {
		email
	});
	return data;
};

export const useRequestResetPasswordOTP = () => {
	return useMutation({
		mutationFn: forgotPasswordRequestOTP
	});
};

const updateBankData = async (profile: BankFormValues & { email: string }) => {
	const bankResponse = await APIAxios.post('/artist/update-bank-info', {
		...profile
	});

	return bankResponse.data;
};

export const useUpdateBankData = () => {
	return useMutation({
		mutationFn: updateBankData
	});
};
