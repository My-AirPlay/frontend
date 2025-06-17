import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';
import { useCurrency, Currency } from '@/app/artiste/context/CurrencyContext';
import { NamedPerformanceItem } from '@/app/artiste/(main)/dashboard/misc/api';

// You can place this helper function here or in your currency utils file
function getLocaleForCurrency(currency: Currency): string {
	const currencyToLocaleMap: Record<Currency, string> = {
		USD: 'en-US',
		EUR: 'en-GB',
		NGN: 'en-NG'
	};
	return currencyToLocaleMap[currency] || 'en-US';
}

interface TopCountriesTableProps {
	countryData: NamedPerformanceItem[];
}

export const TopCountriesTable: React.FC<TopCountriesTableProps> = ({ countryData }) => {
	// Call the hook at the top level of the component
	const { currency, convertCurrency } = useCurrency();
	const locale = getLocaleForCurrency(currency);

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
				{countryData.map(country => {
					const convertedTotalRevenue = convertCurrency(country.totalRevenue);

					const avgPerStream = country.totalStreams > 0 ? convertedTotalRevenue / country.totalStreams : 0;

					return (
						<TableRow key={country.name}>
							<TableCell className="font-medium">{country.name}</TableCell>
							<TableCell className="text-right">{country.totalStreams.toLocaleString()}</TableCell>
							<TableCell className="text-right">{formatCurrency(convertCurrency(country.totalRevenue), currency)}</TableCell>

							<TableCell className="text-right">
								{new Intl.NumberFormat(locale, {
									style: 'currency',
									currency: currency,
									minimumFractionDigits: 4,
									maximumFractionDigits: 4
								}).format(avgPerStream)}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};
