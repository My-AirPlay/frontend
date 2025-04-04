import React, { useRef, useState } from 'react'
import { useMediaUploadStore } from '../store';
import { toast } from 'sonner';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { AppLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Step3MediaCoverUpload = () => {

    const { setCoverArtFile, setCurrentStep, coverArtFile, mediaInfo } = useMediaUploadStore();
    const [uploadedFile, setUploadedFile] = useState<File | null>(coverArtFile);
    const [uploadProgress, setUploadProgress] = useState(!!uploadedFile || !!coverArtFile ? 100 : 0);
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        !!uploadedFile ?
            URL.createObjectURL(uploadedFile)
            :
            !!coverArtFile ?
                URL.createObjectURL(coverArtFile)
                : null
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload JPG or PNG files only.");
            return;
        }

        // Validate file size (35MB max)
        if (file.size > 35 * 1024 * 1024) {
            toast.error("File size exceeds the 35MB limit. Please upload a smaller file.");
            return;
        }

        setUploadedFile(file);

        // Create a preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        simulateUpload();
    };

    const simulateUpload = () => {
        setUploadProgress(0);
        const timer = setInterval(() => {
            setUploadProgress((prevProgress) => {
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
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Please upload JPG or PNG files only.");
            return;
        }

        // Validate file size (35MB max)
        if (file.size > 35 * 1024 * 1024) {
            toast.error("File size exceeds the 35MB limit. Please upload a smaller file.");
            return;
        }

        setUploadedFile(file);

        // Create a preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        simulateUpload();
    };

    const handleContinue = () => {
        if (uploadedFile && uploadProgress === 100) {
            setCoverArtFile(uploadedFile);
            setCurrentStep('distribution');
            toast.success("Cover art uploaded successfully");
        } else {
            toast.error("Please upload a cover art first");
        }
    };




    return (
        <div className="w-[80vw] sm:w-[55vw] max-w-[500px] md:max-w-3xl mx-auto px-4">


            <section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
                <div className="flex flex-col gap-2">

                    <label
                        className={cn("flex-1 border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center max-h-[300px] aspect-square", isDragging ? "border-solid border-3" : "border-primary")}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        id="track-cover-upload-input"
                    >
                        {
                            (!previewUrl) ?
                                (
                                    <>
                                        <AppLogo width={150} height={150} className="" style={{ opacity: 0.3, filter: "grayscale(1)" }} />
                                        <p className="text-center text-white/30 mb-6 text-xs max-w-[30ch]">
                                            Drag and drop your image file here, or click the button below
                                        </p>
                                    </>
                                )
                                :
                                <div className='flex flex-col items-center justify-start gap-4'>
                                    <Image
                                        src={previewUrl}
                                        alt="Preview" width={150} height={150} className="rounded-xl"
                                    />
                                    <div>
                                        <h6 className="text-lg font-medium">
                                            {mediaInfo?.title || "Track Title"}
                                        </h6>
                                        <p className="text-white/50 mb-6 text-xs max-w-[30ch]">
                                            {mediaInfo?.artistName || "Track Artist"}
                                        </p>
                                    </div>
                                </div>
                        }
                    </label>
                    {
                        !!uploadedFile &&
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${uploadProgress || 0}%` }}
                            />
                        </div>
                    }
                </div>
                <div className="flex flex-col items-start justify-center">
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        id="track-cover-upload-input"

                    />

                    <div className="mb-6 text-left">
                        <h3 className="text-base font-semibold mb-4">Track upload requirements</h3>
                        <ul className="list-disc pl-6 space-y-2 text-[0.9rem] text-white/70 text-left">
                            <li>File format: JPG, PNG</li>
                            <li>Size: at least 3000×3000 pixels</li>
                            <li>File size: Image file size cannot be greater than 35 MB</li>
                            <li>Color mode: Best quality RGB (including black and white images)</li>
                            <li>Resolution: 72 dpi</li>
                            <li>Your cover art must not contain any social media handles of any kind.</li>
                        </ul>
                    </div>

                    <Button
                        onClick={() => fileInputRef?.current?.click()}
                        size="xl"
                        className="bg-primary hover:bg-primary text-white rounded-full  mt-1.5"
                    >
                        Browse
                    </Button>
                </div>

            </section>





            <div className="flex justify-center ">
                <Button
                    onClick={handleContinue}
                    size="xl"
                    disabled={!previewUrl || uploadProgress < 100}
                    className="rounded-full"
                >
                    Continue <MoveRight className="ml-2 h-4 w-4" />
                </Button>

            </div>
        </div>
    );
}

export default Step3MediaCoverUpload