'use client';
import { AppLogo } from '@/components/icons';
import { LinkButton } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function PoliciesLayout({ children }: { children: ReactNode }) {
	const pathName = usePathname();
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="h-16 p-4 flex items-center space-x-3 mb-6">
				<LinkButton href="/" variant="outline">
					<ChevronLeft />
					Home
				</LinkButton>
				<AppLogo />
				<h1 className="text-2xl md:text-3xl font-medium md:font-semibold ">Policies</h1>
			</div>

			<Tabs defaultValue={pathName || '/policies/privacy'} className="w-full">
				<TabsList className="w-full bg-transparent border-b border-gray-800 justify-start space-x-6 rounded-none h-auto pb-2 overflow-x-auto">
					<Link href="/policies/privacy" replace>
						<TabsTrigger value="/policies/privacy" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Privacy Policy
						</TabsTrigger>
					</Link>
					<Link href="/policies/terms" replace>
						<TabsTrigger value="/policies/terms" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Terms & Conditions
						</TabsTrigger>
					</Link>
					<Link href="/policies/cookies" replace>
						<TabsTrigger value="/policies/cookies" className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none">
							Cookie Policy
						</TabsTrigger>
					</Link>
				</TabsList>

				<div className="mt-6">{children}</div>
			</Tabs>
		</div>
	);
}
