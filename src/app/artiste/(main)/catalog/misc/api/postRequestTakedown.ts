import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const requestTakedown = async ({ releaseId, reason }: { releaseId: string; reason?: string }) => {
	const response = await APIAxios.post(`/media/releases/${releaseId}/takedown`, { reason });
	return response.data;
};

export const useRequestTakedown = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: requestTakedown,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getArtistMedias'] });
			queryClient.invalidateQueries({ queryKey: ['getArtistAllMedia'] });
			queryClient.invalidateQueries({ queryKey: ['getArtistAlbums'] });
		}
	});
};
