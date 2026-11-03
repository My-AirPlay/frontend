import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SupportedCurrency } from '@/utils/currency';

/** Narrow analytics to a period range ("January - 2026") and/or one track (ISRC or title). */
export interface AnalyticsFilters {
	from?: string;
	to?: string;
	track?: string;
}

const getData = async (filters: AnalyticsFilters = {}) => {
	const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => !!v));
	const response = await APIAxios.get('/artist/artist_analytics', { params });
	return response.data as APIResponse;
};

export const useGetDashboardData = (filters: AnalyticsFilters = {}) => {
	return useQuery({
		queryKey: ['ArtistDashboardData', filters],
		queryFn: () => getData(filters),
		refetchOnWindowFocus: true,
		placeholderData: previous => previous
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
		queryFn: () => getAllWithdrawalSlips(params),
		enabled: !!params.artistId
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
	isrc?: string | null;
	mediaId?: string;
	releaseDate?: string | null;
	coverArtUrl?: string | null;
	albumTitle?: string | null;
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
	currency: SupportedCurrency;
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

	/** Every period with data, whatever range is selected. */
	availablePeriods?: string[];
	/** Latest period against the one before, as percentages (null when not comparable). */
	change?: { period: string; previousPeriod: string | null; streams: number | null; revenue: number | null } | null;
	filters?: { from: string | null; to: string | null; track: string | null };
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
	} catch {
		toast.error('Could not generate the report. Please try again.');
	}
};

export const exportByActivityPeriodCsv = async (activityPeriod: string, reportId?: string) => {
	try {
		const params = reportId ? `?reportId=${encodeURIComponent(reportId)}` : '';
		const response = await APIAxios.get(`/artist/export-by-activity-period/${encodeURIComponent(activityPeriod)}${params}`, { responseType: 'blob' });

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;

		const filename = `revenue-report-${activityPeriod}${reportId ? '-' + reportId.split(':')[0] : ''}.csv`;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.parentNode?.removeChild(link);
		window.URL.revokeObjectURL(url);

		toast.success('Your report is downloading!');
	} catch {
		toast.error('Could not generate the report. Please try again.');
	}
};
