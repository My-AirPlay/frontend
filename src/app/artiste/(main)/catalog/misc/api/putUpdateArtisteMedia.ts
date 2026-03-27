import APIAxios from '@/utils/axios';
import { TArtistMedia } from './getArtisteMedias';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateSingleTrack = async (payload: { data: Partial<TArtistMedia>; coverArt?: File }) => {
	if (!payload.data._id) return;

	const formData = new FormData();

	Object.entries(payload.data).forEach(([key, value]) => {
		if (key === '_id' || value === undefined || value === null) return;
		if (Array.isArray(value)) {
			value.forEach(item => formData.append(key, String(item)));
		} else {
			formData.append(key, String(value));
		}
	});

	if (payload.coverArt) {
		formData.append('coverArt', payload.coverArt);
	}

	const response = await APIAxios.put(`/media/update_media/${payload.data._id}`, formData, {
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
		onError: () => {}
	});
};
