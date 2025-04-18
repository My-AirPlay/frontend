'use client';

import { PrinterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
	// Handle print functionality
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="policy-content text-gray-200">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-2xl font-semibold text-white">Privacy Policy</h2>
				<Button variant="outline" size="sm" className="print-button flex items-center gap-2 text-gray-300 border-gray-700 hover:bg-gray-800" onClick={handlePrint}>
					<PrinterIcon size={16} />
					<span>Print</span>
				</Button>
			</div>

			<div className="space-y-8">
				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">1. Information We Collect</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Personal Information:</strong> We may collect personal information such as your name, email address, mailing address, phone number, and payment information when you create an account or make payments for our Service.
						</p>
						<p>
							<strong className="text-white">b. Music and Content Data:</strong> We collect information related to the music and content you upload to our Service, including track titles, album information, cover art, and associated metadata.
						</p>
						<p>
							<strong className="text-white">c. Usage Information:</strong> We collect data on how you interact with our Service, including your use of features, your preferences, and your interactions with other users and content.
						</p>
						<p>
							<strong className="text-white">d. Device Information:</strong> We may collect information about the device you use to access our Service, including device type, operating system, browser type, and unique device identifiers.
						</p>
						<p>
							<strong className="text-white">e. Log Data:</strong> Our servers automatically record information when you use our Service. This may include IP address, access times, the pages you visit, and other usage data.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">2. How We Use Your Information</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Service Delivery:</strong> We use your personal information to provide and improve our Service, process payments, distribute your music, and offer customer support.
						</p>
						<p>
							<strong className="text-white">b. Communication:</strong> We may use your contact information to send you important notices, updates, and information related to your account and our Service.
						</p>
						<p>
							<strong className="text-white">c. Analytics and Research:</strong> We analyze user data to understand user behavior and preferences, enhance our Service, and conduct research to improve user experiences.
						</p>
						<p>
							<strong className="text-white">d. Legal Compliance:</strong> We may use your information to comply with legal requirements, resolve disputes, and enforce our terms and policies.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">3. Sharing Your Information</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Distribution of Music:</strong> Your music and content data will be shared with the online platforms and streaming services you select through our distribution options.
						</p>
						<p>
							<strong className="text-white">b. Service Providers:</strong> We may share your information with trusted service providers who assist us in delivering and maintaining our Service.
						</p>
						<p>
							<strong className="text-white">c. Legal Requirements:</strong> We may disclose your information to comply with legal obligations, protect our rights, safety, or property, and respond to government requests and legal processes.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">4. Your Choices</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Account Settings:</strong> You can access and edit your personal information in your account settings. You can also manage communication preferences and opt-out of promotional emails.
						</p>
						<p>
							<strong className="text-white">b. Data Deletion:</strong> You can request the deletion of your account and personal information, subject to legal requirements and our data retention policies.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">5. Data Security</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a.</strong> We employ security measures to protect your information, including encryption, access controls, and regular security assessments.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">6. Changes to this Privacy Policy</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a.</strong> We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will provide notice of any significant changes through our website or other means.
						</p>
					</div>
				</section>
			</div>

			<div className="mt-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
				<p className="text-gray-300">Last Updated: April 17, 2025</p>
				<p className="text-gray-300 mt-3">
					If you have any questions about our Privacy Policy, please contact us at{' '}
					<a href="mailto:contact@airplay.com" className="text-[#FF6B00] hover:underline">
						contact@airplay.com
					</a>
					.
				</p>
			</div>
		</div>
	);
}
