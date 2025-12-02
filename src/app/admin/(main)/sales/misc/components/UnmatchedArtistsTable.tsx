/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, useMemo } from 'react';
import { Button, DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types';
import { ArrowUpDown } from 'lucide-react';

interface UnmatchedArtistsTableProps {
	artists: ReportItem[];
	onArtistMatch: (row: ReportItem) => void;
	onBulkArtistMatch: () => void;
	onRowSelectionChange?: (selectedData: ReportItem[]) => void;
}

const UnmatchedArtistsTable: React.FC<UnmatchedArtistsTableProps> = ({ artists, onArtistMatch, onBulkArtistMatch, onRowSelectionChange }) => {
	const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

	const sortedArtists = useMemo(() => {
		if (sortOrder === 'none') return artists;

		return [...artists].sort((a, b) => {
			const nameA = (a.artistName || '').toLowerCase();
			const nameB = (b.artistName || '').toLowerCase();

			if (sortOrder === 'asc') {
				return nameA.localeCompare(nameB);
			} else {
				return nameB.localeCompare(nameA);
			}
		});
	}, [artists, sortOrder]);

	const toggleSort = () => {
		setSortOrder(current => {
			if (current === 'none') return 'asc';
			if (current === 'asc') return 'desc';
			return 'none';
		});
	};

	const handleSelectionChange = useCallback(
		(rows: ReportItem[]) => {
			setSelectedRows(rows);
			onRowSelectionChange?.(rows);
		},
		[onRowSelectionChange]
	);

	const getRoyalty = (row: any): string => {
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
			id: 'realName',
			header: 'Track Title',
			accessorKey: 'realName',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-admin-primary hover:underline"> {info.row.original?.firstTitle} </p>
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
		<div className="space-y-6 mt-12">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<h3 className="text-lg font-medium">Unmatched Artists</h3>
					<Button variant="outline" size="sm" className="flex items-center gap-2" onClick={toggleSort}>
						<ArrowUpDown className="h-4 w-4" />
						Sort by Name {sortOrder === 'asc' ? '(A-Z)' : sortOrder === 'desc' ? '(Z-A)' : ''}
					</Button>
				</div>
				<Button variant="outline" className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2" onClick={onBulkArtistMatch} disabled={selectedRows.length <= 0}>
					Bulk Match Artists
				</Button>
			</div>
			<DataTable data={sortedArtists} columns={columns} pagination={false} defaultRowsPerPage={50} onRowClick={row => onArtistMatch(row)} showCheckbox onRowSelectionChange={handleSelectionChange} />
		</div>
	);
};

export default UnmatchedArtistsTable;
