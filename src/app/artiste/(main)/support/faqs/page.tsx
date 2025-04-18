'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

// FAQ data organized by categories
const faqData = {
	distribution: [
		{
			id: 'distribution-1',
			question: 'How much does music distribution cost with MYAIRPLAY?',
			answerText: 'You can release unlimited music to Spotify, Apple Music, TikTok, Amazon Music, Tidal, Deezer, Instagram, YouTube Music, Audiomack, and every other global streaming and social platform for as little as N40,000 a year. To proceed with our distribution service, kindly click on the link below and fill in your details: https://bit.ly/3RcYXv3',
			answer: (
				<>
					<p>You can release unlimited music to Spotify, Apple Music, TikTok, Amazon Music, Tidal, Deezer, Instagram, YouTube Music, Audiomack, and every other global streaming and social platform for as little as N40,000 a year.</p>
					<p className="mt-2">
						To proceed with our distribution service, kindly click on the link below and fill in your details:{' '}
						<Link href="https://bit.ly/3RcYXv3" className="text-[#FF6B00] hover:underline">
							https://bit.ly/3RcYXv3
						</Link>
					</p>
				</>
			)
		},
		{
			id: 'distribution-2',
			question: 'How long before my release date should I submit my music?',
			answerText: "We recommend submitting your music at least 5-7 days before your planned release date. This gives us more time to process your release. Once your release has been approved, it will be sent to stores immediately. At that point, it will be each store's responsibility to make the release live.",
			answer: (
				<>
					<p>We recommend submitting your music at least 5-7 days before your planned release date. This gives us more time to process your release.</p>
					<p className="mt-2">Once your release has been approved, it will be sent to stores immediately. At that point, it will be each store&apos;s responsibility to make the release live.</p>
				</>
			)
		},
		{
			id: 'distribution-3',
			question: 'Can I choose where my music is released?',
			answerText: "Yes! You can choose exactly which music platforms to release your music on, as well as the countries you'd like it to be available in 🌍🎶. Platforms we distribute to: Spotify, Apple Music, TikTok, Instagram, iTunes, Amazon, Google Play, Audiomack, Boomplay, Deezer, Tidal, and many more!",
			answer: (
				<>
					<p>Yes! You can choose exactly which music platforms to release your music on, as well as the countries you&apos;d like it to be available in 🌍🎶.</p>
					<p className="mt-2">Platforms we distribute to:</p>
					<p>Spotify, Apple Music, TikTok, Instagram, iTunes, Amazon, Google Play, Audiomack, Boomplay, Deezer, Tidal, and many more!</p>
				</>
			)
		},
		{
			id: 'distribution-4',
			question: 'How do I create a new release?',
			answerText: 'You can create a new standard release by uploading to https://content.myairplay.com',
			answer: (
				<p>
					You can create a new standard release by uploading to{' '}
					<Link href="https://content.myairplay.com" className="text-[#FF6B00] hover:underline">
						https://content.myairplay.com
					</Link>
				</p>
			)
		},
		{
			id: 'distribution-5',
			question: 'Can I release music videos?',
			answerText: 'Yes! You can set up a YouTube/Vevo channel and release official music videos 🎥. It can be released to a brand new channel or an existing channel linked to your account!',
			answer: (
				<>
					<p>Yes! You can set up a YouTube/Vevo channel and release official music videos 🎥.</p>
					<p className="mt-2">It can be released to a brand new channel or an existing channel linked to your account!</p>
				</>
			)
		},
		{
			id: 'distribution-6',
			question: "What happens if I don't renew my distribution service?",
			answerText: "If you don't renew your subscription with MYAIRPLAY, your music will be removed from stores. Before your renewal date, we will send a notification to your email. If you do not renew, we will send a final notice and provide a grace period before taking down your release(s). Once removed, it is considered final and cannot be reversed until payment is made. During this period, no royalties will be paid to you.",
			answer: (
				<>
					<p>If you don&apos;t renew your subscription with MYAIRPLAY, your music will be removed from stores.</p>
					<p className="mt-2">Before your renewal date, we will send a notification to your email.</p>
					<p className="mt-2">If you do not renew, we will send a final notice and provide a grace period before taking down your release(s).</p>
					<p className="mt-2">Once removed, it is considered final and cannot be reversed until payment is made. During this period, no royalties will be paid to you.</p>
				</>
			)
		}
	],
	royalties: [
		{
			id: 'royalties-1',
			question: 'How much will I get paid?',
			answerText: "That depends! Each streaming platform pays a different rate per stream. The value of an individual stream can vary depending on factors like the listener's location, whether they have a paid or free subscription, and how long it was streamed.",
			answer: <p>That depends! Each streaming platform pays a different rate per stream. The value of an individual stream can vary depending on factors like the listener&apos;s location, whether they have a paid or free subscription, and how long it was streamed.</p>
		},
		{
			id: 'royalties-2',
			question: 'Will MYAIRPLAY take any of my royalty?',
			answerText: 'Yes! 80-20 revenue split in favor of the artist. All payments are made in our local currency (Naira). The minimum payout is N20,000.',
			answer: (
				<>
					<p>Yes! 80-20 revenue split in favor of the artist.</p>
					<p className="mt-2">All payments are made in our local currency (Naira). The minimum payout is N20,000.</p>
				</>
			)
		},
		{
			id: 'royalties-3',
			question: 'When will royalties be paid into my account?',
			answerText: 'Following the recent partnership with Curve for royalty reporting, revenue earned will always be paid out 2-3 business days after monthly reports have been published. All payments are made in our local currency (Naira).',
			answer: (
				<>
					<p>Following the recent partnership with Curve for royalty reporting, revenue earned will always be paid out 2-3 business days after monthly reports have been published.</p>
					<p className="mt-2">All payments are made in our local currency (Naira).</p>
				</>
			)
		}
	],
	account: [
		{
			id: 'account-1',
			question: 'Will I have access to my dashboard?',
			answerText: 'Yes. We have partnered with a company (Curve) and once you are registered, an invitation link will be sent out to create a password to view your earnings and analytics.',
			answer: <p>Yes. We have partnered with a company (Curve) and once you are registered, an invitation link will be sent out to create a password to view your earnings and analytics.</p>
		},
		{
			id: 'account-2',
			question: 'How do I move my music to MyAirplay from another distributor?',
			answerText: "Find all metadata and original files associated with the music you'd like to move to MyAirplay, including: ISRC codes, Artist name & track titles, Original audio files, Original artwork. Issue a takedown request with your current distributor. Re-upload your music to MyAirplay using the exact same ISRC codes, artist names, track titles, and original files. Contact contact@airplay.com with the subject line 'Moving to MyAirplay' for assistance.",
			answer: (
				<>
					<p>Find all metadata and original files associated with the music you&apos;d like to move to MyAirplay, including:</p>
					<ul className="list-disc pl-5 mt-2">
						<li>ISRC codes</li>
						<li>Artist name & track titles</li>
						<li>Original audio files</li>
						<li>Original artwork</li>
					</ul>
					<p className="mt-2">Issue a takedown request with your current distributor.</p>
					<p className="mt-2">Re-upload your music to MyAirplay using the exact same ISRC codes, artist names, track titles, and original files.</p>
					<p className="mt-2">Contact contact@airplay.com with the subject line &quot;Moving to MyAirplay&quot; for assistance.</p>
				</>
			)
		}
	],
	payment: [
		{
			id: 'payment-1',
			question: 'What payment method does MYAIRPLAY accept?',
			answerText: 'Payments are sent to: Account Number: 1217606924, Account Name: MYAIRPLAY, Bank: ZENITH BANK',
			answer: (
				<>
					<p>Payments are sent to:</p>
					<p className="mt-2">Account Number: 1217606924</p>
					<p>Account Name: MYAIRPLAY</p>
					<p>Bank: ZENITH BANK</p>
				</>
			)
		}
	],
	music: [
		{
			id: 'music-1',
			question: 'How do I remove a release from stores?',
			answerText: 'You can remove your music from stores at any time. It usually takes 2-4 weeks for takedowns to be removed from stores. You can contact contact@airplay.com for takedown initiation.',
			answer: (
				<>
					<p>You can remove your music from stores at any time.</p>
					<p className="mt-2">It usually takes 2-4 weeks for takedowns to be removed from stores.</p>
					<p className="mt-2">You can contact contact@airplay.com for takedown initiation.</p>
				</>
			)
		},
		{
			id: 'music-2',
			question: "Can I edit my release after it's been sent to stores?",
			answerText: "Yes, but with limitations. Contact us if you want to update your release. However, the following changes cannot be made: Change track order, Change the main artist name or artist role from Featured to Primary, Special cases where resolving ISRC conflicts on Labelcamp does not work. If you'd like to make any of the above changes, you will need to take down the release and re-upload it with the correct information.",
			answer: (
				<>
					<p>Yes, but with limitations. Contact us if you want to update your release. However, the following changes cannot be made:</p>
					<ul className="list-disc pl-5 mt-2">
						<li>Change track order</li>
						<li>Change the main artist name or artist role from Featured to Primary</li>
						<li>Special cases where resolving ISRC conflicts on Labelcamp does not work</li>
					</ul>
					<p className="mt-2">If you&apos;d like to make any of the above changes, you will need to take down the release and re-upload it with the correct information.</p>
				</>
			)
		},
		{
			id: 'music-3',
			question: 'Do I get a SmartLink on my release date?',
			answerText: "Yes! SmartLinks are a free and simple way to share your music across every major platform with just one link. We'll send you one every time you release new music through MyAirplay Music.",
			answer: (
				<>
					<p>Yes! SmartLinks are a free and simple way to share your music across every major platform with just one link.</p>
					<p className="mt-2">We&apos;ll send you one every time you release new music through MyAirplay Music.</p>
				</>
			)
		},
		{
			id: 'music-4',
			question: 'Can I release cover songs, remixes, or songs using samples?',
			answerText: "If you release a cover, remix, or song that uses samples, you'll probably need permission from the original copyright holder. Cover songs: No license is required for streaming platforms, but a Mechanical License is needed for download stores. Remixes: You'll need a Master License, which must be negotiated with the rights holder. Samples: You'll need both a Master and Mechanical License to legally use a sample.",
			answer: (
				<>
					<p>If you release a cover, remix, or song that uses samples, you&apos;ll probably need permission from the original copyright holder.</p>
					<ul className="list-disc pl-5 mt-2">
						<li>Cover songs: No license is required for streaming platforms, but a Mechanical License is needed for download stores.</li>
						<li>Remixes: You&apos;ll need a Master License, which must be negotiated with the rights holder.</li>
						<li>Samples: You&apos;ll need both a Master and Mechanical License to legally use a sample.</li>
					</ul>
				</>
			)
		}
	],
	analytics: [
		{
			id: 'analytics-1',
			question: 'How do I receive my sales reports?',
			answerText: 'It takes three (3) months before the first royalty reports are generated. After that, you start receiving it monthly. MyAirplay issues accounting statements at the end of each month. Detailed sales reporting data is provided for your catalog across every DSP.',
			answer: (
				<>
					<p>It takes three (3) months before the first royalty reports are generated. After that, you start receiving it monthly.</p>
					<p className="mt-2">MyAirplay issues accounting statements at the end of each month. Detailed sales reporting data is provided for your catalog across every DSP.</p>
				</>
			)
		},
		{
			id: 'analytics-2',
			question: 'Does MYAIRPLAY do playlist pitching?',
			answerText: "Yes. While no legitimate company can guarantee placement, MyAirplay's team is passionate and knowledgeable about music. Our pitches have secured many official features and playlist spots on major DSPs for both established and up-and-coming artists. We will also work closely with your marketing team/budget to better support and enhance your paid campaigns. A fee is charged once your song is successfully pitched. If you are interested in submitting your release for playlist consideration, your release will need to be approved by MyAirplay and processed in stores at least three weeks prior to your release date.",
			answer: (
				<>
					<p>Yes. While no legitimate company can guarantee placement, MyAirplay&apos;s team is passionate and knowledgeable about music.</p>
					<p className="mt-2">Our pitches have secured many official features and playlist spots on major DSPs for both established and up-and-coming artists.</p>
					<p className="mt-2">We will also work closely with your marketing team/budget to better support and enhance your paid campaigns. A fee is charged once your song is successfully pitched.</p>
					<p className="mt-2">If you are interested in submitting your release for playlist consideration, your release will need to be approved by MyAirplay and processed in stores at least three weeks prior to your release date.</p>
				</>
			)
		}
	]
};

