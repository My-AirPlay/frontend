import APIAxios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

type FetchOptions = {
    size?: number;
    page?: number;
}

const getAlbums = async (options: FetchOptions) => {
    const response = await APIAxios.get(`/media/get_artist_albums`, {
        params: options,
    });
    return response.data;
}

export const useGetAlbums = (options: FetchOptions) => {
    return useQuery({
        queryKey: ["getAlbums", options],
        queryFn: () => getAlbums(options),
        staleTime: 1000 * 60 * 60,
    })
}