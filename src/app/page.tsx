'use client';

import { AppLogo } from '@/components/icons';
import { LinkButton } from '@/components/ui';
import { Star, ArrowRight, Music, BarChart3, Link2, Zap, TrendingUp, Video, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { DemoRequestButton } from '@/components/ui/demo-button';

// ── Data ────────────────────────────────────────────────────────────
const heroImages = ['/images/hero/hero1.png', '/images/hero/hero2.png', '/images/hero/hero3.png'];
const bannerItems = [
	{ icon: <Star className="text-[#FF6B00]" size={16} />, text: 'Music Uploads' },
	{ icon: <Star className="text-[#FF6B00]" size={16} />, text: 'Music Royalties' },
	{ icon: <Star className="text-[#FF6B00]" size={16} />, text: 'Distributions' },
	{ icon: <Star className="text-[#FF6B00]" size={16} />, text: 'Reports and Analytics' }
];

const stats = [
	{ end: 10, suffix: 'K+', label: 'Artists' },
	{ end: 50, suffix: '+', label: 'Platforms' },
	{ end: 100, suffix: 'M+', label: 'Streams' },
	{ end: 30, suffix: '+', label: 'Countries' }
];

const artistsSectionData = [
	{ image: '/images/artist/individual.png', title: 'For Individual Artists', description: 'Control your narrative and build your brand independently.', link: '/artiste/register' },
	{ image: '/images/artist/owners.png', title: 'For Management Owners', description: 'Analyze royalties, manage artists, and view detailed reports.', link: '/artiste/register' }
];

const features: { icon: ReactNode; title: string; description: string; span?: string }[] = [
	{ icon: <Music className="w-6 h-6" />, title: 'Music Uploads', description: 'Upload tracks with metadata for optimal distribution, ensuring your music reaches the right platforms.', span: 'sm:col-span-2 lg:col-span-1 lg:row-span-2' },
	{ icon: <BarChart3 className="w-6 h-6" />, title: 'Earnings & Analytics', description: 'Track your revenue, streaming stats, and performance metrics in real-time.' },
	{ icon: <Link2 className="w-6 h-6" />, title: 'Sharable Smart Link', description: 'Customized sharable links that direct fans to your music across all major streaming platforms.' },
	{ icon: <Zap className="w-6 h-6" />, title: 'Swift Onboarding', description: 'Get started in minutes with a streamlined process that ensures your profile is ready for the music world.' },
	{ icon: <TrendingUp className="w-6 h-6" />, title: 'Daily Statistics', description: 'Stay updated with daily performance metrics and audience engagement with your earnings.' },
	{ icon: <Video className="w-6 h-6" />, title: 'Video Uploads', description: 'Upload high-quality videos to showcase your music and connect with fans on streaming platforms.', span: 'sm:col-span-2 lg:col-span-1 lg:row-span-2' }
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

const exploreArtists = ['/images/artist/Magnito1.png', '/images/artist/Tesh Carter 1.jpeg.jpg', '/images/artist/Portable 1.jpg', '/images/artist/Tesh Carter 2.jpeg.jpg', '/images/artist/Magnito2.jpg', '/images/artist/Tesh Carter.jpeg.jpg', '/images/artist/iwan.png', '/images/artist/Portable.jpeg.jpg'];

// ── Hooks ───────────────────────────────────────────────────────────

/** Triggers `visible` class when element scrolls into view */
function useReveal<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('revealed');
					obs.unobserve(el);
				}
			},
			{ threshold: 0.15 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return ref;
}

/** Animated counter — counts from 0 to `end` when visible */
function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const started = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started.current) {
					started.current = true;
					const duration = 1600;
					const startTime = performance.now();
					const tick = (now: number) => {
						const elapsed = now - startTime;
						const progress = Math.min(elapsed / duration, 1);
						// ease-out cubic
						const eased = 1 - Math.pow(1 - progress, 3);
						setCount(Math.floor(eased * end));
						if (progress < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
					obs.unobserve(el);
				}
			},
			{ threshold: 0.5 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [end]);

	return (
		<span ref={ref}>
			{count}
			{suffix}
		</span>
	);
}

