/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { Button, DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types'; // Changed Artist to ReportItem

interface UnmatchedArtistsTableProps {
	artists: ReportItem[]; // Changed Artist[] to ReportItem[]
	onArtistMatch: (row: ReportItem) => void;
	onBulkArtistMatch: () => void;
	onRowSelectionChange?: (selectedData: ReportItem[]) => void;
}

const UnmatchedArtistsTable: React.FC<UnmatchedArtistsTableProps> = ({ artists, onArtistMatch, onBulkArtistMatch, onRowSelectionChange }) => {
	const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);
	const handleSelectionChange = useCallback(
		(rows: ReportItem[]) => {
			setSelectedRows(rows);
			onRowSelectionChange?.(rows);
		},
		[onRowSelectionChange]
	);
	function getRoyalty(fullReport: any) {
		const value = parseFloat(fullReport.totalRoyaltyUSD?.royaltyConverted[0].amount)?.toFixed(2);
		const currency = fullReport.totalRoyaltyUSD.royaltyConverted[0].toCurrency;
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2
		}).format(Number(value));
	}
	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			accessorKey: 'artistName'
		},

		{
			id: 'realName',
			header: 'Track Title',
			accessorKey: 'realName',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary hover:underline"> {info.row.original?.fullReports[0]?.trackTitle} </p>
		},
		{
			id: 'activityperiod',
			header: 'Activity Period',
			accessorKey: 'activityperiod',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.activityPeriod} </p>
		},
		{
			id: 'totalroyalty',
			header: 'Gross Revenue(₦)',
			accessorKey: 'totalroyalty',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {getRoyalty(info.row.original?.fullReports[0])} </p>
		},
		{
			id: 'catalogueId',
			header: 'Catalogue ID',
			accessorKey: 'catalogueId',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.fullReports[0]?.catalogueId} </p>
		},
		{
			id: 'isrcCode',
			header: 'ISRC Code ',
			accessorKey: 'isrcCode',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.fullReports[0]?.isrcCode} </p>
		}
	];

	return (
		<div className="space-y-6 mt-12">
			<div className="flex justify-between">
				<h3 className="text-lg font-medium">Unmatched Artists</h3>
				<Button variant="outline" className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2" onClick={onBulkArtistMatch} disabled={selectedRows.length <= 0}>
					Bulk Match Artists
				</Button>
			</div>
			<DataTable data={artists} columns={columns} pagination={false} defaultRowsPerPage={50} onRowClick={row => onArtistMatch(row)} showCheckbox onRowSelectionChange={handleSelectionChange} />
		</div>
	);
};

export default UnmatchedArtistsTable;
