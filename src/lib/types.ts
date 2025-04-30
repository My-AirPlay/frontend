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
			_id: '680d1dbc2f3e4681ec7748ca',
			artistId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			activityPeriod: 'September 2023',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					upcCode: '197077506990',
					isrcCode: 'QZTV32204282',
					catalogueId: 'CAT700264',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 80.9349685,
						royaltyConverted: [
							{
								amount: 113349.42338425,
								rate: 1400.5,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							},
							{
								amount: 72.84147165,
								rate: 0.9,
								fromCurrency: 'USD',
								toCurrency: 'GBP'
							}
						]
					},
					totalStreams: 31460,
					dspData: [
						{
							name: 'Spotify',
							streams: 30197,
							royalty: {
								name: 'Spotify',
								value: 75.4326837,
								royaltyConverted: [
									{
										amount: 105643.47352185,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 67.88941533,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Apple Music',
							streams: 946,
							royalty: {
								name: 'Apple Music',
								value: 3.7293000000000003,
								royaltyConverted: [
									{
										amount: 5222.88465,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.3563700000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 282,
							royalty: {
								name: 'YouTube Streaming',
								value: 1.1349464,
								royaltyConverted: [
									{
										amount: 1589.4924332,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0214517600000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Amazon Music Unlimited',
							streams: 25,
							royalty: {
								name: 'Amazon Music Unlimited',
								value: 0.20667970000000002,
								royaltyConverted: [
									{
										amount: 289.45491985,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.18601173000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'YouTube Content ID',
							streams: 8,
							royalty: {
								name: 'YouTube Content ID',
								value: 0.0329627,
								royaltyConverted: [
									{
										amount: 46.16426135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.029666429999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.011396,
								royaltyConverted: [
									{
										amount: 15.960098,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0102564,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'iTunes',
							streams: 1,
							royalty: {
								name: 'iTunes',
								value: 0.387,
								royaltyConverted: [
									{
										amount: 541.9935,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3483,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'USA',
							streams: 7589,
							royalty: {
								name: 'USA',
								value: 18.5634435,
								royaltyConverted: [
									{
										amount: 25998.102621750004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 16.70709915,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GBR',
							streams: 3559,
							royalty: {
								name: 'GBR',
								value: 16.894138,
								royaltyConverted: [
									{
										amount: 23660.240269,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 15.204724200000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NLD',
							streams: 1894,
							royalty: {
								name: 'NLD',
								value: 6.233165,
								royaltyConverted: [
									{
										amount: 8729.5475825,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 5.6098485,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DEU',
							streams: 1889,
							royalty: {
								name: 'DEU',
								value: 4.9111959999999995,
								royaltyConverted: [
									{
										amount: 6878.129997999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 4.420076399999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CAN',
							streams: 1617,
							royalty: {
								name: 'CAN',
								value: 3.380494,
								royaltyConverted: [
									{
										amount: 4734.381847000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.0424446,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SWE',
							streams: 1438,
							royalty: {
								name: 'SWE',
								value: 4.939563,
								royaltyConverted: [
									{
										amount: 6917.857981499999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 4.4456067,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AUS',
							streams: 1431,
							royalty: {
								name: 'AUS',
								value: 3.611202,
								royaltyConverted: [
									{
										amount: 5057.488401,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.2500818000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PHL',
							streams: 1187,
							royalty: {
								name: 'PHL',
								value: 0.493084,
								royaltyConverted: [
									{
										amount: 690.5641420000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.44377560000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1014,
							royalty: {
								name: 'NGA',
								value: 0.271202,
								royaltyConverted: [
									{
										amount: 379.818401,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.24408180000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NOR',
							streams: 900,
							royalty: {
								name: 'NOR',
								value: 3.9062010000000003,
								royaltyConverted: [
									{
										amount: 5470.6345005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.5155809000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FRA',
							streams: 845,
							royalty: {
								name: 'FRA',
								value: 2.399426,
								royaltyConverted: [
									{
										amount: 3360.3961130000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 2.1594834,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZAF',
							streams: 632,
							royalty: {
								name: 'ZAF',
								value: 0.610511,
								royaltyConverted: [
									{
										amount: 855.0206555000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.5494599,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DNK',
							streams: 518,
							royalty: {
								name: 'DNK',
								value: 2.200149,
								royaltyConverted: [
									{
										amount: 3081.3086745,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.9801341000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRA',
							streams: 483,
							royalty: {
								name: 'BRA',
								value: 0.534734,
								royaltyConverted: [
									{
										amount: 748.8949670000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.48126060000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IND',
							streams: 410,
							royalty: {
								name: 'IND',
								value: 0.22198600000000002,
								royaltyConverted: [
									{
										amount: 310.89139300000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.19978740000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CHE',
							streams: 394,
							royalty: {
								name: 'CHE',
								value: 1.600847,
								royaltyConverted: [
									{
										amount: 2241.9862235,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.4407623,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NZL',
							streams: 385,
							royalty: {
								name: 'NZL',
								value: 1.1224770000000002,
								royaltyConverted: [
									{
										amount: 1572.0290385000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0102293000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IDN',
							streams: 309,
							royalty: {
								name: 'IDN',
								value: 0.109793,
								royaltyConverted: [
									{
										amount: 153.7650965,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0988137,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ESP',
							streams: 299,
							royalty: {
								name: 'ESP',
								value: 0.524829,
								royaltyConverted: [
									{
										amount: 735.0230144999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.4723461,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IRL',
							streams: 296,
							royalty: {
								name: 'IRL',
								value: 1.188142,
								royaltyConverted: [
									{
										amount: 1663.9928710000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0693278000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BEL',
							streams: 290,
							royalty: {
								name: 'BEL',
								value: 0.910252,
								royaltyConverted: [
									{
										amount: 1274.807926,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.8192267999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PRT',
							streams: 289,
							royalty: {
								name: 'PRT',
								value: 0.49129100000000003,
								royaltyConverted: [
									{
										amount: 688.0530455,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.44216190000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ITA',
							streams: 271,
							royalty: {
								name: 'ITA',
								value: 0.601792,
								royaltyConverted: [
									{
										amount: 842.809696,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.5416128,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AUT',
							streams: 268,
							royalty: {
								name: 'AUT',
								value: 0.81074,
								royaltyConverted: [
									{
										amount: 1135.44137,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.729666,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'POL',
							streams: 263,
							royalty: {
								name: 'POL',
								value: 0.288419,
								royaltyConverted: [
									{
										amount: 403.93080949999995,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2595771,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MEX',
							streams: 236,
							royalty: {
								name: 'MEX',
								value: 0.21946900000000003,
								royaltyConverted: [
									{
										amount: 307.36633450000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.19752210000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ARE',
							streams: 175,
							royalty: {
								name: 'ARE',
								value: 0.475012,
								royaltyConverted: [
									{
										amount: 665.254306,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.4275108,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SGP',
							streams: 143,
							royalty: {
								name: 'SGP',
								value: 0.22989300000000001,
								royaltyConverted: [
									{
										amount: 321.9651465,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.20690370000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 137,
							royalty: {
								name: 'TUR',
								value: 0.032183,
								royaltyConverted: [
									{
										amount: 45.072291500000006,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.028964700000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COL',
							streams: 134,
							royalty: {
								name: 'COL',
								value: 0.063891,
								royaltyConverted: [
									{
										amount: 89.47934550000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0575019,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KEN',
							streams: 125,
							royalty: {
								name: 'KEN',
								value: 0.435778,
								royaltyConverted: [
									{
										amount: 610.307089,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3922002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MYS',
							streams: 120,
							royalty: {
								name: 'MYS',
								value: 0.07894400000000001,
								royaltyConverted: [
									{
										amount: 110.56107200000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.07104960000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CZE',
							streams: 98,
							royalty: {
								name: 'CZE',
								value: 0.129577,
								royaltyConverted: [
									{
										amount: 181.4725885,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1166193,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISR',
							streams: 93,
							royalty: {
								name: 'ISR',
								value: 0.205433,
								royaltyConverted: [
									{
										amount: 287.7089165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.18488970000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SVK',
							streams: 86,
							royalty: {
								name: 'SVK',
								value: 0.143233,
								royaltyConverted: [
									{
										amount: 200.5978165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.12890970000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 84,
							royalty: {
								name: 'LUX',
								value: 0.352439,
								royaltyConverted: [
									{
										amount: 493.5908195,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3171951,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'EST',
							streams: 82,
							royalty: {
								name: 'EST',
								value: 0.17835900000000002,
								royaltyConverted: [
									{
										amount: 249.79177950000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.16052310000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FIN',
							streams: 74,
							royalty: {
								name: 'FIN',
								value: 0.258081,
								royaltyConverted: [
									{
										amount: 361.44244050000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2322729,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ROM',
							streams: 74,
							royalty: {
								name: 'ROM',
								value: 0.152161,
								royaltyConverted: [
									{
										amount: 213.10148049999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1369449,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ARG',
							streams: 70,
							royalty: {
								name: 'ARG',
								value: 0.023375,
								royaltyConverted: [
									{
										amount: 32.7366875,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0210375,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'THA',
							streams: 64,
							royalty: {
								name: 'THA',
								value: 0.031498,
								royaltyConverted: [
									{
										amount: 44.112949,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0283482,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 58,
							royalty: {
								name: 'GRC',
								value: 0.103173,
								royaltyConverted: [
									{
										amount: 144.4937865,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0928557,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UGA',
							streams: 58,
							royalty: {
								name: 'UGA',
								value: 0.040027,
								royaltyConverted: [
									{
										amount: 56.0578135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0360243,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CHL',
							streams: 55,
							royalty: {
								name: 'CHL',
								value: 0.037555,
								royaltyConverted: [
									{
										amount: 52.5957775,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.033799499999999996,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 55,
							royalty: {
								name: 'GHA',
								value: 0.025833000000000002,
								royaltyConverted: [
									{
										amount: 36.1791165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0232497,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JPN',
							streams: 52,
							royalty: {
								name: 'JPN',
								value: 0.10642299999999999,
								royaltyConverted: [
									{
										amount: 149.04541149999997,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0957807,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 48,
							royalty: {
								name: 'ZMB',
								value: 0.016725999999999998,
								royaltyConverted: [
									{
										amount: 23.424763,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.015053399999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HUN',
							streams: 47,
							royalty: {
								name: 'HUN',
								value: 0.057990999999999994,
								royaltyConverted: [
									{
										amount: 81.21639549999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.05219189999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CRI',
							streams: 44,
							royalty: {
								name: 'CRI',
								value: 0.043793,
								royaltyConverted: [
									{
										amount: 61.3320965,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0394137,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SVN',
							streams: 43,
							royalty: {
								name: 'SVN',
								value: 0.05542,
								royaltyConverted: [
									{
										amount: 77.61570999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.049878,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TWN',
							streams: 37,
							royalty: {
								name: 'TWN',
								value: 0.026807000000000004,
								royaltyConverted: [
									{
										amount: 37.543203500000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.024126300000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HKG',
							streams: 36,
							royalty: {
								name: 'HKG',
								value: 0.07347400000000001,
								royaltyConverted: [
									{
										amount: 102.90033700000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.06612660000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SAU',
							streams: 36,
							royalty: {
								name: 'SAU',
								value: 0.07424700000000001,
								royaltyConverted: [
									{
										amount: 103.98292350000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.06682230000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PER',
							streams: 35,
							royalty: {
								name: 'PER',
								value: 0.013925000000000002,
								royaltyConverted: [
									{
										amount: 19.5019625,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.012532500000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 33,
							royalty: {
								name: 'MAR',
								value: 0.019199,
								royaltyConverted: [
									{
										amount: 26.888199500000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.017279100000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ETH',
							streams: 32,
							royalty: {
								name: 'ETH',
								value: 0.0017010000000000003,
								royaltyConverted: [
									{
										amount: 2.3822505000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0015309000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISL',
							streams: 28,
							royalty: {
								name: 'ISL',
								value: 0.111922,
								royaltyConverted: [
									{
										amount: 156.746761,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1007298,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LKA',
							streams: 26,
							royalty: {
								name: 'LKA',
								value: 0.0019430000000000003,
								royaltyConverted: [
									{
										amount: 2.7211715000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0017487000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 25,
							royalty: {
								name: 'EGY',
								value: 0.009486999999999999,
								royaltyConverted: [
									{
										amount: 13.286543499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.008538299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'VNM',
							streams: 23,
							royalty: {
								name: 'VNM',
								value: 0.0033030000000000004,
								royaltyConverted: [
									{
										amount: 4.6258515000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0029727000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JOR',
							streams: 22,
							royalty: {
								name: 'JOR',
								value: 0.029011,
								royaltyConverted: [
									{
										amount: 40.6299055,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0261099,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ECU',
							streams: 20,
							royalty: {
								name: 'ECU',
								value: 0.012568,
								royaltyConverted: [
									{
										amount: 17.601484,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0113112,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TZA',
							streams: 19,
							royalty: {
								name: 'TZA',
								value: 0.007566,
								royaltyConverted: [
									{
										amount: 10.596183,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0068094,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MWI',
							streams: 19,
							royalty: {
								name: 'MWI',
								value: 0.016916999999999998,
								royaltyConverted: [
									{
										amount: 23.692258499999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.015225299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TTO',
							streams: 18,
							royalty: {
								name: 'TTO',
								value: 0.014419999999999999,
								royaltyConverted: [
									{
										amount: 20.19521,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.012978,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KOR',
							streams: 16,
							royalty: {
								name: 'KOR',
								value: 0.039360000000000006,
								royaltyConverted: [
									{
										amount: 55.12368000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.035424000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GTM',
							streams: 15,
							royalty: {
								name: 'GTM',
								value: 0.0032639999999999995,
								royaltyConverted: [
									{
										amount: 4.571231999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0029376,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LTU',
							streams: 15,
							royalty: {
								name: 'LTU',
								value: 0.033563,
								royaltyConverted: [
									{
										amount: 47.00498150000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.030206700000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 14,
							royalty: {
								name: 'JAM',
								value: 0.020516,
								royaltyConverted: [
									{
										amount: 28.732658,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0184644,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'QAT',
							streams: 13,
							royalty: {
								name: 'QAT',
								value: 0.012074,
								royaltyConverted: [
									{
										amount: 16.909637,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0108666,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LVA',
							streams: 13,
							royalty: {
								name: 'LVA',
								value: 0.017447999999999998,
								royaltyConverted: [
									{
										amount: 24.435923999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0157032,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CYP',
							streams: 12,
							royalty: {
								name: 'CYP',
								value: 0.012468,
								royaltyConverted: [
									{
										amount: 17.461434,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0112212,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PAK',
							streams: 12,
							royalty: {
								name: 'PAK',
								value: -0.0021850000000000003,
								royaltyConverted: [
									{
										amount: -3.0600925000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0019665000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 12,
							royalty: {
								name: 'NAM',
								value: 0.001448,
								royaltyConverted: [
									{
										amount: 2.027924,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0013032,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HRV',
							streams: 10,
							royalty: {
								name: 'HRV',
								value: 0.012198000000000002,
								royaltyConverted: [
									{
										amount: 17.083299000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.010978200000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SLV',
							streams: 10,
							royalty: {
								name: 'SLV',
								value: 0.004748,
								royaltyConverted: [
									{
										amount: 6.649573999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0042732,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DZA',
							streams: 10,
							royalty: {
								name: 'DZA',
								value: 0.005546,
								royaltyConverted: [
									{
										amount: 7.767173,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0049914,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SRB',
							streams: 9,
							royalty: {
								name: 'SRB',
								value: -0.0016330000000000008,
								royaltyConverted: [
									{
										amount: -2.287016500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0014697000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'OMN',
							streams: 9,
							royalty: {
								name: 'OMN',
								value: 0.005057,
								royaltyConverted: [
									{
										amount: 7.0823285,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0045513,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BGR',
							streams: 9,
							royalty: {
								name: 'BGR',
								value: 0.011714,
								royaltyConverted: [
									{
										amount: 16.405457000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.010542600000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'RWA',
							streams: 9,
							royalty: {
								name: 'RWA',
								value: 0.005338000000000001,
								royaltyConverted: [
									{
										amount: 7.475869000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004804200000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 7,
							royalty: {
								name: 'MLT',
								value: 0.010527000000000002,
								royaltyConverted: [
									{
										amount: 14.743063500000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.009474300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PAN',
							streams: 7,
							royalty: {
								name: 'PAN',
								value: 0.003497000000000001,
								royaltyConverted: [
									{
										amount: 4.897548500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.003147300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BIH',
							streams: 7,
							royalty: {
								name: 'BIH',
								value: -0.0006390000000000002,
								royaltyConverted: [
									{
										amount: -0.8949195000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0005751000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BOL',
							streams: 7,
							royalty: {
								name: 'BOL',
								value: 0.0013099999999999995,
								royaltyConverted: [
									{
										amount: 1.8346549999999993,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0011789999999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 7,
							royalty: {
								name: 'GEO',
								value: 0.010393,
								royaltyConverted: [
									{
										amount: 14.555396499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0093537,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 6,
							royalty: {
								name: 'MUS',
								value: -0.00013700000000000084,
								royaltyConverted: [
									{
										amount: -0.19186850000000116,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00012330000000000075,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 6,
							royalty: {
								name: 'UKR',
								value: 0.004816999999999999,
								royaltyConverted: [
									{
										amount: 6.746208499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004335299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PRY',
							streams: 5,
							royalty: {
								name: 'PRY',
								value: -0.004478,
								royaltyConverted: [
									{
										amount: -6.271439,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0040302,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZWE',
							streams: 5,
							royalty: {
								name: 'ZWE',
								value: 0.0019649999999999997,
								royaltyConverted: [
									{
										amount: 2.7519824999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0017684999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AGO',
							streams: 4,
							royalty: {
								name: 'AGO',
								value: -0.0054670000000000005,
								royaltyConverted: [
									{
										amount: -7.656533500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.004920300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DOM',
							streams: 4,
							royalty: {
								name: 'DOM',
								value: 0.0006970000000000006,
								royaltyConverted: [
									{
										amount: 0.9761485000000008,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0006273000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 4,
							royalty: {
								name: 'BWA',
								value: -0.001275,
								royaltyConverted: [
									{
										amount: -1.7856375000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0011475,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MAC',
							streams: 4,
							royalty: {
								name: 'MAC',
								value: 0.0013840000000000002,
								royaltyConverted: [
									{
										amount: 1.9382920000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0012456000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CMR',
							streams: 4,
							royalty: {
								name: 'CMR',
								value: 0.004486,
								royaltyConverted: [
									{
										amount: 6.282643,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004037400000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BHR',
							streams: 4,
							royalty: {
								name: 'BHR',
								value: 0.005086,
								royaltyConverted: [
									{
										amount: 7.122943,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0045774000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NIC',
							streams: 3,
							royalty: {
								name: 'NIC',
								value: -0.0044080000000000005,
								royaltyConverted: [
									{
										amount: -6.173404000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.003967200000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 3,
							royalty: {
								name: 'BGD',
								value: -0.003224,
								royaltyConverted: [
									{
										amount: -4.515212,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0029016,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MKD',
							streams: 3,
							royalty: {
								name: 'MKD',
								value: 0.0013059999999999999,
								royaltyConverted: [
									{
										amount: 1.8290529999999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0011753999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SYC',
							streams: 3,
							royalty: {
								name: 'SYC',
								value: 0.002953999999999999,
								royaltyConverted: [
									{
										amount: 4.137076999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0026585999999999992,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 3,
							royalty: {
								name: 'MOZ',
								value: -0.000029999999999999645,
								royaltyConverted: [
									{
										amount: -0.042014999999999504,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00002699999999999968,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'URY',
							streams: 3,
							royalty: {
								name: 'URY',
								value: 0.0007069999999999997,
								royaltyConverted: [
									{
										amount: 0.9901534999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0006362999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BLZ',
							streams: 3,
							royalty: {
								name: 'BLZ',
								value: -0.001947,
								royaltyConverted: [
									{
										amount: -2.7267734999999997,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0017523,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GRD',
							streams: 3,
							royalty: {
								name: 'GRD',
								value: -0.001421,
								royaltyConverted: [
									{
										amount: -1.9901105,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0012789,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BEN',
							streams: 3,
							royalty: {
								name: 'BEN',
								value: -0.002474,
								royaltyConverted: [
									{
										amount: -3.464837,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0022266,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KWT',
							streams: 2,
							royalty: {
								name: 'KWT',
								value: -0.004734,
								royaltyConverted: [
									{
										amount: -6.629967000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.004260600000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PNG',
							streams: 2,
							royalty: {
								name: 'PNG',
								value: 0.0006350000000000001,
								royaltyConverted: [
									{
										amount: 0.8893175000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005715000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRB',
							streams: 2,
							royalty: {
								name: 'BRB',
								value: -0.00016299999999999995,
								royaltyConverted: [
									{
										amount: -0.22828149999999994,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00014669999999999996,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 2,
							royalty: {
								name: 'KAZ',
								value: -0.0017009999999999998,
								royaltyConverted: [
									{
										amount: -2.3822504999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0015309,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BDI',
							streams: 2,
							royalty: {
								name: 'BDI',
								value: 0.000471,
								royaltyConverted: [
									{
										amount: 0.6596355,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0004239,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KGZ',
							streams: 2,
							royalty: {
								name: 'KGZ',
								value: 0.00079,
								royaltyConverted: [
									{
										amount: 1.106395,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.000711,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LBN',
							streams: 2,
							royalty: {
								name: 'LBN',
								value: 0.002817,
								royaltyConverted: [
									{
										amount: 3.9452085,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0025353000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 2,
							royalty: {
								name: 'MDA',
								value: 0.003472,
								royaltyConverted: [
									{
										amount: 4.8625359999999995,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0031248,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FJI',
							streams: 2,
							royalty: {
								name: 'FJI',
								value: 0.00531,
								royaltyConverted: [
									{
										amount: 7.436654999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004778999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MCO',
							streams: 1,
							royalty: {
								name: 'MCO',
								value: -0.0016899999999999997,
								royaltyConverted: [
									{
										amount: -2.3668449999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0015209999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRN',
							streams: 1,
							royalty: {
								name: 'BRN',
								value: -0.0011520000000000002,
								royaltyConverted: [
									{
										amount: -1.6133760000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0010368000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MNG',
							streams: 1,
							royalty: {
								name: 'MNG',
								value: -0.0014980000000000002,
								royaltyConverted: [
									{
										amount: -2.0979490000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0013482000000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MNE',
							streams: 1,
							royalty: {
								name: 'MNE',
								value: -0.0011650000000000002,
								royaltyConverted: [
									{
										amount: -1.6315825000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0010485000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 1,
							royalty: {
								name: 'CIV',
								value: -0.0024400000000000003,
								royaltyConverted: [
									{
										amount: -3.4172200000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0021960000000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COM',
							streams: 1,
							royalty: {
								name: 'COM',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HTI',
							streams: 1,
							royalty: {
								name: 'HTI',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LSO',
							streams: 1,
							royalty: {
								name: 'LSO',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NPL',
							streams: 1,
							royalty: {
								name: 'NPL',
								value: 0.000236,
								royaltyConverted: [
									{
										amount: 0.330518,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.00021239999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BHS',
							streams: 1,
							royalty: {
								name: 'BHS',
								value: 0.002324,
								royaltyConverted: [
									{
										amount: 3.2547620000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0020916000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COD',
							streams: 1,
							royalty: {
								name: 'COD',
								value: 0.00283,
								royaltyConverted: [
									{
										amount: 3.963415,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0025470000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MDV',
							streams: 1,
							royalty: {
								name: 'MDV',
								value: 0.003072,
								royaltyConverted: [
									{
										amount: 4.302336,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0027648,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 31451,
							royalty: {
								name: 'Streaming',
								value: 80.5150058,
								royaltyConverted: [
									{
										amount: 112761.2656229,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 72.46350522,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UGC',
							streams: 8,
							royalty: {
								name: 'UGC',
								value: 0.0329627,
								royaltyConverted: [
									{
										amount: 46.16426135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.029666429999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Download',
							streams: 1,
							royalty: {
								name: 'Download',
								value: 0.387,
								royaltyConverted: [
									{
										amount: 541.9935,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3483,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					]
				}
			],
			createdAt: '2025-04-26T17:54:04.803Z',
			updatedAt: '2025-04-26T17:54:04.803Z',
			'**v': 0
		},
		{
			_id: '680d1dc62f3e4681ec7748cf',
			artistId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			activityPeriod: 'July 2023',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					upcCode: '197077506990',
					isrcCode: 'QZTV32204282',
					catalogueId: 'CAT700264',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.3958857,
						royaltyConverted: [
							{
								amount: 554.4379228500001,
								rate: 1400.5,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							},
							{
								amount: 0.35629713,
								rate: 0.9,
								fromCurrency: 'USD',
								toCurrency: 'GBP'
							}
						]
					},
					totalStreams: 148,
					dspData: [
						{
							name: 'Audiomack',
							streams: 70,
							royalty: {
								name: 'Audiomack',
								value: 0.0335517,
								royaltyConverted: [
									{
										amount: 46.989155849999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.03019653,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Deezer',
							streams: 66,
							royalty: {
								name: 'Deezer',
								value: 0.310247,
								royaltyConverted: [
									{
										amount: 434.5009235,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2792223,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Soundcloud Subscription',
							streams: 10,
							royalty: {
								name: 'Soundcloud Subscription',
								value: 0.051503,
								royaltyConverted: [
									{
										amount: 72.1299515,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.046352700000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Soundcloud Ad Monetization',
							streams: 2,
							royalty: {
								name: 'Soundcloud Ad Monetization',
								value: 0.000584,
								royaltyConverted: [
									{
										amount: 0.817892,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005256,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'USA',
							streams: 70,
							royalty: {
								name: 'USA',
								value: 0.0335517,
								royaltyConverted: [
									{
										amount: 46.989155849999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.03019653,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRA',
							streams: 17,
							royalty: {
								name: 'BRA',
								value: 0.019657,
								royaltyConverted: [
									{
										amount: 27.5296285,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0176913,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FRA',
							streams: 16,
							royalty: {
								name: 'FRA',
								value: 0.083276,
								royaltyConverted: [
									{
										amount: 116.628038,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0749484,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HRV',
							streams: 16,
							royalty: {
								name: 'HRV',
								value: 0.14356,
								royaltyConverted: [
									{
										amount: 201.05578,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.12920399999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CAN',
							streams: 9,
							royalty: {
								name: 'CAN',
								value: 0.02414,
								royaltyConverted: [
									{
										amount: 33.80807,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.021726000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISR',
							streams: 7,
							royalty: {
								name: 'ISR',
								value: 0.034908,
								royaltyConverted: [
									{
										amount: 48.888654,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0314172,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COL',
							streams: 3,
							royalty: {
								name: 'COL',
								value: 0.004384,
								royaltyConverted: [
									{
										amount: 6.139792,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0039456,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DEU',
							streams: 3,
							royalty: {
								name: 'DEU',
								value: 0.010301,
								royaltyConverted: [
									{
										amount: 14.4265505,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0092709,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NLD',
							streams: 2,
							royalty: {
								name: 'NLD',
								value: 0.000584,
								royaltyConverted: [
									{
										amount: 0.817892,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005256,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZAF',
							streams: 2,
							royalty: {
								name: 'ZAF',
								value: 0.004796,
								royaltyConverted: [
									{
										amount: 6.716798,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0043164,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SLV',
							streams: 2,
							royalty: {
								name: 'SLV',
								value: 0.009365,
								royaltyConverted: [
									{
										amount: 13.1156825,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0084285,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GBR',
							streams: 1,
							royalty: {
								name: 'GBR',
								value: 0.027363,
								royaltyConverted: [
									{
										amount: 38.321881499999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.024626699999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 148,
							royalty: {
								name: 'Streaming',
								value: 0.3958857,
								royaltyConverted: [
									{
										amount: 554.4379228500001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.35629713,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					]
				}
			],
			createdAt: '2025-04-26T17:54:14.275Z',
			updatedAt: '2025-04-26T17:54:14.275Z',
			'**v': 0
		},
		{
			_id: '680d1dbc2f3e4681ec7748ca',
			artistId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			activityPeriod: 'September 2023',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					upcCode: '197077506990',
					isrcCode: 'QZTV32204282',
					catalogueId: 'CAT700264',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 80.9349685,
						royaltyConverted: [
							{
								amount: 113349.42338425,
								rate: 1400.5,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							},
							{
								amount: 72.84147165,
								rate: 0.9,
								fromCurrency: 'USD',
								toCurrency: 'GBP'
							}
						]
					},
					totalStreams: 31460,
					dspData: [
						{
							name: 'Spotify',
							streams: 30197,
							royalty: {
								name: 'Spotify',
								value: 75.4326837,
								royaltyConverted: [
									{
										amount: 105643.47352185,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 67.88941533,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Apple Music',
							streams: 946,
							royalty: {
								name: 'Apple Music',
								value: 3.7293000000000003,
								royaltyConverted: [
									{
										amount: 5222.88465,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.3563700000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'YouTube Streaming',
							streams: 282,
							royalty: {
								name: 'YouTube Streaming',
								value: 1.1349464,
								royaltyConverted: [
									{
										amount: 1589.4924332,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0214517600000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Amazon Music Unlimited',
							streams: 25,
							royalty: {
								name: 'Amazon Music Unlimited',
								value: 0.20667970000000002,
								royaltyConverted: [
									{
										amount: 289.45491985,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.18601173000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'YouTube Content ID',
							streams: 8,
							royalty: {
								name: 'YouTube Content ID',
								value: 0.0329627,
								royaltyConverted: [
									{
										amount: 46.16426135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.029666429999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TIDAL',
							streams: 1,
							royalty: {
								name: 'TIDAL',
								value: 0.011396,
								royaltyConverted: [
									{
										amount: 15.960098,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0102564,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'iTunes',
							streams: 1,
							royalty: {
								name: 'iTunes',
								value: 0.387,
								royaltyConverted: [
									{
										amount: 541.9935,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3483,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'USA',
							streams: 7589,
							royalty: {
								name: 'USA',
								value: 18.5634435,
								royaltyConverted: [
									{
										amount: 25998.102621750004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 16.70709915,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GBR',
							streams: 3559,
							royalty: {
								name: 'GBR',
								value: 16.894138,
								royaltyConverted: [
									{
										amount: 23660.240269,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 15.204724200000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NLD',
							streams: 1894,
							royalty: {
								name: 'NLD',
								value: 6.233165,
								royaltyConverted: [
									{
										amount: 8729.5475825,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 5.6098485,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DEU',
							streams: 1889,
							royalty: {
								name: 'DEU',
								value: 4.9111959999999995,
								royaltyConverted: [
									{
										amount: 6878.129997999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 4.420076399999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CAN',
							streams: 1617,
							royalty: {
								name: 'CAN',
								value: 3.380494,
								royaltyConverted: [
									{
										amount: 4734.381847000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.0424446,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SWE',
							streams: 1438,
							royalty: {
								name: 'SWE',
								value: 4.939563,
								royaltyConverted: [
									{
										amount: 6917.857981499999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 4.4456067,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AUS',
							streams: 1431,
							royalty: {
								name: 'AUS',
								value: 3.611202,
								royaltyConverted: [
									{
										amount: 5057.488401,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.2500818000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PHL',
							streams: 1187,
							royalty: {
								name: 'PHL',
								value: 0.493084,
								royaltyConverted: [
									{
										amount: 690.5641420000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.44377560000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NGA',
							streams: 1014,
							royalty: {
								name: 'NGA',
								value: 0.271202,
								royaltyConverted: [
									{
										amount: 379.818401,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.24408180000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NOR',
							streams: 900,
							royalty: {
								name: 'NOR',
								value: 3.9062010000000003,
								royaltyConverted: [
									{
										amount: 5470.6345005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 3.5155809000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FRA',
							streams: 845,
							royalty: {
								name: 'FRA',
								value: 2.399426,
								royaltyConverted: [
									{
										amount: 3360.3961130000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 2.1594834,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZAF',
							streams: 632,
							royalty: {
								name: 'ZAF',
								value: 0.610511,
								royaltyConverted: [
									{
										amount: 855.0206555000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.5494599,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DNK',
							streams: 518,
							royalty: {
								name: 'DNK',
								value: 2.200149,
								royaltyConverted: [
									{
										amount: 3081.3086745,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.9801341000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRA',
							streams: 483,
							royalty: {
								name: 'BRA',
								value: 0.534734,
								royaltyConverted: [
									{
										amount: 748.8949670000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.48126060000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IND',
							streams: 410,
							royalty: {
								name: 'IND',
								value: 0.22198600000000002,
								royaltyConverted: [
									{
										amount: 310.89139300000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.19978740000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CHE',
							streams: 394,
							royalty: {
								name: 'CHE',
								value: 1.600847,
								royaltyConverted: [
									{
										amount: 2241.9862235,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.4407623,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NZL',
							streams: 385,
							royalty: {
								name: 'NZL',
								value: 1.1224770000000002,
								royaltyConverted: [
									{
										amount: 1572.0290385000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0102293000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IDN',
							streams: 309,
							royalty: {
								name: 'IDN',
								value: 0.109793,
								royaltyConverted: [
									{
										amount: 153.7650965,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0988137,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ESP',
							streams: 299,
							royalty: {
								name: 'ESP',
								value: 0.524829,
								royaltyConverted: [
									{
										amount: 735.0230144999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.4723461,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'IRL',
							streams: 296,
							royalty: {
								name: 'IRL',
								value: 1.188142,
								royaltyConverted: [
									{
										amount: 1663.9928710000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 1.0693278000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BEL',
							streams: 290,
							royalty: {
								name: 'BEL',
								value: 0.910252,
								royaltyConverted: [
									{
										amount: 1274.807926,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.8192267999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PRT',
							streams: 289,
							royalty: {
								name: 'PRT',
								value: 0.49129100000000003,
								royaltyConverted: [
									{
										amount: 688.0530455,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.44216190000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ITA',
							streams: 271,
							royalty: {
								name: 'ITA',
								value: 0.601792,
								royaltyConverted: [
									{
										amount: 842.809696,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.5416128,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AUT',
							streams: 268,
							royalty: {
								name: 'AUT',
								value: 0.81074,
								royaltyConverted: [
									{
										amount: 1135.44137,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.729666,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'POL',
							streams: 263,
							royalty: {
								name: 'POL',
								value: 0.288419,
								royaltyConverted: [
									{
										amount: 403.93080949999995,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2595771,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MEX',
							streams: 236,
							royalty: {
								name: 'MEX',
								value: 0.21946900000000003,
								royaltyConverted: [
									{
										amount: 307.36633450000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.19752210000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ARE',
							streams: 175,
							royalty: {
								name: 'ARE',
								value: 0.475012,
								royaltyConverted: [
									{
										amount: 665.254306,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.4275108,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SGP',
							streams: 143,
							royalty: {
								name: 'SGP',
								value: 0.22989300000000001,
								royaltyConverted: [
									{
										amount: 321.9651465,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.20690370000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TUR',
							streams: 137,
							royalty: {
								name: 'TUR',
								value: 0.032183,
								royaltyConverted: [
									{
										amount: 45.072291500000006,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.028964700000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COL',
							streams: 134,
							royalty: {
								name: 'COL',
								value: 0.063891,
								royaltyConverted: [
									{
										amount: 89.47934550000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0575019,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KEN',
							streams: 125,
							royalty: {
								name: 'KEN',
								value: 0.435778,
								royaltyConverted: [
									{
										amount: 610.307089,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3922002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MYS',
							streams: 120,
							royalty: {
								name: 'MYS',
								value: 0.07894400000000001,
								royaltyConverted: [
									{
										amount: 110.56107200000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.07104960000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CZE',
							streams: 98,
							royalty: {
								name: 'CZE',
								value: 0.129577,
								royaltyConverted: [
									{
										amount: 181.4725885,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1166193,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISR',
							streams: 93,
							royalty: {
								name: 'ISR',
								value: 0.205433,
								royaltyConverted: [
									{
										amount: 287.7089165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.18488970000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SVK',
							streams: 86,
							royalty: {
								name: 'SVK',
								value: 0.143233,
								royaltyConverted: [
									{
										amount: 200.5978165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.12890970000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LUX',
							streams: 84,
							royalty: {
								name: 'LUX',
								value: 0.352439,
								royaltyConverted: [
									{
										amount: 493.5908195,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3171951,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'EST',
							streams: 82,
							royalty: {
								name: 'EST',
								value: 0.17835900000000002,
								royaltyConverted: [
									{
										amount: 249.79177950000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.16052310000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FIN',
							streams: 74,
							royalty: {
								name: 'FIN',
								value: 0.258081,
								royaltyConverted: [
									{
										amount: 361.44244050000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2322729,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ROM',
							streams: 74,
							royalty: {
								name: 'ROM',
								value: 0.152161,
								royaltyConverted: [
									{
										amount: 213.10148049999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1369449,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ARG',
							streams: 70,
							royalty: {
								name: 'ARG',
								value: 0.023375,
								royaltyConverted: [
									{
										amount: 32.7366875,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0210375,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'THA',
							streams: 64,
							royalty: {
								name: 'THA',
								value: 0.031498,
								royaltyConverted: [
									{
										amount: 44.112949,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0283482,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GRC',
							streams: 58,
							royalty: {
								name: 'GRC',
								value: 0.103173,
								royaltyConverted: [
									{
										amount: 144.4937865,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0928557,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UGA',
							streams: 58,
							royalty: {
								name: 'UGA',
								value: 0.040027,
								royaltyConverted: [
									{
										amount: 56.0578135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0360243,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CHL',
							streams: 55,
							royalty: {
								name: 'CHL',
								value: 0.037555,
								royaltyConverted: [
									{
										amount: 52.5957775,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.033799499999999996,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GHA',
							streams: 55,
							royalty: {
								name: 'GHA',
								value: 0.025833000000000002,
								royaltyConverted: [
									{
										amount: 36.1791165,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0232497,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JPN',
							streams: 52,
							royalty: {
								name: 'JPN',
								value: 0.10642299999999999,
								royaltyConverted: [
									{
										amount: 149.04541149999997,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0957807,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZMB',
							streams: 48,
							royalty: {
								name: 'ZMB',
								value: 0.016725999999999998,
								royaltyConverted: [
									{
										amount: 23.424763,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.015053399999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HUN',
							streams: 47,
							royalty: {
								name: 'HUN',
								value: 0.057990999999999994,
								royaltyConverted: [
									{
										amount: 81.21639549999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.05219189999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CRI',
							streams: 44,
							royalty: {
								name: 'CRI',
								value: 0.043793,
								royaltyConverted: [
									{
										amount: 61.3320965,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0394137,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SVN',
							streams: 43,
							royalty: {
								name: 'SVN',
								value: 0.05542,
								royaltyConverted: [
									{
										amount: 77.61570999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.049878,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TWN',
							streams: 37,
							royalty: {
								name: 'TWN',
								value: 0.026807000000000004,
								royaltyConverted: [
									{
										amount: 37.543203500000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.024126300000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HKG',
							streams: 36,
							royalty: {
								name: 'HKG',
								value: 0.07347400000000001,
								royaltyConverted: [
									{
										amount: 102.90033700000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.06612660000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SAU',
							streams: 36,
							royalty: {
								name: 'SAU',
								value: 0.07424700000000001,
								royaltyConverted: [
									{
										amount: 103.98292350000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.06682230000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PER',
							streams: 35,
							royalty: {
								name: 'PER',
								value: 0.013925000000000002,
								royaltyConverted: [
									{
										amount: 19.5019625,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.012532500000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MAR',
							streams: 33,
							royalty: {
								name: 'MAR',
								value: 0.019199,
								royaltyConverted: [
									{
										amount: 26.888199500000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.017279100000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ETH',
							streams: 32,
							royalty: {
								name: 'ETH',
								value: 0.0017010000000000003,
								royaltyConverted: [
									{
										amount: 2.3822505000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0015309000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISL',
							streams: 28,
							royalty: {
								name: 'ISL',
								value: 0.111922,
								royaltyConverted: [
									{
										amount: 156.746761,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.1007298,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LKA',
							streams: 26,
							royalty: {
								name: 'LKA',
								value: 0.0019430000000000003,
								royaltyConverted: [
									{
										amount: 2.7211715000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0017487000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'EGY',
							streams: 25,
							royalty: {
								name: 'EGY',
								value: 0.009486999999999999,
								royaltyConverted: [
									{
										amount: 13.286543499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.008538299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'VNM',
							streams: 23,
							royalty: {
								name: 'VNM',
								value: 0.0033030000000000004,
								royaltyConverted: [
									{
										amount: 4.6258515000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0029727000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JOR',
							streams: 22,
							royalty: {
								name: 'JOR',
								value: 0.029011,
								royaltyConverted: [
									{
										amount: 40.6299055,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0261099,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ECU',
							streams: 20,
							royalty: {
								name: 'ECU',
								value: 0.012568,
								royaltyConverted: [
									{
										amount: 17.601484,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0113112,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TZA',
							streams: 19,
							royalty: {
								name: 'TZA',
								value: 0.007566,
								royaltyConverted: [
									{
										amount: 10.596183,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0068094,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MWI',
							streams: 19,
							royalty: {
								name: 'MWI',
								value: 0.016916999999999998,
								royaltyConverted: [
									{
										amount: 23.692258499999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.015225299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'TTO',
							streams: 18,
							royalty: {
								name: 'TTO',
								value: 0.014419999999999999,
								royaltyConverted: [
									{
										amount: 20.19521,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.012978,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KOR',
							streams: 16,
							royalty: {
								name: 'KOR',
								value: 0.039360000000000006,
								royaltyConverted: [
									{
										amount: 55.12368000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.035424000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GTM',
							streams: 15,
							royalty: {
								name: 'GTM',
								value: 0.0032639999999999995,
								royaltyConverted: [
									{
										amount: 4.571231999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0029376,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LTU',
							streams: 15,
							royalty: {
								name: 'LTU',
								value: 0.033563,
								royaltyConverted: [
									{
										amount: 47.00498150000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.030206700000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'JAM',
							streams: 14,
							royalty: {
								name: 'JAM',
								value: 0.020516,
								royaltyConverted: [
									{
										amount: 28.732658,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0184644,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'QAT',
							streams: 13,
							royalty: {
								name: 'QAT',
								value: 0.012074,
								royaltyConverted: [
									{
										amount: 16.909637,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0108666,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LVA',
							streams: 13,
							royalty: {
								name: 'LVA',
								value: 0.017447999999999998,
								royaltyConverted: [
									{
										amount: 24.435923999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0157032,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CYP',
							streams: 12,
							royalty: {
								name: 'CYP',
								value: 0.012468,
								royaltyConverted: [
									{
										amount: 17.461434,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0112212,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PAK',
							streams: 12,
							royalty: {
								name: 'PAK',
								value: -0.0021850000000000003,
								royaltyConverted: [
									{
										amount: -3.0600925000000005,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0019665000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NAM',
							streams: 12,
							royalty: {
								name: 'NAM',
								value: 0.001448,
								royaltyConverted: [
									{
										amount: 2.027924,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0013032,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HRV',
							streams: 10,
							royalty: {
								name: 'HRV',
								value: 0.012198000000000002,
								royaltyConverted: [
									{
										amount: 17.083299000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.010978200000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SLV',
							streams: 10,
							royalty: {
								name: 'SLV',
								value: 0.004748,
								royaltyConverted: [
									{
										amount: 6.649573999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0042732,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DZA',
							streams: 10,
							royalty: {
								name: 'DZA',
								value: 0.005546,
								royaltyConverted: [
									{
										amount: 7.767173,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0049914,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SRB',
							streams: 9,
							royalty: {
								name: 'SRB',
								value: -0.0016330000000000008,
								royaltyConverted: [
									{
										amount: -2.287016500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0014697000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'OMN',
							streams: 9,
							royalty: {
								name: 'OMN',
								value: 0.005057,
								royaltyConverted: [
									{
										amount: 7.0823285,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0045513,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BGR',
							streams: 9,
							royalty: {
								name: 'BGR',
								value: 0.011714,
								royaltyConverted: [
									{
										amount: 16.405457000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.010542600000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'RWA',
							streams: 9,
							royalty: {
								name: 'RWA',
								value: 0.005338000000000001,
								royaltyConverted: [
									{
										amount: 7.475869000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004804200000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MLT',
							streams: 7,
							royalty: {
								name: 'MLT',
								value: 0.010527000000000002,
								royaltyConverted: [
									{
										amount: 14.743063500000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.009474300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PAN',
							streams: 7,
							royalty: {
								name: 'PAN',
								value: 0.003497000000000001,
								royaltyConverted: [
									{
										amount: 4.897548500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.003147300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BIH',
							streams: 7,
							royalty: {
								name: 'BIH',
								value: -0.0006390000000000002,
								royaltyConverted: [
									{
										amount: -0.8949195000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0005751000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BOL',
							streams: 7,
							royalty: {
								name: 'BOL',
								value: 0.0013099999999999995,
								royaltyConverted: [
									{
										amount: 1.8346549999999993,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0011789999999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GEO',
							streams: 7,
							royalty: {
								name: 'GEO',
								value: 0.010393,
								royaltyConverted: [
									{
										amount: 14.555396499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0093537,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MUS',
							streams: 6,
							royalty: {
								name: 'MUS',
								value: -0.00013700000000000084,
								royaltyConverted: [
									{
										amount: -0.19186850000000116,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00012330000000000075,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UKR',
							streams: 6,
							royalty: {
								name: 'UKR',
								value: 0.004816999999999999,
								royaltyConverted: [
									{
										amount: 6.746208499999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004335299999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PRY',
							streams: 5,
							royalty: {
								name: 'PRY',
								value: -0.004478,
								royaltyConverted: [
									{
										amount: -6.271439,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0040302,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZWE',
							streams: 5,
							royalty: {
								name: 'ZWE',
								value: 0.0019649999999999997,
								royaltyConverted: [
									{
										amount: 2.7519824999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0017684999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'AGO',
							streams: 4,
							royalty: {
								name: 'AGO',
								value: -0.0054670000000000005,
								royaltyConverted: [
									{
										amount: -7.656533500000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.004920300000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DOM',
							streams: 4,
							royalty: {
								name: 'DOM',
								value: 0.0006970000000000006,
								royaltyConverted: [
									{
										amount: 0.9761485000000008,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0006273000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BWA',
							streams: 4,
							royalty: {
								name: 'BWA',
								value: -0.001275,
								royaltyConverted: [
									{
										amount: -1.7856375000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0011475,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MAC',
							streams: 4,
							royalty: {
								name: 'MAC',
								value: 0.0013840000000000002,
								royaltyConverted: [
									{
										amount: 1.9382920000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0012456000000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CMR',
							streams: 4,
							royalty: {
								name: 'CMR',
								value: 0.004486,
								royaltyConverted: [
									{
										amount: 6.282643,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004037400000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BHR',
							streams: 4,
							royalty: {
								name: 'BHR',
								value: 0.005086,
								royaltyConverted: [
									{
										amount: 7.122943,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0045774000000000006,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NIC',
							streams: 3,
							royalty: {
								name: 'NIC',
								value: -0.0044080000000000005,
								royaltyConverted: [
									{
										amount: -6.173404000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.003967200000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BGD',
							streams: 3,
							royalty: {
								name: 'BGD',
								value: -0.003224,
								royaltyConverted: [
									{
										amount: -4.515212,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0029016,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MKD',
							streams: 3,
							royalty: {
								name: 'MKD',
								value: 0.0013059999999999999,
								royaltyConverted: [
									{
										amount: 1.8290529999999998,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0011753999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SYC',
							streams: 3,
							royalty: {
								name: 'SYC',
								value: 0.002953999999999999,
								royaltyConverted: [
									{
										amount: 4.137076999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0026585999999999992,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MOZ',
							streams: 3,
							royalty: {
								name: 'MOZ',
								value: -0.000029999999999999645,
								royaltyConverted: [
									{
										amount: -0.042014999999999504,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00002699999999999968,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'URY',
							streams: 3,
							royalty: {
								name: 'URY',
								value: 0.0007069999999999997,
								royaltyConverted: [
									{
										amount: 0.9901534999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0006362999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BLZ',
							streams: 3,
							royalty: {
								name: 'BLZ',
								value: -0.001947,
								royaltyConverted: [
									{
										amount: -2.7267734999999997,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0017523,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GRD',
							streams: 3,
							royalty: {
								name: 'GRD',
								value: -0.001421,
								royaltyConverted: [
									{
										amount: -1.9901105,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0012789,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BEN',
							streams: 3,
							royalty: {
								name: 'BEN',
								value: -0.002474,
								royaltyConverted: [
									{
										amount: -3.464837,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0022266,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KWT',
							streams: 2,
							royalty: {
								name: 'KWT',
								value: -0.004734,
								royaltyConverted: [
									{
										amount: -6.629967000000001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.004260600000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'PNG',
							streams: 2,
							royalty: {
								name: 'PNG',
								value: 0.0006350000000000001,
								royaltyConverted: [
									{
										amount: 0.8893175000000002,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005715000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRB',
							streams: 2,
							royalty: {
								name: 'BRB',
								value: -0.00016299999999999995,
								royaltyConverted: [
									{
										amount: -0.22828149999999994,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.00014669999999999996,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KAZ',
							streams: 2,
							royalty: {
								name: 'KAZ',
								value: -0.0017009999999999998,
								royaltyConverted: [
									{
										amount: -2.3822504999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0015309,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BDI',
							streams: 2,
							royalty: {
								name: 'BDI',
								value: 0.000471,
								royaltyConverted: [
									{
										amount: 0.6596355,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0004239,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'KGZ',
							streams: 2,
							royalty: {
								name: 'KGZ',
								value: 0.00079,
								royaltyConverted: [
									{
										amount: 1.106395,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.000711,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LBN',
							streams: 2,
							royalty: {
								name: 'LBN',
								value: 0.002817,
								royaltyConverted: [
									{
										amount: 3.9452085,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0025353000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MDA',
							streams: 2,
							royalty: {
								name: 'MDA',
								value: 0.003472,
								royaltyConverted: [
									{
										amount: 4.8625359999999995,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0031248,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FJI',
							streams: 2,
							royalty: {
								name: 'FJI',
								value: 0.00531,
								royaltyConverted: [
									{
										amount: 7.436654999999999,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.004778999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MCO',
							streams: 1,
							royalty: {
								name: 'MCO',
								value: -0.0016899999999999997,
								royaltyConverted: [
									{
										amount: -2.3668449999999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0015209999999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRN',
							streams: 1,
							royalty: {
								name: 'BRN',
								value: -0.0011520000000000002,
								royaltyConverted: [
									{
										amount: -1.6133760000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0010368000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MNG',
							streams: 1,
							royalty: {
								name: 'MNG',
								value: -0.0014980000000000002,
								royaltyConverted: [
									{
										amount: -2.0979490000000003,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0013482000000000001,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MNE',
							streams: 1,
							royalty: {
								name: 'MNE',
								value: -0.0011650000000000002,
								royaltyConverted: [
									{
										amount: -1.6315825000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0010485000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CIV',
							streams: 1,
							royalty: {
								name: 'CIV',
								value: -0.0024400000000000003,
								royaltyConverted: [
									{
										amount: -3.4172200000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0021960000000000005,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COM',
							streams: 1,
							royalty: {
								name: 'COM',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HTI',
							streams: 1,
							royalty: {
								name: 'HTI',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'LSO',
							streams: 1,
							royalty: {
								name: 'LSO',
								value: -0.002944,
								royaltyConverted: [
									{
										amount: -4.123072,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: -0.0026496000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NPL',
							streams: 1,
							royalty: {
								name: 'NPL',
								value: 0.000236,
								royaltyConverted: [
									{
										amount: 0.330518,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.00021239999999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BHS',
							streams: 1,
							royalty: {
								name: 'BHS',
								value: 0.002324,
								royaltyConverted: [
									{
										amount: 3.2547620000000004,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0020916000000000003,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COD',
							streams: 1,
							royalty: {
								name: 'COD',
								value: 0.00283,
								royaltyConverted: [
									{
										amount: 3.963415,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0025470000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'MDV',
							streams: 1,
							royalty: {
								name: 'MDV',
								value: 0.003072,
								royaltyConverted: [
									{
										amount: 4.302336,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0027648,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 31451,
							royalty: {
								name: 'Streaming',
								value: 80.5150058,
								royaltyConverted: [
									{
										amount: 112761.2656229,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 72.46350522,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'UGC',
							streams: 8,
							royalty: {
								name: 'UGC',
								value: 0.0329627,
								royaltyConverted: [
									{
										amount: 46.16426135,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.029666429999999997,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Download',
							streams: 1,
							royalty: {
								name: 'Download',
								value: 0.387,
								royaltyConverted: [
									{
										amount: 541.9935,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.3483,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					]
				}
			],
			createdAt: '2025-04-26T17:54:04.803Z',
			updatedAt: '2025-04-26T17:54:04.803Z',
			'**v': 0
		},
		{
			_id: '680d1dc62f3e4681ec7748cf',
			artistId: '67a0d183125b32b4b96b8e34',
			artistName: 'Xtofa',
			activityPeriod: 'July 2023',
			fullReports: [
				{
					trackTitle: 'Simple and Sweet Refix',
					upcCode: '197077506990',
					isrcCode: 'QZTV32204282',
					catalogueId: 'CAT700264',
					totalRoyaltyUSD: {
						name: 'Total Royalty in USD',
						value: 0.3958857,
						royaltyConverted: [
							{
								amount: 554.4379228500001,
								rate: 1400.5,
								fromCurrency: 'USD',
								toCurrency: 'NGN'
							},
							{
								amount: 0.35629713,
								rate: 0.9,
								fromCurrency: 'USD',
								toCurrency: 'GBP'
							}
						]
					},
					totalStreams: 148,
					dspData: [
						{
							name: 'Audiomack',
							streams: 70,
							royalty: {
								name: 'Audiomack',
								value: 0.0335517,
								royaltyConverted: [
									{
										amount: 46.989155849999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.03019653,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Deezer',
							streams: 66,
							royalty: {
								name: 'Deezer',
								value: 0.310247,
								royaltyConverted: [
									{
										amount: 434.5009235,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.2792223,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Soundcloud Subscription',
							streams: 10,
							royalty: {
								name: 'Soundcloud Subscription',
								value: 0.051503,
								royaltyConverted: [
									{
										amount: 72.1299515,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.046352700000000004,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'Soundcloud Ad Monetization',
							streams: 2,
							royalty: {
								name: 'Soundcloud Ad Monetization',
								value: 0.000584,
								royaltyConverted: [
									{
										amount: 0.817892,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005256,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					countryData: [
						{
							name: 'USA',
							streams: 70,
							royalty: {
								name: 'USA',
								value: 0.0335517,
								royaltyConverted: [
									{
										amount: 46.989155849999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.03019653,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'BRA',
							streams: 17,
							royalty: {
								name: 'BRA',
								value: 0.019657,
								royaltyConverted: [
									{
										amount: 27.5296285,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0176913,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'FRA',
							streams: 16,
							royalty: {
								name: 'FRA',
								value: 0.083276,
								royaltyConverted: [
									{
										amount: 116.628038,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0749484,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'HRV',
							streams: 16,
							royalty: {
								name: 'HRV',
								value: 0.14356,
								royaltyConverted: [
									{
										amount: 201.05578,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.12920399999999999,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'CAN',
							streams: 9,
							royalty: {
								name: 'CAN',
								value: 0.02414,
								royaltyConverted: [
									{
										amount: 33.80807,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.021726000000000002,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ISR',
							streams: 7,
							royalty: {
								name: 'ISR',
								value: 0.034908,
								royaltyConverted: [
									{
										amount: 48.888654,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0314172,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'COL',
							streams: 3,
							royalty: {
								name: 'COL',
								value: 0.004384,
								royaltyConverted: [
									{
										amount: 6.139792,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0039456,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'DEU',
							streams: 3,
							royalty: {
								name: 'DEU',
								value: 0.010301,
								royaltyConverted: [
									{
										amount: 14.4265505,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0092709,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'NLD',
							streams: 2,
							royalty: {
								name: 'NLD',
								value: 0.000584,
								royaltyConverted: [
									{
										amount: 0.817892,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0005256,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'ZAF',
							streams: 2,
							royalty: {
								name: 'ZAF',
								value: 0.004796,
								royaltyConverted: [
									{
										amount: 6.716798,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0043164,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'SLV',
							streams: 2,
							royalty: {
								name: 'SLV',
								value: 0.009365,
								royaltyConverted: [
									{
										amount: 13.1156825,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.0084285,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						},
						{
							name: 'GBR',
							streams: 1,
							royalty: {
								name: 'GBR',
								value: 0.027363,
								royaltyConverted: [
									{
										amount: 38.321881499999996,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.024626699999999998,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					],
					deliveryData: [
						{
							name: 'Streaming',
							streams: 148,
							royalty: {
								name: 'Streaming',
								value: 0.3958857,
								royaltyConverted: [
									{
										amount: 554.4379228500001,
										rate: 1400.5,
										fromCurrency: 'USD',
										toCurrency: 'NGN'
									},
									{
										amount: 0.35629713,
										rate: 0.9,
										fromCurrency: 'USD',
										toCurrency: 'GBP'
									}
								]
							}
						}
					]
				}
			],
			createdAt: '2025-04-26T17:54:14.275Z',
			updatedAt: '2025-04-26T17:54:14.275Z',
			'**v': 0
		}
	]
};
