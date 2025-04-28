// src/api/deleteAlbum.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define the request parameters interface
interface DeleteAlbumParams {
	albumId: string;
}

// Define the response type (adjust based on your API's response structure)
interface DeleteAlbumResponse {
	success: boolean;
	message?: string;
}

export const deleteAlbum = async ({ albumId }: DeleteAlbumParams): Promise<DeleteAlbumResponse> => {
	const response = await APIAxios.delete(`/admin/delete_album/${albumId}`);
	return response.data;
};

export const useDeleteAlbum = (): UseMutationResult<DeleteAlbumResponse, Error, DeleteAlbumParams> => {
	return useMutation({
		mutationFn: deleteAlbum
	});
};
