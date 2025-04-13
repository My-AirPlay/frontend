
import APIAxios from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type addSongProps = {
    album_id: string
    media_id: string
    position: number
}
const addSong = async ({ album_id, media_id, position }: addSongProps) => {
    const response = await APIAxios.post(`media/albums/${album_id}/media/${media_id}/position/${position}`)
    return response.data
}


export const useAddSongToAlbum = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addSong,
        mutationKey: ["addSongToAlbum"],
        onError: (error) => {
            console.error("Error adding song to album:", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getArtistAlbums"],
            });
        },
    })
}