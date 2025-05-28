/* eslint-disable @typescript-eslint/no-explicit-any */
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

	const getRoyalty = (row: any): string => {
		const reports = row.fullReports || [];

		// Sum all the converted amounts (fallback to 0 if missing)
		const total = reports.reduce((sum: number, rep: any) => {
			const amt = parseFloat(rep.totalRoyaltyUSD?.royaltyConverted?.[0]?.amount ?? '0');
			return sum + amt;
		}, 0);

		// Use the currency from the first report (or “USD” fallback)
		const currency = reports[0]?.totalRoyaltyUSD?.royaltyConverted?.[0]?.toCurrency || 'USD';

		// Format as currency
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2
		}).format(total);
	};

	const getTrackTitleCell = (row: any) => {
		const reports = row.original.fullReports || [];
		if (reports.length <= 1) {
			return <span>{reports[0]?.trackTitle ?? '—'}</span>;
		}

		const firstTitle = reports[0].trackTitle;
		const others = reports.slice(1).map((r: any) => r.trackTitle);
		const count = others.length;

		const tooltipText = others.slice(0, count).join('\n');

		return (
			<span className="flex items-center">
				<span>{firstTitle}</span>
				<span className="ml-1 px-1 text-[10px] font-medium bg-gray-200 text-gray-700 rounded cursor-help" title={tooltipText}>
					+{count}
				</span>
			</span>
		);
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
		{ id: 'trackTitle', header: 'Track Title', cell: (info: any) => <p className="text-admin-primary hover:underline">{getTrackTitleCell(info.row)}</p> },
		{ id: 'activityPeriod', header: 'Activity Period', accessorKey: 'activityPeriod' },
		{ id: 'totalRoyalty', header: 'Total Royalty (USD)', accessorFn: (row: any) => getRoyalty(row) },
		{ id: 'catalogueId', header: 'Catalogue ID', accessorFn: (row: any) => row.fullReports?.[0]?.catalogueId ?? '—' },
		{ id: 'isrcCode', header: 'ISRC Code', accessorFn: (row: any) => row.fullReports?.[0]?.isrcCode ?? '—' }
	];

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
