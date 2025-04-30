'use client';

import React from 'react'; // Removed useState import
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
import { useDownloadMedia } from '../../api/getDownloadMedia';
import { toast } from 'sonner';
import { useDeleteMedia } from '../../api/deleteMedia';

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const TrackDetails: React.FC = () => {
	const { track_id } = useParams<{ track_id: string }>();
	const router = useRouter();
	// Removed testLinkUrl state

	const {
		data: contract,
		isLoading: contractLoading
		// error: contractError
	} = useGetMedia({
		mediaId: track_id
	});

	const { mutate, isPending } = useDownloadMedia();
	const { mutate: deleteMutate, isPending: deletePending } = useDeleteMedia();

	const handleDownloadMedia = () => {
		// Determine the list of URLs to download
		let urlsToDownload: string[] = [];
		if (Array.isArray(contract?.mediaUrls) && contract.mediaUrls.length > 0) {
			urlsToDownload = contract.mediaUrls;
		} else if (Array.isArray(contract?.mediaUrl) && contract.mediaUrl.length > 0) {
			// Handle case where mediaUrl itself might be an array (less common)
			urlsToDownload = contract.mediaUrl;
		} else if (typeof contract?.mediaUrl === 'string' && contract.mediaUrl) {
			// Handle case where mediaUrl is a single string
			urlsToDownload = [contract.mediaUrl];
		}

		if (urlsToDownload.length === 0) {
			toast.error('No media URLs found for this track.');
			return;
		}

		mutate(
			{ urls: urlsToDownload },
			{
				onSuccess: async data => {
					try {
						const response = data as { downloadUrls: string[] };
						if (!response?.downloadUrls?.length) {
							toast.error('No download URLs received');
							// Removed setTestLinkUrl(null) call
							return;
						}

						// Removed test link logic

						toast.success(`Generated ${response.downloadUrls.length} download links. Initiating downloads...`);

						// Click a download link for each URL sequentially with a delay
						for (const [index, url] of response.downloadUrls.entries()) {
							try {
								const link = document.createElement('a');
								link.href = url;
								const simpleFilename = url.substring(url.lastIndexOf('/') + 1).split('?')[0] || `download_${index + 1}`;
								link.download = simpleFilename;
								// No target="_blank"
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
								// Add delay
								await delay(200);
							} catch (error) {
								console.error(`Error trying to initiate download for URL ${url}:`, error);
								toast.error(`Failed to initiate download for one of the files.`);
							}
						}
						toast.info("Downloads initiated. Check your browser's download manager.", { duration: 5000 });
					} catch (error) {
						console.error('Error processing download URLs:', error);
						toast.error('Error initiating media downloads');
					}
				},
				onError: error => {
					console.error('Failed to fetch download URLs:', error);
					toast.error('Error fetching media URLs');
				}
			}
		);
	}; // End of handleDownloadMedia

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
					<Button className="admin-button-primary" disabled={isPending} onClick={handleDownloadMedia}>
						{' '}
						{/* Corrected onClick handler */}
						<Download size={16} className="mr-2" />
						{isPending ? <LoadingBox size={16} color="white" /> : <span>Download</span>}
					</Button>
					{/* Removed test link button */}
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
