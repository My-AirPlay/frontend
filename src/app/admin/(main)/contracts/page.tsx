/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge, DataTable, PreviousPageButton } from '@/components/ui';
import { useGetAllArtists } from '../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';

const Contracts = () => {
	const searchParams = useSearchParams();

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	const { data: contracts, isLoading: contractsLoading } = useGetAllArtists({ page, limit });

	const totalContracts = contracts?.total || 0;
	const pageCount = contracts?.totalPages || 0;

	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			cell: (info: any) => (
				<Link href={`/admin/contracts/${info.row.original._id}/overview`} className="text-admin-primary hover:underline">
					{info.row.original?.artistName || '-'}
				</Link>
			)
		},
		{
			id: 'name',
			header: 'Name',
			cell: (info: any) => (
				<Link href={`/admin/contracts/${info.row.original._id}/overview`} className="text-admin-primary hover:underline">
					{`${info.row.original?.firstName || '-'} ${info.row.original?.lastName || ''}`}
				</Link>
			)
		},
		{
			id: 'stage',
			header: 'Stage',
			cell: (info: any) => <span className="royalty-badge bg-primary/20 text-primary border border-primary/50 text-xs px-3 py-1 rounded-md capitalize whitespace-nowrap">{info.row.original.stage || '-'}</span>
		},
		{
			id: 'hasManagement',
			header: 'Management',
			accessorKey: 'hasManagement',
			cell: (info: any) => <span className={`${info.row.original.hasManagement ? 'text-green-500' : 'text-primary'} text-xs  rounded-md capitalize`}>{info.row.original.hasManagement ? 'Has Management' : 'No Management'}</span>
		},
		{
			id: 'dateCreated',
			header: 'Date Created',
			accessorKey: 'dateCreated',
			cell: (info: any) => <p className="">{moment(info.row.original?.createdAt).format('D MMM, YYYY')}</p>
		},
		{
			id: 'status',
			header: 'Status',
			cell: (info: any) => <Badge variant={info.row.original.status === 'Pending' ? 'destructive' : 'success'}>{info.row.original.status || '-'}</Badge>
		}
	];

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Contracts</h1>
				<div className="flex items-center space-x-2">
					<div className="text-sm text-admin-muted">Total: {totalContracts}</div>
					<Button variant="outline" className="max-md:size-10 max-md:p-0">
						<Filter size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Filter</span>
					</Button>
					<Button className="max-md:size-10 max-md:p-0">
						<Download size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Download</span>
					</Button>
				</div>
			</div>

			<div className="flex border-b border-admin-border">
				<button className="admin-tab active">All</button>
			</div>

			{contractsLoading ? (
				<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<DataTable data={contracts?.data} columns={columns} showCheckbox={true} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={pageCount} />
			)}
		</div>
	);
};

export default Contracts;
