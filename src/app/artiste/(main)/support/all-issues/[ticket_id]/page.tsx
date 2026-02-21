'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useGetAllComplaintById, useGetSingleComplaint } from '@/app/admin/(main)/support/api/getSingleComplaint';
import { useReportIssue } from '@/app/artiste/(main)/support/misc/api';

const getStatusBadge = (status: string | undefined) => {
	if (!status) return null;
	const normalized = status.toLowerCase();
	let colorClasses = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
	if (normalized === 'processing' || normalized === 'in progress') {
		colorClasses = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
	} else if (normalized === 'resolved') {
		colorClasses = 'bg-green-500/20 text-green-400 border-green-500/30';
	}
	return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>{status}</span>;
};

const TicketDetails: React.FC = () => {
	const searchParams = useSearchParams();
	const complaintId = searchParams.get('complaintId') || '';

	const [newMessage, setNewMessage] = useState('');
	const [messageList, setMessageList] = useState<any[]>([]);
	const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState<string | null>(null);
	const [previewAttachmentType, setPreviewAttachmentType] = useState<'image' | 'video' | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { data: ticket, isPending: isPendingTicket } = useGetSingleComplaint({ complaintId: complaintId });

	const { data: messages, refetch: refetchMessages } = useGetAllComplaintById({ complaintId });

	const { mutate: createComplaint, isPending: isCreatingComplaint } = useReportIssue();

	const isResolved = ticket?.complain?.status?.toLowerCase() === 'resolved';

	useEffect(() => {
		if (messages?.messages) {
			setMessageList(messages.messages);
		}
	}, [messages]);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	const sendMessage = () => {
		if (!newMessage.trim() || isResolved) return;

		const newMsg = {
			id: Date.now(),
			content: newMessage.trim(),
			sender: 'user',
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
					refetchMessages();
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

	// Open preview modal & detect if image or video
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

	return (
		<div className="bg-custom-gradient rounded-lg text-white min-h-[70vh] flex flex-col justify-between">
			<div className="mx-auto px-6 py-4 w-full">
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
									{
										label: 'Subject Title',
										value: ticket?.complain?.complaintType
									},
									{
										label: 'Date Submitted',
										value: moment(ticket?.dateSubmitted).format('DD MMM, YYYY')
									},
									{
										label: 'Status',
										value: null,
										custom: getStatusBadge(ticket?.complain?.status)
									},
									{
										label: 'Ticket ID',
										value: ticket?.complain?.complaintId
									}
								].map(({ label, value, custom }: any) => (
									<div key={label}>
										<p className="text-[#D8D8D8] text-sm mb-1">{label}</p>
										{custom ? custom : <p className="font-medium">{value || '-'}</p>}
									</div>
								))}
							</div>
						</div>

						{/* Chat UI */}
						<div className="bg-background rounded-lg p-6 mb-4 flex flex-col gap-4">
							<h3 className="text-white mb-2">Ticket Conversation</h3>
							<div className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-muted/10 rounded-md">
								{messageList.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-[380px] text-center text-white/40 gap-3">
										<MessageCircle size={48} strokeWidth={1.5} />
										<p className="text-sm">No messages yet. Start the conversation by sending a message below.</p>
									</div>
								) : (
									messageList.map(msg => {
										const isAdmin = msg.sender === 'admin';
										return (
											<div key={msg.id} className={`flex ${!isAdmin ? 'justify-end' : 'justify-start'}`}>
												<div className="max-w-[70%] w-[70%] flex flex-col gap-1">
													<p className={`text-xs font-medium ${!isAdmin ? 'text-right text-primary' : 'text-left text-white/50'}`}>{isAdmin ? 'Support' : 'You'}</p>
													<div className={`p-3 rounded-lg ${isAdmin ? 'bg-muted/30 text-white rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}>
														<p className="text-sm">{msg.content}</p>
														{msg.time && <p className={`text-xs text-right mt-1 ${isAdmin ? 'text-white/40' : 'text-white/60'}`}>{msg.time}</p>}
														{msg.isAttachment && (
															<div className="w-full justify-end flex p-8 bg-background cursor-pointer" onClick={() => openAttachmentPreview(msg.isAttachment)} title="Click to preview attachment">
																<Image src={msg.isAttachment} className="rounded-md mt-4 justify-end aspect-video object-contain" width={200} height={200} alt="ticket attachment" />
															</div>
														)}
													</div>
												</div>
											</div>
										);
									})
								)}
								<div ref={messagesEndRef} />
							</div>
						</div>

						{/* Resolved Notice */}
						{isResolved && <div className="text-center text-green-400 text-sm font-medium py-2 mb-2">This ticket has been resolved</div>}

						{/* Message Input */}
						<div className={`flex items-center gap-4 px-4 py-2 bg-background rounded-lg ${isResolved ? 'opacity-50 pointer-events-none' : ''}`}>
							<Input value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} className="flex-grow p-2 rounded-md text-sm" placeholder={isResolved ? 'This ticket has been resolved' : 'Type your message...'} disabled={isResolved} />
							<Button size="icon" onClick={sendMessage} disabled={isCreatingComplaint || isResolved}>
								<Send size={16} />
							</Button>
						</div>
					</>
				)}
			</div>

			{/* Attachment Preview Modal */}
			{previewAttachmentUrl && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeAttachmentPreview}>
					{/* The parent div for the Image component now has relative positioning */}
					<div
						className="relative max-w-4xl max-h-[90vh] w-full mx-4 p-2"
						onClick={e => e.stopPropagation()} // prevent modal close on inner click
					>
						<button className="absolute top-2 right-2 text-white hover:text-gray-300" onClick={closeAttachmentPreview} aria-label="Close preview">
							<X size={24} />
						</button>
						{previewAttachmentType === 'image' && <img src={previewAttachmentUrl} alt="Attachment preview" className="rounded-lg max-w-full max-h-[90vh] object-contain" />}

						{previewAttachmentType === 'video' && <video src={previewAttachmentUrl} controls autoPlay className="rounded-lg max-w-full max-h-[80vh] w-full h-full" />}
					</div>
				</div>
			)}
		</div>
	);
};

export default TicketDetails;
