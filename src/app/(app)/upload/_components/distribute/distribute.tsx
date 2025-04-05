"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useUploadMusicStore from "@/stores/upload-music.store";

import UploadInfo from "../upload-info/upload-info";
import { generateMusicUploadPreview } from "@/lib/utils";
import PreviewTable from "@/components/preview-table/preview-table";

const Distribute = () => {
  const { musicUpload } = useUploadMusicStore((s) => s);
  const [imageCover, setImageCover] = useState("");

  useEffect(() => {
    const getMusicCover = () => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setImageCover(reader.result);
        }
      };
      reader.readAsDataURL(musicUpload.musicCover!);
    };
    getMusicCover();
  }, [musicUpload.musicCover]);
  const musicPreview = generateMusicUploadPreview(musicUpload.musicInfo);
  return (
    <section className="mt-20">
      <h2 className="font-inter text-xl text-custom-primary font-semibold mb-5">
        REVEIW YOUR MUSIC SUMMARY
      </h2>
      <p className="text-white font-plus-jakarta-sans font-normal text-base mb-4">
        Please check your information for errors. If everything looks good,
        proceed to the next step. Otherwise, go back and edit further.
      </p>
      {imageCover ? (
        <UploadInfo
          artsitName={musicUpload.musicInfo.publisher}
          songName={musicUpload.musicInfo.song_title}
          img={imageCover}
        />
      ) : null}

      <PreviewTable previewData={musicPreview} />
      <div className="max-w-[834px] mx-auto flex justify-between items-center flex-col gap-4 md:flex-row">
        <Button
          size={"lg"}
          className="bg-transparent border border-white"
        >
          Edit
        </Button>
        <Button size={"lg"}>Continue</Button>
      </div>
      {/* <UploadNotification
        desc="File upload completed successfully ,Go to uploads to view uploaded content!"
        title="Upload Successful"
        onCancel={() => {}}
        onContinue={() => {}}
        primaryText="View Uploads"
        secondaryText="Back to Submit"
        
      /> */}
    </section>
  );
};

export default Distribute;
