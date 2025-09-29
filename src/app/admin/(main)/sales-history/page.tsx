'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Trash2, Eye, RefreshCw } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import { useDeleteSalesHistory, useGetSalesHistory } from '@/app/admin/(main)/catalogue/api/getSalesHistory';
import { Button } from '@/components/ui/button';
import { DataTable, PreviousPageButton } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportModal from '@/components/ui/report-modal';
import DeletionProgressModal from '@/components/ui/delete-records-modal';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'sonner';

// Updated Report interface to include artistNames
interface Report {
	name: string;
	reportId: string;
	activityPeriods: string[];
	artistNames: string[];
	revenue: number;
	createdAt: string;
	status: 'Complete' | 'Incomplete' | 'Pending';
}

const SalesHistory: React.FC = () => {
	const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false); // State for deletion modal
	const [selectedReport, setSelectedReport] = useState<Report | null>(null);

	const searchParams = useSearchParams();
	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '10';

	const apiParams = useMemo(
		() => ({
			page,
			limit
		}),
		[page, limit]
	);
	const router = useRouter();
	const { data: salesHistoryResponse, isLoading: salesHistoryLoading, refetch: refetchSalesHistory } = useGetSalesHistory(apiParams);
	const { mutate: deleteRecords } = useDeleteSalesHistory();
	const tableData = useMemo(() => salesHistoryResponse?.data || [], [salesHistoryResponse]);
	const pageCount = salesHistoryResponse?.totalPages || 0;

	// Function to open the details modal
	const handleViewDetails = (report: Report) => {
		setSelectedReport(report);
		setIsDetailsModalOpen(true);
	};

	// Function to close the details modal
	const handleCloseDetailsModal = () => {
		setIsDetailsModalOpen(false);
		setSelectedReport(null);
	};

	const handleReprocess = (reportId: string) => {
		router.push(`/admin/sales-history/process/${reportId}`);
	};

	const handleDeleteSelected = () => {
		if (selectedReportIds.length > 0) {
			setIsDeletionModalOpen(true);
		}
		deleteRecords(
			{ reportIds: selectedReportIds },
			{
				onSuccess: () => {
					toast.success('Records Deletion in progress!');
				},
				onError: () => {
					handleCloseDeletionModal();
					toast.error('Error deleting records, please try again');
				}
			}
		);
	};

	// Function to close the deletion modal and clear selection
	const handleCloseDeletionModal = () => {
		setIsDeletionModalOpen(false);
		setSelectedReportIds([]);
		refetchSalesHistory();
	};

	const columns = useMemo<ColumnDef<Report>[]>(
		() => [
			// ... your other columns remain the same
			{
				accessorKey: 'name',
				header: 'Tag Name',
				cell: ({ row }) => <p className="font-medium">{row.original.name || '-'}</p>
			},
			{
				accessorKey: 'reportId',
				header: 'Report ID',
				cell: ({ row }) => {
					const id = row.original.reportId;
					const truncatedId = id.length > 20 ? `${id.substring(0, 12)}...${id.substring(id.length - 4)}` : id;
					return (
						<p className="text-sm text-gray-500" title={id}>
							{truncatedId}
						</p>
					);
				}
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.original.status;
					let variant: 'success' | 'destructive' | 'secondary' = 'success'; // Default variant

					if (status === 'Incomplete') {
						variant = 'secondary';
					} else if (status === 'Pending') {
						variant = 'secondary';
					}

					return <Badge variant={variant}>{status || '-'}</Badge>;
				}
			},
			{
				accessorKey: 'activityPeriods',
				header: 'Targeted Period(s)',
				cell: ({ row }) => {
					const periods = row.original.activityPeriods;
					if (!periods || periods.length === 0) {
						return <p className="text-sm text-gray-500">-</p>;
					}
					const displayPeriods = periods.length > 2 ? `${periods.slice(0, 2).join(', ')}...` : periods.join(', ');
					return (
						<p className="text-sm" title={periods.join(', ')}>
							{displayPeriods}
						</p>
					);
				}
			},
			{
				accessorKey: 'grossRevenue',
				header: 'Gross Revenue',
				cell: ({ row }) => {
					const grossRevenue = row.original.revenue / 0.8;
					return <p className="text-sm">{formatCurrency(grossRevenue, 'NGN')}</p>;
				}
			},
			{
				accessorKey: 'revenue',
				header: 'NET Revenue',
				cell: ({ row }) => <p className="text-sm">{formatCurrency(row.original.revenue, 'NGN')}</p>
			},
			{
				accessorKey: 'createdAt',
				header: 'Date Published',
				cell: ({ row }) => {
					if (!row.original.createdAt) {
						return <p>-</p>;
					}
					const date = new Date(row.original.createdAt);
					return <p>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>;
				}
			},
			{
				id: 'actions',
				header: 'Actions',
				cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" onClick={() => handleViewDetails(row.original)}>
							<Eye size={16} />
						</Button>
						{/* Conditionally render the Re-process button */}
						<Button variant="ghost" size="sm" onClick={() => handleReprocess(row.original.reportId)}>
							<RefreshCw size={16} />
						</Button>
					</div>
				)
			}
		],
		[]
	);

	const handleSelectionChange = useCallback((selectedRows: Report[]) => {
		const ids = selectedRows.map(row => row.reportId);
		setSelectedReportIds(ids);
	}, []);

	return (
		<>
			<div className="space-y-6">
				<PreviousPageButton />

				<div>
					<div className="flex flex-wrap gap-4 justify-between items-center mb-6">
						<h1 className="text-xl md:text-2xl font-semibold">Published Sales History</h1>
						<Button variant="destructive" onClick={handleDeleteSelected} disabled={selectedReportIds.length === 0} className="flex items-center gap-2">
							<Trash2 size={16} />
							<span>Delete ({selectedReportIds.length})</span>
						</Button>
					</div>

					{salesHistoryLoading ? (
						<div className="flex justify-center items-center rounded-md border min-h-[50vh]">
							<LoadingBox size={62} />
						</div>
					) : (
						<DataTable data={tableData} columns={columns} showCheckbox={true} onRowSelectionChange={handleSelectionChange} defaultRowsPerPage={Number(limit)} pageCount={pageCount} />
					)}
				</div>
			</div>

			{/* Modal for viewing report details */}
			{isDetailsModalOpen && <ReportModal report={selectedReport} onClose={handleCloseDetailsModal} />}

			{/* Modal for deletion progress */}
			<DeletionProgressModal isOpen={isDeletionModalOpen} onClose={handleCloseDeletionModal} reportIdsToDelete={selectedReportIds} />
		</>
	);
};

export default SalesHistory;
