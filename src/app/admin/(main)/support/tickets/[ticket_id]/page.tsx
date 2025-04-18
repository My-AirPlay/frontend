'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button, LinkButton } from '@/components/ui';
import Link from 'next/link';
import { useUpdateComplaintStatus } from '../../api/patchComplaintStatus';
import { useGetSingleComplaint } from '../../api/getSingleComplaint';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';

const TicketDetails: React.FC = () => {
	const { ticket_id } = useParams<{ ticket_id: string }>();

	const { data: ticket, isPending: isPendingTicket, refetch: refetchTicket } = useGetSingleComplaint({ complaintId: ticket_id });
	const { mutate, isPending } = useUpdateComplaintStatus();

	return (
		<div className="bg-custom-gradient rounded-lg text-white min-h-[70vh]">
			<div className=" mx-auto px-6 py-4">
				<div className="flex items-center mb-6">
					<Link href="/admin/support/tickets" className="flex items-center text-white">
						<ArrowLeft size={20} className="mr-2" />
						All Ticket
					</Link>
				</div>

				{isPendingTicket ? (
					<div className="w-full px-6 py-4 flex justify-center items-center  min-h-[50vh]">
						<LoadingBox size={62} />
					</div>
				) : (
					<>
						<div className=" rounded-lg p-6 mb-6">
							<div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-2xl gap-x-6 gap-y-4 ">
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">User</p>
									<p className="font-medium">{ticket?.artistName || '-'}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Email Address</p>
									<p className="font-medium">{ticket?.email || '-'}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Subject Title</p>
									<p className="font-medium">{ticket?.complain?.complaintType || '-'}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Date Submitted</p>

									<p className="font-medium">{moment(ticket?.dateSubmitted).format('DD  MMM, YYYY')}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Status</p>
									<p className="font-medium">{ticket?.complain?.status || '-'}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Ticket ID</p>
									<p className="font-medium">{ticket?.complain?._id?.substring(ticket?.complain?._id?.length - 8) || '-'}</p>
								</div>
							</div>
						</div>

						<div className="bg-background rounded-lg p-6 mb-8">
							<h3 className="text-white mb-4">Ticket Issue</h3>
							<p className="text-gray-300 mb-6 text-sm">{ticket?.complain?.complain || '-'}</p>

							{isPendingTicket ? (
								<div className="border border-dashed border-primary p-6 flex justify-center items-center w-24 h-24">
									<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D8D8D8]"></div>
								</div>
							) : (
								ticket?.complain?.attachment && <Image src={ticket?.complain?.attachment} className="w-full aspect-video" width={1000} height={1000} alt="ticket img" />
							)}
						</div>

						<div className="flex flex-col gap-7 items-center justify-center mb-6">
							{ticket?.complain?.status === 'Resolved' ? (
								<Button
									variant="outline"
									size="md"
									disabled={isPending}
									onClick={() =>
										mutate(
											{
												complaintId: ticket_id,
												status: 'Deferred'
											},
											{
												onSuccess: () => {
													toast.success('Ticket has been deferred');
													refetchTicket();
												},
												onError: error => {
													toast.error(error.message || 'Failed to update ticket');
												}
											}
										)
									}
								>
									{isPending ? 'Loading...' : 'This ticket is deferred.'}
								</Button>
							) : ticket?.complain?.status === 'Deferred' ? (
								<Button
									size="md"
									disabled={isPending}
									onClick={() =>
										mutate(
											{
												complaintId: ticket_id,
												status: 'Resolved'
											},
											{
												onSuccess: () => {
													toast.success('Ticket has been resolved');
													refetchTicket();
												},
												onError: error => {
													toast.error(error.message || 'Failed to update ticket');
												}
											}
										)
									}
								>
									{isPending ? 'Loading...' : 'This ticket has been solved.'}
								</Button>
							) : ticket?.complain?.status === 'Pending' ? (
								<>
									<Button
										size="md"
										disabled={isPending}
										onClick={() =>
											mutate(
												{
													complaintId: ticket_id,
													status: 'Resolved'
												},
												{
													onSuccess: () => {
														toast.success('Ticket has been resolved');
														refetchTicket();
													},
													onError: error => {
														toast.error(error.message || 'Failed to update ticket');
													}
												}
											)
										}
									>
										{isPending ? 'Loading...' : 'This ticket has been solved.'}
									</Button>

									<Button
										variant="outline"
										size="md"
										disabled={isPending}
										onClick={() =>
											mutate(
												{
													complaintId: ticket_id,
													status: 'Deferred'
												},
												{
													onSuccess: () => {
														toast.success('Ticket has been deferred');
														refetchTicket();
													},
													onError: error => {
														toast.error(error.message || 'Failed to update ticket');
													}
												}
											)
										}
									>
										{isPending ? 'Loading...' : 'This ticket is deferred.'}
									</Button>
								</>
							) : (
								''
							)}

							<LinkButton href={`mailto:${ticket?.email}`} size="lg" className="rounded-full">
								Add Response
								<ArrowRight size={16} />
							</LinkButton>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default TicketDetails;
