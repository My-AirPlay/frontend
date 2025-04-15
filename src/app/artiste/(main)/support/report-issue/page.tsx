'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowRight, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea, Button, Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { SelectSimple } from '@/components/ui';

import { useReportIssue } from './misc/api';
import { SmallSpinner } from '@/components/icons';

const formSchema = z.object({
	complaintType: z.string().min(1, 'Please select a complaintType'),
	complain: z.string().min(1, 'Please enter your complaint'),
	attachment: z.instanceof(File).optional().nullable()
});

export type ArtistReportIssueFormValues = z.infer<typeof formSchema>;

export default function ReportIssuePage() {
	const { formattedData, isLoading } = useStaticAppInfo();

	const form = useForm<ArtistReportIssueFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			complaintType: '',
			complain: '',
			attachment: null
		}
	});

	const { mutate: createComplaint, isPending: isCreatingComplaint } = useReportIssue();
	const onSubmit = (data: ArtistReportIssueFormValues) => {
		createComplaint(data, {
			onSuccess: () => {
				form.reset();
				toast.success('Your complaint has been submitted successfully.');
			},
			onError: error => {
				toast.error('An error occurred while submitting your complaint.');
				console.error(error);
			}
		});
		console.log(data);
	};

	return (
		<div>
			<h2 className="text-xl font-medium mb-2">Report an Issue</h2>
			<p className="text-gray-400 mb-6">Kindly drop your complaint here and our customer representative will attend to it.</p>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
					<FormField
						control={form.control}
						name="complaintType"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="block mb-2 text-sm font-medium">Complaint Type</FormLabel>
								<FormControl>
									<SelectSimple options={formattedData?.ComplaintType} value={field.value} valueKey="value" labelKey="label" onChange={field.onChange} placeholder="Select complaint type" isLoadingOptions={isLoading} hasError={!!form.formState.errors.complaintType} errormessage={form.formState.errors.complaintType?.message} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="complain"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="block mb-2 text-sm font-medium">What is your complaint?</FormLabel>
								<FormControl>
									<Textarea placeholder="Share a reply" className="w-full bg-secondary border-gray-700 text-white min-h-[150px]" {...field} hasError={!!form.formState.errors.complain} errormessage={form.formState.errors.complain?.message} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="attachment"
						render={({ field: { onChange } }) => (
							<FormItem>
								<FormLabel className="block mb-2 text-sm font-medium">Share a attachment (Optional)</FormLabel>
								<FormControl>
									<div className="border border-dashed border-[#FF6B00] rounded-md p-8 text-center">
										<div className="flex flex-col items-center justify-center">
											<Upload className="h-10 w-10 text-gray-500 mb-2" />
											<p className="text-sm text-gray-400 mb-1">
												Drag & drop files or <span className="text-[#FF6B00]">Browse</span>
											</p>
											<p className="text-xs text-gray-500">Supported formats: JPEG, PNG, GIF, MP4</p>
										</div>
										<input
											type="file"
											className="hidden"
											id="attachment-upload"
											accept="image/jpeg,image/png,image/gif,video/mp4"
											onChange={e => {
												if (e.target.files && e.target.files[0]) {
													onChange(e.target.files[0]);
												}
											}}
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex justify-center">
						<Button type="submit" className=" text-white px-10">
							Submit
							<ArrowRight className="ml-2" />
							{isCreatingComplaint && <SmallSpinner />}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
