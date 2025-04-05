
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaUploadStore } from "../store";
import { toast } from "sonner";
import { useUploadTrack } from "../api/upload";

export default function Step5MediaPreview() {
    const {
        mediaInfo,
        mediaFile,
        coverArtFile,
        setCurrentStep,
        mediaType,
        streamingPlatforms,
    } = useMediaUploadStore();

    const [isUploading, setIsUploading] = useState(false);

    const handleBack = () => {
        setCurrentStep('distribution');
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };
    console.log(streamingPlatforms, "Streaming platforms in Step5MediaPreview")


    const { mutate } = useUploadTrack()
    const handleSubmit = async () => {
        setIsUploading(true);

        try {

            // Single track upload
            if (!mediaFile || !coverArtFile) {
                toast.error("Missing required files", {
                    description: "Please make sure you have uploaded both a track file and cover art.",

                });
                setIsUploading(false);
                setCurrentStep('trackUpload')
                return;
            }

            const trackPayload = {
                ...mediaInfo,
                media: mediaFile,
                coverArt: coverArtFile,
                fileType: mediaFile.type.includes('audio') ? 'audio' : 'video',
                streamingPlatforms
            };

            mutate(trackPayload, {
                onSuccess: () => {
                    toast.success("Upload successful", {
                        description: `Your ${mediaType?.toLowerCase()} has been uploaded successfully.`,
                    });
                    setCurrentStep('complete');
                },
                onError: (error) => {
                    console.error("Upload failed:", error);
                    toast.error("Upload failed", {
                        description: "There was an error uploading your content. Please try again."
                    });
                }
            })


        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Upload failed", {
                description: "There was an error uploading your content. Please try again."
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-card rounded-lg p-6">
                <h2 className="text-brand text-center text-xl font-semibold mb-2">
                    {mediaType?.toUpperCase()} UPLOAD
                </h2>
                <h1 className="text-white text-center text-2xl font-bold mb-8">
                    Review Your {mediaType} Details
                </h1>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Title</p>
                                    <p className="font-medium">{mediaInfo.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Artist</p>
                                    <p className="font-medium">{mediaInfo.artistName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Genre</p>
                                    <p className="font-medium">{mediaInfo.mainGenre}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Release Date</p>
                                    <p className="font-medium">{formatDate(mediaInfo.releaseDate)}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-400">Description</p>
                                    <p className="font-medium">{mediaInfo.description}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Distribution Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">Streaming Platforms</p>
                                <div className="flex flex-wrap gap-2">
                                    {streamingPlatforms.map((platform, index) => (
                                        <span key={index} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                                            {index}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-400">Publisher</p>
                                    <p className="font-medium">{mediaInfo.publisher}</p>
                                </div>
                                {mediaInfo.recordLabel && (
                                    <div>
                                        <p className="text-sm text-gray-400">Record Label</p>
                                        <p className="font-medium">{mediaInfo.recordLabel}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-400">UPC</p>
                                    <p className="font-medium">{mediaInfo.universalProductCode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Copyright</p>
                                    <p className="font-medium">{mediaInfo.copyright}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    <Card>
                        <CardHeader>
                            <CardTitle>Files</CardTitle>
                        </CardHeader>
                        <CardContent>

                            <>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-400 mb-2">Track File</p>
                                    {
                                        mediaFile && (
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-brand/10 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-xs text-brand">1</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm">{mediaFile.name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Cover Art</p>
                                    {coverArtFile && (
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0 mr-3">
                                                {coverArtFile && (
                                                    <img
                                                        src={URL.createObjectURL(coverArtFile)}
                                                        alt="Cover"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm">{coverArtFile.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {(coverArtFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-between mt-8">
                    <Button
                        onClick={handleBack}
                        variant="outline"
                        className="px-6"
                        disabled={isUploading}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-brand hover:bg-brand-hover text-white px-6"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" /> Upload {mediaType}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
