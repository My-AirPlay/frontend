import APIAxios from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReportItem } from '@/lib/types';

interface CurrencyPair {
	fromCurrency: string | null;
	toCurrency: string | null;
	exchangeRate: number | null;
}

export const analyzeCsv = async (file: string, fileMetadata: { originalname: string; mimetype: string; size: number }, exchangeRates: CurrencyPair[], tag: string, reportingPeriod: string) => {
	const payload = {
		s3FileUrl: file,
		fileMetadata,
		exchangeRates,
		tag,
		reportingPeriod
	};

	const response = await APIAxios.post(`/admin/analyze_csv`, payload);

	return response.data;
};

export const useAdminAnalyzeCsv = () => {
	return useMutation({
		// Update the type hint for the mutation function's arguments
		mutationFn: ({ s3FileUrl, fileMetadata, exchangeRates, tag, reportingPeriod }: { s3FileUrl: string; fileMetadata: { originalname: string; mimetype: string; size: number }; exchangeRates: CurrencyPair[]; tag: string; reportingPeriod: string }) => analyzeCsv(s3FileUrl, fileMetadata, exchangeRates, tag, reportingPeriod),

		onSuccess: response => {
			console.log('Job started successfully:', response.data);
			// The response.data will contain { reportId, message }
		},
		onError: error => {
			console.error('Error starting analysis job:', error);
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

interface UploadUrlResponse {
	signedUrl: string;
	finalUrl: string;
}

export const getUploadUrl = async (filename: string, fileType: string): Promise<UploadUrlResponse> => {
	const { data } = await APIAxios.get('/admin/generate-upload-url', {
		params: { filename, fileType }
	});
	return data;
};
