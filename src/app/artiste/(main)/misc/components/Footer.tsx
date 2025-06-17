import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { FaSoundcloud } from 'react-icons/fa';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="px-6 text-white/50 text-[9px] md:text-xs py-1.5">
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center space-x-4 divide-x mb-2 md:mb-0">
					<span>Copyright © {currentYear} AirPlay</span>
					{/* <span>|</span> */}
					<Link href="/policies/privacy" className="hover:text-foreground">
						Privacy Policy
					</Link>
					{/* <span>|</span> */}
					<Link href="/policies/terms" className="hover:text-foreground">
						Terms of Services
					</Link>
				</div>

				<div className="flex items-center space-x-4">
					<a href="https://soundcloud.com/myairplay" className="text-white/50 hover:text-foreground">
						<FaSoundcloud size={16} />
					</a>
					<a href="https://www.linkedin.com/company/myairplay/?originalSubdomain=ng" className="text-white/50 hover:text-foreground">
						<Linkedin size={16} />
					</a>
					<a href="https://www.instagram.com/myairplay" className="text-white/50 hover:text-foreground">
						<Instagram size={16} />
					</a>
					<a href="https://www.facebook.com/MyAirplays/" className="text-white/50 hover:text-foreground">
						<Facebook size={16} />
					</a>
				</div>

				<div className="hidden md:block">
					<span>Supported by AirPlay</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
