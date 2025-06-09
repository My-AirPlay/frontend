'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowRight, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { Textarea, Button, Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { SelectSimple } from '@/components/ui';
import { SmallSpinner } from '@/components/icons';
import { useState } from 'react';
import { useReportIssue } from '@/app/artiste/(main)/support/misc/api';
import Image from 'next/image';

const formSchema = z.object({
	complaintType: z.string().min(1, 'Please select a complaint type'),
	complain: z.string().min(1, 'Please enter your complaint'),
	attachments: z.instanceof(File).optional().nullable()
});

export type ArtistReportIssueFormValues = z.infer<typeof formSchema>;

export default function ReportIssuePage() {
	const { formattedData, isLoading } = useStaticAppInfo();

	const form = useForm<ArtistReportIssueFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			complaintType: '',
			complain: '',
			attachments: null
		}
	});

	const file = form.watch('attachments');

	const getPreview = () => {
		if (!file) return null;
		const url = URL.createObjectURL(file);

		if (file.type.startsWith('image/')) {
			return <Image src={url} alt="Preview" className="mt-4 max-w-xs rounded" />;
		}

		if (file.type === 'video/mp4') {
			return (
				<video controls className="mt-4 max-w-xs rounded">
					<source src={url} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			);
		}

		return null;
	};

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { mutate: createComplaint } = useReportIssue();
	const onSubmit = async (data: ArtistReportIssueFormValues) => {
		setIsSubmitting(true);
		createComplaint(data, {
			onSuccess: () => {
				toast.success('Your complaint has been submitted successfully.');
				form.reset();
				setIsSubmitting(false);
			},
			onError: error => {
				toast.error('An error occurred while submitting your complaint.');
				console.error(error);
				setIsSubmitting(false);
				form.reset();
			}
		});
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
								<FormLabel>Complaint Type</FormLabel>
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
								<FormLabel>What is your complaint?</FormLabel>
								<FormControl>
									<Textarea placeholder="Share a reply" className="w-full bg-secondary border-gray-700 text-white min-h-[150px]" {...field} hasError={!!form.formState.errors.complain} errormessage={form.formState.errors.complain?.message} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="attachments"
						render={({ field: { onChange } }) => (
							<FormItem>
								<FormLabel>Share an attachment (Optional)</FormLabel>
								<FormControl>
									<div className="border border-dashed border-[#FF6B00] rounded-md p-8 text-center">
										<div className="flex flex-col items-center justify-center">
											<Upload className="h-10 w-10 text-gray-500 mb-2" />
											<p className="text-sm text-gray-400 mb-1">
												Drag & drop file or{' '}
												<label htmlFor="attachment-upload" className="text-[#FF6B00] cursor-pointer">
													Browse
												</label>
											</p>
											<p className="text-xs text-gray-500">Supported formats: JPEG, PNG, GIF, MP4</p>
										</div>

										<input
											type="file"
											className="hidden"
											id="attachment-upload"
											accept="image/jpeg,image/png,image/gif,video/mp4"
											onChange={e => {
												if (e.target.files?.[0]) {
													onChange(e.target.files[0]);
												}
											}}
										/>

										{file && (
											<div className="mt-4 text-left text-sm text-gray-700">
												<p className="font-medium">Selected file: {file.name}</p>
												{getPreview()}
											</div>
										)}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex justify-center">
						<Button type="submit" className="text-white px-10" disabled={isSubmitting}>
							Submit
							<ArrowRight className="ml-2" />
							{isSubmitting && <SmallSpinner />}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
