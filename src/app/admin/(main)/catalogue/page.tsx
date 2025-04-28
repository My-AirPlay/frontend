/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { DataTable, PreviousPageButton } from '@/components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Added Dropdown imports
import { useGetAdminMedia } from './api';
import { useGetAllAlbums } from './api/getAdminGetAllAlbums';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; // Added useRouter, usePathname
import { ArrowDown, ArrowUp } from 'lucide-react'; // Added sorting icons

const Catalogue: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [tab, setTab] = useState('releases');

	// State for sorting
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'title');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	// Function to update URL search params for sorting
	const updateSorting = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
		setSortBy(newSortBy);
		setSortOrder(newSortOrder);
		const params = new URLSearchParams(searchParams.toString());
		params.set('sortBy', newSortBy);
		params.set('sortOrder', newSortOrder);
		// Reset page to 1 when sorting changes
		params.set('page', '1');
		router.push(`${pathname}?${params.toString()}`);
	};

	// Construct parameters object for the API hooks including sorting
	const apiParams: { page: string; limit: string; sortBy?: string; sortOrder?: 'asc' | 'desc' } = {
		page,
		limit,
		sortBy,
		sortOrder
	};

	// Fetch data with sorting
	const { data: tracks, isLoading: tracksLoading } = useGetAdminMedia(apiParams);
	const { data: releases, isLoading: releasesLoading } = useGetAllAlbums(apiParams);

	// Define sortable columns for each tab
	const releaseSortableColumns = [
		{ id: 'title', label: 'Title' },
		{ id: 'artistName', label: 'Artist' },
		{ id: 'recordLabel', label: 'Record Label' },
		{ id: 'universalProductCode', label: 'Product Code' }
	];

	const trackSortableColumns = [
		{ id: 'title', label: 'Title' },
		{ id: 'artistName', label: 'Artist' },
		{ id: 'recordLabel', label: 'Record Label' },
		{ id: 'mainGenre', label: 'Genre' },
		{ id: 'universalProductCode', label: 'Product Code' }
	];

	const currentSortableColumns = tab === 'releases' ? releaseSortableColumns : trackSortableColumns;

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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							{/* Using Filter icon for Sort button for consistency, can be changed */}
							<Button variant="outline" className="bg-secondary text-foreground border-border max-md:size-10 max-md:p-0">
								<Filter size={16} className="md:mr-2" />
								<span className="hidden md:inline">Sort By</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuLabel>Sort By</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Column</DropdownMenuLabel>
								{currentSortableColumns.map(col => (
									<DropdownMenuItem key={col.id} onSelect={() => updateSorting(col.id, sortOrder)} className={sortBy === col.id ? 'bg-accent' : ''}>
										{col.label}
										{sortBy === col.id && (sortOrder === 'asc' ? <ArrowUp size={14} className="ml-auto" /> : <ArrowDown size={14} className="ml-auto" />)}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Order</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => updateSorting(sortBy, 'asc')} className={sortOrder === 'asc' ? 'bg-accent' : ''}>
									Ascending <ArrowUp size={14} className="ml-auto" />
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateSorting(sortBy, 'desc')} className={sortOrder === 'desc' ? 'bg-accent' : ''}>
									Descending <ArrowDown size={14} className="ml-auto" />
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button className="admin-button-primary max-md:size-10 max-md:p-0">
						<Download size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Download</span>
					</Button>
				</div>
			</div>

			<Tabs
				defaultValue="releases"
				value={tab}
				onValueChange={newTab => {
					setTab(newTab);

					// Determine sortable columns for the new tab
					const newSortableColumns = newTab === 'releases' ? releaseSortableColumns : trackSortableColumns;
					const isCurrentSortByValid = newSortableColumns.some(col => col.id === sortBy);

					let newSortBy = sortBy;
					// If current sortBy is not valid for the new tab, reset to default
					if (!isCurrentSortByValid) {
						newSortBy = 'title'; // Default sort column
						setSortBy(newSortBy); // Update state if it changed
					}
					// Keep current sortOrder

					// Update URL params
					const params = new URLSearchParams(searchParams.toString());
					params.set('sortBy', newSortBy);
					params.set('sortOrder', sortOrder); // Keep existing sort order
					params.set('page', '1'); // Reset page
					router.push(`${pathname}?${params.toString()}`);
				}}
			>
				<TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
					<TabsTrigger value="releases" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Releases
					</TabsTrigger>
					<TabsTrigger value="tracks" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Tracks
					</TabsTrigger>
				</TabsList>

				<TabsContent value="releases" className="mt-0">
					{releasesLoading ? ( // Corrected: Use releasesLoading for Releases tab
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={releases?.data} columns={releaseColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={releases?.totalPages} />
					)}
				</TabsContent>

				<TabsContent value="tracks" className="mt-0">
					{tracksLoading ? ( // Corrected: Use tracksLoading for Tracks tab
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={tracks?.data} columns={trackColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={tracks?.totalPages} />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Catalogue;
