'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation'; // Added useRouter
import TracksList from '../../misc/components/TracksList';
import { PreviousPageButton, Button } from '@/components/ui'; // Added Button
import { useGetAlbumDetail } from '../../api/getAlbumDetail';
import { useDeleteAlbum } from '../../api/deleteAlbum'; // Added useDeleteAlbum
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const ReleaseDetails: React.FC = () => {
	const { release_id } = useParams<{ release_id: string }>();
	const router = useRouter(); // Added router instance

	const {
		data: album,
		isLoading: albumLoading
		// error: albumError,
	} = useGetAlbumDetail({
		albumId: release_id
	});

	// Corrected: useDeleteAlbum likely doesn't take callbacks directly
	const { mutate, isPending: isDeleting } = useDeleteAlbum(); // Changed isLoading to isPending

	const handleDelete = () => {
		// TODO: Implement a more robust confirmation dialog (e.g., using a modal component)
		if (window.confirm('Are you sure you want to delete this album? This action cannot be undone.')) {
			// Corrected: Pass callbacks to mutate
			mutate(
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
						toast.error('Error deleting album');
					}
				}
			);
		}
	};

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<div className="flex items-center">
					{' '}
					{/* Group title and button */}
					<h1 className="text-xl md:text-2xl font-semibold">Album: {albumLoading ? '-' : album?.title}</h1>
				</div>
				<div className="flex items-center">
					<span className="text-sm text-admin-muted mr-2">Artist:</span>
					<span> {albumLoading ? '-' : album?.artistName}</span>
				</div>
			</div>

			<div className="w-full">
				<Button
					variant="outline"
					onClick={handleDelete}
					disabled={isDeleting || albumLoading || !album} // Use isPending here
					size="sm"
					className="ml-auto "
				>
					<Trash2 size={16} className="mr-2" />
					{isDeleting ? 'Deleting...' : 'Delete '} {/* Use isPending here */}
				</Button>
			</div>

			<TracksList albumId={release_id || '1'} />
		</div>
	);
};

export default ReleaseDetails;
