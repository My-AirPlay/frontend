'use client';

import { LinkButton } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Hero carousel images
const heroImages = ['/images/hero/hero1.png', '/images/hero/hero2.png', '/images/hero/hero3.png'];

// Banner items for marquee
const bannerItems = [
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Music Uploads' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Music Royalties' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Distributions' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Reports and Analytics' }
];

// Artist data
const artistsSectionData = [
	{
		image: '/images/artist/individual.png',
		title: 'Individual Artists.',
		description: 'Control your narrative',
		link: '/artiste/register'
	},
	{
		image: '/images/artist/mangement.png',
		title: 'Artist Management.',
		description: 'Grow your artists brand',
		link: '/artiste/register'
	},
	{
		image: '/images/artist/owners.png',
		title: 'Management Owners.',
		description: 'Analyse royalties & reports',
		link: '/artiste/register'
	}
];

// Features data
const features = [
	{
		icon: '🎵',
		title: 'Music Uploads',
		description: 'Upload tracks with metadata for optimal distribution, ensuring your music reaches the right platforms.'
	},
	{
		icon: '📊',
		title: 'Earnings & Analytics',
		description: 'Track your revenue, streaming stats, and performance metrics in real-time.'
	},
	{
		icon: '🔗',
		title: 'Sharable Smart Link',
		description: 'Customized sharable links that direct fans to your music across all major streaming platforms.'
	},
	{
		icon: '⚡',
		title: 'Swift Onboarding',
		description: 'Get started in minutes with a streamlined process that ensures your profile is ready for the music world.'
	},
	{
		icon: '📈',
		title: 'Daily Statistics',
		description: 'Stay updated with daily performance metrics and audience engagement with your earnings.'
	},
	{
		icon: '🎞️',
		title: 'Video Uploads',
		description: 'Upload high-quality videos to showcase your music and connect with fans on streaming platforms.'
	}
];

