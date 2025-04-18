'use client';

import { PrinterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CookiePolicyPage() {
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="policy-content text-gray-200">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-2xl font-semibold text-white">Cookie Policy</h2>
				<Button variant="outline" size="sm" className="print-button flex items-center gap-2 text-gray-300 border-gray-700 hover:bg-gray-800" onClick={handlePrint}>
					<PrinterIcon size={16} />
					<span>Print</span>
				</Button>
			</div>

			<p className="mb-6 text-gray-300 policy-intro">This Cookie Policy explains how MyAirplay (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) uses cookies and similar technologies on our website and related services (the &quot;Service&quot;). By using our Service, you agree to the use of cookies as described in this policy.</p>

			<div className="space-y-8">
				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">1. What Are Cookies?</h3>
					<p className="text-gray-300 policy-content-text">Cookies are small text files that are placed on your device when you visit a website. They are widely used to provide functionality, enhance user experiences, and collect information about your interactions with websites.</p>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">2. How We Use Cookies</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Essential Cookies:</strong> We use essential cookies that are necessary for the basic functioning of our website. These cookies enable core features, such as account login, and cannot be disabled.
						</p>
						<p>
							<strong className="text-white">b. Performance Cookies:</strong> We use performance cookies to collect information about how you use our website, such as which pages you visit most frequently. This helps us improve our website&apos;s performance and user experience.
						</p>
						<p>
							<strong className="text-white">c. Functionality Cookies:</strong> Functionality cookies allow our website to remember your preferences, such as language settings and account login details, to provide a more personalized experience.
						</p>
						<p>
							<strong className="text-white">d. Analytics Cookies:</strong> We use analytics cookies to track user behavior and gather data for statistical analysis, helping us understand how users interact with our website and how we can improve it.
						</p>
						<p>
							<strong className="text-white">e. Marketing and Advertising Cookies:</strong> We may use third-party cookies for marketing and advertising purposes. These cookies help deliver targeted advertisements that are relevant to your interests. You can choose to opt out of marketing and advertising cookies.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">3. Managing Cookies</h3>
					<p className="text-gray-300 policy-content-text">
						<strong className="text-white">a.</strong> You have the option to control and manage cookies through your browser settings. You can choose to accept or reject cookies and delete them at any time. Please note that disabling essential cookies may impact the functionality of our website.
					</p>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">4. Third-Party Cookies</h3>
					<p className="text-gray-300 policy-content-text">
						<strong className="text-white">a.</strong> Some cookies on our website are placed by third parties, such as advertising networks and analytics providers. These third parties may use their cookies to collect information about your online activities across websites.
					</p>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">5. Changes to this Cookie Policy</h3>
					<p className="text-gray-300 policy-content-text">
						<strong className="text-white">a.</strong> We may update this Cookie Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will provide notice of any significant changes through our website or other means.
					</p>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">6. Contact Us</h3>
					<p className="text-gray-300 policy-content-text">
						<strong className="text-white">a.</strong> If you have questions, concerns, or requests related to our use of cookies, you may contact us at{' '}
						<a href="mailto:contact@airplay.com" className="text-[#FF6B00] hover:underline">
							contact@airplay.com
						</a>
						.
					</p>
				</section>
			</div>

			<div className="mt-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
				<p className="text-gray-300">Last Updated: April 17, 2025</p>
				<p className="text-gray-300 mt-3">By continuing to use our Service, you consent to the use of cookies as described in this Cookie Policy.</p>
			</div>
		</div>
	);
}
