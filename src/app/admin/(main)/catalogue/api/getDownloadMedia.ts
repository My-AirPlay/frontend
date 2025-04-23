// src/api/downloadMedia.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define the request body interface (array of URLs)
type DownloadMediaBody = string[];

// Define the response type as a Blob for media downloads
type DownloadMediaResponse = Blob;

export const downloadMedia = async (fileUrls: DownloadMediaBody): Promise<DownloadMediaResponse> => {
	const response = await APIAxios.post(`/admin/download_media`, fileUrls, {
		responseType: 'blob' // Handle binary data (e.g., MP4 file or archive)
	});
	return response.data;
};

export const useDownloadMedia = (): UseMutationResult<DownloadMediaResponse, Error, DownloadMediaBody> => {
	return useMutation({
		mutationFn: downloadMedia
	});
};
