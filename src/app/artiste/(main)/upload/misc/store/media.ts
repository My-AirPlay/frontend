import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import * as idb from '../index-db/media-db';

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
	mediaFileId: string | null;
	coverArtId: string | null;
	mediaInfo: MediaUploadInfo;
	streamingPlatforms: string[];
	isDBInitialized: boolean;

	// Actions
	initializeDB: () => Promise<void>;
	clearStore: () => Promise<void>;
	setCurrentStep: (step: TMediaUploadStep) => void;
	setMediaType: (type: MediaType) => void;
	setMediaFile: (file: File) => Promise<string | null>;
	getMediaFile: () => Promise<File | null>;
	setCoverArt: (file: File) => Promise<string | null>;
	getCoverArtFile: () => Promise<File | null>;
	updateMediaInfo: (info: Partial<MediaUploadInfo>) => Promise<void>;
	togglePlatform: (platform: string) => void;
	hasOngoingUpload: () => boolean;
}

// SINGLE SOURCE OF TRUTH for default state
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
	streamingPlatforms: ['7Digital', 'ACRCloud', 'Alibaba', 'Amazon', 'AMI Entertainment', 'Anghami', 'Apple Music', 'iTunes', 'Audible Magic', 'Audiomack', 'Beatsource', 'BMAT', 'Claro', 'ClicknClear', "d'Music", 'Deezer', 'Facebook / Instagram', 'Gracenote', 'iHeartRadio', 'JioSaavn', 'JOOX', 'Kan Music', 'KDM (K Digital Media)', 'KK Box', 'LiveOne', 'Medianet', 'Mixcloud', 'Mood Media', 'NetEase', 'Pandora', 'Peloton', 'Pretzel', 'Qobuz', 'Soundcloud', 'SoundExchange', 'Spotify', 'Tencent', 'Tidal', 'TikTok', 'TouchTunes', 'Trebel', 'Tuned Global', 'USEA', 'VL Group', 'YouSee / Telmore Musik', 'YouTube']
};

export const useMediaUploadStore = create<MediaUploadState>()(
	devtools(
		persist(
			(set, get) => ({
				// Initial State
				currentStep: 'selection',
				mediaType: null,
				mediaFileId: null,
				coverArtId: null,
				mediaInfo: { ...defaultMediaInfo },
				streamingPlatforms: ['7Digital', 'ACRCloud', 'Alibaba', 'Amazon', 'AMI Entertainment', 'Anghami', 'Apple Music', 'iTunes', 'Audible Magic', 'Audiomack', 'Beatsource', 'BMAT', 'Claro', 'ClicknClear', "d'Music", 'Deezer', 'Facebook / Instagram', 'Gracenote', 'iHeartRadio', 'JioSaavn', 'JOOX', 'Kan Music', 'KDM (K Digital Media)', 'KK Box', 'LiveOne', 'Medianet', 'Mixcloud', 'Mood Media', 'NetEase', 'Pandora', 'Peloton', 'Pretzel', 'Qobuz', 'Soundcloud', 'SoundExchange', 'Spotify', 'Tencent', 'Tidal', 'TikTok', 'TouchTunes', 'Trebel', 'Tuned Global', 'USEA', 'VL Group', 'YouSee / Telmore Musik', 'YouTube'],
				isDBInitialized: false,

				initializeDB: async () => {
					if (get().isDBInitialized) return; // Prevent re-initialization
					const success = await idb.initMediaDB();
					if (success) {
						set({ isDBInitialized: true });
					}
				},

				clearStore: async () => {
					// Clear IndexedDB stores
					if (get().isDBInitialized) {
						await idb.clearMediaDatabase();
					}

					// Reset state
					set({
						currentStep: 'selection',
						mediaType: null,
						mediaFileId: null,
						coverArtId: null,
						mediaInfo: { ...defaultMediaInfo }
					});
				},

				setCurrentStep: step => {
					console.log('Setting media current step to:', step);
					set({ currentStep: step });
				},

				setMediaType: type => set({ mediaType: type }),

				setMediaFile: async file => {
					if (!get().isDBInitialized) await get().initializeDB();
					const currentId = get().mediaFileId;

					// If no file is provided, delete the old one
					if (!file) {
						if (currentId) await idb.deleteMediaFile(currentId);
						set({ mediaFileId: null });
						return null;
					}

					try {
						const mediaType = get().mediaType || 'Track';
						// Store in IndexedDB
						const success = await idb.storeMediaFile('media-file', file, mediaType);
						if (success) {
							set({ mediaFileId: 'media-file' });
							return 'media-file';
						}
						return null;
					} catch (error) {
						console.error('Error storing media file in IndexedDB:', error);
						return null;
					}
				},

				getMediaFile: async () => {
					if (!get().mediaFileId || !get().isDBInitialized) return null;
					return await idb.getMediaFile(get().mediaFileId!);
				},

				setCoverArt: async file => {
					if (!get().isDBInitialized) {
						await get().initializeDB();
					}

					if (!file) {
						if (get().coverArtId) {
							await idb.deleteMediaFile(get().coverArtId);
							set({ coverArtId: null });
						}
						return null;
					}

					try {
						// Store in IndexedDB
						const success = await idb.storeMediaCoverArt('media-cover', file);
						if (success) {
							set({ coverArtId: 'media-cover' });
							return 'media-cover';
						}
						return null;
					} catch (error) {
						console.error('Error storing cover art in IndexedDB:', error);
						return null;
					}
				},

				getCoverArtFile: async () => {
					if (!get().coverArtId || !get().isDBInitialized) return null;
					return await idb.getMediaCoverArt(get().coverArtId);
				},

				updateMediaInfo: async info => {
					const updatedInfo = {
						...get().mediaInfo,
						...info,
						id: 'media-info' // Ensure ID is set for IndexedDB
					};

					set({ mediaInfo: updatedInfo });

					// Store in IndexedDB if initialized
					if (get().isDBInitialized) {
						await idb.storeMediaInfo('media-info', updatedInfo);
					}
				},

				togglePlatform: platform => {
					const exists = get().streamingPlatforms.includes(platform);
					const updatedPlatforms = exists ? get().streamingPlatforms.filter(p => p !== platform) : [...get().streamingPlatforms, platform];

					set({ streamingPlatforms: updatedPlatforms });

					// Update media info with new platforms
					get().updateMediaInfo({ streamingPlatforms: updatedPlatforms });
				},

				hasOngoingUpload: () => {
					const state = get();
					return state.mediaFileId !== null || state.coverArtId !== null || Object.values(state.mediaInfo).some(val => (val !== '' && Array.isArray(val) ? val.length > 0 : true));
				}
			}),
			{
				name: 'media-upload-storage',
				partialize: state => ({
					currentStep: state.currentStep,
					mediaType: state.mediaType,
					// Don't persist large binary data in localStorage
					mediaFileId: state.mediaFileId,
					coverArtId: state.coverArtId,
					mediaInfo: state.mediaInfo,
					streamingPlatforms: state.streamingPlatforms
				})
			}
		)
	)
);
