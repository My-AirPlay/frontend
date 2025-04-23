import type React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';

interface DSP {
	name: string;
	totalStreams: number;
	totalRevenue: number;
}

interface TopDSPsTableProps {
	dspData: DSP[];
}

export const TopDSPsTable: React.FC<TopDSPsTableProps> = ({ dspData }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Platform</TableHead>
					<TableHead className="text-right">Streams</TableHead>
					<TableHead className="text-right">Revenue</TableHead>
					<TableHead className="text-right">Avg. per Stream</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{dspData.map(dsp => (
					<TableRow key={dsp.name}>
						<TableCell className="font-medium">{dsp.name}</TableCell>
						<TableCell className="text-right">{dsp.totalStreams.toLocaleString()}</TableCell>
						<TableCell className="text-right">{formatCurrency(dsp.totalRevenue)}</TableCell>
						<TableCell className="text-right">{formatCurrency(dsp.totalRevenue / dsp.totalStreams)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
