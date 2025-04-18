// src/api/getSingleComplaint.ts
import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetSingleComplaintParams {
	complaintId: string;
}

export const getSingleComplaint = async ({ complaintId }: GetSingleComplaintParams) => {
	const response = await APIAxios.get(`/admin/single_complaint/${complaintId}`);
	return response.data;
};

export const useGetSingleComplaint = (params: GetSingleComplaintParams) => {
	return useQuery({
		queryKey: ['singleComplaint', params.complaintId], // Unique key for caching
		queryFn: () => getSingleComplaint(params)
	});
};
