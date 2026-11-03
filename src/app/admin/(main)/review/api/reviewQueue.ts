import APIAxios from '@/utils/axios';
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

export type ReviewStatusFilter = 'pending' | 'approved' | 'rejected' | 'all';
export type ReviewKindFilter = 'all' | 'audio' | 'video' | 'album';
export type FileKind = 'audio' | 'video';

export interface ReviewQueueItem {
	id: string;
	type: 'single' | 'album';
	fileType: FileKind;
	title: string;
	artistName: string;
	artistId: string;
	coverArtUrl: string | null;
	trackCount: number;
	mainGenre?: string;
	dirType?: string | null;
	createdAt: string;
	releaseDate?: string;
	reviewStatus: string;
	rejectionReasons: string[];
	reviewedAt?: string | null;
}

export interface ReviewQueuePage {
	items: ReviewQueueItem[];
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export interface ReviewTrack {
	id: string;
	position: number;
	title: string;
	artistName?: string;
	featuredArtists?: string;
	fileType: FileKind;
	extension: string | null;
	isrcCode: string;
	explicitContent?: string;
	hasFile: boolean;
}

export interface ReviewRelease {
	id: string;
	type: 'single' | 'album';
	fileType: FileKind;
	dirType?: string;
	title: string;
	artistName: string;
	artistId: string;
	featuredArtists?: string;
	mainGenre?: string;
	secondaryGenres?: string[];
	recordLabel?: string;
	publisher?: string;
	writer?: string;
	producer?: string;
	copyright?: string;
	explicitContent?: string;
	releaseVersion?: string;
	releaseDate?: string;
	originalReleaseDate?: string | null;
	universalProductCode?: string;
	streamingPlatforms: string[];
	description?: string;
	lyrics?: string;
	createdAt: string;
	reviewStatus: string;
	rejectionReasons: string[];
	reviewedAt?: string | null;
	deliveryStatus?: string | null;
	coverArtUrl: string | null;
	parentAlbum?: { id: string; title: string } | null;
	tracks: ReviewTrack[];
	missingTracks: number;
}

export interface MediaPreview {
	url: string;
	contentType: string;
	fileType: FileKind;
	expiresAt: string;
}

export interface ReviewQueueParams {
	status: ReviewStatusFilter;
	kind: ReviewKindFilter;
	search?: string;
	page?: number;
	limit?: number;
}

export const useReviewQueue = (params: ReviewQueueParams) =>
	useQuery({
		queryKey: ['review-queue', params],
		queryFn: async () => (await APIAxios.get<ReviewQueuePage>('/admin/review-queue', { params })).data,
		placeholderData: keepPreviousData
	});

/** How many releases are waiting, for the sidebar badge. */
export const usePendingReviewCount = (enabled = true) =>
	useQuery({
		queryKey: ['review-queue', 'pending-count'],
		queryFn: async () => (await APIAxios.get<ReviewQueuePage>('/admin/review-queue', { params: { status: 'pending', limit: 1 } })).data.total,
		enabled,
		refetchInterval: 5 * 60 * 1000
	});

export const useReviewRelease = (id?: string | null) =>
	useQuery({
		queryKey: ['review-item', id],
		queryFn: async () => (await APIAxios.get<ReviewRelease>(`/admin/review-queue/${id}`)).data,
		enabled: !!id
	});

/** Signed links last two hours; refresh well before that. */
const PREVIEW_STALE_MS = 90 * 60 * 1000;

export const useMediaPreviews = (trackIds: string[]) =>
	useQueries({
		queries: trackIds.map(id => ({
			queryKey: ['media-preview', id],
			queryFn: async () => (await APIAxios.get<MediaPreview>(`/admin/media/${id}/preview`)).data,
			staleTime: PREVIEW_STALE_MS,
			gcTime: PREVIEW_STALE_MS,
			retry: false
		}))
	});
