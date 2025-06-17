'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Cog, User, Lock, Wallet2, UserMinus } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionAccount, SectionBankDetails, SectionPassword, SectionProfile } from './misc/components';

export default function SettingsPage() {
	const searchParams = useSearchParams();
	const section = searchParams.get('section') || 'profile';

	return (
		<div className="container max-w-5xl mx-auto py-8 md:px-4">
			<div className="flex items-center gap-2 mb-8">
				<Cog className="h-6 w-6" />
				<h1 className="text-2xl font-semibold">Settings</h1>
			</div>

			<div className="flex flex-col gap-8">
				<Tabs defaultValue={section} value={section} className="w-full">
					<TabsList className="bg-transparent border-b border-border w-full justify-start mb-6">
						<Link href="?section=profile" replace>
							<TabsTrigger value="profile" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
								<User className="h-4 w-4" />
								Profile Information
							</TabsTrigger>
						</Link>

						<Link href="?section=password" replace>
							<TabsTrigger value="password" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
								<Lock className="h-4 w-4" />
								Password
							</TabsTrigger>
						</Link>

						<Link href="?section=bank" replace>
							<TabsTrigger value="bank" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
								<Wallet2 className="h-4 w-4" />
								Bank Details
							</TabsTrigger>
						</Link>

						<Link href="?section=account" replace>
							<TabsTrigger value="account" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4">
								<UserMinus className="h-4 w-4" />
								Account
							</TabsTrigger>
						</Link>
					</TabsList>

					<TabsContent value="profile" className="mt-0">
						<SectionProfile />
					</TabsContent>

					<TabsContent value="password" className="mt-0">
						<SectionPassword />
					</TabsContent>

					<TabsContent value="bank" className="mt-0">
						<SectionBankDetails />
					</TabsContent>

					<TabsContent value="account" className="mt-0">
						<SectionAccount />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
