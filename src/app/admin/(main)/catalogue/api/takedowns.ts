import APIAxios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type TTakedownStatus = 'requested' | 'completed' | 'declined';

export interface TTakedownRelease {
	_id: string;
	type: 'single' | 'album';
	title: string;
	artistId: string;
	artistName?: string;
	universalProductCode?: string;
	fugaDelivery?: { firstDeliveredAt?: string };
	takedown: {
		status: TTakedownStatus;
		reason?: string;
		requestedAt: string;
		resolvedAt?: string;
		resolvedBy?: string;
		adminNote?: string;
	};
}

export const getTakedowns = async (status: TTakedownStatus | 'all') => {
	const response = await APIAxios.get<TTakedownRelease[]>('/admin/releases/takedowns', { params: { status } });
	return response.data;
};

export const useGetTakedowns = (status: TTakedownStatus | 'all') => {
	return useQuery({
		queryKey: ['adminTakedowns', status],
		queryFn: () => getTakedowns(status)
	});
};

export const resolveTakedown = async ({ releaseId, decision, note }: { releaseId: string; decision: 'completed' | 'declined'; note?: string }) => {
	const response = await APIAxios.post(`/admin/releases/${releaseId}/takedown`, { decision, note });
	return response.data;
};

export const useResolveTakedown = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: resolveTakedown,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['adminTakedowns'] });
		}
	});
};
