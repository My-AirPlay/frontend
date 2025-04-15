import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetOneArtistParams {
	artistId: string;
}

export const getOneArtist = async ({ artistId }: GetOneArtistParams) => {
	const response = await APIAxios.get(`/admin/get_one_artist`, {
		params: {
			artistId
		}
	});
	return response.data;
};

export const useGetOneArtist = (params: GetOneArtistParams) => {
	return useQuery({
		queryKey: ['oneArtist', params.artistId], // Unique key for caching
		queryFn: () => getOneArtist(params)
	});
};
