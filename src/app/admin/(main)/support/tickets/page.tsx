'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notepad2 } from 'iconsax-react';
import { LinkButton, PreviousPageButton } from '@/components/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetComplaints } from '../../catalogue/api/getComplaints';
import { LoadingBox } from '@/components/ui/LoadingBox';
import moment from 'moment';

const AllTicketsPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const page = Number(searchParams.get('page') || '1');
	const limit = Number(searchParams.get('limit') || '30');

	const { data: tickets, isPending } = useGetComplaints({ page: page.toString(), limit: limit.toString() });
	const totalTickets = tickets?.total || 0;

	const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all');

	const updateQueryParams = (newParams: { page?: number; limit?: number }) => {
		const params = new URLSearchParams(searchParams.toString());
		if (newParams.page) params.set('page', newParams.page.toString());
		if (newParams.limit) params.set('limit', newParams.limit.toString());
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleNextPage = () => {
		if (page < (tickets?.totalPages || 1)) updateQueryParams({ page: page + 1 });
	};

	const handlePrevPage = () => {
		if (page > 1) updateQueryParams({ page: page - 1 });
	};

	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLimit = Number(e.target.value);
		if (newLimit > 0) updateQueryParams({ limit: newLimit, page: 1 });
	};

	// Filter tickets by selected status
	const filteredTickets =
		tickets?.data?.filter((ticket: any) => {
			if (statusFilter === 'resolved') return ticket.status === 'Resolved';
			if (statusFilter === 'open') return ticket.status !== 'Resolved';
			return true;
		}) || [];

	return (
		<div className="space-y-6">
			<PreviousPageButton />
			<header className="flex justify-between items-center mb-12">
				<h2 className="text-xl font-semibold">Tickets</h2>
				<div className="flex items-center">
					<div className="mr-4">Total: {totalTickets?.toLocaleString()} Tickets</div>
					<div className="flex gap-2">
						<select className="bg-secondary border border-border text-sm rounded px-3 py-1" value={statusFilter} onChange={e => setStatusFilter(e.target.value as 'all' | 'open' | 'resolved')}>
							<option value="all">All</option>
							<option value="open">Open</option>
							<option value="resolved">Resolved</option>
						</select>
					</div>
				</div>
			</header>

			{isPending && (
				<div className="w-full px-6 py-4 flex justify-center items-center">
					<LoadingBox size={62} />
				</div>
			)}

			<div className="grid md:[grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-x-6 gap-y-5">
				{filteredTickets.map((ticket: any, index: number) => (
					<article key={index} className="flex flex-col gap-2 bg-custom-gradient px-5 py-4 rounded-lg overflow-hidden">
						<LinkButton size="thin" href={`/admin/support/tickets/${ticket._id}?complaintId=${ticket.complaintId}`} className="rounded-full self-end">
							View Ticket
						</LinkButton>
						<div className="p-4 space-y-4 divide-y">
							<div className="flex items-start gap-3">
								<div className="bg-[#2F363E] rounded-md p-1">
									<Notepad2 variant="Bold" className="fill-white" size={22} />
								</div>
								<div>
									<h3 className="font-medium">{ticket?.complaintType}</h3>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-y-4 pt-3">
								<div>
									<p className="text-xs text-white/50">User</p>
									<p className="text-sm">{ticket?.artistName}</p>
								</div>
								<div>
									<p className="text-xs text-white/50">Date Submitted</p>
									<p className="text-sm">{moment(ticket?.createdAt).format('DD MMM, YYYY')}</p>
								</div>
								<div>
									<p className="text-xs text-white/50">Status</p>
									<p className="text-sm">{ticket?.status}</p>
								</div>
								<div>
									<p className="text-xs text-white/50">Ticket ID</p>
									<p className="text-sm">{ticket?.complaintId}</p>
								</div>

								{/* --- ADD THIS SECTION --- */}
								{ticket.unreadCount > 0 && (
									<div className="col-span-2 mt-2">
										<p className="text-xs text-white/50">Unread</p>
										<p className="text-sm font-semibold text-primary">
											{ticket.unreadCount} un-answered message{ticket.unreadCount > 1 ? 's' : ''}
										</p>
									</div>
								)}
								{/* --- END OF SECTION --- */}
							</div>
						</div>
					</article>
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-between items-center mt-4">
				<div className="flex gap-2 items-center">
					<Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevPage} disabled={page <= 1}>
						<ChevronLeft size={16} />
					</Button>
					<span className="text-xs">
						{page}/ {tickets?.totalPages || 1}
					</span>
					<Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextPage} disabled={page >= (tickets?.totalPages || 1)}>
						<ChevronRight size={16} />
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-white/50">Rows per page:</span>
					<select className="bg-secondary border border-border rounded p-1 text-sm" value={limit} onChange={handleLimitChange}>
						<option value="3">3</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default AllTicketsPage;
