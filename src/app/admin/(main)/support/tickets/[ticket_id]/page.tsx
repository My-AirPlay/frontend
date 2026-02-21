'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageSquare, Send, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import Link from 'next/link';
import { useUpdateComplaintStatus } from '../../api/patchComplaintStatus';
import { useGetAllComplaintById, useGetSingleComplaint, useReportIssue } from '../../api/getSingleComplaint';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';

const statusBadgeClasses: Record<string, string> = {
	Pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
	Processing: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
	Resolved: 'bg-green-500/20 text-green-400 border border-green-500/30'
};

const TicketDetails: React.FC = () => {
	const searchParams = useSearchParams();
	const complaintId = searchParams.get('complaintId') || '';

	const [newMessage, setNewMessage] = useState('');
	const [messageList, setMessageList] = useState<any[]>([]); // Local state for messages

	const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState<string | null>(null);
	const [previewAttachmentType, setPreviewAttachmentType] = useState<'image' | 'video' | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { data: messages, refetch: refetchMessages } = useGetAllComplaintById({ complaintId });
	const { data: ticket, isPending: isPendingTicket, refetch: refetchTicket } = useGetSingleComplaint({ complaintId: complaintId });

	const { mutate, isPending } = useUpdateComplaintStatus();
	const { mutate: createComplaint, isPending: isCreatingComplaint } = useReportIssue();

	const isResolved = ticket?.complain?.status === 'Resolved';
	const artistName = ticket?.artistName || 'Artist';

	// Sync message list from API
	useEffect(() => {
		if (messages?.messages) {
			setMessageList(messages.messages);
		}
	}, [messages]);

	// Auto-scroll to bottom on new messages
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	const sendMessage = () => {
		if (!newMessage.trim() || isResolved) return;

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const openAttachmentPreview = (url: string) => {
		// Simple extension check
		const ext = url.split('.').pop()?.toLowerCase() || '';
		if (['mp4', 'webm', 'ogg'].includes(ext)) {
			setPreviewAttachmentType('video');
		} else {
			setPreviewAttachmentType('image');
		}
		setPreviewAttachmentUrl(url);
	};

	// Close modal
	const closeAttachmentPreview = () => {
		setPreviewAttachmentUrl(null);
		setPreviewAttachmentType(null);
	};

	const renderStatusBadge = (status: string) => {
		const classes = statusBadgeClasses[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
		return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>{status}</span>;
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
									<p className="font-medium">{moment(ticket?.dateSubmitted).format('DD MMM, YYYY')}</p>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Status</p>
									<div className="mt-1">{ticket?.complain?.status ? renderStatusBadge(ticket.complain.status) : <p className="font-medium">-</p>}</div>
								</div>
								<div>
									<p className="text-[#D8D8D8] text-sm mb-1">Ticket ID</p>
									<p className="font-medium">{ticket?.complain?.complaintId || '-'}</p>
								</div>
							</div>
						</div>

						{/* Chat UI */}
						<div className="bg-background rounded-lg p-6 mb-4 flex flex-col gap-4">
							<h3 className="text-white mb-2">Ticket Conversation</h3>

							<div className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-muted/10 rounded-md">
								{messageList.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-[380px] text-muted-foreground">
										<MessageSquare size={48} className="mb-4 opacity-40" />
										<p className="text-sm opacity-60">No messages yet. Start the conversation below.</p>
									</div>
								) : (
									messageList.map(msg => {
										const isAdmin = msg.sender === 'admin';
										return (
											<div key={msg.id} className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
												<p className={`text-xs mb-1 px-1 ${isAdmin ? 'text-white/50' : 'text-white/50'}`}>{isAdmin ? 'You' : artistName}</p>
												<div className={`max-w-[70%] p-3 rounded-lg ${isAdmin ? 'bg-primary text-white rounded-br-none' : 'bg-muted text-white rounded-bl-none'}`}>
													<p className="text-sm">{msg.content}</p>
													{msg.time && <p className={`text-xs text-right mt-1 ${isAdmin ? 'text-white/60' : 'text-white/40'}`}>{msg.time}</p>}
													{msg.isAttachment && (
														<div className="w-full justify-end flex p-8 bg-background cursor-pointer" onClick={() => openAttachmentPreview(msg.isAttachment)} title="Click to preview attachment">
															<Image src={msg.isAttachment} className="rounded-md mt-4 justify-end aspect-video object-contain" width={200} height={200} alt="ticket attachment" />
														</div>
													)}
												</div>
											</div>
										);
									})
								)}
								<div ref={messagesEndRef} />
							</div>
						</div>

						{/* Message Input */}
						<div className="flex items-center gap-4 px-4 py-2 bg-background rounded-lg">
							{isResolved ? <p className="flex-grow text-sm text-muted-foreground py-2 px-2">This ticket is resolved. Re-open to reply.</p> : <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} className="flex-grow text-sm" placeholder="Type your message..." disabled={isResolved} />}
							<Button size="icon" onClick={sendMessage} disabled={isPending || isCreatingComplaint || isResolved}>
								<Send size={16} />
							</Button>
						</div>

						{/* Status Actions */}
						<div className="flex flex-col gap-4 items-center justify-center mt-6 mb-4">
							{isResolved ? (
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
												onError: (error: any) => toast.error(error.message || 'Failed to update ticket')
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
												onError: (error: any) => toast.error(error.message || 'Failed to update ticket')
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
			{/* Attachment Preview Modal */}
			{previewAttachmentUrl && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeAttachmentPreview}>
					<div
						className="relative max-w-4xl max-h-[90vh] w-full mx-4 p-2"
						onClick={e => e.stopPropagation()} // prevent modal close on inner click
					>
						<button className="absolute top-2 right-2 text-white hover:text-gray-300" onClick={closeAttachmentPreview} aria-label="Close preview">
							<X size={24} />
						</button>

						{previewAttachmentType === 'image' && <img src={previewAttachmentUrl} alt="Attachment preview" className="rounded-lg max-w-full max-h-[90vh] object-contain" />}

						{previewAttachmentType === 'video' && <video src={previewAttachmentUrl} controls autoPlay className="rounded-lg max-w-full max-h-[80vh]" />}
					</div>
				</div>
			)}
		</div>
	);
};
export default TicketDetails;
