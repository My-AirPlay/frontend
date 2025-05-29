import React from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from '@/utils/currency';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
export type ChartDatum = {
	monthLabel: string;
	[code: string]: number | string;
};
export interface MonthlyCountryChartProps {
	title: string;
	data: ChartDatum[];
	dataKey: 'streams' | 'revenue';
	strokeColor: string;
}

const COLORS = ['#4ade80', '#60a5fa', '#fbbf24', '#fb7185', '#a78bfa', '#34d399', '#f472b6', '#f87171', '#38bdf8', '#c084fc', '#e879f9', '#facc15', '#22d3ee', '#2dd4bf', '#eab308'];
export const CustomBarChart: React.FC<MonthlyCountryChartProps> = ({ title, data, dataKey, strokeColor }) => {
	const formatValue = (value: number | string | undefined): string => {
		if (typeof value !== 'number') return '';
		return dataKey === 'revenue' ? (formatCurrency(value) ?? '') : value.toLocaleString();
	};

	const countries = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'monthLabel') : [];

	return (
		<div className="space-y-4 p-4 rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">{title}</h3>
			</div>
			<div className="h-[400px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#383838" />
						<XAxis dataKey="monthLabel" tick={{ fontSize: 10, fill: '#898989' }} axisLine={false} tickLine={false} />
						<YAxis tick={{ fontSize: 10, fill: '#898989' }} axisLine={false} tickLine={false} tickFormatter={formatValue} width={60} />
						<Tooltip
							cursor={{ fill: 'transparent' }}
							formatter={(value: any, name: string) => [formatValue(value), name]}
							contentStyle={{
								backgroundColor: '#272727',
								border: 'none',
								borderRadius: '4px',
								fontSize: '12px'
							}}
							labelStyle={{
								color: '#ffffff',
								marginBottom: '4px',
								fontWeight: 'bold'
							}}
							itemStyle={{ color: '#d1d1d1' }}
						/>
						<Legend wrapperStyle={{ fontSize: '12px', paddingTop: 8 }} layout="horizontal" verticalAlign="top" align="center" />
						{countries.map((country, idx) => (
							<Bar key={country} dataKey={country} fill={COLORS[idx % COLORS.length] || strokeColor} radius={[4, 4, 0, 0]} fillOpacity={1} />
						))}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
