'use client'; // Keep this directive

import React, { useMemo } from 'react'; // Add useMemo
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation'; // Add useParams
import { Loader2 } from 'lucide-react'; // Add Loader2
// Adjust the import path for useGetArtistAnalytics relative to the new location
import { useGetArtistAnalytics } from '../../../catalogue/api/getArtistAnalytics';
import { formatCurrency } from '@/utils/currency'; // Add formatCurrency

// --- Interfaces for Period Summary ---
interface PeriodSummaryItem {
	totalStreams: number;
	totalRevenue: number;
}

interface PeriodSummary {
	[period: string]: PeriodSummaryItem;
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
	/* may: 4, */ june: 5,
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
	console.warn(`Could not parse period string: ${period}`);
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
	const formatValue = (value: number | string | undefined): string => {
		if (typeof value !== 'number') return '';
		if (dataKey === 'revenue') {
			return formatCurrency(value) ?? '';
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
// Removed ArtistAnalyticsProps and artist prop
const ArtistAnalytics: React.FC = () => {
	// Use useParams instead of props
	const { artist_id } = useParams<{ artist_id: string }>();
	const { data: artistAnalytics, isLoading: artistAnalyticsLoading } = useGetArtistAnalytics({
		artistId: artist_id // Use artist_id from params
	});

	// Process periodSummary data for charts (copied from source)
	const chartData = useMemo(() => {
		if (!artistAnalytics?.periodSummary) {
			return [];
		}
		const processedData: ChartDataItem[] = Object.entries(artistAnalytics.periodSummary as PeriodSummary)
			.map(([period, values]) => {
				const { date, label } = parsePeriodString(period);
				return { date: date, monthLabel: label, revenue: values.totalRevenue, streams: values.totalStreams };
			})
			.filter(item => item.date !== null)
			.sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime());
		return processedData;
	}, [artistAnalytics?.periodSummary]);

	// Loading state (copied from source)
	if (artistAnalyticsLoading) {
		return (
			<div className="flex items-center justify-center p-8 text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				Loading Analytics...
			</div>
		);
	}

	// Empty data state (copied from source)
	if (!chartData || chartData.length === 0) {
		return <div className="p-8 text-center text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">No monthly analytics data available for this artist.</div>;
	}

	// Render the two charts (copied from source)
	return (
		<div className="space-y-8">
			<MonthlyChart title="Monthly Revenue" data={chartData} dataKey="revenue" strokeColor="#8884d8" />
			<MonthlyChart title="Monthly Streams" data={chartData} dataKey="streams" strokeColor="#82ca9d" />
		</div>
	);
};

export default ArtistAnalytics;
