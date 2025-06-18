'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { useUpdateComplaintStatus } from '../../api/patchComplaintStatus';
import { useGetAllComplaintById, useGetSingleComplaint, useReportIssue } from '../../api/getSingleComplaint';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';

const TicketDetails: React.FC = () => {
	const { ticket_id } = useParams<{ ticket_id: string }>();
	const searchParams = useSearchParams();
	const complaintId = searchParams.get('complaintId') || '';

	const [newMessage, setNewMessage] = useState('');
	const [messageList, setMessageList] = useState<any[]>([]); // Local state for messages

	const { data: ticket, isPending: isPendingTicket, refetch: refetchTicket } = useGetSingleComplaint({ complaintId: ticket_id });

	const { data: messages, refetch: refetchMessages } = useGetAllComplaintById({ complaintId });

	const { mutate, isPending } = useUpdateComplaintStatus();
	const { mutate: createComplaint, isPending: isCreatingComplaint } = useReportIssue();

	// Sync message list from API
	useEffect(() => {
		if (messages?.messages) {
			setMessageList(messages.messages);
		}
	}, [messages]);

	const sendMessage = () => {
		if (!newMessage.trim()) return;

		// Append locally for instant UI feedback (optional)
		const newMsg = {
			id: Date.now(), // temp ID
			content: newMessage.trim(),
			sender: 'admin',
			time: moment().format('HH:mm A')
		};
		setMessageList(prev => [...prev, newMsg]);

		createComplaint(
			{
				complaintType: ticket?.complain?.complaintType,
				complaintId: ticket?.complain?.complaintId,
				status: 'Pending',
				complain: newMessage.trim()
			},
			{
				onSuccess: () => {
					refetchTicket();
					refetchMessages(); // Refresh from API
				},
				onError: () => {
					toast.error('Failed to send message');
				}
			}
		);

		setNewMessage('');
	};

	return (
		<div className="bg-custom-gradient rounded-lg text-white min-h-[70vh] flex flex-col justify-between">
			<div className="mx-auto px-6 py-4 w-full">
				<div className="flex items-center mb-6">
					<Link href="/admin/support/tickets" className="flex items-center text-white">
						<ArrowLeft size={20} className="mr-2" />
						All Tickets
					</Link>
				</div>

				{isPendingTicket ? (
					<div className="w-full px-6 py-4 flex justify-center items-center min-h-[50vh]">
						<LoadingBox size={62} />
					</div>
				) : (
					<>
						{/* Ticket Info */}
						<div className="rounded-lg p-6 mb-6 mr-10">
							<div className="grid md:grid-cols-2 gap-4 max-w-2xl">
								{[
									{ label: 'User', value: ticket?.artistName },
									{ label: 'Email Address', value: ticket?.email },
									{
										label: 'Subject Title',
										value: ticket?.complain?.complaintType
									},
									{
										label: 'Date Submitted',
										value: moment(ticket?.dateSubmitted).format('DD MMM, YYYY')
									},
									{ label: 'Status', value: ticket?.complain?.status },
									{
										label: 'Ticket ID',
										value: ticket?.complain?.complaintId
									}
								].map(({ label, value }) => (
									<div key={label}>
										<p className="text-[#D8D8D8] text-sm mb-1">{label}</p>
										<p className="font-medium">{value || '-'}</p>
									</div>
								))}
							</div>
						</div>

						{/* Chat UI */}
						<div className="bg-background rounded-lg p-6 mb-4 flex flex-col gap-4">
							<h3 className="text-white mb-2">Ticket Conversation</h3>

							<div className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-muted/10 rounded-md">
								{messageList.map(msg => (
									<div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
										<div className={`max-w-[70%] w-[70%] p-3 rounded-lg ${msg.sender === 'admin' ? 'bg-primary text-white' : 'bg-white text-black'}`}>
											<p className="text-sm">{msg.content}</p>
											{msg.time && <p className="text-xs text-right mt-1 text-white/60">{msg.time}</p>}
										</div>
									</div>
								))}
							</div>

							{/* Attachment (if any) */}
							{ticket?.complain?.attachment && <Image src={ticket.complain.attachment} className="rounded-md mt-4 w-full aspect-video" width={1000} height={600} alt="ticket attachment" />}
						</div>

						{/* Message Input */}
						<div className="flex items-center gap-4 px-4 py-2 bg-background rounded-lg">
							<input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-grow p-2 rounded-md text-black text-sm" placeholder="Type your message..." />
							<Button size="icon" onClick={sendMessage} disabled={isPending || isCreatingComplaint}>
								<Send size={16} />
							</Button>
						</div>

						{/* Status Actions */}
						<div className="flex flex-col gap-4 items-center justify-center mt-6 mb-4">
							{ticket?.complain?.status === 'Resolved' ? (
								<Button
									variant="outline"
									disabled={isPending}
									onClick={() =>
										mutate(
											{ complaintId: ticket.complain.complaintId, status: 'Processing' },
											{
												onSuccess: () => {
													toast.success('Ticket has been Re-opened');
													refetchTicket();
												},
												onError: error => toast.error(error.message || 'Failed to update ticket')
											}
										)
									}
								>
									{isPending ? 'Loading...' : 'Re-open ticket'}
								</Button>
							) : (
								<Button
									variant="destructive"
									disabled={isPending}
									onClick={() =>
										mutate(
											{ complaintId: ticket.complain.complaintId, status: 'Resolved' },
											{
												onSuccess: () => {
													toast.success('Ticket has been closed');
													refetchTicket();
												},
												onError: error => toast.error(error.message || 'Failed to update ticket')
											}
										)
									}
								>
									{isPending ? 'Closing...' : 'Close Ticket'}
								</Button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default TicketDetails;
