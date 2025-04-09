import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const getAllAlbums = async () => {
	const response = await APIAxios.get(`/admin/getall_albums`);
	return response.data;
};

export const useGetAllAlbums = () => {
	return useQuery({
		queryKey: ['allAlbums'], // Unique key for caching
		queryFn: getAllAlbums,
		staleTime: 1000 * 60 * 0.5
	});
};
