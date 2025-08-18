import APIAxios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast'; // Assuming toast notifications

// Define the payload interface for updating a withdrawal
interface UpdateWithdrawalPayload {
	transactionId: string;
	artistId: string; // Include artistId if needed by the endpoint or for query invalidation
	finalAmount: number; // The amount being approved/sent
	// Add other fields that can be updated, e.g., status, notes
	// status?: 'Approved' | 'Paid' | 'Rejected';
	// notes?: string;
}

interface CreditPayload {
	transactionId: string;
	artistId: string;
	finalAmount: number;
	notes: string;
}
// Define the expected API response interface (adjust as needed)
interface UpdateWithdrawalResponse {
	success: boolean;
	message: string;
	data?: {
		// Optional data field with updated slip details
		_id: string;
		// ... other fields
	};
}

// Async function to perform the API call
const updateWithdrawalSlip = async (payload: UpdateWithdrawalPayload): Promise<UpdateWithdrawalResponse> => {
	const { artistId, ...updateData } = payload;
	// Adjust the endpoint as needed. Using PUT /admin/withdrawalslip/:transactionId
	// Passing artistId as a query param if required by the backend
	const response = await APIAxios.put<UpdateWithdrawalResponse>(
		`/admin/withdrawalslip`,
		updateData, // Send only the fields to be updated in the body
		{ params: { artistId } } // Send artistId as query param if needed
	);
	return response.data;
};

const credit = async (payload: CreditPayload): Promise<UpdateWithdrawalResponse> => {
	const { artistId, ...updateData } = payload;
	const response = await APIAxios.put<UpdateWithdrawalResponse>(`/admin/creditArtist`, updateData, { params: { artistId } });
	return response.data;
};

// React Query mutation hook
export const useUpdateWithdrawalSlip = () => {
	const queryClient = useQueryClient();

	return useMutation<UpdateWithdrawalResponse, Error, UpdateWithdrawalPayload>({
		mutationFn: updateWithdrawalSlip,
		onSuccess: (data, variables) => {
			toast.success(data.message || 'Withdrawal slip updated successfully!');
			// Invalidate relevant queries to refetch data
			// Invalidate the specific slip being updated
			queryClient.invalidateQueries({ queryKey: ['oneWithdrawalSlip', variables.transactionId] });
			// Invalidate the list of all slips for the artist
			queryClient.invalidateQueries({ queryKey: ['withdrawalSlips', { artistId: variables.artistId }] }); // Adjust key structure if needed
			// Invalidate artist details if balance might have changed
			queryClient.invalidateQueries({ queryKey: ['oneArtist', variables.artistId] });
			// Potentially redirect or perform other actions
		},
		onError: error => {
			toast.error(error.message || 'Failed to update withdrawal slip.');
		}
	});
};

export const useCredits = () => {
	const queryClient = useQueryClient();
	return useMutation<UpdateWithdrawalResponse, Error, CreditPayload>({
		mutationFn: credit,
		onSuccess: (data, variables) => {
			toast.success(data.message || 'Amount added to account successfully!');
			queryClient.invalidateQueries({ queryKey: ['oneWithdrawalSlip', variables.transactionId] });
			queryClient.invalidateQueries({ queryKey: ['withdrawalSlips', { artistId: variables.artistId }] }); // Adjust key structure if needed
			queryClient.invalidateQueries({ queryKey: ['oneArtist', variables.artistId] });
		},
		onError: error => {
			toast.error(error.message || 'Failed to update artist account.');
		}
	});
};
