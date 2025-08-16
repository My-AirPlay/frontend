/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { Button, DataTable } from '@/components/ui';
import { ReportItem } from '@/lib/types';
import { Download } from 'lucide-react';

interface SendEmailsToArtistTableProps {
	artists: ReportItem[];
	onRowSelectionChange?: (selectedData: ReportItem[]) => void;
	onSendEmails?: (selectedData: ReportItem[]) => void;
}

const SendEmailsToArtistTable: React.FC<SendEmailsToArtistTableProps> = ({ artists, onRowSelectionChange, onSendEmails }) => {
	const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);

	const uniqueArtists = useMemo(() => {
		const uniqueMap = new Map<string, any>();

		artists.forEach(artist => {
			artist.sharedRevenue.forEach(sharedArtist => {
				if (sharedArtist.artistId) {
					const totalRoyalty = artist.fullReports.reduce((sum: number, rep: any) => {
						const amt = parseFloat(rep.totalRoyaltyUSD?.royaltyConverted?.[0]?.amount ?? '0');
						return sum + amt * (sharedArtist.percentage / 100);
					}, 0);

					const catalogueIds = artist.fullReports.map(r => r.catalogueId).join(', ');
					const isrcCodes = artist.fullReports.map(r => r.isrcCode).join(', ');

					if (uniqueMap.has(sharedArtist.artistId)) {
						const existingArtist = uniqueMap.get(sharedArtist.artistId);
						existingArtist.totalRoyalty += totalRoyalty;
						existingArtist.catalogueId += `, ${catalogueIds}`;
						existingArtist.isrcCode += `, ${isrcCodes}`;
					} else {
						uniqueMap.set(sharedArtist.artistId, {
							...sharedArtist,
							totalRoyalty,
							catalogueId: catalogueIds,
							isrcCode: isrcCodes
						});
					}
				}
			});
		});
		return Array.from(uniqueMap.values());
	}, [artists]);

	const getRoyalty = (row: any): string => {
		const currency = 'NGN';
		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2
		}).format(row.totalRoyalty || 0);
	};

	const handleSelectionChange = useCallback(
		(rows: ReportItem[]) => {
			setSelectedRows(rows);
			onRowSelectionChange?.(rows);
		},
		[onRowSelectionChange]
	);

	const handleSendEmails = () => {
		onSendEmails?.(selectedRows);
	};

	const columns = [
		{ id: 'artistName', header: 'Artist Name', accessorKey: 'artistName' },
		{ id: 'activityPeriod', header: 'Activity Period', accessorKey: 'activityPeriod' },
		{ id: 'totalRoyalty', header: 'Gross Revenue(₦)', accessorFn: (row: any) => getRoyalty(row) }
	];

	return (
		<div className="w-full">
			<div className="flex justify-end mb-4">
				<Button onClick={handleSendEmails} disabled={selectedRows.length === 0}>
					<Download size={16} className="mr-2" /> Send Emails ({selectedRows.length})
				</Button>
			</div>
			<h3 className="text-lg font-medium mb-2">Send Report Emails to Artists</h3>
			<DataTable data={uniqueArtists} columns={columns} pagination defaultRowsPerPage={50} showCheckbox onRowSelectionChange={handleSelectionChange} />
		</div>
	);
};

export default SendEmailsToArtistTable;
