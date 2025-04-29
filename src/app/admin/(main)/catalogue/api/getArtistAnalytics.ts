// src/api/getArtistAnalytics.ts
import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetArtistAnalyticsParams {
	artistId: string;
}

export const getArtistAnalytics = async ({ artistId }: GetArtistAnalyticsParams) => {
	const response = await APIAxios.get(`/admin/get_full_analysis`, {
		params: {
			artistId
		}
	});
	return response.data;
};

export const useGetArtistAnalytics = (params: GetArtistAnalyticsParams) => {
	return useQuery({
		queryKey: ['artistAnalytics', params.artistId], // Unique key for caching
		queryFn: () => getArtistAnalytics(params)
	});
};
