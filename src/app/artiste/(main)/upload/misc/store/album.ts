import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import * as idb from '../index-db/album-db';
import { generateId } from '../index-db';

export type AlbumType = 'Album' | 'ExtendedPlaylist' | 'MixTape';
export type AlbumUploadStep = 'selection' | 'musicInfo' | 'trackUpload' | 'coverArt' | 'distribution' | 'preview' | 'complete';

export interface AlbumInfo {
	id?: string;
	title: string;
	artistName: string;
	mainGenre: string;
	secondaryGenres?: string[];
	releaseDate: string;
	originalReleaseDate?: string;
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
	id?: string;
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
	fileId?: string;
}

export interface AlbumUploadState {
	currentStep: AlbumUploadStep;
	albumType: AlbumType | null;
	coverArtId: string | null;
	albumInfo: AlbumInfo;
	albumTracks: AlbumTrackInfo[];
	mediaFileIds: string[];
	streamingPlatforms: string[];
	isDBInitialized: boolean;

	// Actions
	initializeDB: () => Promise<void>;
	clearStore: () => Promise<void>;
	setCurrentStep: (step: AlbumUploadStep) => void;
	setAlbumType: (type: AlbumType) => void;
	setCoverArt: (file: File) => Promise<string | null>;
	getCoverArtFile: () => Promise<File | null>;
	updateAlbumInfo: (info: Partial<AlbumInfo>) => Promise<void>;
	togglePlatform: (id: string) => void;
	addTrack: (track: AlbumTrackInfo, file: File) => Promise<void>;
	updateTrack: (index: number, track: Partial<AlbumTrackInfo>) => Promise<void>;
	removeTrack: (index: number) => Promise<void>;
	getMediaFile: (id: string) => Promise<File | null>;
	removeMediaFile: (id: string) => Promise<void>;
	hasOngoingUpload: () => boolean;
}

const defaultAlbumInfo: AlbumInfo = {
	id: 'album-info',
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
	streamingPlatforms: ['7Digital', 'ACRCloud', 'Alibaba', 'Amazon', 'AMI Entertainment', 'Anghami', 'Apple Music', 'iTunes', 'Audible Magic', 'Audiomack', 'Beatsource', 'BMAT', 'Claro', 'ClicknClear', "d'Music", 'Deezer', 'Facebook / Instagram', 'Gracenote', 'iHeartRadio', 'JioSaavn', 'JOOX', 'Kan Music', 'KDM (K Digital Media)', 'KK Box', 'LiveOne', 'Medianet', 'Mixcloud', 'Mood Media', 'NetEase', 'Pandora', 'Peloton', 'Pretzel', 'Qobuz', 'Soundcloud', 'SoundExchange', 'Spotify', 'Tencent', 'Tidal', 'TikTok', 'TouchTunes', 'Trebel', 'Tuned Global', 'USEA', 'VL Group', 'YouSee / Telmore Musik', 'YouTube']
};

