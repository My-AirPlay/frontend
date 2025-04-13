import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the parameter interface
interface GetMediaParams {
	mediaId: string;
}

export const getMedia = async ({ mediaId }: GetMediaParams) => {
	const response = await APIAxios.get(`/admin/get_media/${mediaId}`);
	return response.data;
};

export const useGetMedia = (params: GetMediaParams) => {
	return useQuery({
		queryKey: ['media', params.mediaId], // Unique key for caching
		queryFn: () => getMedia(params)
	});
};
