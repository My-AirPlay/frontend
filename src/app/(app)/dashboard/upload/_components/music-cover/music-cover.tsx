import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadPlaceholder from "@/app/assets/upload-placeholder.png";
import Image from "next/image";

const MusicCover = () => {
  const [selectedFile, setSelected] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setSelected(acceptedFiles[0]?.name);
    }
  }, []);
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
      <div className="flex items-center justify-center gap-14">
        <div
          {...dropZoneProps}
          className="h-[344] max-w-[452px] border-4 border-dashed border-custom-primary aspect-square rounded-[14.28px] w-full grid place-items-center cursor-pointer relative"
        >
          <input {...getInputProps()} />
          <Image src={uploadPlaceholder} alt="" />
          {selectedFile && (
            <p className="text-white font-plus-jakarta-sans text-lg">
              {selectedFile}
            </p>
          )}
          {isDragActive && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 text-white font-plus-jakarta-sans font-extrabold text-3xl grid place-items-center">
              Drop Here
            </div>
          )}
        </div>
        <div>
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
          <div className="flex gap-4  mt-5">
            {selectedFile && (
              <Button
                variant={"authBtn"}
                className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
                onClick={open}
              >
                Edit
              </Button>
            )}
            <Button
              className="h-auth-btn max-w-[275px]"
              variant={"authBtn"}
              onClick={() => {
                if (!selectedFile) {
                  open();
                }
              }}
            >
              {selectedFile ? "Continue" : "Browser"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCover;
