import APIAxios from '@/utils/axios';
import { ArtistReportIssueFormValues } from '../../page';
import { useMutation } from '@tanstack/react-query';

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
