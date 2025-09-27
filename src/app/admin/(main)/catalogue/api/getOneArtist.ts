import APIAxios from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Define the query parameters interface
interface GetOneArtistParams {
	artistId: string;
}

export const getOneArtist = async ({ artistId }: GetOneArtistParams) => {
	const response = await APIAxios.get(`/admin/get_one_artist`, {
		params: {
			artistId
		}
	});
	return response.data;
};

export const useGetOneArtist = (params: GetOneArtistParams) => {
	return useQuery({
		queryKey: ['oneArtist', params.artistId], // Unique key for caching
		queryFn: () => getOneArtist(params)
	});
};

export const deleteOneArtist = async (artistId: string) => {
	const response = await APIAxios.delete(`/admin/delete-artist/${artistId}`);
	console.log(response);
	if (response.status === 204) {
		console.log('returning success');
		return { success: true };
	}
	return response.data;
};

// src/app/admin/(main)/catalogue/api/deleteOneArtist.ts

export const useDeleteArtist = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: deleteOneArtist,
		onSuccess: async () => {
			toast.success('Artist deleted successfully!');
			await router.push('/admin/contracts');
			await queryClient.invalidateQueries({ queryKey: ['allArtists'] });
		},
		onError: () => {
			const errorMessage = 'Failed to delete artist.';
			toast.error(errorMessage);
		}
	});
};
