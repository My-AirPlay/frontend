import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const getData = async () => {
	const response = await APIAxios.get('/artist/artist_analytics');
	return response.data as APIResponse;
};

export const useGetDashboardData = () => {
	return useQuery({
		queryKey: ['ArtistDashboardData'],
		queryFn: getData,
		refetchOnWindowFocus: true
	});
};

interface GetAllWithdrawalSlipsParams {
	page: number;
	limit: number;
	artistId: string;
}

export const getAllWithdrawalSlips = async ({ page, limit, artistId }: GetAllWithdrawalSlipsParams) => {
	const response = await APIAxios.get(`/artist/all_withdrawalslips`, {
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

// Core data types
export interface PeriodMetrics {
	totalStreams: number;
	totalRevenue: number;
}

export interface StreamRevenue {
	streams: number;
	revenue: number;
}

// Period data
export interface PeriodData {
	[period: string]: StreamRevenue;
}

export interface PeriodSummary {
	[period: string]: PeriodMetrics;
}

// Performance data
export interface PerformanceItem {
	totalStreams: number;
	totalRevenue: number;
	periodBreakdown: PeriodData;
}

export interface TrackPerformance extends PerformanceItem {
	trackTitle: string;
}

export interface NamedPerformanceItem extends PerformanceItem {
	name: string;
}

// History data
export interface HistoryItem {
	period: string;
	value: number;
}

// Main API response
export interface APIResponse {
	// Summary metrics
	totalStreams: number;
	totalRevenue: number;
	grossRevenue: number;
	averageStreamValue: number;

	// Breakdowns
	periodSummary: PeriodSummary;
	trackPerformance: TrackPerformance[];
	dspBreakdown: Record<string, PerformanceItem>;
	countryBreakdown: Record<string, PerformanceItem>;
	deliveryBreakdown: Record<string, PerformanceItem>;

	// History data
	revenueHistory: HistoryItem[];
	streamsHistory: HistoryItem[];

	// Top performers
	topTracks: TrackPerformance[];
	topDSPs: NamedPerformanceItem[];
	topCountries: NamedPerformanceItem[];
}
export interface ReportPeriodPair {
	reportId: string;
	activityPeriod: string;
}

// --- React Query Hook to Fetch Available Reports ---
const getReportPeriodPairs = async (): Promise<ReportPeriodPair[]> => {
	const { data } = await APIAxios.get(`/artist/activity-periods`);
	return data;
};

export const useGetReportPeriodPairs = (artistId: string) => {
	return useQuery<ReportPeriodPair[], Error>({
		queryKey: ['reportPeriodPairs', artistId],
		queryFn: () => getReportPeriodPairs(),
		enabled: !!artistId, // Only run if artistId is available
		staleTime: 1000 * 60 * 5 // Cache for 5 minutes
	});
};

export const exportAnalyticsCsv = async (artistId: string, reportId: string, activityPeriod: string) => {
	try {
		const response = await APIAxios.get(`/artist/export-analytics/${reportId}/${activityPeriod}`, {
			responseType: 'blob'
		});
		console.log(response);
		const url = window.URL.createObjectURL(new Blob([response.data]));

		const link = document.createElement('a');
		link.href = url;

		const filename = `royalty-report-${reportId.split(':')[0]}-${activityPeriod}.csv`;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.parentNode?.removeChild(link);
		window.URL.revokeObjectURL(url);

		toast.success('Your report is downloading!');
	} catch (error) {
		console.error('Failed to export CSV:', error);
		toast.error('Could not generate the report. Please try again.');
	}
};
