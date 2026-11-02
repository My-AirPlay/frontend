'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from './misc/api';
import { formatCurrency } from '@/utils/currency';
import { RevenueHistoryChart, StreamsHistoryChart } from './misc/components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AlertTriangle, BarChart2, ChevronsRight, Globe, Music, UploadCloud } from 'lucide-react';
import { FREE_RELEASE_LIMIT, releaseAllowance } from '@/lib/release-allowance';
import SubscribeButton from '@/components/subscribe-button';
import { LinkButton } from '@/components/ui';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCurrency, Currency } from '@/app/artiste/context/CurrencyContext';

const normalizeCurrency = (currency?: string | null): Currency => {
	switch (currency?.toLowerCase()) {
		case 'naira':
		case 'ngn':
			return 'NGN';
		case 'dollar':
		case 'usd':
			return 'USD';
		case 'euro':
		case 'eur':
			return 'EUR';
		case 'pounds':
		case 'gbp':
			return 'GBP';
		default:
			return 'NGN';
	}
};

const MusicDashboard = () => {
	const { data, isLoading, error } = useGetDashboardData();
	const { artist } = useAuthContext();
	const { currency } = useCurrency();

	const revenueHistory = [...(data?.revenueHistory || [])]
		.sort((a, b) => {
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const aMonth = a.period.split(' ')[0];
			const bMonth = b.period.split(' ')[0];
			const aYear = parseInt(a.period.split(' ')[1]);
			const bYear = parseInt(b.period.split(' ')[1]);
			if (aYear !== bYear) {
				return aYear - bYear;
			}
			return months.indexOf(aMonth) - months.indexOf(bMonth);
		})
		.map(entry => ({
			...entry,
			value: entry.value,
			period: entry.period
		}));

	const streamsHistory = [...(data?.streamsHistory || [])]
		?.sort((a, b) => {
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const aMonth = a.period.split(' ')[0];
			const bMonth = b.period.split(' ')[0];
			const aYear = parseInt(a.period.split(' ')[1]);
			const bYear = parseInt(b.period.split(' ')[1]);
			if (aYear !== bYear) {
				return aYear - bYear;
			}
			return months.indexOf(aMonth) - months.indexOf(bMonth);
		})
		.map(entry => ({
			...entry,
			value: entry.value,
			period: entry.period
		}));

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-500 mt-10 p-6">
				<div className="mx-auto mb-4">⚠️</div>
				<h2 className="text-xl font-bold">Error loading dashboard data</h2>
				<p>Please try again later or contact support.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			{artist?.contractDetails?.status === 'PENDING_SIGNATURE' && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
					<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">You have a contract pending your signature</p>
					<LinkButton href="/artiste/settings?section=contract" size="thin" className="text-xs rounded-full shrink-0">
						Review & Sign
					</LinkButton>
				</div>
			)}

			<header className="mb-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
					<div>
						<h1 className="text-3xl font-bold">Dashboard</h1>
						<p className="text-muted-foreground">Track your music performance across platforms</p>
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Music className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Total Streams</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.totalStreams.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground">Across all platforms</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Icon icon="fa-solid:coins" height={30} width={30} className="text-white" />

						<CardTitle className="text-sm lg:text-xl font-semibold">Gross Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(data?.totalRevenue || 0, data?.currency || currency)}</div>
						<p className="text-xs text-muted-foreground">Across all platforms</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Icon icon="fa-solid:money-bill" height={30} width={30} className="text-white" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Balance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(artist?.walletBalance || 0, normalizeCurrency(artist?.bankDetails?.currency))}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<BarChart2 className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Top Platform</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.topDSPs[0]?.name}</div>
						<p className="text-xs text-muted-foreground">{data?.topDSPs[0]?.totalStreams.toLocaleString()} streams</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Globe className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Top Country</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.topCountries[0]?.name}</div>
						<p className="text-xs text-muted-foreground">{data?.topCountries[0]?.totalStreams.toLocaleString()} streams</p>
					</CardContent>
				</Card>

				<FreeReleasesCard />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle className="w-full flex items-center justify-between">
							Revenue History
							<LinkButton href="/artiste/analytics#revenue" className="text-xs rounded-full" size="thin">
								View analytics
								<ChevronsRight size={16} />
							</LinkButton>
						</CardTitle>
						<CardDescription>Monthly revenue breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<RevenueHistoryChart data={revenueHistory} />
					</CardContent>
				</Card>

				<Card className="col-span-1">
					<CardHeader>
						<CardTitle className="w-full flex items-center justify-between">
							Streams History
							<LinkButton href="/artiste/analytics#revenue" className="text-xs rounded-full" size="thin">
								View analytics
								<ChevronsRight size={16} />
							</LinkButton>
						</CardTitle>
						<CardDescription>Monthly streams breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<StreamsHistoryChart data={streamsHistory} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

/**
 * How many of the free releases are left, or that the artist is subscribed. A
 * single, video, EP or album each count as one release.
 */
function FreeReleasesCard() {
	const { artist } = useAuthContext();
	if (!artist) return null;
	const { used, remaining, subscribed } = releaseAllowance(artist);
	const paidUntil = artist.bankDetails?.registrationFeePaidUntil;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
				<UploadCloud className="size-6 text-muted-foreground" />
				<CardTitle className="text-sm lg:text-xl font-semibold">{subscribed ? 'Releases' : 'Free releases'}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{subscribed ? (
					<>
						<div className="text-2xl lg:text-3xl font-bold">Unlimited</div>
						<p className="text-xs text-muted-foreground">
							Subscribed{paidUntil ? ` until ${new Date(paidUntil).toLocaleDateString()}` : ''}. {used} released so far.
						</p>
					</>
				) : (
					<>
						<div className="text-2xl lg:text-3xl font-bold">
							{remaining} <span className="text-base font-normal text-muted-foreground">of {FREE_RELEASE_LIMIT} left</span>
						</div>
						<div className="h-2 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={Math.min(used, FREE_RELEASE_LIMIT)} aria-valuemin={0} aria-valuemax={FREE_RELEASE_LIMIT}>
							<div className={`h-full ${remaining === 0 ? 'bg-red-500' : remaining <= 2 ? 'bg-amber-500' : 'bg-primary'}`} style={{ width: `${(Math.min(used, FREE_RELEASE_LIMIT) / FREE_RELEASE_LIMIT) * 100}%` }} />
						</div>
						<p className="text-xs text-muted-foreground">A single, EP or album each count as one release.</p>
						{remaining === 0 && <SubscribeButton />}
					</>
				)}
			</CardContent>
		</Card>
	);
}

export default MusicDashboard;
