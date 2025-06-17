'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from './misc/api';
import { formatCurrency } from '@/utils/currency';
import { RevenueHistoryChart, StreamsHistoryChart } from './misc/components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BarChart2, ChevronsRight, Globe, Music } from 'lucide-react';
import { LinkButton } from '@/components/ui';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';

const MusicDashboard = () => {
	const { data, isLoading, error } = useGetDashboardData();
	const { artist } = useAuthContext();
	const { convertCurrency, currency } = useCurrency();

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
			value: convertCurrency(entry.value),
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
			value: convertCurrency(entry.value),
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
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(convertCurrency(data?.totalRevenue || 0), currency)}</div>
						<p className="text-xs text-muted-foreground">Across all platforms</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Icon icon="fa-solid:money-bill" height={30} width={30} className="text-white" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Balance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(convertCurrency(artist?.totalRoyaltyUSD || 0), currency)}</div>
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

export default MusicDashboard;
