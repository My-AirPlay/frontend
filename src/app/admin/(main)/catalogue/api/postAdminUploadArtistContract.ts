import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Define the payload interface
interface UploadArtistContractPayload {
	contract: File | null; // The contract file
	email: string;
	startDate: string; // Assuming ISO string like "2025-04-08"
	endDate: string; // Assuming ISO string like "2025-04-08"
	status: string; // e.g., "active", "pending", etc.
}

export const uploadArtistContract = async (payload: UploadArtistContractPayload) => {
	// Create FormData to handle file upload and other fields
	const formData = new FormData();
	if (payload.contract) {
		formData.append('contract', payload.contract);
	} else {
		return toast.error('Contract file is required.');
	}
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

export const updateArtistContract = async (payload: UploadArtistContractPayload) => {
	// Create FormData to handle file upload and other fields
	const formData = new FormData();
	if (payload.contract) {
		formData.append('contract', payload.contract);
	} else {
		return toast.error('Contract file is required.');
	}
	formData.append('email', payload.email);
	formData.append('startDate', payload.startDate);
	formData.append('endDate', payload.endDate);
	formData.append('status', payload.status);

	const response = await APIAxios.put(
		`/admin/update-artist-contract
`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
	);

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
export const useUpdateArtistContract = () => {
	return useMutation({
		mutationFn: updateArtistContract,
		onSuccess: data => {
			console.log('Artist contract updated successfully:', data);
		},
		onError: error => {
			console.error('Error updating artist contract:', error);
		}
	});
};
