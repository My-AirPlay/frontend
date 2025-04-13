/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { DataTable, PreviousPageButton } from '@/components/ui';
import { useGetAdminMedia } from './api';
import { useGetAllAlbums } from './api/getAdminGetAllAlbums';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useSearchParams } from 'next/navigation';

const Catalogue: React.FC = () => {
	const searchParams = useSearchParams();

	const [tab, setTab] = useState('releases');

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	const { data: tracks, isLoading: tracksLoading } = useGetAdminMedia({ page, limit });
	const { data: releases, isLoading: releasesLoading } = useGetAllAlbums({ page, limit });

	const trackColumns = [
		{
			id: 'title',
			header: 'Title',
			cell: (info: any) => (
				<Link href={`/admin/catalogue/tracks/${info.row.original._id}`} className="text-primary hover:underline">
					{info.row.original.title}
				</Link>
			)
		},
		{
			id: 'artistName',
			header: 'Artist',
			accessorKey: 'artistName',
			cell: (info: any) => <p className="text-primary ">{info.row.original.artistName}</p>
		},
		{
			id: 'recordLabel',
			header: 'Record Label',
			accessorKey: 'recordLabel'
		},
		{
			id: 'mainGenre',
			header: 'Genre',
			accessorKey: 'mainGenre'
		},
		{
			id: 'universalProductCode',
			header: 'ProductCode',
			cell: (info: any) => <p className="text-primary ">{info.row.original.universalProductCode || '-'}</p>
		}
	];

	const releaseColumns = [
		{
			id: 'title',
			header: 'Title',
			cell: (info: any) => (
				<Link href={`/admin/catalogue/releases/${info.row.original._id}`} className="text-primary hover:underline">
					{info.row.original.title}
				</Link>
			)
		},
		{
			id: 'artistName',
			header: 'Artist',
			accessorKey: 'artistName',
			cell: (info: any) => <p className="text-primary ">{info.row.original.artistName}</p>
		},
		{
			id: 'recordLabel',
			header: 'Record Label',
			accessorKey: 'recordLabel'
		},
		{
			id: 'universalProductCode',
			header: 'ProductCode',
			cell: (info: any) => <p className="text-primary ">{info.row.original.universalProductCode || '-'}</p>
		}
	];

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Catalogue</h1>
				<div className="flex items-center space-x-2">
					<div className="text-sm text-muted">Total: {(tab == 'releases' ? releases : tracks)?.total || '-'}</div>
					<Button variant="outline" className="bg-secondary text-foreground border-border">
						<Filter size={16} className="mr-2" />
						<span>Filter</span>
					</Button>
					<Button className="admin-button-primary">
						<Download size={16} className="mr-2" />
						<span>Download</span>
					</Button>
				</div>
			</div>

			<Tabs defaultValue="releases" value={tab} onValueChange={e => setTab(e)}>
				<TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
					<TabsTrigger value="releases" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Releases
					</TabsTrigger>
					<TabsTrigger value="tracks" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Tracks
					</TabsTrigger>
				</TabsList>

				<TabsContent value="releases" className="mt-0">
					{tracksLoading ? (
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={releases?.data} columns={releaseColumns} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={releases?.totalPages} />
					)}
				</TabsContent>

				<TabsContent value="tracks" className="mt-0">
					{releasesLoading ? (
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={tracks?.data} columns={trackColumns} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={tracks?.totalPages} />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Catalogue;
