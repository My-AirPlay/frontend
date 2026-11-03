'use client';

import React from 'react';
import moment from 'moment';
import { Disc3, Music2, Search, Video } from 'lucide-react';
import { Badge, Button, Input } from '@/components/ui';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ReviewKindFilter, ReviewQueueItem, ReviewQueuePage, ReviewStatusFilter } from '../api/reviewQueue';

export const STATUS_OPTIONS: { value: ReviewStatusFilter; label: string }[] = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'approved', label: 'Approved' },
	{ value: 'rejected', label: 'Rejected' },
	{ value: 'all', label: 'All' }
];

export const KIND_OPTIONS: { value: ReviewKindFilter; label: string }[] = [
	{ value: 'all', label: 'Everything' },
	{ value: 'audio', label: 'Singles' },
	{ value: 'album', label: 'Albums & EPs' },
	{ value: 'video', label: 'Videos' }
];

const STATUS_BADGE: Record<string, { variant: 'outline' | 'success' | 'destructive'; label: string }> = {
	pending: { variant: 'outline', label: 'Pending' },
	approved: { variant: 'success', label: 'Approved' },
	rejected: { variant: 'destructive', label: 'Rejected' }
};

interface ReviewQueueListProps {
	status: ReviewStatusFilter;
	kind: ReviewKindFilter;
	search: string;
	onStatus: (s: ReviewStatusFilter) => void;
	onKind: (k: ReviewKindFilter) => void;
	onSearch: (s: string) => void;
	data?: ReviewQueuePage;
	isLoading: boolean;
	selectedId: string | null;
	onSelect: (id: string) => void;
	onPage: (page: number) => void;
}

const KindIcon = ({ item }: { item: ReviewQueueItem }) => {
	const Icon = item.type === 'album' ? Disc3 : item.fileType === 'video' ? Video : Music2;
	return <Icon size={12} className="shrink-0" />;
};

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
	<button type="button" onClick={onClick} className={cn('rounded-full border px-3 py-1 text-xs transition-colors', active ? 'border-primary bg-primary/15 text-primary' : 'border-border text-muted-foreground hover:bg-secondary')}>
		{children}
	</button>
);

const ReviewQueueList: React.FC<ReviewQueueListProps> = ({ status, kind, search, onStatus, onKind, onSearch, data, isLoading, selectedId, onSelect, onPage }) => {
	const items = data?.items ?? [];
	return (
		<div className="space-y-3 min-w-0">
			<div className="flex flex-wrap gap-1.5">
				{STATUS_OPTIONS.map(o => (
					<Chip key={o.value} active={status === o.value} onClick={() => onStatus(o.value)}>
						{o.label}
						{o.value === status && data ? ` (${data.total})` : ''}
					</Chip>
				))}
			</div>
			<div className="flex flex-wrap gap-1.5">
				{KIND_OPTIONS.map(o => (
					<Chip key={o.value} active={kind === o.value} onClick={() => onKind(o.value)}>
						{o.label}
					</Chip>
				))}
			</div>
			<Input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search title or artist" leftIcon={<Search size={16} />} />

			{isLoading && !data ? (
				<div className="space-y-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-16 w-full" />
					))}
				</div>
			) : items.length === 0 ? (
				<p className="text-sm text-muted-foreground py-8 text-center">{status === 'pending' ? 'Nothing waiting for review.' : 'No releases match.'}</p>
			) : (
				<ul className="space-y-1.5">
					{items.map(item => {
						const badge = STATUS_BADGE[item.reviewStatus] ?? STATUS_BADGE.pending;
						return (
							<li key={item.id}>
								<button type="button" onClick={() => onSelect(item.id)} className={cn('w-full flex items-center gap-3 rounded-lg border p-2 text-left transition-colors', selectedId === item.id ? 'border-primary bg-primary/10' : 'border-border hover:bg-secondary')}>
									{item.coverArtUrl ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={item.coverArtUrl} alt="" loading="lazy" className="size-12 shrink-0 rounded object-cover bg-secondary" />
									) : (
										<div className="size-12 shrink-0 rounded bg-secondary" />
									)}
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium truncate">{item.title || 'Untitled'}</p>
										<p className="text-xs text-muted-foreground truncate">{item.artistName}</p>
										<p className="text-xs text-muted-foreground flex items-center gap-1">
											<KindIcon item={item} />
											{item.type === 'album' ? `${item.trackCount} tracks` : item.fileType === 'video' ? 'Video' : 'Single'} · {moment(item.createdAt).fromNow()}
										</p>
									</div>
									{status === 'all' && (
										<Badge variant={badge.variant} className="shrink-0">
											{badge.label}
										</Badge>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			)}

			{data && data.pages > 1 && (
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<Button variant="outline" size="sm" disabled={data.page <= 1} onClick={() => onPage(data.page - 1)}>
						Previous
					</Button>
					<span>
						Page {data.page} of {data.pages}
					</span>
					<Button variant="outline" size="sm" disabled={data.page >= data.pages} onClick={() => onPage(data.page + 1)}>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default ReviewQueueList;
