/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Filter, ArrowUp, ArrowDown, TrendingUp, Users, ChevronRight, Download, X, Loader2 } from 'lucide-react';
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
import { toast } from 'sonner';
import APIAxios from '@/utils/axios';
import { useGetAvailablePeriods } from './api/queries';

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
	const [showExportModal, setShowExportModal] = useState(false);
	const [exportType, setExportType] = useState<'summary' | 'slips'>('summary');
	const [slipsFilter, setSlipsFilter] = useState<'all' | 'period' | 'dateRange'>('all');
	const [selectedPeriod, setSelectedPeriod] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [downloading, setDownloading] = useState(false);
	const [minLimitOnly, setMinLimitOnly] = useState(true);
	const { data: periods = [] } = useGetAvailablePeriods();

	const handleDownload = async () => {
		if (exportType === 'summary' && !selectedPeriod) {
			toast.error('Please select a period');
			return;
		}
		if (exportType === 'slips' && slipsFilter === 'period' && !selectedPeriod) {
			toast.error('Please select a period');
			return;
		}
		if (exportType === 'slips' && slipsFilter === 'dateRange' && (!startDate || !endDate)) {
			toast.error('Please select both start and end dates');
			return;
		}
		setDownloading(true);
		try {
			let endpoint: string;
			let filenameLabel: string;
			if (exportType === 'summary') {
				const summaryParams = new URLSearchParams();
				if (minLimitOnly) summaryParams.set('minLimit', 'true');
				endpoint = `/admin/export-revenue-summary/${encodeURIComponent(selectedPeriod)}${summaryParams.toString() ? `?${summaryParams.toString()}` : ''}`;
				filenameLabel = `revenue-summary-${selectedPeriod}`;
			} else {
				const params = new URLSearchParams();
				if (slipsFilter === 'period') {
					params.set('activityPeriod', selectedPeriod);
					filenameLabel = `withdrawal-slips-${selectedPeriod}`;
				} else if (slipsFilter === 'dateRange') {
					params.set('startDate', startDate);
					params.set('endDate', endDate);
					filenameLabel = `withdrawal-slips-${startDate}-to-${endDate}`;
				} else {
					filenameLabel = 'withdrawal-slips-all';
				}
				if (minLimitOnly) params.set('minLimit', 'true');
				endpoint = `/admin/export-withdrawal-slips${params.toString() ? `?${params.toString()}` : ''}`;
			}
			const response = await APIAxios.get(endpoint, { responseType: 'blob' });
			const url = URL.createObjectURL(response.data);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${filenameLabel}.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			setShowExportModal(false);
			toast.success('CSV downloaded');
		} catch {
			toast.error('No data found for the selected filter');
		} finally {
			setDownloading(false);
		}
	};

	const canDownload = () => {
		if (exportType === 'summary') return !!selectedPeriod;
		if (slipsFilter === 'all') return true;
		if (slipsFilter === 'period') return !!selectedPeriod;
		if (slipsFilter === 'dateRange') return !!startDate && !!endDate;
		return false;
	};

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
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl md:text-2xl font-semibold">Artists Revenue</h1>
					<p className="text-sm text-muted-foreground mt-1">Track revenue generated by artists</p>
				</div>
				<Button variant="outline" onClick={() => setShowExportModal(true)} className="flex items-center gap-2">
					<Download size={16} />
					Export CSV
				</Button>
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
			{showExportModal && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-secondary border border-border rounded-lg w-full max-w-md">
						<div className="flex items-center justify-between p-4 border-b border-border">
							<h3 className="text-lg font-semibold">Export CSV</h3>
							<button onClick={() => setShowExportModal(false)} className="text-muted-foreground hover:text-foreground">
								<X size={20} />
							</button>
						</div>
						<div className="p-4 space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Export Type</label>
								<div className="flex gap-2">
									<Button variant={exportType === 'summary' ? 'default' : 'outline'} size="sm" onClick={() => setExportType('summary')} className="flex-1">
										Artist Summary
									</Button>
									<Button variant={exportType === 'slips' ? 'default' : 'outline'} size="sm" onClick={() => setExportType('slips')} className="flex-1">
										Withdrawal Slips
									</Button>
								</div>
							</div>

							{exportType === 'summary' && (
								<div className="space-y-2">
									<label className="text-sm font-medium">Activity Period</label>
									<select className="w-full bg-[#383838] text-foreground rounded-md border border-border px-3 py-2" value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
										<option value="">Select a period...</option>
										{periods.map((period: string) => (
											<option key={period} value={period}>
												{period}
											</option>
										))}
									</select>
								</div>
							)}

							{exportType === 'slips' && (
								<>
									<div className="space-y-2">
										<label className="text-sm font-medium">Filter By</label>
										<div className="flex gap-2">
											<Button variant={slipsFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setSlipsFilter('all')} className="flex-1">
												All
											</Button>
											<Button variant={slipsFilter === 'period' ? 'default' : 'outline'} size="sm" onClick={() => setSlipsFilter('period')} className="flex-1">
												Period
											</Button>
											<Button variant={slipsFilter === 'dateRange' ? 'default' : 'outline'} size="sm" onClick={() => setSlipsFilter('dateRange')} className="flex-1">
												Date Range
											</Button>
										</div>
									</div>

									{slipsFilter === 'period' && (
										<div className="space-y-2">
											<label className="text-sm font-medium">Activity Period</label>
											<select className="w-full bg-[#383838] text-foreground rounded-md border border-border px-3 py-2" value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
												<option value="">Select a period...</option>
												{periods.map((period: string) => (
													<option key={period} value={period}>
														{period}
													</option>
												))}
											</select>
										</div>
									)}

									{slipsFilter === 'dateRange' && (
										<div className="grid grid-cols-2 gap-3">
											<div className="space-y-2">
												<label className="text-sm font-medium">From</label>
												<Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-[#383838]" />
											</div>
											<div className="space-y-2">
												<label className="text-sm font-medium">To</label>
												<Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-[#383838]" />
											</div>
										</div>
									)}
								</>
							)}
							<label className="flex items-center gap-2 cursor-pointer">
								<input type="checkbox" checked={minLimitOnly} onChange={e => setMinLimitOnly(e.target.checked)} className="rounded border-border" />
								<span className="text-sm">Only export above minimum limit (₦20,000)</span>
							</label>
						</div>
						<div className="flex justify-end gap-2 p-4 border-t border-border">
							<Button variant="outline" onClick={() => setShowExportModal(false)}>
								Cancel
							</Button>
							<Button onClick={handleDownload} disabled={downloading || !canDownload()}>
								{downloading ? (
									<>
										<Loader2 size={16} className="animate-spin mr-2" />
										Downloading...
									</>
								) : (
									<>
										<Download size={16} className="mr-2" />
										Download
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ArtistRevenue;
