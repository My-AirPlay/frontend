// src/api/deleteMedia.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define the request parameters interface
interface DeleteMediaParams {
	mediaId: string;
}

// Define the response type (adjust based on your API's response structure)
interface DeleteMediaResponse {
	statusCode: string | number;
	success: boolean;
	message?: string;
}

export const deleteMedia = async ({ mediaId }: DeleteMediaParams): Promise<DeleteMediaResponse> => {
	const response = await APIAxios.delete(`/admin/delete_media/${mediaId}`);
	return response.data;
};

export const useDeleteMedia = (): UseMutationResult<DeleteMediaResponse, Error, DeleteMediaParams> => {
	return useMutation({
		mutationFn: deleteMedia
	});
};
