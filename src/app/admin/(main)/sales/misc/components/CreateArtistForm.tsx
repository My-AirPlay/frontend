import React, { useState } from 'react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, FileUploader, Input, SelectSimple, SingleDatePicker } from '@/components/ui';
import { useCreateArtist } from '../../../catalogue/api/postCreateArtist';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateArtistFormProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSave: (artistData: any) => void;
}

interface FormData {
	email: string;
	artistName: string;
	bankName: string;
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [activeTab, setActiveTab] = useState('overview');

	const { control, handleSubmit, setValue } = useForm<FormData>({
		defaultValues: {
			artistName: '',
			fullName: '',
			email: '',
			bankName: '',
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

	// Use the create artist mutation
	const { mutate: createArtist, isPending } = useCreateArtist();

	const onSubmit = (data: FormData) => {
		console.log('createArtist', data);
		createArtist(data, {
			onSuccess: () => {
				onSave(data); // Only call onSave if the mutation succeeds
			},
			onError: error => {
				console.error('Failed to create artist:', error);
				toast.error(error?.response?.data?.message?.[0] || 'Failed to create artist', { duration: 10000 });
			}
		});
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Create Artist</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Tabs defaultValue="overview" onValueChange={setActiveTab}>
					<TabsList className="bg-transparent border-b border-border w-full justify-start mb-6">
						<TabsTrigger value="overview" className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
							Overview
						</TabsTrigger>
						{/* <TabsTrigger value="contract"  className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
							Contract
						</TabsTrigger> */}
					</TabsList>

					<TabsContent value="overview" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller control={control} name="artistName" render={({ field }) => <Input label="Artist Name" type="text" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Artist Name" />} />
							<Controller control={control} name="fullName" render={({ field }) => <Input label="Full Name" type="text" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Full Name" />} />
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
									/>
								)}
							/>
							<Controller control={control} name="email" render={({ field }) => <Input label="Email" type="email" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Email" />} />
							<Controller control={control} name="bankName" render={({ field }) => <Input label="Bank Name" type="text" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Bank Name" />} />
							<Controller control={control} name="accountNumber" render={({ field }) => <Input label="Account Number" type="text" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Account Number" />} />

							{/* <div className="col-span-1 md:col-span-2">
								<div className="admin-card">
									<div className="flex justify-between items-center">
										<h3 className="text-lg font-medium mb-4">Terms</h3>
										<button className="focus:outline-none">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>
									</div>
									<p className="text-sm text-admin-primary mb-4">This section is to state how the percentage will be shared between artist and label.</p>
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
												/>
											)}
										/>
										<Controller control={control} name="rate" render={({ field }) => <Input label="Rate %" type="text" value={field.value} onChange={field.onChange} className="w-full" placeholder="Enter Rate %" />} />
									</div>
								</div>
							</div> */}
						</div>
					</TabsContent>

					<TabsContent value="contract" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller control={control} name="contractDetails.startDate" render={({ field }) => <SingleDatePicker label="Start Date" onChange={date => field.onChange(date)} defaultDate={field.value} value={field.value} />} />
							<Controller control={control} name="contractDetails.endDate" render={({ field }) => <SingleDatePicker label="End Date" onChange={date => field.onChange(date)} defaultDate={field.value} value={field.value} />} />
						</div>
						<div className="space-y-2">
							<label className="block text-sm font-medium mb-2">Upload Artist Contract</label>
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
									/>
								)}
							/>
						</div>
					</TabsContent>
				</Tabs>

				<div className="flex justify-center mt-8">
					<Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8" disabled={isPending}>
						{isPending ? 'Saving...' : 'Save and Continue'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateArtistForm;
