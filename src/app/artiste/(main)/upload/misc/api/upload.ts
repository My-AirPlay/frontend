import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIAxios from '@/utils/axios';
import { UploadAlbumPayload, UploadTrackPayload } from '../types';
import { MediaUploadInfo } from '../store/media';

export const uploadSingleTrack = async (payload: UploadTrackPayload) => {
	// Max file size in bytes (e.g., 50MB)
	const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

	// Check if the files are within the size limit
	if (payload.media && payload.media.size > MAX_FILE_SIZE) {
		throw new Error('Media file is too large. Please upload a file smaller than 500MB.');
	}

	if (payload.coverArt && payload.coverArt.size > MAX_FILE_SIZE) {
		throw new Error('Cover art is too large. Please upload a file smaller than 500MB.');
	}

	// Prepare FormData
	const formData = new FormData();

	// Append other fields from the payload
	Object.entries(payload).forEach(([key, value]) => {
		if (key !== 'media' && key !== 'coverArt' && key !== 'streamingPlatforms') {
			formData.append(key, value || '');
		}
	});

	// Handle streamingPlatforms field (array or single value)
	if (Array.isArray(payload.streamingPlatforms)) {
		payload.streamingPlatforms.forEach((platform, i) => {
			formData.append(`streamingPlatforms[${i}]`, platform);
		});
	} else {
		formData.append('streamingPlatforms', payload.streamingPlatforms as unknown as string);
	}

	// Append the media and cover art files
	if (payload.coverArt) {
		formData.append('coverArt', payload.coverArt);
	}
	if (payload.media) {
		formData.append('media', payload.media);
	}

	// Send the request
	try {
		const response = await APIAxios.post(`/media/create-media`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			timeout: 100000 // Timeout in milliseconds (30 seconds)
		});
		return response.data;
	} catch (error) {
		// Handle errors (e.g., network error, CORS error, timeout)
		console.error('Error uploading track:', error);
		throw new Error('An error occurred while uploading the track. Please try again later.');
	}
};

export const uploadAlbum = async (payload: UploadAlbumPayload) => {
	const formData = new FormData();

	formData.append('albumCover', payload.albumCover);

	formData.append('description', payload.description);
	formData.append('title', payload.title);
	formData.append('artistName', payload.artistName);
	formData.append('mainGenre', payload.mainGenre);
	formData.append('releaseDate', payload.releaseDate);
	formData.append('recordLabel', payload.recordLabel || '');
	formData.append('publisher', payload.publisher);
	formData.append('explicitContent', payload.explicitContent);
	formData.append('universalProductCode', payload.universalProductCode);
	formData.append('releaseVersion', payload.releaseVersion);
	formData.append('copyright', payload.copyright);

	if (payload.secondaryGenres?.length) {
		payload.secondaryGenres.forEach((genre, i) => {
			formData.append(`secondaryGenres[${i}]`, genre);
		});
	}

	if (payload.instruments?.length) {
		payload.instruments.forEach((instrument, i) => {
			formData.append(`instruments[${i}]`, instrument);
		});
	}

	if (payload.streamingPlatforms?.length) {
		payload.streamingPlatforms.forEach((platform, i) => {
			formData.append(`streamingPlatforms[${i}]`, platform);
		});
	}

	// Add media files
	if (payload.mediaFiles?.length) {
		payload.mediaFiles.forEach(file => {
			formData.append('mediaFiles', file);
		});
	}

	// Add track info for each track
	if (payload.media?.length) {
		payload.media.forEach((track, i) => {
			Object.entries(track).forEach(([key, value]) => {
				if (key == 'fileId') return;
				if (!Array.isArray(value)) {
					formData.append(`media[${i}][${key}]`, value || '');
				} else if (key === 'secondaryGenres' || key === 'instruments' || key === 'streamingPlatforms') {
					value.forEach((item, j) => {
						formData.append(`media[${i}][${key}][${j}]`, item);
					});
				}
			});
		});
	}

	console.log(formData.getAll('media'));

	const response = await APIAxios.post(`/media/create-album`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useUploadTrack = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: uploadSingleTrack,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['getArtistAlbums']
			});
			queryClient.invalidateQueries({
				queryKey: ['getArtistMedias']
			});
			queryClient.invalidateQueries({
				queryKey: ['getArtistVideos']
			});
			queryClient.invalidateQueries({
				queryKey: ['getArtistAllMedia']
			});
		},
		onError: error => {
			console.error('Failed to upload track:', error);
		}
	});
};

export const useUploadAlbum = () => {
	return useMutation({
		mutationFn: uploadAlbum,
		onError: error => {
			console.error('Failed to upload album:', error);
		}
	});
};

export function createMediaPayloadFromStore(info: MediaUploadInfo, mediaFile: File, coverArtFile: File, enabledPlatforms: string[]): UploadTrackPayload {
	return {
		artistName: info.artistName,
		copyright: info.copyright,
		explicitContent: info.explicitContent,
		fileType: mediaFile.type.includes('audio') ? 'audio' : 'video',
		lyrics: info.lyrics || '',
		mainGenre: info.mainGenre,
		originalReleaseDate: info.originalReleaseDate || info.releaseDate,
		publisher: info.publisher,
		recordLabel: info.recordLabel || '',
		releaseVersion: info.releaseVersion,
		streamingPlatforms: enabledPlatforms,
		universalProductCode: info.universalProductCode,
		description: info.description,
		releaseDate: info.releaseDate,
		title: info.title,
		media: mediaFile,
		coverArt: coverArtFile
	};
}

export function createAlbumPayloadFromStore(/* same parameters */) {
	// Implementation remains the same
	// ...
}
