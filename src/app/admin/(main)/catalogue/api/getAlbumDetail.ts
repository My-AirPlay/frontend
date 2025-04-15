import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetAlbumDetailParams {
	albumId: string;
}

export const getAlbumDetail = async ({ albumId }: GetAlbumDetailParams) => {
	const response = await APIAxios.get(`/admin/get_album_detail`, {
		params: {
			albumId
		}
	});
	return response.data;
};

export const useGetAlbumDetail = (params: GetAlbumDetailParams) => {
	return useQuery({
		queryKey: ['albumDetail', params.albumId], // Unique key for caching
		queryFn: () => getAlbumDetail(params)
	});
};
