import React, { useEffect, useState } from 'react';
import { SelectSimple, SingleDatePicker } from '@/components/ui';
import { Artist } from '@/lib/types';
import Link from 'next/link';
import { useUpdateArtistContract, useUploadArtistContract } from '../../../catalogue/api/postAdminUploadArtistContract';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { toast } from 'sonner';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

// Helper function to safely create a Date object
// Defaults to today's date if the provided string is invalid or missing.
const safeNewDate = (dateString?: string | null): Date => {
	if (dateString) {
		const date = new Date(dateString);
		if (!isNaN(date.getTime())) {
			return date;
		}
	}
	return new Date(); // Fallback to current date
};

interface ArtistContractProps {
	artist: Artist;
	artistRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Artist, Error>>;
}

interface UploadArtistContractPayload {
	contract: File | null;
	email: string;
	startDate: string;
	endDate: string;
	status: string;
}

interface FileWithPreview {
	file: File | null;
	previewUrl: string | null;
}

const ArtistContract: React.FC<ArtistContractProps> = ({ artist, artistRefetch }) => {
	const [primaryFile, setPrimaryFile] = useState<FileWithPreview>({ file: null, previewUrl: null });

	// 1. State for startDate, initialized safely.
	const [startDate, setStartDate] = useState<Date>(safeNewDate(artist?.contractDetails?.startDate));

	// 2. State for endDate, initialized based on the initial startDate.
	const [endDate, setEndDate] = useState<Date>(() => {
		const initialEndDate = new Date(startDate);
		initialEndDate.setFullYear(initialEndDate.getFullYear() + 1);
		return initialEndDate;
	});

	// 3. This Effect hook will run ONLY when `startDate` changes.
	useEffect(() => {
		// When startDate changes, we calculate the new endDate and update its state.
		const newEndDate = new Date(startDate);
		newEndDate.setFullYear(newEndDate.getFullYear() + 1);
		setEndDate(newEndDate);
	}, [startDate]); // The dependency array makes this effect reactive to startDate changes.

	const [status, setStatus] = useState<string>(artist?.contractDetails?.status || 'ACTIVE');

	const handlePrimaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			setPrimaryFile({ file, previewUrl });
		}
	};

	const { mutate: mutateCreateContract, isPending } = useUploadArtistContract();
	const { mutate: mutateUpdateContract, isPending: updateContractPending } = useUpdateArtistContract();

	const handleSubmit = () => {
		const payload: UploadArtistContractPayload = {
			contract: primaryFile?.file,
			email: artist?.email,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
			status
		};

		if (!artist?.contractDetails?.contract) {
			mutateCreateContract(payload, {
				onSuccess: () => {
					artistRefetch();
					toast.success('Artist contract created');
				},
				onError: error => {
					toast.error(error.message || 'Failed to create contract');
				}
			});
		} else {
			mutateUpdateContract(payload, {
				onSuccess: () => {
					artistRefetch();
					toast.success('Artist contract updated');
				},
				onError: error => {
					toast.error(error.message || 'Failed to update contract');
				}
			});
		}
	};

	useEffect(() => {
		return () => {
			if (primaryFile.previewUrl) URL.revokeObjectURL(primaryFile.previewUrl);
		};
	}, [primaryFile.previewUrl]);

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* 4. The onChange for the start date picker can now simply call setStartDate */}
				<SingleDatePicker label="Start Date" value={startDate} onChange={setStartDate} />

				<SingleDatePicker label="End Date" value={endDate} onChange={() => {}} disabled />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
					defaultValue={artist?.contractDetails?.status || ''}
					placeholder="Select currency"
					onChange={setStatus}
				/>
			</div>

			{artist?.contractDetails?.contract && (
				<div className="space-y-4">
					<h2 className="text-lg font-medium">Preview Artist Contract</h2>
					<Link href={artist?.contractDetails?.contract} className="text-primary hover:underline" target="_blank">
						Contract Preview
					</Link>
				</div>
			)}
			<div className="space-y-4">
				<h2 className="text-lg font-medium">{!artist?.contractDetails?.contract ? 'Upload' : 'Update'} Artist Contract</h2>

				<div className="relative border-2 border-dashed border-primary rounded-md p-8 ">
					{primaryFile.previewUrl ? (
						<div className="min-h-[300px]">
							<iframe src={primaryFile.previewUrl} title="PDF Preview" width="100%" height="600px" className="absolute top-0 left-0 w-full h-full" />
							<div className=" h-20 w-20 text-admin-muted absolute z-[3] top-1/2  -translate-y-1/2  left-1/2  -translate-x-1/2  ">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
							</div>
						</div>
					) : (
						<div className="text-center">
							<div className="mx-auto h-20 w-20 text-admin-muted mb-4">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
							</div>
							<div className="space-y-1">
								<p className="text-sm">
									{!artist?.contractDetails?.contract ? 'Upload' : 'Update'} or <span className="text-admin-primary">Browse</span>
								</p>
								<p className="text-xs text-admin-muted">Supported formats: PDF, MSDOC</p>
								<p className="text-xs text-admin-muted">File Size: Not more tha 15MB</p>
							</div>
						</div>
					)}
					<input type="file" className=" absolute z-[2] top-0 left-0 w-full h-full cursor-pointer opacity-0" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handlePrimaryFileChange} />
				</div>
			</div>

			<div className="flex justify-end items-center mt-8">
				<Button className="max-md:size-10 max-md:p-0" disabled={isPending || updateContractPending} onClick={() => handleSubmit()}>
					{isPending || updateContractPending ? (
						<div className="flex items-center justify-center w-full h-full">
							<LoadingBox size={24} color="white" />
						</div>
					) : (
						<>
							<Save size={16} className="md:mr-2" />
							<span className="max-md:sr-only">Save</span>
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

export default ArtistContract;
