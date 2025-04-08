import APIAxios from "@/utils/axios";
import { TArtistMedia } from "./getArtisteMedias";
import { useMutation } from "@tanstack/react-query";

export const updateSingleTrack = async (payload: Partial<TArtistMedia>) => {

    if (!payload._id) return;

    const response = await APIAxios.put(`/media/update_media/${payload._id}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};



export const useUpdateMedia = () => {
    return useMutation({
        mutationFn: updateSingleTrack,
        onSuccess: (data) => {
            console.log("Media updated successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating media:", error);
        },
    })
}