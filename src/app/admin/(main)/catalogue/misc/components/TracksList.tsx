import React, { useCallback } from 'react'; // Import useCallback
import Link from 'next/link';
import { DataTable } from '@/components/ui';
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

	console.log('album', album, albumId);
	// const tracks = [
	// 	{ id: 1, title: 'One Chance', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
	// 	{ id: 2, title: 'My Party Mix 1', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
	// 	{ id: 3, title: 'My Party Mix 2', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
	// 	{ id: 4, title: 'My Party Mix 3', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
	// 	{ id: 5, title: 'My Party Mix 4', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' }
	// ];
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
