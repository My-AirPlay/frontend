'use client';
import React, { useState } from 'react';
// import { Save } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button, PreviousPageButton } from '@/components/ui';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArtistAnalytics, ArtistOverview, ArtistContract } from '../../misc/components';
import { useDeleteArtist, useGetOneArtist, usePauseDistribution, useResumeDistribution } from '../../../catalogue/api/getOneArtist';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Delete } from 'lucide-react';

const ArtistDetails: React.FC = () => {
	const { section, artist_id } = useParams<{ artist_id: string; section: string }>();
	const { data: artist, isLoading: artistLoading, refetch: artistRefetch } = useGetOneArtist({ artistId: artist_id });
	const { mutate: deleteArtist, isPending: isDeleting } = useDeleteArtist();
	const [showPauseModal, setShowPauseModal] = useState(false);
	const [pauseReason, setPauseReason] = useState('');
	const { mutate: pauseDistribution, isPending: isPausing } = usePauseDistribution();
	const { mutate: resumeDistribution, isPending: isResuming } = useResumeDistribution();

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this artist? This action cannot be undone.')) {
			deleteArtist(artist_id);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between">
				<PreviousPageButton />
				<Button variant="destructive" className="flex items-center gap-2" onClick={handleDelete} isLoading={isDeleting} disabled={isDeleting}>
					<Delete size={16} />
					Delete Artist
				</Button>
			</div>

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Artist Details</h1>
				<div className="flex items-center space-x-2">
					{/* <Button variant="outline" className="max-md:size-10 max-md:p-0">
						<Trash2 size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Delete</span>
					</Button> */}
					{/* <Button variant="outline" className="max-md:size-10 max-md:p-0">
						<Pencil size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Edit</span>
					</Button> */}
					{/* <Button className="max-md:size-10 max-md:p-0">
						<Save size={16} className="md:mr-2" />
						<span className="max-md:sr-only">Save</span>
					</Button> */}
				</div>
			</div>

			{/* Distribution Status */}
			{artist && (
				<div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">Distribution:</span>
						{artist.distributionStatus === 'paused' ? <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">Paused</span> : <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">Active</span>}
					</div>
					{artist.distributionStatus === 'paused' ? (
						<div className="flex items-center gap-4 ml-auto">
							<div className="text-sm text-muted-foreground">
								<span>Reason: {artist.distributionPauseReason || 'N/A'}</span>
								{artist.distributionPausedAt && <span className="ml-3">Since: {new Date(artist.distributionPausedAt).toLocaleDateString()}</span>}
							</div>
							<Button variant="outline" size="sm" onClick={() => resumeDistribution(artist_id, { onSuccess: () => artistRefetch() })} disabled={isResuming}>
								{isResuming ? 'Resuming...' : 'Resume Distribution'}
							</Button>
						</div>
					) : (
						<Button variant="outline" size="sm" className="ml-auto text-red-400 hover:text-red-300" onClick={() => setShowPauseModal(true)}>
							Pause Distribution
						</Button>
					)}
				</div>
			)}

			<Tabs defaultValue={section || 'overview'} value={section}>
				<TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
					<Link href={`./overview`} replace>
						<TabsTrigger value="overview" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
							Overview
						</TabsTrigger>
					</Link>

					<Link href={`./contract`} replace>
						<TabsTrigger value="contract" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
							Contract
						</TabsTrigger>
					</Link>
					<Link href={`./analytics`} replace>
						<TabsTrigger value="analytics" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
							Analytics
						</TabsTrigger>
					</Link>
				</TabsList>

				{artistLoading ? (
					<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
						<LoadingBox size={62} />
					</div>
				) : (
					<>
						<TabsContent value="overview" className="mt-0">
							<ArtistOverview artist={artist} artistRefetch={artistRefetch} />
						</TabsContent>

						<TabsContent value="contract" className="mt-0">
							<ArtistContract artist={artist} artistRefetch={artistRefetch} />
						</TabsContent>

						<TabsContent value="analytics" className="mt-0">
							<ArtistAnalytics />
						</TabsContent>
					</>
				)}
			</Tabs>
			{/* Pause Distribution Modal */}
			{showPauseModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowPauseModal(false)}>
					<div className="bg-card rounded-lg p-6 max-w-md w-full mx-4 space-y-4" onClick={e => e.stopPropagation()}>
						<h3 className="text-lg font-semibold">Pause Distribution</h3>
						<p className="text-sm text-muted-foreground">This will prevent the artist from uploading new content. They will be notified via email.</p>
						<textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm min-h-[100px] resize-none" placeholder="Enter reason for pausing..." value={pauseReason} onChange={e => setPauseReason(e.target.value)} />
						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									setShowPauseModal(false);
									setPauseReason('');
								}}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								size="sm"
								disabled={!pauseReason.trim() || isPausing}
								onClick={() => {
									pauseDistribution(
										{ artistId: artist_id, reason: pauseReason.trim() },
										{
											onSuccess: () => {
												setShowPauseModal(false);
												setPauseReason('');
												artistRefetch();
											}
										}
									);
								}}
							>
								{isPausing ? 'Pausing...' : 'Confirm Pause'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ArtistDetails;
