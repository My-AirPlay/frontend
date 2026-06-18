import APIAxios from '@/utils/axios';
import { TArtistMedia } from './getArtisteMedias';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateSingleTrack = async (payload: { data: Partial<TArtistMedia>; coverArt?: File }) => {
	if (!payload.data._id) return;

	const formData = new FormData();

	// Server-managed fields must never be posted back. In particular
	// `fugaDelivery` is an embedded object that would be stringified to
	// "[object Object]" and break the update with a Mongoose CastError.
	const SKIP = ['_id', 'id', '__v', 'createdAt', 'updatedAt', 'artistId', 'fugaDelivery', 'reviewStatus', 'rejectionReasons', 'reviewedAt', 'reviewedBy', 'isStorageCleaned', 'fileIds'];

	Object.entries(payload.data).forEach(([key, value]) => {
		if (SKIP.includes(key) || value === undefined || value === null) return;
		if (Array.isArray(value)) {
			value.forEach(item => formData.append(key, String(item)));
		} else if (typeof value === 'object') {
			// Never stringify a nested object into "[object Object]".
			return;
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
