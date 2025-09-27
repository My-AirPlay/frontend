/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react'; // Removed useRef
import { Filter, ArrowUp, ArrowDown, Plus } from 'lucide-react'; // Added ArrowUp, ArrowDown
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge, DataTable, PreviousPageButton, Input } from '@/components/ui'; // Added Input
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useGetAllArtists } from '../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import moment from 'moment';
import CreateArtistForm from '@/app/admin/(main)/sales/misc/components/CreateArtistForm';
import { AnimatePresence, motion } from 'framer-motion';

const Contracts = () => {
	const router = useRouter();
	const pathname = usePathname(); // Added pathname
	const searchParams = useSearchParams();

	// State for filters & sorting
	const [statusFilter, setStatusFilter] = useState<string | null>(searchParams.get('status'));
	const [stageFilter, setStageFilter] = useState<string | null>(searchParams.get('stage'));
	const [managementFilter, setManagementFilter] = useState<boolean | null>(searchParams.get('hasManagement') === 'true' ? true : searchParams.get('hasManagement') === 'false' ? false : null);
	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'createdAt'); // Default sort
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	// State for the input field's value
	const [inputValue, setInputValue] = useState<string>(searchTerm);

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';

	// Function to update URL search params for all filters and sorting
	const updateUrlParams = (updates: { status?: string | null; stage?: string | null; hasManagement?: boolean | null; searchTerm?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				params.set(key, String(value));
			} else {
				params.delete(key); // Remove if null, undefined, or empty string
			}
		});

		// Update state based on what was passed
		if (updates.status !== undefined) setStatusFilter(updates.status);
		if (updates.stage !== undefined) setStageFilter(updates.stage);
		if (updates.hasManagement !== undefined) setManagementFilter(updates.hasManagement);
		if (updates.searchTerm !== undefined) setSearchTerm(updates.searchTerm); // Update actual search term state
		if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
		if (updates.sortOrder !== undefined) setSortOrder(updates.sortOrder);

		// Reset page to 1 only if filters/sorting (not search term) change
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
		status?: string;
		stage?: string;
		hasManagement?: boolean;
		searchTerm?: string;
		sortBy?: string;
		sortOrder?: 'asc' | 'desc';
	} = {
		page,
		limit,
		sortBy,
		sortOrder
	};
	if (statusFilter) apiParams.status = statusFilter;
	if (stageFilter) apiParams.stage = stageFilter;
	if (managementFilter !== null) apiParams.hasManagement = managementFilter;
	if (searchTerm) apiParams.searchTerm = searchTerm; // Use the actual searchTerm state for API call

	// Fetch data with filters and sorting
	const { data: contracts, isLoading: contractsLoading, refetch } = useGetAllArtists(apiParams);

	const totalContracts = contracts?.total || 0;
	const pageCount = contracts?.totalPages || 0;

	// Define sortable columns
	const sortableColumns = [
		{ id: 'artistName', label: 'Artist Name' },
		{ id: 'email', label: 'Email' },
		{ id: 'createdAt', label: 'Date Created' },
		{ id: 'country', label: 'Country' } // Assuming country is available in data
	];

	const getStage = (row: any) => {
		if (row.contractDetails?.contract) {
			return row.stage;
		} else if (!row.contractDetails?.contract && row.stage === 'complete') {
			return 'Contract Upload';
		} else {
			return row.stage;
		}
	};

	const handleArtistCreated = () => {
		setCreateModalOpen(false); // Close the modal
		refetch();
	};
	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			cell: (info: any) => (
				<Link href={`/admin/contracts/${info.row.original._id}/overview`} className="text-admin-primary hover:underline">
					{info.row.original?.artistName || '-'}
				</Link>
			)
		},
		{
			id: 'name',
			header: 'Name',
			cell: (info: any) => (
				<Link href={`/admin/contracts/${info.row.original._id}/overview`} className="text-admin-primary hover:underline">
					{`${info.row.original?.firstName || '-'} ${info.row.original?.lastName || ''}`}
				</Link>
			)
		},
		{
			id: 'stage',
			header: 'Stage',
			cell: (info: any) => <span className="royalty-badge bg-primary/20 text-primary border border-primary/50 text-xs px-3 py-1 rounded-md capitalize whitespace-nowrap">{getStage(info.row.original) || '-'}</span>
		},
		{
			id: 'email', // Added email column
			header: 'Email',
			accessorKey: 'email',
			cell: (info: any) => <p className="">{info.row.original?.email || '-'}</p>
		},
		{
			id: 'hasManagement',
			header: 'Management',
			accessorKey: 'hasManagement',
			cell: (info: any) => <span className={`${info.row.original.hasManagement ? 'text-green-500' : 'text-primary'} text-xs  rounded-md capitalize`}>{info.row.original.hasManagement ? 'Has Management' : 'No Management'}</span>
		},
		{
			id: 'dateCreated',
			header: 'Date Created',
			accessorKey: 'dateCreated',
			cell: (info: any) => <p className="">{moment(info.row.original?.createdAt).format('D MMM, YYYY')}</p>
		},
		{
			id: 'status',
			header: 'Status',
			cell: (info: any) => <Badge variant={info.row.original.status === 'Pending' ? 'destructive' : 'success'}>{info.row.original.status || '-'}</Badge>
		}
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between">
				<PreviousPageButton />
				<Button className="bg-primary hover:bg-primary/90" onClick={() => setCreateModalOpen(true)}>
					<Plus size={16} className="md:mr-2" />
					<span className="hidden md:inline">Create Artist</span>
				</Button>
			</div>

			<div className="flex flex-wrap gap-4 justify-between items-center">
				<h1 className="text-xl md:text-2xl font-semibold">Contracts</h1>
				<div className="flex flex-wrap items-center gap-2">
					{/* Input now uses inputValue state */}
					<Input placeholder="Search by name, email..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="h-10 w-full sm:w-auto md:w-64" />
					<div className="text-sm text-admin-muted">Total: {totalContracts}</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="max-md:size-10 max-md:p-0">
								<Filter size={16} className="md:mr-2" />
								<span className="hidden md:inline">Filter & Sort</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-64" align="end">
							<DropdownMenuLabel>Filter & Sort</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{/* Status Filter */}
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Status</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => updateUrlParams({ status: null })} className={!statusFilter ? 'bg-accent' : ''}>
									All Statuses
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ status: 'Active' })} className={statusFilter === 'Active' ? 'bg-accent' : ''}>
									Active
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ status: 'Pending' })} className={statusFilter === 'Pending' ? 'bg-accent' : ''}>
									Pending
								</DropdownMenuItem>
								{/* Add other statuses as needed */}
								<DropdownMenuItem onSelect={() => updateUrlParams({ status: 'Complete' })} className={statusFilter === 'Complete' ? 'bg-accent' : ''}>
									Complete
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							{/* Stage Filter */}
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Stage</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => updateUrlParams({ stage: null })} className={!stageFilter ? 'bg-accent' : ''}>
									All Stages
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ stage: 'complete' })} className={stageFilter === 'complete' ? 'bg-accent' : ''}>
									Complete
								</DropdownMenuItem>
								{/* Add other stages as needed */}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							{/* Management Filter */}
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Management</DropdownMenuLabel>
								<DropdownMenuItem onSelect={() => updateUrlParams({ hasManagement: null })} className={managementFilter === null ? 'bg-accent' : ''}>
									All
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ hasManagement: true })} className={managementFilter === true ? 'bg-accent' : ''}>
									Has Management
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => updateUrlParams({ hasManagement: false })} className={managementFilter === false ? 'bg-accent' : ''}>
									No Management
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							{/* Sort By */}
							<DropdownMenuGroup>
								<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Sort By</DropdownMenuLabel>
								{sortableColumns.map(col => (
									<DropdownMenuItem key={col.id} onSelect={() => updateUrlParams({ sortBy: col.id })} className={sortBy === col.id ? 'bg-accent' : ''}>
										{col.label}
										{sortBy === col.id && (sortOrder === 'asc' ? <ArrowUp size={14} className="ml-auto" /> : <ArrowDown size={14} className="ml-auto" />)}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							{/* Sort Order */}
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
				</div>
			</div>

			{/* Removed the static "All" tab */}

			{contractsLoading ? (
				<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<DataTable data={contracts?.data} columns={columns} showCheckbox={false} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={pageCount} />
			)}
			<AnimatePresence>
				{isCreateModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 overflow-y-auto">
						{' '}
						{/* Added overflow-y-auto */}
						<motion.div
							initial={{ opacity: 0, y: -20 }} // Changed initial animation slightly
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="relative"
						>
							<CreateArtistForm onSave={handleArtistCreated} onCancel={() => setCreateModalOpen(false)} />
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Contracts;
