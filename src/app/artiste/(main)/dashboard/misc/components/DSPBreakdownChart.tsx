'use client';

import * as React from 'react';
import { Cell, Label, Pie, PieChart, Sector } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DSPData {
	name: string;
	value: number;
	revenue: number;
}

interface DSPBreakdownChartProps {
	data: DSPData[];
}

export const DSPBreakdownChart: React.FC<DSPBreakdownChartProps> = ({ data }) => {
	const dspColors: Record<string, string> = {
		Spotify: '#1DB954',
		'Apple Music': '#FA243C',
		'YouTube Streaming': '#FF0000',
		'Amazon Music Unlimited': '#FF9900',
		TIDAL: '#000000',
		Deezer: '#EF5466'
	};

	// Create a chartConfig object for the ChartStyle component
	const chartConfig: ChartConfig = {};

	// Ensure all DSPs have a color
	const generateRandomColor = React.useCallback(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`, []);

	data.forEach(dsp => {
		if (!dspColors[dsp.name]) {
			dspColors[dsp.name] = generateRandomColor();
		}

		// Add to chartConfig
		chartConfig[dsp.name] = {
			label: dsp.name,
			color: dspColors[dsp.name]
		};
	});

	const id = 'pie-interactive';
	const [activePlatform, setActivePlatform] = React.useState(data[0]?.name || '');

	const activeIndex = React.useMemo(() => data.findIndex(item => item.name === activePlatform), [activePlatform, data]);

	const platforms = React.useMemo(() => data.map(item => item.name), [data]);

	return (
		<Card data-chart={id} className="flex flex-col">
			<ChartStyle id={id} config={chartConfig} />
			<CardHeader className="flex-row items-start space-y-0 pb-0">
				<div className="grid gap-1">
					<CardTitle>Platform Distribution</CardTitle>
					<CardDescription>Streams by platform</CardDescription>
				</div>
				<Select value={activePlatform} onValueChange={setActivePlatform}>
					<SelectTrigger className="ml-auto h-7 w-[180px] rounded-lg pl-2.5" aria-label="Select a platform">
						<SelectValue placeholder="Select platform" />
					</SelectTrigger>
					<SelectContent align="end" className="rounded-xl">
						{platforms.map(key => {
							const config = chartConfig[key];

							if (!config) {
								return null;
							}

							return (
								<SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
									<div className="flex items-center gap-2 text-xs">
										<span
											className="flex h-3 w-3 shrink-0 rounded-sm"
											style={{
												backgroundColor: config.color
											}}
										/>
										{config.label}
									</div>
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="flex flex-1 justify-center pb-0">
				<ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							innerRadius={60}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
								<g>
									<Sector {...props} outerRadius={outerRadius + 10} />
									<Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
								</g>
							)}
						>
							{/* Add Cell components to apply colors to pie segments */}
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={dspColors[entry.name] || `#${Math.floor(Math.random() * 16777215).toString(16)}`} />
							))}
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox && activeIndex >= 0) {
										const activeData = data[activeIndex];
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 10} className="fill-foreground text-lg font-bold">
													{activeData.name}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 15} className="fill-muted-foreground text-sm">
													{activeData.value.toLocaleString()} streams
												</tspan>
											</text>
										);
									}
									return null;
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
