'use client';

import { AppLogo } from '@/components/icons';
import { LinkButton } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DemoRequestButton } from '@/components/ui/demo-button';

const heroImages = ['/images/hero/hero1.png', '/images/hero/hero2.png', '/images/hero/hero3.png'];
const bannerItems = [
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Music Uploads' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Music Royalties' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Distributions' },
	{ icon: <Star className="text-[#FF6B00]" size={20} />, text: 'Reports and Analytics' }
];
const positions = [
	{ top: '5%', left: '15%', size: 120, delay: '0s' },
	{ top: '10%', left: '60%', size: 90, delay: '0.8s' },
	{ top: '60%', left: '5%', size: 85, delay: '0.5s' },
	{ top: '55%', left: '75%', size: 100, delay: '0.2s' },
	{ top: '35%', left: '35%', size: 80, delay: '1s' },
	{ top: '70%', left: '45%', size: 110, delay: '0.4s' },
	{ top: '0%', left: '40%', size: 70, delay: '0.6s' },
	{ top: '40%', left: '0%', size: 95, delay: '0.1s' }
];

const artistsSectionData = [
	{ image: '/images/artist/individual.png', title: 'For Individual Artists', description: 'Control your narrative and build your brand independently.', link: '/artiste/register' },
	{ image: '/images/artist/owners.png', title: 'For Management Owners', description: 'Analyze royalties, manage artists, and view detailed reports.', link: '/artiste/register' }
];
const features = [
	{ icon: '🎵', title: 'Music Uploads', description: 'Upload tracks with metadata for optimal distribution, ensuring your music reaches the right platforms.' },
	{ icon: '📊', title: 'Earnings & Analytics', description: 'Track your revenue, streaming stats, and performance metrics in real-time.' },
	{ icon: '🔗', title: 'Sharable Smart Link', description: 'Customized sharable links that direct fans to your music across all major streaming platforms.' },
	{ icon: '⚡', title: 'Swift Onboarding', description: 'Get started in minutes with a streamlined process that ensures your profile is ready for the music world.' },
	{ icon: '📈', title: 'Daily Statistics', description: 'Stay updated with daily performance metrics and audience engagement with your earnings.' },
	{ icon: '🎞️', title: 'Video Uploads', description: 'Upload high-quality videos to showcase your music and connect with fans on streaming platforms.' }
];
const exploreArtists = ['/images/artist/Magnito1.png', '/images/artist/Tesh Carter 1.jpeg.jpg', '/images/artist/Portable 1.jpg', '/images/artist/Tesh Carter 2.jpeg.jpg', '/images/artist/Magnito2.jpg', '/images/artist/Tesh Carter.jpeg.jpg', '/images/artist/iwan.png', '/images/artist/Portable.jpeg.jpg'];

