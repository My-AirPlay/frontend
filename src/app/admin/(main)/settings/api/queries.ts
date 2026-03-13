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
