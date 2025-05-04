import { Button, Input, SelectSimple } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Artist } from '@/lib/types';
import { Save } from 'lucide-react';
import React, { useState } from 'react';
import { useUpdateArtistPaymentDetails } from '../../../catalogue/api/putArtistPaymentDetails';
import { toast } from 'sonner';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'; // Import necessary types

// Artist type is already imported from '@/lib/types'

interface ArtistOverviewProps {
	artist: Artist;
	// Replace 'any' with the specific 'Artist' type
	artistRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Artist, Error>>;
}

const ArtistOverview: React.FC<ArtistOverviewProps> = ({ artist, artistRefetch }) => {
	const { mutate, isPending } = useUpdateArtistPaymentDetails();

	// State to manage form inputs
	const [dealType, setDealType] = useState<string>(artist?.bankDetails?.dealType || 'Net Receipts');
	const [rate, setRate] = useState<number>(artist?.bankDetails?.rate || 80);
	const [currency, setCurrency] = useState<string>(artist?.bankDetails?.currency || 'USD');

	// Handle form submission
	const handleSubmit = () => {
		mutate(
			{
				artistId: artist._id, // Assuming artist._id exists
				paymentCurrency: currency,
				dealType,
				rate
			},
			{
				onSuccess: () => {
					artistRefetch();
					toast.success('Artist deal updated');
				},
				onError: error => {
					toast.error(error.message || 'Failed to update deal');
				}
			}
		);
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className="space-y-6">
				<Input label="Artist Name" value={artist?.artistName} readOnly />

				<Input label="Full Name" value={`${artist?.firstName || ''} ${artist?.lastName || ''}`} readOnly />

				<Input label="Email" value={artist?.email} readOnly type="email" />
			</div>

			<div className="space-y-6">
				<Input label="Bank Name" value={artist?.bankDetails?.bankName} readOnly />
				<Input label="Account Name" value={artist?.bankDetails?.accountName} readOnly />
				<Input label="Account Number" value={artist?.bankDetails?.accountNumber} readOnly />

				{/* <div className="space-y-4">
					<label className="text-sm text-admin-muted block">Auto Payment</label>
					<div className="flex items-start space-x-3">
						<div className="flex items-center h-5 mt-1">
							<input type="checkbox" className="h-4 w-4 rounded border-admin-border bg-admin-accent text-admin-primary focus:ring-admin-primary" />
						</div>
						<div>
							<label className="text-sm font-medium">Generate Auto Payment</label>
							<p className="text-xs text-admin-muted mt-1">Use the payments below to configure when an auto payment should take place, this should be no instance when producers or a third party should only be paid when other contract is recouped</p>
						</div>
					</div>
				</div> */}
			</div>

			<div className="col-span-1 md:col-span-2">
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
						<SelectSimple
							label="Deal Type"
							options={[
								{ value: 'Net Receipts', label: 'Net Receipts' },
								{ value: 'Gross Receipts', label: 'Gross Receipts' }
							]}
							valueKey="value"
							labelKey="label"
							placeholder="Select an option"
							value={dealType}
							onChange={value => setDealType(value as string)}
						/>

						<Input label="Rate %" value={rate.toString()} onChange={e => setRate(Number(e.target.value))} type="number" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
							value={currency}
							placeholder="Select currency"
							onChange={value => setCurrency(value as string)}
						/>
					</div>

					<div className="flex justify-end items-center">
						<Button className="max-md:size-10 max-md:p-0 mt-[26px]" disabled={isPending} onClick={handleSubmit}>
							{isPending ? (
								<div className="flex items-center justify-center w-full h-full">
									<LoadingBox size={24} color="white" />
								</div>
							) : (
								<>
									<Save size={16} className="md:mr-2" /> <span className="max-md:sr-only">Save</span>
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistOverview;
