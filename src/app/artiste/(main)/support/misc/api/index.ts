import APIAxios from '@/utils/axios';
import { ArtistReportIssueFormValues } from '../../report-issue/page';
import { useMutation, useQuery } from '@tanstack/react-query';

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
