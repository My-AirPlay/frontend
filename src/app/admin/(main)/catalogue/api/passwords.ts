import APIAxios from '@/utils/axios'; // Assuming you have a configured axios instance
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

// --- Type Definitions for the Password object from your backend ---
export interface Password {
	_id: string;
	password: string;
	createdAt: string;
	expiresAt: string;
}

// =================================================================
// GET ALL PASSWORDS
// =================================================================
export const getPasswords = async (): Promise<Password[]> => {
	const response = await APIAxios.get('/admin/super_admin_password');
	return response.data;
};

export const useGetPasswords = () => {
	return useQuery({
		queryKey: ['getPasswords'],
		queryFn: getPasswords
	});
};

// =================================================================
// GENERATE A NEW PASSWORD
// =================================================================
export const generatePassword = async (): Promise<Password> => {
	const response = await APIAxios.post('/admin/super_admin_password/generate');
	return response.data;
};

export const useGeneratePassword = (): UseMutationResult<Password, Error, void, unknown> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: generatePassword,
		onSuccess: () => {
			// When generation is successful, invalidate the password list to refetch and show the new one.
			queryClient.invalidateQueries({ queryKey: ['getPasswords'] });
		}
	});
};

// =================================================================
// REVOKE (DELETE) A PASSWORD
// =================================================================
export interface RevokeParams {
	passwordId: string;
}

export const revokePassword = async ({ passwordId }: RevokeParams): Promise<void> => {
	// This assumes you have a DELETE /passwords/:id endpoint in NestJS
	const response = await APIAxios.delete(`/admin/super_admin_password/${passwordId}`);
	return response.data;
};

export const useRevokePassword = (): UseMutationResult<void, Error, RevokeParams, unknown> => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: revokePassword,
		onSuccess: () => {
			// When a password is revoked, refetch the list.
			queryClient.invalidateQueries({ queryKey: ['getPasswords'] });
		}
	});
};
