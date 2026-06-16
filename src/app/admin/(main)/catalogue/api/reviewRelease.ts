import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface ReviewReleasePayload {
	releaseId: string;
	decision: 'approved' | 'rejected';
	reasons?: string[];
}

export const reviewRelease = async ({ releaseId, decision, reasons }: ReviewReleasePayload) => {
	const response = await APIAxios.post('/admin/releases/' + releaseId + '/review', {
		decision,
		reasons: reasons || []
	});
	return response.data;
};

export const useReviewRelease = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: reviewRelease,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['albumDetail'] });
			queryClient.invalidateQueries({ queryKey: ['getAllAlbums'] });
		}
	});
};
