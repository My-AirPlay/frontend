import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface UpdateArtistPaymentDetailsParams {
	artistId: string;
	paymentCurrency: string;
	dealType: string;
	rate: number;
}

interface UpdateArtistPaymentDetailsResponse {
	success: boolean;
	message?: string;
	data?: string;
}

export const updateArtistPaymentDetails = async ({ artistId, paymentCurrency, dealType, rate }: UpdateArtistPaymentDetailsParams): Promise<UpdateArtistPaymentDetailsResponse> => {
	const response = await APIAxios.put(`/admin/update_artist_payment_details/${artistId}`, {
		paymentCurrency,
		dealType,
		rate
	});
	return response.data;
};

export const useUpdateArtistPaymentDetails = (): UseMutationResult<UpdateArtistPaymentDetailsResponse, Error, UpdateArtistPaymentDetailsParams> => {
	return useMutation({
		mutationFn: updateArtistPaymentDetails
	});
};
