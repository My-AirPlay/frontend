'use client';

import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button, DataTable } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Download, FileText } from 'lucide-react';
import { exportAnalyticsCsv, exportByActivityPeriodCsv, ReportPeriodPair, useGetReportPeriodPairs } from '@/app/artiste/(main)/dashboard/misc/api';

const ExportPage: React.FC = () => {
	const { artist } = useAuthContext();
	const artistId = artist!._id;

	const { data: reports, isLoading } = useGetReportPeriodPairs(artistId!);

	const [exportingId, setExportingId] = useState<string | null>(null);

	const handleExport = async (report: ReportPeriodPair) => {
		setExportingId(report.reportId + report.activityPeriod);
		await exportByActivityPeriodCsv(report.activityPeriod, report.reportId);
		setExportingId(null);
	};

	const handleExportLegacy = async (report: ReportPeriodPair) => {
		setExportingId('legacy-' + report.reportId + report.activityPeriod);
		await exportAnalyticsCsv(artistId!, report.reportId, report.activityPeriod);
		setExportingId(null);
	};

	const columns = useMemo<ColumnDef<ReportPeriodPair>[]>(
		() => [
			{
				accessorKey: 'reportId',
				header: 'Report Name',
				cell: ({ row }) => {
					const name = row.original.reportId.split(':')[0];
					return (
						<div className="flex items-center gap-3">
							<div className="bg-primary/10 p-2 rounded-md">
								<FileText className="text-primary" size={18} />
							</div>
							<span className="font-medium text-white">{name}</span>
						</div>
					);
				}
			},
			{
				accessorKey: 'activityPeriod',
				header: 'Activity Period',
				cell: ({ row }) => <span className="text-muted-foreground">{row.original.activityPeriod}</span>
			},
			{
				id: 'actions',
				header: () => <div className="text-right">Actions</div>,
				cell: ({ row }) => {
					const uniqueId = row.original.reportId + row.original.activityPeriod;
					const isExportingDetailed = exportingId === uniqueId;
					const isExportingLegacy = exportingId === 'legacy-' + uniqueId;

					return (
						<div className="text-right flex justify-end gap-2">
							<Button variant="ghost" size="sm" onClick={() => handleExport(row.original)} disabled={!!exportingId} isLoading={isExportingDetailed}>
								<Download size={16} className="mr-2" />
								Detailed Export
							</Button>
							<Button variant="outline" size="sm" onClick={() => handleExportLegacy(row.original)} disabled={!!exportingId} isLoading={isExportingLegacy}>
								<Download size={16} className="mr-2" />
								Summary
							</Button>
						</div>
					);
				}
			}
		],
		[exportingId, artistId]
	);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-white">Export Analytics</h1>
				<p className="text-muted-foreground mt-2">Download detailed CSV reports for your royalty statements and activity periods.</p>
			</div>

			<div className="bg-secondary rounded-lg border border-border">
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[300px]">
						<LoadingBox />
					</div>
				) : !reports || reports.length === 0 ? (
					<div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
						<FileText size={48} className="text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold text-white">No Reports Available</h3>
						<p className="text-muted-foreground mt-1">You do not have any reports available for export yet.</p>
					</div>
				) : (
					<DataTable data={reports} columns={columns} />
				)}
			</div>
		</div>
	);
};

export default ExportPage;
