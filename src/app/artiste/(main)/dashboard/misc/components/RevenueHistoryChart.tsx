import type React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { SupportedCurrency } from '@/utils/currency';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';

interface RevenueHistoryChartProps {
	data: Array<{
		period: string; // Assuming a date string like "2025-06-18"
		value: number;
	}>;
}

export function getLocaleForCurrency(currency: SupportedCurrency): string {
	switch (currency) {
		case 'NGN':
			return 'en-NG';
		case 'USD':
			return 'en-US';
		case 'EUR':
			return 'en-GB'; // Common locale for EUR
		case 'GBP':
			return 'en-GB';
		default:
			return 'en-NG';
	}
}
// Helper function to format currency for the Y-axis (e.g., 1500 -> $1.5K)
const formatAxisCurrency = (value: number, currency: SupportedCurrency): string => {
	const locale = getLocaleForCurrency(currency);
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
		notation: 'compact', // This creates K, M, B for thousands, millions, etc.
		maximumFractionDigits: 1
	}).format(value);
};

export const RevenueHistoryChart: React.FC<RevenueHistoryChartProps> = ({ data }) => {
	// REFACTORED: Define the chart config for better integration
	const { currency } = useCurrency();
	const chartConfig = {
		value: {
			label: 'Revenue',
			color: '#22c55e' // A green color for revenue
		}
	} satisfies ChartConfig;

	return (
		<div className="w-full h-full max-h-[400px]">
			<ChartContainer config={chartConfig} className="h-full w-full">
				<BarChart
					accessibilityLayer
					data={data}
					// CHANGE: Adjusted margins for better spacing, especially for angled labels
					margin={{
						top: 20,
						right: 10,
						left: 0,
						bottom: 20
					}}
				>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<YAxis
						tickLine={false}
						axisLine={false}
						stroke="#888888"
						fontSize={12}
						// CHANGE: Use the currency formatter for the Y-axis
						tickFormatter={value => formatAxisCurrency(value, currency)}
					/>
					<XAxis
						dataKey="period"
						tickLine={false}
						axisLine={false}
						stroke="#888888"
						fontSize={12}
						// CHANGE: Angle labels to prevent overlap on small screens
						angle={-35}
						textAnchor="end"
						// CHANGE: Automatically skip ticks to prevent clutter
						interval="preserveStartEnd"
						// CHANGE: Format date string to a more compact format
						tickFormatter={value => {
							const date = new Date(value);
							return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
						}}
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								indicator="dot"
								hideLabel
								// CHANGE: Format the value in the tooltip as full currency for detail
								labelFormatter={(value, payload) =>
									new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(Number(payload[0].value))
								}
							/>
						}
					/>
					<Bar
						dataKey="value"
						fill="var(--color-value)" // CHANGE: Use CSS variable from chartConfig
						radius={[4, 4, 0, 0]}
						barSize={12}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	);
};
