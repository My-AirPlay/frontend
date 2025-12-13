/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DataTable } from '@/components/ui';
import { useGetAllTracks } from './api/trackHooks';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Tracks: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '20';
	const searchQuery = searchParams.get('search') || '';
	const sortBy = searchParams.get('sortBy') || 'createdAt';
	const sortOrder = searchParams.get('sortOrder') || 'desc';

	const [searchInput, setSearchInput] = useState(searchQuery);
	const [showFilters, setShowFilters] = useState(false);

	// Sync search input with URL params
	useEffect(() => {
		setSearchInput(searchQuery);
	}, [searchQuery]);

	const apiParams = {
		page,
		limit,
		search: searchQuery,
		sortBy,
		sortOrder
	};

	// --- Data Fetching ---
	const { data: tracks, isLoading } = useGetAllTracks(apiParams);

	// --- Update URL with new params ---
	const updateUrlParams = (updates: Record<string, string>) => {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(updates).forEach(([key, value]) => {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		});

		// Reset to page 1 when search/sort changes
		if (updates.search !== undefined || updates.sortBy !== undefined || updates.sortOrder !== undefined) {
			params.set('page', '1');
		}

		router.push(`${pathname}?${params.toString()}`);
	};

	// --- Handle Search ---
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateUrlParams({ search: searchInput });
	};

	const handleClearSearch = () => {
		setSearchInput('');
		updateUrlParams({ search: '' });
	};

	// --- Handle Sort ---
	const handleSort = (field: string) => {
		const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
		updateUrlParams({ sortBy: field, sortOrder: newSortOrder });
	};

	// --- Column Definitions ---
	const trackColumns = [
		{
			id: 'trackTitle',
			header: 'Title',
			cell: (info: any) => {
				return (
					<Link href={`/admin/tracks/${info.row.original._id}`} className="text-primary font-medium hover:underline">
						{info.row.original.trackTitle}
					</Link>
				);
			}
		},
		{
			id: 'artist',
			header: 'Primary Artist',
			accessorKey: 'artist'
		},
		{
			id: 'sharedRevenue',
			header: 'Artists',
			cell: (info: any) => {
				const shared = info.row.original.sharedRevenue;

				if (!shared || shared.length === 0) {
					return <span className="text-muted-foreground text-xs">-</span>;
				}

				return (
					<div className="flex flex-wrap gap-1">
						{shared.map((item: any, index: number) => (
							<span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
								{item.artistName}
								<span className="ml-1 opacity-50">({item.percentage}%)</span>
							</span>
						))}
					</div>
				);
			}
		},
		{
			id: 'isrcCode',
			header: 'ISRC',
			accessorKey: 'isrcCode',
			cell: (info: any) => <span className="text-muted-foreground text-sm font-mono">{info.row.original.isrcCode || '-'}</span>
		},
		{
			id: 'upcCode',
			header: 'UPC',
			accessorKey: 'upcCode',
			cell: (info: any) => <span className="text-muted-foreground text-sm font-mono">{info.row.original.upcCode || '-'}</span>
		},
		{
			id: 'createdAt',
			header: 'Created',
			accessorKey: 'createdAt',
			cell: (info: any) => new Date(info.row.original.createdAt).toLocaleDateString()
		}
	];

	// --- Sort Options ---
	const sortOptions = [
		{ value: 'trackTitle', label: 'Title' },
		{ value: 'artist', label: 'Artist' },
		{ value: 'createdAt', label: 'Date Created' },
		{ value: 'isrcCode', label: 'ISRC Code' }
	];

	return (
		<div className="space-y-4 p-6 bg-background min-h-screen">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Tracks Catalogue</h1>
			</div>

			{/* Search and Filter Section */}
			<div className="space-y-4">
				<div className="flex gap-4 items-center">
					{/* Search Bar */}
					<form onSubmit={handleSearch} className="flex-1 flex gap-2">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={10} />
							<Input type="text" placeholder="Search by track title, artist, ISRC, or UPC..." value={searchInput} onChange={e => setSearchInput(e.target.value)} className="pl-10 pr-10 w-96" />
							{searchInput && (
								<button type="button" onClick={handleClearSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
									<X size={18} />
								</button>
							)}
						</div>
						<Button type="submit">Search</Button>
						{/* Filter Toggle Button */}
						<Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 h-10">
							<SlidersHorizontal size={18} />
							Filters
						</Button>
					</form>
				</div>

				{/* Filter Panel */}
				{showFilters && (
					<div className="p-4 border rounded-lg bg-card space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-semibold">Sort Options</h3>
							<Button variant="ghost" size="sm" onClick={() => updateUrlParams({ sortBy: 'createdAt', sortOrder: 'desc' })}>
								Reset
							</Button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Sort By */}
							<div className="space-y-2">
								<label className="text-sm font-medium">Sort By</label>
								<div className="flex flex-wrap gap-2">
									{sortOptions.map(option => (
										<Button key={option.value} variant={sortBy === option.value ? 'default' : 'outline'} size="sm" onClick={() => handleSort(option.value)} className="text-xs">
											{option.label}
											{sortBy === option.value && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
										</Button>
									))}
								</div>
							</div>

							{/* Sort Order */}
							<div className="space-y-2">
								<label className="text-sm font-medium">Order</label>
								<div className="flex gap-2">
									<Button variant={sortOrder === 'asc' ? 'default' : 'outline'} size="sm" onClick={() => updateUrlParams({ sortOrder: 'asc' })}>
										Ascending
									</Button>
									<Button variant={sortOrder === 'desc' ? 'default' : 'outline'} size="sm" onClick={() => updateUrlParams({ sortOrder: 'desc' })}>
										Descending
									</Button>
								</div>
							</div>
						</div>

						{/* Active Filters Display */}
						{(searchQuery || sortBy !== 'createdAt' || sortOrder !== 'desc') && (
							<div className="pt-4 border-t">
								<div className="flex items-center gap-2 flex-wrap">
									<span className="text-sm font-medium">Active filters:</span>
									{searchQuery && (
										<span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary">
											Search: {searchQuery}
											<button onClick={handleClearSearch} className="ml-1 hover:text-primary/70">
												<X size={14} />
											</button>
										</span>
									)}
									{sortBy !== 'createdAt' && (
										<span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary">
											Sort: {sortOptions.find(o => o.value === sortBy)?.label} ({sortOrder})
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Results Info */}
			{!isLoading && tracks?.data && (
				<div className="text-sm text-muted-foreground">
					Showing {tracks.data.length} of {tracks.total} tracks
					{searchQuery && ` matching "${searchQuery}"`}
				</div>
			)}

			{/* Data Table */}
			<div className="rounded-md border">
				<DataTable data={tracks?.data || []} columns={trackColumns} pagination={true} showCheckbox={true} defaultRowsPerPage={Number(limit)} pageCount={tracks?.totalPages || 1} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default Tracks;
