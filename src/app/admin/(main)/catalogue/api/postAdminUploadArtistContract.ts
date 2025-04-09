import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

// Define the payload interface
interface UploadArtistContractPayload {
	contract: File; // The contract file
	email: string;
	startDate: string; // Assuming ISO string like "2025-04-08"
	endDate: string; // Assuming ISO string like "2025-04-08"
	status: string; // e.g., "active", "pending", etc.
}

export const uploadArtistContract = async (payload: UploadArtistContractPayload) => {
	// Create FormData to handle file upload and other fields
	const formData = new FormData();
	formData.append('contract', payload.contract);
	formData.append('email', payload.email);
	formData.append('startDate', payload.startDate);
	formData.append('endDate', payload.endDate);
	formData.append('status', payload.status);

	const response = await APIAxios.post(`/admin/upload-artist-contract`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useUploadArtistContract = () => {
	return useMutation({
		mutationFn: uploadArtistContract,
		onSuccess: data => {
			console.log('Artist contract uploaded successfully:', data);
		},
		onError: error => {
			console.error('Error uploading artist contract:', error);
		}
	});
};
