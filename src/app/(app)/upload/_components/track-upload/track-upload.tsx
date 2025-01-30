"use client";
import React, { useCallback } from "react";
import uploadPlaceholder from "@/app/assets/upload-placeholder.png";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UploadStatusCard from "../upload-status-card/upload-status-card";
import UploadInfo from "../upload-info/upload-info";
import useUploadMusicStore from "@/stores/upload-music.store";
import { convertFileSize } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { UPLOAD_STEPS } from "@/lib/constants";
const TrackUpload = () => {
  const {
    updateMusicUpload,
    musicUpload: { trackCover, musicInfo },
    changeStep,
  } = useUploadMusicStore((s) => s);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        updateMusicUpload({ trackCover: acceptedFiles[0] });
      }
    },
    [updateMusicUpload]
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [],
      "video/*": [],
    },

    multiple: false,
  });
  const dropZoneProps = getRootProps();
  return (
    <div>
      <h2 className="p-[10px] w-fit mx-auto font-inter font-semibold text-xl text-custom-primary mb-16">
        Track Upload
      </h2>
      <div className="flex items-center justify-center gap-14">
        <div {...dropZoneProps} className="w-full  max-w-[452px]">
          <input {...getInputProps()} />
          {trackCover ? (
            <>
              <UploadInfo
                artsitName={musicInfo.publisher}
                songName={musicInfo.song_title}
              />
              <UploadStatusCard
                fileName={trackCover.name}
                fileSize={convertFileSize(trackCover.size)}
              />
            </>
          ) : (
            <div className="border-4 h-[344px] border-dashed border-custom-primary aspect-square rounded-[14.28px] w-full grid place-items-center cursor-pointer relative">
              <Image src={uploadPlaceholder} alt="" />

              {isDragActive && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 text-white font-plus-jakarta-sans font-extrabold text-3xl grid place-items-center">
                  Drop Here
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <p className="font-plus-jakarta-sans text-white font-extrabold text-[17px] mb-3">
            Track upload requirements
          </p>
          <ul className="marker:text-white list-disc">
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              File format: MP3, MP4
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Size: at least 3000x3000 pixels
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              File size: Image file size cannot be greater than 35 MB
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Video mode: Best quality
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Resolution: 72 dpi
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Your track must not contain any logos, website address, release
              dates or advertisements of any kind.
            </li>
          </ul>
          <Button
            className="h-auth-btn max-w-[275px]"
            variant={"authBtn"}
            onClick={open}
          >
            Browser
          </Button>
        </div>
      </div>

      {trackCover && (
        <Button
          className="h-auth-btn max-w-[275px] mx-auto mt-32 "
          variant={"authBtn"}
          onClick={() => changeStep(UPLOAD_STEPS.MUSIC_COVER)}
        >
          Save &amp; Continue <MoveRight width={24} />
        </Button>
      )}
    </div>
  );
};

export default TrackUpload;
