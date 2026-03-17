import APIAxios from '@/utils/axios';

export interface ArtistMediaItem {
	_id: string;
	title: string;
	universalProductCode?: string;
	isrcCode?: string;
	releaseDate?: string;
	artistName?: string;
	mediaCoverArtUrl?: string;
}

export const linkTrackToMedia = async (trackId: string, mediaId: string) => {
	const response = await APIAxios.post(`/admin/track/${trackId}/link-media`, { mediaId });
	return response.data;
};

export const unlinkTrackFromMedia = async (trackId: string) => {
	const response = await APIAxios.post(`/admin/track/${trackId}/unlink-media`);
	return response.data;
};

export const ignoreTrackCatalogueMatch = async (trackId: string) => {
	const response = await APIAxios.post(`/admin/track/${trackId}/ignore-catalogue-match`);
	return response.data;
};

export const getArtistMedia = async (artistId: string): Promise<ArtistMediaItem[]> => {
	const response = await APIAxios.get(`/admin/artist/${artistId}/media-for-picker`);
	return response.data;
};
