
import APIAxios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { TArtistMedia } from "./getArtisteMedias";

type FetchOptions = {
	limit?: number;
	page?: number;
};

interface APIREsponse {
	data: TArtisteAlbum[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface TArtisteAlbum {

    _id: string;
    artistId: string;
    title: string;
    description: string;
    dirType: string;
    mainGenre: string;
    secondaryGenres: string[];
    artistName: string;
    recordLabel: string;
    publisher: string;
    instruments: string[];
    explicitContent: string;
    universalProductCode: string;
    releaseVersion: string;
    copyright: string;
    releaseDate: string;
    streamingPlatforms: string[];
    fileIds: TArtistMedia[];
    mediaDirCoverArtUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const getAlbums = async (options: FetchOptions) => {
	const response = await APIAxios.get<APIREsponse>(`/media/get_artist_albums`, {
		params: options
	});
	return response.data;
};

export const useGetAlbums = (options: FetchOptions) => {
	return useQuery({
		queryKey: ['getArtistAlbums', options],
		queryFn: () => getAlbums(options),
		staleTime: 1000 * 60 * 60
	});
};
