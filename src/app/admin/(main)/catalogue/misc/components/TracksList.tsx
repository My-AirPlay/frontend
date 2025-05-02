import React, { useCallback, useState } from 'react'; // Import useState
import Link from 'next/link';
import { DataTable, Button } from '@/components/ui'; // Added Button import
import { Download, Loader2 } from 'lucide-react'; // Added Download icon import, Loader2
import JSZip from 'jszip'; // Import JSZip
import { saveAs } from 'file-saver'; // Import file-saver
import { toast } from 'sonner'; // Import toast
import { useGetAlbumDetail } from '../../api/getAlbumDetail';
import { LoadingBox } from '@/components/ui/LoadingBox';
import moment from 'moment';
// Removed unused RowSelectionState import

interface TracksListProps {
	albumId: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onRowSelectionChange?: (selectedData: any[]) => void; // Add optional selection handler prop
}

const TracksList: React.FC<TracksListProps> = ({ albumId, onRowSelectionChange }) => {
	const {
		data: album,
		isLoading: albumLoading
		// error: albumError,
	} = useGetAlbumDetail({
		albumId
	});

	const trackColumns = [
		{
			id: 'title',
			header: 'Title',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => (
				<Link href={`/admin/catalogue/tracks/${info.row.original._id}`} className="text-primary hover:underline">
					{info.row.original.title}
				</Link>
			)
		},
		{
			id: 'mainGenre',
			header: 'Genre',
			accessorKey: 'mainGenre'
		},
		{
			id: 'artistName',
			header: 'Artist',
			accessorKey: 'artistName'
		},
		{
			id: 'releaseDate',
			header: 'Release',
			accessorKey: 'releaseDate',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-primary ">{moment(info.row.original?.releaseDate).format('D MMM, YYYY')} </p>
		},
		{
			id: 'created',
			header: 'Created',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => <p className="text-primary ">{moment(info.row.original?.createdAt).format('D MMM, YYYY')} </p>
		},
		{
			id: 'actions',
			header: '', // No header text needed
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [isDownloading, setIsDownloading] = useState(false); // Local state for each button
				const track = info.row.original;
				const directDownloadUrl = typeof track?.mediaUrl === 'string' ? track.mediaUrl : null;
				const downloadFilename = directDownloadUrl ? directDownloadUrl.substring(directDownloadUrl.lastIndexOf('/') + 1).split('?')[0] || 'download' : 'download';

				const handleDownload = async () => {
					if (!directDownloadUrl) {
						toast.error('Download URL is not available for this track.');
						return;
					}
					if (!track?.title) {
						toast.error('Track title is missing, cannot name download file.');
						return;
					}

					setIsDownloading(true);
					toast.info(`Preparing download for "${track.title}"...`);

					const zip = new JSZip();
					let fileAdded = false;

					try {
						const url = directDownloadUrl;
						const response = await fetch(url);

						if (!response.ok) {
							if (response.headers.get('content-type')?.includes('application/xml')) {
								const errorText = await response.text();
								console.error(`XML Error fetching URL (${url}): Status ${response.status}`, errorText);
								const keyMatch = errorText.match(/<Key>(.*?)<\/Key>/);
								const messageMatch = errorText.match(/<Message>(.*?)<\/Message>/);
								toast.error(`Error fetching ${keyMatch ? keyMatch[1] : downloadFilename}: ${messageMatch ? messageMatch[1] : `HTTP ${response.status}`}`);
							} else {
								console.error(`HTTP Error fetching URL (${url}): Status ${response.status}`);
								toast.error(`Failed to fetch file (HTTP ${response.status})`);
							}
							throw new Error(`HTTP error ${response.status}`);
						}

						const blob = await response.blob();
						zip.file(downloadFilename, blob);
						fileAdded = true;

						if (!fileAdded) {
							toast.error('Failed to fetch the track file. Cannot create zip archive.');
							setIsDownloading(false);
							return; // Prevent empty zip download
						}

						toast.info(`Generating zip file...`);
						const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
						saveAs(zipBlob, `airplay-${track.title.replace(/[^a-z0-9]/gi, '_')}.zip`);
						toast.success(`Successfully created zip file for "${track.title}". Download started.`);
					} catch (error) {
						console.error('Error during single track download process:', error);
						if (!(error instanceof Error && error.message.startsWith('HTTP error'))) {
							toast.error('An unexpected error occurred during the download.');
						}
					} finally {
						setIsDownloading(false);
					}
				};

				return (
					<Button
						variant="ghost"
						size="icon"
						disabled={!directDownloadUrl || isDownloading}
						title={directDownloadUrl ? 'Download Track' : 'Download not available'}
						className="size-8"
						onClick={handleDownload} // Use the JSZip handler
					>
						{isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
					</Button>
				);
			}
		}
	];

	// Wrap the handler in useCallback to stabilize its reference
	const handleSelectionChange = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(selectedData: any[]) => {
			// DataTable passes the array of selected row data objects
			if (onRowSelectionChange) {
				onRowSelectionChange(selectedData); // Pass the data up to the parent
			}
		},
		[onRowSelectionChange] // Dependency: only recreate if the parent handler changes
	);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-medium">Tracks</h2>

			{albumLoading ? (
				<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<DataTable
					data={album?.fileIds || []}
					columns={trackColumns}
					showCheckbox={true}
					pagination={false}
					defaultRowsPerPage={50}
					onRowSelectionChange={handleSelectionChange} // Pass the handler
				/>
			)}
		</div>
	);
};

export default TracksList;
