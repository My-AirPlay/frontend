/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation';
import { Loader2, Music, Globe, TrendingUp, BarChart3, Disc3, Radio } from 'lucide-react';
import { useGetArtistAnalytics } from '../../../catalogue/api/getArtistAnalytics';
import { formatCurrency } from '@/utils/currency';
import { ChartDatum, CustomBarChart } from '@/app/admin/(main)/artist-revenue/misc/components/BarChart';
import { ProcessedCountryPeriodData } from '@/app/admin/(main)/artist-revenue/misc/components/ArtistAnalytics';
import { PerformanceItem } from '@/app/artiste/(main)/dashboard/misc/api';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';
import { NairaIcon } from '@/components/ui/naira-icon';

// --- Interfaces ---
interface PeriodSummaryItem {
	totalStreams: number;
	totalRevenue: number;
}

interface PeriodSummary {
	[period: string]: PeriodSummaryItem;
}

interface TopTrack {
	trackTitle: string;
	totalStreams: number;
	totalRevenue: number;
}

interface TopItem {
	name: string;
	totalStreams: number;
	totalRevenue: number;
}

// --- Helper Function to Parse Period Strings ---
const monthMap: { [key: string]: number } = {
	jan: 0,
	feb: 1,
	mar: 2,
	apr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	aug: 7,
	sep: 8,
	oct: 9,
	nov: 10,
	dec: 11,
	january: 0,
	february: 1,
	march: 2,
	april: 3,
	june: 5,
	july: 6,
	august: 7,
	september: 8,
	october: 9,
	november: 10,
	december: 11
};

interface ParsedPeriod {
	date: Date | null;
	label: string;
}

function parsePeriodString(period: string): ParsedPeriod {
	const parts = period.toLowerCase().split(/[\s-]+/);
	let month = -1;
	let year = -1;
	let label = period;

	if (parts.length === 2) {
		const monthPart = parts[0];
		const yearPart = parts[1];
		month = monthMap[monthPart];
		if (yearPart.length === 4) {
			year = parseInt(yearPart, 10);
		} else if (yearPart.length === 2) {
			year = parseInt(yearPart, 10);
			year = year < 70 ? 2000 + year : 1900 + year;
		}

		if (month !== undefined && month >= 0 && !isNaN(year) && year > 0) {
			const shortMonth = Object.keys(monthMap).find(key => monthMap[key] === month && key.length === 3);
			if (shortMonth) {
				label = `${shortMonth.charAt(0).toUpperCase()}${shortMonth.slice(1)} ${year.toString().slice(-2)}`;
			}
			return { date: new Date(year, month, 1), label };
		}
	}
	return { date: null, label };
}

// --- Reusable Monthly Chart Component ---
interface ChartDataItem {
	monthLabel: string;
	revenue?: number;
	streams?: number;
	date: Date | null;
}

