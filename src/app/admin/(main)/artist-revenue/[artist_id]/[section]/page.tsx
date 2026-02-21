'use client';

import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArtistOverview, ArtistAnalytics, ArtistTransactions } from '../../misc/components';
import { AccountCoins } from '../../misc/icons';
import { useGetOneArtist } from '../../../catalogue/api/getOneArtist';
import { useGetAllWithdrawalSlips } from '../../../catalogue/api/getAllWithdrawalSlips';
import { useGetArtistAnalytics } from '../../../catalogue/api/getArtistAnalytics';
import { WithdrawalSlipData } from '@/lib/types';
import { TrendingUp, TrendingDown, Wallet, CreditCard, ArrowDownRight, ArrowUpRight, Music, Globe, Receipt, ArrowLeftRight } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { Currency, useCurrency } from '@/app/artiste/context/CurrencyContext';
import { NairaIcon } from '@/components/ui/naira-icon';
import { Button } from '@/components/ui/button';

const normalizeCurrency = (currency?: string | null): Currency => {
	switch (currency?.toLowerCase()) {
		case 'naira':
		case 'ngn':
			return 'NGN';
		case 'dollar':
		case 'usd':
			return 'USD';
		case 'euro':
		case 'eur':
			return 'EUR';
		case 'pounds':
		case 'gbp':
			return 'GBP';
		default:
			return 'NGN';
	}
};

