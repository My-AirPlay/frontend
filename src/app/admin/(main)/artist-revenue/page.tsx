/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Filter, ArrowUp, ArrowDown, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { NairaIcon } from '@/components/ui/naira-icon';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, Input, PreviousPageButton } from '@/components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useGetAllArtists } from '../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useGetFullAnalysis } from '../dashboard/api/getFullAnalysis';
import { formatCurrency } from '@/utils/currency';

const ArtistRevenue: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// State for search & sorting
	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('searchTerm') || '');
	const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'artistName');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc');

	// State for the input field's value
	const [inputValue, setInputValue] = useState<string>(searchTerm);

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '10';

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

		if (updates.searchTerm !== undefined) setSearchTerm(updates.searchTerm);
		if (updates.sortBy !== undefined) setSortBy(updates.sortBy);
		if (updates.sortOrder !== undefined) setSortOrder(updates.sortOrder);

		if (updates.searchTerm === undefined) {
			params.set('page', '1');
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	// Effect to debounce search input and update URL
	useEffect(() => {
		const currentUrlSearchTerm = searchParams.get('searchTerm') || '';
		if (searchTerm !== currentUrlSearchTerm) {
			setSearchTerm(currentUrlSearchTerm);
			setInputValue(currentUrlSearchTerm);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (inputValue !== (searchParams.get('searchTerm') || '')) {
				updateUrlParams({ searchTerm: inputValue });
			}
		}, 500);

		return () => {
			clearTimeout(handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

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
	if (searchTerm) apiParams.searchTerm = searchTerm;

	// Fetch data with filters and sorting
	const { data: artists, isLoading: contractsLoading } = useGetAllArtists(apiParams);
	const { data: analysis, isLoading: analysisLoading } = useGetFullAnalysis({});

	const totalArtists = artists?.total || 0;
	const pageCount = artists?.totalPages || 0;

	// Define sortable columns
	const sortableColumns = [
		{ id: 'artistName', label: 'Artist Name' },
		{ id: 'firstName', label: 'Artist Real Name' },
		{ id: 'totalRoyaltyUSD', label: 'Revenue Generated' }
	];

	const artistsColumns: ColumnDef<{
		_id: string;
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
			cell: info => <p className="font-medium">{`${info.row.original.firstName || '-'}  ${info.row.original.lastName || '-'}`}</p>
		},
		{
			id: 'totalRoyaltyUSD',
			header: 'Revenue Generated',
			cell: info => {
				const revenue = parseFloat(info.row.original.totalRoyaltyUSD || '0');
				return <span className="text-sm font-semibold text-green-500">{formatCurrency(revenue, 'NGN')}</span>;
			}
		}
	];

	const grossRevenue = analysisLoading ? 0 : analysis.grossRevenue || 0;
	const netRevenue = analysisLoading ? 0 : analysis.totalRevenue || 0;

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			{/* Header */}
			<div>
				<h1 className="text-xl md:text-2xl font-semibold">Artists Revenue</h1>
				<p className="text-sm text-muted-foreground mt-1">Track revenue generated by artists</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
							<NairaIcon className="w-5 h-5 text-purple-500" />
						</div>
						<TrendingUp className="w-4 h-4 text-purple-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Gross Revenue</p>
					{analysisLoading ? <div className="animate-pulse bg-muted rounded-md h-7 w-36" /> : <p className="text-xl font-bold text-purple-500">{formatCurrency(grossRevenue, 'NGN')}</p>}
					<p className="text-xs text-muted-foreground mt-1">Total before deals</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
							<NairaIcon className="w-5 h-5 text-green-500" />
						</div>
						<TrendingUp className="w-4 h-4 text-green-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Net Revenue</p>
					{analysisLoading ? <div className="animate-pulse bg-muted rounded-md h-7 w-36" /> : <p className="text-xl font-bold text-green-500">{formatCurrency(netRevenue, 'NGN')}</p>}
					<p className="text-xs text-muted-foreground mt-1">After artist deals</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<Users className="w-5 h-5 text-blue-500" />
						</div>
						<ChevronRight className="w-4 h-4 text-blue-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Artists</p>
					<p className="text-xl font-bold text-blue-500">{totalArtists}</p>
					<p className="text-xs text-muted-foreground mt-1">Generating revenue</p>
				</div>
			</div>

			{/* Controls */}
			<div className="flex flex-wrap gap-4 justify-between items-center">
				<div className="flex flex-wrap items-center gap-2">
					<Input placeholder="Search by name..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="h-10 w-full sm:w-auto md:w-64" />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="max-md:size-10 max-md:p-0">
								<Filter size={16} className="md:mr-2" />
								<span className="hidden md:inline">Sort</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-64" align="end">
							<DropdownMenuLabel>Sort By</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{sortableColumns.map(col => (
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
				</div>
				<div className="text-sm text-muted-foreground">Total: {totalArtists}</div>
			</div>

			{/* Data Table */}
			{contractsLoading ? (
				<div className="flex justify-center items-center rounded-md border min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<div className="rounded-lg border border-border overflow-hidden">
					<DataTable data={artists?.data || []} columns={artistsColumns} showCheckbox={false} pagination={true} defaultRowsPerPage={Number(limit)} pageCount={pageCount} />
				</div>
			)}
		</div>
	);
};

export default ArtistRevenue;
