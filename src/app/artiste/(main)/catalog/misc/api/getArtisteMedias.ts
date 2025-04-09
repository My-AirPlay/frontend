/* eslint-disable @typescript-eslint/no-explicit-any */
import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

type FetchOptions = {
	limit?: number;
	page?: number;
};

interface APIResponse {
	data: TArtistMedia[];
	total: number;
	page: null;
	limit: null;
	totalPages: null;
}
const getMedias = async (type: 'audio' | 'video', options: FetchOptions) => {
	const response = await APIAxios.get<APIResponse>(`/media/get_artist_audios_videos?type=${type}`, {
		params: options
	});
	return response.data;
};

export interface TArtistMedia {
	_id: string;
	artistId: string;
	fileType: string;
	description: string;
	features: any[];
	contributors: any[];
	title: string;
	mainGenre: string;
	secondaryGenres: string[];
	mediaCoverArtUrl: string;
	artistName: string;
	mediaUrl: string;
	recordLabel: string;
	publisher: string;
	instruments: string[];
	lyrics: string;
	explicitContent: string;
	universalProductCode: string;
	releaseVersion: string;
	copyright: string;
	releaseDate: string;
	streamingPlatforms: string[];
	originalReleaseDate: string;
	extensionType: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export const useGetAudios = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['getArtistMedias', options],
		queryFn: () => getMedias('audio', options),
		staleTime: 1000 * 60 * 60
	});
};
export const useGetVideos = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['getArtistVideos', options],
		queryFn: () => getMedias('video', options),
		staleTime: 1000 * 60 * 60
	});
};
