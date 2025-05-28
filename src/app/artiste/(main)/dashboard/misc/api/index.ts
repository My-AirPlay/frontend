import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

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
