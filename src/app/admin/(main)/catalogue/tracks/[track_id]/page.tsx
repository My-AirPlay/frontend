'use client';

import React, { useState } from 'react'; // Added useState import
import { Trash2, Download } from 'lucide-react'; // Removed LinkIcon import
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useRouter } from 'next/navigation';
import { Input, PreviousPageButton, SelectSimple, Textarea } from '@/components/ui';
import { TRUE_OR_FALSE_OPTIONS } from '@/constants';
import { useGetMedia } from '../../api/getOneMedia';
import { LoadingBox } from '@/components/ui/LoadingBox';
import moment from 'moment';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import APIAxios from '@/utils/axios';
import { useDeleteMedia } from '../../api/deleteMedia';

// Helper function for delay - REMOVED
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const TrackDetails: React.FC = () => {
	const { track_id } = useParams<{ track_id: string }>();
	const router = useRouter();
	const [isDownloading, setIsDownloading] = useState(false); // Add downloading state

	const {
		data: contract,
		isLoading: contractLoading
		// error: contractError
	} = useGetMedia({
		mediaId: track_id
	});

	// const { mutate, isPending } = useDownloadMedia(); // REMOVED
	const { mutate: deleteMutate, isPending: deletePending } = useDeleteMedia();

	const handleDownload = async () => {
		if (!contract?._id) {
			toast.error('Track not available for download.');
			return;
		}

		setIsDownloading(true);
		toast.info(`Preparing download for "${contract.title}"...`);

		try {
			const safeTitle = (contract.title || 'track').replace(/[^a-z0-9]/gi, '_');
			const response = await APIAxios.post(
				'/admin/download_media_zip',
				{
					mediaIds: [contract._id],
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
			toast.success(`Download started for "${contract.title}".`);
		} catch {
			toast.error('Failed to download track.');
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Track Details</h1>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="bg-secondary text-foreground border-border"
						disabled={deletePending}
						onClick={() =>
							deleteMutate(
								{ mediaId: track_id },
								{
									onSuccess() {
										toast.success('Album track deleted successfully');
										router.push(`/admin/catalogue`);
									},
									onError() {
										toast.error('Failed to delete album track');
									}
								}
							)
						}
					>
						<Trash2 size={16} className="mr-2" />
						{deletePending ? <LoadingBox size={16} color="white" /> : <span>Delete</span>}
					</Button>
					{/* <Button variant="outline" className="bg-secondary text-foreground border-border">
						<Copy size={16} className="mr-2" />
						<span>Copy</span>
					</Button> */}
					{/* <Button variant="outline" className="bg-secondary text-foreground border-border">
						<Download size={16} className="mr-2" />
						<span>Download</span>
					</Button> */}
					{/* --- Updated Download Button --- */}
					<Button className="admin-button-primary" disabled={contractLoading || isDownloading} onClick={handleDownload}>
						{isDownloading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Download size={16} className="mr-2" />}
						<span>{contractLoading ? 'Loading...' : isDownloading ? 'Downloading...' : 'Download'}</span>
					</Button>
					{/* --- End Updated Download Button --- */}
				</div>
			</div>

			<Tabs defaultValue="overview">
				<TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
					<TabsTrigger value="overview" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Overview
					</TabsTrigger>
					<TabsTrigger value="others" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
						Others
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="mt-0">
					{contractLoading ? (
						<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-6">
								<Input label="Song Title" value={contract?.title} />
								<Input label="Artist Name" value={contract?.artistName} />
								<Input label="Publisher (Artist Real Name)" value={contract?.publisher} />

								<Input label="Genre" value={contract?.mainGenre} />

								<Input label="Release Date" value={moment(contract?.releaseDate).format('DD MMM, YYYY')} />
							</div>

							<div className="space-y-6">
								<Input label="Record Label" value={contract?.recordLabel} />

								<div className="space-y-4">
									<label className="text-sm text-foreground font-medium block">Instrument Played</label>
									<div className="space-y-2">
										{contract?.instruments?.length > 0 ? (
											contract?.instruments?.map((instrument: string, i: number) => (
												<div className="" key={i}>
													<div className="flex items-center space-x-2">
														<Checkbox id={instrument} disabled />
														<label htmlFor={instrument} className="text-sm capitalize">
															{instrument}
														</label>
													</div>
												</div>
											))
										) : (
											<p className="text-sm text-white/70 text-center py-4">No Instrument on this track.</p>
										)}
									</div>
								</div>

								<Textarea label="Description/Notes" value={contract?.description} className="min-h-[120px]" />
							</div>
						</div>
					)}
				</TabsContent>

				<TabsContent value="others" className="mt-0">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<SelectSimple
								label="Explicit Content"
								options={TRUE_OR_FALSE_OPTIONS}
								value={contract?.explicitContent === 'Yes'}
								disabled
								labelKey="name"
								valueKey="value"
								placeholder="Select an option"
								onChange={() => {
									//
								}}
							/>
							<Input label="Universal product code(UPC) and ISRC(international standard recording code)" value={contract?.universalProductCode} />
							<Input label="Release Version" value={contract?.releaseVersion} />
							<Input label="Copyright" value={contract?.copyright} />

							<Input label="Copyright" value="26 February 2025" />
						</div>

						<Textarea label="Lyrics (Paste in lyrics box)" value={contract?.lyrics} className="min-h-[300px]" />
					</div>
				</TabsContent>
			</Tabs>
		</div> // Closing div for the main return
	); // Closing parenthesis for the return statement
}; // Closing brace for the TrackDetails component function

export default TrackDetails;
