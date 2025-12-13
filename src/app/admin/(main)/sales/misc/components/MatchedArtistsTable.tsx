/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types'; // Changed Artist to ReportItem

interface MatchedArtistsTableProps {
	artists: ReportItem[]; // Changed Artist[] to ReportItem[]
	onArtistRevenueClick: (row: ReportItem) => void;
}

const MatchedArtistsTable: React.FC<MatchedArtistsTableProps> = ({ artists, onArtistRevenueClick }) => {
	console.log('artists prop', artists);

	const getRoyalty = (row: any): string => {
		// Use the currency from the first report (or “USD” fallback)
		const currency = row.original.currency || 'USD';

		// Format as currency
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2
		}).format(row.original.total);
	};

	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			accessorKey: 'artistName'
		},

		{
			id: 'trackTitle',
			header: 'Track Title',
			accessorFn: (row: any) => row.fullReports?.[0]?.trackTitle ?? '—',
			cell: (info: any) => <p className="text-admin-primary hover:underline">{info.row.original?.firstTitle} </p>
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
			cell: (info: any) => <p className="text-admin-primary "> {getRoyalty(info.row)} </p>
		},
		{
			id: 'catalogueId',
			header: 'Catalogue ID',
			accessorKey: 'catalogueId',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.catalogueId} </p>
		},
		{
			id: 'isrcCode',
			header: 'ISRC Code ',
			accessorKey: 'isrcCode',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.isrcCode} </p>
		}
	];

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Matched Artists</h3>
			<DataTable data={artists} columns={columns} pagination={false} defaultRowsPerPage={50} onRowClick={row => onArtistRevenueClick(row)} />
		</div>
	);
};

export default MatchedArtistsTable;