// Artist images for explore section
const exploreArtists = ['/images/artist/tulus.png', '/images/artist/raisa.png', '/images/artist/judika.png', '/images/artist/budi.png', '/images/artist/andmesh.png', '/images/artist/andriana.png', '/images/artist/citra.png', '/images/artist/fals.png', '/images/artist/iwan.png'];

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Auto-rotate carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroImages.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<main className="bg-[#0D0D0D] min-h-svh flex flex-col">
			{/* Hero Section with Carousel */}
			<section className="relative overflow-hidden min-h-dvh">
				<div className="absolute inset-0 z-10 flex">
					{heroImages.map((img, index) => (
						<div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
							<Image src={img || '/placeholder.svg'} alt={`Hero slide ${index + 1}`} fill className="object-cover" priority={index === 0} />
						</div>
					))}
				</div>

				{/* Navigation */}
				<div className="relative z-20 container mx-auto pt-4 px-4 md:px-6">
					<nav className="flex justify-between items-center mb-12">
						<div className="flex items-center gap-8">
							<Link href="/" className="text-white">
								<Image src="/assets/logo.svg" alt="Air Play" width={40} height={40} className="text-[#FF6B00]" />
							</Link>
							<div className="hidden md:flex gap-6">
								<Link href="#" className="text-white hover:text-[#FF6B00] transition-colors">
									Features
								</Link>
								<Link href="#" className="text-white hover:text-[#FF6B00] transition-colors">
									About Us
								</Link>
								<Link href="#" className="text-white hover:text-[#FF6B00] transition-colors">
									Contact Us
								</Link>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Button variant="outline" className="text-[#FF6B00] border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-full hidden sm:flex">
								Request a Demo
							</Button>
							<Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full">Get Started</Button>
						</div>
					</nav>
				</div>

				{/* Hero Content */}
				<div className="relative z-20 container mx-auto px-4 md:px-6 py-12 md:py-20">
					<div className="flex flex-col md:flex-row justify-between items-start">
						<div className="mb-10 md:mb-0">
							<h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 md:mb-12 max-w-md">Empower your Music...</h1>
							<div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-14">
								<Button variant="outline" size="lg" className="text-[#FF6B00] border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-full hidden sm:flex">
									Request a Demo
								</Button>
								<LinkButton href="/artiste/register" size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full">
									Get Started
								</LinkButton>
							</div>
							<div className="hidden md:block">
								<Image src="/assets/circle-btn.svg" alt="Circle" width={80} height={80} />
							</div>
						</div>
						<div className="md:block">
							<div className="mb-6 md:mb-[74px]">
								<Image src="/assets/elipse.svg" alt="Elipse" width={120} height={120} className="hidden md:block" />
							</div>
							<h2 className="text-3xl sm:text-4xl lg:text-6xl text-white font-bold max-w-[295px]">own your journey</h2>
						</div>
					</div>
				</div>

				{/* Bottom Banner with Marquee */}
				<div className="absolute -left-0 bottom-0 h-[40px] bg-[#1A1A1A] z-[40] w-full md:w-[120%] overflow-hidden"></div>
				<div className="absolute -left-0 bottom-0 h-[116px] bg-[#1A1A1A] z-50 w-full md:w-[120%] md:-rotate-2 overflow-hidden">
					<div className="marquee-container h-full flex items-center">
						<div className="marquee-content flex animate-marquee">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="flex items-center whitespace-nowrap">
									{bannerItems.map((item, index) => (
										<div key={index} className="flex items-center gap-10 mx-8">
											{item.icon}
											<span className="text-white text-lg">{item.text}</span>
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Artists Section */}
			<section className="py-24 md:py-32">
				<div className="w-[90vw] max-w-5xl  mx-auto px-4 md:px-6">
					<h2 className="text-center text-3xl lg:text-5xl font-semibold mb-16 max-w-3xl mx-auto">
						<span className="bg-gradient-to-r from-white to-[#FF6B00] text-transparent bg-clip-text">Our Exclusive Offer Is Targeted Towards These Users</span>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						{artistsSectionData.map((artist, index) => (
							<div key={index} className="bg-[#1A1A1A] rounded-lg overflow-hidden">
								<div className="h-64 relative">
									<Image src={artist.image || '/placeholder.svg'} alt={artist.title} fill className="object-cover" />
								</div>
								<div className="p-6">
									<h3 className="text-white text-xl font-bold mb-2">{artist.title}</h3>
									<p className="text-gray-300 mb-4">{artist.description}</p>
									<LinkButton href={artist.link} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full">
										Get Started
									</LinkButton>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Feature Cards */}
						<div className="lg:col-span-2 md:col-span-2 flex flex-col items-center justify-center text-center bg-transparent p-8">
							<h2 className="text-3xl md:text-4xl font-bold mb-16">
								<span className="bg-gradient-to-r from-white to-[#FF6B00] text-transparent bg-clip-text">
									Discover our features,
									<br />
									Let&apos;s help you see
									<br />
									The value we offer you
								</span>
							</h2>
							<Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">Get Started</Button>
						</div>

						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-[#1A1A1A] rounded-lg p-6 flex flex-col"
								style={{
									boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
								}}
							>
								<div className="text-4xl mb-4">{feature.icon}</div>
								<h3 className="text-white text-xl font-bold mb-2">{feature.title}</h3>
								<p className="text-gray-300 text-sm flex-grow">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Explore Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
								Explore your Music with <span className="bg-gradient-to-r from-white to-[#FF6B00] text-transparent bg-clip-text">Air Play</span> Today
							</h2>
							<p className="text-white text-lg mb-12">Tap into the power of global radio and streaming platforms to ensure your music gets the recognition it deserves. Don&apos;t just create—be heard. Start your journey with Airplay Today and make every beat count!</p>
							<Button className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full px-8 py-6 text-lg">Read More</Button>
						</div>

						<div className="grid grid-cols-3 gap-4 md:gap-6">
							{exploreArtists.map((artist, index) => (
								<div key={index} className="aspect-square relative rounded-full overflow-hidden">
									<Image src={artist || '/placeholder.svg'} alt={`Artist ${index + 1}`} fill className="object-cover" />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-16 bg-[#0A0A0A]">
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex flex-col md:flex-row justify-between mb-12">
						<div className="mb-8 md:mb-0">
							<h2 className="font-bold text-xl text-white mb-4">Features</h2>
							<ul className="space-y-2">
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Royalties
									</Link>
								</li>
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Distribution
									</Link>
								</li>
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Reports and Analytics
									</Link>
								</li>
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Music Upload
									</Link>
								</li>
							</ul>
						</div>

						<div className="mb-8 md:mb-0">
							<h2 className="font-bold text-xl text-white mb-4">About Us</h2>
							<ul className="space-y-2">
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Our Team
									</Link>
								</li>
								<li>
									<Link href="#" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										Our Partners
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h2 className="font-bold text-xl text-white mb-4">Contact Us</h2>
							<ul className="space-y-2">
								<li>
									<Link href="tel:+448293-92029" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										+44-8293-92029
									</Link>
								</li>
								<li>
									<Link href="mailto:contact@airplay.com" className="text-[#9CA3AF] hover:text-[#FF6B00]">
										contact@airplay.com
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="flex justify-center mt-12">
						<Link href="/" className="text-white">
							<Image src="/assets/logo.svg" alt="Air Play" width={40} height={40} />
						</Link>
					</div>
				</div>
			</footer>
		</main>
	);
}
