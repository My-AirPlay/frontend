'use client';

import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button, DataTable } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Download, FileText } from 'lucide-react';
import { exportByActivityPeriodCsv, useGetReportPeriodPairs } from '@/app/artiste/(main)/dashboard/misc/api';

interface PeriodRow {
	activityPeriod: string;
}

const ExportPage: React.FC = () => {
	const { artist } = useAuthContext();
	const artistId = artist!._id;

	const { data: reports, isLoading } = useGetReportPeriodPairs(artistId!);

	const periods = useMemo<PeriodRow[]>(() => {
		if (!reports) return [];
		const unique = [...new Set(reports.map(r => r.activityPeriod))];
		unique.sort((a, b) => b.localeCompare(a));
		return unique.map(p => ({ activityPeriod: p }));
	}, [reports]);

	const [exportingId, setExportingId] = useState<string | null>(null);

	const handleExport = async (period: string) => {
		setExportingId(period);
		await exportByActivityPeriodCsv(period);
		setExportingId(null);
	};

	const columns = useMemo<ColumnDef<PeriodRow>[]>(
		() => [
			{
				accessorKey: 'activityPeriod',
				header: 'Activity Period',
				cell: ({ row }) => (
					<div className="flex items-center gap-3">
						<div className="bg-primary/10 p-2 rounded-md">
							<FileText className="text-primary" size={18} />
						</div>
						<span className="font-medium text-white">{row.original.activityPeriod}</span>
					</div>
				)
			},
			{
				id: 'actions',
				header: () => <div className="text-right">Actions</div>,
				cell: ({ row }) => {
					const period = row.original.activityPeriod;
					const isExporting = exportingId === period;

					return (
						<div className="text-right flex justify-end">
							<Button variant="ghost" size="sm" onClick={() => handleExport(period)} disabled={!!exportingId} isLoading={isExporting}>
								<Download size={16} className="mr-2" />
								Export CSV
							</Button>
						</div>
					);
				}
			}
		],
		[exportingId]
	);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-white">Export Analytics</h1>
				<p className="text-muted-foreground mt-2">Download detailed CSV reports for your royalty statements by activity period.</p>
			</div>

			<div className="bg-secondary rounded-lg border border-border">
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[300px]">
						<LoadingBox />
					</div>
				) : periods.length === 0 ? (
					<div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
						<FileText size={48} className="text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold text-white">No Reports Available</h3>
						<p className="text-muted-foreground mt-1">You do not have any reports available for export yet.</p>
					</div>
				) : (
					<DataTable data={periods} columns={columns} />
				)}
			</div>
		</div>
	);
};

export default ExportPage;
