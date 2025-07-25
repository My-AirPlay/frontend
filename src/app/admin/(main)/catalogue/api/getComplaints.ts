import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetComplaintsParams {
	page: string;
	limit: string;
}

export const getComplaints = async ({ page, limit }: GetComplaintsParams) => {
	const response = await APIAxios.get(`/admin/complaints`, {
		params: {
			page,
			limit
		}
	});
	return response.data;
};

export const useGetComplaints = (params: GetComplaintsParams) => {
	return useQuery({
		queryKey: ['complaints', params.page, params.limit], // Unique key for caching
		queryFn: () => getComplaints(params)
	});
};

const getSupportCount = async (): Promise<{ unreadCount: number }> => {
	const res = await APIAxios.get('/admin/complaints_count');
	return res.data;
};

export const useGetSupportCount = () => {
	return useQuery({
		queryKey: ['supportCount'],
		queryFn: getSupportCount
	});
};
