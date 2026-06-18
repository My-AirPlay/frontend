/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { DataTable, Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Textarea, Input } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCcw, XCircle, Download, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useGetFugaDeliveries, useFugaMutations, FugaDelivery, downloadFugaCsv } from '@/app/admin/(main)/fuga/api/fugaApi';
import moment from 'moment';

// Fields an admin can flag as the cause of a FUGA ingestion rejection. Each
// selected field becomes a line in the artist-facing rejection reasons.
const FLAGGABLE_FIELDS = ['Cover Art', 'Audio File', 'Title', 'Artist Name', 'Genre', 'Release Date', 'UPC', 'ISRC', 'Explicit Content', 'Songwriter / Publisher', 'Other Metadata'];

const DeliveriesTab = () => {
	const [page] = useState(1);
	const { data, isLoading } = useGetFugaDeliveries({ page, limit: 10 });
	const { deliverMutation, cancelMutation, markErrorMutation } = useFugaMutations();

	const [errorTarget, setErrorTarget] = useState<FugaDelivery | null>(null);
	const [errorReason, setErrorReason] = useState('');
	// Delivery whose full "Last Error" is being viewed in the details modal.
	const [errorDetailTarget, setErrorDetailTarget] = useState<FugaDelivery | null>(null);
	// Selected field -> its (optional) per-field reason. Presence of a key means
	// the field is checked.
	const [fieldReasons, setFieldReasons] = useState<Record<string, string>>({});

	const resetErrorDialog = () => {
		setErrorTarget(null);
		setErrorReason('');
		setFieldReasons({});
	};

	const toggleField = (field: string, checked: boolean) => {
		setFieldReasons(prev => {
			const next = { ...prev };
			if (checked) next[field] = next[field] || '';
			else delete next[field];
			return next;
		});
	};

	const hasErrorInput = Object.keys(fieldReasons).length > 0 || errorReason.trim().length > 0;

	const handleMarkError = async () => {
		if (!errorTarget) return;
		try {
			const fieldErrors = Object.entries(fieldReasons).map(([field, reason]) => ({ field, reason: reason.trim() || undefined }));
			await markErrorMutation.mutateAsync({ id: errorTarget.id, reason: errorReason.trim() || undefined, fieldErrors });
			toast.success('Delivery marked as error');
			resetErrorDialog();
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
			cell: (info: any) => {
				const value = info.getValue() as string | undefined;
				if (!value) return <span className="text-xs text-muted-foreground">—</span>;
				return (
					<button type="button" className="max-w-[200px] truncate text-left text-xs text-destructive underline-offset-2 hover:underline" title="Click to view full error" onClick={() => setErrorDetailTarget(info.row.original as FugaDelivery)}>
						{value}
					</button>
				);
			},
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
									resetErrorDialog();
									setErrorTarget(item);
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
					if (!open) resetErrorDialog();
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Mark delivery as error</DialogTitle>
						<DialogDescription>
							Use this when FUGA accepted the upload but later rejected it during ingestion. Select which field(s) are wrong and add a reason for each — the artist sees these as rejection reasons, fixes them, and re-uploads. The delivery is set to <strong>failed</strong> and can be retried after it&apos;s fixed.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-3">
						<div className="space-y-2">
							<p className="text-sm font-medium text-foreground">Which field(s) errored?</p>
							<div className="max-h-64 space-y-2 overflow-y-auto pr-1">
								{FLAGGABLE_FIELDS.map(field => {
									const selected = field in fieldReasons;
									return (
										<div key={field} className="space-y-1">
											<label className="flex items-center gap-2 text-sm text-foreground">
												<Checkbox checked={selected} onCheckedChange={checked => toggleField(field, checked === true)} />
												{field}
											</label>
											{selected && <Input className="ml-6 w-[calc(100%-1.5rem)]" placeholder={`What's wrong with ${field.toLowerCase()}? (e.g. must be 1400x1400)`} value={fieldReasons[field]} onChange={e => setFieldReasons(prev => ({ ...prev, [field]: e.target.value }))} />}
										</div>
									);
								})}
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-sm font-medium text-foreground">Additional note (optional)</p>
							<Textarea autoResize minRows={2} placeholder="Anything else the artist should know" value={errorReason} onChange={e => setErrorReason(e.target.value)} />
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={resetErrorDialog}>
								Cancel
							</Button>
							<Button variant="destructive" size="sm" onClick={handleMarkError} disabled={markErrorMutation.isPending || !hasErrorInput}>
								{markErrorMutation.isPending ? 'Saving...' : 'Mark as Error'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={!!errorDetailTarget} onOpenChange={open => !open && setErrorDetailTarget(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delivery error details</DialogTitle>
						<DialogDescription>
							{errorDetailTarget?.title}
							{errorDetailTarget?.artistName ? ` — ${errorDetailTarget.artistName}` : ''}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-3 text-sm">
						<div className="flex flex-wrap gap-x-6 gap-y-1 text-muted-foreground">
							{errorDetailTarget?.upc && (
								<span>
									UPC: <span className="font-mono text-foreground">{errorDetailTarget.upc}</span>
								</span>
							)}
							<span>
								Status: <span className="text-foreground">{errorDetailTarget?.status}</span>
							</span>
							{typeof errorDetailTarget?.attempts === 'number' && (
								<span>
									Attempts: <span className="text-foreground">{errorDetailTarget.attempts}</span>
								</span>
							)}
						</div>
						<div className="space-y-1">
							<p className="font-medium text-foreground">Reasons</p>
							<ul className="list-disc space-y-1 rounded-md bg-muted/50 p-3 pl-7 text-destructive">
								{(errorDetailTarget?.lastError || '')
									.split(';')
									.map(r => r.trim())
									.filter(Boolean)
									.map((reason, i) => (
										<li key={i}>{reason}</li>
									))}
							</ul>
						</div>
						<div className="flex justify-end">
							<Button variant="outline" size="sm" onClick={() => setErrorDetailTarget(null)}>
								Close
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default DeliveriesTab;
