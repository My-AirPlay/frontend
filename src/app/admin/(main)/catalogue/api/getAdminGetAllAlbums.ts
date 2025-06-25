import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
	page?: number | string;
	limit?: number | string;
	sortBy?: string; // Added sortBy
	sortOrder?: 'asc' | 'desc'; // Added sortOrder
};
export const getAllAlbums = async (options: FetchOptions) => {
	const params = new URLSearchParams({
		limit: String(options?.limit || 10),
		page: String(options?.page || 1),
		sortOrder: String(options?.sortOrder || 'asc')
	});
	if (options.sortBy) {
		params.append('sortBy', options.sortBy);
	}
	const response = await APIAxios.get(`/admin/getall_albums?${params.toString()}`);
	return response.data;
};

export const useGetAllAlbums = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['allAlbums', options], // Unique key for caching
		queryFn: () => getAllAlbums(options)
	});
};
export const getAllContractIds = async () => {
	const response = await APIAxios.get(`/admin/getall_contractIds`);
	return response.data;
};

export const useGetAllContractIds = () => {
	return useQuery({
		queryKey: ['getAllContractIds'],
		queryFn: () => getAllContractIds()
	});
};
