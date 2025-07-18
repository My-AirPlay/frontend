/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Filter, ArrowUp, ArrowDown, Coins } from 'lucide-react'; // Removed Search, Added ArrowUp, ArrowDown
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, Input, PreviousPageButton } from '@/components/ui'; // Added Input, PreviousPageButton
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Added DropdownMenu components
import { useGetAllArtists } from '../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useGetFullAnalysis } from '../dashboard/api/getFullAnalysis';

const NairaSign = ({ size, className }: any) => <Coins className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;

// Another Wallet SVG (e.g., from Lucide's WalletMinimal)
const Wallet2 = ({ size, className }: any) => (
	<svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
		<path d="M3 9h18" />
		<path d="M16 16h2" />
	</svg>
);

interface RevenueSummaryCardProps {
	grossRevenue: string | number;
	netRevenue: string | number;
}

const RevenueSummaryCard: React.FC<RevenueSummaryCardProps> = ({ grossRevenue, netRevenue }) => {
	return (
		<div className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-2xl border border-zinc-700 text-zinc-100 transform hover:scale-[1.01] transition-all duration-300 ease-in-out">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{/* Gross Revenue Card */}
				<div className="flex items-center space-x-4 p-4 bg-zinc-700 rounded-lg shadow-inner border border-zinc-600 transition-all duration-200 hover:bg-zinc-600">
					<div className="flex-shrink-0 p-3 bg-primary-600 rounded-full shadow-lg text-white">
						<NairaSign size={24} className="text-white" /> {/* Naira Icon for Gross Revenue */}
					</div>
					<div>
						<p className="text-sm font-medium text-zinc-300">Gross Revenue</p>
						<h3 className="text-2xl font-bold text-white mt-1">
							{typeof grossRevenue === 'number' ? grossRevenue.toLocaleString() : grossRevenue} {/* Display Naira sign */}
						</h3>
					</div>
				</div>

				{/* Net Revenue Card */}
				<div className="flex items-center space-x-4 p-4 bg-zinc-700 rounded-lg shadow-inner border border-zinc-600 transition-all duration-200 hover:bg-zinc-600">
					<div className="flex-shrink-0 p-3 bg-primary-600 rounded-full shadow-lg text-white">
						{' '}
						{/* Changed to bg-primary-600 */}
						<Wallet2 size={24} className="text-white" /> {/* Different Wallet Icon for Net Revenue */}
					</div>
					<div>
						<p className="text-sm font-medium text-zinc-300">Net Revenue</p>
						<h3 className="text-2xl font-bold text-white mt-1">
							{typeof netRevenue === 'number' ? netRevenue.toLocaleString() : netRevenue} {/* Display Naira sign */}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

const ArtistRevenue: React.FC = () => {
	// Keep React.FC for clarity, TS error likely needs fixing elsewhere or is transient
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// State for search & sorting
	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'artistName'); // Default sort by artistName
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc');

	// State for the input field's value
	const [inputValue, setInputValue] = useState<string>(searchTerm);

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '10'; // Default to 10 per page

	// Function to update URL search params for search and sorting
	const updateUrlParams = (updates: { searchTerm?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				params.set(key, String(value));
			} else {
				params.delete(key); // Remove if null, undefined, or empty string
			}
		});

		// Update state based on what was passed
		if (updates.searchTerm !== undefined) setSearchTerm(updates.searchTerm); // Update actual search term state
		if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
		if (updates.sortOrder !== undefined) setSortOrder(updates.sortOrder);

		// Reset page to 1 only if sorting changes (not search term)
		if (updates.searchTerm === undefined) {
			params.set('page', '1');
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	// Effect to debounce search input and update URL
	useEffect(() => {
		// Set searchTerm from URL on initial load or direct URL change
		const currentUrlSearchTerm = searchParams.get('searchTerm') || '';
		if (searchTerm !== currentUrlSearchTerm) {
			setSearchTerm(currentUrlSearchTerm);
			setInputValue(currentUrlSearchTerm); // Sync input value if URL changes directly
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]); // Re-run if searchParams object changes

	useEffect(() => {
		const handler = setTimeout(() => {
			// Only update URL if the debounced value is different from the current URL param
			if (inputValue !== (searchParams.get('searchTerm') || '')) {
				updateUrlParams({ searchTerm: inputValue });
			}
		}, 500); // 500ms debounce delay

		return () => {
			clearTimeout(handler); // Cleanup timeout on component unmount or inputValue change
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]); // Re-run effect when inputValue changes

	// Construct parameters object for the hook
	const apiParams: {
		page: string;
		limit: string;
		searchTerm?: string;
		sortBy?: string;
		sortOrder?: 'asc' | 'desc';
	} = {
		page,
		limit,
		sortBy,
		sortOrder
	};
	if (searchTerm) apiParams.searchTerm = searchTerm; // Use the actual searchTerm state for API call

	// Fetch data with filters and sorting
	const { data: artists, isLoading: contractsLoading } = useGetAllArtists(apiParams);
	const { data: analysis, isLoading: analysisLoading } = useGetFullAnalysis({});

	const totalArtists = artists?.total || 0;
	const pageCount = artists?.totalPages || 0;

	// Define sortable columns
	const sortableColumns = [
		{ id: 'artistName', label: 'Artist Name' },
		{ id: 'firstName', label: 'Artist Real Name' }, // Assuming sorting by first name is desired
		{ id: 'totalRoyaltyUSD', label: 'Revenue Generated' }
		// Add other sortable fields if available, e.g., 'createdAt'
	];

	const artistsColumns: ColumnDef<{
		_id: string; // Changed to string based on contracts example
		artistName: string;
		firstName: string;
		lastName: string;
		totalRoyaltyUSD: string;
	}>[] = [
		{
			id: 'artistName',
			header: 'Artist Name',
			cell: info => (
				<Link href={`./artist-revenue/${info.row.original._id}/details`} className="font-medium text-primary hover:underline">
					{info.row.original.artistName || '-'}
				</Link>
			)
		},
		{
			id: 'realName',
			header: 'Artist Real Name',
			cell: info => <p className="font-medium ">{`${info.row.original.firstName || '-'}  ${info.row.original.lastName || '-'} `}</p>
		},
		{
			id: 'totalRoyaltyUSD',
			header: 'Revenue Generated',
			cell: info => {
				const revenue = parseFloat(info.row.original.totalRoyaltyUSD || '0').toFixed(2);
				const formattedRevenue = parseFloat(revenue).toLocaleString();
				return <p className="font-medium ">{`₦${formattedRevenue}`}</p>;
			}
		}
	];

	// Note: totalRevenue calculation might need adjustment based on API data if it's dynamic
	const totalRevenue = `₦${analysisLoading ? 0 : (analysis.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
	const grossRevenue = `₦${analysisLoading ? 0 : (analysis.grossRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

	return (
		<div className="space-y-6">
			{' '}
			{/* Adjusted spacing */}
			{/* Added PreviousPageButton */}
			<PreviousPageButton />
			{/* Revenue Summary Box - Kept as is */}
			<RevenueSummaryCard grossRevenue={grossRevenue} netRevenue={totalRevenue} />
			{/* Main Content Area */}
			<div>
				{/* Header and Controls */}
				<div className="flex flex-wrap gap-4 justify-between items-center mb-6">
					<h1 className="text-xl md:text-2xl font-semibold">Artists Revenue</h1> {/* Changed h2 to h1 for consistency */}
					<div className="flex flex-wrap items-center gap-2">
						{/* Search Input */}
						<Input placeholder="Search by name..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="h-10 w-full sm:w-auto md:w-64" />
						{/* Total Count */}
						<div className="text-sm text-admin-muted">Total: {totalArtists}</div>
						{/* Filter & Sort Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="max-md:size-10 max-md:p-0">
									<Filter size={16} className="md:mr-2" />
									<span className="hidden md:inline">Sort</span> {/* Changed text */}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-64" align="end">
								<DropdownMenuLabel>Sort By</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{/* Sort By Options */}
								<DropdownMenuGroup>
									{sortableColumns.map(col => (
										<DropdownMenuItem key={col.id} onSelect={() => updateUrlParams({ sortBy: col.id })} className={sortBy === col.id ? 'bg-accent' : ''}>
											{col.label}
											{sortBy === col.id && (sortOrder === 'asc' ? <ArrowUp size={14} className="ml-auto" /> : <ArrowDown size={14} className="ml-auto" />)}
										</DropdownMenuItem>
									))}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								{/* Sort Order Options */}
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
						{/* Download Button */}
						{/* <Button className="max-md:size-10 max-md:p-0">
							<Download size={16} className="md:mr-2" />
							<span className="max-md:sr-only">Download</span>
						</Button> */}
					</div>
				</div>

				{/* Data Table */}
				{contractsLoading ? (
					<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
						<LoadingBox size={62} />
					</div>
				) : (
					<DataTable data={artists?.data || []} columns={artistsColumns} showCheckbox={false} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={pageCount} />
					// Updated DataTable props: added default data [], used Number(limit), pageCount
				)}
			</div>
		</div>
	);
};

export default ArtistRevenue;
