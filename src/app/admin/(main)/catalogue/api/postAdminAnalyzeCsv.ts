import APIAxios from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReportItem } from '@/lib/types';

interface CurrencyPair {
	fromCurrency: string | null;
	toCurrency: string | null;
	exchangeRate: number | null;
}

export const analyzeCsv = async (file: File, exchangeRates: CurrencyPair[], tag: string, reportingPeriod: string) => {
	const payload = new FormData();
	payload.append('file', file);
	payload.append('exchangeRates', JSON.stringify(exchangeRates));
	payload.append('tag', tag);
	payload.append('reportingPeriod', reportingPeriod);

	const response = await APIAxios.post(`/admin/analyze_csv`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useAdminAnalyzeCsv = () => {
	return useMutation({
		mutationFn: ({ file, exchangeRates, tag, reportingPeriod }: { file: File; exchangeRates: CurrencyPair[]; tag: string; reportingPeriod: string }) => analyzeCsv(file, exchangeRates, tag, reportingPeriod),
		onSuccess: data => {
			console.log('CSV analyzed successfully:', data);
		},
		onError: error => {
			console.error('Error analyzing CSV:', error);
		}
	});
};

interface ReportStatusResponse {
	status: 'processing' | 'completed' | 'failed';
	data?: ReportItem[];
}

const getReportStatus = async (reportId: string): Promise<ReportStatusResponse> => {
	const { data } = await APIAxios.get(`/admin/report/${reportId}`);
	return data;
};

export const useGetReportStatus = (reportId: string, enabled: boolean) => {
	return useQuery<ReportStatusResponse, Error>({
		queryKey: ['reportStatus', reportId],
		queryFn: () => getReportStatus(reportId),
		enabled: enabled, // Only run the query when this is true
		refetchInterval: 5000, // Poll every 5 seconds
		refetchIntervalInBackground: true
	});
};
