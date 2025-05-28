// src/api/matchArtistReports.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ReportItem } from '@/lib/types';

// Define the request payload interface

interface MatchArtistReportsParams {
	artistId: string;
	artistName?: boolean;
	activityPeriod?: string;
	reports: ReportItem[];
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
	artists: ReportItem[];
}

export const matchArtistReports = async ({ artistId, activityPeriod, artistName = false, reports }: MatchArtistReportsParams) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const reportsWithoutId = reports.map(({ _id, ...rest }) => rest);
	console.log(reports);
	console.log(reportsWithoutId);
	const response = await APIAxios.post(`/admin/match/${artistId}`, [...reportsWithoutId], {
		params: {
			artistName,
			activityPeriod
		}
	});
	return response.data;
};

export const useMatchArtistReports = (): UseMutationResult<MatchArtistReportsResponse, Error, MatchArtistReportsParams> => {
	return useMutation({
		mutationFn: matchArtistReports
	});
};

export const publishArtistReports = async ({ artists }: PublishArtistReportsParams): Promise<{ success: boolean /* other response fields */ }> => {
	const response = await APIAxios.post(`/admin/publish_csv`, { artists }, {});
	return response.data;
};

export const usePublishArtistReports = (): UseMutationResult<ApiResponse, Error | null, PublishArtistReportsParams, unknown> => {
	return useMutation({
		mutationFn: publishArtistReports
	});
};

export interface SendEmailReportsParams {
	artistIds: string[];
}

export const sendEmailReports = async (params: SendEmailReportsParams): Promise<ApiResponse> => {
	const response = await APIAxios.post('/admin/publish_records', params.artistIds, {});
	return response.data;
};

export const useSendEmailReports = (): UseMutationResult<ApiResponse, Error, SendEmailReportsParams, unknown> => {
	return useMutation({
		mutationFn: sendEmailReports
	});
};
