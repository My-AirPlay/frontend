// src/api/getFullAnalysis.ts
import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface GetFullAnalysisParams {
	startDate?: string;
	endDate?: string;
	category?: string;
}

export const getFullAnalysis = async (params: GetFullAnalysisParams) => {
	const response = await APIAxios.get(`/admin/get_full_analysis`, { params });
	return response.data;
};

export const useGetFullAnalysis = (params: GetFullAnalysisParams) => {
	return useQuery({
		queryKey: ['fullAnalysis', params], // Include params in cache key
		queryFn: () => getFullAnalysis(params)
	});
};
