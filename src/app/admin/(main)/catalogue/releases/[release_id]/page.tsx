'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import TracksList from '../../misc/components/TracksList';
import { PreviousPageButton } from '@/components/ui';
import { useGetAlbumDetail } from '../../api/getAlbumDetail';

const ReleaseDetails: React.FC = () => {
	const { release_id } = useParams<{ release_id: string }>();

	const {
		data: album,
		isLoading: albumLoading
		// error: albumError,
	} = useGetAlbumDetail({
		albumId: release_id
	});

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Album: {albumLoading ? '-' : album?.title}</h1>
				<div className="flex items-center">
					<span className="text-sm text-admin-muted mr-2">Artist:</span>
					<span> {albumLoading ? '-' : album?.artistName}</span>
				</div>
			</div>

			<TracksList albumId={release_id || '1'} album={album} />
		</div>
	);
};

export default ReleaseDetails;
