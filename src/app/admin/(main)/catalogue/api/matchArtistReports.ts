// src/api/matchArtistReports.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

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

interface ArtistReport {
	artistId: string | null;
	artistName: string;
	activityPeriod: string;
	fullReports: FullReport[];
}

interface MatchArtistReportsParams {
	artistId: string;
	artistName?: boolean;
	reports: ArtistReport[];
}

// Define the response type (adjust based on your API's response structure)
interface MatchArtistReportsResponse {
	success: boolean;
	message?: string;
	data?: unknown; // Replace 'any' with a specific type if known
}

export const matchArtistReports = async ({ artistId, artistName = true, reports }: MatchArtistReportsParams) => {
	const response = await APIAxios.post(`/admin/match/${artistId}`, reports, {
		params: {
			artistName
		}
	});
	return response.data;
};

export const useMatchArtistReports = (): UseMutationResult<MatchArtistReportsResponse, Error, MatchArtistReportsParams> => {
	return useMutation({
		mutationFn: matchArtistReports
	});
};