// Flatten all FAQs for search functionality
const allFaqs = Object.values(faqData).flat();

export default function FAQsPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

	// Filter FAQs based on search query
	const filteredFaqs = useMemo(() => {
		if (!searchQuery.trim()) return null;

		const query = searchQuery.toLowerCase();
		return allFaqs.filter(faq => faq.question.toLowerCase().includes(query) || faq.answerText.toLowerCase().includes(query));
	}, [searchQuery]);

	const toggleItem = (id: string) => {
		setExpandedItems(prev => ({
			...prev,
			[id]: !prev[id]
		}));
	};

	// Render FAQ item
	const renderFaqItem = (faq: (typeof allFaqs)[0]) => (
		<div key={faq.id} className="mb-4">
			<div className="flex justify-between items-center py-3 cursor-pointer" onClick={() => toggleItem(faq.id)}>
				<h4 className="font-medium">{faq.question}</h4>
				{expandedItems[faq.id] ? <Minus className="h-4 w-4 flex-shrink-0 ml-2" /> : <Plus className="h-4 w-4 flex-shrink-0 ml-2" />}
			</div>

			{expandedItems[faq.id] && <div className="py-3 text-sm text-gray-400">{faq.answer}</div>}
			<div className="border-b border-gray-800"></div>
		</div>
	);

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h2 className="text-2xl font-medium mb-6">FAQs</h2>

			<div className="relative mb-6">
				<Input type="text" placeholder="Search FAQ" className="w-full bg-secondary border-gray-700 text-white pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
				<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
			</div>

			{filteredFaqs && filteredFaqs.length > 0 && (
				<div className="mb-8">
					<h3 className="text-lg font-medium mb-4 text-gray-200">Search Results</h3>
					{filteredFaqs.map(renderFaqItem)}
				</div>
			)}

			{filteredFaqs && filteredFaqs.length === 0 && (
				<div className="mb-8 p-4 bg-secondary rounded-lg border border-gray-700">
					<p className="text-gray-400">No results found for &quot;{searchQuery}&quot;. Try a different search term.</p>
				</div>
			)}

			{!filteredFaqs && (
				<Tabs defaultValue="distribution" className="w-full">
					<TabsList className="w-full bg-transparent border-b border-gray-800 justify-start space-x-6 rounded-none h-auto pb-2 overflow-x-auto">
						<TabsTrigger value="distribution" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Distribution
						</TabsTrigger>
						<TabsTrigger value="royalties" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Royalties
						</TabsTrigger>
						<TabsTrigger value="account" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Account
						</TabsTrigger>
						<TabsTrigger value="payment" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Payment
						</TabsTrigger>
						<TabsTrigger value="music" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Music Uploads
						</TabsTrigger>
						<TabsTrigger value="analytics" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Analytics
						</TabsTrigger>
					</TabsList>

					<TabsContent value="distribution" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Distribution</h3>
						{faqData.distribution.map(renderFaqItem)}
					</TabsContent>

					<TabsContent value="royalties" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Royalties</h3>
						{faqData.royalties.map(renderFaqItem)}
					</TabsContent>

					<TabsContent value="account" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Account</h3>
						{faqData.account.map(renderFaqItem)}
					</TabsContent>

					<TabsContent value="payment" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Payment</h3>
						{faqData.payment.map(renderFaqItem)}
					</TabsContent>

					<TabsContent value="music" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Music Uploads</h3>
						{faqData.music.map(renderFaqItem)}
					</TabsContent>

					<TabsContent value="analytics" className="mt-6">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Analytics</h3>
						{faqData.analytics.map(renderFaqItem)}
					</TabsContent>
				</Tabs>
			)}

			<div className="mt-12">
				<h3 className="text-lg font-medium mb-6">Help Articles & Tutorials</h3>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-secondary rounded-lg p-4 border border-gray-700">
						<div className="mb-2">📝</div>
						<h4 className="font-medium mb-1">Music Uploads</h4>
						<p className="text-sm text-gray-400 mb-2">Ensure your music file is in an accepted format. Upload your music and compress if necessary.</p>
						<p className="text-sm text-[#FF6B00] cursor-pointer hover:underline">You can read more</p>
					</div>

					<div className="bg-secondary rounded-lg p-4 border border-gray-700">
						<div className="mb-2">📊</div>
						<h4 className="font-medium mb-1">Analytics & Report</h4>
						<p className="text-sm text-gray-400 mb-2">Ensure your music file is in an accepted format. Check the file size limit and compress if necessary.</p>
						<p className="text-sm text-[#FF6B00] cursor-pointer hover:underline">You can read more</p>
					</div>

					<div className="bg-secondary rounded-lg p-4 border border-gray-700">
						<div className="mb-2">📄</div>
						<h4 className="font-medium mb-1">Contract Management</h4>
						<p className="text-sm text-gray-400 mb-2">Ensure your music file is in an accepted format. Check the file size limit and compress if necessary.</p>
						<p className="text-sm text-[#FF6B00] cursor-pointer hover:underline">You can read more</p>
					</div>
				</div>
			</div>

			<div className="mt-12">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium">Contact Us</h3>
					<Link href={'/artiste/support/contact'} className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white">
						<span>Contact Us</span>
					</Link>
				</div>

				<div className="bg-secondary rounded-lg p-4 border border-gray-700">
					<p className="text-sm text-gray-400">
						For help and more information about AirPlay send us an email here or click the{' '}
						<Link href="mailto:contact@airplay.com" className="text-[#FF6B00] hover:underline">
							link
						</Link>{' '}
						to drop your enquiries. Email:{' '}
						<Link href="mailto:contact@airplay.com" className="text-[#FF6B00] hover:underline">
							contact@airplay.com
						</Link>
					</p>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="text-lg font-medium mb-4">Terms and Conditions</h3>
				<div className="bg-secondary rounded-lg p-4 border border-gray-700">
					<p className="text-sm text-gray-400">
						Read our terms and conditions here:{' '}
						<Link href="/policies/terms" className="text-[#FF6B00] cursor-pointer hover:underline">
							terms and conditions
						</Link>
					</p>
				</div>
			</div>

			<div className="mt-8 mb-12">
				<h3 className="text-lg font-medium mb-4">Privacy Policy</h3>
				<div className="bg-secondary rounded-lg p-4 border border-gray-700">
					<p className="text-sm text-gray-400">
						Read our privacy policy here:{' '}
						<Link href="/policies/privacy" className="text-[#FF6B00] cursor-pointer hover:underline">
							privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
