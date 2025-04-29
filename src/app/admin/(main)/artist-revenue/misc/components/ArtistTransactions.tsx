/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react'; // Import useEffect, useMemo
import { Button } from '@/components/ui/button';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react'; // Added ArrowUp, ArrowDown
import { DataTable, Input } from '@/components/ui'; // Added Input
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Added DropdownMenu components
import { useGetAllWithdrawalSlips } from '../../../catalogue/api/getAllWithdrawalSlips';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation'; // Added hooks
import { formatCurrency } from '@/utils/currency';

// Updated interface to match API response for withdrawal slips
interface WithdrawalSlipData {
	_id: string;
	artistId: string;
	status: string; // "Pending", "Approved", "Paid", etc.
	payoutCurrency: string;
	dealType: string;
	rate: number;
	proposedAmount: number;
	totalRevenue: number;
	activityPeriod: string;
	createdAt: string; // ISO Date string
	updatedAt: string; // ISO Date string
	__v?: number; // Optional __v field
}

// Helper to format date string
const formatDate = (dateString: string) => {
	if (!dateString) return '-';
	try {
		return new Date(dateString).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return dateString; // Return original if formatting fails
	}
};

const ArtistTransactions: React.FC = ({}) => {
	const { artist_id } = useParams<{ artist_id: string }>();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// State for Show All/Less
	const [showAllCredits, setShowAllCredits] = useState(false);
	const [showAllDebits, setShowAllDebits] = useState(false);

	// State for search & sorting
	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'createdAt'); // Default sort by date
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'); // Default descending date
	const [inputValue, setInputValue] = useState<string>(searchTerm); // State for the input field's value

	console.log('artist_id', artist_id);
	const { data: withdrawalsData, isLoading: withdrawalsLoading } = useGetAllWithdrawalSlips({
		page: 1,
		limit: 100,
		artistId: artist_id
		// removed enabled: !!artist_id
	});

	// Function to update URL search params for search and sorting
	const updateUrlParams = (updates: { searchTerm?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
		const params = new URLSearchParams(searchParams.toString());
		Object.entries(updates).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				params.set(key, String(value));
			} else {
				params.delete(key);
			}
		});
		// Update state based on what was passed
		if (updates.searchTerm !== undefined) setSearchTerm(updates.searchTerm);
		if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
		if (updates.sortOrder !== undefined) setSortOrder(updates.sortOrder);
		router.push(`${pathname}?${params.toString()}`, { scroll: false }); // Prevent scroll jump
	};

	// Effect to sync state with URL on load/change
	useEffect(() => {
		const currentUrlSearchTerm = searchParams.get('searchTerm') || '';
		const currentUrlSortBy = searchParams.get('sortBy') || 'createdAt';
		const currentUrlSortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

		if (searchTerm !== currentUrlSearchTerm) {
			setSearchTerm(currentUrlSearchTerm);
			setInputValue(currentUrlSearchTerm);
		}
		if (sortBy !== currentUrlSortBy) setSortBy(currentUrlSortBy);
		if (sortOrder !== currentUrlSortOrder) setSortOrder(currentUrlSortOrder);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	// Effect to debounce search input
	useEffect(() => {
		const handler = setTimeout(() => {
			if (inputValue !== searchTerm) {
				// Only update if debounced value is different
				updateUrlParams({ searchTerm: inputValue });
			}
		}, 500); // 500ms debounce delay
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	// API response structure from user example: { data: WithdrawalSlipData[] }
	const allWithdrawalSlipsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];

	// Apply client-side filtering and sorting using useMemo
	const allWithdrawalSlipsFilteredSorted = useMemo(() => {
		let filtered = allWithdrawalSlipsRaw;

		// 1. Filter by searchTerm (checking relevant fields like activityPeriod, status, maybe amount)
		if (searchTerm) {
			const lowerSearchTerm = searchTerm.toLowerCase();
			filtered = filtered.filter(
				slip =>
					slip.activityPeriod?.toLowerCase().includes(lowerSearchTerm) ||
					slip.status?.toLowerCase().includes(lowerSearchTerm) ||
					String(slip.totalRevenue)?.includes(lowerSearchTerm) || // Check amounts as strings
					String(slip.proposedAmount)?.includes(lowerSearchTerm) ||
					slip._id?.slice(-6).includes(lowerSearchTerm) // Check short ID
			);
		}

		// 2. Sort the filtered list
		filtered.sort((a, b) => {
			let valA: any = a[sortBy as keyof WithdrawalSlipData];
			let valB: any = b[sortBy as keyof WithdrawalSlipData];

			// Handle date sorting specifically
			if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
				valA = new Date(valA).getTime();
				valB = new Date(valB).getTime();
			}
			// Handle numeric sorting
			else if (typeof valA === 'number' && typeof valB === 'number') {
				// No conversion needed
			}
			// Default to string comparison
			else {
				valA = String(valA).toLowerCase();
				valB = String(valB).toLowerCase();
			}

			if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
			if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});

		return filtered;
	}, [allWithdrawalSlipsRaw, searchTerm, sortBy, sortOrder]);

	// Filter based on status: Pending = Debit, Others = Credit (using the filtered/sorted list)
	const allCreditTransactions = allWithdrawalSlipsFilteredSorted.filter(slip => slip.status !== 'Pending');
	const allDebitTransactions = allWithdrawalSlipsFilteredSorted.filter(slip => slip.status === 'Pending');

	// Conditionally slice data based on state
	const creditTransactions = showAllCredits ? allCreditTransactions : allCreditTransactions.slice(0, 3);
	const debitTransactions = showAllDebits ? allDebitTransactions : allDebitTransactions.slice(0, 3);

	// Updated columns for Credit Transactions (Status != Pending)
	const creditColumns = [
		{
			id: 'shortId',
			header: 'ID',
			accessorKey: '_id',
			cell: (info: any) => <span className="font-mono text-xs">{info.getValue()?.slice(-6) || 'N/A'}</span>
		},
		{
			id: 'activityPeriod',
			header: 'Description', // Using activityPeriod as description
			accessorKey: 'notes',
			cell: (info: any) => <span className="font-medium">{info.getValue() || 'N/A'}</span>
		},
		{
			id: 'createdAt',
			header: 'Date',
			accessorKey: 'createdAt',
			cell: (info: any) => formatDate(info.getValue()) // Format date
		},
		{
			id: 'finalAmountSent',
			header: 'Amount',
			accessorKey: 'finalAmountSent',
			// Assuming positive amounts are credits here
			cell: (info: any) => <span className="text-primary">{formatCurrency(info.getValue())}</span>
		}
	];

	// Updated columns for Debit Transactions (Status == Pending)
	const debitColumns = [
		{
			id: 'shortId',
			header: 'ID',
			accessorKey: '_id',
			cell: (info: any) => {
				// Updated cell to be a link
				const transactionId = info.getValue();
				const shortId = transactionId?.slice(-6) || 'N/A';
				return (
					<Button variant="link" className="p-0 h-auto font-mono text-xs text-primary hover:underline" onClick={() => router.push(`/admin/artist-revenue/${artist_id}/withdraw/${transactionId}`)}>
						{shortId}
					</Button>
				);
			}
		},
		{
			id: 'activityPeriod',
			header: 'Description', // Using activityPeriod as description
			accessorKey: 'activityPeriod',
			cell: (info: any) => <span className="font-medium">{info.getValue() || 'N/A'}</span>
		},
		{
			id: 'createdAt',
			header: 'Date',
			accessorKey: 'createdAt',
			cell: (info: any) => formatDate(info.getValue()) // Format date
		},
		{
			id: 'totalRevenue', // Show requested amount for pending withdrawals
			header: 'Amount',
			accessorKey: 'totalRevenue',
			cell: (info: any) => <span className="text-red-500">{formatCurrency(info.getValue())}</span>
		}
		// Add other relevant columns like 'status' if needed
		// {
		// 	id: 'status',
		// 	header: 'Status',
		// 	accessorKey: 'status',
		// }
	];

	if (withdrawalsLoading) {
		return <div>Loading transactions...</div>; // Or a spinner/skeleton component
	}

	// Check if there's an error state from react-query if needed
	// if (isError) {
	//   return <div>Error loading transactions.</div>;
	// }

	return (
		<div className="space-y-8">
			{/* Top Level Controls: Search and Sort */}
			<div className="flex flex-wrap gap-4 justify-between items-center">
				<h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">Transactions History</h3>
				<div className="flex flex-wrap items-center gap-2">
					{/* Search Input */}
					<Input placeholder="Search transactions..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="h-9 w-full sm:w-auto md:w-56" />
					{/* Sort Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-9">
								<Filter size={14} className="mr-1" />
								Sort
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuLabel>Sort By</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{/* Adjust sortable columns based on available fields in WithdrawalSlipData */}
								{[
									{ id: 'createdAt', label: 'Date' },
									{ id: 'activityPeriod', label: 'Description' },
									{ id: 'status', label: 'Status' },
									{ id: 'totalRevenue', label: 'Amount (Requested)' },
									{ id: 'proposedAmount', label: 'Amount (Proposed)' }
								].map(col => (
									<DropdownMenuItem key={col.id} onSelect={() => updateUrlParams({ sortBy: col.id })} className={sortBy === col.id ? 'bg-accent' : ''}>
										{col.label}
										{sortBy === col.id && (sortOrder === 'asc' ? <ArrowUp size={14} className="ml-auto" /> : <ArrowDown size={14} className="ml-auto" />)}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Order</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => updateUrlParams({ sortOrder: 'asc' })} className={sortOrder === 'asc' ? 'bg-accent' : ''}>
									Ascending <ArrowUp size={14} className="ml-auto" />
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ sortOrder: 'desc' })} className={sortOrder === 'desc' ? 'bg-accent' : ''}>
									Descending <ArrowDown size={14} className="ml-auto" />
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					{/* Removed the "+ Withdraw" button */}
				</div>
			</div>

			<div className="space-y-4">
				{/* Credit Transactions */}
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h4 className="text-sm font-medium">Credit Transactions</h4>
						<div className="flex gap-2">
							{/* Removed old Filter button */}
							{allCreditTransactions.length > 3 && ( // Only show button if more than 3 items
								<Button
									variant="outline"
									size="sm"
									className="text-xs border-border"
									onClick={() => setShowAllCredits(!showAllCredits)} // Toggle state
								>
									{showAllCredits ? 'Show Less' : 'Show All'}
								</Button>
							)}
						</div>
					</div>

					{allCreditTransactions.length > 0 ? ( // Check original array length for message
						<DataTable data={creditTransactions} columns={creditColumns} pagination={false} className="bg-secondary/30" />
					) : (
						<p className="text-sm text-muted-foreground">No credit transactions found.</p>
					)}
				</div>

				{/* Debit Transactions */}
				<div className="space-y-4 mt-8">
					<div className="flex justify-between items-center">
						<h4 className="text-sm font-medium">Debit Transactions</h4>
						<div className="flex gap-2">
							{/* Removed old Filter button */}
							{allDebitTransactions.length > 3 && ( // Only show button if more than 3 items
								<Button
									variant="outline"
									size="sm"
									className="text-xs border-border"
									onClick={() => setShowAllDebits(!showAllDebits)} // Toggle state
								>
									{showAllDebits ? 'Show Less' : 'Show All'}
								</Button>
							)}
						</div>
					</div>

					{allDebitTransactions.length > 0 ? ( // Check original array length for message
						<DataTable data={debitTransactions} columns={debitColumns} pagination={false} className="bg-secondary/30" />
					) : (
						<p className="text-sm text-muted-foreground">No debit transactions found.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArtistTransactions;
