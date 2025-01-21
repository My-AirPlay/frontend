import { UPLOAD_STEPS, UPLOAD_TYPE } from "@/lib/constants";
import { create } from "zustand";
import { InferType } from "yup";
import { musicInfoSchema } from "@/lib/schemas";

type MusicUpload = {
  musicInfo: InferType<typeof musicInfoSchema>;
  trackCover: File | null;
  musicCover: File | null;
};
interface UploadMusicStore {
  uploadType: UPLOAD_TYPE | null;
  setUploadType: (a: UPLOAD_TYPE) => void;
  currentStep: UPLOAD_STEPS;
  setCurrentStep: (step: UPLOAD_STEPS) => void;
  setCompletedSteps: (step: UPLOAD_STEPS) => void;
  completedSteps: UPLOAD_STEPS[];
  musicUpload: MusicUpload;
  updateMusicUpload: (musicUpload: Partial<MusicUpload>) => void;
  changeStep: (nextStep: UPLOAD_STEPS) => void;
}

const defaultMusicUpload: UploadMusicStore["musicUpload"] = {
  musicInfo: {
    copyright: "",
    description: "",
    genre: "",
    instruments_played: "",
    iscCode: "",
    lyrics: "",
    publisher: "",
    realease_version: "",
    record_label: "",
    release_date: "",
    song_title: "",
    upcCode: "",
    explict_content: "",
  },
  trackCover: null,
  musicCover: null,
};
const useUploadMusicStore = create<UploadMusicStore>()((set, get) => ({
  uploadType: null,
  currentStep: UPLOAD_STEPS.MUSIC_INFO,
  completedSteps: [],
  musicUpload: defaultMusicUpload,
  setUploadType: (uploadType) => {
    set({ uploadType });
  },
  setCurrentStep(currentStep) {
    set({ currentStep });
  },
  setCompletedSteps(step) {
    const { completedSteps } = get();
    if (!completedSteps.includes(step)) {
      set({ completedSteps: [...completedSteps, step] });
    }
  },
  updateMusicUpload(updatedMusicUpload) {
    const { musicUpload } = get();
    set({ musicUpload: { ...musicUpload, ...updatedMusicUpload } });
  },
  changeStep(nextStep) {
    const { currentStep, completedSteps } = get();

    set({
      currentStep: nextStep,
      completedSteps: [...completedSteps, currentStep],
    });
  },
}));

export default useUploadMusicStore;
