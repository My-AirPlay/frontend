import APIAxios from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteMedia = async (media_id: string) => {

    if (!media_id) return;

    const response = await APIAxios.delete(`/media/delete_media/${media_id}`);

    return response.data;
};



export const useDeleteMedia = () => {
    const queryCLient = useQueryClient();
    return useMutation({
        mutationFn: deleteMedia,
        onSuccess: () => {
            queryCLient.invalidateQueries({
                queryKey: ["getArtistMedias"],
            });
            queryCLient.invalidateQueries({
                queryKey: ["getArtistVideos"],
            });
        },
        onError: (error) => {
            console.error("Error deleting media:", error);
        },
    })
}