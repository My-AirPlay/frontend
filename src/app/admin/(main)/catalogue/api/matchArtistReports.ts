// src/api/matchArtistReports.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ReportItem } from '@/lib/types';

// Define the request payload interface

interface MatchArtistReportsParams {
	artistId: string;
	artistName?: boolean;
	activityPeriod?: string;
	analyticsId?: string;
	rows?: string[];
}

// Define the response type (adjust based on your API's response structure)
interface MatchArtistReportsResponse {
	success: boolean;
	message?: string;
	data?: unknown; // Replace 'any' with a specific type if known
}

interface ApiResponse {
	success: boolean;
	message?: string;
	data?: unknown; // Replace 'any' with a specific type if known
}

interface PublishArtistReportsParams {
	tracks: ReportItem[];
	reportId: string;
}

export const matchArtistReports = async ({ artistId, activityPeriod, artistName = false, analyticsId, rows }: MatchArtistReportsParams) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const response = await APIAxios.post(`/admin/match/${artistId}`, null, {
		params: {
			artistName,
			activityPeriod,
			analyticsId,
			rows
		}
	});
	return response.data;
};

export const useMatchArtistReports = (): UseMutationResult<MatchArtistReportsResponse, Error, MatchArtistReportsParams> => {
	return useMutation({
		mutationFn: matchArtistReports
	});
};

export const publishArtistReports = async ({ tracks, reportId }: PublishArtistReportsParams): Promise<{ success: boolean /* other response fields */ }> => {
	const response = await APIAxios.post(`/admin/publish_csv`, { tracks, reportId }, {});
	return response.data;
};

export const usePublishArtistReports = (): UseMutationResult<ApiResponse, Error | null, PublishArtistReportsParams, unknown> => {
	return useMutation({
		mutationFn: publishArtistReports
	});
};

export interface SendEmailReportsParams {
	artistIds: string[];
	activityPeriod: string;
}

export const sendEmailReports = async (params: SendEmailReportsParams): Promise<ApiResponse> => {
	const response = await APIAxios.post('/admin/publish_records', params, {});
	return response.data;
};

export const useSendEmailReports = (): UseMutationResult<ApiResponse, Error, SendEmailReportsParams, unknown> => {
	return useMutation({
		mutationFn: sendEmailReports
	});
};
