import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryData {
	name: string;
	totalStreams: number;
	totalRevenue: number;
}

interface CountryBreakdownMapProps {
	countryData: CountryData[];
}

export const CountryBreakdownMap: React.FC<CountryBreakdownMapProps> = ({ countryData }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Geographic Distribution</CardTitle>
				<CardDescription>Streams by country</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[400px] flex items-center justify-center">
					<p className="text-muted-foreground">Interactive map visualization would go here, showing the distribution of streams across {countryData.length} countries.</p>
				</div>
			</CardContent>
		</Card>
	);
};
