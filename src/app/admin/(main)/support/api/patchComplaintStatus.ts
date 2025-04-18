// src/api/updateComplaintStatus.ts
import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Define the request parameters interface
interface UpdateComplaintStatusParams {
	complaintId: string;
	status: string;
}

// Define the response type (adjust based on your API's response structure)
interface UpdateComplaintStatusResponse {
	success: boolean;
	message?: string;
	data?: string; // Replace 'any' with a specific complaint type if known
}

export const updateComplaintStatus = async ({ complaintId, status = 'Resolved' }: UpdateComplaintStatusParams): Promise<UpdateComplaintStatusResponse> => {
	const response = await APIAxios.put(`/admin/complaints/${complaintId}/${status}`);
	return response.data;
};

export const useUpdateComplaintStatus = (): UseMutationResult<UpdateComplaintStatusResponse, Error, UpdateComplaintStatusParams> => {
	return useMutation({
		mutationFn: updateComplaintStatus
	});
};
