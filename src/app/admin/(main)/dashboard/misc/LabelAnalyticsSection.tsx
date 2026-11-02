'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Download } from 'lucide-react';
import Link from 'next/link';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { AnalyticsFilterBar, ChangeBadge, PeriodRange } from '@/app/artiste/(main)/analytics/misc/components/AnalyticsFilterBar';
import { downloadLabelCsv, LabelExportTable, NamedTotals, useLabelAnalytics } from '../api/labelAnalytics';
import { toast } from 'sonner';

const naira = (n: number) => `₦${Math.round(n || 0).toLocaleString()}`;

const historyConfig = {
	revenue: { label: 'Artist earnings', color: '#22c55e' },
	streams: { label: 'Streams', color: '#fe6b02' }
} satisfies ChartConfig;
const releasesConfig = {
	singles: { label: 'Singles', color: '#fe6b02' },
	albums: { label: 'Albums / EPs', color: '#3b82f6' }
} satisfies ChartConfig;

function RankTable({ rows, nameLabel, link }: { rows: NamedTotals[]; nameLabel: string; link?: (row: NamedTotals) => string }) {
	if (rows.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No data for this period.</p>;
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="text-muted-foreground text-left">
						<th className="py-2 pr-2 w-8">#</th>
						<th className="py-2 pr-2">{nameLabel}</th>
						<th className="py-2 pr-2 text-right">Streams</th>
						<th className="py-2 text-right">Earnings</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={`${row.name}-${i}`} className="border-t border-border">
							<td className="py-2 pr-2 text-muted-foreground">{i + 1}</td>
							<td className="py-2 pr-2 max-w-[220px] truncate">
								{link ? (
									<Link href={link(row)} className="hover:underline">
										{row.name}
									</Link>
								) : (
									row.name
								)}
							</td>
							<td className="py-2 pr-2 text-right">{row.totalStreams.toLocaleString()}</td>
							<td className="py-2 text-right">{naira(row.totalRevenue)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/**
 * Label-wide analytics: totals and trend across every artist, who and what is
 * earning, where, and how many releases are coming in. Earnings are what artists
 * are owed (after their deal), in naira.
 */
export default function LabelAnalyticsSection() {
	const [range, setRange] = useState<PeriodRange>({});
	const [tab, setTab] = useState<LabelExportTable>('artists');
	const { data, isLoading, isFetching } = useLabelAnalytics(range);

	const exportTab = async () => {
		try {
			await downloadLabelCsv(tab, range);
		} catch {
			toast.error('Could not export. Please try again.');
		}
	};

	if (isLoading || !data) {
		return (
			<div className="flex justify-center py-10">
				<LoadingBox size={32} />
			</div>
		);
	}

	const history = data.revenueHistory.map((r, i) => ({ period: r.period, revenue: Math.round(r.value), streams: data.streamsHistory[i]?.value ?? 0 }));
	const tables: Record<LabelExportTable, NamedTotals[]> = {
		artists: data.topArtists.map(a => ({ name: a.artistName, totalStreams: a.totalStreams, totalRevenue: a.totalRevenue })),
		tracks: data.topTracks.map(t => ({ name: t.trackTitle, totalStreams: t.totalStreams, totalRevenue: t.totalRevenue })),
		countries: data.topCountries.slice(0, 20),
		platforms: data.topDSPs,
		periods: []
	};

	return (
		<section className={`space-y-6 ${isFetching ? 'opacity-70' : ''}`}>
			<header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<h2 className="text-xl font-normal">Label analytics</h2>
					<p className="text-sm text-muted-foreground">All artists. Earnings are what artists are owed after their deal, in naira.</p>
				</div>
				<AnalyticsFilterBar periods={data.availablePeriods} value={range} onChange={setRange} />
			</header>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="pb-1">
						<CardDescription>Streams</CardDescription>
						<CardTitle className="text-2xl">{data.totalStreams.toLocaleString()}</CardTitle>
					</CardHeader>
					<CardContent className="text-xs">
						<ChangeBadge change={data.change?.streams} previousPeriod={data.change?.previousPeriod} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-1">
						<CardDescription>Artist earnings</CardDescription>
						<CardTitle className="text-2xl">{naira(data.totalRevenue)}</CardTitle>
					</CardHeader>
					<CardContent className="text-xs">
						<ChangeBadge change={data.change?.revenue} previousPeriod={data.change?.previousPeriod} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-1">
						<CardDescription>Earnings per 1,000 streams</CardDescription>
						<CardTitle className="text-2xl">{naira(data.averageStreamValue * 1000)}</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-1">
						<CardDescription>Earning artists</CardDescription>
						<CardTitle className="text-2xl">{data.topArtists.length >= 20 ? '20+' : data.topArtists.length}</CardTitle>
					</CardHeader>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Earnings and streams by month</CardTitle>
					</CardHeader>
					<CardContent className="h-72">
						<ChartContainer config={historyConfig} className="h-full w-full">
							<BarChart data={history} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={v => String(v).slice(0, 3) + ' ' + String(v).slice(-2)} />
								<YAxis yAxisId="revenue" tickLine={false} axisLine={false} width={60} tickFormatter={v => `₦${Intl.NumberFormat('en', { notation: 'compact' }).format(v)}`} />
								<YAxis yAxisId="streams" orientation="right" tickLine={false} axisLine={false} width={50} tickFormatter={v => Intl.NumberFormat('en', { notation: 'compact' }).format(v)} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar yAxisId="revenue" dataKey="revenue" fill="var(--color-revenue)" radius={4} />
								<Bar yAxisId="streams" dataKey="streams" fill="var(--color-streams)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-base">New releases per month</CardTitle>
						<CardDescription>Uploads in the last 12 months. Album tracks count once, with their album.</CardDescription>
					</CardHeader>
					<CardContent className="h-72">
						<ChartContainer config={releasesConfig} className="h-full w-full">
							<BarChart data={data.releasesPerMonth} margin={{ left: 0, right: 10, top: 10, bottom: 10 }}>
								<CartesianGrid vertical={false} />
								<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
								<YAxis tickLine={false} axisLine={false} width={30} allowDecimals={false} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="singles" stackId="r" fill="var(--color-singles)" />
								<Bar dataKey="albums" stackId="r" fill="var(--color-albums)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between gap-2">
					<CardTitle className="text-base">Top performers</CardTitle>
					<Button variant="outline" size="sm" onClick={exportTab}>
						<Download size={14} className="mr-1" /> Export CSV
					</Button>
				</CardHeader>
				<CardContent>
					<Tabs value={tab} onValueChange={v => setTab(v as LabelExportTable)}>
						<TabsList className="mb-4 flex flex-wrap h-auto">
							<TabsTrigger value="artists">Artists</TabsTrigger>
							<TabsTrigger value="tracks">Tracks</TabsTrigger>
							<TabsTrigger value="countries">Countries</TabsTrigger>
							<TabsTrigger value="platforms">Platforms</TabsTrigger>
							<TabsTrigger value="periods">By month</TabsTrigger>
						</TabsList>
						<TabsContent value="artists">
							<RankTable rows={tables.artists} nameLabel="Artist" link={row => `/admin/artist-revenue/${data.topArtists.find(a => a.artistName === row.name)?.artistId}/details`} />
						</TabsContent>
						<TabsContent value="tracks">
							<RankTable rows={tables.tracks} nameLabel="Track" />
						</TabsContent>
						<TabsContent value="countries">
							<RankTable rows={tables.countries} nameLabel="Country" />
						</TabsContent>
						<TabsContent value="platforms">
							<RankTable rows={tables.platforms} nameLabel="Platform" />
						</TabsContent>
						<TabsContent value="periods">
							<RankTable rows={history.map(h => ({ name: h.period, totalStreams: h.streams, totalRevenue: h.revenue }))} nameLabel="Month" />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</section>
	);
}