export const useAlbumUploadStore = create<AlbumUploadState>()(
	devtools(
		persist(
			(set, get) => ({
				currentStep: 'selection',
				albumType: null,
				coverArtId: null,
				albumInfo: { ...defaultAlbumInfo },
				albumTracks: [],
				mediaFileIds: [],
				streamingPlatforms: ['7Digital', 'ACRCloud', 'Alibaba', 'Amazon', 'AMI Entertainment', 'Anghami', 'Apple Music', 'iTunes', 'Audible Magic', 'Audiomack', 'Beatsource', 'BMAT', 'Claro', 'ClicknClear', "d'Music", 'Deezer', 'Facebook / Instagram', 'Gracenote', 'iHeartRadio', 'JioSaavn', 'JOOX', 'Kan Music', 'KDM (K Digital Media)', 'KK Box', 'LiveOne', 'Medianet', 'Mixcloud', 'Mood Media', 'NetEase', 'Pandora', 'Peloton', 'Pretzel', 'Qobuz', 'Soundcloud', 'SoundExchange', 'Spotify', 'Tencent', 'Tidal', 'TikTok', 'TouchTunes', 'Trebel', 'Tuned Global', 'USEA', 'VL Group', 'YouSee / Telmore Musik', 'YouTube'],
				isDBInitialized: false,

				initializeDB: async () => {
					const success = await idb.initAlbumDB();
					if (success) {
						set({ isDBInitialized: true });

						// Load album info from IndexedDB if it exists
						try {
							const storedInfo = await idb.getAlbumInfo('album-info');
							if (storedInfo) {
								set({ albumInfo: storedInfo });
							}

							// Load tracks info
							const trackInfos = await idb.getAllTrackInfo();
							if (trackInfos && trackInfos.length > 0) {
								const fileIds = trackInfos.map(track => track.fileId).filter(Boolean);

								set({
									albumTracks: trackInfos,
									mediaFileIds: fileIds
								});
							}

							// Check if cover art exists
							const coverArt = await idb.getAlbumCoverArt('album-cover');
							if (coverArt) {
								set({ coverArtId: 'album-cover' });
							}
						} catch (error) {
							console.error('Error loading data from IndexedDB:', error);
						}
					}
				},

				clearStore: async () => {
					// Clear IndexedDB stores
					if (get().isDBInitialized) {
						await idb.clearAlbumDatabase();
					}

					// Reset state
					set({
						currentStep: 'selection',
						albumType: null,
						coverArtId: null,
						albumInfo: { ...defaultAlbumInfo },
						albumTracks: [],
						mediaFileIds: [],
						streamingPlatforms: ['7Digital', 'ACRCloud', 'Alibaba', 'Amazon', 'AMI Entertainment', 'Anghami', 'Apple Music', 'iTunes', 'Audible Magic', 'Audiomack', 'Beatsource', 'BMAT', 'Claro', 'ClicknClear', "d'Music", 'Deezer', 'Facebook / Instagram', 'Gracenote', 'iHeartRadio', 'JioSaavn', 'JOOX', 'Kan Music', 'KDM (K Digital Media)', 'KK Box', 'LiveOne', 'Medianet', 'Mixcloud', 'Mood Media', 'NetEase', 'Pandora', 'Peloton', 'Pretzel', 'Qobuz', 'Soundcloud', 'SoundExchange', 'Spotify', 'Tencent', 'Tidal', 'TikTok', 'TouchTunes', 'Trebel', 'Tuned Global', 'USEA', 'VL Group', 'YouSee / Telmore Musik', 'YouTube']
					});
				},

				setCurrentStep: step => {
					console.log('Setting album current step to:', step);
					set({ currentStep: step });
				},

				setAlbumType: type => set({ albumType: type }),

				setCoverArt: async file => {
					if (!get().isDBInitialized) {
						await get().initializeDB();
					}

					try {
						// Store in IndexedDB
						const success = await idb.storeAlbumCoverArt('album-cover', file);
						if (success) {
							set({ coverArtId: 'album-cover' });
							return 'album-cover';
						}
						return null;
					} catch (error) {
						console.error('Error storing cover art in IndexedDB:', error);
						return null;
					}
				},

				getCoverArtFile: async () => {
					if (!get().coverArtId || !get().isDBInitialized) return null;
					return await idb.getAlbumCoverArt(get().coverArtId);
				},

				updateAlbumInfo: async info => {
					const updatedInfo = {
						...get().albumInfo,
						...info,
						id: 'album-info' // Ensure ID is set for IndexedDB
					};

					set({ albumInfo: updatedInfo });

					// Store in IndexedDB if initialized
					if (get().isDBInitialized) {
						await idb.storeAlbumInfo('album-info', updatedInfo);
					}
				},

				togglePlatform: platform => {
					const exists = get().streamingPlatforms.includes(platform);
					const updatedPlatforms = exists ? get().streamingPlatforms.filter(p => p !== platform) : [...get().streamingPlatforms, platform];

					set({ streamingPlatforms: updatedPlatforms });

					get().updateAlbumInfo({ streamingPlatforms: updatedPlatforms });
				},

				addTrack: async (track, file) => {
					if (!get().isDBInitialized) {
						await get().initializeDB();
					}

					try {
						// Generate unique ID for the track and file
						const fileId = generateId();

						// Store file in IndexedDB
						await idb.storeAlbumTrackFile(fileId, file);

						// Add file ID to track and store track info
						const trackWithId: AlbumTrackInfo = {
							...track,
							id: fileId,
							fileId
						};

						// Store track info
						await idb.storeTrackInfo(fileId, trackWithId);

						// Update state
						const updatedTracks = [...get().albumTracks, trackWithId];
						const updatedFileIds = [...get().mediaFileIds, fileId];

						set({
							albumTracks: updatedTracks,
							mediaFileIds: updatedFileIds
						});
					} catch (error) {
						console.error('Error adding track to IndexedDB:', error);
					}
				},

				updateTrack: async (index, track) => {
					const updatedTracks = [...get().albumTracks];
					const trackToUpdate = { ...updatedTracks[index], ...track };
					updatedTracks[index] = trackToUpdate;

					set({ albumTracks: updatedTracks });

					// Update in IndexedDB if initialized
					if (get().isDBInitialized && trackToUpdate.id) {
						await idb.storeTrackInfo(trackToUpdate.id, trackToUpdate);
					}
				},

				removeTrack: async index => {
					const trackToRemove = get().albumTracks[index];
					const trackId = trackToRemove.id;
					const fileId = trackToRemove.fileId;

					// Remove from state
					const updatedTracks = [...get().albumTracks];
					updatedTracks.splice(index, 1);

					const updatedFileIds = get().mediaFileIds.filter(id => id !== fileId);

					set({
						albumTracks: updatedTracks,
						mediaFileIds: updatedFileIds
					});

					// Remove from IndexedDB if initialized
					if (get().isDBInitialized && trackId) {
						if (fileId) {
							await idb.deleteAlbumTrackFile(fileId);
						}
						await idb.storeTrackInfo(trackId, null); // Remove track info
					}
				},

				getMediaFile: async id => {
					if (!get().isDBInitialized) return null;
					return await idb.getAlbumTrackFile(id);
				},

				removeMediaFile: async id => {
					// Remove from state
					set({
						mediaFileIds: get().mediaFileIds.filter(fileId => fileId !== id)
					});

					// Remove from IndexedDB if initialized
					if (get().isDBInitialized) {
						await idb.deleteAlbumTrackFile(id);
					}
				},

				hasOngoingUpload: () => {
					const state = get();
					return state.albumTracks.length > 0 || state.mediaFileIds.length > 0 || state.coverArtId !== null || Object.values(state.albumInfo).some(val => (val !== '' && Array.isArray(val) ? val.length > 0 : true));
				}
			}),
			{
				name: 'album-upload-storage',
				partialize: state => ({
					currentStep: state.currentStep,
					albumType: state.albumType,
					coverArtId: state.coverArtId,
					albumInfo: state.albumInfo,
					albumTracks: state.albumTracks.map(track => ({
						...track,
						arrayBuffer: undefined
					})),
					mediaFileIds: state.mediaFileIds,
					streamingPlatforms: state.streamingPlatforms
				})
			}
		)
	)
);
