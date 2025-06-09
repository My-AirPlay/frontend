/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useCallback } from 'react'; // Added useState, useCallback
import { useParams, useRouter } from 'next/navigation';
import TracksList from '../../misc/components/TracksList';
import { PreviousPageButton, Button } from '@/components/ui';
import { useGetAlbumDetail } from '../../api/getAlbumDetail';
import { useDeleteAlbum } from '../../api/deleteAlbum';
// import { useDownloadMedia } from '../../api/getDownloadMedia'; // REMOVED - Using JSZip
import JSZip from 'jszip'; // Import JSZip
import { saveAs } from 'file-saver'; // Import file-saver
import { toast } from 'sonner';
import { Trash2, Download, Loader2 } from 'lucide-react';

// Helper function for delay - REMOVED
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ReleaseDetails: React.FC = () => {
	const { release_id } = useParams<{ release_id: string }>();
	const router = useRouter();

	const {
		data: album,
		isLoading: albumLoading
		// error: albumError,
	} = useGetAlbumDetail({
		albumId: release_id
	});

	// State for selection and download
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // Store selected row data
	const [isBulkDownloading, setIsBulkDownloading] = useState(false); // Loading state for bulk download

	// Hook for triggering download URL generation - REMOVED
	// const { mutate: downloadMutate, isPending: isGeneratingDownloadUrls } = useDownloadMedia();

	// Delete mutation
	const { mutate: deleteMutate, isPending: isDeleting } = useDeleteAlbum();

	// Callback for DataTable selection change
	const handleSelectionChange = useCallback((selectedData: any[]) => {
		setSelectedRows(selectedData);
	}, []);

	const handleDelete = () => {
		// TODO: Implement a more robust confirmation dialog (e.g., using a modal component)
		if (window.confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
			deleteMutate(
				{ albumId: release_id },
				{
					onSuccess: () => {
						console.log('Album deleted successfully');
						toast.success('Album deleted successfully');
						router.push('/admin/catalogue'); // Redirect after successful deletion
					},
					onError: (error: Error) => {
						// Added Error type
						console.error('Error deleting album:', error.message);
						toast.error('Error deleting album: ' + error.message); // Show error message
					}
				}
			);
		}
	};

	// Function to handle the bulk download logic using JSZip
	const handleBulkDownload = async () => {
		if (selectedRows.length === 0) {
			toast.info('Please select tracks to download.');
			return;
		}

		setIsBulkDownloading(true);
		toast.info('Preparing files for download...');
		const urlsToCollect: string[] = [];

		try {
			// 1. Collect Media URLs from selected rows
			selectedRows.forEach(row => {
				if (typeof row.mediaUrl === 'string' && row.mediaUrl.trim() !== '') {
					urlsToCollect.push(row.mediaUrl);
				} else {
					console.warn('Selected track row missing or has invalid mediaUrl:', row);
					toast.warning(`Skipping track "${row.title || 'Unknown'}" due to missing download URL.`);
				}
			});

			const finalUrls = [...new Set(urlsToCollect)]; // Ensure unique URLs

			if (finalUrls.length === 0) {
				toast.error('No downloadable files found for the selected tracks.');
				setIsBulkDownloading(false);
				return;
			}

			console.log(`Attempting to fetch and zip ${finalUrls.length} files:`, finalUrls);
			toast.info(`Fetching ${finalUrls.length} files to create a zip archive...`);

			// 2. Fetch files and create ZIP
			const zip = new JSZip();
			let filesAdded = 0;
			let fetchErrors = 0;

			// Use Promise.allSettled to fetch all files concurrently
			const fetchPromises = finalUrls.map(async (url, index) => {
				try {
					// IMPORTANT: Fetching requires the server hosting the mediaUrl
					// to have permissive CORS headers (e.g., Access-Control-Allow-Origin: *)
					// or be on the same origin. If not, this fetch will fail.
					const response = await fetch(url);
					if (!response.ok) {
						// Handle potential XML error responses like NoSuchKey
						if (response.headers.get('content-type')?.includes('application/xml')) {
							const errorText = await response.text();
							console.error(`XML Error fetching URL #${index + 1} (${url}): Status ${response.status}`, errorText);
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
					const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0] || `download_${index + 1}`;
					zip.file(filename, blob);
					return { status: 'fulfilled', index };
				} catch (error) {
					console.error(`Error fetching or adding file #${index + 1} (${url}):`, error);
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

			// 3. Generate and trigger ZIP download
			toast.info(`Generating zip file with ${filesAdded} items...`);
			try {
				const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
				// Use album title in filename if available, otherwise use release_id
				const zipFilename = album?.title ? `airplay-${album.title.replace(/[^a-z0-9]/gi, '_')}-download.zip` : `airplay-release-${release_id}-download.zip`;
				saveAs(zipBlob, zipFilename);
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

	return (
		<div className="space-y-6">
			<PreviousPageButton target={'/admin/catalogue?page=1&limit=20&sortBy=title&sortOrder=desc&tab=releases'} />

			{/* Header Section */}
			<div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
				{/* Left Side: Title and Artist */}
				<div className="flex-grow">
					<h1 className="text-xl md:text-2xl font-semibold mb-1">Album: {albumLoading ? 'Loading...' : album?.title || 'N/A'}</h1>
					<div className="text-sm text-muted-foreground">
						<span className="font-medium">Artist:</span> {albumLoading ? '...' : album?.artistName || 'N/A'}
					</div>
				</div>

				{/* Right Side: Action Buttons */}
				<div className="flex items-center space-x-2 flex-shrink-0">
					{/* Download Button - Updated */}
					<Button className="admin-button-primary" onClick={handleBulkDownload} disabled={selectedRows.length === 0 || isBulkDownloading || albumLoading} size="sm">
						{isBulkDownloading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
						{isBulkDownloading ? 'Zipping...' : `Download`}
					</Button>

					{/* Delete Button */}
					<Button variant="outline" className="bg-secondary text-foreground border-border" onClick={handleDelete} disabled={isDeleting || albumLoading || !album}>
						<Trash2 size={16} className="mr-2" />
						{isDeleting ? 'Deleting...' : 'Delete'}
					</Button>
				</div>
			</div>

			{/* Tracks List */}
			<TracksList albumId={release_id || '1'} onRowSelectionChange={handleSelectionChange} />
		</div>
	);
};

export default ReleaseDetails;
