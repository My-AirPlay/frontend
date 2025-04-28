import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetAllArtistsParams {
	page: string;
	limit: string;
	status?: string;
	stage?: string;
	hasManagement?: boolean;
	searchTerm?: string;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export const getAllArtists = async (apiParams: GetAllArtistsParams) => {
	const response = await APIAxios.get(`/admin/get_all_artists`, {
		params: apiParams
	});
	return response.data;
};

export const useGetAllArtists = (params: GetAllArtistsParams) => {
	return useQuery({
		queryKey: ['allArtists', params], // Unique key for caching
		queryFn: () => getAllArtists(params)
	});
};