// --- REFINED COMPONENT ---

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroImages.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<main className="bg-[#0D0D0D] text-white min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="relative h-screen overflow-hidden">
				<div className="absolute inset-0">
					{heroImages.map((img, index) => (
						<div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
							<Image src={img} alt={`Hero background ${index + 1}`} fill className="object-cover" priority={index === 0} />
							<div className="absolute inset-0 bg-black/60"></div>
						</div>
					))}
				</div>

				<header className="relative z-20 container mx-auto pt-6 px-4 md:px-6">
					<nav className="flex justify-between items-center">
						<Link href="/" aria-label="Home">
							<AppLogo />
						</Link>
						<div className="hidden md:flex gap-8 items-center">
							<Link href="#features" className="text-gray-300 hover:text-white transition-colors">
								Features
							</Link>
							<Link href="#about" className="text-gray-300 hover:text-white transition-colors">
								About Us
							</Link>
							<Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
								Contact Us
							</Link>
						</div>
						<div className="flex items-center gap-2">
							<DemoRequestButton />
							<LinkButton href="/artiste/register" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full px-5 py-2.5">
								Get Started
							</LinkButton>
						</div>
					</nav>
				</header>

				<div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
					<h1 className="text-5xl md:text-7xl font-bold animate-fade-in-up">Empower your Music.</h1>
					<h2 className="text-5xl md:text-7xl font-bold text-white/80 mt-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
						Own your journey.
					</h2>
					<p className="max-w-xl mt-6 text-gray-300 text-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
						The definitive platform for artists. From production to global distribution, take control of your sound.
					</p>
					<div className="mt-10 flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
						<DemoRequestButton />
						<LinkButton href="/artiste/login" size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full">
							Get Started
						</LinkButton>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#0D0D0D] to-transparent z-10" />
				<div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden z-20">
					<div className="marquee-container h-full flex items-center bg-[#1A1A1A]/80 backdrop-blur-sm -rotate-2 scale-110">
						<div className="marquee-content flex animate-marquee whitespace-nowrap">
							{[...Array(4)].map((_, i) =>
								bannerItems.map((item, index) => (
									<div key={`${i}-${index}`} className="flex items-center gap-3 mx-8 text-sm">
										{item.icon}
										<span>{item.text}</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Artists Section */}
			<section id="about" className="py-24 md:py-32">
				<div className="container mx-auto px-4 md:px-6">
					<h2 className="text-center text-4xl lg:text-5xl font-bold mb-16 max-w-3xl mx-auto">
						<span className="bg-gradient-to-r from-white to-[#FF8C42] text-transparent bg-clip-text">Built For The Modern Artist & Their Team</span>
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{artistsSectionData.map((artist, index) => (
							<div key={index} className="glassmorphism-card group rounded-2xl overflow-hidden p-8 flex flex-col items-center text-center">
								<div className="w-full h-56 relative mb-6 rounded-lg overflow-hidden">
									<Image src={artist.image} alt={artist.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
								</div>
								<h3 className="text-white text-2xl font-bold mb-2">{artist.title}</h3>
								<p className="text-gray-300 mb-6 flex-grow">{artist.description}</p>
								<LinkButton href={artist.link} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full mt-auto">
									Get Started
								</LinkButton>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="relative py-24 md:py-32 overflow-hidden">
				{/* Subtle background radial gradient for depth */}
				<div className="absolute inset-0 -z-10 bg-[#1A1A1A] bg-opacity-40">
					<div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-radial-gradient-orange opacity-10 rounded-full"></div>
				</div>

				<div className="container mx-auto px-4 md:px-6">
					<div className="text-center mb-20 animate-fade-in-up">
						<h2 className="text-4xl md:text-5xl font-bold mb-4">
							<span className="bg-gradient-to-r from-white to-[#FF8C42] text-transparent bg-clip-text">Discover The Value We Offer</span>
						</h2>
						<p className="text-lg text-gray-400 max-w-2xl mx-auto">Explore the tools designed to amplify your reach and streamline your career.</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								// Added group for hover effects and staggered animation
								className="glassmorphism-card p-8 rounded-2xl flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-orange animate-fade-in-up"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Styled icon container */}
								<div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-white/5 group-hover:bg-[#FF8C42]/20 transition-colors duration-300">
									<span className="text-3xl">{feature.icon}</span>
								</div>

								<h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
								<p className="text-gray-400 text-sm leading-relaxed flex-grow">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Explore Section */}
			<section className="py-24 md:py-40">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl md:text-6xl font-bold mb-6">
								Explore Your Music with <span className="bg-gradient-to-r from-white to-[#FF8C42] text-transparent bg-clip-text">My AirPlay</span> Today
							</h2>
							<p className="text-gray-300 text-lg mb-10">Tap into the power of global radio and streaming platforms. Don&#39;t just create—be heard. Start your journey with Airplay and make every beat count!</p>
							<Button className="group bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-full px-8 py-3 text-lg transition-transform hover:scale-105">Read More</Button>
						</div>
						{/* Right Side: Curated Artist Image Collage */}
						<div className="relative h-96 w-full">
							{exploreArtists.map((artist, index) => {
								// Use the predefined position for the current image, or fallback gracefully if not defined
								const pos = positions[index] || { top: 0, left: 0, size: 80, delay: '0s' };

								return (
									<div
										key={index}
										className="absolute rounded-full overflow-hidden shadow-lg border-2 border-[#1A1A1A]"
										style={{
											width: `${pos.size}px`,
											height: `${pos.size}px`,
											top: pos.top,
											left: pos.left,
											// The 'float' animation uses the predefined delay for a staggered, natural effect
											animation: `float 6s ease-in-out ${pos.delay} infinite alternate`
										}}
									>
										<Image src={artist} alt={`Artist ${index + 1}`} fill className="object-cover" />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer id="contact" className="py-20 bg-[#1A1A1A] bg-opacity-40">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
						<div className="col-span-2 md:col-span-1">
							<Link href="/" className="mb-4 inline-block">
								<AppLogo />
							</Link>
							<p className="text-gray-400 pr-4">Your music&#39;s global journey starts here.</p>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Features</h3>
							<ul className="space-y-3">
								<li>
									<Link href="#" className="text-gray-400 hover:text-[#FF6B00]">
										Royalties
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-400 hover:text-[#FF6B00]">
										Distribution
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-400 hover:text-[#FF6B00]">
										Analytics
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-400 hover:text-[#FF6B00]">
										Music Upload
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Company</h3>
							<ul className="space-y-3">
								<li>
									<Link href="#" className="text-gray-400 hover:text-[#FF6B00]">
										About Us
									</Link>
								</li>
								<li>
									<Link href="/policies/terms" className="text-gray-400 hover:text-[#FF6B00]">
										Terms & Condition
									</Link>
								</li>
								<li>
									<Link href="/policies/privacy" className="text-gray-400 hover:text-[#FF6B00]">
										Privacy Policy
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-4">Contact</h3>
							<ul className="space-y-3">
								<li>
									<a href="tel:+2348293-92029" className="text-gray-400 hover:text-[#FF6B00]">
										+44-8293-92029
									</a>
								</li>
								<li>
									<a href="mailto:info@myairplay.com" className="text-gray-400 hover:text-[#FF6B00]">
										info@myairplay.com
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
						<p>&copy; {new Date().getFullYear()} My AirPlay. All Rights Reserved.</p>
						{/* Social links can go here */}
					</div>
				</div>
			</footer>
		</main>
	);
}
