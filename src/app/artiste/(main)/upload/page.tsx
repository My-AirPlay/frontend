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
import Image from "next/image";

interface MediaOption {
  value: string;
  label: string;
  icon: string;
}

const mediaOptions: MediaOption[] = [
  {
    value: "Track",
    label: "Track",
    icon: "/images/upload/track.png"
  },
  {
    value: "Video",
    label: "Video",
    icon: "/images/upload/video.png"

  },
  {
    value: "Album",
    label: "Album",
    icon: "/images/upload/album.png"

  },
  {
    value: "ExtendedPlaylist",
    label: "Extended Playlist (EP)",
    icon: "/images/upload/ep.png"

  },
  {
    value: "MixTape",
    label: "Mix Tape",
    icon: "/images/upload/mixtape.png"

  },
  {
    value: "PlayBack",
    label: "Play Back",
    icon: "/images/upload/playback.png"

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
      router.push('/artiste/upload/album');
    } else {
      router.push('/artiste/upload/media');
    }
  }



  return (
    <div className="container mx-auto w-[80vw] max-w-3xl">
      <div className="bg-card rounded-2xl p-6 px-4 md:p-10 md:px-16">
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
                  "border border-gray-600 rounded-xl max-md:py-2 p-4 cursor-pointer transition-all",
                  selectedType === option.value ? "border-primary bg-black/50" : "hover:border-gray-400"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex md:flex-col items-center max-md:gap-4">
                  <div className="relative size-12 md:size-24 rounded-full overflow-hidden md:mb-4">
                    <Image
                      fill
                      src={option.icon}
                      alt={option.label}
                      objectFit="cover"
                      className=""
                    />
                  </div>
                  <p className="text-white font-medium text-left">{option.label}</p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="flex justify-center mt-8 md:mt-16">
          <Button
            onClick={handleContinue}
            className="rounded-full"
            disabled={!selectedType}
            size={"lg"}
          >
            Continue <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Media Type?</DialogTitle>
              <DialogDescription>
                You already have an {selectedType} ongoing upload. Would you like to start fresh or continue?
              </DialogDescription>
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
