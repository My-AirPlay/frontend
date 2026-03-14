'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui';
import { useGetAuditLog, useGetAdminUsers } from '../../api/queries';

export default function ActivityTab() {
	const [page, setPage] = useState(1);
	const [actionFilter, setActionFilter] = useState('');
	const [resourceFilter, setResourceFilter] = useState('');
	const [adminFilter, setAdminFilter] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const { data: adminUsers = [] } = useGetAdminUsers();

	const { data, isLoading } = useGetAuditLog({
		page,
		limit: 20,
		action: actionFilter || undefined,
		resource: resourceFilter || undefined,
		adminUserId: adminFilter || undefined,
		startDate: startDate || undefined,
		endDate: endDate || undefined
	});

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	if (isLoading) return <div>Loading activity log...</div>;

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Activity Log</h2>

			<div className="flex flex-wrap gap-3 mb-4">
				<select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm max-w-[200px]">
					<option value="">All actions</option>
					{['create_sub_admin', 'update_sub_admin', 'reset_sub_admin_password', 'create_role', 'update_role', 'delete_role', 'create_artist', 'delete_artist', 'update_artist', 'update_artist_payment', 'upload_contract', 'update_contract', 'update_track', 'delete_track', 'respond_complaint', 'update_complaint_status', 'claim_complaint', 'unclaim_complaint', 'reassign_complaint', 'publish_csv', 'publish_records', 'delete_reports', 'update_withdrawal', 'cancel_withdrawal', 'credit_artist', 'generate_password', 'revoke_password', 'pause_artist', 'unpause_artist'].map(action => (
						<option key={action} value={action}>
							{action.replace(/_/g, ' ')}
						</option>
					))}
				</select>
				<select value={resourceFilter} onChange={e => setResourceFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm max-w-[200px]">
					<option value="">All resources</option>
					{['admin_user', 'role', 'artist', 'contract', 'track', 'complaint', 'report', 'withdrawal', 'password'].map(resource => (
						<option key={resource} value={resource}>
							{resource.replace(/_/g, ' ')}
						</option>
					))}
				</select>
				<select value={adminFilter} onChange={e => setAdminFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm max-w-[200px]">
					<option value="">All admins</option>
					{adminUsers.map((user: any) => (
						<option key={user._id} value={user._id}>
							{user.firstName} {user.lastName}
						</option>
					))}
				</select>
				<Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="max-w-[170px]" placeholder="Start date" />
				<Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="max-w-[170px]" placeholder="End date" />
			</div>

			<div className="border border-border rounded-lg overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-secondary">
						<tr>
							<th className="text-left p-3 font-medium">Date</th>
							<th className="text-left p-3 font-medium">Admin</th>
							<th className="text-left p-3 font-medium">Action</th>
							<th className="text-left p-3 font-medium">Description</th>
						</tr>
					</thead>
					<tbody>
						{data?.data?.map((log: any) => (
							<tr key={log._id} className="border-t border-border">
								<td className="p-3 text-muted-foreground whitespace-nowrap">{formatDate(log.createdAt)}</td>
								<td className="p-3">
									{log.adminUserId?.firstName} {log.adminUserId?.lastName}
								</td>
								<td className="p-3">
									<span className="bg-secondary px-2 py-0.5 rounded text-xs">{log.action}</span>
								</td>
								<td className="p-3 text-muted-foreground">{log.description}</td>
							</tr>
						))}
						{(!data?.data || data.data.length === 0) && (
							<tr>
								<td colSpan={4} className="p-6 text-center text-muted-foreground">
									No activity logs found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{data && data.totalPages > 1 && (
				<div className="flex justify-between items-center mt-4">
					<p className="text-sm text-muted-foreground">
						Page {data.page} of {data.totalPages} ({data.total} total)
					</p>
					<div className="flex gap-2">
						<Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
							Previous
						</Button>
						<Button size="sm" variant="outline" disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
