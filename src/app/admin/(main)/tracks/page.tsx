/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/ui';
import { useGetAllTracks } from './api/trackHooks';

const Tracks: React.FC = () => {
	const searchParams = useSearchParams();
	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	const apiParams = {
		page,
		limit
	};

	// --- 2. Data Fetching ---
	const { data: tracks, isLoading } = useGetAllTracks({ page: apiParams.page, limit: apiParams.limit });

	// --- 4. Column Definitions ---
	const trackColumns = [
		{
			id: 'trackTitle',
			header: 'Title',
			cell: (info: any) => {
				console.log(info.row.original);
				return (
					<Link href={`/admin/tracks/${info.row.original._id}`} className="text-primary font-medium hover:underline">
						{info.row.original.trackTitle}
					</Link>
				);
			}
		},
		{
			id: 'artist',
			header: 'Primary Artist',
			accessorKey: 'artist'
		},
		{
			// --- NEW COLUMN: Shared Revenue Artists ---
			id: 'sharedRevenue',
			header: 'Artists',
			cell: (info: any) => {
				const shared = info.row.original.sharedRevenue;

				if (!shared || shared.length === 0) {
					return <span className="text-muted-foreground text-xs">-</span>;
				}

				// Map over the array to get names and join them
				return (
					<div className="flex flex-wrap gap-1">
						{shared.map((item: any, index: number) => (
							<span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
								{item.artistName}
								<span className="ml-1 opacity-50">({item.percentage}%)</span>
							</span>
						))}
					</div>
				);
			}
		},
		{
			id: 'isrcCode',
			header: 'ISRC',
			accessorKey: 'isrcCode',
			cell: (info: any) => <span className="text-muted-foreground text-sm font-mono">{info.row.original.isrcCode || '-'}</span>
		},
		{
			id: 'upcCode',
			header: 'UPC',
			accessorKey: 'upcCode',
			cell: (info: any) => <span className="text-muted-foreground text-sm font-mono">{info.row.original.upcCode || '-'}</span>
		},
		{
			id: 'createdAt',
			header: 'Created',
			accessorKey: 'createdAt',
			cell: (info: any) => new Date(info.row.original.createdAt).toLocaleDateString()
		}
	];

	return (
		<div className="space-y-4 p-6 bg-background min-h-screen">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Tracks Catalogue</h1>
			</div>

			<div className="rounded-md border">
				<DataTable data={tracks?.data || []} columns={trackColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={tracks?.totalPages || 1} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default Tracks;
