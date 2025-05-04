import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { WithdrawalSlipData } from '@/lib/types'; // Import the type

// Define the query parameters interface
interface GetOneWithdrawalSlipParams {
	transactionId: string;
	artistId: string; // Include artistId if needed by the endpoint
}

interface GetOneWithdrawalSlipResponse {
	success: boolean;
	message: string;
	data: WithdrawalSlipData; // Assuming the data is nested under 'data'
}

// Async function to perform the API call
// Adjust endpoint as needed, e.g., /admin/withdrawalslip/:transactionId
const getOneWithdrawalSlip = async ({ transactionId, artistId }: GetOneWithdrawalSlipParams): Promise<GetOneWithdrawalSlipResponse> => {
	const response = await APIAxios.get<GetOneWithdrawalSlipResponse>(`/admin/withdrawalslip/${transactionId}`, {
		params: { artistId } // Pass artistId as query param if required
	});
	return response.data;
};

// React Query hook
export const useGetOneWithdrawalSlip = (params: GetOneWithdrawalSlipParams, options?: { enabled?: boolean }) => {
	return useQuery<GetOneWithdrawalSlipResponse, Error>({
		queryKey: ['oneWithdrawalSlip', params.transactionId], // Unique key including transactionId
		queryFn: () => getOneWithdrawalSlip(params),
		enabled: options?.enabled ?? !!params.transactionId // Enable query only if transactionId is present
	});
};
