import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadPlaceholder from "@/app/assets/upload-placeholder.png";
import Image from "next/image";
import UploadInfo from "../upload-info/upload-info";
import UploadStatusCard from "../upload-status-card/upload-status-card";
import useUploadMusicStore from "@/stores/upload-music.store";
import { convertFileSize } from "@/lib/utils";
import { UPLOAD_STEPS } from "@/lib/constants";
import { MoveRight } from "lucide-react";

const MusicCover = () => {
  const {
    changeStep,
    musicUpload: { musicCover, musicInfo },
    updateMusicUpload,
  } = useUploadMusicStore((s) => s);
  const [imageCover, setImageCover] = useState("");
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        updateMusicUpload({ musicCover: acceptedFiles[0] });
      }
    },
    [updateMusicUpload]
  );

  useEffect(() => {
    const getCoverImg = () => {
      if (!musicCover) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setImageCover(reader.result);
        }
      };
      reader.readAsDataURL(musicCover);
    };
    getCoverImg();
  }, [musicCover]);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },

    multiple: false,
  });
  const dropZoneProps = getRootProps();
  return (
    <div>
      <h2 className="p-[10px] w-fit mx-auto font-inter font-semibold text-xl text-custom-primary mb-4">
        Music Cover
      </h2>
      <p className="font-plus-jakarta-sans font-normal text-white text-base max-w-[990px] mb-9">
        This is the cover that will be displayed to your listeners when they
        listen to your music, kindly look through the requirements and adhere as
        follows.
      </p>
      <div className="grid md:grid-cols-2 gap-14">
        <div className="flex items-center justify-center gap-14">
          <div {...dropZoneProps} className="w-full  max-w-[452px]">
            <input {...getInputProps()} />
            {musicCover ? (
              <>
                <UploadInfo
                  artsitName={musicInfo.publisher}
                  songName={musicInfo.song_title}
                  img={imageCover}
                />
                <UploadStatusCard
                  fileName={musicCover.name}
                  fileSize={convertFileSize(musicCover.size)}
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
        </div>
        <div className="max-w-[424px]">
          <p className="font-plus-jakarta-sans text-white font-extrabold text-[17px] mb-3">
            Artwork upload requirements
          </p>
          <ul className="marker:text-white list-disc">
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              File format: JPG, PNG
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Size: at least 3000x3000 pixels
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              File size: Image file size cannot be greater than 35 MB
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Color mode: Best quality RGB (including black and white images)
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Resolution: 72 dpi
            </li>
            <li className="font-plus-jakarta-sans text-base text-white font-medium">
              Your cover art must not contain any logos, website address,
              release dates or advertisements of any kind.
            </li>
          </ul>
          <Button
            className="h-auth-btn mt-5 max-w-[275px]"
            variant={"authBtn"}
            onClick={open}
          >
            Browser
          </Button>
        </div>
      </div>
      {musicCover && (
        <Button
          className="h-auth-btn max-w-[275px] mx-auto mt-32 "
          variant={"authBtn"}
          onClick={() => changeStep(UPLOAD_STEPS.DISTRIBUTION_PREFERENCE)}
        >
          Save &amp; Continue <MoveRight width={24} />
        </Button>
      )}
    </div>
  );
};

export default MusicCover;
