'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TicketsList from './misc/components/TicketsList';
// import ChatBotList from './misc/components/ChatBotList';
import { Notepad2 } from 'iconsax-react';
import { useGetComplaints } from '../catalogue/api/getComplaints';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from 'moment';
import Image from 'next/image';
import { LoadingBox } from '@/components/ui/LoadingBox';

const Help: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get('page') || '1';
	const limit = searchParams.get('limit') || '30';

	const { data: tickets, isPending } = useGetComplaints({ page, limit });

	const totalTickets = tickets?.total || 0;
	// const chatBotMessages = 234;

	const recentTicket = tickets?.data?.[0];

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-semibold">Help and Support</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-[1350px] items-start">
				<article className="bg-[#1B2128] rounded-lg p-6 md:max-lg:col-span-2">
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-[#2F363E] rounded-full p-2">
							<Notepad2 variant="Bold" className="fill-white" size={30} />
						</div>
						<div className="">
							<p className="text-sm text-white/60">Total Tickets</p>
							<h3 className="text-4xl font-bold">{totalTickets.toLocaleString()}</h3>
						</div>
					</div>

					<div className="flex justify-between items-center py-3 md:py-5">
						<h4 className="text-sm font-medium">Ticket List</h4>
						<Link href="./support/tickets" className="text-primary text-sm hover:underline">
							View All
						</Link>
					</div>

					{isPending ? (
						<div className="w-full px-6 py-4 flex justify-center items-center">
							<LoadingBox size={32} />
						</div>
					) : (
						<TicketsList limit={5} tickets={tickets?.data || []} />
					)}
				</article>
				{/* 
				<article className="bg-[#1B2128] rounded-lg p-6">
					<div className="flex items-center gap-4 mb-4">
						<div className="bg-[#2F363E] rounded-full p-2">
							<Headphone variant="Bold" className="fill-white" size={30} />
						</div>
						<div className="">
							<p className="text-sm text-white/60">Chat-Bot Messages</p>
							<h3 className="text-4xl font-bold">{chatBotMessages.toLocaleString()}</h3>
						</div>
					</div>

					<div className="flex justify-between items-center  py-3 md:py-5">
						<h4 className="text-sm font-medium">Chat-bot Lists</h4>
						<Link href="./support/chat" className="text-primary text-sm hover:underline">
							View All
						</Link>
					</div>

					<ChatBotList limit={7} />
				</article> */}

				{/* Most Recent Ticket */}
				<div className="bg-[#1B2128] rounded-lg p-6 md:max-lg:col-span-2">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-medium">Most Recent Ticket</h2>
						{recentTicket?._id && (
							<Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => router.push(`/admin/support/tickets/${recentTicket?._id}`)}>
								See Details
							</Button>
						)}
					</div>

					{isPending ? (
						<div className="w-full px-6 py-4 flex justify-center items-center">
							<LoadingBox size={32} />
						</div>
					) : recentTicket?._id ? (
						<div className="space-y-4">
							<div>
								<p className="text-xs md:text-sm text-white/60">User</p>
								<p className="max-md:text-sm font-medium">{recentTicket?.artistName}</p>
							</div>

							<div>
								<p className="text-xs md:text-sm text-white/60">Submitted</p>
								<p className="max-md:text-sm font-medium">{moment(recentTicket?.createdAt).format('DD  MMM, YYYY')}</p>
							</div>

							<div>
								<p className="text-xs md:text-sm text-white/60">Subject</p>
								<p className="max-md:text-sm font-medium">{recentTicket?.complaintType}</p>
							</div>

							<div>
								<p className="text-xs md:text-sm text-white/60">Ticket Issue</p>
								<p className="max-md:text-sm font-medium">{recentTicket?.complain}</p>
							</div>

							{recentTicket?.attachment && <Image src={recentTicket?.attachment} className="w-full aspect-video" width={1000} height={1000} alt="ticket img" />}
							{/* <div className="w-32 h-32 border-2 border-dashed border-muted rounded-md flex items-center justify-center">
								<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div> */}
						</div>
					) : (
						<p className=" text-center">You have no recent ticket!</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Help;
