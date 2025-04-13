import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

// Define the payload interface based on cURL inputs
interface CreateArtistPayload {
	email: string;
	artistName: string;
	bankName: string;
	accountName: string;
	currency: string;
	accountNumber: string;
}

export const createArtist = async (payload: CreateArtistPayload) => {
	// Use FormData for multipart/form-data as per cURL
	const formData = new FormData();
	formData.append('email', payload.email);
	formData.append('artistName', payload.artistName);
	formData.append('bankName', payload.bankName);
	formData.append('accountName', payload.accountName);
	formData.append('currency', payload.currency);
	formData.append('accountNumber', payload.accountNumber);

	const response = await APIAxios.post(`/admin/create-artist`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useCreateArtist = () => {
	return useMutation({
		mutationFn: createArtist,
		onSuccess: data => {
			console.log('Artist created successfully:', data);
		},
		onError: error => {
			console.error('Error creating artist:', error);
		}
	});
};
