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
// import { useDownloadMedia } from './api/getDownloadMedia'; // Import download hook - REMOVED (unused)
import { getMedia } from './api/getOneMedia'; // Import function to get single media details
import { toast } from 'sonner'; // Import toast

// Helper function for delay - REMOVED (unused)
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Define interfaces for row data (adjust based on actual API response)

const Catalogue: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [tab, setTab] = useState<'releases' | 'tracks'>(searchParams.get('tab') === 'tracks' ? 'tracks' : 'releases'); // Default to releases or read from URL

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
		toast.info('Preparing files for download...');
		const urlsToCollect: string[] = [];
		const trackIdsToFetch: string[] = [];

		try {
			// 1. Collect Media URLs or Track IDs
			selectedRows.forEach(row => {
				if (tab === 'tracks' && typeof row.mediaUrl === 'string') {
					urlsToCollect.push(row.mediaUrl);
				} else if (tab === 'releases' && Array.isArray(row.fileIds)) {
					trackIdsToFetch.push(...row.fileIds);
				} else {
					console.warn('Selected row does not match expected structure:', row);
				}
			});

			// 2. Fetch Media URLs for Track IDs if necessary
			if (trackIdsToFetch.length > 0) {
				const uniqueTrackIds = [...new Set(trackIdsToFetch.filter(id => typeof id === 'string' && id.trim() !== ''))];
				if (uniqueTrackIds.length > 0) {
					toast.info(`Fetching details for ${uniqueTrackIds.length} tracks...`);
					const trackDetailPromises = uniqueTrackIds.map(id => getMedia({ mediaId: id, config: { skipAuthRedirect: true } }));
					const results = await Promise.allSettled(trackDetailPromises);

					results.forEach((result, index) => {
						if (result.status === 'fulfilled' && result.value?.mediaUrl) {
							urlsToCollect.push(result.value.mediaUrl);
						} else {
							const reason = result.status === 'rejected' ? result.reason : 'No mediaUrl';
							console.error(`Failed to fetch details for track ID: ${uniqueTrackIds[index]}`, reason);
							toast.error(`Failed to get download details for track ID: ${uniqueTrackIds[index]}`);
						}
					});
				}
			}

			const finalUrls = [...new Set(urlsToCollect)]; // Ensure unique URLs

			if (finalUrls.length === 0) {
				toast.error('No downloadable files found for the selected items.');
				setIsBulkDownloading(false);
				return;
			}

			console.log(`Attempting to fetch and zip ${finalUrls.length} files:`, finalUrls);
			toast.info(`Fetching ${finalUrls.length} files to create a zip archive...`);

			// 3. Fetch files and create ZIP
			const zip = new JSZip();
			let filesAdded = 0;
			let fetchErrors = 0;

			// Use Promise.allSettled to fetch all files concurrently
			const fetchPromises = finalUrls.map(async (url, index) => {
				try {
					// IMPORTANT: Fetching requires the server hosting the mediaUrl
					// to have permissive CORS headers (e.g., Access-Control-Allow-Origin: *)
					// or be on the same origin. If not, this fetch will fail.
					// Consider using a backend proxy if CORS is an issue.
					const response = await fetch(url);
					if (!response.ok) {
						// Handle potential XML error responses like NoSuchKey
						if (response.headers.get('content-type')?.includes('application/xml')) {
							const errorText = await response.text();
							console.error(`XML Error fetching URL #${index + 1} (${url}): Status ${response.status}`, errorText);
							// Try to extract a meaningful message from XML if possible
							const keyMatch = errorText.match(/<Key>(.*?)<\/Key>/);
							const messageMatch = errorText.match(/<Message>(.*?)<\/Message>/);
							const simpleFilename = url.substring(url.lastIndexOf('/') + 1).split('?')[0] || `file_${index + 1}`;
							toast.error(`Error fetching ${keyMatch ? keyMatch[1] : simpleFilename}: ${messageMatch ? messageMatch[1] : `HTTP ${response.status}`}`);
						} else {
							console.error(`HTTP Error fetching URL #${index + 1} (${url}): Status ${response.status}`);
							toast.error(`Failed to fetch file #${index + 1} (HTTP ${response.status})`);
						}
						throw new Error(`HTTP error ${response.status}`);
					}
					const blob = await response.blob();
					// Extract filename from URL, remove query params
					const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0] || `download_${index + 1}`;
					zip.file(filename, blob);
					return { status: 'fulfilled', index };
				} catch (error) {
					console.error(`Error fetching or adding file #${index + 1} (${url}):`, error);
					// Toast error already handled inside the try block for HTTP errors
					if (!(error instanceof Error && error.message.startsWith('HTTP error'))) {
						toast.error(`Failed to process file #${index + 1}.`);
					}
					return { status: 'rejected', index, reason: error };
				}
			});

			const results = await Promise.allSettled(fetchPromises);

			results.forEach(result => {
				if (result.status === 'fulfilled') {
					filesAdded++;
				} else {
					fetchErrors++;
				}
			});

			if (filesAdded === 0) {
				toast.error('Failed to fetch any files. Cannot create zip archive.');
				setIsBulkDownloading(false);
				return;
			}

			if (fetchErrors > 0) {
				toast.warning(`Could not fetch ${fetchErrors} out of ${finalUrls.length} files. Proceeding with the rest.`);
			}

			// 4. Generate and trigger ZIP download
			toast.info(`Generating zip file with ${filesAdded} items...`);
			try {
				const zipBlob = await zip.generateAsync({
					type: 'blob',
					compression: 'DEFLATE', // Optional: specify compression
					compressionOptions: {
						level: 6 // Optional: compression level (1-9)
					}
				});
				saveAs(zipBlob, `airplay-download-${Date.now()}.zip`); // Use file-saver
				toast.success(`Successfully created zip file with ${filesAdded} items. Download started.`);
			} catch (zipError) {
				console.error('Error generating zip file:', zipError);
				toast.error('Failed to create the zip file.');
			}
		} catch (error) {
			console.error('Error during bulk download process:', error);
			toast.error('An unexpected error occurred during the download process.');
		} finally {
			setIsBulkDownloading(false); // Ensure loading state is reset
		}
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
					const validTab = newTab === 'tracks' ? 'tracks' : 'releases';
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
