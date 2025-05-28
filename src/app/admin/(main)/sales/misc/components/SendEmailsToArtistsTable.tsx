import React, { useCallback, useState } from 'react';
import { Button, DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types';
import { Download } from 'lucide-react';

interface SendEmailsToArtistTableProps {
	artists: ReportItem[];
	onRowSelectionChange?: (selectedData: ReportItem[]) => void;
	onSendEmails?: (selectedData: ReportItem[]) => void;
}

const SendEmailsToArtistTable: React.FC<SendEmailsToArtistTableProps> = ({ artists, onRowSelectionChange, onSendEmails }) => {
	// keep track of selected rows locally
	const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);

	const getRoyalty = (report: ReportItem['fullReports'][0]): string => {
		const raw = parseFloat(report.totalRoyaltyUSD?.royaltyConverted[0].amount ?? '0');
		const converted = raw.toFixed(2);
		const currency = report.totalRoyaltyUSD.royaltyConverted[0].toCurrency;
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2
		}).format(Number(converted));
	};

	// receive selection from DataTable and lift it up
	const handleSelectionChange = useCallback(
		(rows: ReportItem[]) => {
			setSelectedRows(rows);
			onRowSelectionChange?.(rows);
		},
		[onRowSelectionChange]
	);

	// when button clicked, call parent onSendEmails with current selection
	const handleSendEmails = () => {
		onSendEmails?.(selectedRows);
	};

	const columns = [
		{ id: 'artistName', header: 'Artist Name', accessorKey: 'artistName' },
		{ id: 'trackTitle', header: 'Track Title', accessorFn: row => row.fullReports?.[0]?.trackTitle ?? '—' },
		{ id: 'activityPeriod', header: 'Activity Period', accessorKey: 'activityPeriod' },
		{ id: 'totalRoyalty', header: 'Total Royalty (USD)', accessorFn: row => getRoyalty(row.fullReports[0]) },
		{ id: 'catalogueId', header: 'Catalogue ID', accessorFn: row => row.fullReports?.[0]?.catalogueId ?? '—' },
		{ id: 'isrcCode', header: 'ISRC Code', accessorFn: row => row.fullReports?.[0]?.isrcCode ?? '—' }
	] as const;

	return (
		<div className="w-full">
			<div className="flex justify-end mb-4">
				<Button onClick={handleSendEmails} disabled={selectedRows.length === 0}>
					<Download size={16} className="mr-2" /> Send Emails ({selectedRows.length})
				</Button>
			</div>

			<h3 className="text-lg font-medium mb-2">Send Report Emails to Artists</h3>

			<DataTable data={artists} columns={columns} pagination defaultRowsPerPage={50} showCheckbox onRowSelectionChange={handleSelectionChange} />
		</div>
	);
};

export default SendEmailsToArtistTable;
