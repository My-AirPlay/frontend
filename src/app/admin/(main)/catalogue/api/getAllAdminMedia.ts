import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
	page?: number;
	limit?: number;
	type?: string;
};

const getAdminMedia = async (options: FetchOptions) => {
	const response = await APIAxios.get(`/admin/getall_audios_videos?type=${options?.type || 'all'}&limit=${options?.limit || 10}&page=${options?.page || 1}`, {
		params: options
	});
	return response.data;
};

export const useGetAdminMedia = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['getAdminMedia', options],
		queryFn: () => getAdminMedia(options),
		staleTime: 1000 * 60 * 0.5
	});
};
