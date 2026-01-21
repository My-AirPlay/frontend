import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Types for rate change
export interface RateChangeDetail {
	artistId: string;
	previousAmount: number;
	newAmount: number;
}

export interface UpdateReportRatePayload {
	reportId: string;
	newRate: number;
	fromCurrency: 'USD' | 'GBP' | 'EUR';
	toCurrency?: 'NGN';
}

export interface UpdateReportRateResponse {
	reportId: string;
	previousRate: number;
	newRate: number;
	updatedAnalyticsCount: number;
	updatedWithdrawalsCount: number;
	rateChangeDetails: RateChangeDetail[];
}

export const updateReportRate = async (payload: UpdateReportRatePayload): Promise<UpdateReportRateResponse> => {
	const encodedReportId = encodeURIComponent(payload.reportId);
	const response = await APIAxios.patch<UpdateReportRateResponse>(`/admin/report/${encodedReportId}/rate`, {
		newRate: payload.newRate,
		fromCurrency: payload.fromCurrency,
		toCurrency: payload.toCurrency || 'NGN'
	});
	return response.data;
};

export const useUpdateReportRate = () => {
	const queryClient = useQueryClient();

	return useMutation<UpdateReportRateResponse, Error, UpdateReportRatePayload>({
		mutationFn: updateReportRate,
		onSuccess: (data, variables) => {
			toast.success(`Exchange rate updated successfully! ${data.updatedAnalyticsCount} records and ${data.updatedWithdrawalsCount} withdrawals updated.`);
			// Invalidate related queries
			queryClient.invalidateQueries({ queryKey: ['reportAnalytics', variables.reportId] });
			queryClient.invalidateQueries({ queryKey: ['groupedSalesHistory'] });
			queryClient.invalidateQueries({ queryKey: ['getSalesHistory'] });
			queryClient.invalidateQueries({ queryKey: ['withdrawalSlips'] });
		},
		onError: error => {
			toast.error(error.message || 'Failed to update exchange rate.');
		}
	});
};
