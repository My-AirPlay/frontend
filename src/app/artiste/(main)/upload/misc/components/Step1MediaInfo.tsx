import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { Input, Select, SelectContent, SelectItem, SelectSimple, SelectTrigger, SelectValue } from '@/components/ui';

import { MediaInfoFormValues, mediaInfoSchema } from '../schema';
import { useMediaUploadStore } from '../store';
import { useState } from 'react';

export default function Step1MusicInfo() {
	const { mediaInfo, updateMediaInfo, setCurrentStep } = useMediaUploadStore();
	const { formattedData, isLoading } = useStaticAppInfo();
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [copyrightInputValue, setCopyrightInputValue] = useState<string>(mediaInfo.copyright ? mediaInfo.copyright.replace(/^\d{4}\s*/, '') : '');
	const [copyrightError, setCopyrightError] = useState('');
	const defaultValues = {
		title: mediaInfo.title,
		artistName: mediaInfo.artistName || 'Artist Name',
		mainGenre: mediaInfo.mainGenre,
		releaseDate: mediaInfo.releaseDate || new Date().toISOString().split('T')[0],
		description: mediaInfo.description || 'This is a sample description for the track.',
		recordLabel: mediaInfo.recordLabel || 'Sample Record Label',
		publisher: mediaInfo.publisher || 'Sample Publisher',
		copyright: mediaInfo.copyright || '2025 Copyright Owner',
		explicitContent: mediaInfo.explicitContent || 'No',
		lyrics: mediaInfo.lyrics || '',
		universalProductCode: mediaInfo.universalProductCode,
		releaseVersion: mediaInfo.releaseVersion
	};

	const form = useForm<MediaInfoFormValues>({
		resolver: zodResolver(mediaInfoSchema),
		defaultValues,
		mode: 'onChange'
	});

	const {
		handleSubmit,
		formState: { errors, isValid }
	} = form;

	const onSubmit = (data: MediaInfoFormValues) => {
		console.log('Form submitted with:', data);
		setCurrentStep('trackUpload');
		updateMediaInfo(data);
		toast.success('Music info saved successfully');
	};
	console.log(errors, isValid);

	if (isLoading) {
		return <div className="text-center py-8">Loading form data...</div>;
	}

	return (
		<div className="container max-w-3xl mx-auto px-4">
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Title <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Enter track title" hasError={!!errors.title} errormessage={errors.title?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="artistName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Artist Name <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Enter artist name" hasError={!!errors.artistName} errormessage={errors.artistName?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="mainGenre"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Genre <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<SelectSimple options={formattedData?.Genre} value={field.value} valueKey="value" labelKey="label" isLoadingOptions={isLoading} onChange={field.onChange} placeholder="Select genre" hasError={!!errors.mainGenre} errormessage={errors.mainGenre?.message} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="releaseDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Release Date <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input type="date" hasError={!!errors.releaseDate} errormessage={errors.releaseDate?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="col-span-full">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Enter track description" className={errors.description ? 'border-red-500' : ''} {...field} />
									</FormControl>
									{errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="recordLabel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Record Label <span className="text-primary">*</span>
									</FormLabel>
									<FormControl>
										<Input placeholder="Enter record label" hasError={!!errors.recordLabel} errormessage={errors.recordLabel?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="publisher"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Publisher</FormLabel>
									<FormControl>
										<Input placeholder="Enter publisher" hasError={!!errors.publisher} errormessage={errors.publisher?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="explicitContent"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Explicit Content</FormLabel>
									<FormControl>
										<SelectSimple
											options={[
												{ label: 'Yes', value: 'Yes' },
												{ label: 'No', value: 'No' }
											]}
											value={field.value}
											valueKey="value"
											labelKey="label"
											onChange={field.onChange}
											placeholder="Yes/No"
											hasError={!!errors.explicitContent}
											errormessage={errors.explicitContent?.message}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="universalProductCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel info="Enter your UPC if available, or we'll generate one.">Universal Product Code (UPC) (optional)</FormLabel>
									<FormControl>
										<Input placeholder="Enter UPC (optional)" hasError={!!errors.universalProductCode} errormessage={errors.universalProductCode?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="releaseVersion"
							render={({ field }) => (
								<FormItem>
									<FormLabel info="For remasters, live versions, remixes, etc.">Release Version </FormLabel>
									<FormControl>
										<Input placeholder="e.g., Remastered, Live" hasError={!!errors.releaseVersion} errormessage={errors.releaseVersion?.message} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="copyright"
							render={({ field }) => {
								const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i);

								const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
									const newValue = e.target.value;
									setCopyrightInputValue(newValue);

									if (!newValue.trim() && selectedYear) {
										setCopyrightError('Please enter copyright information, not just a year');
										field.onChange('');
									} else if (newValue.trim() && !selectedYear) {
										setCopyrightError('Please select a year');
										field.onChange('');
									} else {
										setCopyrightError('');
										field.onChange(newValue.trim() ? `${selectedYear} ${newValue.trim()}` : '');
									}
								};

								interface HandleYearChangeProps {
									year: string;
								}

								const handleYearChange = (year: HandleYearChangeProps['year']): void => {
									setSelectedYear(Number(year));

									if (!copyrightInputValue.trim() && year) {
										setCopyrightError('Please enter copyright information, not just a year');
										field.onChange('');
									} else {
										setCopyrightError('');
										field.onChange(copyrightInputValue.trim() ? `${year} ${copyrightInputValue.trim()}` : '');
									}
								};

								return (
									<FormItem>
										<FormLabel info="Year and name of copyright holder (e.g., 2024 Band Name).">
											Copyright <span className="text-primary">*</span>
										</FormLabel>
										<div className="flex gap-2 items-stretch">
											<Select value={selectedYear.toString()} onValueChange={handleYearChange}>
												<SelectTrigger className={`w-32 bg-[#383838] text-foreground rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-white/50 transition-all h-10 px-3 py-2 ${!selectedYear ? 'border-red-500' : ''}`}>
													<SelectValue placeholder="Year" />
												</SelectTrigger>
												<SelectContent>
													{years.map((year: number) => (
														<SelectItem key={year} value={year.toString()}>
															{year}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormControl className="flex-1">
												<Input placeholder="Copyright Owner" hasError={!!copyrightError || !!errors.copyright} errormessage={copyrightError || errors.copyright?.message} value={copyrightInputValue} onChange={handleInputChange} className="h-10" />
											</FormControl>
										</div>
										{(copyrightError || errors.copyright) && <p className="text-sm text-red-500 mt-1">{copyrightError || errors.copyright?.message}</p>}
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="lyrics"
							render={({ field }) => (
								<FormItem className="col-span-full">
									<FormLabel>Lyrics</FormLabel>
									<FormControl>
										<Textarea placeholder="Enter lyrics" className="min-h-32" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-center my-8">
						<Button type="submit" size="lg" className="rounded-full">
							Save & Continue <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
