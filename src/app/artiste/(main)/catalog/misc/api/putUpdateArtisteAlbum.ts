import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TArtisteAlbum } from "./getArtisteAlbums";

export const updateSingleTrack = async (payload: Partial<TArtisteAlbum>) => {

    if (!payload._id) return;

    const response = await APIAxios.put(`/media/update_album/${payload._id}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};



export const useUpdateAlbum = () => {
    const queryCLient = useQueryClient();
    return useMutation({
        mutationFn: updateSingleTrack,
        onSuccess: () => {
            queryCLient.invalidateQueries({
                queryKey: ["getArtistAlbums"],
            });
          
        },
        onError: (error) => {
            console.error("Error updating media:", error);
        },
    })
}