import APIAxios from '@/utils/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- Deliveries API ---

export interface FugaDelivery {
	id: string;
	isDirectory: boolean;
	upc?: string;
	title: string;
	artistName: string;
	status: 'gated' | 'queued' | 'delivering' | 'delivered' | 'failed' | 'ineligible' | 'cancelled';
	attempts: number;
	lastError?: string;
	enqueuedAt: string;
	lastDeliveredAt?: string;
}

export const getFugaDeliveries = async (options: { page?: number; limit?: number; status?: string }) => {
	const params = new URLSearchParams({
		page: String(options.page || 1),
		limit: String(options.limit || 10)
	});
	if (options.status) params.append('status', options.status);
	const response = await APIAxios.get(`/admin/fuga/deliveries?${params.toString()}`);
	return response.data;
};

export const useGetFugaDeliveries = (options: { page?: number; limit?: number; status?: string }) => {
	return useQuery({
		queryKey: ['fugaDeliveries', options],
		queryFn: () => getFugaDeliveries(options)
	});
};

export const getFugaDeliveryDetail = async (id: string) => {
	const response = await APIAxios.get(`/admin/fuga/deliveries/${id}`);
	return response.data;
};

export const triggerFugaDelivery = async (id: string) => {
	const response = await APIAxios.post(`/admin/fuga/deliver/${id}`);
	return response.data;
};

export const cancelFugaDelivery = async (id: string) => {
	const response = await APIAxios.post(`/admin/fuga/cancel/${id}`);
	return response.data;
};

// --- Codes API ---

export const getFugaCodeStats = async () => {
	const response = await APIAxios.get('/admin/fuga/codes/stats');
	return response.data;
};

export const useGetFugaCodeStats = () => {
	return useQuery({
		queryKey: ['fugaCodeStats'],
		queryFn: getFugaCodeStats
	});
};

export const uploadFugaCodes = async (payload: FormData) => {
	const response = await APIAxios.post('/admin/fuga/codes/upload', payload, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
};

// --- Mutations ---

export const useFugaMutations = () => {
	const queryClient = useQueryClient();

	const deliverMutation = useMutation({
		mutationFn: triggerFugaDelivery,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fugaDeliveries'] });
		}
	});

	const cancelMutation = useMutation({
		mutationFn: cancelFugaDelivery,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fugaDeliveries'] });
		}
	});

	const uploadCodesMutation = useMutation({
		mutationFn: uploadFugaCodes,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['fugaCodeStats'] });
		}
	});

	return {
		deliverMutation,
		cancelMutation,
		uploadCodesMutation
	};
};
