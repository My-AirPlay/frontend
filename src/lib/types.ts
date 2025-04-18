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
interface FullReport {
	trackTitle: string;
	totalRoyaltyUSD: RoyaltyData;
	totalStreams: number;
	dspData: DspDataItem[]; // Array can be empty
	countryData: CountryDataItem[]; // Array can be empty
	deliveryData: DeliveryDataItem[]; // Array can be empty
}

// Represents a single top-level item in the main data array
export interface ReportItem {
	userId: string | null; // Can be null
	artistName: string;
	upcCode: string;
	isrcCode: string;
	catalogueId: string;
	activityPeriod: string; // e.g., 'Sep-23'
	fullReports: FullReport[];
	_id: string; // Likely MongoDB ObjectId as string
	createdAt: string; // ISO Date string
	updatedAt: string; // ISO Date string
	__v: number; // MongoDB version key
}

// Represents the entire structure of the placeholderParseData object
export interface PlaceholderParseData {
	data: ReportItem[];
}

export const placeholderParseData = {
	data: [
		{
			userId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			upcCode: '197077506990',
			isrcCode: 'QZTV32204282',
			catalogueId: 'CAT700264',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -7.397930400000005,
						royaltyConverted: [
							{
								amount: -6.288240840000005,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -11836.688640000008,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 42,
					dspData: [
						{
							name: 'Spotify',
							streams: 42,
							royalty: {
								name: 'Spotify',
								value: -7.397930400000005,
								royaltyConverted: [
									{
										amount: -6.288240840000005,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11836.688640000008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'JAM',
							streams: 3,
							royalty: {
								name: 'JAM',
								value: -0.009602,
								royaltyConverted: [
									{
										amount: -0.0081617,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -15.363199999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 25,
							royalty: {
								name: 'ZMB',
								value: -0.007621,
								royaltyConverted: [
									{
										amount: -0.00647785,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -12.1936,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 2,
							royalty: {
								name: 'BWA',
								value: -0.004012,
								royaltyConverted: [
									{
										amount: -0.0034102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.4192,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.003817,
								royaltyConverted: [
									{
										amount: -0.00324445,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.1072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 11,
							royalty: {
								name: 'NAM',
								value: -0.000042,
								royaltyConverted: [
									{
										amount: -0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 42,
							royalty: {
								name: 'Streaming',
								value: -7.397930400000005,
								royaltyConverted: [
									{
										amount: -6.288240840000005,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11836.688640000008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			],
			_id: '67ffa831bb691d68c4468af8',
			createdAt: '2025-04-16T12:53:05.384Z',
			updatedAt: '2025-04-16T12:53:05.384Z',
			__v: 0
		},
		{
			userId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			upcCode: '197077506990',
			isrcCode: 'QZTV32204282',
			catalogueId: 'CAT700264',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -7.397930400000005,
						royaltyConverted: [
							{
								amount: -6.288240840000005,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -11836.688640000008,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 42,
					dspData: [
						{
							name: 'Spotify',
							streams: 42,
							royalty: {
								name: 'Spotify',
								value: -7.397930400000005,
								royaltyConverted: [
									{
										amount: -6.288240840000005,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11836.688640000008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'JAM',
							streams: 3,
							royalty: {
								name: 'JAM',
								value: -0.009602,
								royaltyConverted: [
									{
										amount: -0.0081617,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -15.363199999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 25,
							royalty: {
								name: 'ZMB',
								value: -0.007621,
								royaltyConverted: [
									{
										amount: -0.00647785,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -12.1936,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 2,
							royalty: {
								name: 'BWA',
								value: -0.004012,
								royaltyConverted: [
									{
										amount: -0.0034102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.4192,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.003817,
								royaltyConverted: [
									{
										amount: -0.00324445,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.1072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 11,
							royalty: {
								name: 'NAM',
								value: -0.000042,
								royaltyConverted: [
									{
										amount: -0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 42,
							royalty: {
								name: 'Streaming',
								value: -7.397930400000005,
								royaltyConverted: [
									{
										amount: -6.288240840000005,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11836.688640000008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: '67cefb10ccf45e5ddef7447a',
			artistName: 'Magnito',
			upcCode: '197077639230',
			isrcCode: 'QZWDD2203348',
			catalogueId: 'CAT707423',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'E.T.C',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -4.354489500000002,
						royaltyConverted: [
							{
								amount: -3.701316075000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -6967.183200000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 97,
					dspData: [
						{
							name: 'Spotify',
							streams: 96,
							royalty: {
								name: 'Spotify',
								value: -4.354502500000002,
								royaltyConverted: [
									{
										amount: -3.701327125000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6967.204000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: -0.626205,
								royaltyConverted: [
									{
										amount: -0.53227425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -1001.928,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 45,
							royalty: {
								name: 'ZMB',
								value: -0.010094,
								royaltyConverted: [
									{
										amount: -0.0085799,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -16.1504,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 9,
							royalty: {
								name: 'MLT',
								value: -0.004992,
								royaltyConverted: [
									{
										amount: -0.0042432,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -7.9872,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 4,
							royalty: {
								name: 'GEO',
								value: -0.004543,
								royaltyConverted: [
									{
										amount: -0.00386155,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -7.268800000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 6,
							royalty: {
								name: 'NAM',
								value: -0.004103,
								royaltyConverted: [
									{
										amount: -0.00348755,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.5648,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 16,
							royalty: {
								name: 'CIV',
								value: -0.003573,
								royaltyConverted: [
									{
										amount: -0.00303705,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.716799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 9,
							royalty: {
								name: 'MOZ',
								value: -0.003561,
								royaltyConverted: [
									{
										amount: -0.0030268499999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.6975999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: -0.003079,
								royaltyConverted: [
									{
										amount: -0.00261715,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9264,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: -0.003085,
								royaltyConverted: [
									{
										amount: -0.00262225,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.936,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 3,
							royalty: {
								name: 'BWA',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'AZE',
							streams: 2,
							royalty: {
								name: 'AZE',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 97,
							royalty: {
								name: 'Streaming',
								value: -4.354489500000002,
								royaltyConverted: [
									{
										amount: -3.701316075000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6967.183200000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Girl Problem',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -2.550402499999999,
						royaltyConverted: [
							{
								amount: -2.167842124999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -4080.643999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 73,
					dspData: [
						{
							name: 'Spotify',
							streams: 73,
							royalty: {
								name: 'Spotify',
								value: -2.550402499999999,
								royaltyConverted: [
									{
										amount: -2.167842124999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4080.643999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'BWA',
							streams: 7,
							royalty: {
								name: 'BWA',
								value: -0.007124,
								royaltyConverted: [
									{
										amount: -0.0060554,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11.3984,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 21,
							royalty: {
								name: 'ZMB',
								value: -0.006922,
								royaltyConverted: [
									{
										amount: -0.0058837,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11.0752,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 4,
							royalty: {
								name: 'NAM',
								value: -0.004095,
								royaltyConverted: [
									{
										amount: -0.0034807499999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.552,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.003094,
								royaltyConverted: [
									{
										amount: -0.0026298999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9504,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BLR',
							streams: 22,
							royalty: {
								name: 'BLR',
								value: -0.00009,
								royaltyConverted: [
									{
										amount: -0.0000765,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.14400000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 4,
							royalty: {
								name: 'GEO',
								value: -0.00001,
								royaltyConverted: [
									{
										amount: -0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 3,
							royalty: {
								name: 'MUS',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 73,
							royalty: {
								name: 'Streaming',
								value: -2.550402499999999,
								royaltyConverted: [
									{
										amount: -2.167842124999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4080.643999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Philomina [Episode 1]',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.06218450000000001,
						royaltyConverted: [
							{
								amount: -0.05285682500000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -99.49520000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'If I Get Money Eh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000008,
						royaltyConverted: [
							{
								amount: -0.000006799999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.012799999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GEO',
							streams: 3,
							royalty: {
								name: 'GEO',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'If To Say I Be Girl Ehn',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Problem',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Shanowole',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'GOAT',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Phakama',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Pandemic',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Beginning',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Yama',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Relationship Be Like',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Nack Me',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Meaning of Love',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Girls',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Shatawalle',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'My Boo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Dem Go Hear Word',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			],
			_id: '67ffa832bb691d68c4468afc',
			createdAt: '2025-04-16T12:53:06.041Z',
			updatedAt: '2025-04-16T12:53:06.041Z',
			__v: 0
		},
		{
			userId: '67cefb10ccf45e5ddef7447a',
			artistName: 'Magnito',
			upcCode: '197077639230',
			isrcCode: 'QZWDD2203348',
			catalogueId: 'CAT707423',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'E.T.C',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -4.354489500000002,
						royaltyConverted: [
							{
								amount: -3.701316075000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -6967.183200000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 97,
					dspData: [
						{
							name: 'Spotify',
							streams: 96,
							royalty: {
								name: 'Spotify',
								value: -4.354502500000002,
								royaltyConverted: [
									{
										amount: -3.701327125000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6967.204000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: -0.626205,
								royaltyConverted: [
									{
										amount: -0.53227425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -1001.928,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 45,
							royalty: {
								name: 'ZMB',
								value: -0.010094,
								royaltyConverted: [
									{
										amount: -0.0085799,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -16.1504,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 9,
							royalty: {
								name: 'MLT',
								value: -0.004992,
								royaltyConverted: [
									{
										amount: -0.0042432,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -7.9872,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 4,
							royalty: {
								name: 'GEO',
								value: -0.004543,
								royaltyConverted: [
									{
										amount: -0.00386155,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -7.268800000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 6,
							royalty: {
								name: 'NAM',
								value: -0.004103,
								royaltyConverted: [
									{
										amount: -0.00348755,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.5648,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 16,
							royalty: {
								name: 'CIV',
								value: -0.003573,
								royaltyConverted: [
									{
										amount: -0.00303705,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.716799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 9,
							royalty: {
								name: 'MOZ',
								value: -0.003561,
								royaltyConverted: [
									{
										amount: -0.0030268499999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.6975999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: -0.003079,
								royaltyConverted: [
									{
										amount: -0.00261715,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9264,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: -0.003085,
								royaltyConverted: [
									{
										amount: -0.00262225,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.936,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 3,
							royalty: {
								name: 'BWA',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'AZE',
							streams: 2,
							royalty: {
								name: 'AZE',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 97,
							royalty: {
								name: 'Streaming',
								value: -4.354489500000002,
								royaltyConverted: [
									{
										amount: -3.701316075000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6967.183200000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Girl Problem',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -2.550402499999999,
						royaltyConverted: [
							{
								amount: -2.167842124999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -4080.643999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 73,
					dspData: [
						{
							name: 'Spotify',
							streams: 73,
							royalty: {
								name: 'Spotify',
								value: -2.550402499999999,
								royaltyConverted: [
									{
										amount: -2.167842124999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4080.643999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'BWA',
							streams: 7,
							royalty: {
								name: 'BWA',
								value: -0.007124,
								royaltyConverted: [
									{
										amount: -0.0060554,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11.3984,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 21,
							royalty: {
								name: 'ZMB',
								value: -0.006922,
								royaltyConverted: [
									{
										amount: -0.0058837,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -11.0752,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 4,
							royalty: {
								name: 'NAM',
								value: -0.004095,
								royaltyConverted: [
									{
										amount: -0.0034807499999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.552,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.003094,
								royaltyConverted: [
									{
										amount: -0.0026298999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9504,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BLR',
							streams: 22,
							royalty: {
								name: 'BLR',
								value: -0.00009,
								royaltyConverted: [
									{
										amount: -0.0000765,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.14400000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 4,
							royalty: {
								name: 'GEO',
								value: -0.00001,
								royaltyConverted: [
									{
										amount: -0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 3,
							royalty: {
								name: 'MUS',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 73,
							royalty: {
								name: 'Streaming',
								value: -2.550402499999999,
								royaltyConverted: [
									{
										amount: -2.167842124999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4080.643999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Philomina [Episode 1]',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.06218450000000001,
						royaltyConverted: [
							{
								amount: -0.05285682500000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -99.49520000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'If I Get Money Eh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000008,
						royaltyConverted: [
							{
								amount: -0.000006799999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.012799999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GEO',
							streams: 3,
							royalty: {
								name: 'GEO',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'If To Say I Be Girl Ehn',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Problem',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Shanowole',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'GOAT',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Phakama',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Pandemic',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Beginning',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Yama',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Relationship Be Like',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Nack Me',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Meaning of Love',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Girls',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Shatawalle',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'My Boo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Dem Go Hear Word',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Portable',
			upcCode: '197773557203',
			isrcCode: 'QZTV32368799',
			catalogueId: 'CAT891956',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'My Testimony',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -2.6686491,
						royaltyConverted: [
							{
								amount: -2.268351735,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -4269.83856,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 84,
					dspData: [
						{
							name: 'Spotify',
							streams: 84,
							royalty: {
								name: 'Spotify',
								value: -2.6686491,
								royaltyConverted: [
									{
										amount: -2.268351735,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4269.83856,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 18,
							royalty: {
								name: 'ZMB',
								value: -0.007612,
								royaltyConverted: [
									{
										amount: -0.0064702,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -12.1792,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 50,
							royalty: {
								name: 'CIV',
								value: -0.006797,
								royaltyConverted: [
									{
										amount: -0.00577745,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -10.8752,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.003817,
								royaltyConverted: [
									{
										amount: -0.00324445,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -6.1072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ALB',
							streams: 1,
							royalty: {
								name: 'ALB',
								value: -0.003081,
								royaltyConverted: [
									{
										amount: -0.00261885,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9296,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 2,
							royalty: {
								name: 'MUS',
								value: -0.0030919999999999997,
								royaltyConverted: [
									{
										amount: -0.0026282,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9472,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 3,
							royalty: {
								name: 'KAZ',
								value: -0.003082,
								royaltyConverted: [
									{
										amount: -0.0026197,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9312000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 6,
							royalty: {
								name: 'MLT',
								value: -0.000023,
								royaltyConverted: [
									{
										amount: -0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 3,
							royalty: {
								name: 'BWA',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 84,
							royalty: {
								name: 'Streaming',
								value: -2.6686491,
								royaltyConverted: [
									{
										amount: -2.268351735,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4269.83856,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Azaman',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00064,
						royaltyConverted: [
							{
								amount: -0.000544,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -1.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 179,
					dspData: [
						{
							name: 'Spotify',
							streams: 179,
							royalty: {
								name: 'Spotify',
								value: -0.00064,
								royaltyConverted: [
									{
										amount: -0.000544,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -1.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 115,
							royalty: {
								name: 'CIV',
								value: -0.000449,
								royaltyConverted: [
									{
										amount: -0.00038165,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.7184,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 21,
							royalty: {
								name: 'ZMB',
								value: -0.00005,
								royaltyConverted: [
									{
										amount: -0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 12,
							royalty: {
								name: 'MLT',
								value: -0.000046,
								royaltyConverted: [
									{
										amount: -0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 9,
							royalty: {
								name: 'MOZ',
								value: -0.000037,
								royaltyConverted: [
									{
										amount: -0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUN',
							streams: 7,
							royalty: {
								name: 'TUN',
								value: -0.000028,
								royaltyConverted: [
									{
										amount: -0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 7,
							royalty: {
								name: 'BWA',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 2,
							royalty: {
								name: 'GEO',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 4,
							royalty: {
								name: 'JAM',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 2,
							royalty: {
								name: 'MUS',
								value: 0.000004,
								royaltyConverted: [
									{
										amount: 0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 179,
							royalty: {
								name: 'Streaming',
								value: -0.00064,
								royaltyConverted: [
									{
										amount: -0.000544,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -1.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Am Not a Prisoner',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00033399999999999993,
						royaltyConverted: [
							{
								amount: -0.00028389999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.5343999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 127,
					dspData: [
						{
							name: 'Spotify',
							streams: 125,
							royalty: {
								name: 'Spotify',
								value: -0.0003599999999999999,
								royaltyConverted: [
									{
										amount: -0.0003059999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.5759999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 76,
							royalty: {
								name: 'CIV',
								value: -0.000296,
								royaltyConverted: [
									{
										amount: -0.0002516,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.47359999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 26,
							royalty: {
								name: 'ZMB',
								value: -0.00006,
								royaltyConverted: [
									{
										amount: -0.000051,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.096,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 9,
							royalty: {
								name: 'NAM',
								value: -0.000035,
								royaltyConverted: [
									{
										amount: -0.000029749999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.055999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 7,
							royalty: {
								name: 'MLT',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.000004,
								royaltyConverted: [
									{
										amount: -0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 2,
							royalty: {
								name: 'MUS',
								value: 0.000004,
								royaltyConverted: [
									{
										amount: 0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 2,
							royalty: {
								name: 'UKR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 127,
							royalty: {
								name: 'Streaming',
								value: -0.00033399999999999993,
								royaltyConverted: [
									{
										amount: -0.00028389999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.5343999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Apostle',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000275,
						royaltyConverted: [
							{
								amount: -0.00023375000000000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.44,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 102,
					dspData: [
						{
							name: 'Spotify',
							streams: 101,
							royalty: {
								name: 'Spotify',
								value: -0.000288,
								royaltyConverted: [
									{
										amount: -0.0002448,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.4608,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 71,
							royalty: {
								name: 'CIV',
								value: -0.000277,
								royaltyConverted: [
									{
										amount: -0.00023545,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.44320000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 11,
							royalty: {
								name: 'ZMB',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 6,
							royalty: {
								name: 'NAM',
								value: -0.000023,
								royaltyConverted: [
									{
										amount: -0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 3,
							royalty: {
								name: 'MLT',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 2,
							royalty: {
								name: 'BWA',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 4,
							royalty: {
								name: 'MUS',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 2,
							royalty: {
								name: 'UKR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 102,
							royalty: {
								name: 'Streaming',
								value: -0.000275,
								royaltyConverted: [
									{
										amount: -0.00023375000000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.44,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Money Before You Love',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00024599999999999996,
						royaltyConverted: [
							{
								amount: -0.00020909999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.39359999999999995,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 93,
					dspData: [
						{
							name: 'Spotify',
							streams: 91,
							royalty: {
								name: 'Spotify',
								value: -0.000271,
								royaltyConverted: [
									{
										amount: -0.00023034999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.4336,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 66,
							royalty: {
								name: 'CIV',
								value: -0.000257,
								royaltyConverted: [
									{
										amount: -0.00021845,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.4112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUN',
							streams: 5,
							royalty: {
								name: 'TUN',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 7,
							royalty: {
								name: 'ZMB',
								value: -0.000016,
								royaltyConverted: [
									{
										amount: -0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 4,
							royalty: {
								name: 'MLT',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 6,
							royalty: {
								name: 'MUS',
								value: 0.00001,
								royaltyConverted: [
									{
										amount: 0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 2,
							royalty: {
								name: 'MAR',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 93,
							royalty: {
								name: 'Streaming',
								value: -0.00024599999999999996,
								royaltyConverted: [
									{
										amount: -0.00020909999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.39359999999999995,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Clear',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00014100000000000004,
						royaltyConverted: [
							{
								amount: -0.00011985000000000003,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.22560000000000005,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 70,
					dspData: [
						{
							name: 'Spotify',
							streams: 70,
							royalty: {
								name: 'Spotify',
								value: -0.00014100000000000004,
								royaltyConverted: [
									{
										amount: -0.00011985000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.22560000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 48,
							royalty: {
								name: 'CIV',
								value: -0.000187,
								royaltyConverted: [
									{
										amount: -0.00015895,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.29919999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 7,
							royalty: {
								name: 'MLT',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 2,
							royalty: {
								name: 'GEO',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 4,
							royalty: {
								name: 'MUS',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 2,
							royalty: {
								name: 'KAZ',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ARM',
							streams: 1,
							royalty: {
								name: 'ARM',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 2,
							royalty: {
								name: 'UKR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 70,
							royalty: {
								name: 'Streaming',
								value: -0.00014100000000000004,
								royaltyConverted: [
									{
										amount: -0.00011985000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.22560000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Neighbor',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00006199999999999999,
						royaltyConverted: [
							{
								amount: -0.00005269999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.09919999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 33,
					dspData: [
						{
							name: 'Spotify',
							streams: 33,
							royalty: {
								name: 'Spotify',
								value: -0.00006199999999999999,
								royaltyConverted: [
									{
										amount: -0.00005269999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.09919999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 24,
							royalty: {
								name: 'CIV',
								value: -0.000095,
								royaltyConverted: [
									{
										amount: -0.00008075,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.152,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 5,
							royalty: {
								name: 'ZMB',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 33,
							royalty: {
								name: 'Streaming',
								value: -0.00006199999999999999,
								royaltyConverted: [
									{
										amount: -0.00005269999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.09919999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Plan B',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000032000000000000005,
						royaltyConverted: [
							{
								amount: -0.000027200000000000004,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.05120000000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 19,
					dspData: [
						{
							name: 'Spotify',
							streams: 19,
							royalty: {
								name: 'Spotify',
								value: -0.000032000000000000005,
								royaltyConverted: [
									{
										amount: -0.000027200000000000004,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05120000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 15,
							royalty: {
								name: 'CIV',
								value: -0.000059,
								royaltyConverted: [
									{
										amount: -0.00005015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0944,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 19,
							royalty: {
								name: 'Streaming',
								value: -0.000032000000000000005,
								royaltyConverted: [
									{
										amount: -0.000027200000000000004,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05120000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kosalabaro',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000011999999999999994,
						royaltyConverted: [
							{
								amount: -0.000010199999999999994,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.019199999999999988,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 22,
					dspData: [
						{
							name: 'Spotify',
							streams: 22,
							royalty: {
								name: 'Spotify',
								value: -0.000011999999999999994,
								royaltyConverted: [
									{
										amount: -0.000010199999999999994,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019199999999999988,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 15,
							royalty: {
								name: 'CIV',
								value: -0.000059,
								royaltyConverted: [
									{
										amount: -0.00005015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0944,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 22,
							royalty: {
								name: 'Streaming',
								value: -0.000011999999999999994,
								royaltyConverted: [
									{
										amount: -0.000010199999999999994,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019199999999999988,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Oro owo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000009999999999999996,
						royaltyConverted: [
							{
								amount: -0.000008499999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.015999999999999993,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 19,
					dspData: [
						{
							name: 'Spotify',
							streams: 17,
							royalty: {
								name: 'Spotify',
								value: -0.000035999999999999994,
								royaltyConverted: [
									{
										amount: -0.00003059999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05759999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 15,
							royalty: {
								name: 'CIV',
								value: -0.000059,
								royaltyConverted: [
									{
										amount: -0.00005015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0944,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 19,
							royalty: {
								name: 'Streaming',
								value: -0.000009999999999999996,
								royaltyConverted: [
									{
										amount: -0.000008499999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.015999999999999993,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ogo Forever',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000027,
						royaltyConverted: [
							{
								amount: 0.00002295,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.043199999999999995,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 25,
					dspData: [
						{
							name: 'Spotify',
							streams: 25,
							royalty: {
								name: 'Spotify',
								value: 0.000027,
								royaltyConverted: [
									{
										amount: 0.00002295,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.043199999999999995,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 13,
							royalty: {
								name: 'CIV',
								value: -0.000051,
								royaltyConverted: [
									{
										amount: -0.000043349999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 3,
							royalty: {
								name: 'ZMB',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 4,
							royalty: {
								name: 'EGY',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 25,
							royalty: {
								name: 'Streaming',
								value: 0.000027,
								royaltyConverted: [
									{
										amount: 0.00002295,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.043199999999999995,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Woto Woto',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000035999999999999994,
						royaltyConverted: [
							{
								amount: -0.00003059999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.05759999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 13,
					dspData: [
						{
							name: 'Spotify',
							streams: 13,
							royalty: {
								name: 'Spotify',
								value: -0.000035999999999999994,
								royaltyConverted: [
									{
										amount: -0.00003059999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05759999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 12,
							royalty: {
								name: 'CIV',
								value: -0.000047,
								royaltyConverted: [
									{
										amount: -0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 13,
							royalty: {
								name: 'Streaming',
								value: -0.000035999999999999994,
								royaltyConverted: [
									{
										amount: -0.00003059999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05759999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Bye to Sapa Nation',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000065,
						royaltyConverted: [
							{
								amount: 0.000055249999999999994,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.104,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 19,
					dspData: [
						{
							name: 'Spotify',
							streams: 17,
							royalty: {
								name: 'Spotify',
								value: 0.000039999999999999996,
								royaltyConverted: [
									{
										amount: 0.00003399999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 11,
							royalty: {
								name: 'CIV',
								value: -0.000043,
								royaltyConverted: [
									{
										amount: -0.00003655,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0688,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 1,
							royalty: {
								name: 'KHM',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 2,
							royalty: {
								name: 'MAR',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 19,
							royalty: {
								name: 'Streaming',
								value: 0.000065,
								royaltyConverted: [
									{
										amount: 0.000055249999999999994,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.104,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Get Money First',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000049,
						royaltyConverted: [
							{
								amount: 0.000041649999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0784,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 16,
					dspData: [
						{
							name: 'Spotify',
							streams: 16,
							royalty: {
								name: 'Spotify',
								value: 0.000049,
								royaltyConverted: [
									{
										amount: 0.000041649999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0784,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 11,
							royalty: {
								name: 'CIV',
								value: -0.000043,
								royaltyConverted: [
									{
										amount: -0.00003655,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0688,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 16,
							royalty: {
								name: 'Streaming',
								value: 0.000049,
								royaltyConverted: [
									{
										amount: 0.000041649999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0784,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Tambolo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000022000000000000003,
						royaltyConverted: [
							{
								amount: -0.0000187,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0352,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 12,
					dspData: [
						{
							name: 'Spotify',
							streams: 12,
							royalty: {
								name: 'Spotify',
								value: -0.000022000000000000003,
								royaltyConverted: [
									{
										amount: -0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 12,
							royalty: {
								name: 'Streaming',
								value: -0.000022000000000000003,
								royaltyConverted: [
									{
										amount: -0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Prayer',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000005999999999999997,
						royaltyConverted: [
							{
								amount: 0.000005099999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.009599999999999994,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 13,
					dspData: [
						{
							name: 'Spotify',
							streams: 13,
							royalty: {
								name: 'Spotify',
								value: 0.000005999999999999997,
								royaltyConverted: [
									{
										amount: 0.000005099999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.009599999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 13,
							royalty: {
								name: 'Streaming',
								value: 0.000005999999999999997,
								royaltyConverted: [
									{
										amount: 0.000005099999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.009599999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kuku Do Ritual',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000041,
						royaltyConverted: [
							{
								amount: 0.00003485,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0656,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 16,
					dspData: [
						{
							name: 'Spotify',
							streams: 14,
							royalty: {
								name: 'Spotify',
								value: -0.000005000000000000003,
								royaltyConverted: [
									{
										amount: -0.0000042500000000000025,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008000000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000033,
								royaltyConverted: [
									{
										amount: 0.00002805,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.05280000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LBY',
							streams: 1,
							royalty: {
								name: 'LBY',
								value: 0.000033,
								royaltyConverted: [
									{
										amount: 0.00002805,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.05280000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 16,
							royalty: {
								name: 'Streaming',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Shakara Oloje',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0000060000000000000035,
						royaltyConverted: [
							{
								amount: -0.000005100000000000003,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.009600000000000006,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 13,
					dspData: [
						{
							name: 'Spotify',
							streams: 13,
							royalty: {
								name: 'Spotify',
								value: -0.0000060000000000000035,
								royaltyConverted: [
									{
										amount: -0.000005100000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.009600000000000006,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 10,
							royalty: {
								name: 'CIV',
								value: -0.00004,
								royaltyConverted: [
									{
										amount: -0.000034,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 3,
							royalty: {
								name: 'LUX',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 13,
							royalty: {
								name: 'Streaming',
								value: -0.0000060000000000000035,
								royaltyConverted: [
									{
										amount: -0.000005100000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.009600000000000006,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Expensive OG',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 16,
					dspData: [
						{
							name: 'Spotify',
							streams: 16,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 9,
							royalty: {
								name: 'CIV',
								value: -0.000036,
								royaltyConverted: [
									{
										amount: -0.0000306,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0576,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 3,
							royalty: {
								name: 'MAR',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 16,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Omo Olohun Wahala',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000057999999999999994,
						royaltyConverted: [
							{
								amount: 0.00004929999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0928,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 14,
					dspData: [
						{
							name: 'Spotify',
							streams: 13,
							royalty: {
								name: 'Spotify',
								value: 0.000044999999999999996,
								royaltyConverted: [
									{
										amount: 0.000038249999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 9,
							royalty: {
								name: 'CIV',
								value: -0.000036,
								royaltyConverted: [
									{
										amount: -0.0000306,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0576,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 3,
							royalty: {
								name: 'LUX',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 14,
							royalty: {
								name: 'Streaming',
								value: 0.000057999999999999994,
								royaltyConverted: [
									{
										amount: 0.00004929999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0928,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Jagaban',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000010999999999999998,
						royaltyConverted: [
							{
								amount: 0.000009349999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.017599999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 12,
					dspData: [
						{
							name: 'Spotify',
							streams: 11,
							royalty: {
								name: 'Spotify',
								value: -0.000002000000000000001,
								royaltyConverted: [
									{
										amount: -0.0000017000000000000009,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.003200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 9,
							royalty: {
								name: 'CIV',
								value: -0.000036,
								royaltyConverted: [
									{
										amount: -0.0000306,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0576,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 12,
							royalty: {
								name: 'Streaming',
								value: 0.000010999999999999998,
								royaltyConverted: [
									{
										amount: 0.000009349999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.017599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Agbara',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000039999999999999996,
						royaltyConverted: [
							{
								amount: 0.00003399999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.064,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 13,
					dspData: [
						{
							name: 'Spotify',
							streams: 12,
							royalty: {
								name: 'Spotify',
								value: 0.0000029999999999999984,
								royaltyConverted: [
									{
										amount: 0.0000025499999999999985,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.004799999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 8,
							royalty: {
								name: 'CIV',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 3,
							royalty: {
								name: 'LUX',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'SEN',
							streams: 1,
							royalty: {
								name: 'SEN',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 13,
							royalty: {
								name: 'Streaming',
								value: 0.000039999999999999996,
								royaltyConverted: [
									{
										amount: 0.00003399999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.064,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Gasolo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000032,
						royaltyConverted: [
							{
								amount: -0.000027199999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.051199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 8,
					dspData: [
						{
							name: 'Spotify',
							streams: 8,
							royalty: {
								name: 'Spotify',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 8,
							royalty: {
								name: 'CIV',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 8,
							royalty: {
								name: 'Streaming',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Cruise Lanje',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000018,
						royaltyConverted: [
							{
								amount: 0.0000153,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0288,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 11,
					dspData: [
						{
							name: 'Spotify',
							streams: 10,
							royalty: {
								name: 'Spotify',
								value: -0.000008999999999999999,
								royaltyConverted: [
									{
										amount: -0.000007649999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.014399999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000027,
								royaltyConverted: [
									{
										amount: 0.00002295,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.043199999999999995,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 8,
							royalty: {
								name: 'CIV',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KEN',
							streams: 1,
							royalty: {
								name: 'KEN',
								value: 0.000027,
								royaltyConverted: [
									{
										amount: 0.00002295,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.043199999999999995,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 11,
							royalty: {
								name: 'Streaming',
								value: 0.000018,
								royaltyConverted: [
									{
										amount: 0.0000153,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0288,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ika',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000022999999999999997,
						royaltyConverted: [
							{
								amount: 0.000019549999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.03679999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: 0.000022999999999999997,
								royaltyConverted: [
									{
										amount: 0.000019549999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.03679999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 6,
							royalty: {
								name: 'CIV',
								value: -0.000024,
								royaltyConverted: [
									{
										amount: -0.0000204,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.038400000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: 0.000022999999999999997,
								royaltyConverted: [
									{
										amount: 0.000019549999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.03679999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Grateful',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00002,
						royaltyConverted: [
							{
								amount: -0.000017,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.032,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Werey Alasho',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000009000000000000002,
						royaltyConverted: [
							{
								amount: -0.000007650000000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.014400000000000003,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: -0.000009000000000000002,
								royaltyConverted: [
									{
										amount: -0.000007650000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.014400000000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: -0.000009000000000000002,
								royaltyConverted: [
									{
										amount: -0.000007650000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.014400000000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Odogwu Bitters',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000068,
						royaltyConverted: [
							{
								amount: 0.000057799999999999995,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.1088,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 11,
					dspData: [
						{
							name: 'Spotify',
							streams: 11,
							royalty: {
								name: 'Spotify',
								value: 0.000068,
								royaltyConverted: [
									{
										amount: 0.000057799999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.1088,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 2,
							royalty: {
								name: 'LUX',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 11,
							royalty: {
								name: 'Streaming',
								value: 0.000068,
								royaltyConverted: [
									{
										amount: 0.000057799999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.1088,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Adura',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000001999999999999998,
						royaltyConverted: [
							{
								amount: 0.0000016999999999999981,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0031999999999999963,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: 0.000001999999999999998,
								royaltyConverted: [
									{
										amount: 0.0000016999999999999981,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0031999999999999963,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 2,
							royalty: {
								name: 'MAR',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: 0.000001999999999999998,
								royaltyConverted: [
									{
										amount: 0.0000016999999999999981,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0031999999999999963,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Wonmo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00002,
						royaltyConverted: [
							{
								amount: -0.000017,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.032,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Street ti Take Over',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000015,
						royaltyConverted: [
							{
								amount: -0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Gberatan',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000093,
						royaltyConverted: [
							{
								amount: 0.00007905,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.1488,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 10,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: 0.000042999999999999995,
								royaltyConverted: [
									{
										amount: 0.000036549999999999994,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.06879999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 4,
							royalty: {
								name: 'TIDAL',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 4,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 10,
							royalty: {
								name: 'Streaming',
								value: 0.000093,
								royaltyConverted: [
									{
										amount: 0.00007905,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.1488,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Mosa Funaiye',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000008000000000000001,
						royaltyConverted: [
							{
								amount: -0.000006800000000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.012800000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.000008000000000000001,
								royaltyConverted: [
									{
										amount: -0.000006800000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012800000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.000008000000000000001,
								royaltyConverted: [
									{
										amount: -0.000006800000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012800000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Hello Baby',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000015,
						royaltyConverted: [
							{
								amount: -0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ojabo kofo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000013,
						royaltyConverted: [
							{
								amount: 0.00001105,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kayamanta',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000011999999999999999,
						royaltyConverted: [
							{
								amount: 0.000010199999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0192,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.000004000000000000001,
								royaltyConverted: [
									{
										amount: -0.0000034000000000000005,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.006400000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.000011999999999999999,
								royaltyConverted: [
									{
										amount: 0.000010199999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0192,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Oluwa Where You Dey',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000015,
						royaltyConverted: [
							{
								amount: -0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Anonymous Eyon Pablo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000002000000000000001,
						royaltyConverted: [
							{
								amount: -0.0000017000000000000009,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.003200000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.000002000000000000001,
								royaltyConverted: [
									{
										amount: -0.0000017000000000000009,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.003200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'All Eyes On Me',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000007,
						royaltyConverted: [
							{
								amount: 0.00000595,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0112,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Papangolo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: "O'Blow Cruise Beat",
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Folohunsho',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Soro Soro',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'My way',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Amaka',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000046,
						royaltyConverted: [
							{
								amount: 0.0000391,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0736,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 2,
							royalty: {
								name: 'TUR',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'sexyshay',
			upcCode: '197077637090',
			isrcCode: 'QZWDD2202906',
			catalogueId: 'CAT707166',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Format',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.4599793000000001,
						royaltyConverted: [
							{
								amount: -0.3909824050000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -735.9668800000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: -0.4599793000000001,
								royaltyConverted: [
									{
										amount: -0.3909824050000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -735.9668800000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 3,
							royalty: {
								name: 'MAR',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: -0.4599793000000001,
								royaltyConverted: [
									{
										amount: -0.3909824050000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -735.9668800000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Reflex Soundz, Oga Sabinus',
			upcCode: '197077528817',
			isrcCode: 'QZTV32222050',
			catalogueId: 'CAT701439',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Rubberband',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.4441549000000001,
						royaltyConverted: [
							{
								amount: -0.37753166500000007,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -710.6478400000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 12,
					dspData: [
						{
							name: 'Spotify',
							streams: 12,
							royalty: {
								name: 'Spotify',
								value: -0.4441549000000001,
								royaltyConverted: [
									{
										amount: -0.37753166500000007,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -710.6478400000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 8,
							royalty: {
								name: 'ZMB',
								value: -0.007923,
								royaltyConverted: [
									{
										amount: -0.00673455,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -12.6768,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 1,
							royalty: {
								name: 'KHM',
								value: -0.003084,
								royaltyConverted: [
									{
										amount: -0.0026214,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9344,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: -0.003085,
								royaltyConverted: [
									{
										amount: -0.00262225,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.936,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: -0.003093,
								royaltyConverted: [
									{
										amount: -0.00262905,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.948799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 12,
							royalty: {
								name: 'Streaming',
								value: -0.4441549000000001,
								royaltyConverted: [
									{
										amount: -0.37753166500000007,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -710.6478400000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Mamame, Portable',
			upcCode: '197077101102',
			isrcCode: 'GBWUL2215437',
			catalogueId: 'CAT668652',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Shalaye',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.24588240000000003,
						royaltyConverted: [
							{
								amount: -0.20900004000000003,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -393.41184000000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 21,
					dspData: [
						{
							name: 'Spotify',
							streams: 21,
							royalty: {
								name: 'Spotify',
								value: -0.24588240000000003,
								royaltyConverted: [
									{
										amount: -0.20900004000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -393.41184000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 16,
							royalty: {
								name: 'CIV',
								value: -0.003573,
								royaltyConverted: [
									{
										amount: -0.00303705,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.716799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 1,
							royalty: {
								name: 'KHM',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 21,
							royalty: {
								name: 'Streaming',
								value: -0.24588240000000003,
								royaltyConverted: [
									{
										amount: -0.20900004000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -393.41184000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Agaga',
			upcCode: '195729710108',
			isrcCode: 'USLZJ2283257',
			catalogueId: 'CAT633432',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: "One Assignment 'Owo'",
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.20701050000000001,
						royaltyConverted: [
							{
								amount: -0.17595892500000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -331.21680000000003,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: -0.20701050000000001,
								royaltyConverted: [
									{
										amount: -0.17595892500000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -331.21680000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: -0.003079,
								royaltyConverted: [
									{
										amount: -0.00261715,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9264,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 6,
							royalty: {
								name: 'CIV',
								value: -0.000024,
								royaltyConverted: [
									{
										amount: -0.0000204,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.038400000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: -0.20701050000000001,
								royaltyConverted: [
									{
										amount: -0.17595892500000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -331.21680000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Emilokan',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ijo Cruise',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Badoo Na Baba',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Jaa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00008099999999999999,
						royaltyConverted: [
							{
								amount: 0.00006884999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.1296,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000035,
								royaltyConverted: [
									{
										amount: 0.000029749999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.055999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000035,
								royaltyConverted: [
									{
										amount: 0.000029749999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.055999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 2,
							royalty: {
								name: 'TUR',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.00008099999999999999,
								royaltyConverted: [
									{
										amount: 0.00006884999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.1296,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Agaga',
			upcCode: '195729710108',
			isrcCode: 'USLZJ2283257',
			catalogueId: 'CAT633432',
			activityPeriod: 'Jul-23',
			fullReports: [
				{
					trackTitle: "One Assignment 'Owo'",
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000003,
						royaltyConverted: [
							{
								amount: 0.00000255,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0048000000000000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Soundcloud Subscription',
							streams: 1,
							royalty: {
								name: 'Soundcloud Subscription',
								value: 0.000003,
								royaltyConverted: [
									{
										amount: 0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ESP',
							streams: 1,
							royalty: {
								name: 'ESP',
								value: 0.000003,
								royaltyConverted: [
									{
										amount: 0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000003,
								royaltyConverted: [
									{
										amount: 0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: '2tboyz',
			upcCode: '197077702347',
			isrcCode: 'QZWDD2227541',
			catalogueId: 'CAT712684',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Carry Me Dey Go',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.23259120000000003,
						royaltyConverted: [
							{
								amount: -0.19770252000000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -372.14592000000005,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 8,
					dspData: [
						{
							name: 'Spotify',
							streams: 8,
							royalty: {
								name: 'Spotify',
								value: -0.23259120000000003,
								royaltyConverted: [
									{
										amount: -0.19770252000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -372.14592000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: -0.0030830000000000002,
								royaltyConverted: [
									{
										amount: -0.00262055,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9328,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 8,
							royalty: {
								name: 'Streaming',
								value: -0.23259120000000003,
								royaltyConverted: [
									{
										amount: -0.19770252000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -372.14592000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Ty Tizzle',
			upcCode: '197077424485',
			isrcCode: 'QZTRX2267826',
			catalogueId: 'CAT694030',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Owo Epo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.1858251,
						royaltyConverted: [
							{
								amount: -0.157951335,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -297.32016,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: -0.1858251,
								royaltyConverted: [
									{
										amount: -0.157951335,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -297.32016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: -0.0030700000000000002,
								royaltyConverted: [
									{
										amount: -0.0026095000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.912000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: -0.1858251,
								royaltyConverted: [
									{
										amount: -0.157951335,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -297.32016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Spirit Okooku',
			upcCode: '197077305869',
			isrcCode: 'GBWUL2298360',
			catalogueId: 'CAT684298',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Egbon Kogbagidi',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.1291079,
						royaltyConverted: [
							{
								amount: -0.10974171499999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -206.57264,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.1291079,
								royaltyConverted: [
									{
										amount: -0.10974171499999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -206.57264,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.1291079,
								royaltyConverted: [
									{
										amount: -0.10974171499999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -206.57264,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Time',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.011415000000000002,
						royaltyConverted: [
							{
								amount: -0.009702750000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -18.264000000000003,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Happiness Is Free Beat',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000012,
						royaltyConverted: [
							{
								amount: 0.0000102,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.019200000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Expensive Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000001,
						royaltyConverted: [
							{
								amount: -8.499999999999999e-7,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0015999999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Oriyomi Nba',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000013,
						royaltyConverted: [
							{
								amount: 0.00001105,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Street OT',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Big Vibes Mixtape Volume 2',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Online Lowa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000051,
						royaltyConverted: [
							{
								amount: 0.000043349999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0816,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000051,
								royaltyConverted: [
									{
										amount: 0.000043349999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.000051,
								royaltyConverted: [
									{
										amount: 0.000043349999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Pay Day',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000037,
						royaltyConverted: [
							{
								amount: 0.00003145,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.059199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'SEN',
							streams: 1,
							royalty: {
								name: 'SEN',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Lezcout Wrld',
			upcCode: '197368881065',
			isrcCode: 'GBRKQ2386118',
			catalogueId: 'CAT831016',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Abacha',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.21890800000000005,
						royaltyConverted: [
							{
								amount: -0.18607180000000004,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -350.2528000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: -0.21890800000000005,
								royaltyConverted: [
									{
										amount: -0.18607180000000004,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -350.2528000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.007894,
								royaltyConverted: [
									{
										amount: -0.0067098999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -12.6304,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 2,
							royalty: {
								name: 'MDA',
								value: -0.003077,
								royaltyConverted: [
									{
										amount: -0.0026154499999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9232,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: -0.21890800000000005,
								royaltyConverted: [
									{
										amount: -0.18607180000000004,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -350.2528000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Love Yourself',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0030548,
						royaltyConverted: [
							{
								amount: -0.00259658,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -4.88768,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Olamzzy',
			upcCode: '197368155180',
			isrcCode: 'QZ5FN2331299',
			catalogueId: 'CAT758832',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Omo Lile',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.16385090000000005,
						royaltyConverted: [
							{
								amount: -0.13927326500000003,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -262.1614400000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: -0.16385090000000005,
								royaltyConverted: [
									{
										amount: -0.13927326500000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -262.1614400000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: -0.003073,
								royaltyConverted: [
									{
										amount: -0.0026120500000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9168,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: -0.16385090000000005,
								royaltyConverted: [
									{
										amount: -0.13927326500000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -262.1614400000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Orin Hallelujah',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0978779,
						royaltyConverted: [
							{
								amount: -0.083196215,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -156.60464000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.0978779,
								royaltyConverted: [
									{
										amount: -0.083196215,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -156.60464000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.003439,
								royaltyConverted: [
									{
										amount: -0.0029231500000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -5.502400000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: -0.0978779,
								royaltyConverted: [
									{
										amount: -0.083196215,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -156.60464000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'No Forget',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00009999999999999999,
						royaltyConverted: [
							{
								amount: 0.00008499999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.15999999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: 0.00009999999999999999,
								royaltyConverted: [
									{
										amount: 0.00008499999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.15999999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 3,
							royalty: {
								name: 'MAR',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 2,
							royalty: {
								name: 'TUR',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: 0.00009999999999999999,
								royaltyConverted: [
									{
										amount: 0.00008499999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.15999999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Sure Guy',
			upcCode: '197773106944',
			isrcCode: 'GBWUL2373526',
			catalogueId: 'CAT854103',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Marital Status',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.12816969999999997,
						royaltyConverted: [
							{
								amount: -0.10894424499999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -205.07151999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: -0.12818269999999998,
								royaltyConverted: [
									{
										amount: -0.10895529499999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -205.09231999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: -0.012627,
								royaltyConverted: [
									{
										amount: -0.01073295,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -20.2032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: -0.0030859999999999998,
								royaltyConverted: [
									{
										amount: -0.0026230999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9376,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.12816969999999997,
								royaltyConverted: [
									{
										amount: -0.10894424499999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -205.07151999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'S Brown',
			upcCode: '197077899993',
			isrcCode: 'QZWDD2296469',
			catalogueId: 'CAT732198',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Wokilumo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.07473649999999998,
						royaltyConverted: [
							{
								amount: -0.06352602499999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -119.57839999999997,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Abuga',
			upcCode: '197077983081',
			isrcCode: 'QZWDE2235319',
			catalogueId: 'CAT739980',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Werey Onijo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.07727780000000002,
						royaltyConverted: [
							{
								amount: -0.06568613000000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -123.64448000000003,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.07728580000000002,
								royaltyConverted: [
									{
										amount: -0.06569293000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -123.65728000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000008,
								royaltyConverted: [
									{
										amount: 0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000008,
								royaltyConverted: [
									{
										amount: 0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: -0.07727780000000002,
								royaltyConverted: [
									{
										amount: -0.06568613000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -123.64448000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ise Olohun',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000029,
						royaltyConverted: [
							{
								amount: 0.00002465,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0464,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Alimi',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000074,
						royaltyConverted: [
							{
								amount: 0.0000629,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.11839999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 5,
							royalty: {
								name: 'EGY',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ASM',
							streams: 1,
							royalty: {
								name: 'ASM',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.000074,
								royaltyConverted: [
									{
										amount: 0.0000629,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.11839999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'MOB',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000041,
						royaltyConverted: [
							{
								amount: 0.00003485,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0656,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUN',
							streams: 1,
							royalty: {
								name: 'TUN',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Kamba',
			upcCode: '197773055082',
			isrcCode: 'GBWUL2349052',
			catalogueId: 'CAT848050',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Sapa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0679393,
						royaltyConverted: [
							{
								amount: -0.057748404999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -108.70288,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Agaga, Qdot, Elelpdbeat',
			upcCode: '197077403121',
			isrcCode: 'QZTRX2246904',
			catalogueId: 'CAT692336',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Jaa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0887711,
						royaltyConverted: [
							{
								amount: -0.075455435,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -142.03376,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'DZA',
							streams: 1,
							royalty: {
								name: 'DZA',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.0887711,
								royaltyConverted: [
									{
										amount: -0.075455435,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -142.03376,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Byncon Ghizzle',
			upcCode: '197368516080',
			isrcCode: 'USLZJ2365984',
			catalogueId: 'CAT797520',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Gbo Nkan Nkan (Can�t hear)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0975175,
						royaltyConverted: [
							{
								amount: -0.08288987499999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -156.028,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Topshine',
			upcCode: '197077702439',
			isrcCode: 'QZWDD2227554',
			catalogueId: 'CAT712695',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'AFSA',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.1694823,
						royaltyConverted: [
							{
								amount: -0.144059955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -271.17168,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: -0.1694823,
								royaltyConverted: [
									{
										amount: -0.144059955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -271.17168,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: -0.0030629999999999998,
								royaltyConverted: [
									{
										amount: -0.0026035499999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.900799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 6,
							royalty: {
								name: 'ZMB',
								value: -0.003109,
								royaltyConverted: [
									{
										amount: -0.00264265,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.974399999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: -0.1694823,
								royaltyConverted: [
									{
										amount: -0.144059955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -271.17168,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Winner Circle',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.01579,
						royaltyConverted: [
							{
								amount: -0.013421499999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -25.263999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Time',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0284333,
						royaltyConverted: [
							{
								amount: -0.024168305,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -45.493280000000006,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Smart BTC',
			upcCode: '197773031888',
			isrcCode: 'GBWUL2340398',
			catalogueId: 'CAT845336',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Olopa Tinbor',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.1467774,
						royaltyConverted: [
							{
								amount: -0.12476079,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -234.84384,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: -0.1467774,
								royaltyConverted: [
									{
										amount: -0.12476079,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -234.84384,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'UKR',
							streams: 1,
							royalty: {
								name: 'UKR',
								value: -0.0030859999999999998,
								royaltyConverted: [
									{
										amount: -0.0026230999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9376,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: -0.1467774,
								royaltyConverted: [
									{
										amount: -0.12476079,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -234.84384,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Young God',
			upcCode: '197368492728',
			isrcCode: 'USLZJ2353954',
			catalogueId: 'CAT794979',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Unlimited',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.10826409999999999,
						royaltyConverted: [
							{
								amount: -0.09202448499999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -173.22256,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Run Am',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.1015856,
						royaltyConverted: [
							{
								amount: -0.08634776,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -162.53696,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Aye',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0642033,
						royaltyConverted: [
							{
								amount: -0.054572805,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -102.72528000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.0642033,
								royaltyConverted: [
									{
										amount: -0.054572805,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -102.72528000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.0642033,
								royaltyConverted: [
									{
										amount: -0.054572805,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -102.72528000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Fizzy Mayur',
			upcCode: '197077912937',
			isrcCode: 'QZWDE2201962',
			catalogueId: 'CAT733411',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ajeh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0653835,
						royaltyConverted: [
							{
								amount: -0.05557597499999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -104.61359999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Oluwaplenty',
			upcCode: '197077455298',
			isrcCode: 'QZTRX2280106',
			catalogueId: 'CAT696843',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ika',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.04650310000000001,
						royaltyConverted: [
							{
								amount: -0.03952763500000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -74.40496000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Pure Gold',
			upcCode: '197368217598',
			isrcCode: 'QZ5FN2351559',
			catalogueId: 'CAT765081',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Okwe (The Game)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.10064960000000002,
						royaltyConverted: [
							{
								amount: -0.08555216000000002,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -161.03936000000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: -0.10064960000000002,
								royaltyConverted: [
									{
										amount: -0.08555216000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -161.03936000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: -0.0030700000000000002,
								royaltyConverted: [
									{
										amount: -0.0026095000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.912000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 2,
							royalty: {
								name: 'BWA',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: -0.10064960000000002,
								royaltyConverted: [
									{
										amount: -0.08555216000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -161.03936000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'DJ OP Dot',
			upcCode: '197773418900',
			isrcCode: 'QZTV32306252',
			catalogueId: 'CAT881239',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: '1 Hour Amapiano',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.019524,
						royaltyConverted: [
							{
								amount: -0.0165954,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -31.2384,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: -0.019524,
								royaltyConverted: [
									{
										amount: -0.0165954,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -31.2384,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: -0.019524,
								royaltyConverted: [
									{
										amount: -0.0165954,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -31.2384,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Best Of Seyi Vibez 2.0',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000041,
						royaltyConverted: [
							{
								amount: 0.00003485,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0656,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 6,
							royalty: {
								name: 'EGY',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Best Of Asake, Ajesings, Seyi Vibez',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000043,
						royaltyConverted: [
							{
								amount: 0.00003655,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0688,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.00003,
								royaltyConverted: [
									{
										amount: 0.0000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.048,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000043,
								royaltyConverted: [
									{
										amount: 0.00003655,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0688,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Best Of Otega',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000049999999999999996,
						royaltyConverted: [
							{
								amount: 0.000042499999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.07999999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000049999999999999996,
								royaltyConverted: [
									{
										amount: 0.000042499999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: 0.000049999999999999996,
								royaltyConverted: [
									{
										amount: 0.000042499999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Mazanjiyabaah',
			upcCode: '195729862562',
			isrcCode: 'GBRKQ2232906',
			catalogueId: 'CAT647345',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Wetin Dey Occur',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0516269,
						royaltyConverted: [
							{
								amount: -0.043882865,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -82.60304000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.0516269,
								royaltyConverted: [
									{
										amount: -0.043882865,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -82.60304000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: -0.0030830000000000002,
								royaltyConverted: [
									{
										amount: -0.00262055,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9328,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.0516269,
								royaltyConverted: [
									{
										amount: -0.043882865,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -82.60304000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Reflex Soundz',
			upcCode: '649964949644',
			isrcCode: 'UK3AZ1922747',
			catalogueId: 'CAT620461',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Dangote',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.015653,
						royaltyConverted: [
							{
								amount: -0.01330505,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -25.044800000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.015653,
								royaltyConverted: [
									{
										amount: -0.01330505,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -25.044800000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.015653,
								royaltyConverted: [
									{
										amount: -0.01330505,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -25.044800000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Emi Lo Kan (Baba wey no well)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.030763799999999997,
						royaltyConverted: [
							{
								amount: -0.026149229999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -49.22208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Agbado Riddim',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000041,
						royaltyConverted: [
							{
								amount: 0.00003485,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0656,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 3,
							royalty: {
								name: 'GHA',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000041,
								royaltyConverted: [
									{
										amount: 0.00003485,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0656,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Ketchup',
			upcCode: '632181480441',
			isrcCode: 'UK3AZ1513096',
			catalogueId: 'CAT829492',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Baby Paulina',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0733459,
						royaltyConverted: [
							{
								amount: -0.062344015,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -117.35344,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: -0.0733459,
								royaltyConverted: [
									{
										amount: -0.062344015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -117.35344,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MOZ',
							streams: 5,
							royalty: {
								name: 'MOZ',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: -0.0733459,
								royaltyConverted: [
									{
										amount: -0.062344015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -117.35344,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Influence',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0697334,
						royaltyConverted: [
							{
								amount: -0.05927339,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -111.57344,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Big Daddy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.057559000000000006,
						royaltyConverted: [
							{
								amount: -0.04892515,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -92.09440000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.057559000000000006,
								royaltyConverted: [
									{
										amount: -0.04892515,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -92.09440000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: -0.003093,
								royaltyConverted: [
									{
										amount: -0.00262905,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.948799999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.057559000000000006,
								royaltyConverted: [
									{
										amount: -0.04892515,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -92.09440000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Trippin',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.03429189999999999,
						royaltyConverted: [
							{
								amount: -0.029148114999999992,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -54.86703999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Enjoy Yourself',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.042659,
						royaltyConverted: [
							{
								amount: -0.03626015,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -68.2544,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Holy Mic',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.033151999999999994,
						royaltyConverted: [
							{
								amount: -0.028179199999999995,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -53.04319999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: -0.033151999999999994,
								royaltyConverted: [
									{
										amount: -0.028179199999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -53.04319999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: -0.033151999999999994,
								royaltyConverted: [
									{
										amount: -0.028179199999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -53.04319999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Alakoba',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.018288,
						royaltyConverted: [
							{
								amount: -0.0155448,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -29.260799999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Pam Pam',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00006300000000000001,
						royaltyConverted: [
							{
								amount: -0.00005355000000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.10080000000000003,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 60,
					dspData: [
						{
							name: 'Spotify',
							streams: 60,
							royalty: {
								name: 'Spotify',
								value: -0.00006300000000000001,
								royaltyConverted: [
									{
										amount: -0.00005355000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.10080000000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 21,
							royalty: {
								name: 'ZMB',
								value: -0.00005,
								royaltyConverted: [
									{
										amount: -0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 9,
							royalty: {
								name: 'BWA',
								value: -0.000033,
								royaltyConverted: [
									{
										amount: -0.00002805,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.05280000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CUW',
							streams: 5,
							royalty: {
								name: 'CUW',
								value: -0.000013,
								royaltyConverted: [
									{
										amount: -0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 21,
							royalty: {
								name: 'JAM',
								value: -0.000011,
								royaltyConverted: [
									{
										amount: -0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.000004,
								royaltyConverted: [
									{
										amount: -0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 2,
							royalty: {
								name: 'BGD',
								value: 0.000043,
								royaltyConverted: [
									{
										amount: 0.00003655,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0688,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 60,
							royalty: {
								name: 'Streaming',
								value: -0.00006300000000000001,
								royaltyConverted: [
									{
										amount: -0.00005355000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.10080000000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Pam Pam (Ugandan Remix)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000019999999999999998,
						royaltyConverted: [
							{
								amount: -0.000016999999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.032,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 8,
					dspData: [
						{
							name: 'Spotify',
							streams: 8,
							royalty: {
								name: 'Spotify',
								value: -0.000019999999999999998,
								royaltyConverted: [
									{
										amount: -0.000016999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 5,
							royalty: {
								name: 'ZMB',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'CUW',
							streams: 3,
							royalty: {
								name: 'CUW',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 8,
							royalty: {
								name: 'Streaming',
								value: -0.000019999999999999998,
								royaltyConverted: [
									{
										amount: -0.000016999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'She Issa Flirt',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00007400000000000001,
						royaltyConverted: [
							{
								amount: 0.00006290000000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.11840000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: 0.00007400000000000001,
								royaltyConverted: [
									{
										amount: 0.00006290000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.11840000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'PAK',
							streams: 1,
							royalty: {
								name: 'PAK',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.00007400000000000001,
								royaltyConverted: [
									{
										amount: 0.00006290000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.11840000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Coco Banana',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000021,
						royaltyConverted: [
							{
								amount: 0.00001785,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0336,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000021,
								royaltyConverted: [
									{
										amount: 0.00001785,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0336,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: 0.000021,
								royaltyConverted: [
									{
										amount: 0.00001785,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0336,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Sweet',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000003,
						royaltyConverted: [
							{
								amount: -0.00000255,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0048000000000000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Bedroom Calypso',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000037,
						royaltyConverted: [
							{
								amount: 0.00003145,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.059199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NIC',
							streams: 1,
							royalty: {
								name: 'NIC',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Baby Oh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Skibodeh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Snazzygrin',
			upcCode: '197077176285',
			isrcCode: 'GBWUL2244674',
			catalogueId: 'CAT675180',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Who be your Guy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.023645899999999997,
						royaltyConverted: [
							{
								amount: -0.020099014999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -37.833439999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: -0.023645899999999997,
								royaltyConverted: [
									{
										amount: -0.020099014999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -37.833439999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 3,
							royalty: {
								name: 'GHA',
								value: -0.003061,
								royaltyConverted: [
									{
										amount: -0.0026018499999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.8976,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: -0.023645899999999997,
								royaltyConverted: [
									{
										amount: -0.020099014999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -37.833439999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Wavy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0201908,
						royaltyConverted: [
							{
								amount: -0.01716218,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -32.305279999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Honestly',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'How Many Songs',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Calm Down',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Gossip (refix)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Iju Tiger',
			upcCode: '197077788853',
			isrcCode: 'QZWDD2263856',
			catalogueId: 'CAT721406',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Owo Ope',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.007321,
						royaltyConverted: [
							{
								amount: -0.00622285,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -11.7136,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				},
				{
					trackTitle: 'Odogwu Mara',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000029,
						royaltyConverted: [
							{
								amount: 0.00002465,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0464,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'PAK',
							streams: 1,
							royalty: {
								name: 'PAK',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Tansho',
			upcCode: '197368988863',
			isrcCode: 'GBWUL2321683',
			catalogueId: 'CAT841289',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Odomi Cruise Beat',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0181271,
						royaltyConverted: [
							{
								amount: -0.015408035,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -29.00336,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.0181271,
								royaltyConverted: [
									{
										amount: -0.015408035,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -29.00336,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: -0.0030830000000000002,
								royaltyConverted: [
									{
										amount: -0.00262055,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9328,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.0181271,
								royaltyConverted: [
									{
										amount: -0.015408035,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -29.00336,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ghost Street Freebeat',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000124,
						royaltyConverted: [
							{
								amount: 0.0001054,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.19840000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 15,
					dspData: [
						{
							name: 'Spotify',
							streams: 13,
							royalty: {
								name: 'Spotify',
								value: 0.000049,
								royaltyConverted: [
									{
										amount: 0.000041649999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0784,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 2,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000075,
								royaltyConverted: [
									{
										amount: 0.00006374999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.12,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 6,
							royalty: {
								name: 'ZMB',
								value: -0.000014,
								royaltyConverted: [
									{
										amount: -0.0000119,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0224,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 3,
							royalty: {
								name: 'MLT',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 1,
							royalty: {
								name: 'MDA',
								value: 0.00001,
								royaltyConverted: [
									{
										amount: 0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 2,
							royalty: {
								name: 'MAR',
								value: 0.000039,
								royaltyConverted: [
									{
										amount: 0.00003315,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0624,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZWE',
							streams: 1,
							royalty: {
								name: 'ZWE',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 15,
							royalty: {
								name: 'Streaming',
								value: 0.000124,
								royaltyConverted: [
									{
										amount: 0.0001054,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.19840000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'New Year Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000009999999999999999,
						royaltyConverted: [
							{
								amount: 0.000008499999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.016,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000009999999999999999,
								royaltyConverted: [
									{
										amount: 0.000008499999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Amapiano Freestyle Vibes',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Hustler Gees',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Grateful',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Road To 2023',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Turn Up Party',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Ending Of The Year Party',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000037,
						royaltyConverted: [
							{
								amount: 0.00003145,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.059199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TZA',
							streams: 1,
							royalty: {
								name: 'TZA',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Tansho',
			upcCode: '197773053958',
			isrcCode: 'GBWUL2348871',
			catalogueId: 'CAT847887',
			activityPeriod: 'Jul-23',
			fullReports: [
				{
					trackTitle: 'Mara Pupo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.0000021,
						royaltyConverted: [
							{
								amount: 0.0000017849999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0033599999999999997,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Soundcloud Subscription',
							streams: 1,
							royalty: {
								name: 'Soundcloud Subscription',
								value: 0.0000021,
								royaltyConverted: [
									{
										amount: 0.0000017849999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0033599999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'USA',
							streams: 1,
							royalty: {
								name: 'USA',
								value: 0.0000021,
								royaltyConverted: [
									{
										amount: 0.0000017849999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0033599999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.0000021,
								royaltyConverted: [
									{
										amount: 0.0000017849999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0033599999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Bode Messiah',
			upcCode: '197077066838',
			isrcCode: 'GBWUL2203662',
			catalogueId: 'CAT666266',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Akoi Grace',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.0230551,
						royaltyConverted: [
							{
								amount: -0.019596835,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -36.88816,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.0230551,
								royaltyConverted: [
									{
										amount: -0.019596835,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -36.88816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'UKR',
							streams: 1,
							royalty: {
								name: 'UKR',
								value: -0.0030859999999999998,
								royaltyConverted: [
									{
										amount: -0.0026230999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -4.9376,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.0230551,
								royaltyConverted: [
									{
										amount: -0.019596835,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -36.88816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'manny monie',
			upcCode: '197368109596',
			isrcCode: 'QZ5FN2316874',
			catalogueId: 'CAT753562',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Terminator (Bonus Track)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.003216,
						royaltyConverted: [
							{
								amount: -0.0027336,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -5.1456,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 0,
					dspData: [],
					countryData: [],
					deliveryData: []
				}
			]
		},
		{
			userId: null,
			artistName: 'Poco Lee, Portable',
			upcCode: '8720623969516',
			isrcCode: 'NLRD52045971',
			catalogueId: 'CAT784043',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'ZaZoo Zehh',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000496,
						royaltyConverted: [
							{
								amount: -0.0004216,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.7936000000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 177,
					dspData: [
						{
							name: 'Spotify',
							streams: 175,
							royalty: {
								name: 'Spotify',
								value: -0.000534,
								royaltyConverted: [
									{
										amount: -0.0004539,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.8543999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Apple DJ Mixes',
							streams: 1,
							royalty: {
								name: 'Apple DJ Mixes',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 84,
							royalty: {
								name: 'CIV',
								value: -0.000328,
								royaltyConverted: [
									{
										amount: -0.0002788,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.5248,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 49,
							royalty: {
								name: 'ZMB',
								value: -0.000113,
								royaltyConverted: [
									{
										amount: -0.00009604999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.1808,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 27,
							royalty: {
								name: 'NAM',
								value: -0.000102,
								royaltyConverted: [
									{
										amount: -0.00008669999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.1632,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 5,
							royalty: {
								name: 'MOZ',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 3,
							royalty: {
								name: 'BWA',
								value: -0.000012,
								royaltyConverted: [
									{
										amount: -0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 3,
							royalty: {
								name: 'GEO',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TZA',
							streams: 1,
							royalty: {
								name: 'TZA',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 3,
							royalty: {
								name: 'KHM',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 177,
							royalty: {
								name: 'Streaming',
								value: -0.000496,
								royaltyConverted: [
									{
										amount: -0.0004216,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.7936000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Shugavybz, Roger Lino, King Bernard',
			upcCode: '197773127390',
			isrcCode: 'GBWUL2385189',
			catalogueId: 'CAT856202',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Kele',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00027299999999999997,
						royaltyConverted: [
							{
								amount: -0.00023204999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.43679999999999997,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 108,
					dspData: [
						{
							name: 'Spotify',
							streams: 108,
							royalty: {
								name: 'Spotify',
								value: -0.00027299999999999997,
								royaltyConverted: [
									{
										amount: -0.00023204999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.43679999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NAM',
							streams: 65,
							royalty: {
								name: 'NAM',
								value: -0.000247,
								royaltyConverted: [
									{
										amount: -0.00020994999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.3952,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 26,
							royalty: {
								name: 'ZMB',
								value: -0.00006,
								royaltyConverted: [
									{
										amount: -0.000051,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.096,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 8,
							royalty: {
								name: 'BWA',
								value: -0.00003,
								royaltyConverted: [
									{
										amount: -0.0000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.048,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.000004,
								royaltyConverted: [
									{
										amount: -0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 4,
							royalty: {
								name: 'EGY',
								value: 0.000029,
								royaltyConverted: [
									{
										amount: 0.00002465,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0464,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 3,
							royalty: {
								name: 'UKR',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 108,
							royalty: {
								name: 'Streaming',
								value: -0.00027299999999999997,
								royaltyConverted: [
									{
										amount: -0.00023204999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.43679999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Bella Shmurda',
			upcCode: '683332597617',
			isrcCode: 'UK3AZ1926272',
			catalogueId: 'CAT627373',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Only You',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00014099999999999998,
						royaltyConverted: [
							{
								amount: -0.00011984999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.22559999999999997,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 54,
					dspData: [
						{
							name: 'Spotify',
							streams: 54,
							royalty: {
								name: 'Spotify',
								value: -0.00014099999999999998,
								royaltyConverted: [
									{
										amount: -0.00011984999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.22559999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 36,
							royalty: {
								name: 'CIV',
								value: -0.00014,
								royaltyConverted: [
									{
										amount: -0.00011899999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.22399999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 10,
							royalty: {
								name: 'ZMB',
								value: -0.000024,
								royaltyConverted: [
									{
										amount: -0.0000204,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.038400000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 4,
							royalty: {
								name: 'MLT',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 1,
							royalty: {
								name: 'KAZ',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 2,
							royalty: {
								name: 'KHM',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 54,
							royalty: {
								name: 'Streaming',
								value: -0.00014099999999999998,
								royaltyConverted: [
									{
										amount: -0.00011984999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.22559999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'One Touch',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00002,
						royaltyConverted: [
							{
								amount: -0.000017,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.032,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Dangbana Orisa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Lawy',
			upcCode: '197368476803',
			isrcCode: 'USLZJ2343755',
			catalogueId: 'CAT793414',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Big March Mix',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.00007400000000000001,
						royaltyConverted: [
							{
								amount: -0.00006290000000000001,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.11840000000000002,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 32,
					dspData: [
						{
							name: 'Spotify',
							streams: 32,
							royalty: {
								name: 'Spotify',
								value: -0.00007400000000000001,
								royaltyConverted: [
									{
										amount: -0.00006290000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.11840000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 28,
							royalty: {
								name: 'CIV',
								value: -0.00011,
								royaltyConverted: [
									{
										amount: -0.0000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.17600000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 1,
							royalty: {
								name: 'MDA',
								value: 0.00001,
								royaltyConverted: [
									{
										amount: 0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 1,
							royalty: {
								name: 'LUX',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 32,
							royalty: {
								name: 'Streaming',
								value: -0.00007400000000000001,
								royaltyConverted: [
									{
										amount: -0.00006290000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.11840000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'The Verified Vol 2',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000056999999999999996,
						royaltyConverted: [
							{
								amount: -0.00004845,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.09119999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 34,
					dspData: [
						{
							name: 'Spotify',
							streams: 34,
							royalty: {
								name: 'Spotify',
								value: -0.000056999999999999996,
								royaltyConverted: [
									{
										amount: -0.00004845,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.09119999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 25,
							royalty: {
								name: 'CIV',
								value: -0.000097,
								royaltyConverted: [
									{
										amount: -0.00008245,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.1552,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 4,
							royalty: {
								name: 'NAM',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 1,
							royalty: {
								name: 'MDA',
								value: 0.00001,
								royaltyConverted: [
									{
										amount: 0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 4,
							royalty: {
								name: 'LUX',
								value: 0.000045,
								royaltyConverted: [
									{
										amount: 0.00003825,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07200000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 34,
							royalty: {
								name: 'Streaming',
								value: -0.000056999999999999996,
								royaltyConverted: [
									{
										amount: -0.00004845,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.09119999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: "Lawy's Delight House Mix",
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000016,
						royaltyConverted: [
							{
								amount: 0.000013599999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.025599999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000036,
								royaltyConverted: [
									{
										amount: 0.0000306,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0576,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 5,
							royalty: {
								name: 'CIV',
								value: -0.00002,
								royaltyConverted: [
									{
										amount: -0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'IND',
							streams: 1,
							royalty: {
								name: 'IND',
								value: 0.000036,
								royaltyConverted: [
									{
										amount: 0.0000306,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0576,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Verified Island Mix',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000016,
						royaltyConverted: [
							{
								amount: 0.000013599999999999999,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.025599999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 7,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 1,
							royalty: {
								name: 'UKR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 7,
							royalty: {
								name: 'Streaming',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Lawy',
			upcCode: '197368476803',
			isrcCode: 'USLZJ2343755',
			catalogueId: 'CAT793414',
			activityPeriod: 'Jul-23',
			fullReports: [
				{
					trackTitle: 'Big March Mix',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000001,
						royaltyConverted: [
							{
								amount: 8.499999999999999e-7,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0015999999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Soundcloud Subscription',
							streams: 1,
							royalty: {
								name: 'Soundcloud Subscription',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CHE',
							streams: 1,
							royalty: {
								name: 'CHE',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Geekaydon',
			upcCode: '197773512349',
			isrcCode: 'QZTV32345713',
			catalogueId: 'CAT888390',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ikebe',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000028000000000000003,
						royaltyConverted: [
							{
								amount: -0.000023800000000000003,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.044800000000000006,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 24,
					dspData: [
						{
							name: 'Spotify',
							streams: 24,
							royalty: {
								name: 'Spotify',
								value: -0.000028000000000000003,
								royaltyConverted: [
									{
										amount: -0.000023800000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.044800000000000006,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUN',
							streams: 20,
							royalty: {
								name: 'TUN',
								value: -0.000079,
								royaltyConverted: [
									{
										amount: -0.00006714999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.12639999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 3,
							royalty: {
								name: 'GHA',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 24,
							royalty: {
								name: 'Streaming',
								value: -0.000028000000000000003,
								royaltyConverted: [
									{
										amount: -0.000023800000000000003,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.044800000000000006,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Femzy Jay, Portable',
			upcCode: '197999018861',
			isrcCode: 'QZWDE2351774',
			catalogueId: 'CAT920353',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: '99 Spirit',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000026,
						royaltyConverted: [
							{
								amount: -0.0000221,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0416,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 11,
					dspData: [
						{
							name: 'Spotify',
							streams: 11,
							royalty: {
								name: 'Spotify',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 8,
							royalty: {
								name: 'CIV',
								value: -0.000032,
								royaltyConverted: [
									{
										amount: -0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 11,
							royalty: {
								name: 'Streaming',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Obidi',
			upcCode: '197368339573',
			isrcCode: 'QZ5FN2392886',
			catalogueId: 'CAT778720',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Finish Me',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000026,
						royaltyConverted: [
							{
								amount: -0.0000221,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0416,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 11,
					dspData: [
						{
							name: 'Spotify',
							streams: 11,
							royalty: {
								name: 'Spotify',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 11,
							royalty: {
								name: 'ZMB',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 11,
							royalty: {
								name: 'Streaming',
								value: -0.000026,
								royaltyConverted: [
									{
										amount: -0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Lyno Casino',
			upcCode: '197077737844',
			isrcCode: 'QZWDD2242704',
			catalogueId: 'CAT716053',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Baller',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000024999999999999998,
						royaltyConverted: [
							{
								amount: 0.000021249999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.039999999999999994,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 10,
					dspData: [
						{
							name: 'Spotify',
							streams: 10,
							royalty: {
								name: 'Spotify',
								value: 0.000024999999999999998,
								royaltyConverted: [
									{
										amount: 0.000021249999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.039999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NAM',
							streams: 5,
							royalty: {
								name: 'NAM',
								value: -0.000019,
								royaltyConverted: [
									{
										amount: -0.00001615,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.030400000000000003,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 2,
							royalty: {
								name: 'MAR',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 10,
							royalty: {
								name: 'Streaming',
								value: 0.000024999999999999998,
								royaltyConverted: [
									{
										amount: 0.000021249999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.039999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Happy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Dialo',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000046,
						royaltyConverted: [
							{
								amount: 0.0000391,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0736,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 2,
							royalty: {
								name: 'TUR',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj 4kerty',
			upcCode: '197368834931',
			isrcCode: 'GBRKQ2368457',
			catalogueId: 'CAT826245',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Mara Pupo Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.0000029999999999999984,
						royaltyConverted: [
							{
								amount: 0.0000025499999999999985,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.004799999999999997,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 9,
					dspData: [
						{
							name: 'Spotify',
							streams: 7,
							royalty: {
								name: 'Spotify',
								value: -0.000023,
								royaltyConverted: [
									{
										amount: -0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'CIV',
							streams: 4,
							royalty: {
								name: 'CIV',
								value: -0.000015,
								royaltyConverted: [
									{
										amount: -0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 3,
							royalty: {
								name: 'GEO',
								value: -0.000008,
								royaltyConverted: [
									{
										amount: -0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000026,
								royaltyConverted: [
									{
										amount: 0.0000221,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0416,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 9,
							royalty: {
								name: 'Streaming',
								value: 0.0000029999999999999984,
								royaltyConverted: [
									{
										amount: 0.0000025499999999999985,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.004799999999999997,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Party Till 4:30',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000059,
						royaltyConverted: [
							{
								amount: 0.00005015,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0944,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000019999999999999998,
								royaltyConverted: [
									{
										amount: 0.000016999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000039,
								royaltyConverted: [
									{
										amount: 0.00003315,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0624,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 2,
							royalty: {
								name: 'UKR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MYT',
							streams: 1,
							royalty: {
								name: 'MYT',
								value: 0.000039,
								royaltyConverted: [
									{
										amount: 0.00003315,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0624,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000059,
								royaltyConverted: [
									{
										amount: 0.00005015,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0944,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'KINGP',
			upcCode: '195729938335',
			isrcCode: 'GBRKQ2258732',
			catalogueId: 'CAT654972',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Commoner',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000044999999999999996,
						royaltyConverted: [
							{
								amount: 0.000038249999999999995,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.072,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 10,
					dspData: [
						{
							name: 'Spotify',
							streams: 10,
							royalty: {
								name: 'Spotify',
								value: 0.000044999999999999996,
								royaltyConverted: [
									{
										amount: 0.000038249999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 3,
							royalty: {
								name: 'ZMB',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.000004,
								royaltyConverted: [
									{
										amount: -0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'KHM',
							streams: 1,
							royalty: {
								name: 'KHM',
								value: 0.000016,
								royaltyConverted: [
									{
										amount: 0.000013599999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.025599999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 2,
							royalty: {
								name: 'UKR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 10,
							royalty: {
								name: 'Streaming',
								value: 0.000044999999999999996,
								royaltyConverted: [
									{
										amount: 0.000038249999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'K-Adel',
			upcCode: '197077705133',
			isrcCode: 'QZWDD2228280',
			catalogueId: 'CAT713007',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Zanotti',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000037,
						royaltyConverted: [
							{
								amount: 0.00003145,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.059199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'BWA',
							streams: 2,
							royalty: {
								name: 'BWA',
								value: -0.000007,
								royaltyConverted: [
									{
										amount: -0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Ike Exclusive',
			upcCode: '195729964563',
			isrcCode: 'GBRKQ2268714',
			catalogueId: 'CAT657533',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Lekki',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000034,
						royaltyConverted: [
							{
								amount: 0.000028899999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0544,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 2,
							royalty: {
								name: 'ZMB',
								value: -0.000005,
								royaltyConverted: [
									{
										amount: -0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Toxic',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000042,
						royaltyConverted: [
							{
								amount: 0.0000357,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0672,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000042,
								royaltyConverted: [
									{
										amount: 0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 3,
							royalty: {
								name: 'GHA',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: 0.000042,
								royaltyConverted: [
									{
										amount: 0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Gbas Gbos',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000007,
						royaltyConverted: [
							{
								amount: 0.00000595,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0112,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Young Duu',
			upcCode: '197773213079',
			isrcCode: 'QZTRX2319959',
			catalogueId: 'CAT864937',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'E Gbemi',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000049,
						royaltyConverted: [
							{
								amount: 0.000041649999999999996,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0784,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 8,
					dspData: [
						{
							name: 'Spotify',
							streams: 5,
							royalty: {
								name: 'Spotify',
								value: 0.000012,
								royaltyConverted: [
									{
										amount: 0.0000102,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.019200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 3,
							royalty: {
								name: 'TIDAL',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GEO',
							streams: 1,
							royalty: {
								name: 'GEO',
								value: -0.000004,
								royaltyConverted: [
									{
										amount: -0.0000033999999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0063999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 3,
							royalty: {
								name: 'MUS',
								value: 0.000005,
								royaltyConverted: [
									{
										amount: 0.00000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.008,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 3,
							royalty: {
								name: 'NGA',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 8,
							royalty: {
								name: 'Streaming',
								value: 0.000049,
								royaltyConverted: [
									{
										amount: 0.000041649999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0784,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Sho Sho Sho',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000030999999999999995,
						royaltyConverted: [
							{
								amount: 0.000026349999999999993,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.04959999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 6,
					dspData: [
						{
							name: 'Spotify',
							streams: 6,
							royalty: {
								name: 'Spotify',
								value: 0.000030999999999999995,
								royaltyConverted: [
									{
										amount: 0.000026349999999999993,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04959999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 6,
							royalty: {
								name: 'Streaming',
								value: 0.000030999999999999995,
								royaltyConverted: [
									{
										amount: 0.000026349999999999993,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04959999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kunfayafun',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000051000000000000006,
						royaltyConverted: [
							{
								amount: 0.00004335,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0816,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 5,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000026000000000000002,
								royaltyConverted: [
									{
										amount: 0.000022100000000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.041600000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 5,
							royalty: {
								name: 'Streaming',
								value: 0.000051000000000000006,
								royaltyConverted: [
									{
										amount: 0.00004335,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kilowa',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000039,
						royaltyConverted: [
							{
								amount: 0.00003315,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0624,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000026000000000000002,
								royaltyConverted: [
									{
										amount: 0.000022100000000000002,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.041600000000000005,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 2,
							royalty: {
								name: 'EGY',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000039,
								royaltyConverted: [
									{
										amount: 0.00003315,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0624,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Ransome',
			upcCode: '197077882315',
			isrcCode: 'QZWDD2291911',
			catalogueId: 'CAT729821',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Afia',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000032000000000000005,
						royaltyConverted: [
							{
								amount: 0.000027200000000000004,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.05120000000000001,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000007000000000000001,
								royaltyConverted: [
									{
										amount: 0.000005950000000000001,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.011200000000000002,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 2,
							royalty: {
								name: 'TIDAL',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 1,
							royalty: {
								name: 'MDA',
								value: 0.00001,
								royaltyConverted: [
									{
										amount: 0.0000085,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.016,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 2,
							royalty: {
								name: 'NGA',
								value: 0.000025,
								royaltyConverted: [
									{
										amount: 0.00002125,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.04,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000032000000000000005,
								royaltyConverted: [
									{
										amount: 0.000027200000000000004,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.05120000000000001,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Local Boy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000046,
						royaltyConverted: [
							{
								amount: 0.0000391,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0736,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 2,
							royalty: {
								name: 'TUR',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000046,
								royaltyConverted: [
									{
										amount: 0.0000391,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0736,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: "Ijim N'oru",
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Obidi, MJQSoundz',
			upcCode: '197773349099',
			isrcCode: 'QZTRX2378104',
			catalogueId: 'CAT876737',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ova You',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000003,
						royaltyConverted: [
							{
								amount: -0.00000255,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0048000000000000004,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Woman Leader',
			upcCode: '197368980188',
			isrcCode: 'GBWUL2319112',
			catalogueId: 'CAT840404',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Going Higher',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000014,
						royaltyConverted: [
							{
								amount: 0.0000119,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0224,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 4,
							royalty: {
								name: 'Spotify',
								value: 0.000014,
								royaltyConverted: [
									{
										amount: 0.0000119,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0224,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ZMB',
							streams: 1,
							royalty: {
								name: 'ZMB',
								value: -0.000003,
								royaltyConverted: [
									{
										amount: -0.00000255,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0048000000000000004,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000014,
								royaltyConverted: [
									{
										amount: 0.0000119,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0224,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Lord Sky',
			upcCode: '197773939719',
			isrcCode: 'QZWDE2301515',
			catalogueId: 'CAT913946',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Money',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: -0.000001,
						royaltyConverted: [
							{
								amount: -8.499999999999999e-7,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: -0.0015999999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'JAM',
							streams: 1,
							royalty: {
								name: 'JAM',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: -0.000001,
								royaltyConverted: [
									{
										amount: -8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: -0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Spinoff',
			upcCode: '197077912975',
			isrcCode: 'QZWDE2202230',
			catalogueId: 'CAT733416',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ika Of Africa Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000044999999999999996,
						royaltyConverted: [
							{
								amount: 0.000038249999999999995,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.072,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000008,
								royaltyConverted: [
									{
										amount: 0.000006799999999999999,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.012799999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 2,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 1,
							royalty: {
								name: 'EGY',
								value: 0.000007,
								royaltyConverted: [
									{
										amount: 0.00000595,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0112,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000044999999999999996,
								royaltyConverted: [
									{
										amount: 0.000038249999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.072,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Naija Old Skool [Mixtape]',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000035,
						royaltyConverted: [
							{
								amount: 0.000029749999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.055999999999999994,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 3,
							royalty: {
								name: 'EGY',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.000035,
								royaltyConverted: [
									{
										amount: 0.000029749999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.055999999999999994,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: '2023 Worry Worry Dj Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'OT Vibezz',
			upcCode: '197368938738',
			isrcCode: 'GBWUL2304804',
			catalogueId: 'CAT836163',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'If To Say',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000001,
						royaltyConverted: [
							{
								amount: 8.499999999999999e-7,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0015999999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MUS',
							streams: 1,
							royalty: {
								name: 'MUS',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000001,
								royaltyConverted: [
									{
										amount: 8.499999999999999e-7,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0015999999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Magnito, Mazanjiyabaah',
			upcCode: '197077579048',
			isrcCode: 'QZTV32246209',
			catalogueId: 'CAT704138',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Sanu',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000034,
						royaltyConverted: [
							{
								amount: 0.000028899999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0544,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MAR',
							streams: 1,
							royalty: {
								name: 'MAR',
								value: 0.000011,
								royaltyConverted: [
									{
										amount: 0.00000935,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0176,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000034,
								royaltyConverted: [
									{
										amount: 0.000028899999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0544,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'HoodCelebrity1k',
			upcCode: '197077368840',
			isrcCode: 'QZTRX2228979',
			catalogueId: 'CAT689509',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Greatness',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000013,
						royaltyConverted: [
							{
								amount: 0.00001105,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Time & Money',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000013,
						royaltyConverted: [
							{
								amount: 0.00001105,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Spirit Okooku, Portable',
			upcCode: '197773907770',
			isrcCode: 'QZWDD2386598',
			catalogueId: 'CAT911572',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Akoi Hookup',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000083,
						royaltyConverted: [
							{
								amount: 0.00007055,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.1328,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.00007,
								royaltyConverted: [
									{
										amount: 0.000059499999999999996,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.11199999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.000083,
								royaltyConverted: [
									{
										amount: 0.00007055,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.1328,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Lisa Viola',
			upcCode: '197077011913',
			isrcCode: 'TCAFR2119069',
			catalogueId: 'CAT662154',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Lagos',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000013,
						royaltyConverted: [
							{
								amount: 0.00001105,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0208,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000013,
								royaltyConverted: [
									{
										amount: 0.00001105,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0208,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Kisses',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000022,
						royaltyConverted: [
							{
								amount: 0.0000187,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0352,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'BGD',
							streams: 1,
							royalty: {
								name: 'BGD',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000022,
								royaltyConverted: [
									{
										amount: 0.0000187,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0352,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Edu Oliver De Coque',
			upcCode: '197077757842',
			isrcCode: 'QZWDD2252032',
			catalogueId: 'CAT718163',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Arusi Ego Ezeobi  Asaba ( Already Made Dibia AMD ) Special',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'OZD',
			upcCode: '197077254020',
			isrcCode: 'GBWUL2272340',
			catalogueId: 'CAT680471',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Pose',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Pray',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Aza',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000028,
						royaltyConverted: [
							{
								amount: 0.0000238,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0448,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 2,
					dspData: [
						{
							name: 'Spotify',
							streams: 2,
							royalty: {
								name: 'Spotify',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 2,
							royalty: {
								name: 'Streaming',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Spirit Okooku, Yung Effissy',
			upcCode: '197077089325',
			isrcCode: 'GBWUL2212120',
			catalogueId: 'CAT667839',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Ayefele',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'ICE-K ArtQuake',
			upcCode: '197773916802',
			isrcCode: 'QZWDD2389170',
			catalogueId: 'CAT912574',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Amazingly (Ire)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000015,
						royaltyConverted: [
							{
								amount: 0.00001275,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.024,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 1,
							royalty: {
								name: 'GHA',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000015,
								royaltyConverted: [
									{
										amount: 0.00001275,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.024,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Kogbagidi Lavish Funds, Dj Spirit Okooku',
			upcCode: '197077958140',
			isrcCode: 'QZWDE2224831',
			catalogueId: 'CAT737098',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Sufficient Mixtape Vol 2',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00002,
						royaltyConverted: [
							{
								amount: 0.000017,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.032,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00002,
								royaltyConverted: [
									{
										amount: 0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'ALB',
							streams: 1,
							royalty: {
								name: 'ALB',
								value: 0.00002,
								royaltyConverted: [
									{
										amount: 0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00002,
								royaltyConverted: [
									{
										amount: 0.000017,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.032,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Portable, Seriki',
			upcCode: '8720765832235',
			isrcCode: 'NLRD52202797',
			catalogueId: 'CAT8720765832235',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Blow',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000051,
						royaltyConverted: [
							{
								amount: 0.000043349999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0816,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000051,
								royaltyConverted: [
									{
										amount: 0.000043349999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 2,
							royalty: {
								name: 'GHA',
								value: 0.000028,
								royaltyConverted: [
									{
										amount: 0.0000238,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0448,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.000051,
								royaltyConverted: [
									{
										amount: 0.000043349999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0816,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Chief Imo',
			upcCode: '197999065056',
			isrcCode: 'QZWDE2373753',
			catalogueId: 'CAT922895',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Nneoma',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TUR',
							streams: 1,
							royalty: {
								name: 'TUR',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Spirit Okooku, Spending',
			upcCode: '197773173052',
			isrcCode: 'QZTRX2301460',
			catalogueId: 'CAT860454',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Spending Agege',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000023,
						royaltyConverted: [
							{
								amount: 0.00001955,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0368,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'PER',
							streams: 1,
							royalty: {
								name: 'PER',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000023,
								royaltyConverted: [
									{
										amount: 0.00001955,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0368,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'John Frog',
			upcCode: '197077111996',
			isrcCode: 'GBWUL2219780',
			catalogueId: 'CAT669583',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Beledi',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000032,
						royaltyConverted: [
							{
								amount: 0.000027199999999999997,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.051199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 3,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'MAR',
							streams: 3,
							royalty: {
								name: 'MAR',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 3,
							royalty: {
								name: 'Streaming',
								value: 0.000032,
								royaltyConverted: [
									{
										amount: 0.000027199999999999997,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.051199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Billz',
			upcCode: '197368339627',
			isrcCode: 'QZ5FN2392895',
			catalogueId: 'CAT778725',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Get Drilled',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000037,
						royaltyConverted: [
							{
								amount: 0.00003145,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.059199999999999996,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'DOM',
							streams: 1,
							royalty: {
								name: 'DOM',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000037,
								royaltyConverted: [
									{
										amount: 0.00003145,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.059199999999999996,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Lahboceery',
			upcCode: '197368927985',
			isrcCode: 'GBWUL2303839',
			catalogueId: 'CAT835547',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'AA Mixtape',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000042,
						royaltyConverted: [
							{
								amount: 0.0000357,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.0672,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000042,
								royaltyConverted: [
									{
										amount: 0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'TZA',
							streams: 1,
							royalty: {
								name: 'TZA',
								value: 0.000042,
								royaltyConverted: [
									{
										amount: 0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000042,
								royaltyConverted: [
									{
										amount: 0.0000357,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0672,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Domestic Secrets',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dullar Boi',
			upcCode: '197368858579',
			isrcCode: 'GBRKQ2378964',
			catalogueId: 'CAT828736',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Wajadina',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00009099999999999999,
						royaltyConverted: [
							{
								amount: 0.00007734999999999998,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.14559999999999998,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 4,
					dspData: [
						{
							name: 'Spotify',
							streams: 3,
							royalty: {
								name: 'Spotify',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 1,
							royalty: {
								name: 'YouTube Streaming',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GHA',
							streams: 3,
							royalty: {
								name: 'GHA',
								value: 0.000044,
								royaltyConverted: [
									{
										amount: 0.0000374,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.0704,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						},
						{
							name: 'DZA',
							streams: 1,
							royalty: {
								name: 'DZA',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 4,
							royalty: {
								name: 'Streaming',
								value: 0.00009099999999999999,
								royaltyConverted: [
									{
										amount: 0.00007734999999999998,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.14559999999999998,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'More Naira',
			upcCode: '197077169119',
			isrcCode: 'TCAGI2247453',
			catalogueId: 'CAT674519',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Warri Boy',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.000047,
						royaltyConverted: [
							{
								amount: 0.000039949999999999995,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.07519999999999999,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'GRC',
							streams: 1,
							royalty: {
								name: 'GRC',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.000047,
								royaltyConverted: [
									{
										amount: 0.000039949999999999995,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.07519999999999999,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Eli Marliq',
			upcCode: '197077121407',
			isrcCode: 'GBWUL2222149',
			catalogueId: 'CAT670481',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'All Of A Sudden (Freestyle)',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'CANNOT LET IT GET TO MY HEAD',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Pearls Stunner',
			upcCode: '197077298277',
			isrcCode: 'GBWUL2295835',
			catalogueId: 'CAT683532',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Hold Up',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Dj Yk Mule',
			upcCode: '8720766140612',
			isrcCode: 'NLRD52046046',
			catalogueId: 'CAT619228',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Popoye Cruise',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'CDB Papi',
			upcCode: '197773385134',
			isrcCode: 'QZTRX2394761',
			catalogueId: 'CAT879118',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Drop Top',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				},
				{
					trackTitle: 'Charity Fund Baby',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Jesse Manny',
			upcCode: '197368369013',
			isrcCode: 'USLZJ2305092',
			catalogueId: 'CAT781733',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Zombie',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Nakel Medina',
			upcCode: '197077313772',
			isrcCode: 'QZTRX2202549',
			catalogueId: 'CAT684878',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Money',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Keruchi God-Son',
			upcCode: '197773172635',
			isrcCode: 'QZTRX2311582',
			catalogueId: 'CAT860395',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Yes I Do',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		},
		{
			userId: null,
			artistName: 'Machala Way',
			upcCode: '197077483086',
			isrcCode: 'QZTRX2298074',
			catalogueId: 'CAT698787',
			activityPeriod: 'Sep-23',
			fullReports: [
				{
					trackTitle: 'Next To You',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.00005,
						royaltyConverted: [
							{
								amount: 0.0000425,
								rate: 0.85,
								fromCurrency: 'USD',
								toCurrency: 'EUR'
							},
							{
								amount: 0.08,
								rate: 1600,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							}
						]
					},
					totalStreams: 1,
					dspData: [
						{
							name: 'Spotify',
							streams: 1,
							royalty: {
								name: 'Spotify',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'NGA',
							streams: 1,
							royalty: {
								name: 'NGA',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 1,
							royalty: {
								name: 'Streaming',
								value: 0.00005,
								royaltyConverted: [
									{
										amount: 0.0000425,
										rate: 0.85,
										fromCurrency: 'USD',
										toCurrency: 'EUR'
									},
									{
										amount: 0.08,
										rate: 1600,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									}
								]
							}
						}
					]
				}
			]
		}
	]
};
