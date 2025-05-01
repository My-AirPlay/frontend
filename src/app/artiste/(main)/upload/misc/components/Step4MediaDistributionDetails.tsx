'use client';
import { useCallback, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ArrowRight, MoveLeft } from 'lucide-react';
import Image from 'next/image';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SingleDatePicker } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { useMediaUploadStore } from '../store';
import Step4MediaDistributionPlatformCard from './Step4MediaDistributionPlatformCards';

const releaseDateFormSchema = z
	.object({
		releaseDate: z.string().min(1, { message: 'Release date is required' }),
		originalReleaseDate: z.string().optional()
	})
	.refine(
		data => {
			const today = new Date().toISOString().split('T')[0];
			const releaseDate = data.releaseDate;
			const originalReleaseDate = data.originalReleaseDate;

			if (releaseDate < today) {
				return false;
			}

			if (originalReleaseDate && releaseDate < originalReleaseDate) {
				return false;
			}

			return true;
		},
		{
			message: 'Release date cannot be earlier than today, and it cannot be earlier than the original release date.',
			path: ['releaseDate']
		}
	);
type ReleaseDateFormType = z.infer<typeof releaseDateFormSchema>;

export default function Step4AlbumDistributionDetails() {
	const { streamingPlatforms: selectedPlatforms, togglePlatform, setCurrentStep, mediaInfo, coverArtId, updateMediaInfo, getCoverArtFile, isDBInitialized, initializeDB } = useMediaUploadStore();

	const { formattedData, isLoading } = useStaticAppInfo();
	const [differentReleaseDate, setDifferentReleaseDate] = useState(false);
	const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);

	// Initialize IndexedDB and load cover art if exists
	useEffect(() => {
		const loadData = async () => {
			if (!isDBInitialized) {
				await initializeDB();
			}

			if (coverArtId) {
				const file = await getCoverArtFile();
				if (file) {
					setCoverArtPreview(URL.createObjectURL(file));
				}
			}
		};

		loadData();
	}, [coverArtId, getCoverArtFile, initializeDB, isDBInitialized]);

	// Clean up object URLs when component unmounts
	useEffect(() => {
		return () => {
			if (coverArtPreview) {
				URL.revokeObjectURL(coverArtPreview);
			}
		};
	}, [coverArtPreview]);

	const handleToggle = useCallback(
		(id: string) => {
			togglePlatform(id);
		},
		[togglePlatform]
	);

	const form = useForm<ReleaseDateFormType>({
		resolver: zodResolver(releaseDateFormSchema),
		defaultValues: {
			releaseDate: mediaInfo.releaseDate,
			originalReleaseDate: mediaInfo.originalReleaseDate
		},
		mode: 'onChange'
	});

	const handleContinue = async () => {
		const isValid = await form.trigger();
		if (!isValid) {
			toast.error('Please fill in all required fields correctly.');
			return;
		}
		if (selectedPlatforms.length === 0) {
			toast.error('Please select at least one streaming platform');
			return;
		}

		if (!mediaInfo.title || !coverArtId) {
			toast.error('Missing required information. Please go back and fill in all required fields.');
			return;
		}

		setCurrentStep('preview');
	};

	if (isLoading) {
		return <div className="text-center py-8">Loading distribution platforms...</div>;
	}

	return (
		<div className="container max-w-3xl mx-auto px-4">
			<h2 className="text-lg text-primary font-bold text-center mb-6">Distribution Preferences</h2>

			<header className="flex items-start justify-center gap-5 mb-8">
				{coverArtPreview && <Image src={coverArtPreview || '/placeholder.svg'} alt="Cover Art Preview" width={120} height={120} className="rounded-xl" />}
				<div>
					<h6 className="text-lg font-semibold text-primary">{mediaInfo?.title || 'Track Title'}</h6>
					<p>{mediaInfo?.artistName || 'Track Artist'}</p>
				</div>
			</header>
			<Form {...form}>
				<div className="text-center text-muted-foreground mb-4 bg-secondary p-3 rounded-xl">
					<article className="p-4 bg-background/70 rounded-xl">
						<h6 className="text-base md:text-lg text-primary font-semibold mb-4">Release dates</h6>
						<div className="space-y-5 text-left max-lg:text-sm">
							<div>
								<span className="font-medium text-primary">Release Date: </span>
								You should set the release date at least 21 days in the future, This gives you enough time to announce the release to fans, share pre-save links, and pitch to DSPs for playlist inclusion. It also allows time to make any changes requested by the approval team
							</div>
							<div>
								<span className="font-medium text-primary">Release Time: </span>
								Your release will be available starting at 12am for each territory. Most stores allow you to select the availability time settings for your release
							</div>
							<div>
								<span className="font-medium text-primary">Important Note: </span>
								Your release will be available starting at 12am for each territory Most stores allow you to select the availability time settings for your release{' '}
							</div>
						</div>
					</article>
				</div>

				<form className="lg:grid grid-cols-2 gap-x-8">
					<FormField
						control={form.control}
						name="releaseDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Release Date <span className="text-primary">*</span>
								</FormLabel>
								<FormControl>
									<SingleDatePicker
										value={new Date(field.value || mediaInfo.releaseDate)}
										onChange={date => {
											field.onChange(date?.toISOString().split('T')[0] || '');
											updateMediaInfo({ ...mediaInfo, releaseDate: date?.toISOString().split('T')[0] || '' });
										}}
										placeholder="Select release date"
									/>
								</FormControl>
								<FormMessage />
								<label id="differentReleaseDate" className="flex items-center gap-2 mt-4">
									<Checkbox
										id="differentReleaseDate"
										checked={differentReleaseDate}
										onCheckedChange={checked => {
											setDifferentReleaseDate(checked === true);
										}}
										className="mt-4"
									/>
									<span className="text-sm text-white/80">Set a different release date for each platform</span>
								</label>
							</FormItem>
						)}
					/>
					{differentReleaseDate && (
						<FormField
							control={form.control}
							name="originalReleaseDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Original Release Date <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<SingleDatePicker
											value={!!field.value ? new Date(field.value) : undefined}
											onChange={date => {
												field.onChange(date?.toISOString().split('T')[0] || '');
												updateMediaInfo({ ...mediaInfo, originalReleaseDate: date?.toISOString().split('T')[0] || '' });
											}}
											placeholder="Select release date"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</form>
			</Form>

			<h6 className="text-lg text-primary font-semibold mb-4 mt-10">Store Distribution</h6>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">{formattedData?.StreamingPlatform.map((platform, index) => <Step4MediaDistributionPlatformCard handleToggle={handleToggle} key={index} platform={platform} selectedPlatforms={selectedPlatforms} index={index} />)}</div>

			<div className="flex justify-between items-center">
				<Button onClick={() => setCurrentStep('coverArt')} size="lg" variant={'outline'} className="rounded-full">
					<MoveLeft className="mr-2 h-4 w-4" />
					Music Cover
				</Button>
				<Button onClick={handleContinue} className="" size="lg">
					Preview <ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
