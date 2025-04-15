import React, { useEffect, useState } from 'react';
import { SelectSimple, SingleDatePicker } from '@/components/ui';
import { Artist } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface ArtistAnalyticsProps {
	artist: Artist;
}

interface FileWithPreview {
	file: File | null;
	previewUrl: string | null;
}

const ArtistContract: React.FC<ArtistAnalyticsProps> = ({ artist }) => {
	const [primaryFile, setPrimaryFile] = useState<FileWithPreview>({ file: null, previewUrl: null });

	const handlePrimaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			setPrimaryFile({ file, previewUrl });
		}
	};

	// Clean up object URLs to prevent memory leaks
	useEffect(() => {
		return () => {
			if (primaryFile.previewUrl) URL.revokeObjectURL(primaryFile.previewUrl);
		};
	}, [primaryFile.previewUrl]);

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<SingleDatePicker label="Start Date" defaultDate={new Date(artist?.contractDetails?.startDate) || new Date()} value={artist?.contractDetails?.startDate || new Date()} />
				<SingleDatePicker label="End Date" defaultDate={new Date(artist?.contractDetails?.endDate) || new Date()} value={artist?.contractDetails?.endDate || new Date()} />
			</div>

			{artist?.contractDetails?.contract && (
				<div className="space-y-4">
					<h2 className="text-lg font-medium">Preview Artist Contract</h2>

					<Link href={artist?.contractDetails?.contract} className="text-primary hover:underline" target="_blank">
						Contract Preview
					</Link>

					<SelectSimple
						label="Payment Currency"
						options={[
							{ value: 'ACTIVE', label: 'ACTIVE' },
							{ value: 'PENDING', label: 'PENDING' },
							{ value: 'DEACTIVATED', label: 'DEACTIVATED' }
						]}
						valueKey="value"
						labelKey="label"
						defaultValue={artist?.contractDetails?.status || ''}
						placeholder="Select currency"
						onChange={() => {}}
					/>
				</div>
			)}
			<div className="space-y-4">
				<h2 className="text-lg font-medium">{!artist?.contractDetails?.contract ? 'Upload' : 'Update'} Artist Contract</h2>

				<div className="relative border-2 border-dashed border-primary rounded-md p-8 ">
					{primaryFile.previewUrl ? (
						<div className="min-h-[300px]">
							<Image className="absolute top-0 left-0 w-full h-full" src={primaryFile.previewUrl} alt="contract preview" width={500} height={500} />
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
								<p className="text-xs text-admin-muted">File Size: Not more tha 40MB</p>
							</div>
						</div>
					)}
					<input type="file" className=" absolute z-[2] top-0 left-0 w-full h-full cursor-pointer opacity-0" accept="*image" onChange={handlePrimaryFileChange} />
				</div>
			</div>
		</div>
	);
};

export default ArtistContract;
