import type React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface StreamsHistoryChartProps {
	data: Array<{
		period: string;
		value: number;
	}>;
}

export const StreamsHistoryChart: React.FC<StreamsHistoryChartProps> = ({ data }) => {
	const chartConfig = {} satisfies ChartConfig;

	return (
		<div className="w-full h-full max-h-[400px]">
			<ChartContainer config={chartConfig} className="h-full">
				<BarChart accessibilityLayer data={data}>
					<CartesianGrid vertical={false} />
					<YAxis />
					<XAxis dataKey="period" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value.slice(0, 12)} />
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<Bar dataKey="value" stackId="a" fill="#FE6902" radius={[2, 2, 0, 0]} width={2} barSize={10} />
				</BarChart>
			</ChartContainer>
		</div>
	);
};
