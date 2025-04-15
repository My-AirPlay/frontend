import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
	page?: number | string;
	limit?: number | string;
};
export const getAllAlbums = async (options: FetchOptions) => {
	const response = await APIAxios.get(`/admin/getall_albums?limit=${options?.limit || 10}&page=${options?.page || 1}`);
	return response.data;
};

export const useGetAllAlbums = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['allAlbums', options], // Unique key for caching
		queryFn: () => getAllAlbums(options)
	});
};
