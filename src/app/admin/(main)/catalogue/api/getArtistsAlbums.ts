import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Optional: Define the expected album response type
interface Album {
	_id: string;
	title: string;
	artistId: string;
	// Add other album properties as needed
}

// Define the query parameters interface
interface GetArtistsAlbumsParams {
	page: number;
	limit: number;
	artistId: string;
}

export const getArtistsAlbums = async ({ page, limit, artistId }: GetArtistsAlbumsParams): Promise<Album[]> => {
	const response = await APIAxios.get(`/admin/get_artists_albums`, {
		params: {
			page,
			limit,
			artistId
		}
	});
	return response.data;
};

export const useGetArtistsAlbums = (params: GetArtistsAlbumsParams) => {
	return useQuery({
		queryKey: ['artistsAlbums', params.artistId, params.page, params.limit], // Unique key for caching
		queryFn: () => getArtistsAlbums(params)
	});
};
