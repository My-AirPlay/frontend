"use client";

import { UPLOAD_STEPS, uploadSteps } from "@/lib/constants";
import UploadStep from "../upload-step/upload-step";
import { ReactNode } from "react";
import MusicCover from "../music-cover/music-cover";
import MusicInfo from "../music-info/music-info";
import useUploadMusicStore from "@/stores/upload-music.store";
import TrackUpload from "../track-upload/track-upload";
import Distribute from "../distribute/distribute";
import UploadPreference from "../preference/preference";
interface UploadScreen {
  [key: string]: ReactNode;
}
const UploadFlow = () => {
  const { currentStep, completedSteps } = useUploadMusicStore((s) => s);

  const screens: UploadScreen = {
    [UPLOAD_STEPS.MUSIC_INFO]: <MusicInfo />,
    [UPLOAD_STEPS.TRACK_UPLOAD]: <TrackUpload />,
    [UPLOAD_STEPS.MUSIC_COVER]: <MusicCover />,
    [UPLOAD_STEPS.DISTRIBUTION_PREFERENCE]: <UploadPreference />,
    [UPLOAD_STEPS.PREVIEW]: <Distribute />,
  };
  return (
    <section>
      <h1 className="font-plus-jakarta-sans font-semibold text-2xl mb-10 text-center text-white">
        Upload Music
      </h1>

      <ul className="grid grid-cols-5 max-w-[730px] mx-auto mb-[50px]">
        {uploadSteps.map(({ step, title }, i) => (
          <UploadStep
            key={i}
            text={`${i + 1}`}
            isCurrent={currentStep === step}
            isDone={completedSteps.includes(step)}
            title={title}
          />
        ))}
      </ul>

      {screens[currentStep]}
    </section>
  );
};

export default UploadFlow;