interface MonthlyChartProps {
	title: string;
	data: ChartDataItem[];
	dataKey: 'revenue' | 'streams';
	strokeColor: string;
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ title, data, dataKey, strokeColor }) => {
	const { convertCurrency, currency: contextCurrency } = useCurrency();
	const formatValue = (value: number | string | undefined): string => {
		if (typeof value !== 'number') return '';
		if (dataKey === 'revenue') {
			return formatCurrency(convertCurrency(value), contextCurrency) ?? '';
		}
		return value.toLocaleString();
	};

	return (
		<div className="space-y-4 p-4 rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">{title}</h3>
			</div>
			<div className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#383838" />
						<XAxis dataKey="monthLabel" tick={{ fontSize: 10, fill: '#898989' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
						<YAxis tick={{ fontSize: 10, fill: '#898989' }} axisLine={false} tickLine={false} tickFormatter={formatValue} width={60} />
						<Tooltip
							formatter={value => {
								const displayValue = Array.isArray(value) ? value[0] : value;
								return [formatValue(displayValue), dataKey];
							}}
							contentStyle={{ backgroundColor: '#272727', border: 'none', borderRadius: '4px', fontSize: '12px' }}
							labelStyle={{ color: '#ffffff', marginBottom: '4px', fontWeight: 'bold' }}
							itemStyle={{ color: '#d1d1d1' }}
						/>
						<Line type="monotone" dataKey={dataKey} stroke={strokeColor} strokeWidth={2} activeDot={{ r: 6, strokeWidth: 0, fill: strokeColor }} dot={{ stroke: strokeColor, strokeWidth: 1, r: 3, fill: '#1A1C1F' }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

// --- Main Artist Analytics Component ---
const ArtistAnalytics: React.FC = () => {
	const { artist_id } = useParams<{ artist_id: string }>();
	const { data: artistAnalytics, isLoading: artistAnalyticsLoading } = useGetArtistAnalytics({
		artistId: artist_id
	});
	const { convertCurrency, currency: contextCurrency } = useCurrency();

	// Process periodSummary data for charts
	const chartData = useMemo(() => {
		if (!artistAnalytics?.periodSummary) return [];
		const processedData: ChartDataItem[] = Object.entries(artistAnalytics.periodSummary as PeriodSummary)
			.map(([period, values]) => {
				const { date, label } = parsePeriodString(period);
				return { date, monthLabel: label, revenue: values.totalRevenue, streams: values.totalStreams };
			})
			.filter(item => item.date !== null)
			.sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime());
		return processedData;
	}, [artistAnalytics?.periodSummary]);

	const processedDspPeriodData: ProcessedCountryPeriodData = useMemo(() => {
		if (!artistAnalytics?.dspBreakdown) return { streams: [], revenue: [] };
		const groupedByPeriod: Record<string, Record<string, any>> = {};
		Object.entries(artistAnalytics.dspBreakdown).forEach(([dsp, dspData]) => {
			const dspInfo = dspData as PerformanceItem;
			Object.entries(dspInfo.periodBreakdown).forEach(([period, breakdown]) => {
				const { label } = parsePeriodString(period);
				if (!groupedByPeriod[label]) groupedByPeriod[label] = { monthLabel: label };
				groupedByPeriod[label][dsp] = { streams: breakdown.streams, revenue: breakdown.revenue };
			});
		});
		const flattenedStreams: ChartDatum[] = Object.values(groupedByPeriod).map(entry => {
			const flat: ChartDatum = { monthLabel: entry.monthLabel };
			Object.entries(entry).forEach(([key, val]) => {
				if (key !== 'monthLabel' && val?.streams !== undefined) flat[key] = val.streams;
			});
			return flat;
		});
		const flattenedRevenue: ChartDatum[] = Object.values(groupedByPeriod).map(entry => {
			const flat: ChartDatum = { monthLabel: entry.monthLabel };
			Object.entries(entry).forEach(([key, val]) => {
				if (key !== 'monthLabel' && val?.revenue !== undefined) flat[key] = val.revenue;
			});
			return flat;
		});
		return { streams: flattenedStreams, revenue: flattenedRevenue };
	}, [artistAnalytics?.dspBreakdown]);

	const processedCountryPeriodData: ProcessedCountryPeriodData = useMemo(() => {
		if (!artistAnalytics?.countryBreakdown) return { streams: [], revenue: [] };
		const groupedByPeriod: Record<string, Record<string, any>> = {};
		Object.entries(artistAnalytics.countryBreakdown).forEach(([country, countryData]) => {
			const countryInfo = countryData as PerformanceItem;
			Object.entries(countryInfo.periodBreakdown).forEach(([period, breakdown]) => {
				const { label } = parsePeriodString(period);
				if (!groupedByPeriod[label]) groupedByPeriod[label] = { monthLabel: label };
				groupedByPeriod[label][country] = { streams: breakdown.streams, revenue: breakdown.revenue };
			});
		});
		const flattenedStreams: ChartDatum[] = Object.values(groupedByPeriod).map(entry => {
			const flat: ChartDatum = { monthLabel: entry.monthLabel };
			Object.entries(entry).forEach(([key, val]) => {
				if (key !== 'monthLabel' && val?.streams !== undefined) flat[key] = val.streams;
			});
			return flat;
		});
		const flattenedRevenue: ChartDatum[] = Object.values(groupedByPeriod).map(entry => {
			const flat: ChartDatum = { monthLabel: entry.monthLabel };
			Object.entries(entry).forEach(([key, val]) => {
				if (key !== 'monthLabel' && val?.revenue !== undefined) flat[key] = val.revenue;
			});
			return flat;
		});
		return { streams: flattenedStreams, revenue: flattenedRevenue };
	}, [artistAnalytics?.countryBreakdown]);

	if (artistAnalyticsLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				Loading Analytics...
			</div>
		);
	}

	if (!artistAnalytics || (!chartData.length && !artistAnalytics.topTracks?.length)) {
		return <div className="p-8 text-center text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">No analytics data available for this artist.</div>;
	}

	const totalStreams = artistAnalytics.totalStreams || 0;
	const totalRevenue = artistAnalytics.totalRevenue || 0;
	const grossRevenue = artistAnalytics.grossRevenue || 0;
	const averageStreamValue = artistAnalytics.averageStreamValue || 0;
	const topTracks: TopTrack[] = artistAnalytics.topTracks || [];
	const topDSPs: TopItem[] = artistAnalytics.topDSPs || [];
	const topCountries: TopItem[] = artistAnalytics.topCountries || [];
	const periodCount = artistAnalytics.periodSummary ? Object.keys(artistAnalytics.periodSummary).length : 0;

	return (
		<div className="space-y-8">
			{/* Summary Stat Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
							<Music className="w-5 h-5 text-purple-500" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Streams</p>
					<p className="text-lg font-semibold">{totalStreams.toLocaleString()}</p>
					<p className="text-xs text-muted-foreground mt-1">{periodCount} activity periods</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
							<NairaIcon className="w-5 h-5 text-emerald-500" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Net Revenue</p>
					<p className="text-lg font-semibold text-emerald-500">{formatCurrency(convertCurrency(totalRevenue), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">After deal split</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<TrendingUp className="w-5 h-5 text-blue-500" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Gross Revenue</p>
					<p className="text-lg font-semibold text-blue-500">{formatCurrency(convertCurrency(grossRevenue), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">Before deal split</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
							<BarChart3 className="w-5 h-5 text-orange-500" />
						</div>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Avg. Stream Value</p>
					<p className="text-lg font-semibold text-orange-500">{formatCurrency(convertCurrency(averageStreamValue), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">Revenue per stream</p>
				</div>
			</div>

			{/* Top Tracks Table */}
			{topTracks.length > 0 && (
				<div className="rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f] overflow-hidden">
					<div className="p-4 border-b border-[#383838]">
						<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded inline-block">Top Tracks</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-[#383838] text-muted-foreground">
									<th className="text-left p-3 font-medium">#</th>
									<th className="text-left p-3 font-medium">Track</th>
									<th className="text-right p-3 font-medium">Streams</th>
									<th className="text-right p-3 font-medium">Revenue</th>
									<th className="text-right p-3 font-medium">Share</th>
								</tr>
							</thead>
							<tbody>
								{topTracks.map((track, idx) => (
									<tr key={idx} className="border-b border-[#383838]/50 hover:bg-[#272727]">
										<td className="p-3 text-muted-foreground">{idx + 1}</td>
										<td className="p-3 font-medium flex items-center gap-2">
											<Disc3 className="w-4 h-4 text-primary/60 shrink-0" />
											{track.trackTitle}
										</td>
										<td className="p-3 text-right tabular-nums">{track.totalStreams.toLocaleString()}</td>
										<td className="p-3 text-right text-emerald-500 tabular-nums">{formatCurrency(convertCurrency(track.totalRevenue), contextCurrency)}</td>
										<td className="p-3 text-right text-muted-foreground tabular-nums">{totalStreams > 0 ? ((track.totalStreams / totalStreams) * 100).toFixed(1) : 0}%</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Top DSPs & Top Countries side by side */}
			{(topDSPs.length > 0 || topCountries.length > 0) && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Top Platforms */}
					{topDSPs.length > 0 && (
						<div className="rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f] overflow-hidden">
							<div className="p-4 border-b border-[#383838]">
								<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded inline-block">Top Platforms</h3>
							</div>
							<div className="divide-y divide-[#383838]/50">
								{topDSPs.map((dsp, idx) => (
									<div key={idx} className="flex items-center justify-between p-3 hover:bg-[#272727]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-400">{idx + 1}</div>
											<div>
												<p className="font-medium text-sm flex items-center gap-1.5">
													<Radio className="w-3.5 h-3.5 text-blue-400" />
													{dsp.name}
												</p>
												<p className="text-xs text-muted-foreground">{dsp.totalStreams.toLocaleString()} streams</p>
											</div>
										</div>
										<p className="text-sm text-emerald-500 font-medium tabular-nums">{formatCurrency(convertCurrency(dsp.totalRevenue), contextCurrency)}</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Top Countries */}
					{topCountries.length > 0 && (
						<div className="rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f] overflow-hidden">
							<div className="p-4 border-b border-[#383838]">
								<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded inline-block">Top Countries</h3>
							</div>
							<div className="divide-y divide-[#383838]/50">
								{topCountries.map((country, idx) => (
									<div key={idx} className="flex items-center justify-between p-3 hover:bg-[#272727]">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-400">{idx + 1}</div>
											<div>
												<p className="font-medium text-sm flex items-center gap-1.5">
													<Globe className="w-3.5 h-3.5 text-green-400" />
													{country.name}
												</p>
												<p className="text-xs text-muted-foreground">{country.totalStreams.toLocaleString()} streams</p>
											</div>
										</div>
										<p className="text-sm text-emerald-500 font-medium tabular-nums">{formatCurrency(convertCurrency(country.totalRevenue), contextCurrency)}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Line Charts */}
			{chartData.length > 0 && (
				<>
					<MonthlyChart title="Monthly Revenue" data={chartData} dataKey="revenue" strokeColor="#8884d8" />
					<MonthlyChart title="Monthly Streams" data={chartData} dataKey="streams" strokeColor="#82ca9d" />
				</>
			)}

			{/* Bar Charts */}
			{processedCountryPeriodData.revenue.length > 0 && (
				<>
					<CustomBarChart title="Country Revenue by Period" data={processedCountryPeriodData.revenue} dataKey="revenue" strokeColor="#8884d8" />
					<CustomBarChart title="Country Streams by Period" data={processedCountryPeriodData.streams} dataKey="streams" strokeColor="#8884d8" />
				</>
			)}

			{processedDspPeriodData.revenue.length > 0 && (
				<>
					<CustomBarChart title="Platform Revenue by Period" data={processedDspPeriodData.revenue} dataKey="revenue" strokeColor="#8884d8" />
					<CustomBarChart title="Platform Streams by Period" data={processedDspPeriodData.streams} dataKey="streams" strokeColor="#8884d8" />
				</>
			)}
		</div>
	);
};

export default ArtistAnalytics;
