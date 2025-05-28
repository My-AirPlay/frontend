/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useCallback } from 'react'; // Added useCallback
import { Download, Filter, Loader2 } from 'lucide-react'; // Added Loader2
import JSZip from 'jszip'; // Import JSZip
import { saveAs } from 'file-saver'; // Import file-saver
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { DataTable, PreviousPageButton } from '@/components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Added Dropdown imports
import { useGetAdminMedia } from './api';
import { useGetAllAlbums } from './api/getAdminGetAllAlbums';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { toast } from 'sonner'; // Import toast

// Helper function for delay - REMOVED (unused)
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Define interfaces for row data (adjust based on actual API response)

const Catalogue: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentTab = searchParams.get('tab') ?? 'tracks';

	const [tab, setTab] = useState<'releases' | 'tracks' | 'videos' | string>(currentTab || 'releases'); // Default to releases or read from URL

	// State for sorting
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'title');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');

	// State for selection
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // Store selected row data
	const [isBulkDownloading, setIsBulkDownloading] = useState(false); // Loading state for bulk download

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	// Hook for triggering download URL generation (REMOVED - Not needed for JSZip approach)
	// const { mutate: downloadMutate, isPending: isGeneratingDownloadUrls } = useDownloadMedia();

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

	// Callback for DataTable selection change
	const handleSelectionChange = useCallback((selectedData: any[]) => {
		setSelectedRows(selectedData);
	}, []); // Added dependency array

	// Function to handle the bulk download logic using JSZip
	const handleBulkDownload = async () => {
		if (selectedRows.length === 0) {
			toast.info('Please select items to download.');
			return;
		}

		setIsBulkDownloading(true);
		toast.info('Preparing files for download…');

		try {
			const zip = new JSZip();
			let filesAdded = 0;
			let fetchErrors = 0;

			// helper to fetch a URL and add to a JSZip folder, inferring filename from URL
			async function fetchAndAddToFolder(url: string, folder: JSZip) {
				try {
					const res = await fetch(url);
					if (!res.ok) throw new Error(`HTTP ${res.status}`);
					const blob = await res.blob();
					const pathname = new URL(url).pathname;
					const rawName = pathname.substring(pathname.lastIndexOf('/') + 1);
					const filename = rawName || 'file';
					folder.file(filename, blob);
					filesAdded++;
				} catch (e) {
					console.error(`Error fetching ${url}:`, e);
					fetchErrors++;
				}
			}

			// ———————————————
			// Determine which rows to process:
			// If any selectedRows have row.fileIds, we expand those IDs
			// and lookup each in tracks.data; otherwise just use selectedRows.
			// (Assuming you have access to `tracks.data` in this scope.)
			// ———————————————
			let rowsToProcess: typeof selectedRows = selectedRows;

			const hasFileIds = selectedRows.some(row => Array.isArray((row as any).fileIds));
			if (hasFileIds) {
				// flatten all fileIds
				const allIds = (selectedRows as any[]).flatMap(r => r.fileIds as string[]);

				// lookup each id in tracks.data
				rowsToProcess = allIds.map(id => tracks.data.find((t: any) => t._id === id)).filter((t): t is typeof t => Boolean(t));
			}
			// ———————————————

			// now fetch media + cover for each row in rowsToProcess
			const rowPromises = rowsToProcess.map(async (row, idx) => {
				const folderName = `${row.artistName} - ${row.title} (${idx + 1})`;
				const folder = zip.folder(folderName)!;

				if (typeof row.mediaUrl === 'string') {
					await fetchAndAddToFolder(row.mediaUrl, folder);
				}
				if (typeof row.mediaCoverArtUrl === 'string') {
					await fetchAndAddToFolder(row.mediaCoverArtUrl, folder);
				}
			});

			await Promise.all(rowPromises);

			if (filesAdded === 0) {
				toast.error('Failed to fetch any files. Cannot create zip.');
				return;
			}
			if (fetchErrors > 0) {
				toast.warning(`Some files failed to fetch (${fetchErrors}). Continuing.`);
			}

			toast.info(`Zipping ${filesAdded} files…`);
			const blob = await zip.generateAsync({
				type: 'blob',
				compression: 'DEFLATE',
				compressionOptions: { level: 6 }
			});
			saveAs(blob, `airplay-download-${Date.now()}.zip`);
			toast.success(`Download started with ${filesAdded} files.`);
		} catch (err) {
			console.error('Bulk download error:', err);
			toast.error('Unexpected error during bulk download.');
		} finally {
			setIsBulkDownloading(false);
		}
	};

	// Construct parameters object for the API hooks including sorting
	const apiParams: {
		page: string;
		limit: string;
		sortBy?: string;
		sortOrder?: 'asc' | 'desc';
	} = {
		page,
		limit,
		sortBy: sortBy || 'title',
		sortOrder: sortOrder || 'asc'
	};

	// Fetch data with sorting
	const { data: tracks, isLoading: tracksLoading } = useGetAdminMedia(apiParams);
	const { data: releases, isLoading: releasesLoading } = useGetAllAlbums(apiParams);
	const { data: video, isLoading: videoLoading } = useGetAdminMedia({ ...apiParams, type: 'video' });

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

	const videosSortableColumns = [
		{ id: 'title', label: 'Title' },
		{ id: 'artistName', label: 'Artist' },
		{ id: 'recordLabel', label: 'Record Label' },
		{ id: 'mainGenre', label: 'Genre' },
		{ id: 'universalProductCode', label: 'Product Code' }
	];

	const sortableColumns = {
		releases: releaseSortableColumns,
		tracks: trackSortableColumns,
		videos: videosSortableColumns
	};

	const currentSortableColumns = sortableColumns[tab];

	const videoColumns = [
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
					{/* Updated Download Button - Removed isGeneratingDownloadUrls from disabled check */}
					<Button className="admin-button-primary max-md:size-10 max-md:p-0" onClick={handleBulkDownload} disabled={selectedRows.length === 0 || isBulkDownloading || (tab === 'tracks' ? tracksLoading : releasesLoading)}>
						{isBulkDownloading ? <Loader2 size={16} className="animate-spin md:mr-2" /> : <Download size={16} className="md:mr-2" />}
						<span className="max-md:sr-only">Download</span>
					</Button>
				</div>
			</div>

			<Tabs
				defaultValue="releases"
				value={tab}
				onValueChange={(newTab: string) => {
					const validTab = newTab;
					setTab(validTab);
					setSelectedRows([]); // Clear selection when tab changes

					// Determine sortable columns for the new tab
					const newSortableColumns = validTab === 'releases' ? releaseSortableColumns : trackSortableColumns;
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
					params.set('sortOrder', sortOrder);
					params.set('page', '1');
					params.set('tab', validTab); // Add tab to URL params
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
					<TabsTrigger value="videos" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Videos
					</TabsTrigger>
				</TabsList>

				<TabsContent value="releases" className="mt-0">
					{releasesLoading ? ( // Corrected: Use releasesLoading for Releases tab
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={releases?.data} columns={releaseColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={releases?.totalPages} onRowSelectionChange={handleSelectionChange} />
					)}
				</TabsContent>
				<TabsContent value="videos" className="mt-0">
					{videoLoading ? ( // Corrected: Use releasesLoading for Releases tab
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={video?.data} columns={videoColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={releases?.totalPages} onRowSelectionChange={handleSelectionChange} />
					)}
				</TabsContent>

				<TabsContent value="tracks" className="mt-0">
					{tracksLoading ? ( // Corrected: Use tracksLoading for Tracks tab
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={tracks?.data} columns={trackColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={tracks?.totalPages} onRowSelectionChange={handleSelectionChange} />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Catalogue;
