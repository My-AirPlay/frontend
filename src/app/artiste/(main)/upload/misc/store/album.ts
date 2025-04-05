import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type AlbumType = 'Album' | 'ExtendedPlaylist' | 'MixTape';
export type AlbumUploadStep = 'selection' | 'musicInfo' | 'trackUpload' | 'coverArt' | 'distribution' | 'preview' | 'complete';


export interface AlbumInfo {
  title: string;
  artistName: string;
  mainGenre: string;
  secondaryGenres?: string[];
  releaseDate: string;
  description: string;
  recordLabel: string;
  publisher: string;
  instruments?: string[];
  explicitContent: string;
  universalProductCode: string;
  releaseVersion: string;
  copyright: string;
  streamingPlatforms: string[];
}

export interface AlbumTrackInfo {
  title: string;
  artistName: string;
  mainGenre: string;
  secondaryGenres?: string[];
  releaseDate: string;
  description: string;
  recordLabel: string;
  publisher: string;
  instruments?: string[];
  lyrics: string;
  explicitContent: string;
  universalProductCode: string;
  releaseVersion: string;
  copyright: string;
  fileType: string;
  streamingPlatforms: string[];
}

export interface AlbumUploadState {
  currentStep: AlbumUploadStep;
  albumType: AlbumType | null;
  coverArtFile: File | null;
  albumInfo: AlbumInfo;
  albumTracks: AlbumTrackInfo[];
  mediaFiles: File[];
  streamingPlatforms: string[];
  clearStore: () => void;
  setCurrentStep: (step: AlbumUploadStep) => void;
  setAlbumType: (type: AlbumType) => void;
  setCoverArtFile: (file: File | null) => void;
  updateAlbumInfo: (info: Partial<AlbumInfo>) => void;
  togglePlatform: (id: string) => void;
  addTrack: (track: AlbumTrackInfo) => void;
  updateTrack: (index: number, track: Partial<AlbumTrackInfo>) => void;
  removeTrack: (index: number) => void;
  addMediaFile: (file: File) => void;
  removeMediaFile: (index: number) => void;
  hasOngoingUpload: () => boolean;
}

const defaultAlbumInfo: AlbumInfo = {
  title: '',
  artistName: '',
  mainGenre: '',
  releaseDate: '',
  description: '',
  recordLabel: '',
  publisher: '',
  copyright: '',
  explicitContent: '',
  universalProductCode: '',
  releaseVersion: '',
  streamingPlatforms: []
};

export const useAlbumUploadStore = create<AlbumUploadState>()(
  devtools(
    persist(
      (set, get) => ({
        currentStep: 'selection',
        albumType: null,
        coverArtFile: null,
        albumInfo: { ...defaultAlbumInfo },
        albumTracks: [],
        mediaFiles: [],
        streamingPlatforms: ['Spotify', 'Apple Music', 'YouTube', 'Audiomack'],
        clearStore: () => set({
          currentStep: 'selection',
          albumType: null,
          coverArtFile: null,
          albumInfo: { ...defaultAlbumInfo },
          albumTracks: [],
          mediaFiles: [],
          streamingPlatforms: ['Spotify', 'Apple Music', 'YouTube', 'Audiomack'],
        }),
        setCurrentStep: (step) => {
          console.log("Setting album current step to:", step);
          set({ currentStep: step });
        },
        setAlbumType: (type) => set({ albumType: type }),
        setCoverArtFile: (file) => set({ coverArtFile: file }),
        updateAlbumInfo: (info) => set((state) => ({
          albumInfo: { ...state.albumInfo, ...info }
        })),
        togglePlatform: (platform) => set((state) => {
          const exists = state.streamingPlatforms.includes(platform);
          return {
            streamingPlatforms: exists
              ? state.streamingPlatforms.filter((p) => p !== platform)
              : [...state.streamingPlatforms, platform]
          };
        }),
        addTrack: (track) => set((state) => ({
          albumTracks: [...state.albumTracks, track]
        })),
        updateTrack: (index, track) => set((state) => {
          const updatedTracks = [...state.albumTracks];
          updatedTracks[index] = { ...updatedTracks[index], ...track };
          return { albumTracks: updatedTracks };
        }),
        removeTrack: (index) => set((state) => {
          const updatedTracks = [...state.albumTracks];
          updatedTracks.splice(index, 1);
          return { albumTracks: updatedTracks };
        }),
        addMediaFile: (file) => set((state) => ({
          mediaFiles: [...state.mediaFiles, file]
        })),
        removeMediaFile: (index) => set((state) => {
          const updatedFiles = [...state.mediaFiles];
          updatedFiles.splice(index, 1);
          return { mediaFiles: updatedFiles };
        }),
        hasOngoingUpload: () => {
          const state = get();
          return state.albumTracks.length > 0 ||
            state.mediaFiles.length > 0 ||
            state.coverArtFile !== null ||
            Object.values(state.albumInfo).some(val =>
              val !== '' && Array.isArray(val) ? val.length > 0 : true
            );
        }
      }),
      {
        name: 'album-upload-storage',
        partialize: (state) => ({
          currentStep: state.currentStep,
          albumType: state.albumType,
          albumInfo: state.albumInfo,
          albumTracks: state.albumTracks,
          streamingPlatforms: state.streamingPlatforms,
        }),
      }
    )
  )
);