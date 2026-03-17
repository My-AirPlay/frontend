/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { DataTable } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ReportItem } from '@/lib/types';
import { toast } from 'sonner';
import { linkTrackToMedia, unlinkTrackFromMedia, ignoreTrackCatalogueMatch } from '../api/catalogueMatch';
import LinkMediaModal from './LinkMediaModal';

interface MatchedArtistsTableProps {
	artists: ReportItem[];
	onArtistRevenueClick: (row: ReportItem) => void;
	onDataRefresh?: () => void;
}

const MatchedArtistsTable: React.FC<MatchedArtistsTableProps> = ({ artists, onArtistRevenueClick, onDataRefresh }) => {
	const [linkModalData, setLinkModalData] = useState<{ trackId: string; artistId: string; trackTitle: string } | null>(null);
	const [actionLoading, setActionLoading] = useState<string | null>(null);

	const getRoyalty = (row: any): string => {
		const currency = row.original.currency || 'USD';
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2
		}).format(row.original.total);
	};

	const handleLink = (row: ReportItem) => {
		const artistId = row.artistId || row.sharedRevenue?.[0]?.artistId;
		if (!artistId) {
			toast.error('No artist ID found for this track');
			return;
		}
		setLinkModalData({ trackId: row._id, artistId, trackTitle: row.firstTitle });
	};

	const handleLinkConfirm = async (mediaId: string) => {
		if (!linkModalData) return;
		setActionLoading(linkModalData.trackId);
		try {
			await linkTrackToMedia(linkModalData.trackId, mediaId);
			toast.success('Track linked to catalogue');
			onDataRefresh?.();
		} catch {
			toast.error('Failed to link track');
		} finally {
			setActionLoading(null);
			setLinkModalData(null);
		}
	};

	const handleUnlink = async (row: ReportItem) => {
		setActionLoading(row._id);
		try {
			await unlinkTrackFromMedia(row._id);
			toast.success('Track unlinked from catalogue');
			onDataRefresh?.();
		} catch {
			toast.error('Failed to unlink track');
		} finally {
			setActionLoading(null);
		}
	};

	const handleIgnore = async (row: ReportItem) => {
		setActionLoading(row._id);
		try {
			await ignoreTrackCatalogueMatch(row._id);
			toast.success('Catalogue match ignored');
			onDataRefresh?.();
		} catch {
			toast.error('Failed to ignore match');
		} finally {
			setActionLoading(null);
		}
	};

	const columns = [
		{
			id: 'artistName',
			header: 'Artist Name',
			accessorKey: 'artistName'
		},
		{
			id: 'trackTitle',
			header: 'Track Title',
			accessorFn: (row: any) => row.fullReports?.[0]?.trackTitle ?? '—',
			cell: (info: any) => <p className="text-admin-primary hover:underline">{info.row.original?.firstTitle} </p>
		},
		{
			id: 'activityperiod',
			header: 'Activity Period',
			accessorKey: 'activityperiod',
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.activityPeriod} </p>
		},
		{
			id: 'totalroyalty',
			header: 'Gross Revenue(₦)',
			accessorKey: 'totalroyalty',
			cell: (info: any) => <p className="text-admin-primary "> {getRoyalty(info.row)} </p>
		},
		{
			id: 'catalogueId',
			header: 'Catalogue ID',
			accessorKey: 'catalogueId',
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.catalogueId} </p>
		},
		{
			id: 'isrcCode',
			header: 'ISRC Code ',
			accessorKey: 'isrcCode',
			cell: (info: any) => <p className="text-admin-primary "> {info.row.original?.isrcCode} </p>
		},
		{
			id: 'catalogueMatch',
			header: 'Catalogue Match',
			accessorKey: 'catalogueMatchStatus',
			cell: (info: any) => {
				const status = info.row.original?.catalogueMatchStatus;
				const title = info.row.original?.matchedMediaTitle;
				if (status === 'auto-matched' || status === 'manually-matched') {
					return <span className="text-green-400 text-sm">{title || 'Matched'}</span>;
				}
				if (status === 'ignored') {
					return <span className="text-gray-400 text-sm">Ignored</span>;
				}
				return <span className="text-yellow-400 text-sm">Unmatched</span>;
			}
		},
		{
			id: 'confidence',
			header: 'Confidence',
			accessorKey: 'catalogueMatchConfidence',
			cell: (info: any) => {
				const confidence = info.row.original?.catalogueMatchConfidence || 0;
				if (confidence === 0) return <span className="text-gray-400 text-sm">-</span>;
				const colorClass = confidence >= 70 ? 'text-green-400' : 'text-red-400';
				return <span className={`${colorClass} text-sm font-medium`}>{confidence}%</span>;
			}
		},
		{
			id: 'catalogueActions',
			header: 'Catalogue',
			cell: (info: any) => {
				const row = info.row.original as ReportItem;
				const status = row.catalogueMatchStatus;
				const isLoading = actionLoading === row._id;

				return (
					<div className="flex gap-1" onClick={e => e.stopPropagation()}>
						{(!status || status === 'unmatched' || status === 'auto-matched') && (
							<Button variant="ghost" size="sm" onClick={() => handleLink(row)} disabled={isLoading} className="text-xs h-7 px-2">
								Link
							</Button>
						)}
						{(status === 'auto-matched' || status === 'manually-matched') && (
							<Button variant="ghost" size="sm" onClick={() => handleUnlink(row)} disabled={isLoading} className="text-xs h-7 px-2">
								Unlink
							</Button>
						)}
						{(!status || status === 'unmatched') && (
							<Button variant="ghost" size="sm" onClick={() => handleIgnore(row)} disabled={isLoading} className="text-xs h-7 px-2">
								Ignore
							</Button>
						)}
					</div>
				);
			}
		}
	];

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Matched Artists</h3>
			<DataTable data={artists} columns={columns} pagination={false} defaultRowsPerPage={50} onRowClick={row => onArtistRevenueClick(row)} />

			{linkModalData && <LinkMediaModal artistId={linkModalData.artistId} trackTitle={linkModalData.trackTitle} onLink={handleLinkConfirm} onClose={() => setLinkModalData(null)} />}
		</div>
	);
};

export default MatchedArtistsTable;
