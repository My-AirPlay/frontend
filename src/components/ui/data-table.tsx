/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { flexRender, useReactTable, PaginationState, OnChangeFn, RowSelectionState, ColumnDef, getCoreRowModel } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export interface DataTableProps<TData, TValue> {
	data: TData[];
	columns: ColumnDef<TData, TValue>[];
	showCheckbox?: boolean;
	onRowClick?: (row: TData) => void;
	pagination?: boolean;
	className?: string;
	rowsPerPageOptions?: number[];
	defaultRowsPerPage?: number;
	filterComponent?: React.ReactNode;
	onRowSelectionChange?: (rows: TData[]) => void;
	isFetching?: boolean;
	isLoading?: boolean;
	pageCount?: number;
}

export function DataTable<TData, TValue>({ data, columns, isFetching, isLoading, showCheckbox = false, onRowClick, pagination = true, className = '', rowsPerPageOptions = [3, 10, 20, 50], defaultRowsPerPage = 10, filterComponent, onRowSelectionChange, pageCount }: DataTableProps<TData, TValue>) {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Get initial page and limit from URL query parameters
	const initialPage = parseInt(searchParams.get('page') || '1', 10) - 1; // pageIndex is 0-based
	const initialLimit = parseInt(searchParams.get('limit') || defaultRowsPerPage.toString(), 10);

	// Pagination state
	const [paginationState, setPaginationState] = useState<PaginationState>({
		pageIndex: initialPage >= 0 ? initialPage : 0,
		pageSize: initialLimit > 0 ? initialLimit : defaultRowsPerPage
	});

	// Row selection state
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	// Update URL when pagination state changes
	useEffect(() => {
		const page = table.getState().pagination?.pageIndex + 1 || 1;
		const limit = table.getState().pagination?.pageSize || defaultRowsPerPage;

		// Create new URL with updated query parameters
		const params = new URLSearchParams(searchParams.toString());
		if (params.get('page') === page.toString() && params.get('limit') === limit.toString()) {
			return;
		}
		params.set('page', page.toString());
		params.set('limit', limit.toString());

		// Update the URL without reloading the page
		router.push(`?${params.toString()}`, { scroll: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginationState, router, searchParams]);

	// Ensure data is always an array, defaulting to empty if undefined/null
	const tableData = useMemo(() => data || [], [data]);

	// checkbox column if showCheckbox is true
	const tableColumns = useMemo(() => {
		if (!showCheckbox) return columns;

		return [
			{
				id: 'select',
				header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
				cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} onClick={e => e.stopPropagation()} aria-label="Select row" />,
				enableSorting: false,
				enableHiding: false
			},
			...columns
		] as ColumnDef<TData, TValue>[];
	}, [columns, showCheckbox]);

	//  table initialization
	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		// getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
		onPaginationChange: setPaginationState as OnChangeFn<PaginationState>,
		onRowSelectionChange: setRowSelection as OnChangeFn<RowSelectionState>,
		state: {
			pagination: pagination ? paginationState : undefined,
			rowSelection
		},
		// manualPagination: !pagination,
		// Use tableData.length here which is guaranteed to be an array
		pageCount: pageCount ? pageCount : pagination ? Math.ceil(tableData.length / paginationState.pageSize) : 1,
		manualPagination: pagination // Enable manual pagination since the API handles it
	});

	// effect :- when rowSelection changes, update selected rows
	React.useEffect(() => {
		if (onRowSelectionChange) {
			const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
			onRowSelectionChange(selectedRows);
		}
	}, [rowSelection, onRowSelectionChange, table]);

	return (
		<div className={cn(' bg-zinc-900 p-4 sm:p-6 md:p-8 lg:p-10 text-zinc-100', className)}>
			{/* Indeterminate Loading Bar */}
			<div className={cn('print:hidden h-1 w-full overflow-hidden rounded-full transition-opacity duration-300 ease-in-out', isFetching && !isLoading ? 'opacity-100' : 'opacity-0')}>
				<div className="h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary-500"></div>
			</div>

			{/* Filter Component */}
			{filterComponent && <div className="flex justify-end mb-6 mt-4">{filterComponent}</div>}

			{/* Table Container */}
			<div className={cn('rounded-xl overflow-hidden border border-zinc-700 shadow-xl bg-zinc-800')}>
				<Table>
					<TableHeader className="bg-zinc-700">
						{' '}
						{/* Darker header background */}
						{table.getHeaderGroups().map(
							(
								headerGroup: any // Cast to any for mock compatibility
							) => (
								<TableRow key={headerGroup.id} className="border-b border-zinc-600">
									{' '}
									{/* Lighter border for header */}
									{headerGroup.headers.map(
										(
											header: any // Cast to any for mock compatibility
										) => (
											<TableHead key={header.id} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-300">
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										)
									)}
								</TableRow>
							)
						)}
					</TableHeader>
					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table?.getRowModel()?.rows?.map(
								(
									row: any // Cast to any for mock compatibility
								) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className="cursor-pointer border-b border-zinc-800 last:border-b-0 hover:bg-zinc-700 transition-colors duration-150 ease-in-out" // Lighter hover
										onClick={() => onRowClick && onRowClick(row.original)}
									>
										{row.getVisibleCells().map(
											(
												cell: any // Cast to any for mock compatibility
											) => (
												<TableCell key={cell.id} className="px-4 py-3 text-sm text-zinc-100">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											)
										)}
									</TableRow>
								)
							)
						) : (
							<TableRow>
								<TableCell colSpan={tableColumns.length} className="text-center p-6 text-zinc-400">
									{isLoading ? (
										<span className="flex items-center justify-center">
											<svg className="animate-spin h-5 w-5 text-primary-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Loading data...
										</span>
									) : (
										'No data available'
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				{pagination && data?.length > 0 && (
					<div className="flex justify-between items-center mt-2 px-4 py-2.5 ">
						<div className="flex items-center space-x-2">
							<button className="w-7 h-7 border border-foreground rounded-md flex items-center justify-center disabled:opacity-50" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
								<ChevronLeft size={14} />
							</button>
							<span className="flex items-center gap-2 text-sm">
								{table.getState().pagination.pageIndex + 1}
								<span>/</span>
								<span className="text-primary/80 text-xs">{table.getPageCount()}</span>
							</span>
							<button className="w-7 h-7 border border-foreground rounded-md flex items-center justify-center disabled:opacity-50" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
								<ChevronRight size={14} />
							</button>
						</div>

						{/* Rows per page selector */}
						<div className="flex items-center space-x-2">
							<span className="text-sm text-zinc-300">Rows per page:</span>
							<select
								className="bg-zinc-600 text-zinc-200 rounded-md border border-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
								value={table.getState().pagination.pageSize}
								onChange={e => {
									table.setPageSize(Number(e.target.value));
								}}
							>
								{rowsPerPageOptions?.map(pageSize => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				)}
			</div>

			{/* Custom scrollbar styling */}
			<style>
				{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #525252 #3f3f46; /* thumb track (zinc-600 zinc-700) */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #525252; /* zinc-600 */
          border-radius: 10px;
          border: 2px solid #3f3f46; /* zinc-700 for track background */
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #3f3f46; /* zinc-700 */
        }

        @keyframes indeterminate-progress {
            0% { transform: translateX(-100%) scaleX(0); }
            40% { transform: translateX(0%) scaleX(0.4); }
            100% { transform: translateX(100%) scaleX(0.5); }
        }
        .animate-indeterminate-progress {
            animation: indeterminate-progress 1.5s infinite ease-in-out;
        }
        `}
			</style>
		</div>
	);
}

export default DataTable;
