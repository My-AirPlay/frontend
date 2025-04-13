import APIAxios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { TArtisteAlbum } from "./getArtisteAlbums";


const getAlbums = async (albumId: string) => {
    const response = await APIAxios.get<TArtisteAlbum>(`/media/get_album_detail?albumId=${albumId}`);
    return response.data;
}

export const useGetAlbumDetails = (albumId: string | null) => {
    return useQuery({
        queryKey: ["getArtistAlbums", albumId],
        queryFn: () => getAlbums(albumId!),
        enabled:!!albumId,
        staleTime: 1000 * 60 * 60,
    })
}