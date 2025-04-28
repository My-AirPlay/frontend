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
		<div className="space-y-4 ">
			<div className={cn('print:hidden overflow-hidden rounded-full opacity-0 transition-opacity', isFetching && !isLoading && 'opacity-100')}>
				<div className="bg-primary/20 h-1 w-full overflow-hidden">
					<div className="h-full w-full origin-[0_50%] animate-indeterminate-progress rounded-full bg-primary"></div>
				</div>
			</div>
			{filterComponent && <div className="flex justify-end mb-4">{filterComponent}</div>}

			<div className={cn('rounded-xl overflow-hidden bg-custom-gradient', className)}>
				<Table>
					<TableHeader className="pb-3">
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id} className="border-border">
								{headerGroup.headers.map(header => (
									<TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table?.getRowModel()?.rows?.length ? (
							table?.getRowModel()?.rows?.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="cursor-pointer" onClick={() => onRowClick && onRowClick(row.original)}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={tableColumns.length} className="text-center p-4">
									No data available
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

						<div className="flex items-center space-x-2">
							<span className="text-sm text-foreground">Rows per page</span>
							<select
								className="bg-accent text-foreground rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
								value={table.getState().pagination.pageSize}
								onChange={e => {
									table.setPageSize(Number(e.target.value));
								}}
							>
								{rowsPerPageOptions.map(pageSize => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default DataTable;
