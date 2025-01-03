"use client";
import { useState } from "react";
import UploadStep from "./_components/upload-step/upload-step";
import { uploadSteps } from "@/lib/constants";
import MusicInfo from "./_components/music-info/music-info";
import TrackUpload from "./_components/track-upload/track-upload";
import MusicCover from "./_components/music-cover/music-cover";
import UploadPreference from "./_components/preference/preference";
import Distribute from "./_components/distribute/distribute";

const UploadMusicPage = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([0, 1, 2, 3]);
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
            isDone={completedSteps.includes(i)}
            title={step}
          />
        ))}
      </ul>

      <Distribute />
    </div>
  );
};

export default UploadMusicPage;
