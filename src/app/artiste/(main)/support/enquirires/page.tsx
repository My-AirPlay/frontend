'use client';

import type React from 'react';

import { useState } from 'react';
import { X, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FaSoundcloud } from 'react-icons/fa';

export default function EnquiriesPage() {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log(message);
		// Close modal or show success message
	};

	const handleClose = () => {
		// Close the modal - in a real app, this would navigate back or close the modal
		window.close();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
			<div className="w-full max-w-xl bg-black rounded-lg p-6 relative">
				<button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
					<X className="h-5 w-5" />
					<span className="sr-only">Close</span>
				</button>

				<h2 className="text-xl font-semibold text-[#FF6B00] text-center mb-6">ENQUIRIES</h2>

				<div className="text-center mb-6">
					<p className="text-gray-200 mb-4">We value your interest and involvement in AirPlay community. Whether you have questions, need support, or want to get more involved, we&apos;re here to help.</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<Textarea placeholder="Your Message" className="w-full  min-h-[120px]" value={message} onChange={e => setMessage(e.target.value)} required />

					<div className="flex justify-center mt-6">
						<Button type="submit" className="bg-[#FF6B00] hover:bg-[#E05F00] text-white px-10">
							Submit
							<span className="ml-2">→</span>
						</Button>
					</div>
				</form>

				<div className="flex justify-center space-x-6 mt-8">
					<a href="https://soundcloud.com/myairplay" className="text-gray-400 hover:text-white">
						<FaSoundcloud className="h-5 w-5" />
						<span className="sr-only">Twitter</span>
					</a>
					<a href="https://www.linkedin.com/company/myairplay/?originalSubdomain=ng" className="text-gray-400 hover:text-white">
						<Linkedin className="h-5 w-5" />
						<span className="sr-only">LinkedIn</span>
					</a>
					<a href="https://www.instagram.com/myairplay" className="text-gray-400 hover:text-white">
						<Instagram className="h-5 w-5" />
						<span className="sr-only">Instagram</span>
					</a>
					<a href="https://www.facebook.com/MyAirplays" className="text-gray-400 hover:text-white">
						<Facebook className="h-5 w-5" />
						<span className="sr-only">Facebook</span>
					</a>
				</div>
			</div>
		</div>
	);
}
