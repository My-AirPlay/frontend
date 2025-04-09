import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

// Define the payload interface
interface CreateArtistPayload {
	name: string;
	email: string;
	bio?: string; // Optional field
	profileImage?: File; // Optional file upload for artist profile image
}

export const createArtist = async (payload: CreateArtistPayload) => {
	// Use FormData if there's a file, otherwise use JSON
	const hasFile = !!payload.profileImage;
	let body: FormData | CreateArtistPayload;
	let headers = {};

	if (hasFile) {
		const formData = new FormData();
		formData.append('name', payload.name);
		formData.append('email', payload.email);
		if (payload.bio) formData.append('bio', payload.bio);
		if (payload.profileImage) formData.append('profileImage', payload.profileImage);

		body = formData;
		headers = { 'Content-Type': 'multipart/form-data' };
	} else {
		body = {
			name: payload.name,
			email: payload.email,
			bio: payload.bio
		};
		headers = { 'Content-Type': 'application/json' };
	}

	const response = await APIAxios.post(`/admin/create-artist`, body, { headers });
	return response.data;
};

export const useCreateArtist = () => {
	return useMutation({
		mutationFn: createArtist,
		onSuccess: data => {
			console.log('Artist created successfully:', data);
		},
		onError: error => {
			console.error('Error creating artist:', error);
		}
	});
};
