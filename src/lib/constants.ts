import artist1Img from '@/app/assets/artist-1.png';
import artist2Img from '@/app/assets/artist-2.png';
import artist3Img from '@/app/assets/artist-3.png';
import artist4Img from '@/app/assets/artist-4.png';
import artist5Img from '@/app/assets/artist-5.png';
import artist6Img from '@/app/assets/artist-6.png';
import featureLg1img from '@/app/assets/features-lg-1.png';
import featureLg2img from '@/app/assets/features-lg-2.png';
import featureLg3img from '@/app/assets/features-lg-3.png';
import featureLg4img from '@/app/assets/features-lg-4.png';
import analyticsIcon from '@/app/assets/feature-icons/analytics.svg';
import analytics from '@/app/assets/features/analytics.png';
import smartlinkIcon from '@/app/assets/feature-icons/smartlink.svg';
import smartlink from '@/app/assets/features/smartlink.png';
import uploadIcon from '@/app/assets/feature-icons/upload.svg';
import upload from '@/app/assets/features/upload.png';
import swiftIcon from '@/app/assets/feature-icons/swift.svg';
import swift from '@/app/assets/features/swift.png';
import statisticsIcon from '@/app/assets/feature-icons/statistics.svg';
import statistics from '@/app/assets/features/statistics.png';
import videoUpload from '@/app/assets/features/video-upload.png';
import { FeatureCardProps } from '@/components/landing-page/features/features-card';
import { StaticImageData } from 'next/image';
import albumImg from '@/app/assets/album.png';
import extendedImg from '@/app/assets/extended-playlist.png';
import trackImg from '@/app/assets/track.png';
export enum SingupStep {
	GENERAL,
	BANK
}

export const urls = {
	forgotPassword: '/forgot-password',

	login: '/login',
	register: '/artiste/register',
	dashboard: '/artiste/dashboard',
	uploadMusic: '/upload',
	uploadAlbum: '/upload/album',
	onboarding: '/onboarding',
	onboardingSatus: '/onboarding/status',
	settings: '/settings',
	editProfile: '/settings/edit-profile',
	settingsPassword: '/settings/password',
	changePassword: '/settings/edit-password',
	editBank: '/settings/edit-bank',
	settingsBank: '/settings/bank',
	notification: '/settings/notification',
	catalog: '/catalog',
	analytics: '/analytics',
	analyticsUploads: '/analytics/uploads',
	analyticsEngagement: '/analytics/engagement',
	analyticsEearrning: '/analytics/earnings',
	reports: '/reports',
	verification: '/verify',
	support: '/support',
	reportIssue: '/support/issues/report',
	issues: '/support/issues',
	deleteAccount: '/settings/account'
};

export const settingsLinks: {
	title: string;
	route: string;
	subRoute: string;
}[] = [
	{
		title: 'Profile Information',
		route: urls.settings,
		subRoute: urls.editProfile
	},
	{
		title: 'Password',
		route: urls.settingsPassword,
		subRoute: urls.changePassword
	},
	{
		title: 'Bank Details',
		route: urls.settingsBank,
		subRoute: urls.editBank
	},
	{
		title: 'Notifications',
		route: urls.notification,
		subRoute: ''
	},
	{
		title: 'Account',
		route: urls.deleteAccount,
		subRoute: ''
	}
];
export const artistsImages = [artist1Img, artist2Img, artist3Img, artist4Img, artist5Img, artist6Img];

export const featureLgImages = [featureLg1img, featureLg2img, featureLg3img, featureLg4img];

export const landingPageFeatures: FeatureCardProps[] = [
	{
		title: 'Music Uploads',
		description: 'Upload tracks with support for multiple formats, ensuring seamless distribution to all major platforms ',
		background: upload,
		icon: uploadIcon
	},
	{
		title: 'Music Uploads',
		description: 'Upload high-quality videos to showcase your music and engage your audience across top streaming platforms',
		background: videoUpload,
		icon: uploadIcon
	},
	{
		title: 'Earnings & Analytics',
		description: 'Track your revenue, streaming stats, and audience insights in real-time ',
		background: analytics,
		icon: analyticsIcon
	},
	{
		title: 'Sharable Smart Link ',
		description: 'Customized, shareable links that connect your audience directly to your music across all major streaming platforms ',
		background: smartlink,
		icon: smartlinkIcon
	},
	{
		title: 'Swift Onboarding',
		description: 'Get started in minutes with a simple, user-friendly setup process designed to get your music out to the world faster',
		background: swift,
		icon: swiftIcon
	},
	{
		title: 'Daily Statistics',
		description: 'Stay updated with daily insights on your streams, audience engagement, and earnings',
		background: statistics,
		icon: statisticsIcon
	}
];

export enum OnboardingSteps {
	BASIC_DETAIL,
	BANK,
	SOCIAL_LINK,
	PREVIEW,
	PAY_REGISTRATION_FEE
}

