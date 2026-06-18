import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TArtisteAlbum } from './getArtisteAlbums';

export const updateSingleTrack = async (payload: Partial<TArtisteAlbum>) => {
	if (!payload._id) return;

	const formData = new FormData();

	// Server-managed / non-updatable fields. `fugaDelivery` is an embedded
	// object and `fileIds` is an array of track objects — neither should be
	// posted back (they'd stringify to "[object Object]" and break the update).
	const SKIP = ['_id', 'id', '__v', 'createdAt', 'updatedAt', 'artistId', 'fugaDelivery', 'reviewStatus', 'rejectionReasons', 'reviewedAt', 'reviewedBy', 'isStorageCleaned', 'fileIds'];

	Object.entries(payload).forEach(([key, value]) => {
		if (SKIP.includes(key) || value === undefined || value === null) return;
		if (Array.isArray(value)) {
			value.forEach(item => formData.append(key, String(item)));
		} else if (typeof value === 'object') {
			return;
		} else {
			formData.append(key, String(value));
		}
	});

	const response = await APIAxios.put(`/media/update_album/${payload._id}`, formData, {
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
				queryKey: ['getArtistAlbums']
			});
		},
		onError: () => {}
	});
};
