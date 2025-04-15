import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const deleteAlbum = async (album_id: string) => {
	if (!album_id) return;

	const response = await APIAxios.delete(`/media/delete_album/${album_id}`);

	return response.data;
};

export const useDeleteAlbum = () => {
	const queryCLient = useQueryClient();
	return useMutation({
		mutationFn: deleteAlbum,
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: ['getArtistAlbums']
			});
		},
		onError: error => {
			console.error('Error deleting album:', error);
		}
	});
};
