'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useUploadAlbum } from '../api';
import { useAlbumUploadStore } from '../store';
import useBooleanStateControl from '@/hooks/useBooleanStateControl';
import { CustomAlertDialog } from '@/components/ui';
import { PlatformImage } from './Step4MediaDistributionPlatformCards';

export default function Step5AlbumPreview() {
	const { state: isUploadStatusModalOpen, setTrue: openUploadStatusModal, setFalse: closeUploadStatusModal, setState: setUploadStatusModalOpen } = useBooleanStateControl();
	const router = useRouter();

	const { albumInfo, coverArtId, setCurrentStep, albumType, streamingPlatforms, albumTracks, mediaFileIds, getCoverArtFile, getMediaFile, isDBInitialized, initializeDB, clearStore } = useAlbumUploadStore();

	const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
	const [mediaFiles, setMediaFiles] = useState<File[]>([]);
	const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
	const isAlbumType = albumType === 'Album' || albumType === 'ExtendedPlaylist' || albumType === 'MixTape';

	useEffect(() => {
		const loadFiles = async () => {
			if (!isDBInitialized) {
				await initializeDB();
			}
			if (isDBInitialized) {
				if (coverArtId) {
					const file = await getCoverArtFile();
					if (file) {
						setCoverArtFile(file);
						setCoverArtPreview(URL.createObjectURL(file));
					}
				}

				if (mediaFileIds.length > 0) {
					const files: File[] = [];
					for (const id of mediaFileIds) {
						const file = await getMediaFile(id);
						if (file) {
							files.push(file);
						}
					}
					setMediaFiles(files);
				}
			}
		};

		loadFiles();
	}, [coverArtId, mediaFileIds, getCoverArtFile, getMediaFile, isDBInitialized, initializeDB]);

	useEffect(() => {
		return () => {
			if (coverArtPreview) {
				URL.revokeObjectURL(coverArtPreview);
			}
		};
	}, [coverArtPreview]);

	const handleBack = () => {
		setCurrentStep('distribution');
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	};

	const { mutate, isPending, status } = useUploadAlbum();

	const handleSubmit = async () => {
		try {
			if (!coverArtFile || mediaFiles.length === 0 || albumTracks.length === 0) {
				toast.error('Missing required data', {
					description: 'Please make sure you have uploaded a cover art and at least one track.'
				});
				return;
			}

			const albumPayload = {
				mediaFiles: mediaFiles,
				albumCover: coverArtFile,
				description: albumInfo.description,
				title: albumInfo.title,
				artistName: albumInfo.artistName,
				mainGenre: albumInfo.mainGenre,
				releaseDate: albumInfo.releaseDate,
				recordLabel: albumInfo.recordLabel || '',
				publisher: albumInfo.publisher,
				explicitContent: albumInfo.explicitContent || 'false',
				universalProductCode: albumInfo.universalProductCode,
				releaseVersion: albumInfo.releaseVersion,
				copyright: albumInfo.copyright,
				streamingPlatforms,
				media: albumTracks
			};

			mutate(albumPayload, {
				onSuccess: () => {
					toast.success('Upload successful', {
						description: `Your ${albumType?.toLowerCase()} has been uploaded successfully.`
					});
				},
				onError: error => {
					console.error('Upload failed:', error);
					toast.error('Upload failed', {
						description: 'There was an error uploading your content. Please try again.'
					});
				}
			});
		} catch (error) {
			console.error('Upload failed:', error);
			toast.error('Upload failed', {
				description: 'There was an error uploading your content. Please try again.'
			});
		} finally {
			openUploadStatusModal();
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="bg-card rounded-lg p-6">
				<h2 className="text-brand text-center text-xl font-semibold mb-2">{albumType?.toUpperCase()} UPLOAD</h2>
				<h1 className="text-white text-center text-2xl font-bold mb-8">Review Your {albumType} Details</h1>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-400">Title</p>
									<p className="font-medium">{albumInfo.title}</p>
								</div>
								<div>
									<p className="text-sm text-gray-400">Artist</p>
									<p className="font-medium">{albumInfo.artistName}</p>
								</div>
								<div>
									<p className="text-sm text-gray-400">Genre</p>
									<p className="font-medium">{albumInfo.mainGenre}</p>
								</div>
								<div>
									<p className="text-sm text-gray-400">Release Date</p>
									<p className="font-medium">{formatDate(albumInfo.releaseDate)}</p>
								</div>
								<div className="col-span-2">
									<p className="text-sm text-gray-400">Description</p>
									<p className="font-medium">{albumInfo.description}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Distribution Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-4">
								<p className="text-sm text-gray-400 mb-2">Streaming Platforms</p>
								<div className="flex flex-wrap gap-2">
									{streamingPlatforms.map((platform, index) => (
										// <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
										// 	{platform}
										// </span>
										<PlatformImage label={platform} key={index} isSelected />
									))}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-400">Publisher</p>
									<p className="font-medium">{albumInfo.publisher}</p>
								</div>
								{albumInfo.recordLabel && (
									<div>
										<p className="text-sm text-gray-400">Record Label</p>
										<p className="font-medium">{albumInfo.recordLabel}</p>
									</div>
								)}
								<div>
									<p className="text-sm text-gray-400">UPC</p>
									<p className="font-medium">{albumInfo.universalProductCode}</p>
								</div>
								<div>
									<p className="text-sm text-gray-400">Copyright</p>
									<p className="font-medium">{albumInfo.copyright}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{isAlbumType && albumTracks.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle>Tracks ({albumTracks.length})</CardTitle>
							</CardHeader>
							<CardContent>
								<ScrollArea className="h-[250px] pr-4">
									<div className="space-y-4">
										{albumTracks.map((track, index) => (
											<div key={index} className="p-3 bg-black/10 rounded-lg">
												<p className="font-medium">
													{index + 1}. {track.title}
												</p>
												<p className="text-sm text-gray-400">Artist: {track.artistName}</p>
												<p className="text-sm text-gray-400">Genre: {track.mainGenre}</p>
											</div>
										))}
									</div>
								</ScrollArea>
							</CardContent>
						</Card>
					)}

					<Card>
						<CardHeader>
							<CardTitle>Files</CardTitle>
						</CardHeader>
						<CardContent>
							<>
								<div className="mb-4">
									<p className="text-sm text-gray-400 mb-2">Cover Art</p>
									{coverArtFile && coverArtPreview && (
										<div className="flex items-center">
											<div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0 mr-3">
												<Image src={coverArtPreview || '/placeholder.svg'} alt="Cover" className="w-full h-full object-cover" fill />
											</div>
											<div>
												<p className="text-sm">{coverArtFile.name}</p>
												<p className="text-xs text-gray-400">{(coverArtFile.size / (1024 * 1024)).toFixed(2)} MB</p>
											</div>
										</div>
									)}
								</div>

								<div>
									<p className="text-sm text-gray-400 mb-2">Track Files ({mediaFiles.length})</p>
									<div className="space-y-2">
										{mediaFiles.slice(0, 3).map((file, index) => (
											<div key={index} className="flex items-center">
												<div className="w-6 h-6 bg-brand/10 rounded-full flex items-center justify-center mr-3">
													<span className="text-xs text-brand">{index + 1}</span>
												</div>
												<div>
													<p className="text-sm">{file.name}</p>
													<p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
												</div>
											</div>
										))}
										{mediaFiles.length > 3 && <p className="text-sm text-gray-400">+ {mediaFiles.length - 3} more tracks</p>}
									</div>
								</div>
							</>
						</CardContent>
					</Card>
				</div>

				<footer className="flex justify-between mt-8">
					<Button onClick={handleBack} variant="outline" disabled={isPending} size="lg">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back
					</Button>
					<Button onClick={handleSubmit} className="" disabled={isPending} size="lg">
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
							</>
						) : (
							<>
								<Upload className="mr-2 h-4 w-4" /> Upload {albumType}
							</>
						)}
					</Button>
				</footer>
			</div>

			<CustomAlertDialog
				variant={status === 'success' ? 'success' : 'error'}
				open={status != 'idle' && !isPending && isUploadStatusModalOpen}
				onOpenChange={setUploadStatusModalOpen}
				title={status === 'success' ? 'Upload Successful' : 'Upload Failed'}
				description={status === 'success' ? 'File upload completed successfully. Go to uploads to view uploaded content!' : 'There was an error uploading your content. Please try again.'}
				actionLabel={status === 'success' ? 'Go to Uploads' : 'Retry'}
				cancelLabel="Back to Submit"
				onAction={() => {
					if (status === 'success') {
						router.push('/artiste/catalog');
						clearStore();
						closeUploadStatusModal();
					} else {
						closeUploadStatusModal();
					}
				}}
				onCancel={() => {
					closeUploadStatusModal();
				}}
				showCancel={status !== 'success'}
				showAction={true}
			/>
		</div>
	);
}
