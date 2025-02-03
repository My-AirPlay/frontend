import React from "react";
import uploadPlaceholder from "@/app/assets/upload-sm.svg";
import Image from "next/image";
const Uploader = () => {
  return (
    <div className="border-[2.97px] border-dashed border-custom-primary flex flex-col gap-2 rounded-2xl">
      <figure className=" mx-auto">
        <Image src={uploadPlaceholder} alt="" />
      </figure>
      <p className="text-custom-uploader-text font-plus-jakarta-sans text-base font-medium p-1 mx-auto w-fit text-center">
        Drag & drop files or{" "}
        <button className="underline text-custom-primary">Browse</button>
      </p>
      <p className="text-custom-uploader-text font-plus-jakarta-sans text-base font-medium p-1 mx-auto w-fit text-center">
        Supported formats: JPEG, PNG, GIF, MP4
      </p>
    </div>
  );
};

export default Uploader;
