'use client';

import React, { useState } from 'react'; // Removed duplicate React/useState, removed unused useEffect
import { useParams } from 'next/navigation'; // Removed duplicate useParams/useRouter, removed unused useRouter
import { Button } from '@/components/ui/button'; // Removed duplicate Button
import { Input } from '@/components/ui/input'; // Removed duplicate Input
import { User, Loader2, ChevronRight } from 'lucide-react'; // Removed unused AlertCircle
import { useGetOneArtist } from '../../../../catalogue/api/getOneArtist'; // Corrected path
// Removed useGetOneWithdrawalSlip import
import { useUpdateWithdrawalSlip } from '../../../../catalogue/api/putUpdateWithdrawalSlip'; // Corrected path
import { formatCurrency } from '@/utils/currency';
import { PreviousPageButton } from '@/components/ui';
// Removed formatCurrency import as slip details are removed
// Removed formatDate import as slip details are removed
// Removed unused PreviousPageButton import

const WithdrawalUpdatePage: React.FC = () => {
	const params = useParams<{ artist_id: string; transaction_id: string }>();
	const { artist_id, transaction_id } = params;

	const [finalAmount, setFinalAmount] = useState<string>('');

	// Fetch Artist Data
	const { data: artistData, isLoading: isLoadingArtist } = useGetOneArtist({
		artistId: artist_id
	});

	// Removed Withdrawal Slip Fetch

	// Update Withdrawal Slip Mutation
	const { mutate: updateWithdrawalMutate, isPending: isUpdatingWithdrawal } = useUpdateWithdrawalSlip();

	// Extract data safely
	const artistName = artistData?.artistName || 'Loading Artist...';
	// Removed slip variable

	// Removed useEffect for pre-filling amount

	const handleUpdate = () => {
		const amount = parseFloat(finalAmount);
		if (!artist_id || !transaction_id || isNaN(amount) || amount < 0) {
			console.error('Invalid data for update');
			// Add user feedback (toast)
			return;
		}

		updateWithdrawalMutate({
			artistId: artist_id,
			transactionId: transaction_id,
			finalAmount: amount
			// Potentially add status update here if needed, e.g., status: 'Approved'
		});
	};

	// Simplified Loading State
	const isLoading = isLoadingArtist;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<span className="ml-2">Loading Artist Details...</span>
			</div>
		);
	}

	// Removed Withdrawal Error/Not Found checks

	// Removed getStatusIndicator function

	return (
		<div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
			<PreviousPageButton />
			<div className="p-6 rounded-lg bg-custom-gradient text-primary-foreground shadow-md">
				<div className="flex flex-col sm:flex-row-reverse justify-between items-start sm:items-center gap-4">
					{/* Artist Info */}
					<div className="flex items-center gap-3">
						<User className="w-8 h-8" />
						<div>
							<p className="text-sm text-primary-foreground/80">Artist Name</p>
							<h2 className="text-xl font-semibold">{artistName}</h2>
						</div>
					</div>
					{/* Transaction ID - Use transaction_id from params */}
					<div>
						<p className="text-sm text-primary-foreground/80">Artist Account Balance</p>
						{/* Display full or partial ID as needed */}
						<h2 className="text-xl font-mono font-semibold">{formatCurrency(artistData?.totalRoyaltyUSD || 0)}</h2>
					</div>
				</div>
			</div>
			{/* Simplified Update Section */}
			<div className="p-6 rounded-lg bg-card border shadow-sm space-y-6">
				{/* Removed Withdrawal Details Section */}

				{/* Always show update section */}
				<div className="space-y-4">
					<h4 className=" font-medium">How much do you want to withdraw from this artist?</h4>
					{/* Amount Input - Simplified */}
					<div className="relative">
						{/* Removed currency/wallet icons as currency is unknown without slip data */}
						{/* Added $ sign with z-index */}
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none z-10">$</span>
						<Input
							type="number"
							placeholder="Enter amount"
							value={finalAmount}
							onChange={e => setFinalAmount(e.target.value)}
							// Added padding-left for $, removed spinners
							className="h-10 text-base pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							min="0"
							step="0.01"
							disabled={isUpdatingWithdrawal}
						/>
						{/* Consider adding a label or helper text for currency if needed */}
					</div>

					{/* Update Button */}
					<div className="flex justify-center">
						<Button className="bg-primary hover:bg-primary/90" onClick={handleUpdate} disabled={isUpdatingWithdrawal || !finalAmount || parseFloat(finalAmount) < 0}>
							{isUpdatingWithdrawal ? 'Updating...' : 'Withdraw'}
							{isUpdatingWithdrawal ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ChevronRight className="h-4 w-4 " />}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WithdrawalUpdatePage;
