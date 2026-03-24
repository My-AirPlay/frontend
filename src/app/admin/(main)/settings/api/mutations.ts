import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIAxios from '@/utils/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useUpdateSystemSettings = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { contractEmailEnabled?: boolean }) => {
			const { data } = await APIAxios.put('/admin/settings/system', payload);
			return data;
		},
		onSuccess: () => {
			toast.success('Settings updated');
			qc.invalidateQueries({ queryKey: ['system-settings'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to update settings');
		}
	});
};

export const useCreateAdminUser = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { email: string; firstName: string; lastName: string; password: string; roleId?: string }) => {
			const { data } = await APIAxios.post('/admin/settings/users', payload);
			return data;
		},
		onSuccess: () => {
			toast.success('Sub admin created');
			qc.invalidateQueries({ queryKey: ['admin-users'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to create sub admin');
		}
	});
};

export const useUpdateAdminUser = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...payload }: { id: string; firstName?: string; lastName?: string; roleId?: string; status?: 'Active' | 'Inactive' }) => {
			const { data } = await APIAxios.put(`/admin/settings/users/${id}`, payload);
			return data;
		},
		onSuccess: () => {
			toast.success('User updated');
			qc.invalidateQueries({ queryKey: ['admin-users'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to update user');
		}
	});
};

export const useResetAdminPassword = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, newPassword }: { id: string; newPassword: string }) => {
			const { data } = await APIAxios.put(`/admin/settings/users/${id}/reset-password`, { newPassword });
			return data;
		},
		onSuccess: () => {
			toast.success('Password reset');
			qc.invalidateQueries({ queryKey: ['admin-users'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to reset password');
		}
	});
};

export const useDeleteAdminUser = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await APIAxios.delete(`/admin/settings/users/${id}`);
			return data;
		},
		onSuccess: () => {
			toast.success('Sub admin deleted');
			qc.invalidateQueries({ queryKey: ['admin-users'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to delete sub admin');
		}
	});
};

export const useResendWelcomeEmail = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await APIAxios.post(`/admin/settings/users/${id}/resend-welcome`);
			return data;
		},
		onSuccess: () => {
			toast.success('Welcome email resent');
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to resend email');
		}
	});
};

export const useCreateAdminRole = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload: { name: string; allowedPages: string[]; notifications?: string[] }) => {
			const { data } = await APIAxios.post('/admin/settings/roles', payload);
			return data;
		},
		onSuccess: () => {
			toast.success('Role created');
			qc.invalidateQueries({ queryKey: ['admin-roles'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to create role');
		}
	});
};

export const useUpdateAdminRole = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...payload }: { id: string; name?: string; allowedPages?: string[]; notifications?: string[] }) => {
			const { data } = await APIAxios.put(`/admin/settings/roles/${id}`, payload);
			return data;
		},
		onSuccess: () => {
			toast.success('Role updated');
			qc.invalidateQueries({ queryKey: ['admin-roles'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to update role');
		}
	});
};

export const useDeleteAdminRole = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await APIAxios.delete(`/admin/settings/roles/${id}`);
			return data;
		},
		onSuccess: () => {
			toast.success('Role deleted');
			qc.invalidateQueries({ queryKey: ['admin-roles'] });
		},
		onError: (err: AxiosError<{ message?: string }>) => {
			toast.error(err.response?.data?.message || 'Failed to delete role');
		}
	});
};
