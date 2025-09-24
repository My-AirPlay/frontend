import APIAxios from '@/utils/axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

interface UpdateArtistPaymentDetailsParams {
	artistId: string;
	paymentCurrency: string;
	dealType: string;
	rate: number;
}

interface UpdateArtistDetailsParams {
	artistId: string;
	artistFullName: string;
	artistName: string;
}
interface UpdateArtistPaymentDetailsResponse {
	success: boolean;
	message?: string;
	data?: string;
}
//update_artist_details/:artistId

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

export const updateArtistDetails = async ({ artistId, artistName, artistFullName }: UpdateArtistDetailsParams): Promise<UpdateArtistPaymentDetailsResponse> => {
	const response = await APIAxios.put(`/admin/update_artist_details/${artistId}`, {
		artistName,
		artistFullName
	});
	return response.data;
};

export const useUpdateArtistDetails = (): UseMutationResult<UpdateArtistPaymentDetailsResponse, Error, UpdateArtistDetailsParams> => {
	return useMutation({
		mutationFn: updateArtistDetails
	});
};
