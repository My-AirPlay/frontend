// src/api/getSingleComplaint.ts
import APIAxios from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';

// Define the query parameters interface
interface GetSingleComplaintParams {
	complaintId: string;
}

interface reportAdminIssueParams {
	complaintType: string;
	complaintId: string;
	status: string;
	complain: string;
}
export const getSingleComplaint = async ({ complaintId }: GetSingleComplaintParams) => {
	const response = await APIAxios.get(`/admin/single_complaint/${complaintId}`);
	return response.data;
};

const reportAdminIssue = async (data: reportAdminIssueParams) => {
	const response = await APIAxios.post('/admin/create-complain', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
};

export const useReportIssue = () => {
	return useMutation({
		mutationFn: reportAdminIssue,
		mutationKey: ['reportAdminIssue'],
		onSuccess: data => {
			return data;
		},
		onError: error => {
			return error;
		}
	});
};

export const getAllComplaintMessages = async ({ complaintId }: GetSingleComplaintParams) => {
	const response = await APIAxios.get(`/admin/complaint/${complaintId}`);
	return response.data;
};

export const useGetAllComplaintById = (params: GetSingleComplaintParams) => {
	return useQuery({
		queryKey: ['allComplaint', params.complaintId], // Unique key for caching
		queryFn: () => getAllComplaintMessages(params)
	});
};
export const useGetSingleComplaint = (params: GetSingleComplaintParams) => {
	return useQuery({
		queryKey: ['singleComplaint', params.complaintId],
		queryFn: () => getSingleComplaint(params)
	});
};
