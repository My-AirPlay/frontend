import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface CancelWithdrawalPayload {
	transactionId: string;
	artistId: string;
}

interface CancelWithdrawalResponse {
	success: boolean;
	message: string;
	data?: {
		_id: string;
	};
}

const cancelWithdrawalSlip = async (payload: CancelWithdrawalPayload): Promise<CancelWithdrawalResponse> => {
	const response = await APIAxios.patch<CancelWithdrawalResponse>(`/admin/withdrawalslip/${payload.transactionId}/cancel`);
	return response.data;
};

export const useCancelWithdrawalSlip = () => {
	const queryClient = useQueryClient();

	return useMutation<CancelWithdrawalResponse, Error, CancelWithdrawalPayload>({
		mutationFn: cancelWithdrawalSlip,
		onSuccess: (data, variables) => {
			toast.success(data.message || 'Transaction cancelled successfully!');
			queryClient.invalidateQueries({ queryKey: ['oneWithdrawalSlip', variables.transactionId] });
			// Invalidate all withdrawalSlips queries (partial match)
			queryClient.invalidateQueries({ queryKey: ['withdrawalSlips'] });
			queryClient.invalidateQueries({ queryKey: ['oneArtist', variables.artistId] });
			queryClient.invalidateQueries({ queryKey: ['artistAnalytics'] });
		},
		onError: error => {
			toast.error(error.message || 'Failed to cancel transaction.');
		}
	});
};
