/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { DataTable, Button, Badge } from '@/components/ui';
import { RefreshCcw, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGetFugaDeliveries, useFugaMutations, FugaDelivery } from '@/app/admin/(main)/fuga/api/fugaApi';
import moment from 'moment';

const DeliveriesTab = () => {
	const [page] = useState(1);
	const { data, isLoading } = useGetFugaDeliveries({ page, limit: 10 });
	const { deliverMutation, cancelMutation } = useFugaMutations();

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
					queued: { variant: 'outline', label: 'Queed' },
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

				return (
					<div className="flex items-center gap-2">
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
					</div>
				);
			}
		}
	];

	return (
		<div className="space-y-4">
			<DataTable data={data?.data || []} columns={columns} isLoading={isLoading} pagination={true} pageCount={data?.totalPages} />
		</div>
	);
};

export default DeliveriesTab;
