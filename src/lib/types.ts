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
	dealType?: string; // Added optional dealType
	rate?: number; // Added optional rate
}

export interface Artist {
	isNew: boolean;
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

// Interface for Withdrawal Slip Data
export interface WithdrawalSlipData {
	_id: string;
	artistId: string;
	status: string; // e.g., 'Pending', 'Approved', 'Rejected', 'Paid'
	payoutCurrency: string; // e.g., 'USD', 'NGN'
	dealType: string; // e.g., 'Fixed', 'Percentage'
	rate?: number; // Optional, relevant for Percentage deals
	proposedAmount: number; // Amount initially proposed/calculated
	requestedAmount: number; // Amount requested by the artist
	finalAmountSent?: number; // Actual amount sent after processing/fees
	notes?: string; // Admin notes or reasons
	activityPeriod: string; // e.g., "September 2023"
	createdAt: string; // ISO Date String
	updatedAt: string; // ISO Date String
	__v?: number; // MongoDB version key
	totalRoyalty?: number | string; // Added based on usage in artist-revenue page
	// Add other relevant fields like artist details if nested
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

interface RoyaltyConversion {
	amount: number;
	rate: number;
	fromCurrency: string; // e.g., 'USD', 'EUR', 'NGN'
	toCurrency: string; // e.g., 'USD', 'EUR', 'NGN'
}

// Represents the royalty data structure found in various places
interface RoyaltyData {
	name: string;
	value: number;
	royaltyConverted: RoyaltyConversion[];
}

// Represents data specific to a Digital Service Provider (DSP)
interface DspDataItem {
	name: string; // e.g., 'Spotify', 'TIDAL'
	streams: number;
	royalty: RoyaltyData;
}

// Represents data specific to a country
interface CountryDataItem {
	name: string; // e.g., 'JAM', 'ZMB', 'NGA' (likely ISO 3166-1 alpha-3 codes)
	streams: number;
	royalty: RoyaltyData;
}

// Represents data specific to a delivery method
interface DeliveryDataItem {
	name: string; // e.g., 'Streaming'
	streams: number;
	royalty: RoyaltyData;
}

// Represents a single detailed report within the fullReports array
export interface FullReport {
	trackTitle: string;
	upcCode: string;
	isrcCode: string;
	catalogueId: string;
	totalRoyaltyUSD: RoyaltyData;
	totalStreams: number;
	dspData: DspDataItem[];
	countryData: CountryDataItem[];
	deliveryData: DeliveryDataItem[];
}

// Represents a single top-level item in the main data array
export interface ReportItem {
	_id: string;
	userId?: string | null; // Made optional to handle cases where it might be missing
	artistId: string;
	artistName: string;
	activityPeriod: string; // e.g., "September 2023"
	fullReports: FullReport[];
	createdAt: string; // ISO Date String
	updatedAt: string; // ISO Date String
	__v?: number; // MongoDB version key (Made optional)
}

// Represents the entire structure of the placeholderParseData object
export interface PlaceholderParseData {
	data: ReportItem[];
}
