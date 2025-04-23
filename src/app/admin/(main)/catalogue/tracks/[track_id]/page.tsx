'use client';

import React from 'react';
import { Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import { Input, PreviousPageButton, SelectSimple, Textarea } from '@/components/ui';
import { TRUE_OR_FALSE_OPTIONS } from '@/constants';
import { useGetMedia } from '../../api/getOneMedia';
import { LoadingBox } from '@/components/ui/LoadingBox';
import moment from 'moment';
import { useDownloadMedia } from '../../api/getDownloadMedia';

const TrackDetails: React.FC = () => {
	const { track_id } = useParams<{ track_id: string }>();
	console.log(track_id);

	const {
		data: contract,
		isLoading: contractLoading
		// error: contractError
	} = useGetMedia({
		mediaId: track_id
	});

	const { mutate, isPending } = useDownloadMedia();

	const handleDownloadMedia = () => {
		mutate([contract?.mediaUrl], {
			onSuccess: data => {
				const url = window.URL.createObjectURL(data);
				const link = document.createElement('a');
				link.href = url;
				link.download = `${contract?.title}.mp4`; // Adjust filename as needed
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			},
			onError: error => console.error('Download failed:', error)
		});
	};

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			<div className="flex justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Track Details</h1>
				<div className="flex items-center space-x-2">
					<Button variant="outline" className="bg-secondary text-foreground border-border">
						<Trash2 size={16} className="mr-2" />
						<span>Delete</span>
					</Button>
					{/* <Button variant="outline" className="bg-secondary text-foreground border-border">
						<Copy size={16} className="mr-2" />
						<span>Copy</span>
					</Button> */}
					{/* <Button variant="outline" className="bg-secondary text-foreground border-border">
						<Download size={16} className="mr-2" />
						<span>Download</span>
					</Button> */}
					<Button className="admin-button-primary" disabled={isPending} onClick={() => handleDownloadMedia()}>
						<Download size={16} className="mr-2" />
						<span>Download</span>
					</Button>
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
														<Checkbox id={instrument} />
														<label htmlFor={instrument} className="text-sm">
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
								value={true}
								labelKey="name"
								valueKey="value"
								placeholder="Select an option"
								onChange={() => {
									//
								}}
							/>
							<Input label="Universal product code(UPC) and ISRC(international standard recording code)" value="E4671572" />
							<Input label="Release Version" value="Pop" />
							<Input label="Copyright" value="26 February 2025" />

							<Input label="Copyright" value="26 February 2025" />
						</div>

						<Textarea label="Lyrics (Paste in lyrics box)" value="This Is A Beautiful Song" className="min-h-[300px]" />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TrackDetails;
