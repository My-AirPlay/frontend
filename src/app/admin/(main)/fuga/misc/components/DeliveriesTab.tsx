/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { DataTable, Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Textarea } from '@/components/ui';
import { RefreshCcw, XCircle, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useGetFugaDeliveries, useFugaMutations, FugaDelivery, downloadFugaCsv } from '@/app/admin/(main)/fuga/api/fugaApi';
import moment from 'moment';

const DeliveriesTab = () => {
	const [page] = useState(1);
	const { data, isLoading } = useGetFugaDeliveries({ page, limit: 10 });
	const { deliverMutation, cancelMutation, markErrorMutation } = useFugaMutations();

	const [errorTarget, setErrorTarget] = useState<FugaDelivery | null>(null);
	const [errorReason, setErrorReason] = useState('');

	const handleMarkError = async () => {
		if (!errorTarget) return;
		try {
			await markErrorMutation.mutateAsync({ id: errorTarget.id, reason: errorReason.trim() });
			toast.success('Delivery marked as error');
			setErrorTarget(null);
			setErrorReason('');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to mark delivery as error');
		}
	};

	const handleRetry = async (id: string) => {
		try {
			await deliverMutation.mutateAsync(id);
			toast.success('Delivery queued for retry');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to retry delivery');
		}
	};

	const handleCancel = async (id: string) => {
		try {
			await cancelMutation.mutateAsync(id);
			toast.success('Delivery cancelled');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to cancel delivery');
		}
	};

	const columns = [
		{
			id: 'title',
			header: 'Release',
			cell: (info: any) => (
				<div className="flex flex-col">
					<span className="font-medium text-foreground">{info.row.original.title}</span>
					<span className="text-xs text-muted-foreground">{info.row.original.artistName}</span>
				</div>
			)
		},
		{
			id: 'upc',
			header: 'UPC',
			accessorKey: 'upc',
			cell: (info: any) => <span className="font-mono text-sm">{info.getValue() || 'Pending'}</span>
		},
		{
			id: 'status',
			header: 'Status',
			cell: (info: any) => {
				const status = info.getValue() as string;
				const variants: Record<string, any> = {
					gated: { variant: 'secondary', label: 'Gated' },
					queued: { variant: 'outline', label: 'Queued' },
					delivering: { variant: 'outline', label: 'Delivering', className: 'animate-pulse' },
					delivered: { variant: 'success', label: 'Delivered' },
					failed: { variant: 'destructive', label: 'Failed' },
					ineligible: { variant: 'warning', label: 'Ineligible' },
					cancelled: { variant: 'outline', label: 'Cancelled' }
				};
				const config = variants[status] || { variant: 'outline', label: status };
				return (
					<Badge variant={config.variant} className={config.className}>
						{config.label}
					</Badge>
				);
			},
			accessorKey: 'status'
		},
		{
			id: 'enqueuedAt',
			header: 'Enqueued',
			cell: (info: any) => <span className="text-sm">{moment(info.getValue()).format('D MMM, HH:mm')}</span>,
			accessorKey: 'enqueuedAt'
		},
		{
			id: 'error',
			header: 'Last Error',
			cell: (info: any) => (
				<div className="max-w-[200px] truncate text-xs text-destructive" title={info.getValue()}>
					{info.getValue()}
				</div>
			),
			accessorKey: 'lastError'
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: (info: any) => {
				const item = info.row.original as FugaDelivery;
				const canCancel = item.status === 'gated';
				const canRetry = ['failed', 'delivered', 'cancelled', 'ineligible'].includes(item.status);
				const canDownload = item.status === 'delivered';
				const canMarkError = item.status === 'delivered';

				return (
					<div className="flex items-center gap-2">
						{canMarkError && (
							<Button
								variant="ghost"
								size="sm"
								className="text-destructive hover:text-destructive hover:bg-destructive/10"
								onClick={() => {
									setErrorTarget(item);
									setErrorReason('');
								}}
							>
								<AlertTriangle size={16} className="mr-1" />
								Mark Error
							</Button>
						)}
						{canCancel && (
							<Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleCancel(item.id)} disabled={cancelMutation.isPending}>
								<XCircle size={16} className="mr-1" />
								Cancel
							</Button>
						)}
						{canRetry && (
							<Button variant="ghost" size="sm" onClick={() => handleRetry(item.id)} disabled={deliverMutation.isPending}>
								<RefreshCcw size={16} className="mr-1" />
								{item.status === 'delivered' ? 'Push' : 'Retry'}
							</Button>
						)}
						{canDownload && (
							<Button variant="ghost" size="sm" onClick={() => downloadFugaCsv(item.id, item.upc || '')}>
								<Download size={16} className="mr-1" />
								CSV
							</Button>
						)}
					</div>
				);
			}
		}
	];

	return (
		<div className="space-y-4">
			<DataTable data={data?.data || []} columns={columns} isLoading={isLoading} pagination={true} pageCount={data?.totalPages} />

			<Dialog
				open={!!errorTarget}
				onOpenChange={open => {
					if (!open) {
						setErrorTarget(null);
						setErrorReason('');
					}
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Mark delivery as error</DialogTitle>
						<DialogDescription>
							Use this when FUGA accepted the upload but later rejected it during ingestion (e.g. artwork or metadata). The delivery will be set to <strong>failed</strong> with this reason and can be retried after it&apos;s fixed.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-3">
						<Textarea autoResize minRows={3} placeholder="Reason (e.g. FUGA rejected artwork: must be 1400x1400 or 3000x3000)" value={errorReason} onChange={e => setErrorReason(e.target.value)} />
						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									setErrorTarget(null);
									setErrorReason('');
								}}
							>
								Cancel
							</Button>
							<Button variant="destructive" size="sm" onClick={handleMarkError} disabled={markErrorMutation.isPending}>
								{markErrorMutation.isPending ? 'Saving...' : 'Mark as Error'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DeliveriesTab;
