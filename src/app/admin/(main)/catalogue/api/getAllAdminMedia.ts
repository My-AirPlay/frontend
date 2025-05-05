import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
	page?: number | string;
	limit?: number | string;
	type?: string;
	sortBy?: string; // Added sortBy
	sortOrder?: 'asc' | 'desc'; // Added sortOrder
};

const getAdminMedia = async (options: FetchOptions) => {
	const params = new URLSearchParams({
		type: options?.type || 'all',
		limit: String(options?.limit || 10),
		page: String(options?.page || 1),
		// sortBy: String(options?.sortBy || "asc"),
		sortOrder: String(options?.sortOrder || 'asc')
	});
	if (options.sortBy) {
		params.append('sortBy', options.sortBy);
	}
	const response = await APIAxios.get(`/admin/getall_audios_videos?${params.toString()}`);
	return response.data;
};

export const useGetAdminMedia = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['getAdminMedia', options],
		queryFn: () => getAdminMedia(options)
	});
};
