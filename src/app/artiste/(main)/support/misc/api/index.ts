import APIAxios from '@/utils/axios';
import { ArtistReportIssueFormValues } from '../../report-issue/page';
import { useMutation, useQuery } from '@tanstack/react-query';

const reportIssue = async (data: ArtistReportIssueFormValues) => {
	const response = await APIAxios.post('/artist/create-complain', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
};

export const useReportIssue = () => {
	return useMutation({
		mutationFn: reportIssue,
		mutationKey: ['reportIssue'],
		onSuccess: data => {
			return data;
		},
		onError: error => {
			return error;
		}
	});
};

const getAllIssue = async () => {
	const response = await APIAxios.get<APIResponse>('/artist/all_complaints');
	return response.data;
};

export const useListAllIssue = () => {
	return useQuery({
		queryFn: getAllIssue,
		queryKey: ['listAllIssue']
	});
};

interface APIResponse {
	total: number;
	page: null;
	limit: null;
	totalPages: null;
	data: TArtisteIssue[];
}

interface TArtisteIssue {
	_id: string;
	complaintType: string;
	artistId: string;
	complain: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	artistName: string;
	email: string;
	phoneNumber: string;
}
