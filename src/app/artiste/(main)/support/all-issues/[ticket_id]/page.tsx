'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useGetAllComplaintById, useGetSingleComplaint } from '@/app/admin/(main)/support/api/getSingleComplaint';
import { useReportIssue } from '@/app/artiste/(main)/support/misc/api';

const TicketDetails: React.FC = () => {
	const { ticket_id } = useParams<{ ticket_id: string }>();
	const searchParams = useSearchParams();
	const complaintId = searchParams.get('complaintId') || '';

	const [newMessage, setNewMessage] = useState('');
	const [messageList, setMessageList] = useState<any[]>([]);
	const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState<string | null>(null);
	const [previewAttachmentType, setPreviewAttachmentType] = useState<'image' | 'video' | null>(null);

	const { data: ticket, isPending: isPendingTicket } = useGetSingleComplaint({ complaintId: ticket_id });

	const { data: messages, refetch: refetchMessages } = useGetAllComplaintById({ complaintId });

	const { mutate: createComplaint, isPending: isCreatingComplaint } = useReportIssue();

	useEffect(() => {
		if (messages?.messages) {
			setMessageList(messages.messages);
		}
	}, [messages]);

	const sendMessage = () => {
		if (!newMessage.trim()) return;

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
									<div key={msg.id} className={`flex ${msg.sender !== 'admin' ? 'justify-end' : 'justify-start'}`}>
										<div className={`max-w-[70%] w-[70%] p-3 rounded-lg ${msg.sender === 'admin' ? 'bg-primary text-white' : 'bg-white text-black'}`}>
											<p className="text-sm">{msg.content}</p>
											{msg.time && <p className="text-xs text-right mt-1 text-white/60">{msg.time}</p>}
											{msg.isAttachment && (
												<div className="w-full justify-end flex p-8 bg-background cursor-pointer" onClick={() => openAttachmentPreview(msg.isAttachment)} title="Click to preview attachment">
													<Image src={msg.isAttachment} className="rounded-md mt-4 justify-end aspect-video object-contain" width={200} height={200} alt="ticket attachment" />
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Message Input */}
						<div className="flex items-center gap-4 px-4 py-2 bg-background rounded-lg">
							<input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-grow p-2 rounded-md text-black text-sm" placeholder="Type your message..." />
							<Button size="icon" onClick={sendMessage} disabled={isCreatingComplaint || ticket.complain.status === 'Resolved'}>
								<Send size={16} />
							</Button>
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

						{previewAttachmentType === 'image' && <Image src={previewAttachmentUrl} alt="Attachment preview" className="rounded-lg max-w-full max-h-[80vh] object-contain" />}

						{previewAttachmentType === 'video' && <video src={previewAttachmentUrl} controls autoPlay className="rounded-lg max-w-full max-h-[80vh]" />}
					</div>
				</div>
			)}
		</div>
	);
};

export default TicketDetails;
