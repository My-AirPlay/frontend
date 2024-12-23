"use client";
import { useState } from "react";
import UploadStep from "./_components/upload-step/upload-step";
import { uploadSteps } from "@/lib/constants";
import MusicInfo from "./_components/music-info/music-info";

const UploadMusicPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <h1 className="font-plus-jakarta-sans font-semibold text-2xl mb-10 text-center text-white">
        Upload Music
      </h1>

      <ul className="grid grid-cols-5 max-w-[730px] mx-auto mb-[50px]">
        {uploadSteps.map((step, i) => (
          <UploadStep
            key={i}
            text={`${i + 1}`}
            isCurrent={currentStep === i}
            isDone={currentStep > i}
            title={step}
          />
        ))}
      </ul>

      <MusicInfo />
    </div>
  );
};

export default UploadMusicPage;
