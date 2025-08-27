import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

// Define the payload interface based on cURL inputs
interface CreateArtistPayload {
	email: string;
	artistName: string;
	fullName: string;
	currency: string;
	rate: string;
	dealType?: string;
	contractDetails: {
		startDate: Date;
		endDate: Date;
	};
	contractFile?: File | undefined;
}

export const createArtist = async (payload: CreateArtistPayload) => {
	// Use FormData for multipart/form-data as per cURL
	const formData = new FormData();
	formData.append('artistName', payload.artistName);
	formData.append('fullName', payload.fullName);
	formData.append('email', payload.email);
	formData.append('currency', payload.currency);
	formData.append('rate', payload.rate);
	if (payload.dealType) formData.append('dealType', payload.dealType);
	formData.append('contractDetails[startDate]', payload.contractDetails.startDate.toISOString());
	formData.append('contractDetails[endDate]', payload.contractDetails.endDate.toISOString());
	if (payload.contractFile) formData.append('contractFile', payload.contractFile);

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
			console.log('Error creating artist:', error);
		}
	});
};
