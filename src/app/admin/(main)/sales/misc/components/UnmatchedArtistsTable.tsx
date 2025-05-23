import React from 'react';
import { DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types'; // Changed Artist to ReportItem

interface UnmatchedArtistsTableProps {
	artists: ReportItem[]; // Changed Artist[] to ReportItem[]
	onArtistMatch: (artistId: string) => void;
}

const UnmatchedArtistsTable: React.FC<UnmatchedArtistsTableProps> = ({ artists, onArtistMatch }) => {
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
			header: 'Total Royalty',
			accessorKey: 'totalroyalty',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.fullReports[0]?.totalRoyaltyUSD?.value?.toFixed(2)} </p>
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
			<h3 className="text-lg font-medium">Unmatched Artists</h3>
			<DataTable data={artists} columns={columns} pagination={false} defaultRowsPerPage={50} onRowClick={row => onArtistMatch(row._id)} />
		</div>
	);
};

export default UnmatchedArtistsTable;
