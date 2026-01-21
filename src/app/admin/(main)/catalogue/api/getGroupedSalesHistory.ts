import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Types for grouped sales history
export interface GroupedSalesHistoryItem {
	activityPeriod: string;
	createdAt: string;
	reportIds: string[];
	artistNames: string[];
	netRevenue: number;
	grossRevenue: number;
	trackCount: number;
	avgDealRate: number;
}

export interface GroupedSalesHistorySummary {
	totalNetRevenue: number;
	totalGrossRevenue: number;
}

export interface GroupedSalesHistoryResponse {
	data: GroupedSalesHistoryItem[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	summary: GroupedSalesHistorySummary;
}

export interface GroupedSalesHistoryParams {
	page?: number;
	limit?: number;
	sortBy?: 'activityPeriod' | 'createdAt' | 'netRevenue' | 'grossRevenue';
	sortOrder?: 'asc' | 'desc';
}

export const getGroupedSalesHistory = async (params: GroupedSalesHistoryParams): Promise<GroupedSalesHistoryResponse> => {
	const response = await APIAxios.get<GroupedSalesHistoryResponse>('/admin/sales-history/grouped', {
		params: {
			page: params.page || 1,
			limit: params.limit || 10,
			sortBy: params.sortBy || 'activityPeriod',
			sortOrder: params.sortOrder || 'desc'
		}
	});
	return response.data;
};

export const useGetGroupedSalesHistory = (params: GroupedSalesHistoryParams) => {
	return useQuery({
		queryKey: ['groupedSalesHistory', params],
		queryFn: () => getGroupedSalesHistory(params)
	});
};
