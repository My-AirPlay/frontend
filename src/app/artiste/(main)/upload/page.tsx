/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { MoveRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useMediaUploadStore } from "./misc/store";
import { useAlbumUploadStore } from "./misc/store";
import { cn } from "@/lib/utils";

interface MediaOption {
  value: string;
  label: string;
  icon: string;
}

const mediaOptions: MediaOption[] = [
  {
    value: "Track",
    label: "Track",
    icon: "/lovable-uploads/5a1c4eae-d092-4fd6-9b26-fbf88ca81a03.png"
  },
  {
    value: "Video",
    label: "Video",
    icon: "/lovable-uploads/6bf7d403-f5d5-4865-81eb-4dba683d4e70.png"
  },
  {
    value: "Album",
    label: "Album",
    icon: "/lovable-uploads/adfc2bd4-0e82-416b-8aa4-4f3bc18fd673.png"
  },
  {
    value: "ExtendedPlaylist",
    label: "Extended Playlist (EP)",
    icon: "/lovable-uploads/0ab0909f-5c05-498b-b1c1-28f63da19f7a.png"
  },
  {
    value: "MixTape",
    label: "Mix Tape",
    icon: "/lovable-uploads/567909f8-865c-4c50-bbd4-4f7982b6d033.png"
  },
  {
    value: "PlayBack",
    label: "Play Back",
    icon: "/lovable-uploads/c86752d5-1a3b-4637-9424-f3bdcb6f437f.png"
  }
];

export default function MediaTypeSelection() {
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

  const handleSelect = (value: string) => {
    setSelectedType(value);
  };

  const handleContinue = () => {
    if (!selectedType) return;

    if (selectedType === 'Album' || selectedType === 'ExtendedPlaylist' || selectedType === 'MixTape') {
      if (hasOngoingAlbumUpload() && albumType === selectedType) {
        setShowContinueDialog(true);
        return;
      }
      setAlbumType(selectedType as any);
      setAlbumUploadCurrentStep('musicInfo');
      router.push('/artiste/upload/album');

    }
    else if (selectedType === 'Track' || selectedType === 'Video' || selectedType === 'PlayBack') {
      if (hasOngoingMediaUpload() && mediaType === selectedType) {
        console.log("Ongoing media upload detected")
        setShowContinueDialog(true);
        return;
      }
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
      // setAlbumUploadCurrentStep('musicInfo');
      router.push('/artiste/upload/album');
    } else {
      // setMediaUploadCurrentStep('musicInfo');
      router.push('/artiste/upload/media');
    }
  }



  return (
    <div className="container mx-auto px-4 md:p-10 py-8 max-w-4xl">
      <div className="bg-card rounded-xl p-6">
        <h2 className="text-primary text-center text-xl font-semibold mb-2">MUSIC UPLOAD</h2>
        <h1 className="text-white text-center text-2xl font-bold mb-8">
          Kindly choose what kind of music you want to upload
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {
            mediaOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "border border-gray-600 rounded-lg p-4 cursor-pointer transition-all",
                  selectedType === option.value ? "border-primary bg-black/50" : "hover:border-gray-400"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    {option.icon}
                  </div>
                  <p className="text-center text-white font-medium">{option.label}</p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleContinue}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full"
            disabled={!selectedType}
          >
            Continue <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Media Type?</DialogTitle>
              <DialogDescription>
                You already have an ongoing upload for the selected mediaT type. Would you like to start fresh or continue?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleContinueUpload}>
                Cancel
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
