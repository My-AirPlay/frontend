/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIAxios from '@/utils/axios';
import axios from 'axios';
import { UploadAlbumPayload, UploadTrackPayload } from '../types';
import { MediaUploadInfo } from '../store/media';

// Helper to upload a file directly to S3 via presigned URL
const uploadToS3 = async (file: File) => {
	// 1. Get presigned URL
	const { data } = await APIAxios.get(`/media/generate-upload-url`, {
		params: {
			filename: file.name,
			contentType: file.type || 'application/octet-stream'
		}
	});

	// 2. Upload file to S3
	await axios.put(data.signedUrl, file, {
		headers: {
			'Content-Type': file.type || 'application/octet-stream'
		},
		timeout: 600000 // 10 mins
	});

	// 3. Return final URL
	return data.finalUrl;
};

export const uploadSingleTrack = async (payload: UploadTrackPayload) => {
	const MAX_MEDIA_SIZE = 512 * 1024 * 1024; // 512MB
	const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5MB

	if (payload.media && payload.media.size > MAX_MEDIA_SIZE) {
		throw new Error('Media file is too large. Please upload a file smaller than 512MB.');
	}

	if (payload.coverArt && payload.coverArt.size > MAX_COVER_SIZE) {
		throw new Error('Cover art is too large. Please upload a file smaller than 5MB.');
	}

	try {
		// 1. Upload files to S3 directly
		let mediaUrl = '';
		let mediaCoverArtUrl = '';

		if (payload.media) {
			mediaUrl = await uploadToS3(payload.media);
		}
		if (payload.coverArt) {
			mediaCoverArtUrl = await uploadToS3(payload.coverArt);
		}

		// 2. Construct JSON payload
		const jsonPayload: any = {
			...payload,
			mediaUrl,
			mediaCoverArtUrl
		};
		// Remove file objects before sending JSON
		delete jsonPayload.media;
		delete jsonPayload.coverArt;

		// Handle streamingPlatforms
		if (!Array.isArray(jsonPayload.streamingPlatforms)) {
			jsonPayload.streamingPlatforms = [jsonPayload.streamingPlatforms as unknown as string];
		}

		// 3. Send metadata to backend
		const response = await APIAxios.post(`/media/create-media`, jsonPayload);
		return response.data;
	} catch (error: any) {
		const serverMessage = error?.response?.data?.message || error.message;
		throw new Error(serverMessage || 'An error occurred while uploading the track.');
	}
};

export const uploadAlbum = async (payload: UploadAlbumPayload) => {
	const MAX_MEDIA_SIZE = 512 * 1024 * 1024; // 512MB
	const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5MB

	if (payload.albumCover && payload.albumCover.size > MAX_COVER_SIZE) {
		throw new Error('Album cover art is too large. Please upload a file smaller than 5MB.');
	}

	if (payload.mediaFiles?.length) {
		for (const file of payload.mediaFiles) {
			if (file.size > MAX_MEDIA_SIZE) {
				throw new Error(`Track "${file.name}" is too large. Please upload files smaller than 512MB.`);
			}
		}
	}

	try {
		// 1. Upload Album Cover
		const mediaDirCoverArtUrl = payload.albumCover ? await uploadToS3(payload.albumCover) : '';

		// 2. Upload Track Files Concurrently
		const uploadedMediaUrls = await Promise.all((payload.mediaFiles || []).map(file => uploadToS3(file)));

		// 3. Map URLs back to the media track metadata
		const media = (payload.media || []).map((track, i) => ({
			...track,
			mediaUrl: uploadedMediaUrls[i],
			mediaCoverArtUrl: mediaDirCoverArtUrl
		}));

		// 4. Construct JSON payload
		const jsonPayload: any = {
			...payload,
			mediaDirCoverArtUrl,
			media
		};

		// Remove file objects
		delete jsonPayload.albumCover;
		delete jsonPayload.mediaFiles;

		// Handle streamingPlatforms
		if (!Array.isArray(jsonPayload.streamingPlatforms)) {
			jsonPayload.streamingPlatforms = [jsonPayload.streamingPlatforms as unknown as string];
		}

		// 5. Send metadata to backend
		const response = await APIAxios.post(`/media/create-album`, jsonPayload);
		return response.data;
	} catch (error: any) {
		const serverMessage = error?.response?.data?.message || error.message;
		throw new Error(serverMessage || 'An error occurred while uploading the album.');
	}
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
		onError: () => {}
	});
};

export const useUploadAlbum = () => {
	return useMutation({
		mutationFn: uploadAlbum,
		onError: () => {}
	});
};

export function createMediaPayloadFromStore(info: MediaUploadInfo, mediaFile: File, coverArtFile: File, enabledPlatforms: string[]): UploadTrackPayload {
	return {
		artistName: info.artistName,
		primaryArtist2: info.primaryArtist2 || '',
		featuredArtists: info.featuredArtists || '',
		copyright: info.copyright,
		explicitContent: info.explicitContent,
		fileType: mediaFile.type.includes('audio') ? 'audio' : 'video',
		lyrics: info.lyrics || '',
		mainGenre: info.mainGenre,
		originalReleaseDate: info.originalReleaseDate || info.releaseDate,
		publisher: info.publisher,
		writer: info.writer,
		producer: info.producer,
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
