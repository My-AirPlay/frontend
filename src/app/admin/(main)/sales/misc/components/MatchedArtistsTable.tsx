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

	const getTrackTitleCell = (row: any) => {
		//const reports = row.original.fullReports || [];
		if (row.original.count <= 1) {
			return <span>{row.original.firstTitle ?? '—'}</span>;
		}

		const firstTitle = row.original.firstTitle;
		const others = row.original.otherTitles;
		const count = row.original.titleCount;

		// Build tooltip text
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

	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			accessorKey: 'artistName'
		},

		{
			id: 'trackTitle',
			header: 'Track Title(s)',
			accessorFn: (row: any) => row.fullReports?.[0]?.trackTitle ?? '—',
			cell: (info: any) => <p className="text-admin-primary hover:underline">{getTrackTitleCell(info.row)}</p>
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
