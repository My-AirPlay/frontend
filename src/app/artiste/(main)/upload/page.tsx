/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { AlertTriangle, MoveRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useMediaUploadStore } from './misc/store';
import { useAlbumUploadStore } from './misc/store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import { DSP_LABELS, missingRequiredDsps } from '@/lib/dsp';
import { FREE_RELEASE_LIMIT, formatFee, releaseAllowance } from '@/lib/release-allowance';
import SubscribeButton from '@/components/subscribe-button';
import { hasPayoutAccount } from '@/lib/bank-details';

interface MediaOption {
	value: string;
	label: string;
	icon: string;
	disabled?: boolean;
}

const mediaOptions: MediaOption[] = [
	{
		value: 'Track',
		label: 'Track',
		icon: '/images/upload/track.png'
	},
	{
		value: 'Video',
		label: 'Video',
		icon: '/images/upload/video.png'
	},
	{
		value: 'Album',
		label: 'Album',
		icon: '/images/upload/album.png'
	},
	{
		value: 'ExtendedPlaylist',
		label: 'Extended Playlist (EP)',
		icon: '/images/upload/ep.png'
	},
	{
		value: 'MixTape',
		label: 'Mix Tape',
		icon: '/images/upload/mixtape.png',
		disabled: true
	}
];

