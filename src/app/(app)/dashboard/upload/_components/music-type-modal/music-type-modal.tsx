import { uploadTypes } from "@/lib/constants";
import { MoveRight, X } from "lucide-react";
import React, { useEffect } from "react";
import MusicTypeCard from "../music-type-card/music-type-card";
import useUploadMusicStore from "@/stores/upload-music.store";
import { Button } from "@/components/ui/button";
interface MusicTypeModalProps {
  onContinue: () => void;
}
const MusicTypeModal = ({ onContinue }: MusicTypeModalProps) => {
  const { setUploadType, uploadType } = useUploadMusicStore((s) => s);
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);
  return (
    <section className="fixed w-svw h-screen bg-custom-page-bg z-50 inset-0 py-16 px-10 overflow-y-auto">
      <div className="container mx-auto">
        <div className="flex justify-end mb-24">
          <button className="text-[#A6A6A6]  w-fit">
            <X width={24} height={24} />
          </button>
        </div>
      </div>
      <h1 className="font-inter font-normal text-xl text-center p-[10px] mb-2 text-custom-primary">
        MUSIC UPLOAD
      </h1>
      <p className="text-white font-semibold text-28 text-center font-inter">
        Kindly choose what kind of music you want to upload
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-[630px] mx-auto gap-6 mt-20">
        {uploadTypes.map((upload, i) => (
          <MusicTypeCard
            isSelected={uploadType === upload.type}
            onClick={() => setUploadType(upload.type)}
            {...upload}
            key={`${upload.title}${i}`}
          />
        ))}
      </div>
      {uploadType && (
        <Button
          variant={"authBtn"}
          className="h-auth-btn max-w-[275px] mx-auto mt-10 "
          onClick={onContinue}
        >
          Continue
          <MoveRight />
        </Button>
      )}
    </section>
  );
};

export default MusicTypeModal;
