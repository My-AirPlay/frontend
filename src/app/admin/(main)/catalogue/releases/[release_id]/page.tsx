/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useCallback } from 'react'; // Added useState, useCallback
import { useParams, useRouter } from 'next/navigation';
import TracksList from '../../misc/components/TracksList';
import { PreviousPageButton, Button } from '@/components/ui';
import { useGetAlbumDetail } from '../../api/getAlbumDetail';
import { useDeleteAlbum } from '../../api/deleteAlbum';
import { useDownloadMedia } from '../../api/getDownloadMedia'; // Import download hook
import { toast } from 'sonner';
import { Trash2, Download, Loader2 } from 'lucide-react';

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

	// Hook for triggering download URL generation
	const { mutate: downloadMutate, isPending: isGeneratingDownloadUrls } = useDownloadMedia();

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

	// Function to handle the bulk download logic for tracks within this release
	const handleBulkDownload = async () => {
		if (selectedRows.length === 0) {
			toast.info('Please select tracks to download.');
			return;
		}

		setIsBulkDownloading(true);
		const urlsToCollect: string[] = [];

		try {
			// Collect mediaUrl from selected rows
			selectedRows.forEach(row => {
				if (typeof row.mediaUrl === 'string' && row.mediaUrl.trim() !== '') {
					urlsToCollect.push(row.mediaUrl);
				} else {
					console.warn('Selected track row missing or has invalid mediaUrl:', row);
					toast.warning(`Skipping track "${row.title || 'Unknown'}" due to missing download URL.`);
				}
			});

			const finalUrls = [...new Set(urlsToCollect)]; // Ensure final list is unique

			if (finalUrls.length === 0) {
				toast.error('No downloadable media URLs found for the selected tracks.');
				setIsBulkDownloading(false);
				return;
			}

			console.log(`Collected ${finalUrls.length} unique media URLs to request download links for:`, finalUrls);
			toast.info(`Preparing download links for ${finalUrls.length} tracks...`);

			// Use the download hook to get signed URLs
			downloadMutate(
				{ urls: finalUrls },
				{
					onSuccess: async data => {
						const response = data as { downloadUrls: string[] };
						console.log(`Received ${response?.downloadUrls?.length || 0} signed download URLs from backend:`, response?.downloadUrls);

						if (!response?.downloadUrls?.length) {
							toast.error('Failed to generate download links.');
							return;
						}

						toast.success(`Generated ${response.downloadUrls.length} download links. Initiating downloads...`);

						let downloadsInitiated = 0;
						for (const [index, url] of response.downloadUrls.entries()) {
							try {
								const link = document.createElement('a');
								link.href = url;
								console.log(`Attempting to trigger download for URL #${index + 1}: ${url}`);
								const simpleFilename = url.substring(url.lastIndexOf('/') + 1).split('?')[0] || `download_${index + 1}`;
								link.download = simpleFilename;
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
								downloadsInitiated++;
								await delay(300); // Delay between downloads
							} catch (error) {
								console.error(`Error trying to initiate download for URL #${index + 1} (${url}):`, error);
								toast.error(`Failed to initiate download for track #${index + 1}.`);
							}
						}

						if (downloadsInitiated < response.downloadUrls.length) {
							toast.warning(`Attempted to initiate ${response.downloadUrls.length} downloads, but some may have been blocked. Check your browser settings.`, { duration: 10000 });
						} else if (downloadsInitiated > 0) {
							toast.info(`Initiated ${downloadsInitiated} downloads. Check your browser's download manager.`, { duration: 5000 });
						}
					},
					onError: error => {
						console.error('Failed to generate download URLs:', error);
						toast.error('Error generating download links.');
					},
					onSettled: () => {
						setIsBulkDownloading(false); // Ensure loading state is reset
					}
				}
			);
		} catch (error) {
			console.error('Error during bulk download preparation:', error);
			toast.error('An unexpected error occurred during download preparation.');
			setIsBulkDownloading(false); // Ensure loading state is reset on unexpected error
		}
	};

	return (
		<div className="space-y-6">
			<PreviousPageButton />

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
					{/* Download Button */}
					<Button variant="outline" onClick={handleBulkDownload} disabled={selectedRows.length === 0 || isBulkDownloading || isGeneratingDownloadUrls || albumLoading} size="sm" className="bg-secondary text-foreground border-border">
						{isBulkDownloading || isGeneratingDownloadUrls ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
						{isBulkDownloading || isGeneratingDownloadUrls ? 'Downloading...' : 'Download'}
					</Button>

					{/* Delete Button */}
					<Button
						variant="destructive" // Changed variant for delete
						onClick={handleDelete}
						disabled={isDeleting || albumLoading || !album}
						size="sm"
					>
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
