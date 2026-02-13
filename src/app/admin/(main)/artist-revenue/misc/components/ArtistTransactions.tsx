/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUp, ArrowDown, XCircle, AlertTriangle, Loader2, Download } from 'lucide-react';
import { DataTable, Input } from '@/components/ui';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import { formatCurrency } from '@/utils/currency';
import { useGetAllWithdrawalSlips } from '@/app/admin/(main)/catalogue/api/getAllWithdrawalSlips';
import { useCancelWithdrawalSlip } from '@/app/admin/(main)/catalogue/api/cancelWithdrawalSlip';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';
import { exportArtistCsvByActivityPeriod } from '@/app/admin/(main)/catalogue/api/exportArtistCsv';
import { toast } from 'sonner';

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
	const [showAllCancelled, setShowAllCancelled] = useState(false);

	// State for cancel modal
	const [cancelModalOpen, setCancelModalOpen] = useState(false);
	const [transactionToCancel, setTransactionToCancel] = useState<{ id: string; amount: number } | null>(null);

	// Navigation loading states
	const [isPending, startTransition] = useTransition();
	const [navigatingTo, setNavigatingTo] = useState<'credit' | 'withdraw' | null>(null);

	// Cancel mutation
	const cancelMutation = useCancelWithdrawalSlip();

	const [isExportingCsv, setIsExportingCsv] = useState(false);

	const handleExportCsv = async () => {
		setIsExportingCsv(true);
		const allSlips: WithdrawalSlipData[] = withdrawalsData?.data || [];
		const activityPeriod = allSlips.find(s => s.activityPeriod)?.activityPeriod;
		if (activityPeriod) {
			await exportArtistCsvByActivityPeriod(artist_id, activityPeriod);
		} else {
			toast.error('No activity period found for this artist.');
		}
		setIsExportingCsv(false);
	};

	// State for search & sorting
	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'createdAt'); // Default sort by date
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'); // Default descending date
	const [inputValue, setInputValue] = useState<string>(searchTerm); // State for the input field's value

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

	// Apply client-side filtering and sorting using useMemo
	const allWithdrawalSlipsFilteredSorted = useMemo(() => {
		// Moved definition inside useMemo to fix exhaustive-deps warning
		const allWithdrawalSlipsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];
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
		// Updated dependencies to reflect the change
	}, [withdrawalsData, searchTerm, sortBy, sortOrder]);

	// Filter based on status: Pending = Debit, Cancelled = Cancelled, Others = Credit (using the filtered/sorted list)
	const allCreditTransactions = allWithdrawalSlipsFilteredSorted.filter(slip => slip.status !== 'Pending' && slip.status !== 'Cancelled');
	const allDebitTransactions = allWithdrawalSlipsFilteredSorted.filter(slip => slip.status === 'Pending');
	const allCancelledTransactions = allWithdrawalSlipsFilteredSorted.filter(slip => slip.status === 'Cancelled');

	// Conditionally slice data based on state
	const creditTransactions = showAllCredits ? allCreditTransactions : allCreditTransactions.slice(0, 3);
	const debitTransactions = showAllDebits ? allDebitTransactions : allDebitTransactions.slice(0, 3);
	const cancelledTransactions = showAllCancelled ? allCancelledTransactions : allCancelledTransactions.slice(0, 3);

	// Open cancel modal
	const openCancelModal = (transactionId: string, amount: number) => {
		setTransactionToCancel({ id: transactionId, amount });
		setCancelModalOpen(true);
	};

	// Handle cancel transaction
	const handleCancelTransaction = () => {
		if (transactionToCancel) {
			cancelMutation.mutate(
				{ transactionId: transactionToCancel.id, artistId: artist_id },
				{
					onSuccess: () => {
						setCancelModalOpen(false);
						setTransactionToCancel(null);
					}
				}
			);
		}
	};
	const { convertCurrency, currency: contextCurrency } = useCurrency();

	// Status badge helper
	const getStatusBadge = (status: string) => {
		const statusStyles: Record<string, string> = {
			Pending: 'bg-yellow-100 text-yellow-800',
			Processing: 'bg-blue-100 text-blue-800',
			Cancelled: 'bg-red-100 text-red-800',
			Approved: 'bg-green-100 text-green-800',
			Paid: 'bg-green-100 text-green-800'
		};
		return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
	};

	// Updated columns for Credit Transactions (Status != Pending)
	const creditColumns = [
		{
			id: 'shortId',
			header: 'ID',
			accessorKey: '_id',
			cell: (info: any) => <span className="font-mono text-xs">{info.getValue()?.slice(-6) || 'N/A'}</span>
		},
		{
			id: 'activityPeriods',
			header: 'Description', // Using activityPeriod as description
			accessorKey: 'activityPeriods',
			cell: (info: any) => {
				return <span className="font-medium">Payment For : {info?.row?.original.activityPeriods?.[0] || info?.row?.original.notes || 'N/A'}</span>;
			}
		},
		{
			id: 'createdAt',
			header: 'Date',
			accessorKey: 'createdAt',
			cell: (info: any) => formatDate(info.getValue()) // Format date
		},
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			cell: (info: any) => getStatusBadge(info.getValue())
		},
		{
			id: 'finalAmountSent',
			header: 'Amount',
			accessorKey: 'totalRevenue',
			// Assuming positive amounts are credits here
			cell: (info: any) => <span className="text-primary">{formatCurrency(convertCurrency(info.getValue()), contextCurrency)}</span>
		},
		{
			id: 'actions',
			header: 'Action',
			accessorKey: '_id',
			cell: (info: any) => {
				const transactionId = info.getValue();
				const amount = info.row.original.totalRevenue || 0;
				return (
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => openCancelModal(transactionId, amount)} disabled={cancelMutation.isPending} title="Cancel Transaction">
						<XCircle size={18} />
					</Button>
				);
			}
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
			id: 'activityPeriods',
			header: 'Description', // Using activityPeriod as description
			accessorKey: 'activityPeriods',
			cell: (info: any) => <span className="font-medium">{info.getValue()?.[0] || 'Payout'}</span>
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
			cell: (info: any) => <span className="text-red-500">{formatCurrency(convertCurrency(info.getValue()), contextCurrency)}</span>
		},
		{
			id: 'actions',
			header: 'Action',
			accessorKey: '_id',
			cell: (info: any) => {
				const transactionId = info.getValue();
				const amount = info.row.original.totalRevenue || 0;
				return (
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => openCancelModal(transactionId, amount)} disabled={cancelMutation.isPending} title="Cancel Transaction">
						<XCircle size={18} />
					</Button>
				);
			}
		}
	];

	// Columns for Cancelled Transactions
	const cancelledColumns = [
		{
			id: 'shortId',
			header: 'ID',
			accessorKey: '_id',
			cell: (info: any) => <span className="font-mono text-xs">{info.getValue()?.slice(-6) || 'N/A'}</span>
		},
		{
			id: 'activityPeriods',
			header: 'Description',
			accessorKey: 'activityPeriods',
			cell: (info: any) => <span className="font-medium">{info?.row?.original.activityPeriods?.[0] || 'N/A'}</span>
		},
		{
			id: 'createdAt',
			header: 'Date',
			accessorKey: 'createdAt',
			cell: (info: any) => formatDate(info.getValue())
		},
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			cell: (info: any) => getStatusBadge(info.getValue())
		},
		{
			id: 'totalRevenue',
			header: 'Amount',
			accessorKey: 'totalRevenue',
			cell: (info: any) => <span className="text-muted-foreground line-through">{formatCurrency(convertCurrency(info.getValue()), contextCurrency)}</span>
		}
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
					<Button variant="secondary" disabled={isExportingCsv} onClick={handleExportCsv}>
						{isExportingCsv ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Exporting...
							</>
						) : (
							<>
								<Download className="w-4 h-4 mr-2" />
								Export CSV
							</>
						)}
					</Button>
					<Button
						variant="secondary"
						disabled={isPending}
						onClick={() => {
							setNavigatingTo('credit');
							startTransition(() => {
								router.push(`/admin/artist-revenue/${artist_id}/credit/1`);
							});
						}}
					>
						{isPending && navigatingTo === 'credit' ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Loading...
							</>
						) : (
							'Credit'
						)}
					</Button>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => {
							setNavigatingTo('withdraw');
							startTransition(() => {
								router.push(`/admin/artist-revenue/${artist_id}/withdraw/1`);
							});
						}}
					>
						{isPending && navigatingTo === 'withdraw' ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Loading...
							</>
						) : (
							'Withdraw'
						)}
					</Button>
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

				{/* Cancelled Transactions */}
				<div className="space-y-4 mt-8">
					<div className="flex justify-between items-center">
						<h4 className="text-sm font-medium">Your Cancelled Transactions</h4>
						<div className="flex gap-2">
							{allCancelledTransactions.length > 3 && (
								<Button variant="outline" size="sm" className="text-xs border-border" onClick={() => setShowAllCancelled(!showAllCancelled)}>
									{showAllCancelled ? 'Show Less' : 'Show All'}
								</Button>
							)}
						</div>
					</div>

					{allCancelledTransactions.length > 0 ? <DataTable data={cancelledTransactions} columns={cancelledColumns} pagination={false} className="bg-secondary/30" /> : <p className="text-sm text-muted-foreground">No cancelled transactions found.</p>}
				</div>
			</div>

			{/* Cancel Confirmation Modal */}
			<Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
								<AlertTriangle className="w-6 h-6 text-red-600" />
							</div>
							<div>
								<DialogTitle>Cancel Transaction</DialogTitle>
								<DialogDescription>This action cannot be undone.</DialogDescription>
							</div>
						</div>
					</DialogHeader>
					<div className="py-4">
						<p className="text-sm text-muted-foreground mb-3">Are you sure you want to cancel this transaction?</p>
						{transactionToCancel && (
							<div className="bg-muted/50 rounded-lg p-4 space-y-2">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Transaction ID:</span>
									<span className="font-mono font-medium">{transactionToCancel.id.slice(-6)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Amount:</span>
									<span className="font-semibold text-red-500">{formatCurrency(convertCurrency(transactionToCancel.amount), contextCurrency)}</span>
								</div>
							</div>
						)}
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button variant="outline" onClick={() => setCancelModalOpen(false)} disabled={cancelMutation.isPending}>
							Keep Transaction
						</Button>
						<Button variant="destructive" onClick={handleCancelTransaction} disabled={cancelMutation.isPending}>
							{cancelMutation.isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Cancelling...
								</>
							) : (
								'Yes, Cancel Transaction'
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ArtistTransactions;
