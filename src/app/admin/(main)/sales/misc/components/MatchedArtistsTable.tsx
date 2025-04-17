import React from 'react';
import { DataTable } from '@/components/ui';
import { Artist } from '@/lib/types';

interface MatchedArtistsTableProps {
	artists: Artist[];
}

const MatchedArtistsTable: React.FC<MatchedArtistsTableProps> = ({ artists }) => {
	const columns = [
		{
			id: 'artisteName',
			header: 'Artist Name',
			accessorKey: 'artisteName'
		},

		{
			id: 'realName',
			header: 'Track Title',
			accessorKey: 'realName',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary hover:underline"> {info.row.original?.reports[0]?.trackTitle} </p>
		},
		{
			id: 'activityperiod',
			header: 'Activity Period',
			accessorKey: 'activityperiod',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.reports[0]?.activityPeriod} </p>
		},
		{
			id: 'totalroyalty',
			header: 'Total Royalty',
			accessorKey: 'totalroyalty',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.reports[0]?.totalRoyaltyUSD?.value?.toFixed(2)} </p>
		},
		{
			id: 'catalogueId',
			header: 'Catalogue ID',
			accessorKey: 'catalogueId'
		},
		{
			id: 'isrcCode',
			header: 'ISRC Code ',
			accessorKey: 'isrcCode'
		}
	];

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Matched Artists</h3>
			<DataTable data={artists} columns={columns} pagination={false} defaultRowsPerPage={50} />
		</div>
	);
};

export default MatchedArtistsTable;
