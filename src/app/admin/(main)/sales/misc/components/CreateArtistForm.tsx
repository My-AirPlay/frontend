/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useCreateArtist } from '@/app/admin/(main)/catalogue/api/postCreateArtist';
import { Button, FileUploader, SelectSimple, SingleDatePicker, Tabs, TabsContent, TabsList, TabsTrigger, Input } from '@/components/ui';

interface CreateArtistFormProps {
	onSave: (artistData: any) => void;
}

interface FormData {
	email: string;
	artistName: string;
	bankName: string;
	accountName: string;
	fullName: string;
	accountNumber: string;
	currency: string;
	rate: string;
	dealType?: string;
	contractDetails: {
		startDate: Date;
		endDate: Date;
	};
	contractFile?: File;
}

const CreateArtistForm: React.FC<CreateArtistFormProps> = ({ onSave }) => {
	const [activeTab, setActiveTab] = useState('overview');

	const { control, handleSubmit, setValue } = useForm<FormData>({
		defaultValues: {
			artistName: '',
			fullName: '',
			email: '',
			bankName: '',
			accountName: '',
			accountNumber: '',
			currency: 'USD',
			rate: '',
			dealType: '',
			contractDetails: {
				startDate: new Date(),
				endDate: new Date()
			},
			contractFile: undefined
		}
	});

	const { mutate: createArtist, isPending } = useCreateArtist();

	const onSubmit = (data: FormData) => {
		createArtist(data, {
			onSuccess: () => {
				onSave(data);
				toast.success('Artist created successfully!', { duration: 3000 }); // More concise success message
			},
			onError: (error: Error | AxiosError) => {
				console.error('Failed to create artist:', error);
				console.error('Failed to create artist:', activeTab);
				let errorMessage = 'Failed to create artist. Please try again.';

				if (error instanceof AxiosError) {
					if (error.response?.data?.message && Array.isArray(error.response.data.message) && error.response.data.message.length > 0) {
						errorMessage = error.response.data.message.join(', '); // Join array messages
					} else if (error.response?.data?.message) {
						errorMessage = error.response.data.message; // Handle single string message
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
		<div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
			<div className="w-full max-w-4xl bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-6 md:p-10 my-8">
				<h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mb-8 text-center">Create New Artist Profile</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
					<Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
						<TabsList className="bg-zinc-800 border border-zinc-700 rounded-lg p-1.5 flex justify-start mb-6 overflow-x-auto scrollbar-thin">
							<TabsTrigger
								value="overview"
								className="flex-shrink-0 px-6 py-2.5 text-lg font-medium text-zinc-300 rounded-md transition-colors duration-200
                           data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-md
                           hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value="contract"
								className="flex-shrink-0 px-6 py-2.5 text-lg font-medium text-zinc-300 rounded-md transition-colors duration-200
                           data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-md
                           hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
							>
								Contract
							</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
								<Controller control={control} name="bankName" render={({ field }) => <Input label="Bank Name" type="text" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Bank Name" />} />
								<Controller control={control} name="accountName" render={({ field }) => <Input label="Account Name" type="text" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Account Name" />} />
								<Controller control={control} name="accountNumber" render={({ field }) => <Input label="Account Number" type="text" value={field.value} onChange={field.onChange} className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500" placeholder="Enter Account Number" />} />
							</div>

							{/* The commented out "Terms" section (remains commented out as per your original code) */}
							{/* <div className="col-span-1 md:col-span-2">
                <div className="p-6 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-zinc-200">Terms</h3>
                    <button className="focus:outline-none text-zinc-400 hover:text-primary-400 transition-colors">
                      <ChevronDown size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">
                    This section is to state how the percentage will be shared between artist and label.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Controller
                      control={control}
                      name="dealType"
                      render={({ field }) => (
                        <SelectSimple
                          label="Deal Type"
                          options={[
                            { value: 'Net Receipts', label: 'Net Receipts' },
                            { value: 'Gross Receipts', label: 'Gross Receipts' }
                          ]}
                          valueKey="value"
                          labelKey="label"
                          placeholder="Select an option"
                          onChange={value => field.onChange(value)}
                          className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-primary-500"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="rate"
                      render={({ field }) => (
                        <Input
                          label="Rate %"
                          type="text"
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:ring-primary-500"
                          placeholder="Enter Rate %"
                        />
                      )}
                    />
                  </div>
                </div>
              </div> */}
						</TabsContent>

						<TabsContent value="contract" className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Controller control={control} name="contractDetails.startDate" render={({ field }) => <SingleDatePicker label="Start Date" onChange={date => field.onChange(date)} defaultDate={field.value} value={field.value} className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-primary-500" />} />
								<Controller control={control} name="contractDetails.endDate" render={({ field }) => <SingleDatePicker label="End Date" onChange={date => field.onChange(date)} defaultDate={field.value} value={field.value} className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-primary-500" />} />
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-zinc-200 mb-2">Upload Artist Contract</label>
								<Controller
									control={control}
									name="contractFile"
									render={({}) => (
										<FileUploader
											supportedFormats={['PDF', 'MSDOC']}
											maxFileSize={40}
											onFileSelected={file => {
												setValue('contractFile', file);
											}}
											id="artist-contract"
											className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700" // Styled FileUploader
										/>
									)}
								/>
							</div>
						</TabsContent>
					</Tabs>

					<div className="flex justify-center mt-10">
						<Button
							type="submit"
							className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition-all duration-200
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
								'Save and Continue'
							)}
						</Button>
					</div>
				</form>
			</div>

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
