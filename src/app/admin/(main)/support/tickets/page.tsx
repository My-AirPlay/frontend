'use client';

import React from 'react';
import { Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
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

	// Function to update page and limit in URL
	const updateQueryParams = (newParams: { page?: number; limit?: number }) => {
		const params = new URLSearchParams(searchParams.toString());
		if (newParams.page) {
			params.set('page', newParams.page.toString());
		}
		if (newParams.limit) {
			params.set('limit', newParams.limit.toString());
		}
		// Preserve existing params (e.g., artistId)
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// Handlers for pagination controls
	const handleNextPage = () => {
		if (page < tickets?.totalPages || 1) updateQueryParams({ page: page + 1 });
	};

	const handlePrevPage = () => {
		if (page > 1) updateQueryParams({ page: page - 1 });
	};

	const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newLimit = Number(e.target.value);
		if (newLimit > 0) {
			updateQueryParams({ limit: newLimit, page: 1 }); // Reset to page 1 when limit changes
		}
	};

	return (
		<div className="space-y-6">
			<PreviousPageButton />
			<header className="flex justify-between items-center mb-12">
				<h2 className="text-xl font-semibold">Tickets</h2>
				<div className="flex items-center">
					<div className="mr-4">Total: {totalTickets?.toLocaleString()} Tickets</div>
					<div className="flex gap-2">
						<Button variant="outline" size="md" className="border-border bg-secondary">
							<Filter size={16} className="mr-2" />
							Filter
						</Button>
						<Button size="md">
							<Download size={16} className="mr-2" />
							Download
						</Button>
					</div>
				</div>
			</header>

			{isPending && (
				<div className="w-full px-6 py-4 flex justify-center items-center">
					<LoadingBox size={62} />
				</div>
			)}
			<div className="grid md:[grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-x-6 gap-y-5">
				{tickets?.data?.map((ticket, index) => (
					<article key={index} className="flex flex-col gap-2 bg-custom-gradient px-5 py-4 rounded-lg overflow-hidden">
						<LinkButton size="thin" href={`/admin/support/tickets/${ticket._id}`} className="rounded-full self-end">
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
									<p className="text-sm">{moment(ticket?.createdAt).format('DD  MMM, YYYY')}</p>
								</div>
								{/* <div>
									<p className="text-xs text-white/50">Priority</p>
									<p className="text-sm">{ticket?.priority}</p>
								</div> */}
								<div>
									<p className="text-xs text-white/50">Ticket ID</p>
									<p className="text-sm">{ticket?._id.substring(ticket?._id?.length - 8)}</p>
								</div>
							</div>
						</div>
					</article>
				))}
			</div>
			{/* Pagination */}
			<div className="flex justify-between items-center mt-4">
				<div className="flex gap-2 items-center">
					<Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handlePrevPage()}>
						<ChevronLeft size={16} />
					</Button>
					<span className="text-xs">
						{page}/ {tickets?.totalPages || 1}
					</span>
					<Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleNextPage()}>
						<ChevronRight size={16} />
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-white/50">Rows per page:</span>
					<select className="bg-secondary border border-border rounded p-1 text-sm" onChange={handleLimitChange}>
						<option value={'3'} defaultChecked={limit === 3}>
							3
						</option>
						<option value={'5'} defaultChecked={limit === 5}>
							5
						</option>
						<option value={'10'} defaultChecked={limit === 10}>
							10
						</option>
						<option value={'50'} defaultChecked={limit === 50}>
							50
						</option>
						<option value={'100'} defaultChecked={limit === 100}>
							100
						</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default AllTicketsPage;
