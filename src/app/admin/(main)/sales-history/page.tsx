'use client';

import React, { useMemo, useState, useTransition } from 'react';
import { TrendingUp, Calendar, FileText, ChevronRight, Users, Loader2 } from 'lucide-react';
import { NairaIcon } from '@/components/ui/naira-icon';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import { useGetGroupedSalesHistory, GroupedSalesHistoryItem } from '@/app/admin/(main)/catalogue/api/getGroupedSalesHistory';
import { DataTable, PreviousPageButton } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/utils/currency';

const SalesHistory: React.FC = () => {
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get('page') || '1');
	const limit = parseInt(searchParams.get('limit') || '10');
	const sortBy = (searchParams.get('sortBy') as 'activityPeriod' | 'createdAt' | 'netRevenue' | 'grossRevenue') || 'activityPeriod';
	const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

	const { data: groupedSalesResponse, isLoading } = useGetGroupedSalesHistory({ page, limit, sortBy, sortOrder });

	const tableData = useMemo(() => groupedSalesResponse?.data || [], [groupedSalesResponse]);
	const pageCount = groupedSalesResponse?.totalPages || 0;
	const summary = groupedSalesResponse?.summary || { totalNetRevenue: 0, totalGrossRevenue: 0 };

	const handleRowClick = (activityPeriod: string) => {
		setNavigatingTo(activityPeriod);
		startTransition(() => {
			router.push(`/admin/sales-history/${encodeURIComponent(activityPeriod)}`);
		});
	};

	const columns = useMemo<ColumnDef<GroupedSalesHistoryItem>[]>(
		() => [
			{
				accessorKey: 'activityPeriod',
				header: 'Activity Period',
				cell: ({ row }) => {
					const isNavigating = isPending && navigatingTo === row.original.activityPeriod;
					return (
						<div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleRowClick(row.original.activityPeriod)}>
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">{isNavigating ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <Calendar className="w-5 h-5 text-primary" />}</div>
							<div>
								<span className="font-semibold group-hover:text-primary transition-colors">{row.original.activityPeriod || '-'}</span>
								<p className="text-xs text-muted-foreground">{isNavigating ? 'Loading...' : `${row.original.reportIds?.length || 0} reports`}</p>
							</div>
						</div>
					);
				}
			},
			{
				accessorKey: 'artistNames',
				header: 'Artists',
				cell: ({ row }) => {
					const artists = row.original.artistNames || [];
					const count = artists.length;
					return (
						<div className="flex items-center gap-2">
							<Users className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm">
								{count} artist{count !== 1 ? 's' : ''}
							</span>
						</div>
					);
				}
			},
			{
				accessorKey: 'trackCount',
				header: 'Tracks',
				cell: ({ row }) => <span className="text-sm font-medium">{row.original.trackCount?.toLocaleString() || 0}</span>
			},
			{
				accessorKey: 'grossRevenue',
				header: 'Gross Revenue',
				cell: ({ row }) => <span className="text-sm font-medium text-purple-500">{formatCurrency(row.original.grossRevenue || 0, 'NGN')}</span>
			},
			{
				accessorKey: 'netRevenue',
				header: 'Net Revenue',
				cell: ({ row }) => <span className="text-sm font-semibold text-green-500">{formatCurrency(row.original.netRevenue || 0, 'NGN')}</span>
			},
			{
				accessorKey: 'avgDealRate',
				header: 'Avg Deal Rate',
				cell: ({ row }) => (
					<Badge variant="secondary" className="font-mono">
						{row.original.avgDealRate || 0}%
					</Badge>
				)
			},
			{
				accessorKey: 'createdAt',
				header: 'Date',
				cell: ({ row }) => {
					if (!row.original.createdAt) return <p>-</p>;
					const date = new Date(row.original.createdAt);
					return <p className="text-sm text-muted-foreground">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>;
				}
			},
			{
				id: 'action',
				header: '',
				cell: ({ row }) => {
					const isNavigating = isPending && navigatingTo === row.original.activityPeriod;
					return (
						<div className="cursor-pointer p-2 hover:bg-muted rounded-full transition-colors" onClick={() => handleRowClick(row.original.activityPeriod)}>
							{isNavigating ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
						</div>
					);
				}
			}
		],
		[isPending, navigatingTo]
	);

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			{/* Header */}
			<div>
				<h1 className="text-xl md:text-2xl font-semibold">Sales History</h1>
				<p className="text-sm text-muted-foreground mt-1">View sales grouped by activity period</p>
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
					<p className="text-xs text-muted-foreground mb-1">Total Gross Revenue</p>
					<p className="text-xl font-bold text-purple-500">{formatCurrency(summary.totalGrossRevenue, 'NGN')}</p>
					<p className="text-xs text-muted-foreground mt-1">Before artist deals</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
							<NairaIcon className="w-5 h-5 text-green-500" />
						</div>
						<TrendingUp className="w-4 h-4 text-green-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Net Revenue</p>
					<p className="text-xl font-bold text-green-500">{formatCurrency(summary.totalNetRevenue, 'NGN')}</p>
					<p className="text-xs text-muted-foreground mt-1">After artist deals</p>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<FileText className="w-5 h-5 text-blue-500" />
						</div>
						<ChevronRight className="w-4 h-4 text-blue-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Activity Periods</p>
					<p className="text-xl font-bold text-blue-500">{groupedSalesResponse?.total || tableData.length}</p>
					<p className="text-xs text-muted-foreground mt-1">Click to view details</p>
				</div>
			</div>

			{/* Table */}
			{isLoading ? (
				<div className="flex justify-center items-center rounded-md border min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<div className="rounded-lg border border-border overflow-hidden">
					<DataTable data={tableData} columns={columns} showCheckbox={false} defaultRowsPerPage={limit} pageCount={pageCount} />
				</div>
			)}
		</div>
	);
};

export default SalesHistory;
