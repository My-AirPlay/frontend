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
interface PeriodMetrics {
	totalStreams: number;
	totalRevenue: number;
}

interface StreamRevenue {
	streams: number;
	revenue: number;
}

// Period data
interface PeriodData {
	[period: string]: StreamRevenue;
}

interface PeriodSummary {
	[period: string]: PeriodMetrics;
}

// Performance data
interface PerformanceItem {
	totalStreams: number;
	totalRevenue: number;
	periodBreakdown: PeriodData;
}

interface TrackPerformance extends PerformanceItem {
	trackTitle: string;
}

interface NamedPerformanceItem extends PerformanceItem {
	name: string;
}

// History data
interface HistoryItem {
	period: string;
	value: number;
}

// Main API response
interface APIResponse {
	// Summary metrics
	totalStreams: number;
	totalRevenue: number;
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
