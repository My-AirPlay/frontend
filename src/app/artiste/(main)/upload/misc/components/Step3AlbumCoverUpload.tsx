'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useAlbumUploadStore } from '../store';
import { toast } from 'sonner';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { AppLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Step3AlbumCoverUpload = () => {
	const { setCoverArt, setCurrentStep, coverArtId, getCoverArtFile, initializeDB, isDBInitialized } = useAlbumUploadStore();

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

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!validTypes.includes(file.type)) {
			toast.error('Invalid file type. Please upload JPG or PNG files only.');
			return;
		}

		// Validate file size (35MB max)
		if (file.size > 35 * 1024 * 1024) {
			toast.error('File size exceeds the 35MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);

		// Create a preview URL
		const reader = new FileReader();
		reader.onload = e => {
			setPreviewUrl(e.target?.result as string);
		};
		reader.readAsDataURL(file);

		simulateUpload();
	};

	const simulateUpload = () => {
		setUploadProgress(0);
		const timer = setInterval(() => {
			setUploadProgress(prevProgress => {
				const newProgress = prevProgress + 10;
				if (newProgress >= 100) {
					clearInterval(timer);
					return 100;
				}
				return newProgress;
			});
		}, 300);
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

		// Validate file size (35MB max)
		if (file.size > 35 * 1024 * 1024) {
			toast.error('File size exceeds the 35MB limit. Please upload a smaller file.');
			return;
		}

		setUploadedFile(file);

		// Create a preview URL
		const reader = new FileReader();
		reader.onload = e => {
			setPreviewUrl(e.target?.result as string);
		};
		reader.readAsDataURL(file);

		simulateUpload();
	};

	const handleContinue = async () => {
		if (uploadedFile && uploadProgress === 100) {
			// Store in IndexedDB
			await setCoverArt(uploadedFile);
			setCurrentStep('distribution');
			toast.success('Cover art uploaded successfully');
		} else {
			toast.error('Please upload a cover art first');
		}
	};

	return (
		<div className="w-[80vw] sm:w-[55vw] max-w-[600px] md:max-w-3xl mx-auto">
			<section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
				<label className={cn('border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center max-h-[300px] aspect-square p-4', isDragging ? 'border-solid border-3' : 'border-primary')} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} id="album-cover-upload-input ">
					{!previewUrl ? (
						<>
							<AppLogo width={150} height={150} className="" style={{ opacity: 0.3, filter: 'grayscale(1)' }} />
							<p className="text-center text-white/30 mb-6 text-xs max-w-[30ch]">Drag and drop your image file here, or click the button below</p>
						</>
					) : (
						<>
							<Image src={previewUrl || '/placeholder.svg'} alt="Preview" width={200} height={200} className="rounded-xl" />
							<div className="h-1 w-full max-w-[200px] bg-gray-800 rounded-full overflow-hidden mt-4">
								<div className="h-full bg-primary transition-all" style={{ width: `${uploadProgress || 0}%` }} />
							</div>
						</>
					)}
				</label>
				<div className="flex flex-col items-start justify-center max-md:flex-col-reverse gap-5">
					<input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".jpg,.jpeg,.png" id="album-cover-upload-input " />

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

					<Button onClick={() => fileInputRef?.current?.click()} size="lg" className="bg-primary hover:bg-primary text-white rounded-full px-8 ">
						Browse
					</Button>
				</div>
			</section>

			{/* {albumTracks.length > 0 && (
                <div className="grid md:grid-cols-2 gap-5 lg:gap-y-8 my-16">
                    {albumTracks.map((track, index) => (
                        <div key={index} className="flex flex-col p-4 rounded-lg border border-white bg-secondary">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <h6 className="flex items-center" style={{ cursor: "pointer" }}>
                                        <Music className="h-4 w-4 text-primary mr-2" />
                                        <span className="text-[0.8rem]">{track.title}</span>
                                    </h6>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all" style={{ width: `100%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            )} */}

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

export default Step3AlbumCoverUpload;
