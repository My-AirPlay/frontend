'use client';

import React, { useMemo, useState, useTransition, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useGetReportsByPeriod, ReportByPeriod } from '@/app/admin/(main)/catalogue/api/getReportsByPeriod';
import { useDeleteSalesHistory } from '@/app/admin/(main)/catalogue/api/getSalesHistory';
import { PreviousPageButton, DataTable } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingBox } from '@/components/ui/LoadingBox';
import DeletionProgressModal from '@/components/ui/delete-records-modal';
import { formatCurrency } from '@/utils/currency';
import { Calendar, BarChart3, FileText, TrendingUp, Music, Users, Eye, AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { NairaIcon } from '@/components/ui/naira-icon';

const CHART_COLORS = ['#8b5cf6', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316'];

const ActivityPeriodContent: React.FC = () => {
	const params = useParams<{ activityPeriod: string }>();
	const activityPeriod = decodeURIComponent(params.activityPeriod);
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('overview');
	const [isPending, startTransition] = useTransition();
	const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
	const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);
	const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

	const { data: periodData, isLoading, isError, refetch } = useGetReportsByPeriod({ activityPeriod });
	const { mutate: deleteRecords } = useDeleteSalesHistory();

	const reports = useMemo(() => periodData?.data || [], [periodData]);
	const summary = periodData?.summary || { totalNetRevenue: 0, totalGrossRevenue: 0, totalTracks: 0, totalArtists: 0 };

	// Prepare chart data from reports - tracks and artists per report
	const reportChartData = useMemo(() => {
		return reports.map(report => {
			const name = report.name || 'Unnamed Report';
			return {
				name: name.length > 15 ? name.substring(0, 15) + '...' : name,
				fullName: name,
				tracks: report.trackCount || 0,
				artists: report.artistNames?.length || 0
			};
		});
	}, [reports]);

	// Artists distribution pie chart data
	const artistsDistribution = useMemo(() => {
		return reports.slice(0, 8).map((report, index) => {
			const name = report.name || 'Unnamed Report';
			return {
				name: name.length > 12 ? name.substring(0, 12) + '...' : name,
				value: report.artistNames?.length || 0,
				color: CHART_COLORS[index % CHART_COLORS.length]
			};
		});
	}, [reports]);

	const handleViewReport = (reportId: string) => {
		setNavigatingTo(reportId);
		startTransition(() => {
			router.push(`/admin/sales-history/report/${encodeURIComponent(reportId)}`);
		});
	};

	const handleSelectionChange = useCallback((selectedRows: ReportByPeriod[]) => {
		const ids = selectedRows.map(row => row.reportId || row._id);
		setSelectedReportIds(ids);
	}, []);

	const handleDeleteSelected = () => {
		if (selectedReportIds.length > 0) {
			setIsDeletionModalOpen(true);
			deleteRecords(
				{ reportIds: selectedReportIds },
				{
					onSuccess: () => {
						toast.success('Records deletion in progress!');
					},
					onError: () => {
						handleCloseDeletionModal();
						toast.error('Error deleting records, please try again');
					}
				}
			);
		}
	};

	const handleCloseDeletionModal = () => {
		setIsDeletionModalOpen(false);
		setSelectedReportIds([]);
		refetch();
	};

	const columns = useMemo<ColumnDef<ReportByPeriod>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Report Name',
				cell: ({ row }) => {
					const reportId = row.original.reportId || row.original._id;
					const isNavigating = isPending && navigatingTo === reportId;
					return (
						<div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleViewReport(reportId)}>
							<div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">{isNavigating ? <Loader2 className="w-4 h-4 text-blue-500 animate-spin" /> : <FileText className="w-4 h-4 text-blue-500" />}</div>
							<div>
								<span className="font-medium group-hover:text-primary transition-colors">{row.original.name || 'Unnamed Report'}</span>
								<p className="text-xs text-muted-foreground font-mono">{isNavigating ? 'Loading...' : `${(reportId || '').substring(0, 20)}...`}</p>
							</div>
						</div>
					);
				}
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.original.status;
					let variant: 'success' | 'destructive' | 'secondary' = 'success';
					if (status === 'Incomplete' || status === 'Pending') variant = 'secondary';
					return <Badge variant={variant}>{status || '-'}</Badge>;
				}
			},
			{
				accessorKey: 'artistNames',
				header: 'Artists',
				cell: ({ row }) => {
					const artists = row.original.artistNames || [];
					const display = artists.length > 2 ? `${artists.slice(0, 2).join(', ')} +${artists.length - 2}` : artists.join(', ');
					return (
						<span className="text-sm" title={artists.join(', ')}>
							{display || '-'}
						</span>
					);
				}
			},
			{
				accessorKey: 'trackCount',
				header: 'Tracks',
				cell: ({ row }) => <span className="text-sm font-medium">{row.original.trackCount || '-'}</span>
			},
			{
				accessorKey: 'createdAt',
				header: 'Date',
				cell: ({ row }) => {
					if (!row.original.createdAt) return <p>-</p>;
					const date = new Date(row.original.createdAt);
					return <p className="text-sm text-muted-foreground">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>;
				}
			},
			{
				id: 'action',
				header: '',
				cell: ({ row }) => {
					const reportId = row.original.reportId || row.original._id;
					const isNavigating = isPending && navigatingTo === reportId;
					return (
						<Button variant="ghost" size="sm" onClick={() => handleViewReport(reportId)} disabled={isNavigating}>
							{isNavigating ? (
								<>
									<Loader2 className="w-4 h-4 mr-1 animate-spin" />
									Loading
								</>
							) : (
								<>
									<Eye className="w-4 h-4 mr-1" />
									View
								</>
							)}
						</Button>
					);
				}
			}
		],
		[isPending, navigatingTo]
	);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<LoadingBox size={62} />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-6">
				<PreviousPageButton />
				<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
					<AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
					<h2 className="text-xl font-semibold mb-2">Failed to load period data</h2>
					<p className="text-muted-foreground">Please try again later.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
						<Calendar className="w-7 h-7 text-primary" />
					</div>
					<div>
						<h1 className="text-xl md:text-2xl font-semibold">{activityPeriod}</h1>
						<p className="text-sm text-muted-foreground">{reports.length} reports in this period</p>
					</div>
				</div>
				<Button variant="destructive" onClick={handleDeleteSelected} disabled={selectedReportIds.length === 0} className="flex items-center gap-2">
					<Trash2 size={16} />
					<span>Delete ({selectedReportIds.length})</span>
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<NairaIcon className="w-4 h-4 text-purple-500" />
						<p className="text-xs text-muted-foreground">Gross Revenue</p>
					</div>
					<p className="text-lg font-bold text-purple-500">{formatCurrency(summary.totalGrossRevenue, 'NGN')}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<TrendingUp className="w-4 h-4 text-green-500" />
						<p className="text-xs text-muted-foreground">Net Revenue</p>
					</div>
					<p className="text-lg font-bold text-green-500">{formatCurrency(summary.totalNetRevenue, 'NGN')}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<Music className="w-4 h-4 text-blue-500" />
						<p className="text-xs text-muted-foreground">Total Tracks</p>
					</div>
					<p className="text-lg font-bold">{summary.totalTracks?.toLocaleString() || 0}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<Users className="w-4 h-4 text-pink-500" />
						<p className="text-xs text-muted-foreground">Artists</p>
					</div>
					<p className="text-lg font-bold">{summary.totalArtists || 0}</p>
				</div>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="bg-card border border-border w-full justify-start gap-4 h-auto p-1">
					<TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
						<BarChart3 className="w-4 h-4 mr-2" />
						Overview
					</TabsTrigger>
					<TabsTrigger value="sales" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
						<FileText className="w-4 h-4 mr-2" />
						Sales
					</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview" className="mt-6 space-y-6">
					{/* Tracks & Artists by Report Bar Chart */}
					{reportChartData.length > 0 && (
						<div className="rounded-lg border border-border p-4 bg-card">
							<h3 className="font-semibold mb-4 flex items-center gap-2">
								<BarChart3 className="w-4 h-4" />
								Tracks & Artists by Report
							</h3>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={reportChartData} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
										<CartesianGrid strokeDasharray="3 3" stroke="#383838" />
										<XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} angle={-45} textAnchor="end" height={80} />
										<YAxis tick={{ fontSize: 10, fill: '#888' }} />
										<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number, name: string) => [value.toLocaleString(), name === 'tracks' ? 'Tracks' : 'Artists']} labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label} />
										<Bar dataKey="tracks" fill="#3b82f6" name="Tracks" radius={[4, 4, 0, 0]} />
										<Bar dataKey="artists" fill="#ec4899" name="Artists" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Artists Distribution Pie Chart */}
						{artistsDistribution.length > 0 && artistsDistribution.some(d => d.value > 0) && (
							<div className="rounded-lg border border-border p-4 bg-card">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<Users className="w-4 h-4" />
									Artists by Report
								</h3>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie data={artistsDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
												{artistsDistribution.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={entry.color} />
												))}
											</Pie>
											<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number) => `${value} artists`} />
											<Legend layout="vertical" align="right" verticalAlign="middle" formatter={value => <span className="text-xs">{value}</span>} />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</div>
						)}

						{/* Tracks by Report Horizontal Bar Chart */}
						{reportChartData.length > 0 && (
							<div className="rounded-lg border border-border p-4 bg-card">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<Music className="w-4 h-4" />
									Tracks by Report
								</h3>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={reportChartData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
											<CartesianGrid strokeDasharray="3 3" stroke="#383838" />
											<XAxis type="number" tick={{ fontSize: 10, fill: '#888' }} />
											<YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#888' }} width={75} />
											<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number) => [value.toLocaleString(), 'Tracks']} labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label} />
											<Bar dataKey="tracks" fill="#3b82f6" radius={[0, 4, 4, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						)}
					</div>

					{/* Reports List */}
					<div className="rounded-lg border border-border overflow-hidden">
						<div className="bg-card p-4 border-b border-border">
							<h3 className="font-semibold flex items-center gap-2">
								<FileText className="w-4 h-4" />
								Reports in this Period
							</h3>
						</div>
						<div className="divide-y divide-border">
							{reports.slice(0, 5).map((report, index) => {
								const reportId = report.reportId || report._id;
								const isNavigating = isPending && navigatingTo === reportId;
								return (
									<div key={reportId || index} className={`p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer ${isNavigating ? 'bg-muted/20' : ''}`} onClick={() => handleViewReport(reportId)}>
										<div className="flex items-center gap-3">
											{isNavigating ? <Loader2 className="w-5 h-5 text-primary animate-spin" /> : <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>}
											<div>
												<p className="font-medium">{report.name || 'Unnamed Report'}</p>
												<p className="text-xs text-muted-foreground">{isNavigating ? 'Loading...' : `${report.trackCount || 0} tracks`}</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-semibold text-pink-500">{report.artistNames?.length || 0} artists</p>
											<p className="text-xs text-muted-foreground">{isNavigating ? '' : 'Click to view details'}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</TabsContent>

				{/* Sales Tab */}
				<TabsContent value="sales" className="mt-6">
					<div className="rounded-lg border border-border overflow-hidden">
						<DataTable data={reports} columns={columns} showCheckbox={true} onRowSelectionChange={handleSelectionChange} defaultRowsPerPage={10} pageCount={periodData?.totalPages || 1} />
					</div>
				</TabsContent>
			</Tabs>

			{/* Modal for deletion progress */}
			<DeletionProgressModal isOpen={isDeletionModalOpen} onClose={handleCloseDeletionModal} reportIdsToDelete={selectedReportIds} />
		</div>
	);
};

const ActivityPeriodPage: React.FC = () => {
	const params = useParams<{ activityPeriod: string }>();
	return <ActivityPeriodContent key={params.activityPeriod} />;
};

export default ActivityPeriodPage;
