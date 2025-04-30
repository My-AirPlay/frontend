import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

import { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig

// Define the parameter interface
interface GetMediaParams {
	mediaId: string;
	// Add optional config to pass through to Axios
	config?: AxiosRequestConfig;
}

export const getMedia = async ({ mediaId, config }: GetMediaParams) => {
	// Pass the config object to the Axios get call
	const response = await APIAxios.get(`/admin/get_media/${mediaId}`, config);
	return response.data;
};

export const useGetMedia = (params: GetMediaParams) => {
	return useQuery({
		queryKey: ['media', params.mediaId], // Unique key for caching
		queryFn: () => getMedia(params)
	});
};
