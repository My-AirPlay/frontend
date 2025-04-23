'use client';

import { PrinterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
	// Handle print functionality
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="policy-content text-gray-200">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-2xl font-semibold text-white">Terms and Conditions for MyAirplay Music Distribution Service</h2>
				<Button variant="outline" size="sm" className="print-button flex items-center gap-2 text-gray-300 border-gray-700 hover:bg-gray-800" onClick={handlePrint}>
					<PrinterIcon size={16} />
					<span>Print</span>
				</Button>
			</div>

			<div className="space-y-8">
				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">1. Acceptance of Terms and Conditions</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>1.1. Kindly review the following terms and conditions diligently. These terms and conditions, together with the copyright policy (&quot;Copyright Policy&quot;), the Social Platforms Terms of Service (if applicable), and the privacy policy (&quot;Privacy Policy&quot;) (collectively referred to as the &quot;Terms of Service&quot;), govern your use of the MyAirplay.com website (&quot;the Site&quot;) and its content, information, products, and services (&quot;the Services&quot;).</p>
						<p>This represents a legally binding agreement between you and MyAirplay, Inc. (&quot;the Company&quot;). The Company retains the exclusive right to modify, discontinue, or terminate the Site and Services at any time, or to amend the Terms of Service without prior notice. You acknowledge that any revisions to these Terms of Service do not affect the validity of previous versions. It is your responsibility to periodically check these Terms of Service for updates. By continuing to access and use the Site and/or Services after the Company makes and posts such changes, you affirm your legal acceptance of the updated Terms of Service. You are not authorized to alter the terms and conditions of the Terms of Service without the express written consent of the Company.</p>
						<p>These Terms and Conditions (&quot;Agreement&quot;) govern your use of MyAirplay&apos;s music distribution service (&quot;Service&quot;). By accessing or using our Service, you agree to comply with and be bound by this Agreement. If you do not agree to these terms, please do not use MyAirplay&apos;s Service.</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">2. Grant of Rights</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">(a)</strong> The rights granted hereunder shall include the Sale of Recordings (as each is defined below) by, without limitation, permanent digital downloads, temporary digital downloads, interactive streaming, non-interactive streaming, and cloud services. You and the Company agree that the Internet consumer stores (&quot;Consumer Stores&quot;) (e.g., Apple Music, Amazon, Spotify, Deezer, Tidal, etc.) licensed to exploit your Recordings hereunder must be approved by you.
						</p>
						<p>
							<strong className="text-white">(b)</strong> By clicking the &quot;I Agree&quot; button, you irrevocably grant to MyAirplay throughout the duration of the Term, the non-exclusive right:
						</p>
						<div className="pl-6 space-y-2 mt-2">
							<p>i. to sell, copy, reproduce, communicate to the public, distribute and otherwise exploit the Recordings by all means and media (whether now known or existing in the future) (&quot;Sale&quot;) through any and all Consumer Stores now operational or hereafter available;</p>
							<p>ii. to collect all income deriving therefrom;</p>
							<p>iii. Utilize the names, photographs, likenesses, artwork images, biographical details, and any other information supplied by you or the artists whose performances are embodied on the Recordings in connection with the Recordings and the general operations of MyAirplay.</p>
						</div>
						<p>
							<strong className="text-white">(c)</strong> You pledge not to partake in (or allow, encourage, enlist, retain, or employ third parties in) activities that, at the sole discretion of MyAirplay, constitute Streaming Manipulation.
						</p>
						<div className="pl-6 space-y-2 mt-2">
							<p>i. &quot;Streaming Manipulation&quot; refers to any activity or method involving the artificial generation of online or offline plays on audio and/or audio-visual streaming services, where these plays do not genuinely represent end-user listening or views initiated by authentic consumers in the reporting country.</p>
							<p>ii. Please be aware that Streaming Manipulation may result from the actions of a third party, such as a promotional or marketing company, a record label, or a music distributor, acting on behalf of an artist or independently.</p>
							<p>iii. The criteria used to assess whether a specific consumption or marketing activity qualifies as Streaming Manipulation will vary depending on the unique circumstances of each case.</p>
						</div>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">3. User Obligations</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">3.a.</strong> Users must adhere to all applicable laws, regulations, and industry standards when using our Service. You are responsible for ensuring that your use of the Service complies with all relevant legal requirements.
						</p>
						<p>
							<strong className="text-white">3.b.</strong> When using MyAirplay&apos;s Service to distribute music, you are solely responsible for the content you upload and distribute. You must ensure that you hold all necessary rights, licenses, and permissions for the music you distribute through our platform.
						</p>
						<p>
							<strong className="text-white">3.c.</strong> Users are strictly prohibited from using our Service to distribute any content that infringes on copyright, trademark, or any other intellectual property rights of third parties.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">4. Intellectual Property</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">4.a.</strong> We respect intellectual property rights, and we expect our users to do the same. As a user of MyAirplay&apos;s Service, you retain ownership of your music.
						</p>
						<p>
							<strong className="text-white">4.b.</strong> By using MyAirplay&apos;s Service, you grant us the non-exclusive right to distribute your music through the platforms and services we support. This distribution right is limited to the duration of this Agreement.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">5. Subscription Fees</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>In exchange for the services provided by MyAirplay, a yearly subscription fee is required, rather than being assessed per release. This subscription fee covers administrative expenses, distribution, artist support services, and the ongoing manual maintenance of your Recordings to meet Consumer Stores&apos; technical requirements and specifications.</p>
						<p>You explicitly authorize MyAirplay to deduct the yearly subscription fee, along with any applicable taxes and related charges, directly from your MyAirplay account or to bill such fees to your designated Payment Method.</p>
						<p>Should you decide to terminate your subscription for one or more of your Recordings, simply inform MyAirplay in writing via mail. In this case, no further subscription fees will be assessed for those Recordings, and they will be removed from the respective Consumer Stores.</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">6. Warranties; Representations; Indemnities</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">(a)</strong> You provide the following warranties and representations: (i) You are at least eighteen (18) years of age, and you possess the full legal right, authority, and power to enter into this agreement and grant Company all the rights specified herein; (ii) All Recordings, including any third-party material incorporated therein, as well as artwork, metadata, audiovisuals, images, and any other materials you provide to Company in connection with the Recordings, are either owned or controlled by you, and their use as described herein or on the Site and Consumer Stores&apos; websites will not infringe upon the copyrights, trademark rights, publicity rights, moral rights, or other rights of any person or entity, under the laws of any jurisdiction.
						</p>
						<p>
							<strong className="text-white">(b)</strong> You are obligated to protect, indemnify, and hold Company and its affiliates (including directors, members, officers, employees, and other representatives) harmless from any claims, expenses, or losses brought by third parties.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">7. Distribution</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a.</strong> We will use our best efforts to distribute your music to the online platforms and streaming services you select through our distribution options. However, MyAirplay does not guarantee that your music will be accepted by all platforms, as each platform may have its unique requirements and eligibility criteria.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">8. Termination</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a.</strong> MyAirplay reserves the right to terminate or suspend user accounts that violate these Terms and Conditions. If MyAirplay determines that you have engaged in activities that violate this Agreement or pose a risk to our Service or other users, MyAirplay may take appropriate action, including termination of your account.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">9. Changes to Terms and Service</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a.</strong> MyAirplay reserves the right to modify or update these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. It is your responsibility to regularly review this Agreement to stay informed of any updates.
						</p>
						<p>
							<strong className="text-white">b.</strong> MyAirplay may make changes to the Service, including the addition or removal of features, distribution options, and pricing. MyAirplay will endeavor to provide notice of such changes through our website or other means.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">10. Legal Proceedings</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">(a)</strong> You hereby grant Company, its licensees, assignees, agents, and attorneys an irrevocable authorization to initiate, on your behalf or on behalf of Company, any claims, demands, actions, or legal proceedings (&quot;Claims&quot;) that Company reasonably deems necessary to safeguard and enforce the rights granted to Company herein.
						</p>
						<p>
							<strong className="text-white">(b)</strong> Both you and Company agree that any claims brought against each other shall be in an individual capacity and not as a plaintiff or class member in any purported class or representative action.
						</p>
					</div>
				</section>

				<section className="policy-section">
					<h3 className="text-xl font-medium mb-4">11. Contact Methods</h3>
					<div className="space-y-3 text-gray-300 policy-content-text">
						<p>
							<strong className="text-white">a. Email:</strong> For general inquiries, support, or questions related to our Service, you can reach out to our support team via email at{' '}
							<a href="mailto:info@myairplay.com" className="text-[#FF6B00] hover:underline">
								info@myairplay.com
							</a>
							.
						</p>
						<p>
							<strong className="text-white">b. Phone Support:</strong> Our customer support team can be reached by phone at{' '}
							<a href="tel:+2347042155392" className="text-[#FF6B00] hover:underline">
								+2347042155392
							</a>
							.
						</p>
						<p>
							<strong className="text-white">c. Response Time:</strong> We strive to respond to inquiries and concerns in a timely manner. While response times may vary depending on the nature and complexity of the issue, our commitment is to address your inquiries promptly.
						</p>
						<p>
							<strong className="text-white">d. User Resources:</strong> Additionally, you may find valuable resources and frequently asked questions on our website that can help answer common queries about our Service.
						</p>
					</div>
				</section>
			</div>

			<div className="mt-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
				<p className="text-gray-300">Last Updated: April 17, 2025</p>
				<p className="text-gray-300 mt-3">By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
			</div>
		</div>
	);
}
