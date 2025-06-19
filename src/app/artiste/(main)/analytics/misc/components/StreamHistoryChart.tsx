import type React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface StreamsHistoryChartProps {
	data: Array<{
		period: string; // Assuming this is a date string like "2025-06-18"
		value: number;
	}>;
}

// Helper function to format large numbers for the Y-axis
const formatLargeNumber = (value: number): string => {
	if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1)}M`;
	}
	if (value >= 1000) {
		return `${(value / 1000).toFixed(1)}K`;
	}
	return String(value);
};

export const StreamsHistoryChart: React.FC<StreamsHistoryChartProps> = ({ data }) => {
	// REFACTORED: Define the chart config for better integration with the UI kit
	const chartConfig = {
		value: {
			label: 'Streams',
			color: '#FE6902'
		}
	} satisfies ChartConfig;

	return (
		<div className="w-full h-full max-h-[400px]">
			<ChartContainer config={chartConfig} className="h-full w-full">
				{/*
          NOTE: The <ChartContainer> from shadcn/ui often wraps <ResponsiveContainer>.
          If you were using pure recharts, you'd wrap the chart like this:
          <ResponsiveContainer width="100%" height="100%">
        */}
				<BarChart
					accessibilityLayer
					data={data}
					// CHANGE: Adjusted margins for better spacing on mobile
					margin={{
						top: 20,
						right: 10,
						left: -10, // Nudge closer to the edge on mobile
						bottom: 20 // Add space for angled labels
					}}
				>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<YAxis
						tickLine={false}
						axisLine={false}
						stroke="#888888"
						fontSize={12}
						// CHANGE: Format large numbers to save space (e.g., 1500 -> 1.5K)
						tickFormatter={formatLargeNumber}
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
							// Example: Assuming value is "2025-06-18", show "Jun '25"
							const date = new Date(value);
							return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
						}}
					/>
					<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
					<Bar
						dataKey="value"
						fill="var(--color-value)" // Use CSS variable from chartConfig
						radius={[4, 4, 0, 0]}
						barSize={12}
					/>
				</BarChart>
				{/* </ResponsiveContainer> */}
			</ChartContainer>
		</div>
	);
};