export const metricsDate = ['daily', 'monthly', 'yearly'];

export enum UPLOAD_TYPE {
	TRACK = 'TRACK',
	ALBUM = 'ALBUM',
	EXTENDED_PLAYLIST = 'EXTENDED_PLAYLIST',
	MIX_TAPE = 'MIX_TAPE'
}

export const uploadTypes: {
	title: string;
	img: StaticImageData;
	type: UPLOAD_TYPE;
}[] = [
	{
		title: 'Track',
		type: UPLOAD_TYPE.TRACK,
		img: trackImg
	},
	{
		title: 'Album',
		type: UPLOAD_TYPE.ALBUM,
		img: albumImg
	},
	{
		title: 'Extended Playlist (EP)',
		type: UPLOAD_TYPE.EXTENDED_PLAYLIST,
		img: extendedImg
	},
	{
		title: 'Mix Tape',
		type: UPLOAD_TYPE.MIX_TAPE,
		img: albumImg
	}
];

export enum UPLOAD_STEPS {
	MUSIC_INFO,
	TRACK_UPLOAD,
	MUSIC_COVER,
	DISTRIBUTION_PREFERENCE,
	PREVIEW
}

export const uploadSteps: {
	title: string;
	step: UPLOAD_STEPS;
}[] = [
	{
		title: 'Music Info',
		step: UPLOAD_STEPS.MUSIC_INFO
	},
	{
		title: 'Track Upload',
		step: UPLOAD_STEPS.TRACK_UPLOAD
	},
	{
		title: 'Music Cover',
		step: UPLOAD_STEPS.MUSIC_COVER
	},
	{
		title: 'Distribution Preferences',
		step: UPLOAD_STEPS.DISTRIBUTION_PREFERENCE
	},
	{
		title: 'Preview/ Distribute',
		step: UPLOAD_STEPS.PREVIEW
	}
];

export const Genre = {
	AFROBEATS: 'Afrobeats',
	ROCK: 'Rock',
	R_AND_B: 'R&B',
	CLASSICAL: 'Classical',
	EDM: 'EDM',
	COUNTRY: 'Country',
	HOUSE: 'House',
	DANCE: 'Dance',
	JAZZ: 'Jazz',
	HIP_HOP: 'Hip Hop',
	REGGAE: 'Reggae',
	POP: 'Pop',
	SOUL: 'Soul',
	BLUES: 'Blues',
	GOSPEL: 'Gospel',
	FOLK: 'Folk',
	METAL: 'Metal',
	PUNK: 'Punk',
	ALTERNATIVE: 'Alternative',
	INDIE: 'Indie',
	OTHERS: 'Others'
};
export const GENRES = Object.values(Genre);

export const paymentOptions = [
	{
		label: 'Monthly',
		value: 'monthly'
	},
	{
		label: 'Quarterly',
		value: 'quarterly'
	},
	{
		label: 'Annually',
		value: 'annually'
	}
];

export const currencyOptions = [
	{
		label: '₦ (Naira)',
		value: '₦ (Naira)'
	},
	{
		label: '$ (USD)',
		value: '$ (USD)'
	},
	{
		label: '€ (Euro)',
		value: '€ (Euro)'
	},
	{
		label: '£ (Pounds)',
		value: '£ (Pounds)'
	}
];

export const TOKENS = {
	ACCESS: 'access',
	REFRESH: 'refresh'
};

export const userProfileStage = {
	onboarding: 'verifyProfile',
	verifyEmail: 'verifyEmail',
	bankInfo: 'Add bank info',
	socialLinks: 'Add social links',
	payment: 'Pay registration Fee'
};

export const onboardingStages = {
	[userProfileStage.bankInfo]: OnboardingSteps.BANK,
	[userProfileStage.onboarding]: OnboardingSteps.BASIC_DETAIL,
	[userProfileStage.socialLinks]: OnboardingSteps.SOCIAL_LINK,
	[userProfileStage.payment]: OnboardingSteps.PAY_REGISTRATION_FEE
};
export const onboardingStagesKey = Object.keys(onboardingStages);

export enum ISSUE_STATUS {
	PENDING = 'pending',
	IN_PROGRESS = 'in-progress',
	RESOLVED = 'resolved'
}

export const dummyIssues = {
	pending: [
		{
			title: 'Music Uploads',
			description: 'I can,t upload my music on the dashboard, it is Unresponsive',
			isImageAttached: true
		},
		{
			title: 'Distrribution Issues',
			description: 'I can,t upload my music on the dashboard, it is Unresponsive',
			isImageAttached: false
		},
		{
			title: 'Distrribution Issues',
			description: 'I can,t upload my music on the dashboard, it is Unresponsive',
			isImageAttached: false
		},
		{
			title: 'Distrribution Issues',
			description: 'I can,t upload my music on the dashboard, it is Unresponsive',
			isImageAttached: false
		}
	]
};
