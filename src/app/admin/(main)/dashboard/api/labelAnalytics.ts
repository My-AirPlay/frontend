import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export interface LabelFilters {
	from?: string;
	to?: string;
}

export interface NamedTotals {
	name: string;
	totalStreams: number;
	totalRevenue: number;
}

export interface LabelAnalytics {
	currency: string;
	totalStreams: number;
	totalRevenue: number;
	averageStreamValue: number;
	revenueHistory: { period: string; value: number }[];
	streamsHistory: { period: string; value: number }[];
	topTracks: { trackTitle: string; isrc?: string | null; totalStreams: number; totalRevenue: number; coverArtUrl?: string | null }[];
	topDSPs: NamedTotals[];
	topCountries: NamedTotals[];
	topArtists: { artistId: string; artistName: string; totalStreams: number; totalRevenue: number }[];
	availablePeriods: string[];
	change: { period: string; previousPeriod: string | null; streams: number | null; revenue: number | null } | null;
	releasesPerMonth: { month: string; singles: number; albums: number; total: number }[];
}

const clean = (filters: LabelFilters) => Object.fromEntries(Object.entries(filters).filter(([, v]) => !!v));

export const useLabelAnalytics = (filters: LabelFilters) =>
	useQuery({
		queryKey: ['labelAnalytics', filters],
		queryFn: async () => (await APIAxios.get('/admin/analytics/label', { params: clean(filters) })).data as LabelAnalytics,
		placeholderData: previous => previous
	});

export type LabelExportTable = 'periods' | 'artists' | 'tracks' | 'countries' | 'platforms';

/** Download one table of the label overview as CSV. */
export async function downloadLabelCsv(table: LabelExportTable, filters: LabelFilters) {
	const response = await APIAxios.get('/admin/analytics/label/export', { params: { table, ...clean(filters) }, responseType: 'blob' });
	const url = URL.createObjectURL(response.data);
	const a = document.createElement('a');
	a.href = url;
	a.download = `label-${table}${filters.from ? `-${filters.from}` : ''}${filters.to ? `-${filters.to}` : ''}.csv`.replace(/\s+/g, '');
	a.click();
	URL.revokeObjectURL(url);
}

interface ReleaseItem {
	id: string;
	type: 'single' | 'album';
	title: string;
	artistName: string;
	createdAt: string;
	deliveryStatus: string | null;
	lastError: string | null;
	takedownReason: string | null;
}
interface ArtistItem {
	artistId: string;
	artistName: string;
	email: string;
	releasesUsed: number;
}
export interface CatalogueHealth {
	awaitingApproval: { count: number; items: ReleaseItem[] };
	failedDeliveries: { count: number; items: ReleaseItem[] };
	openTakedowns: { count: number; items: ReleaseItem[] };
	codePool: Record<'upc' | 'isrc', { available: number; used: number; low: boolean }>;
	artistsNearReleaseLimit: { count: number; items: ArtistItem[] };
	artistsAtReleaseLimit: { count: number; items: ArtistItem[] };
	artistsMissingBankDetails: { count: number; items: ArtistItem[] };
	artistsMissingStreamingLinks: { count: number; items: ArtistItem[] };
	thresholds: { freeReleaseLimit: number; nearLimitRemaining: number; lowPool: number };
}

export const useCatalogueHealth = () =>
	useQuery({
		queryKey: ['catalogueHealth'],
		queryFn: async () => (await APIAxios.get('/admin/catalogue-health')).data as CatalogueHealth
	});