const ArtistRevenueDetails: React.FC = () => {
	const { section, artist_id } = useParams<{ artist_id: string; section: string }>();
	const { convertCurrency, currency: contextCurrency, setCurrency } = useCurrency();

	const { data: artist } = useGetOneArtist({ artistId: artist_id });

	// Detect artist's currency from bank details
	const artistCurrency = normalizeCurrency(artist?.bankDetails?.currency);
	const hasOtherCurrency = artistCurrency !== 'NGN';

	// Reset to NGN when entering this page and on unmount
	useEffect(() => {
		setCurrency('NGN');
		return () => setCurrency('NGN');
	}, [setCurrency]);

	const toggleCurrency = () => {
		setCurrency(contextCurrency === 'NGN' ? artistCurrency : 'NGN');
	};

	// Fetch withdrawal slips
	const { data: withdrawalsData } = useGetAllWithdrawalSlips({
		page: 1,
		limit: 2000,
		artistId: artist_id
	});

	// Fetch artist analytics for additional stats
	const { data: artistAnalytics } = useGetArtistAnalytics({ artistId: artist_id });

	const allWithdrawalSlipsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];

	// Filter transactions by status
	const allPendingDebits = allWithdrawalSlipsRaw.filter(slip => slip.status === 'Pending');
	const allDebitTransactions = allWithdrawalSlipsRaw.filter(slip => slip.status === 'Pending' || slip.status === 'Approved' || slip.status === 'Paid');
	const allCreditTransactions = allWithdrawalSlipsRaw.filter(slip => slip.status !== 'Pending' && slip.status !== 'Cancelled');
	const allCancelledTransactions = allWithdrawalSlipsRaw.filter(slip => slip.status === 'Cancelled');

	// Calculate totals
	const totalPendingRoyalty = allPendingDebits.reduce((sum, slip) => {
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const totalDebitRoyalty = allDebitTransactions.reduce((sum, slip) => {
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const totalCreditRoyalty = allCreditTransactions.reduce((sum, slip) => {
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const totalCancelledAmount = allCancelledTransactions.reduce((sum, slip) => {
		const royalty = Number(slip.totalRevenue) || 0;
		return sum + royalty;
	}, 0);

	const balance = totalCreditRoyalty - totalPendingRoyalty;

	// Calculate analytics stats
	const totalStreams = artistAnalytics?.totalStreams || 0;
	const totalCountries = artistAnalytics?.countryBreakdown ? Object.keys(artistAnalytics.countryBreakdown).length : 0;
	const totalPlatforms = artistAnalytics?.dspBreakdown ? Object.keys(artistAnalytics.dspBreakdown).length : 0;

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
		<div className="space-y-6">
			{/* Artist Header Section */}
			<section className="rounded-lg p-6 bg-custom-gradient">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
					<div className="flex gap-4 items-center">
						<div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
							<AccountCoins className="size-8" />
						</div>
						<div>
							<h2 className="text-xl font-bold">{artist?.artistName || 'Loading...'}</h2>
							<p className="text-sm text-white/60">{`${artist?.firstName || ''} ${artist?.lastName || ''}`}</p>
							<p className="text-xs text-white/50">{artist?.email || ''}</p>
						</div>
					</div>
					<div className="flex items-center gap-4">
						{hasOtherCurrency && (
							<Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 hover:text-white gap-2" onClick={toggleCurrency}>
								<ArrowLeftRight className="w-4 h-4" />
								{contextCurrency === 'NGN' ? `View in ${artistCurrency}` : 'View in NGN'}
							</Button>
						)}
						<div className="text-right">
							<p className="text-xs text-white/60 uppercase tracking-wider">Available Balance</p>
							<h3 className="text-3xl font-bold text-primary">{formatCurrency(convertCurrency(balance), contextCurrency)}</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Revenue Stats Cards */}
			<div className="grid grid-cols-2 gap-4">
				{/* Net Revenue (Total Revenue Made) */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
							<NairaIcon className="w-5 h-5 text-emerald-500" />
						</div>
						<TrendingUp className="w-4 h-4 text-emerald-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Net Revenue</p>
					<p className="text-lg font-semibold text-emerald-500">{formatCurrency(convertCurrency(totalCreditRoyalty), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">Total revenue made</p>
				</div>

				{/* Balance */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<Wallet className="w-5 h-5 text-primary" />
						</div>
						<span className={`text-xs font-medium px-2 py-0.5 rounded ${balance >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{balance >= 0 ? 'Positive' : 'Negative'}</span>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Available Balance</p>
					<p className={`text-lg font-semibold ${balance >= 0 ? 'text-primary' : 'text-red-500'}`}>{formatCurrency(convertCurrency(balance), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">Credits - Pending Debits</p>
				</div>
			</div>

			{/* Financial Stats Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{/* Total Credits */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
							<ArrowUpRight className="w-5 h-5 text-green-500" />
						</div>
						<TrendingUp className="w-4 h-4 text-green-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Credits</p>
					<p className="text-lg font-semibold text-green-500">{formatCurrency(convertCurrency(totalCreditRoyalty), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">{allCreditTransactions.length} transactions</p>
				</div>

				{/* Total Debits */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
							<ArrowDownRight className="w-5 h-5 text-orange-500" />
						</div>
						<Wallet className="w-4 h-4 text-orange-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Debits</p>
					<p className="text-lg font-semibold text-orange-500">{formatCurrency(convertCurrency(totalDebitRoyalty), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">
						{allDebitTransactions.length} withdrawals ({allPendingDebits.length} pending)
					</p>
				</div>

				{/* Cancelled */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
							<CreditCard className="w-5 h-5 text-red-500" />
						</div>
						<TrendingDown className="w-4 h-4 text-red-500" />
					</div>
					<p className="text-xs text-muted-foreground mb-1">Cancelled</p>
					<p className="text-lg font-semibold text-red-500">{formatCurrency(convertCurrency(totalCancelledAmount), contextCurrency)}</p>
					<p className="text-xs text-muted-foreground mt-1">{allCancelledTransactions.length} cancelled</p>
				</div>

				{/* Total Transactions */}
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center justify-between mb-2">
						<div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<Receipt className="w-5 h-5 text-blue-500" />
						</div>
						<span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">All</span>
					</div>
					<p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
					<p className="text-lg font-semibold text-blue-500">{allWithdrawalSlipsRaw.length}</p>
					<p className="text-xs text-muted-foreground mt-1">Credits + Debits + Cancelled</p>
				</div>
			</div>

			{/* Performance Stats */}
			<div className="grid grid-cols-3 gap-4">
				<div className="rounded-lg p-4 bg-card border border-border flex items-center gap-4">
					<div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
						<Music className="w-6 h-6 text-purple-500" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Total Streams</p>
						<p className="text-xl font-bold">{totalStreams.toLocaleString()}</p>
					</div>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border flex items-center gap-4">
					<div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
						<Globe className="w-6 h-6 text-blue-500" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Countries</p>
						<p className="text-xl font-bold">{totalCountries}</p>
					</div>
				</div>

				<div className="rounded-lg p-4 bg-card border border-border flex items-center gap-4">
					<div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
						<CreditCard className="w-6 h-6 text-orange-500" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Platforms</p>
						<p className="text-xl font-bold">{totalPlatforms}</p>
					</div>
				</div>
			</div>

			{/* Tabs Section */}
			<Tabs value={section} className="w-full bg-card border border-border p-4 rounded-lg">
				<TabsList className="bg-transparent border-b border-border w-full justify-start gap-6 h-auto p-0 mb-2">
					{tabs.map(tab => (
						<Link href={tab.path} key={tab.value} replace>
							<TabsTrigger value={tab.value} className="pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 data-[state=active]:bg-transparent text-sm font-medium">
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
