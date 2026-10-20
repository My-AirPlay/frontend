/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { toast } from 'sonner';
import { CheckCircle2, XCircle } from 'lucide-react';

import { Badge, Button, DataTable, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Textarea } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { TTakedownRelease, TTakedownStatus, useGetTakedowns, useResolveTakedown } from '../../api/takedowns';

const FILTERS: { value: TTakedownStatus | 'all'; label: string }[] = [
	{ value: 'requested', label: 'Open' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'declined', label: 'Declined' },
	{ value: 'all', label: 'All' }
];

const STATUS_BADGE: Record<TTakedownStatus, { variant: any; label: string; className?: string }> = {
	requested: { variant: 'outline', label: 'Requested', className: 'border-amber-500 text-amber-500' },
	completed: { variant: 'success', label: 'Removed' },
	declined: { variant: 'outline', label: 'Declined' }
};

/**
 * Artists' requests to pull releases from stores. The removal itself happens
 * in FUGA; this is where an admin records that it's done (or declines it), and
 * the artist is emailed either way.
 */
const TakedownsList: React.FC = () => {
	const [filter, setFilter] = useState<TTakedownStatus | 'all'>('requested');
	const { data, isLoading } = useGetTakedowns(filter);
	const resolveMutation = useResolveTakedown();

	const [declineTarget, setDeclineTarget] = useState<TTakedownRelease | null>(null);
	const [declineNote, setDeclineNote] = useState('');

	const handleComplete = async (release: TTakedownRelease) => {
		try {
			await resolveMutation.mutateAsync({ releaseId: release._id, decision: 'completed' });
			toast.success(`"${release.title}" marked as removed — the artist has been notified`);
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to complete takedown');
		}
	};

	const handleDecline = async () => {
		if (!declineTarget) return;
		if (!declineNote.trim()) {
			toast.error('Add a note telling the artist why.');
			return;
		}
		try {
			await resolveMutation.mutateAsync({ releaseId: declineTarget._id, decision: 'declined', note: declineNote.trim() });
			toast.success('Takedown declined — the artist has been notified');
			setDeclineTarget(null);
			setDeclineNote('');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to decline takedown');
		}
	};

	const columns = [
		{
			id: 'title',
			header: 'Title',
			cell: (info: any) => {
				const release = info.row.original as TTakedownRelease;
				const href = release.type === 'album' ? `/admin/catalogue/releases/${release._id}` : `/admin/catalogue/tracks/${release._id}`;
				return (
					<Link href={href} className="text-primary hover:underline">
						{release.title}
					</Link>
				);
			}
		},
		{ id: 'artistName', header: 'Artist', accessorKey: 'artistName' },
		{ id: 'type', header: 'Type', cell: (info: any) => <span className="capitalize">{info.row.original.type}</span> },
		{ id: 'upc', header: 'UPC', cell: (info: any) => <span className="font-mono text-xs">{info.row.original.universalProductCode || '—'}</span> },
		{ id: 'requestedAt', header: 'Requested', cell: (info: any) => <span className="text-sm">{moment(info.row.original.takedown.requestedAt).format('D MMM YYYY')}</span> },
		{
			id: 'reason',
			header: 'Reason',
			cell: (info: any) => (
				<span className="block max-w-[260px] truncate text-sm" title={info.row.original.takedown.reason}>
					{info.row.original.takedown.reason || <span className="text-muted-foreground">—</span>}
				</span>
			)
		},
		{
			id: 'status',
			header: 'Status',
			cell: (info: any) => {
				const config = STATUS_BADGE[info.row.original.takedown.status as TTakedownStatus];
				return (
					<Badge variant={config.variant} className={config.className}>
						{config.label}
					</Badge>
				);
			}
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: (info: any) => {
				const release = info.row.original as TTakedownRelease;
				if (release.takedown.status !== 'requested') {
					return <span className="text-xs text-muted-foreground">{release.takedown.adminNote || '—'}</span>;
				}
				return (
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleComplete(release)} disabled={resolveMutation.isPending}>
							<CheckCircle2 size={16} className="mr-1" />
							Mark removed
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive hover:bg-destructive/10"
							onClick={() => {
								setDeclineNote('');
								setDeclineTarget(release);
							}}
							disabled={resolveMutation.isPending}
						>
							<XCircle size={16} className="mr-1" />
							Decline
						</Button>
					</div>
				);
			}
		}
	];

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<p className="text-sm text-muted-foreground">Remove the release in FUGA first, then mark it removed here.</p>
				<div className="flex gap-1">
					{FILTERS.map(f => (
						<Button key={f.value} size="sm" variant={filter === f.value ? 'default' : 'ghost'} onClick={() => setFilter(f.value)}>
							{f.label}
						</Button>
					))}
				</div>
			</div>

			{isLoading ? (
				<div className="w-full px-6 py-4 flex justify-center items-center bg-custom-gradient min-h-[50vh]">
					<LoadingBox size={62} />
				</div>
			) : (
				<DataTable data={data || []} columns={columns} pagination={false} />
			)}

			<Dialog open={!!declineTarget} onOpenChange={open => !open && setDeclineTarget(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Decline takedown</DialogTitle>
						<DialogDescription>&quot;{declineTarget?.title}&quot; stays live in stores. The artist is emailed this note and can request again.</DialogDescription>
					</DialogHeader>
					<div className="space-y-3">
						<Textarea autoResize minRows={3} placeholder="Why the takedown can't go ahead" value={declineNote} onChange={e => setDeclineNote(e.target.value)} />
						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={() => setDeclineTarget(null)}>
								Cancel
							</Button>
							<Button variant="destructive" size="sm" onClick={handleDecline} disabled={resolveMutation.isPending}>
								{resolveMutation.isPending ? 'Declining...' : 'Decline & notify artist'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TakedownsList;
