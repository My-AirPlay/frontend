/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import type React from 'react';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Trash2, Music, Edit, AlertTriangle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectSimple, SelectTrigger, SelectValue } from '@/components/ui';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { Spinner } from '@/components/icons';
import { getFileSize } from '@/utils/numbers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useAlbumUploadStore } from '../store';
import type { AlbumTrackInfo } from '../store/album';
import { trackInfoSchema } from '../schema';
import SelectMultipleCombo from '@/components/ui/select-multiple-combobox';
import { streamingPlatformsList } from '@/utils/stores';

type TrackFormValues = z.infer<typeof trackInfoSchema>;

function TrackEditSheet({ isOpen, onClose, track, albumInfo, onSave, genreOptions, streamingPlatformOptions, isLoadingOptions }: { isOpen: boolean; onClose: () => void; track: AlbumTrackInfo | null; albumInfo: any; onSave: (data: TrackFormValues) => void; genreOptions: any[]; streamingPlatformOptions: { label: string; value: string }[]; isLoadingOptions: boolean }) {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [copyrightInputValue, setCopyrightInputValue] = useState<string>('');
	const [copyrightError, setCopyrightError] = useState('');
	const [sameAsAlbum, setSameAsAlbum] = useState<Record<string, boolean>>({
		artistName: true,
		mainGenre: true,
		releaseDate: true,
		recordLabel: true,
		publisher: true,
		copyright: true,
		streamingPlatforms: false
	});

	const form = useForm<TrackFormValues>({
		resolver: zodResolver(trackInfoSchema),
		defaultValues: track || {
			title: '',
			artistName: '',
			mainGenre: '',
			secondaryGenres: [],
			releaseDate: '',
			description: '',
			recordLabel: '',
			publisher: '',
			instruments: [],
			lyrics: '',
			explicitContent: 'No',
			universalProductCode: '',
			releaseVersion: '',
			copyright: '',
			fileType: 'audio',
			streamingPlatforms: streamingPlatformsList
		}
	});

	// Update form values when track changes
	useEffect(() => {
		if (track) {
			Object.keys(track).forEach(key => {
				form.setValue(key as any, track[key as keyof AlbumTrackInfo] as any);
			});

			// Set sameAsAlbum checkboxes
			setSameAsAlbum({
				artistName: track.artistName === albumInfo.artistName,
				mainGenre: track.mainGenre === albumInfo.mainGenre,
				releaseDate: track.releaseDate === albumInfo.releaseDate,
				recordLabel: track.recordLabel === albumInfo.recordLabel,
				publisher: track.publisher === albumInfo.publisher,
				copyright: track.copyright === albumInfo.copyright,
				streamingPlatforms: JSON.stringify(track.streamingPlatforms) === JSON.stringify(albumInfo.streamingPlatforms)
			});
		}
	}, [track, form, albumInfo]);

	const toggleSameAsAlbum = (field: string) => {
		const newValue = !sameAsAlbum[field];
		setSameAsAlbum(prev => ({
			...prev,
			[field]: newValue
		}));

		// If checked, copy the album value to the track
		if (newValue) {
			form.setValue(field as any, albumInfo[field] as any);
		}
	};

	const onSubmit = (data: TrackFormValues) => {
		onSave(data);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-lg overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Edit Track Details</SheetTitle>
					<SheetDescription>Update the information for this track. Check &quot;Same as album&quot; to use album values.</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="py-6 space-y-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Track Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="artistName"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Artist Name</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="sameArtist" checked={sameAsAlbum.artistName} onCheckedChange={() => toggleSameAsAlbum('artistName')} />
													<Label htmlFor="sameArtist" className="text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex-grow">
													<FormControl>
														<Input {...field} disabled={sameAsAlbum.artistName} />
													</FormControl>
													<FormMessage />
												</div>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="mainGenre"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Main Genre</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="sameGenre" checked={sameAsAlbum.mainGenre} onCheckedChange={() => toggleSameAsAlbum('mainGenre')} />
													<Label htmlFor="sameGenre" className="text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex-grow">
													<FormControl>
														<SelectSimple value={field.value} onChange={field.onChange} options={genreOptions} labelKey="label" valueKey="value" placeholder="Select" isLoadingOptions={isLoadingOptions} disabled={sameAsAlbum.mainGenre} />
													</FormControl>
													<FormMessage />
												</div>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="streamingPlatforms"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Streaming Platforms</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="samePlatforms" checked={sameAsAlbum.streamingPlatforms} onCheckedChange={() => toggleSameAsAlbum('streamingPlatforms')} />
													<Label htmlFor="samePlatforms" className="text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="">
												<FormControl>
													<SelectMultipleCombo name="streamingPlatforms" containerClass="max-w-full" onChange={field.onChange} options={streamingPlatformOptions} values={field.value} labelKey="label" valueKey="value" placeholder="Select multiple streaming platforms" isLoadingOptions={isLoadingOptions} disabled={sameAsAlbum.streamingPlatforms} />
												</FormControl>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormField
							control={form.control}
							name="lyrics"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Lyrics</FormLabel>
									<FormControl>
										<Textarea {...field} className="min-h-[100px]" placeholder="Enter lyrics here" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="releaseDate"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Release Date</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="sameDate" checked={sameAsAlbum.releaseDate} onCheckedChange={() => toggleSameAsAlbum('releaseDate')} />
													<Label htmlFor="sameDate" className="text-[0.7rem] md:text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="flex-grow">
												<FormControl>
													<Input type="date" value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={e => field.onChange(e.target.value)} disabled={sameAsAlbum.releaseDate} />
												</FormControl>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="recordLabel"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Record Label</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="sameLabel" checked={sameAsAlbum.recordLabel} onCheckedChange={() => toggleSameAsAlbum('recordLabel')} />
													<Label htmlFor="sameLabel" className="text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex-grow">
													<FormControl>
														<Input {...field} disabled={sameAsAlbum.recordLabel} />
													</FormControl>
													<FormMessage />
												</div>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="publisher"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center justify-between">
												<FormLabel>Publisher</FormLabel>
												<div className="flex items-center gap-2 ml-4">
													<Checkbox id="samePublisher" checked={sameAsAlbum.publisher} onCheckedChange={() => toggleSameAsAlbum('publisher')} />
													<Label htmlFor="samePublisher" className="text-[0.7rem] md:text-sm text-white/40">
														Same as album
													</Label>
												</div>
											</div>
											<div className="flex items-center justify-between">
												<div className="flex-grow">
													<FormControl>
														<Input {...field} disabled={sameAsAlbum.publisher} />
													</FormControl>
													<FormMessage />
												</div>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<FormField
							control={form.control}
							name="explicitContent"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Explicit Content</FormLabel>
									<FormControl>
										<SelectSimple
											value={field.value}
											onChange={field.onChange}
											options={[
												{ value: 'No', label: 'No' },
												{ value: 'Yes', label: 'Yes' }
											]}
											labelKey="label"
											valueKey="value"
											placeholder="Select"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="copyright"
									render={({ field }) => {
										const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i);

										const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
											const newValue = e.target.value;
											setCopyrightInputValue(newValue);

											if (!newValue.trim() && selectedYear) {
												setCopyrightError('Please enter copyright information, not just a year');
												field.onChange('');
											} else if (newValue.trim() && !selectedYear) {
												setCopyrightError('Please select a year');
												field.onChange('');
											} else {
												setCopyrightError('');
												field.onChange(newValue.trim() ? `${newValue.trim()} ${selectedYear}` : '');
											}
										};

										interface HandleYearChangeProps {
											year: string;
										}

										const handleYearChange = (year: HandleYearChangeProps['year']): void => {
											setSelectedYear(Number(year));

											if (!copyrightInputValue.trim() && year) {
												setCopyrightError('Please enter copyright information, not just a year');
												field.onChange('');
											} else {
												setCopyrightError('');
												field.onChange(copyrightInputValue.trim() ? `${year} ${copyrightInputValue.trim()}` : '');
											}
										};

										return (
											<FormItem className="w-full">
												<div className="flex items-center justify-between">
													<FormLabel>Copyright</FormLabel>
													<div className="flex items-center gap-2 ml-4">
														<Checkbox id="sameCopyright" checked={sameAsAlbum.copyright} onCheckedChange={() => toggleSameAsAlbum('copyright')} />
														<Label htmlFor="sameCopyright" className="text-[0.7rem] md:text-sm text-white/40">
															Same as album
														</Label>
													</div>
												</div>
												<div className="flex items-center justify-between">
													<div className="flex-grow">
														<div className="flex gap-2">
															<Select value={selectedYear.toString()} onValueChange={handleYearChange}>
																<SelectTrigger className={`w-32 bg-[#383838] text-foreground rounded-md border border-border  !p-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-white/50 transition-all ${!selectedYear ? 'border-red-500' : ''}`}>
																	<SelectValue placeholder="Year" />
																</SelectTrigger>
																<SelectContent>
																	{years.map((year: number) => (
																		<SelectItem key={year} value={year.toString()}>
																			{year}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
															<FormControl>
																<Input placeholder="Enter copyright information" hasError={!!copyrightError || !!form.formState.errors.copyright} errormessage={copyrightError || form.formState.errors.copyright?.message} value={copyrightInputValue} onChange={handleInputChange} className="flex-1" disabled={sameAsAlbum.copyright} />
															</FormControl>
														</div>
														<FormMessage />
													</div>
												</div>
											</FormItem>
										);
									}}
								/>
							</div>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} className="min-h-[100px]" placeholder="Enter track description" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="universalProductCode"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Universal Product Code (UPC)</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="releaseVersion"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Release Version</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<SheetFooter className="flex gap-4 pt-4">
							<Button variant="outline" onClick={onClose} type="button">
								Cancel
							</Button>
							<Button size="md" className="bg-primary hover:bg-primary" type="submit">
								Save Changes
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}

export default function TrackUpload() {
	const { formattedData, isLoading: isLoadingStaticAppInfo } = useStaticAppInfo();

	const { mediaFileIds, addTrack, removeTrack, setCurrentStep, albumTracks, updateTrack, removeMediaFile, albumInfo, getMediaFile, initializeDB, isDBInitialized } = useAlbumUploadStore();

	const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({
		...Object.fromEntries(mediaFileIds.map((_, index) => [index, 100]))
	});
	const [editingTrackIndex, setEditingTrackIndex] = useState<number | null>(null);
	const [editingTrack, setEditingTrack] = useState<AlbumTrackInfo | null>(null);
	const [fileDetails, setFileDetails] = useState<Record<string, { size: number }>>({});
	const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});

	const inputRef = useRef<HTMLInputElement>(null);

	// Initialize IndexedDB when component mounts
	useEffect(() => {
		if (!isDBInitialized) {
			initializeDB();
		}
	}, [initializeDB, isDBInitialized]);

	// Load file details for display
	useEffect(() => {
		const loadFileDetails = async () => {
			const details: Record<string, { size: number }> = {};

			for (let i = 0; i < albumTracks.length; i++) {
				const track = albumTracks[i];
				if (track.fileId) {
					const file = await getMediaFile(track.fileId);
					if (file) {
						details[track.fileId] = { size: file.size };
					}
				}
			}

			setFileDetails(details);
		};

		if (isDBInitialized && albumTracks.length > 0) {
			loadFileDetails();
		}
	}, [albumTracks, getMediaFile, isDBInitialized]);

	useEffect(() => {
		if (albumTracks.length > 0 && mediaFileIds.length === 0) {
			toast.info('All tracks have been removed. Please start the upload process again.');
		}
	}, [mediaFileIds.length, albumTracks.length]);

	const handleFilesSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files || files.length === 0) return;

		const validFiles: File[] = [];
		const invalidFiles: string[] = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file.type.includes('audio') || file.type.includes('video')) {
				validFiles.push(file);

				// Create a default track entry for this file
				const newTrack: AlbumTrackInfo = {
					title: file.name.replace(/\.(mp3|mp4|wav)$/i, ''),
					artistName: albumInfo.artistName,
					mainGenre: albumInfo.mainGenre,
					releaseDate: albumInfo.releaseDate,
					description: '',
					recordLabel: albumInfo.recordLabel,
					publisher: albumInfo.publisher,
					lyrics: '',
					explicitContent: 'No',
					universalProductCode: albumInfo.universalProductCode,
					releaseVersion: albumInfo.releaseVersion,
					copyright: albumInfo.copyright,
					fileType: file.type.includes('audio') ? 'audio' : 'video',
					streamingPlatforms: [...albumInfo.streamingPlatforms]
				};

				// Add track and file to IndexedDB
				await addTrack(newTrack, file);

				// Set editing state to the newly added track
				setEditingTrackIndex(albumTracks.length);
				setEditingTrack(newTrack);

				// Simulate upload progress
				const index = albumTracks.length;
				simulateUploadProgress(index);

				// Add file details
				setFileDetails(prev => ({
					...prev,
					[newTrack.id || '']: { size: file.size }
				}));
			} else {
				invalidFiles.push(file.name);
			}
		}

		if (invalidFiles.length > 0) {
			toast.error('Invalid files detected', {
				description: `The following files are not valid: ${invalidFiles.join(', ')}`
			});
		}

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const simulateUploadProgress = (index: number) => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 10;
			if (progress > 100) {
				progress = 100;
				clearInterval(interval);
			}
			setUploadProgress(prev => ({
				...prev,
				[index]: Math.floor(progress)
			}));
		}, 100);
	};

	const handleRemoveFile = async (index: number) => {
		const trackId = albumTracks[index]?.id;
		if (trackId) {
			await removeMediaFile(trackId);
			await removeTrack(index);

			setUploadProgress(prev => {
				const newProgress = { ...prev };
				delete newProgress[index];
				return newProgress;
			});

			// Remove file details
			setFileDetails(prev => {
				const newDetails = { ...prev };
				delete newDetails[trackId];
				return newDetails;
			});

			// Remove validation errors
			setValidationErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[index];
				return newErrors;
			});
		}
	};

	const handleClickUpload = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const validateAllTracks = async () => {
		let allValid = true;
		const errors: Record<number, string[]> = {};

		for (let i = 0; i < albumTracks.length; i++) {
			const track = albumTracks[i];

			try {
				// Validate each track against the schema
				await trackInfoSchema.parseAsync(track);
			} catch (error) {
				if (error instanceof z.ZodError) {
					allValid = false;
					errors[i] = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
				}
			}
		}

		setValidationErrors(errors);
		return { valid: allValid, errors };
	};

	const handleContinue = async () => {
		if (albumTracks.length === 0) {
			toast.warning('No files uploaded', {
				description: 'Please upload at least one track for your album.'
			});
			return;
		}

		const { valid } = await validateAllTracks();

		if (!valid) {
			toast.error('Validation errors', {
				description: 'Some tracks have invalid information. Please fix them before continuing.'
			});
			return;
		}

		setCurrentStep('coverArt');
	};

	const openEditTrack = (index: number) => {
		setEditingTrackIndex(index);
		setEditingTrack({ ...albumTracks[index] });
	};

	const closeEditTrack = () => {
		setEditingTrackIndex(null);
		setEditingTrack(null);
	};

	const saveTrackChanges = async (formData: z.infer<typeof trackInfoSchema>) => {
		if (editingTrackIndex !== null) {
			await updateTrack(editingTrackIndex, formData as AlbumTrackInfo);

			// Update validation errors
			const updatedErrors = { ...validationErrors };
			delete updatedErrors[editingTrackIndex];
			setValidationErrors(updatedErrors);

			closeEditTrack();
			toast.info('Track updated', {
				description: 'Your track details have been updated successfully.'
			});
		}
	};

	if (isLoadingStaticAppInfo) {
		return (
			<div className="flex items-center justify-center w-full h-full min-h-[40vh]">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="w-[80vw] sm:w-[65vw] max-w-[600px] md:max-w-3xl mx-auto mt-16">
			<section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
				<div className="border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center">
					<Music width={100} height={100} className="" style={{ opacity: 0.3, filter: 'grayscale(1)' }} />
				</div>
				<div className="flex flex-col items-start justify-center">
					<input type="file" className="hidden" ref={inputRef} onChange={handleFilesSelected} accept=".mp3,.mp4,.wav" multiple />

					<div className="mb-6 text-left">
						<h3 className="text-base font-semibold mb-4">Album upload requirements</h3>
						<ul className="text-[0.9rem] text-white/70 space-y-1.5 text-left">
							<li>• File format: MP3, MP4</li>
							<li>File size: Files size cannot be greater than 35 MB</li>
							<li>• Video mode: Best quality</li>
							<li>• Your track must not contain any logos, website address, release dates or advertisements of any kind.</li>
						</ul>
					</div>

					<Button onClick={handleClickUpload} size="lg" className="bg-primary hover:bg-primary text-white rounded-full px-8 mt-5">
						Browse
					</Button>
				</div>
			</section>

			{albumTracks.length > 0 && (
				<div className="mb-8">
					<div className="text-sm text-gray-400 mb-2">Uploading - {albumTracks.length} files</div>
					<div className="grid lg:grid-cols-2 gap-5 lg:gap-y-8">
						{albumTracks.map((track, index) => (
							<div key={index} className="flex flex-col p-4 rounded-lg border border-white bg-secondary">
								<div className="flex items-center justify-between mb-2">
									<div className="flex flex-col">
										<h6 className="flex items-center" style={{ cursor: 'pointer' }}>
											<Music className="h-4 w-4 text-primary mr-2" />
											<span className="text-[0.8rem]">{track.title || 'Untitled Track'}</span>
										</h6>
										<span className="text-[0.7rem] text-white/50">
											{track.fileType} • {track.fileId && fileDetails[track.fileId] ? getFileSize(fileDetails[track.fileId].size) + ' MB' : 'Stored in IndexedDB'}
										</span>
									</div>
									<div className="flex items-center gap-2">
										{validationErrors[index] && <AlertTriangle className="h-4 w-4 text-red-500" />}
										<Button variant="ghost" size="icon" onClick={() => openEditTrack(index)} className="h-6 w-6 text-gray-400 hover:text-blue-500">
											<Edit className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)} className="h-6 w-6 text-gray-400 hover:text-red-500">
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
									<div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress[index] || 0}%` }} />
								</div>
								{validationErrors[index] && (
									<div className="mt-2 text-xs text-red-500">
										<p>Please edit this track to fix validation errors</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			<div className="flex justify-center mt-12">
				<Button size="lg" onClick={handleContinue} className="bg-primary hover:bg-primary text-white px-10 rounded-full">
					Save & Continue →
				</Button>
			</div>

			{/* Track Edit Sheet Component */}
			<TrackEditSheet isOpen={editingTrackIndex !== null} onClose={closeEditTrack} track={editingTrack} albumInfo={albumInfo} onSave={saveTrackChanges} genreOptions={formattedData?.Genre || []} streamingPlatformOptions={formattedData?.StreamingPlatform || []} isLoadingOptions={isLoadingStaticAppInfo} />
		</div>
	);
}
