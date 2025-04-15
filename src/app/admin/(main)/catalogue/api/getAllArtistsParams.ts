import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetAllArtistsParams {
	page: string;
	limit: string;
}

export const getAllArtists = async ({ page, limit }: GetAllArtistsParams) => {
	const response = await APIAxios.get(`/admin/get_all_artists`, {
		params: {
			page,
			limit
		}
	});
	return response.data;
};

export const useGetAllArtists = (params: GetAllArtistsParams) => {
	return useQuery({
		queryKey: ['allArtists', params.page, params.limit], // Unique key for caching
		queryFn: () => getAllArtists(params)
	});
};
