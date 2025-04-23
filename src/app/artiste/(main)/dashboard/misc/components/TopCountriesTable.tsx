import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';

interface Country {
	name: string;
	totalStreams: number;
	totalRevenue: number;
}

interface TopCountriesTableProps {
	countryData: Country[];
}

export const TopCountriesTable: React.FC<TopCountriesTableProps> = ({ countryData }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Country</TableHead>
					<TableHead className="text-right">Streams</TableHead>
					<TableHead className="text-right">Revenue</TableHead>
					<TableHead className="text-right">Avg. per Stream</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{countryData.map(country => (
					<TableRow key={country.name}>
						<TableCell className="font-medium">{country.name}</TableCell>
						<TableCell className="text-right">{country.totalStreams.toLocaleString()}</TableCell>
						<TableCell className="text-right">{formatCurrency(country.totalRevenue)}</TableCell>
						<TableCell className="text-right">{formatCurrency(country.totalRevenue / country.totalStreams)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
