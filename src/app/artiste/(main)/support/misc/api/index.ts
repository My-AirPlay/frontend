import APIAxios from '@/utils/axios';
import { ArtistReportIssueFormValues } from '../../report-issue/page';
import { useMutation, useQuery } from '@tanstack/react-query';

interface GetAllIssues {
	page: number;
	limit: number;
}
const reportIssue = async (data: ArtistReportIssueFormValues & { complaintId?: string; status?: string }) => {
	const formData = new FormData();

	// Append all other form fields
	for (const key in data) {
		if (key !== 'attachments') {
			const typedKey = key as keyof typeof data;
			const value = data[typedKey];
			if (value !== undefined && value !== null) {
				formData.append(typedKey, String(value));
			}
		}
	}

	if (data.attachments) {
		formData.append('attachment', data.attachments);
	}

	const response = await APIAxios.post('/artist/create-complain', formData, {
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

const getAllIssue = async (params: GetAllIssues) => {
	const response = await APIAxios.get<APIResponse>('/artist/all_complaints', {
		params: params
	});
	return response.data;
};

export const useListAllIssue = (params: GetAllIssues) => {
	return useQuery({
		queryKey: ['listAllIssue', params.page, params.limit],
		queryFn: () => getAllIssue(params)
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
	complaintId: string;
	attachment: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	artistName: string;
	email: string;
	phoneNumber: string;
}