export default function MediaTypeSelection() {
	const { artist } = useAuthContext();
	const router = useRouter();
	const { mediaType, setMediaType, setCurrentStep: setMediaUploadCurrentStep, hasOngoingUpload: hasOngoingMediaUpload, clearStore: clearMediaUploadStore } = useMediaUploadStore();
	const { albumType, setAlbumType, setCurrentStep: setAlbumUploadCurrentStep, hasOngoingUpload: hasOngoingAlbumUpload, clearStore: clearAlbumUploadStore } = useAlbumUploadStore();
	const [selectedType, setSelectedType] = useState<string | null>(mediaType);
	const [showContinueDialog, setShowContinueDialog] = useState(false);

	useEffect(() => {
		if (mediaType) {
			setSelectedType(mediaType);
		}
	}, [mediaType]);

	const handleSelect = (option: MediaOption) => {
		if (option.disabled) return;
		setSelectedType(option.value);
	};

	const handleContinue = async () => {
		if (!selectedType) return;
		if (mediaOptions.find(option => option.value === selectedType)?.disabled) return;

		// setMediaType(selectedType as any);
		if (selectedType === 'Album' || selectedType === 'ExtendedPlaylist' || selectedType === 'MixTape') {
			if (hasOngoingAlbumUpload() && albumType === selectedType) {
				setShowContinueDialog(true);
				return;
			}
			await clearAlbumUploadStore();
			setAlbumType(selectedType as any);
			setAlbumUploadCurrentStep('musicInfo');
			router.push('/artiste/upload/album');
		} else if (selectedType === 'Track' || selectedType === 'Video') {
			if (hasOngoingMediaUpload() && mediaType === selectedType) {
				setShowContinueDialog(true);
				return;
			}
			await clearMediaUploadStore();
			setMediaType(selectedType as any);
			setMediaUploadCurrentStep('musicInfo');
			router.push('/artiste/upload/media');
		}
	};

	const handleStartFresh = () => {
		if (selectedType === 'Album' || selectedType === 'ExtendedPlaylist' || selectedType === 'MixTape') {
			clearAlbumUploadStore();
			setAlbumType(selectedType as any);
			setAlbumUploadCurrentStep('musicInfo');
			router.push('/artiste/upload/album');
		} else {
			clearMediaUploadStore();
			setMediaType(selectedType as any);
			setMediaUploadCurrentStep('musicInfo');
			router.push('/artiste/upload/media');
		}
	};

	const handleContinueUpload = () => {
		if (selectedType === 'Album' || selectedType === 'ExtendedPlaylist' || selectedType === 'MixTape') {
			router.push('/artiste/upload/album');
		} else {
			router.push('/artiste/upload/media');
		}
	};

	const isPaused = artist?.distributionStatus === 'paused';
	// The server refuses uploads until these are set; say so before they fill in a release.
	const missingDsps = artist ? missingRequiredDsps(artist) : [];
	const missingBank = !!artist && !hasPayoutAccount(artist);
	const allowance = releaseAllowance(artist);
	const outOfReleases = !!artist && !allowance.subscribed && allowance.remaining === 0;

	return (
		<div className="container mx-auto w-[80vw] max-w-3xl">
			{isPaused && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
					<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">Your distribution has been paused. Uploads are temporarily disabled. Please contact support for assistance.</p>
				</div>
			)}

			{missingBank && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
					<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">
						Add your bank details before you upload, so we can pay you your royalties.{' '}
						<Link href="/artiste/settings?section=bank" className="underline">
							Add bank details
						</Link>
					</p>
				</div>
			)}

			{missingDsps.length > 0 && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
					<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">
						Before you upload, add your {missingDsps.map(d => DSP_LABELS[d] ?? d).join(' and ')} artist page link, or tell us you&apos;re not on {missingDsps.length === 1 ? 'it' : 'them'} yet, so your music lands on the right page.{' '}
						<Link href="/artiste/settings" className="underline">
							Go to settings
						</Link>
					</p>
				</div>
			)}

			{outOfReleases ? (
				<div className="mb-6 flex flex-col gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<div className="flex items-center gap-3">
						<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
						<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">
							You&apos;ve used your {FREE_RELEASE_LIMIT} free releases. Subscribe for {formatFee()} a year to keep uploading, with no limit while you&apos;re subscribed.
						</p>
					</div>
					<SubscribeButton />
				</div>
			) : (
				artist &&
				!allowance.subscribed && (
					<p className="mb-6 text-sm text-muted-foreground text-center">
						{allowance.remaining} of {FREE_RELEASE_LIMIT} free releases left. A single, EP or album each count as one.
					</p>
				)
			)}

			<div className="bg-card rounded-2xl p-6 px-4 md:p-10 md:px-16">
				<h2 className="text-primary text-center text-xl font-semibold mb-2">MUSIC UPLOAD</h2>
				<h1 className="text-white text-center text-2xl font-bold mb-8">Kindly choose what kind of music you want to upload</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{mediaOptions.map(option => (
						<div key={option.value} aria-disabled={option.disabled} className={cn('border border-gray-600 rounded-xl max-md:py-2 p-4 transition-all', option.disabled ? 'cursor-not-allowed opacity-40 grayscale' : 'cursor-pointer', selectedType === option.value ? 'border-primary bg-black/50' : !option.disabled && 'hover:border-gray-400')} onClick={() => handleSelect(option)}>
							<div className="flex md:flex-col items-center max-md:gap-4">
								<div className="relative size-12 md:size-24 rounded-full overflow-hidden md:mb-4">
									<Image fill src={option.icon} alt={option.label} objectFit="cover" className="" />
								</div>
								<p className="text-white font-medium text-left">{option.label}</p>
								{option.disabled && <p className="text-gray-400 text-xs mt-1 text-left md:text-center">Coming soon</p>}
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-center mt-8 md:mt-16">
					<Button onClick={handleContinue} className="rounded-full" disabled={!selectedType || isPaused || missingBank || missingDsps.length > 0 || outOfReleases} size={'lg'}>
						Continue <MoveRight className="ml-2 h-4 w-4" />
					</Button>
				</div>

				<Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Restart Upload?</DialogTitle>
							<DialogDescription>You already have an {selectedType} ongoing upload. Would you like to start fresh or continue?</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={handleContinueUpload}>
								Continue Upload
							</Button>
							<Button onClick={handleStartFresh} className="bg-primary hover:bg-primary/80 text-white">
								Start Fresh
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
