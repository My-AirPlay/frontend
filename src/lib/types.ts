import { AxiosResponse } from 'axios';

export type API_RESPONSE_TYPE = [AxiosResponse, null] | [null, Error];

interface ContractDetails {
	startDate: string;
	endDate: string;
	contract: string;
	status: string;
}

interface RoyaltyConverted {
	amount: number;
	rate: number;
	fromCurrency: string;
	toCurrency: string;
}

interface Metric {
	name: string;
	value: number;
	royaltyConverted?: RoyaltyConverted[];
}

interface Report {
	trackTitle: string;
	upcCode: string;
	isrcCode: string;
	catalogueId: string;
	activityPeriod: string;
	totalRoyaltyUSD: Metric;
	countryWithHighestStreams: Metric;
	countryWithHighestRoyalties: Metric;
	dspWithHighestStreams: Metric;
	dspWithHighestRoyalties: Metric;
	deliveryWithHighestStreams: Metric;
	deliveryWithHighestRoyalties: Metric;
	dspDataRoyalties: Metric[];
	dspDataStreams: Metric[];
	deliveryDataRoyalties: Metric[];
	deliveryDataStreams: Metric[];
}

interface VerificationDetails {
	verificationCode: string;
	reason: string;
	createdAt: string;
}

interface BankDetails {
	bankName: string;
	accountName: string;
	accountNumber: number;
	ibanSwiftCode: string;
	currency: string;
	sortCode: number;
	paymentOption: string;
	bvn: string;
	bankCode: string;
	status: string;
}

export interface Artist {
	_id: string;
	email: string;
	password: string;
	stage: string;
	hasManagement: boolean;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	verificationDetails: VerificationDetails;
	artistName: string;
	city: string;
	country: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	bankDetails: BankDetails;
	catalogueId: string;
	isrcCode: string;
	upcCode: string;
	reports: Report[];
	contractDetails: ContractDetails;
}

interface Tracks {
	_id: string;
	artistId: string;
	fileType: string;
	description: string;
	features: string[];
	contributors: string[];
	title: string;
	mainGenre: string;
	secondaryGenres: string[];
	mediaCoverArtUrl: string;
	artistName: string;
	mediaUrl: string;
	recordLabel: string;
	publisher: string;
	instruments: string[];
	lyrics: string;
	explicitContent: string; // "true" or "false" as a string
	universalProductCode: string;
	releaseVersion: string;
	copyright: string;
	releaseDate: string;
	streamingPlatforms: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

// Interface for the main directory (album/collection)
export interface Album {
	_id: string;
	artistId: string;
	title: string;
	description: string;
	dirType: string;
	mainGenre: string;
	secondaryGenres: string[];
	artistName: string;
	recordLabel: string;
	publisher: string;
	instruments: string[];
	explicitContent: string; // "true" or "false" as a string
	universalProductCode: string;
	releaseVersion: string;
	copyright: string;
	releaseDate: string;
	streamingPlatforms: string[];
	fileIds: Tracks[];
	mediaDirCoverArtUrl: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export const currencySymbols: Record<string, string> = {
	USD: '$',
	EUR: '€',
	NGN: '₦',
	GBP: '£',
	JPY: '¥',
	AUD: 'A$',
	CAD: 'C$',
	CHF: 'CHF',
	CNY: '¥',
	INR: '₹',
	BRL: 'R$',
	ZAR: 'R'
	// Add more currencies as needed
};
