import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetOneArtistAudiosVideosParams {
	page: number;
	limit: number;
	artistId: string;
}

export const getOneArtistAudiosVideos = async ({ page, limit, artistId }: GetOneArtistAudiosVideosParams) => {
	const response = await APIAxios.get(`/admin/getall_audios_videos`, {
		params: {
			page,
			limit,
			artistId
		}
	});
	return response.data;
};

export const useGetOneArtistMedia = (params: GetOneArtistAudiosVideosParams) => {
	return useQuery({
		queryKey: ['artistAudiosVideos', params.artistId, params.page, params.limit], // Unique key for caching
		queryFn: () => getOneArtistAudiosVideos(params)
	});
};
