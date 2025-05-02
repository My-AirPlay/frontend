// src/api/getAllWithdrawalSlips.ts
import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetAllWithdrawalSlipsParams {
	page: number;
	limit: number;
	artistId: string;
}

export const getAllWithdrawalSlips = async ({ page, limit, artistId }: GetAllWithdrawalSlipsParams) => {
	const response = await APIAxios.get(`/admin/all_withdrawalslips`, {
		params: {
			page,
			limit,
			artistId
		}
	});
	return response.data;
};

export const useGetAllWithdrawalSlips = (params: GetAllWithdrawalSlipsParams) => {
	return useQuery({
		queryKey: ['withdrawalSlips', params.page, params.limit, params.artistId], // Unique key for caching
		queryFn: () => getAllWithdrawalSlips(params)
	});
};
