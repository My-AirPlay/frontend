'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui';
import { AppLogo } from '@/components/icons';
import { cn } from '@/lib/utils';

import { useMediaUploadStore } from '../store';

const Step3MediaCoverUpload = () => {
	const { setCoverArt, setCurrentStep, coverArtId, mediaInfo, getCoverArtFile, initializeDB, isDBInitialized } = useMediaUploadStore();
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Initialize IndexedDB and load cover art if exists
	useEffect(() => {
		const loadData = async () => {
			if (!isDBInitialized) {
				await initializeDB();
			}

			if (coverArtId) {
				const file = await getCoverArtFile();
				if (file) {
					setUploadedFile(file);
					setPreviewUrl(URL.createObjectURL(file));
					setUploadProgress(100);
				}
			}
		};

		loadData();
	}, [coverArtId, getCoverArtFile, initializeDB, isDBInitialized]);

	// Clean up object URLs when component unmounts
	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!validTypes.includes(file.type)) {
			toast.error('Invalid file type. Please upload JPG or PNG files only.');
			return;
		}

		// Validate file size (5MB max)
		if (file.size > 5 * 1024 * 1024) {
			toast.error('File size exceeds the 5MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);

		// Create a preview URL
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		const newPreviewUrl = URL.createObjectURL(file);
		setPreviewUrl(newPreviewUrl);

		simulateUpload();
	};

	const simulateUpload = () => {
		setUploadProgress(0);
		const timer = setInterval(() => {
			setUploadProgress(prevProgress => {
				const newProgress = prevProgress + 20;
				if (newProgress >= 100) {
					clearInterval(timer);
					return 100;
				}
				return newProgress;
			});
		}, 100);
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setIsDragging(true);
		} else if (e.type === 'dragleave') {
			setIsDragging(false);
		}
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const file = e.dataTransfer.files?.[0];
		if (!file) return;

		// Validate file type
		const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!validTypes.includes(file.type)) {
			toast.error('Invalid file type. Please upload JPG or PNG files only.');
			return;
		}

		// Validate file size (5MB max)
		if (file.size > 5 * 1024 * 1024) {
			toast.error('File size exceeds the 5MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);

		// Create a preview URL
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		const newPreviewUrl = URL.createObjectURL(file);
		setPreviewUrl(newPreviewUrl);

		simulateUpload();
	};

	const handleContinue = async () => {
		if (uploadedFile && uploadProgress === 100) {
			await setCoverArt(uploadedFile); // Store in IndexedDB
			setCurrentStep('distribution');
			toast.success('Cover art uploaded successfully');
		} else {
			toast.error('Please upload a cover art first');
		}
	};

	return (
		<div className="w-[82vw] sm:w-[55vw] max-w-[500px] md:max-w-3xl mx-auto">
			<section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
				<div className="flex flex-col gap-2">
					<label className={cn('flex-1 border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center max-md:w-[250px] md:max-h-[300px] p-3 aspect-square overflow-hidden', isDragging ? 'border-solid border-3' : 'border-primary')} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} id="track-cover-upload-input">
						{!previewUrl ? (
							<>
								<AppLogo width={150} height={150} style={{ opacity: 0.3, filter: 'grayscale(1)' }} />
								<p className="text-center text-white/30 mb-6 text-xs max-w-[30ch]">Drag and drop your image file here, or click the button below</p>
							</>
						) : (
							<div className="flex flex-col items-center justify-start gap-4 w-full h-full">
								<Image src={previewUrl || '/placeholder.svg'} alt="Preview" width={200} height={200} className="rounded-xl object-contain w-full h-full" />
							</div>
						)}
					</label>
					{!!uploadedFile && (
						<div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
							<div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress || 0}%` }} />
						</div>
					)}
					<div>
						<h6 className="text-lg font-medium">{mediaInfo?.title || 'Track Title'}</h6>
						<p className="text-white/50 mb-6 text-xs max-w-[30ch]">{mediaInfo?.artistName || 'Track Artist'}</p>
					</div>
				</div>
				<div className="flex flex-col items-start justify-center">
					<input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".jpg,.jpeg,.png" id="track-cover-upload-input" />

					<div className="mb-6 text-left">
						<h3 className="text-base font-semibold mb-4">Track upload requirements</h3>
						<ul className="list-disc pl-6 space-y-2 text-[0.9rem] text-white/70 text-left">
							<li>File format: JPG, PNG, JPEG</li>
							<li>Size: at least 3000×3000 pixels</li>
							<li>File size: Image file size cannot be greater than 5 MB</li>
							<li>Color mode: Best quality RGB (including black and white images)</li>
							<li>Resolution: 72 dpi</li>
							<li>No logos, URLs, release dates, or advertisements.</li>
							<li> Artwork must not contain barcodes or social media handles.</li>
						</ul>
					</div>

					<Button onClick={() => fileInputRef?.current?.click()} size="lg" className=" mt-1.5">
						Browse
					</Button>
				</div>
			</section>

			<footer className="flex justify-between items-center ">
				<Button onClick={() => setCurrentStep('trackUpload')} size="lg" variant={'outline'} className="rounded-full">
					<MoveLeft className="mr-2 h-4 w-4" />
					Back
				</Button>
				<Button onClick={handleContinue} size="lg" disabled={!previewUrl || uploadProgress < 100} className="rounded-full">
					Continue <MoveRight className="ml-2 h-4 w-4" />
				</Button>
			</footer>
		</div>
	);
};

export default Step3MediaCoverUpload;
