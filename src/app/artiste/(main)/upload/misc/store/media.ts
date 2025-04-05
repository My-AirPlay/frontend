import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type MediaType = 'Track' | 'Video' | 'PlayBack';
export type TMediaUploadStep = 'selection' | 'musicInfo' | 'trackUpload' | 'coverArt' | 'distribution' | 'preview' | 'complete';



export interface MediaUploadInfo {
  title: string;
  artistName: string;
  mainGenre: string;
  releaseDate: string;
  originalReleaseDate: string;
  description: string;
  recordLabel: string;
  publisher: string;
  copyright: string;
  explicitContent: string;
  lyrics: string;
  universalProductCode: string;
  releaseVersion: string;
  streamingPlatforms: string[];
}

export interface MediaUploadState {
  currentStep: TMediaUploadStep;
  mediaType: MediaType | null;
  mediaFile: File | null;
  coverArtFile: File | null;
  mediaInfo: MediaUploadInfo;
  streamingPlatforms: string[];
  clearStore: () => void;
  setCurrentStep: (step: TMediaUploadStep) => void;
  setMediaType: (type: MediaType) => void;
  setMediaFile: (file: File | null) => void;
  setCoverArtFile: (file: File | null) => void;
  updateMediaInfo: (info: Partial<MediaUploadInfo>) => void;
  togglePlatform: (platform: string) => void;
  hasOngoingUpload: () => boolean;
}

const defaultMediaInfo: MediaUploadInfo = {
  title: '',
  artistName: '',
  mainGenre: '',
  releaseDate: new Date().toISOString(),
  originalReleaseDate: new Date().toISOString(),
  description: '',
  recordLabel: '',
  publisher: '',
  copyright: '',
  explicitContent: '',
  lyrics: '',
  universalProductCode: '',
  releaseVersion: '',
  streamingPlatforms: []
};


export const useMediaUploadStore = create<MediaUploadState>()(
  devtools(
    persist(
      (set, get) => ({
        currentStep: 'selection',
        mediaType: null,
        mediaFile: null,
        coverArtFile: null,
        mediaInfo: { ...defaultMediaInfo },
        streamingPlatforms: ['Spotify', 'Apple Music', 'YouTube', 'Tidal', 'Amazon', 'Deezer', 'Pandora', 'Audiomack'],
        clearStore: () => set({
          currentStep: 'selection',
          mediaType: null,
          mediaFile: null,
          coverArtFile: null,
          mediaInfo: { ...defaultMediaInfo },
          streamingPlatforms: ['Spotify', 'Apple Music', 'YouTube', 'Tidal', 'Amazon', 'Deezer', 'Pandora', 'Audiomack'],

        }),
        setCurrentStep: (step) => {
          console.log("Setting media current step to:", step);
          set({ currentStep: step });
        },
        setMediaType: (type) => set({ mediaType: type }),
        setMediaFile: (file) => set({ mediaFile: file }),
        setCoverArtFile: (file) => set({ coverArtFile: file }),
        updateMediaInfo: (info) => set((state) => ({
          mediaInfo: { ...state.mediaInfo, ...info }
        })),
        togglePlatform: (platform) => set((state) => {
          const exists = state.streamingPlatforms.includes(platform);
          return {
            streamingPlatforms: exists
              ? state.streamingPlatforms.filter((p) => p !== platform)
              : [...state.streamingPlatforms, platform]
          };
        }),
        hasOngoingUpload: () => {
          const state = get();
          return state.mediaFile !== null ||
            state.coverArtFile !== null ||
            Object.values(state.mediaInfo).some(val =>
              val !== '' && Array.isArray(val) ? val.length > 0 : true
            );
        }
      }),
      {
        name: 'media-upload-storage',
        partialize: (state) => ({
          currentStep: state.currentStep,
          mediaType: state.mediaType,
          mediaInfo: state.mediaInfo,
          streamingPlatforms: state.streamingPlatforms,
        }),
      }
    )
  )
);
