'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Cog, User, Lock, Wallet2, UserMinus, FileText } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionAccount, SectionBankDetails, SectionContract, SectionPassword, SectionProfile } from './misc/components';

export default function SettingsPage() {
	const searchParams = useSearchParams();
	const section = searchParams.get('section') || 'profile';

	return (
		<div className="container max-w-5xl mx-auto py-8 px-4">
			<div className="flex items-center gap-2 mb-8">
				<Cog className="h-6 w-6" />
				<h1 className="text-2xl font-semibold">Settings</h1>
			</div>

			<div className="flex flex-col gap-8">
				<Tabs defaultValue={section} value={section} className="w-full">
					<TabsList className="bg-transparent border-b border-border w-full justify-start mb-6 overflow-x-auto no-scrollbar">
						<Link href="?section=profile" replace>
							<TabsTrigger value="profile" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-3 md:px-4">
								<User className="h-4 w-4 shrink-0" />
								<span className="hidden sm:inline">Profile</span>
							</TabsTrigger>
						</Link>

						<Link href="?section=password" replace>
							<TabsTrigger value="password" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-3 md:px-4">
								<Lock className="h-4 w-4 shrink-0" />
								<span className="hidden sm:inline">Password</span>
							</TabsTrigger>
						</Link>

						<Link href="?section=bank" replace>
							<TabsTrigger value="bank" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-3 md:px-4">
								<Wallet2 className="h-4 w-4 shrink-0" />
								<span className="hidden sm:inline">Bank Details</span>
							</TabsTrigger>
						</Link>

						<Link href="?section=contract" replace>
							<TabsTrigger value="contract" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-3 md:px-4">
								<FileText className="h-4 w-4 shrink-0" />
								<span className="hidden sm:inline">Contract</span>
							</TabsTrigger>
						</Link>

						<Link href="?section=account" replace>
							<TabsTrigger value="account" className="flex gap-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-3 md:px-4">
								<UserMinus className="h-4 w-4 shrink-0" />
								<span className="hidden sm:inline">Account</span>
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

					<TabsContent value="contract" className="mt-0">
						<SectionContract />
					</TabsContent>

					<TabsContent value="account" className="mt-0">
						<SectionAccount />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
