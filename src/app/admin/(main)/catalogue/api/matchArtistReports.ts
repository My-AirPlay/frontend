// src/api/matchArtistReports.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ReportItem } from '@/lib/types';

// Define the request payload interface
interface RoyaltyConverted {
	amount: number;
	rate: number;
	fromCurrency: string;
	toCurrency: string;
}

interface Royalty {
	name: string;
	value: number;
	royaltyConverted: RoyaltyConverted[];
}

interface DspData {
	name: string;
	streams: number;
	royalty: Royalty;
}

interface CountryData {
	name: string;
	streams: number;
	royalty: Royalty;
}

interface DeliveryData {
	name: string;
	streams: number;
	royalty: Royalty;
}

interface FullReport {
	trackTitle: string;
	upcCode: string;
	isrcCode: string;
	catalogueId: string;
	totalRoyaltyUSD: Royalty;
	totalStreams: number;
	dspData: DspData[];
	countryData: CountryData[];
	deliveryData: DeliveryData[];
}

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

export const matchArtistReports = async ({ artistId, activityPeriod, artistName = false, reports }: MatchArtistReportsParams) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, ...reportsWithoutId } = reports;
	const response = await APIAxios.post(`/admin/match/${artistId}`, [reportsWithoutId], {
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

export const publishArtistReports = async ({ artists }) => {
	const response = await APIAxios.post(
		`/admin/publish_csv`,
		{
			artists: artists
		},
		{}
	);
	return response.data;
};

export const usePublishArtistReports = (): UseMutationResult<ApiResponse, Error | null, { readonly artists?: [] }, unknown> => {
	return useMutation({
		mutationFn: publishArtistReports
	});
};

export const sendEmailReports = async ({ artistIds }) => {
	const response = await APIAxios.post(`/admin/publish_records`, artistIds, {});
	return response.data;
};

export const useSendEmailReports = (): UseMutationResult<ApiResponse, Error | null, { readonly artistIds?: string[] }, unknown> => {
	return useMutation({
		mutationFn: sendEmailReports
	});
};
