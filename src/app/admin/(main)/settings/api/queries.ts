import { useQuery } from '@tanstack/react-query';
import APIAxios from '@/utils/axios';

export const useGetAdminUsers = () =>
	useQuery({
		queryKey: ['admin-users'],
		queryFn: async () => {
			const { data } = await APIAxios.get('/admin/settings/users');
			return data;
		}
	});

export const useGetAdminRoles = () =>
	useQuery({
		queryKey: ['admin-roles'],
		queryFn: async () => {
			const { data } = await APIAxios.get('/admin/settings/roles');
			return data;
		}
	});

export const useGetAuditLog = (params: { page?: number; limit?: number; action?: string; resource?: string; adminUserId?: string; startDate?: string; endDate?: string }) =>
	useQuery({
		queryKey: ['audit-log', params],
		queryFn: async () => {
			const searchParams = new URLSearchParams();
			if (params.page) searchParams.set('page', String(params.page));
			if (params.limit) searchParams.set('limit', String(params.limit));
			if (params.action) searchParams.set('action', params.action);
			if (params.resource) searchParams.set('resource', params.resource);
			if (params.adminUserId) searchParams.set('adminUserId', params.adminUserId);
			if (params.startDate) searchParams.set('startDate', params.startDate);
			if (params.endDate) searchParams.set('endDate', params.endDate);
			const { data } = await APIAxios.get(`/admin/settings/audit-log?${searchParams.toString()}`);
			return data;
		}
	});
