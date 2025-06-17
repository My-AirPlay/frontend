import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, getLocaleForCurrency } from '@/utils/currency';
import { NamedPerformanceItem } from '../../../dashboard/misc/api';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';

interface TopDSPsTableProps {
	dspData: NamedPerformanceItem[];
}

export const TopDSPsTable: React.FC<TopDSPsTableProps> = ({ dspData }) => {
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
				{dspData.map(dsp => {
					const convertedTotalRevenue = convertCurrency(dsp.totalRevenue);

					const avgPerStream = dsp.totalStreams > 0 ? convertedTotalRevenue / dsp.totalStreams : 0;

					return (
						<TableRow key={dsp.name}>
							<TableCell className="font-medium">{dsp.name}</TableCell>
							<TableCell className="text-right">{dsp.totalStreams.toLocaleString()}</TableCell>
							<TableCell className="text-right">{formatCurrency(convertCurrency(dsp.totalRevenue), currency)}</TableCell>

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
