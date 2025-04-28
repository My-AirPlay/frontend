// src/api/downloadMedia.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define the request body interface
interface DownloadMediaParams {
	urls: string[];
}

export const downloadMedia = async ({ urls }: DownloadMediaParams) => {
	const response = await APIAxios.post(`/admin/download_media/`, urls);
	return response.data;
};

export const useDownloadMedia = (): UseMutationResult<unknown, Error, DownloadMediaParams> => {
	return useMutation({
		mutationFn: downloadMedia
	});
};
