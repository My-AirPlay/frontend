import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';

export const getSalesHistory = async (apiParams: { page: string; limit: string }) => {
	const response = await APIAxios.get(`/admin/get_published_reports`, {
		params: apiParams
	});
	return response.data;
};

export const useGetSalesHistory = (apiParams: { page: string; limit: string }) => {
	return useQuery({
		queryKey: ['getSalesHistory'],
		queryFn: () => getSalesHistory(apiParams)
	});
};

export interface DeletionResult {
	deletedWithdrawals: number;
	deletedAnalytics: number;
}
export interface DeletionParams {
	reportIds: string[];
}

export interface DeletionResult {
	deletedWithdrawals: number;
	deletedAnalytics: number;
}

export interface DeleteReportsParams {
	reportIds: string[];
}
export const deleteSalesHistory = async ({ reportIds }: DeleteReportsParams): Promise<DeletionResult> => {
	const response = await APIAxios.delete<DeletionResult>(`/admin/reports`, {
		data: {
			reportIds
		}
	});
	console.log(response);
	return response.data;
};

/**
 * A TanStack Query hook for deleting sales history records.
 * Matches the format: explicit UseMutationResult return type.
 */
export const useDeleteSalesHistory = (): UseMutationResult<DeletionResult, Error | null, DeleteReportsParams, unknown> => {
	return useMutation({
		mutationFn: deleteSalesHistory
	});
};
