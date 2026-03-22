import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { DataTable, Button } from '@/components/ui';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import APIAxios from '@/utils/axios';
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
			header: '',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			cell: (info: any) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [isDownloading, setIsDownloading] = useState(false);
				const track = info.row.original;

				const handleDownload = async () => {
					if (!track?._id) {
						toast.error('Track not available for download.');
						return;
					}

					setIsDownloading(true);
					toast.info(`Preparing download for "${track.title}"...`);

					try {
						const safeTitle = (track.title || 'track').replace(/[^a-z0-9]/gi, '_');
						const response = await APIAxios.post(
							'/admin/download_media_zip',
							{
								mediaIds: [track._id],
								filename: `airplay-${safeTitle}.zip`
							},
							{ responseType: 'blob' }
						);

						const url = URL.createObjectURL(response.data);
						const a = document.createElement('a');
						a.href = url;
						a.download = `airplay-${safeTitle}.zip`;
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
						URL.revokeObjectURL(url);
						toast.success(`Download started for "${track.title}".`);
					} catch {
						toast.error('Failed to download track.');
					} finally {
						setIsDownloading(false);
					}
				};

				return (
					<Button variant="ghost" size="icon" disabled={isDownloading} title="Download Track" className="size-8" onClick={handleDownload}>
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
