import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Types for report analytics
export interface ReportAnalyticsSummary {
	totalStreams: number;
	totalNetRevenue: number;
	totalGrossRevenue: number;
	averageStreamValue: number;
	trackCount: number;
	artistCount: number;
}

export interface TrackBreakdownItem {
	trackTitle: string;
	streams: number;
	netRevenue: number;
	grossRevenue: number;
	currency: string;
	originalRate: number;
}

export interface DspBreakdownItem {
	name: string;
	streams: number;
	netRevenue: number;
}

export interface CountryBreakdownItem {
	name: string;
	streams: number;
	netRevenue: number;
}

export interface ExchangeRateInfo {
	rates: Record<string, number>;
	reportId: string;
	activityPeriod: string | null;
	isDefault: boolean;
	createdAt: string;
}

export interface ReportAnalyticsResponse {
	reportId: string;
	activityPeriods: string[];
	summary: ReportAnalyticsSummary;
	exchangeRateInfo: ExchangeRateInfo;
	trackBreakdown: TrackBreakdownItem[];
	dspBreakdown: DspBreakdownItem[];
	countryBreakdown: CountryBreakdownItem[];
}

export const getReportAnalytics = async (reportId: string): Promise<ReportAnalyticsResponse> => {
	const encodedReportId = encodeURIComponent(reportId);
	const response = await APIAxios.get<ReportAnalyticsResponse>(`/admin/report/${encodedReportId}/analytics`);
	console.log(response.data);
	return response.data;
};

export const useGetReportAnalytics = (reportId: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: ['reportAnalytics', reportId],
		queryFn: () => getReportAnalytics(reportId),
		enabled: enabled && !!reportId
	});
};
