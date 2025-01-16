import { UPLOAD_STEPS, UPLOAD_TYPE } from "@/lib/constants";
import { create } from "zustand";
interface UploadMusicStore {
  uploadType: UPLOAD_TYPE | null;
  setUploadType: (a: UPLOAD_TYPE) => void;
  currentStep: UPLOAD_STEPS;
  setCurrentStep: (step: UPLOAD_STEPS) => void;
  setCompletedSteps: (step: UPLOAD_STEPS) => void;
  completedSteps: UPLOAD_STEPS[];
}

const useUploadMusicStore = create<UploadMusicStore>()((set, get) => ({
  uploadType: null,
  currentStep: UPLOAD_STEPS.MUSIC_INFO,
  completedSteps: [],
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
}));

export default useUploadMusicStore;
