'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArtistOverview, ArtistAnalytics, ArtistTransactions } from '../../misc/components';
import { AccountCoins } from '../../misc/icons';
import { useGetOneArtist } from '../../../catalogue/api/getOneArtist';
import { useGetAllWithdrawalSlips } from '../../../catalogue/api/getAllWithdrawalSlips'; // Added import
import { WithdrawalSlipData } from '@/lib/types'; // Added import

const ArtistRevenueDetails: React.FC = () => {
	const { section, artist_id } = useParams<{ artist_id: string; section: string }>();

	const { data: artist } = useGetOneArtist({ artistId: artist_id });

	// Fetch withdrawal slips
	const { data: withdrawalsData } = useGetAllWithdrawalSlips({
		page: 1,
		limit: 2000, // Fetching a large limit to get all pending ones
		artistId: artist_id
	});
	const allWithdrawalSlipsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];

	// Filter pending withdrawal slips
	const allDebitTransactions = allWithdrawalSlipsRaw.filter(slip => slip.status === 'Pending');

	const allCreditTransactions = allWithdrawalSlipsRaw.filter(slip => slip.status !== 'Pending');
	// Calculate total pending royalty
	const totalPendingRoyalty = allDebitTransactions.reduce((sum, slip) => {
		// Ensure totalRoyalty is treated as a number, default to 0 if undefined or null
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const totalCreditRoyalty = allCreditTransactions.reduce((sum, slip) => {
		// Ensure totalRoyalty is treated as a number, default to 0 if undefined or null
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const tabs = [
		{
			title: 'Details',
			value: 'details',
			path: `./details`,
			// Convert to number only if artist_id is a valid number string, otherwise pass 0 or handle error
			component: <ArtistOverview />
		},
		{
			title: 'Analytics',
			value: 'analytics',
			path: `./analytics`,
			// Convert to number only if artist_id is a valid number string, otherwise pass 0 or handle error
			component: <ArtistAnalytics />
		},
		{
			title: 'Transaction',
			value: 'transactions',
			path: `./transactions`,
			component: <ArtistTransactions /> // Keep as string for this component
		}
	];

	return (
		<div className="space-y-8">
			<section className="flex flex-col gap-10 rounded-lg p-4 md:p-6 bg-custom-gradient">
				<div className="flex gap-4 items-center">
					<AccountCoins className="size-12" />
					<div>
						<p className="text-sm text-white/60">Total Revenue Made</p>
						<h3 className="text-2xl font-bold">{`₦${parseFloat(parseFloat(artist?.totalRoyaltyUSD || '0').toFixed(2)).toLocaleString()}`}</h3>
					</div>
				</div>

				<div className=" pb-5">
					<div className="flex flex-wrap gap-6 gap-y-4 md:gap-x-8 text-sm">
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Artist Name</p>
							<p className="font-normal">{artist?.artistName || '-'}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Artist Real Name</p>
							<p className="font-normal">{`${artist?.firstName || '-'} ${artist?.lastName || '-'}`}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Email Address</p>
							<p className="font-normal">{artist?.email || '-'}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Revenue Generated</p>
							<p className="font-medium">{`₦${parseFloat(parseFloat(artist?.totalRoyaltyUSD || '0').toFixed(2)).toLocaleString()}`}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Credits</p>
							<p className="font-normal">{`₦${parseFloat(totalCreditRoyalty.toFixed(2)).toLocaleString() || 0}`}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-white/60 text-xs font-light">Debits</p>
							{/* Display calculated pending royalty */}
							<p className="font-normal">{`₦${parseFloat(totalPendingRoyalty.toFixed(2)).toLocaleString() || 0}`}</p>
						</div>
					</div>
				</div>
			</section>

			<h2 className="text-xl font-semibold">Overview</h2>

			<Tabs value={section} className="w-full bg-custom-gradient p-4 rounded-lg">
				<TabsList className="bg-transparent border-b border-border w-full justify-start gap-4 h-auto p-0">
					{tabs.map(tab => (
						<Link href={tab.path} key={tab.value} replace>
							<TabsTrigger key={tab.value} value={tab.value} className={`pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 data-[state=active]:bg-transparent`}>
								{tab.title}
							</TabsTrigger>
						</Link>
					))}
				</TabsList>

				{tabs.map(tab => (
					<TabsContent key={tab.value} value={tab.value} className="mt-6">
						{tab.component}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default ArtistRevenueDetails;
