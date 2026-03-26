/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { Button, LinkButton } from '@/components/ui';
import { AlertTriangle, MoveRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { redirect, useRouter } from 'next/navigation';
import { useMediaUploadStore } from './misc/store';
import { useAlbumUploadStore } from './misc/store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';

interface MediaOption {
	value: string;
	label: string;
	icon: string;
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
		icon: '/images/upload/mixtape.png'
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
		if (artist && !artist.bankDetails?.paidRegistrationFee) {
			router.replace('/artiste/onboarding?step=registration_fee');
		}
	}, [artist, router]);

	useEffect(() => {
		if (mediaType) {
			setSelectedType(mediaType);
		}
	}, [mediaType]);

	const handleSelect = (value: string) => {
		setSelectedType(value);
	};

	const handleContinue = async () => {
		if (!selectedType) return;
		if (!!artist && !artist.bankDetails.paidRegistrationFee) {
			redirect('/artiste/onboarding?step=registration_fee');
		}

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

	return (
		<div className="container mx-auto w-[80vw] max-w-3xl">
			{isPaused && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
					<AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
					<p className="text-sm text-amber-800 dark:text-amber-200 flex-1 font-medium">Your distribution has been paused. Uploads are temporarily disabled. Please contact support for assistance.</p>
				</div>
			)}

			{artist?.bankDetails?.paidRegistrationFee === false && (
				<div className="mb-6 flex items-center gap-3 rounded-lg border border-rose-300 bg-rose-50 dark:bg-rose-950/30 dark:border-rose-700 p-4">
					<AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
					<p className="text-sm text-rose-800 dark:text-rose-200 flex-1 font-medium">Complete your registration by paying the registration fee</p>
					<LinkButton href="/artiste/onboarding?step=registration_fee" size="thin" className="text-xs rounded-full shrink-0">
						Pay Now
					</LinkButton>
				</div>
			)}

			<div className="bg-card rounded-2xl p-6 px-4 md:p-10 md:px-16">
				<h2 className="text-primary text-center text-xl font-semibold mb-2">MUSIC UPLOAD</h2>
				<h1 className="text-white text-center text-2xl font-bold mb-8">Kindly choose what kind of music you want to upload</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{mediaOptions.map(option => (
						<div key={option.value} className={cn('border border-gray-600 rounded-xl max-md:py-2 p-4 cursor-pointer transition-all', selectedType === option.value ? 'border-primary bg-black/50' : 'hover:border-gray-400')} onClick={() => handleSelect(option.value)}>
							<div className="flex md:flex-col items-center max-md:gap-4">
								<div className="relative size-12 md:size-24 rounded-full overflow-hidden md:mb-4">
									<Image fill src={option.icon} alt={option.label} objectFit="cover" className="" />
								</div>
								<p className="text-white font-medium text-left">{option.label}</p>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-center mt-8 md:mt-16">
					<Button onClick={handleContinue} className="rounded-full" disabled={!selectedType || isPaused} size={'lg'}>
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
