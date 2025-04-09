import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const analyzeCsv = async (file: File) => {
	// Create FormData to handle file upload
	const payload = new FormData();
	payload.append('file', file);

	const response = await APIAxios.post(`/admin/analyze_csv`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useAdminAnalyzeCsv = () => {
	return useMutation({
		mutationFn: analyzeCsv,
		onSuccess: data => {
			console.log('CSV analyzed successfully:', data);
		},
		onError: error => {
			console.error('Error analyzing CSV:', error);
		}
	});
};
