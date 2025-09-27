/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useCreateArtist } from '@/app/admin/(main)/catalogue/api/postCreateArtist';
import { Button, SelectSimple, Input } from '@/components/ui';

interface CreateArtistFormProps {
	onSave: (artistData: any) => void;
	onCancel: () => void; // Added for the close button
}

interface FormData {
	email: string;
	artistName: string;
	fullName: string;
	currency: string;
}

const CreateArtistForm: React.FC<CreateArtistFormProps> = ({ onSave, onCancel }) => {
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			artistName: '',
			fullName: '',
			email: '',
			currency: 'NGN'
		}
	});

	const { mutate: createArtist, isPending } = useCreateArtist();

	const onSubmit = (data: FormData) => {
		createArtist(data, {
			onSuccess: () => {
				onSave(data);
				toast.success('Artist created successfully!', { duration: 3000 });
			},
			onError: (error: Error | AxiosError) => {
				console.error('Failed to create artist:', error);
				let errorMessage = 'Failed to create artist. Please try again.';

				if (error instanceof AxiosError) {
					if (error.response?.data?.message && Array.isArray(error.response.data.message) && error.response.data.message.length > 0) {
						errorMessage = error.response.data.message.join(', ');
					} else if (error.response?.data?.message) {
						errorMessage = error.response.data.message;
					} else if (error.message) {
						errorMessage = error.message;
					}
				} else if (error.message) {
					errorMessage = error.message;
				}
				toast.error(errorMessage, { duration: 10000 });
			}
		});
	};

	return (
		// ✨ UPDATED STYLING HERE ✨
		<div className="w-full max-w-3xl bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-6 md:p-8 my-8 relative">
			<h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-6 text-center">Create New Artist Profile</h1>

			{/* Add a close button inside the form for better accessibility */}
			<Button variant="ghost" size="sm" className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100" onClick={onCancel}>
				X
			</Button>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{' '}
				{/* Reduced space-y */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{' '}
					{/* Reduced gap */}
					<Controller control={control} name="artistName" render={({ field }) => <Input label="Artist Name" type="text" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Artist Name" />} />
					<Controller control={control} name="fullName" render={({ field }) => <Input label="Full Name" type="text" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Full Name" />} />
					<Controller
						control={control}
						name="currency"
						render={({ field }) => (
							<SelectSimple
								label="Payment Currency"
								options={[
									{ value: 'USD', label: 'USD' },
									{ value: 'EUR', label: 'EUR' },
									{ value: 'GBP', label: 'GBP' },
									{ value: 'NGN', label: 'NGN' }
								]}
								valueKey="value"
								labelKey="label"
								defaultValue={field.value}
								onChange={value => field.onChange(value)}
								className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-primary-500"
							/>
						)}
					/>
					<Controller control={control} name="email" render={({ field }) => <Input label="Email" type="email" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Email" />} />
				</div>
				<div className="flex justify-center mt-6">
					{' '}
					{/* Reduced mt */}
					<Button
						type="submit"
						className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
						disabled={isPending}
					>
						{isPending ? (
							<span className="flex items-center">
								<svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Saving...
							</span>
						) : (
							'Save Artist'
						)}
					</Button>
				</div>
			</form>

			{/* Tailwind CSS scrollbar utility classes (for custom scrollbar styling) */}
			<style>
				{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #525252 #27272a; /* thumb track */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #525252; /* zinc-600 */
          border-radius: 10px;
          border: 2px solid #27272a; /* zinc-900 */
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #27272a; /* zinc-900 */
        }
        `}
			</style>
		</div>
	);
};

export default CreateArtistForm;
