'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/currency';
import { DSPBreakdownChart, RevenueHistoryChart, StreamsHistoryChart, TopCountriesTable, TopDSPsTable } from './misc/components';
import { Icon } from '@iconify/react/dist/iconify.js';
import { BarChart2, Globe, Music } from 'lucide-react';
import { useGetDashboardData } from '../dashboard/misc/api';
import { TrackPerformanceCard } from '@/app/artiste/(main)/analytics/misc/components/TrackPerformanceCard';

const MusicDashboard = () => {
	const { data, isLoading, error } = useGetDashboardData();

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

	// Prepare data for charts
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
			period: entry.period
		}));
	// Prepare DSP data for pie chart
	const dspData = Object.entries(data?.dspBreakdown || {})
		.map(([name, details]) => ({
			name,
			value: details.totalStreams,
			revenue: details.totalRevenue
		}))
		.sort((a, b) => b.value - a.value)
		.slice(0, 5);

	return (
		<div className="container mx-auto px-4 py-6">
			<header className="mb-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
					<div>
						<h1 className="text-3xl font-bold">Analytics</h1>
						<p className="text-muted-foreground">Track your music performance across platforms</p>
					</div>
				</div>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Music className="size-6 text-muted-foreground" />
						<CardTitle className="text-sm lg:text-xl font-semibold">Total Streams</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{data?.totalStreams.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground">Avg. value: {formatCurrency(data?.averageStreamValue || 0)}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center gap-1.5 pb-2">
						<Icon icon="fa-solid:coins" height={30} width={30} className="text-white" />

						<CardTitle className="text-sm lg:text-xl font-semibold">Total Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl lg:text-3xl font-bold">{formatCurrency(data?.totalRevenue || 0)}</div>
						<p className="text-xs text-muted-foreground">Across all platforms</p>
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
						<CardTitle>Revenue History</CardTitle>
						<CardDescription>Monthly revenue breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<RevenueHistoryChart data={revenueHistory} />
					</CardContent>
				</Card>

				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Streams History</CardTitle>
						<CardDescription>Monthly streams breakdown</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<StreamsHistoryChart data={streamsHistory} />
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<DSPBreakdownChart data={dspData} />
				<TrackPerformanceCard data={data} />
			</div>

			<Tabs defaultValue="platforms" className="mb-8">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="platforms">Platforms</TabsTrigger>
					<TabsTrigger value="countries">Countries</TabsTrigger>
				</TabsList>
				<TabsContent value="platforms">
					<Card>
						<CardHeader>
							<CardTitle>Platform Breakdown</CardTitle>
							<CardDescription>Performance across streaming platforms</CardDescription>
						</CardHeader>
						<CardContent>
							<TopDSPsTable dspData={data?.topDSPs || []} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="countries">
					<Card>
						<CardHeader>
							<CardTitle>Country Breakdown</CardTitle>
							<CardDescription>Performance across countries</CardDescription>
						</CardHeader>
						<CardContent>
							<TopCountriesTable countryData={data?.topCountries || []} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MusicDashboard;
