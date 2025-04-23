'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { MoveLeft, MoveRight, Music } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/icons';
import { getFileSize } from '@/utils/numbers';
import { cn } from '@/lib/utils';

import { useMediaUploadStore } from '../store';

export default function Step2MediaTrackUpload() {
	const { setMediaFile, setCurrentStep, mediaFileId, getMediaFile, initializeDB, isDBInitialized } = useMediaUploadStore();
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const loadData = async () => {
			if (!isDBInitialized) {
				await initializeDB();
			}

			if (mediaFileId) {
				const file = await getMediaFile();
				if (file) {
					setUploadedFile(file);
					setUploadProgress(100);
				}
			}
		};

		loadData();
	}, [mediaFileId, getMediaFile, initializeDB, isDBInitialized]);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'video/mp4'];
		if (!validTypes.includes(file.type)) {
			toast.error('Invalid file type. Please upload MP3, WAV, OGG or MP4 files only.');
			return;
		}

		// Validate file size (35MB max)
		if (file.size > 35 * 1024 * 1024) {
			toast.error('File size exceeds the 35MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);
		await setMediaFile(file); // Store in IndexedDB
		simulateUpload();
	};

	const simulateUpload = () => {
		setUploadProgress(0);
		const timer = setInterval(() => {
			setUploadProgress(prevProgress => {
				const newProgress = prevProgress + 18;
				if (newProgress >= 100) {
					clearInterval(timer);
					return 100;
				}
				return newProgress;
			});
		}, 150);
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

		const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'video/mp4'];
		if (!validTypes.includes(file.type)) {
			toast.error('Invalid file type. Please upload MP3, WAV, OGG or MP4 files only.');
			return;
		}
		if (file.size > 40 * 1024 * 1024) {
			toast.error('File size exceeds the 35MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);
		await setMediaFile(file);
		simulateUpload();
	};

	const handleContinue = () => {
		if (uploadedFile && uploadProgress === 100) {
			setCurrentStep('coverArt');
			toast.success('Track uploaded successfully');
		} else {
			toast.error('Please upload a file first');
		}
	};

	return (
		<div className="w-[82vw] sm:w-[55vw] max-w-[500px] md:max-w-3xl mx-auto ">
			<section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
				<label className={cn('border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center max-h-[300px]', isDragging ? 'border-solid border-3' : 'border-primary')} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} id="track-upload-input ">
					<AppLogo width={150} height={150} className="" style={{ opacity: 0.3, filter: 'grayscale(1)' }} />
					<p className="text-white/30 mb-6 text-xs max-w-[30ch]">Drag and drop your audio file here, or click the button below</p>
				</label>
				<div className="flex flex-col items-start justify-center">
					<input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".mp3,.mp4,.wav,.ogg" id="track-upload-input " />

					<div className="mb-6 text-left">
						<h3 className="text-base font-semibold mb-4">Track upload requirements</h3>
						<ul className="list-disc pl-6 space-y-2 text-[0.9rem] text-white/70 text-left">
							<li>File format: MP3, MP4</li>
							<li>Size: at least 3000×3000 pixels</li>
							<li>File size: Image file size cannot be greater than 35 MB</li>
							<li>Video mode: Best quality</li>
							<li>Resolution: 72 dpi</li>
							<li>Your track must not contain any logos, website address, release dates or advertisements of any kind.</li>
						</ul>
					</div>

					<Button onClick={() => fileInputRef?.current?.click()} size="lg" className="bg-primary hover:bg-primary text-white rounded-full px-8 mt-2.5">
						Browse
					</Button>
				</div>
			</section>

			{!!uploadedFile && (
				<div className="mb-8">
					<div className="flex flex-col p-4 rounded-lg border border-white bg-secondary">
						<div className="flex items-center justify-between mb-2">
							<div className="flex flex-col">
								<h6 className="flex items-center" style={{ cursor: 'pointer' }}>
									<Music className="h-4 w-4 text-primary mr-2" />
									<span className="text-[0.8rem]">{uploadedFile.name}</span>
								</h6>
								<span className="text-[0.7rem] text-white/50">{getFileSize(uploadedFile.size)} MB</span>
							</div>
						</div>
						<div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
							<div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress || 0}%` }} />
						</div>
					</div>
				</div>
			)}

			<div className="flex justify-between items-center mt-8 md:mt-16">
				<Button onClick={() => setCurrentStep('musicInfo')} size="lg" variant={'outline'} className="rounded-full">
					<MoveLeft className="mr-2 h-4 w-4" />
					Back
				</Button>

				<Button onClick={handleContinue} size="lg" disabled={!uploadedFile || uploadProgress < 100} className="rounded-full">
					Continue <MoveRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
