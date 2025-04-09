import APIAxios from '@/utils/axios';
import { TArtistMedia } from './getArtisteMedias';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
	const queryCLient = useQueryClient();
	return useMutation({
		mutationFn: updateSingleTrack,
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: ['getArtistMedias']
			});
			queryCLient.invalidateQueries({
				queryKey: ['getArtistVideos']
			});
		},
		onError: error => {
			console.error('Error updating media:', error);
		}
	});
};