// ── Component ───────────────────────────────────────────────────────

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Refs for scroll-reveal sections
	const statsRef = useReveal<HTMLDivElement>();
	const aboutRef = useReveal<HTMLDivElement>();
	const featuresRef = useReveal<HTMLDivElement>();
	const exploreRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroImages.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu on nav click
	const navLink = useCallback(
		(href: string, label: string) => (
			<Link href={href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
				{label}
			</Link>
		),
		[]
	);

	return (
		<main className="bg-[#060606] text-white min-h-screen flex flex-col overflow-x-hidden">
			{/* Grain / noise texture overlay */}
			<div className="noise-overlay" />

			{/* ─── Sticky Nav ─── */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#060606]/70 backdrop-blur-2xl border-b border-white/[0.04]' : 'bg-transparent'}`}>
				<div className="container mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
					<Link href="/" aria-label="Home">
						<AppLogo />
					</Link>

					{/* Desktop links */}
					<div className="hidden md:flex gap-8 items-center">
						{navLink('#features', 'Features')}
						{navLink('#about', 'About Us')}
						{navLink('#contact', 'Contact')}
					</div>

					<div className="flex items-center gap-3">
						<span className="hidden sm:inline-flex">
							<DemoRequestButton />
						</span>
						<LinkButton href="/artiste/register" className="hidden sm:inline-flex bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full px-6 py-2 text-sm font-medium glow-button">
							Get Started
						</LinkButton>
						{/* Mobile hamburger */}
						<button className="md:hidden p-2 text-gray-300" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Toggle menu">
							{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileMenuOpen && (
					<div className="md:hidden bg-[#060606]/95 backdrop-blur-2xl border-t border-white/5 px-6 pb-6 pt-2 space-y-4 animate-fade-in-up">
						{navLink('#features', 'Features')}
						{navLink('#about', 'About Us')}
						{navLink('#contact', 'Contact')}
						<LinkButton href="/artiste/register" className="w-full bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full text-sm font-medium text-center glow-button">
							Get Started
						</LinkButton>
					</div>
				)}
			</nav>

			{/* ─── Hero ─── */}
			<section className="relative h-screen overflow-hidden">
				{/* BG carousel */}
				<div className="absolute inset-0">
					{heroImages.map((img, index) => (
						<div key={index} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
							<Image src={img} alt={`Hero background ${index + 1}`} fill className="object-cover" priority={index === 0} />
							<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#060606]" />
						</div>
					))}
				</div>

				{/* Ambient glow */}
				<div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-[#FF6B00]/[0.07] rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
				<div className="absolute bottom-[15%] right-[15%] w-[500px] h-[500px] bg-[#FF6B00]/[0.04] rounded-full blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

				{/* Content */}
				<div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 pt-16">
					{/* Badge */}
					<div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-10 animate-fade-in-up">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75 animate-ping" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6B00]" />
						</span>
						<span className="text-xs font-medium uppercase tracking-widest text-gray-400">The #1 Platform for Independent Artists</span>
					</div>

					<h1 className="text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight animate-fade-in-up">Empower your</h1>
					<h1 className="text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight hero-gradient-text animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
						Music.
					</h1>
					<h2 className="text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white/30 mt-1 animate-fade-in-up" style={{ animationDelay: '0.22s' }}>
						Own your journey.
					</h2>

					<p className="max-w-xl mt-8 text-gray-500 text-base md:text-lg leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
						From production to global distribution, take full control of your sound, your brand, and your revenue.
					</p>

					<div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
						<DemoRequestButton />
						<LinkButton href="/artiste/login" size="lg" className="glow-button bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full px-10 font-semibold text-sm">
							Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
						</LinkButton>
					</div>

					{/* Slide indicators */}
					<div className="flex gap-2 mt-14 animate-fade-in-up" style={{ animationDelay: '0.65s' }}>
						{heroImages.map((_, i) => (
							<button key={i} onClick={() => setCurrentSlide(i)} className={`rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 h-2 bg-[#FF6B00]' : 'w-2 h-2 bg-white/15 hover:bg-white/30'}`} />
						))}
					</div>
				</div>

				{/* Marquee */}
				<div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden z-20">
					<div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
					<div className="marquee-container h-full flex items-center bg-[#060606]/80 backdrop-blur-lg">
						<div className="marquee-content flex animate-marquee whitespace-nowrap">
							{[...Array(6)].map((_, i) =>
								bannerItems.map((item, index) => (
									<div key={`${i}-${index}`} className="flex items-center gap-2.5 mx-8 text-xs font-medium tracking-wide">
										{item.icon}
										<span className="text-gray-500 uppercase">{item.text}</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</section>

			{/* ─── Stats ─── */}
			<section className="relative py-20">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
				<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

				<div ref={statsRef} className="reveal-section container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
						{stats.map((stat, index) => (
							<div key={index} className="reveal-child text-center" style={{ transitionDelay: `${index * 100}ms` }}>
								<div className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
									<AnimatedCounter end={stat.end} suffix={stat.suffix} />
								</div>
								<div className="text-[11px] text-gray-600 mt-3 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── About / Artists ─── */}
			<section id="about" className="py-28 md:py-36 relative">
				<div className="absolute top-1/2 left-0 w-[700px] h-[700px] -translate-y-1/2 -translate-x-1/2 bg-[#FF6B00]/[0.04] rounded-full blur-[180px] pointer-events-none" />

				<div ref={aboutRef} className="reveal-section container mx-auto px-4 md:px-6 relative">
					<div className="text-center mb-20 reveal-child">
						<p className="text-[#FF6B00] text-xs font-semibold uppercase tracking-[0.25em] mb-5">Who We Serve</p>
						<h2 className="text-4xl lg:text-6xl font-extrabold max-w-4xl mx-auto leading-[1.1]">
							Built For The <br className="hidden md:block" />
							<span className="hero-gradient-text">Modern Artist</span> & Their Team
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
						{artistsSectionData.map((artist, index) => (
							<div key={index} className="reveal-child group relative rounded-3xl overflow-hidden border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-700" style={{ transitionDelay: `${index * 150}ms` }}>
								{/* Top gradient line */}
								<div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

								<div className="p-6 md:p-8">
									<div className="w-full aspect-[4/3] relative mb-8 rounded-2xl overflow-hidden">
										<Image src={artist.image} alt={artist.title} fill className="object-cover transition-transform duration-[800ms] group-hover:scale-105" />
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
									</div>
									<h3 className="text-white text-xl md:text-2xl font-bold mb-2">{artist.title}</h3>
									<p className="text-gray-500 mb-8 leading-relaxed text-sm">{artist.description}</p>
									<LinkButton href={artist.link} className="glow-button bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full px-7 py-2.5 text-sm font-medium">
										Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</LinkButton>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── Features — Bento Grid ─── */}
			<section id="features" className="relative py-28 md:py-36 overflow-hidden">
				<div className="absolute inset-0 bg-[#050505]" />

				{/* Grid pattern */}
				<div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

				{/* Glow */}
				<div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#FF6B00]/[0.03] rounded-full blur-[180px] pointer-events-none" />

				<div ref={featuresRef} className="reveal-section container mx-auto px-4 md:px-6 relative">
					<div className="text-center mb-20 reveal-child">
						<p className="text-[#FF6B00] text-xs font-semibold uppercase tracking-[0.25em] mb-5">Features</p>
						<h2 className="text-4xl md:text-6xl font-extrabold mb-5">
							Everything you <span className="hero-gradient-text">need</span>
						</h2>
						<p className="text-base text-gray-600 max-w-lg mx-auto font-light">Tools designed to amplify your reach and streamline your music career.</p>
					</div>

					{/* Bento Grid: 3 cols on lg, first & last item span 2 rows */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
						{features.map((feature, index) => (
							<div key={index} className={`reveal-child feature-card group relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-7 md:p-8 flex flex-col transition-all duration-500 hover:bg-white/[0.03] ${feature.span || ''}`} style={{ transitionDelay: `${index * 80}ms` }}>
								{/* Top border glow on hover */}
								<div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								<div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center bg-white/[0.04] text-gray-500 group-hover:bg-[#FF6B00]/[0.12] group-hover:text-[#FF6B00] transition-all duration-400">{feature.icon}</div>

								<h3 className="text-white text-base font-semibold mb-2">{feature.title}</h3>
								<p className="text-gray-600 text-sm leading-relaxed flex-grow">{feature.description}</p>

								{/* Subtle arrow hint */}
								<div className="mt-5 text-gray-700 group-hover:text-[#FF6B00] transition-colors duration-300">
									<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ─── Explore ─── */}
			<section className="py-28 md:py-40 relative">
				<div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 bg-[#FF6B00]/[0.04] rounded-full blur-[180px] pointer-events-none" />

				<div ref={exploreRef} className="reveal-section container mx-auto px-4 md:px-6 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
						<div>
							<p className="reveal-child text-[#FF6B00] text-xs font-semibold uppercase tracking-[0.25em] mb-5">Get Started Today</p>
							<h2 className="reveal-child text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1]" style={{ transitionDelay: '100ms' }}>
								Explore Your Music with <span className="hero-gradient-text">My AirPlay</span>
							</h2>
							<p className="reveal-child text-gray-500 text-base md:text-lg mb-10 leading-relaxed font-light" style={{ transitionDelay: '200ms' }}>
								Tap into the power of global radio and streaming platforms. Don&#39;t just create—be heard. Make every beat count.
							</p>
							<div className="reveal-child" style={{ transitionDelay: '300ms' }}>
								<LinkButton href="/artiste/register" className="glow-button bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full px-8 py-3 text-sm font-semibold">
									Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
								</LinkButton>
							</div>
						</div>

						{/* Collage */}
						<div className="relative h-[400px] md:h-[450px] w-full reveal-child" style={{ transitionDelay: '200ms' }}>
							{/* Orbit rings */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/[0.04] animate-spin-very-slow" />
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#FF6B00]/[0.06]" />
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/[0.03]" />

							{/* Center glow */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-[60px]" />

							{exploreArtists.map((artist, index) => {
								const pos = positions[index] || { top: 0, left: 0, size: 80, delay: '0s' };
								return (
									<div
										key={index}
										className="absolute rounded-full overflow-hidden ring-2 ring-white/[0.06] hover:ring-[#FF6B00]/40 transition-all duration-500 hover:scale-110 hover:z-10"
										style={{
											width: `${pos.size}px`,
											height: `${pos.size}px`,
											top: pos.top,
											left: pos.left,
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

			{/* ─── CTA ─── */}
			<section className="py-28 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#FF6B00]/[0.03] to-[#060606]" />
				<div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/15 to-transparent" />
				<div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6B00]/15 to-transparent" />
				{/* Centered glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/[0.05] rounded-full blur-[150px] pointer-events-none" />

				<div ref={ctaRef} className="reveal-section container mx-auto px-4 md:px-6 text-center relative">
					<p className="reveal-child text-[#FF6B00] text-xs font-semibold uppercase tracking-[0.25em] mb-5">Ready?</p>
					<h2 className="reveal-child text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1]" style={{ transitionDelay: '100ms' }}>
						Amplify your <span className="hero-gradient-text">reach</span> today
					</h2>
					<p className="reveal-child text-gray-500 text-base mb-10 max-w-md mx-auto font-light" style={{ transitionDelay: '200ms' }}>
						Join thousands of artists who trust My AirPlay to distribute their music worldwide.
					</p>
					<div className="reveal-child flex flex-col sm:flex-row justify-center gap-4" style={{ transitionDelay: '300ms' }}>
						<DemoRequestButton />
						<LinkButton href="/artiste/register" size="lg" className="glow-button bg-[#FF6B00] hover:bg-[#FF8C42] text-white rounded-full px-10 font-semibold text-sm">
							Start Free <ArrowRight className="ml-2 h-4 w-4" />
						</LinkButton>
					</div>
				</div>
			</section>

			{/* ─── Footer ─── */}
			<footer id="contact" className="py-20 bg-[#040404] border-t border-white/[0.04]">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 text-sm">
						<div className="col-span-2 md:col-span-1">
							<Link href="/" className="mb-5 inline-block">
								<AppLogo />
							</Link>
							<p className="text-gray-600 pr-4 leading-relaxed text-sm">Your music&#39;s global journey starts here.</p>
						</div>
						<div>
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Features</h3>
							<ul className="space-y-3">
								<li>
									<Link href="#" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Royalties
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Distribution
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Analytics
									</Link>
								</li>
								<li>
									<Link href="#" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Music Upload
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Company</h3>
							<ul className="space-y-3">
								<li>
									<Link href="#" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										About Us
									</Link>
								</li>
								<li>
									<Link href="/policies/terms" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Terms & Condition
									</Link>
								</li>
								<li>
									<Link href="/policies/privacy" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										Privacy Policy
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Contact</h3>
							<ul className="space-y-3">
								<li>
									<a href="tel:+2348293-92029" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										+44-8293-92029
									</a>
								</li>
								<li>
									<a href="mailto:info@myairplay.com" className="text-gray-600 hover:text-[#FF6B00] transition-colors duration-300 text-sm">
										info@myairplay.com
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-700">
						<p>&copy; {new Date().getFullYear()} My AirPlay. All Rights Reserved.</p>
					</div>
				</div>
			</footer>
		</main>
	);
}
