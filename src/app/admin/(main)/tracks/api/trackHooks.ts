import APIAxios from '@/utils/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UpdateTrackDto {
	artist?: string;
	trackTitle?: string;
	isrcCode?: string;
	upcCode?: string;
	catalogueId?: string;
	sharedRevenue?: {
		artistId: string;
		artistName?: string;
		percentage: number;
	}[];
}
const fetchTrackById = async (id: string) => {
	const { data } = await APIAxios.get(`/admin/track/${id}`);
	return data;
};

export const useGetTrack = (id: string) => {
	return useQuery({
		queryKey: ['track', id],
		queryFn: () => fetchTrackById(id),
		enabled: !!id
	});
};

const updateTrackData = async ({ id, data }: { id: string; data: UpdateTrackDto }) => {
	const response = await APIAxios.put(`/admin/track/${id}`, data);
	return response.data;
};

export const useUpdateTrack = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateTrackData,
		onSuccess: updatedTrack => {
			// Invalidate the track list and the single track cache to fetch fresh data
			queryClient.invalidateQueries({ queryKey: ['tracks'] });
			queryClient.invalidateQueries({ queryKey: ['track', updatedTrack._id] });
			alert('Track saved successfully!');
		},
		onError: error => {
			console.error('Update failed:', error);
			alert('Failed to save track.');
		}
	});
};

// 3. Delete Track Hook
const deleteTrackData = async (id: string) => {
	await APIAxios.delete(`/admin/track/${id}`);
};

export const useDeleteTrack = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: deleteTrackData,
		onSuccess: () => {
			// Invalidate the track list cache
			queryClient.invalidateQueries({ queryKey: ['tracks'] });
			alert('Track deleted successfully!');
			router.push('/admin/tracks');
		},
		onError: error => {
			console.error('Deletion failed:', error);
			alert('Failed to delete track.');
		}
	});
};
interface GetAllTracksParams {
	page: string;
	limit: string;
	search: string;
	sortBy: string;
	sortOrder: string;
}

export const trackHooks = async ({ page, limit, search, sortBy, sortOrder }: GetAllTracksParams) => {
	const response = await APIAxios.get(`/admin/all_tracks`, {
		params: {
			page,
			limit,
			...(search && { search }),
			...(sortBy && { sortBy }),
			...(sortOrder && { sortOrder })
		}
	});
	return response.data;
};

export const useGetAllTracks = (params: GetAllTracksParams) => {
	return useQuery({
		queryKey: ['tracks', params.page, params.limit, params.search, params.sortBy, params.sortOrder],
		queryFn: () => trackHooks(params),
		staleTime: 30000,
		gcTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		retry: 2
	});
};
