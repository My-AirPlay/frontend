/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useAuthContext } from '@/contexts/AuthContext'; // Assumes you have an auth context
import { WithdrawalSlipData } from '@/lib/types';
import { DataTable, Badge, Button } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { formatCurrency } from '@/utils/currency';
import { ArrowDownLeft, ArrowUpRight, Download, Wallet, Calendar } from 'lucide-react';
import { useGetAllWithdrawalSlips, useGetDashboardData } from '@/app/artiste/(main)/dashboard/misc/api';
import { useRouter } from 'next/navigation';
import { useCurrency, Currency } from '@/app/artiste/context/CurrencyContext';

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

// A new, simplified type for the artist's transaction view
type Transaction = {
	date: string;
	description: string;
	type: 'Credit' | 'Debit';
	status: string;
	amount: number;
};

interface MonthlyBreakdownRow {
	period: string;
	streams: number;
	revenue: number;
}

const getBaseRate = (currency: string): number => {
	switch (currency?.toUpperCase()) {
		case 'USD':
			return 1610;
		case 'EUR':
			return 1365;
		case 'GBP':
			return 2300;
		default:
			return 1;
	}
};

const ArtistRevenuePage: React.FC = () => {
	const { artist } = useAuthContext();
	const artistId = artist!._id;
	const artistCurrency = normalizeCurrency(artist?.bankDetails?.currency);
	const router = useRouter();
	const { setCurrency, currency } = useCurrency();
	const { data: dashboardData } = useGetDashboardData();

	// Use the backend-provided currency if available, otherwise use artist's profile currency
	const displayCurrency = dashboardData?.currency || artistCurrency;

	// Ensure the context matches the artist's display currency
	useEffect(() => {
		if (displayCurrency && displayCurrency !== currency) {
			setCurrency(displayCurrency as any);
		}
	}, [displayCurrency, currency, setCurrency]);

	const baseRate = getBaseRate(displayCurrency);

	const { data: withdrawalsData, isLoading } = useGetAllWithdrawalSlips({
		page: 1,
		limit: 2000,
		artistId: artistId
	});
	const allTransactionsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];

	const creditTransactions = allTransactionsRaw.filter(slip => slip.status !== 'Pending');
	const debitTransactions = allTransactionsRaw.filter(slip => slip.status === 'Pending');

	const totalCredits = creditTransactions.reduce((sum, slip) => {
		const rate = slip.exchangeRate && slip.exchangeRate !== 1 ? slip.exchangeRate : baseRate;
		return sum + (Number(slip.totalRevenue) || 0) / rate;
	}, 0);
	const totalDebits = debitTransactions.reduce((sum, slip) => {
		const rate = slip.exchangeRate && slip.exchangeRate !== 1 ? slip.exchangeRate : baseRate;
		return sum + (Number(slip.totalRevenue) || 0) / rate;
	}, 0);
	const balance = totalCredits - totalDebits;

	// 4. Combine and sort all transactions for display in the table
	const allTransactions = useMemo<Transaction[]>(() => {
		const formattedCredits: Transaction[] = creditTransactions.map(slip => {
			let description = `Royalty Payout (${slip.activityPeriods.join(', ')})`;
			if (slip.activityPeriods.length == 0) {
				description = slip.notes || 'Account credit by Admin';
			}
			const rate = slip.exchangeRate && slip.exchangeRate !== 1 ? slip.exchangeRate : baseRate;
			return {
				date: slip.createdAt,
				description: description,
				type: 'Credit' as const,
				status: slip.status,
				amount: (Number(slip.totalRevenue) || 0) / rate
			};
		});

		const formattedDebits: Transaction[] = debitTransactions.map(slip => {
			const rate = slip.exchangeRate && slip.exchangeRate !== 1 ? slip.exchangeRate : baseRate;
			return {
				date: slip.createdAt,
				description: slip.notes || 'Withdrawal',
				type: 'Debit' as const,
				status: slip.status,
				amount: (Number(slip.totalRevenue) || 0) / rate
			};
		});

		return [...formattedCredits, ...formattedDebits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}, [creditTransactions, debitTransactions, baseRate]);

	// Monthly breakdown calculated directly from the transaction history (Slips)
	// This ensures that if there are multiple payments (CSV or manual) for one month, they are summed.
	const monthlyBreakdown = useMemo<MonthlyBreakdownRow[]>(() => {
		const totals: Record<string, { streams: number; revenue: number; period: string }> = {};

		// Process all transactions to build the monthly summary
		allTransactionsRaw.forEach(slip => {
			if (slip.status === 'Cancelled') return;

			const rate = slip.exchangeRate && slip.exchangeRate !== 1 ? slip.exchangeRate : baseRate;
			const amount = (Number(slip.totalRevenue) || 0) / rate;
			const isCredit = slip.status !== 'Pending';

			// Use the activity periods from the slip
			const periods = slip.activityPeriods && slip.activityPeriods.length > 0 ? slip.activityPeriods : ['Adjustment']; // Fallback for manual slips with no period

			periods.forEach((period: string) => {
				if (!totals[period]) {
					totals[period] = { period, streams: 0, revenue: 0 };
				}
				totals[period].revenue += isCredit ? amount : -amount;
			});
		});

		// Add stream counts from analytics (since slips don't have stream counts)
		if (dashboardData?.periodSummary) {
			Object.entries(dashboardData.periodSummary).forEach(([period, data]) => {
				if (totals[period]) {
					totals[period].streams = data.totalStreams;
				}
			});
		}

		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		return Object.values(totals)
			.filter(row => row.period !== 'Adjustment' || row.revenue !== 0)
			.sort((a, b) => {
				const [aMonth, aYear] = a.period.split('-').map(s => s.trim());
				const [bMonth, bYear] = b.period.split('-').map(s => s.trim());
				const yearDiff = Number(bYear) - Number(aYear);
				if (yearDiff !== 0) return yearDiff;
				return months.indexOf(bMonth) - months.indexOf(aMonth);
			});
	}, [dashboardData, allTransactionsRaw, baseRate]);

	const monthlyColumns = useMemo<ColumnDef<MonthlyBreakdownRow>[]>(
		() => [
			{
				accessorKey: 'period',
				header: 'Reporting Period',
				cell: ({ row }) => (
					<div className="flex items-center gap-2">
						<Calendar size={14} className="text-muted-foreground" />
						<span className="font-medium">{row.original.period}</span>
					</div>
				)
			},
			{
				accessorKey: 'streams',
				header: 'Streams',
				cell: ({ row }) => row.original.streams.toLocaleString()
			},
			{
				accessorKey: 'revenue',
				header: 'Revenue',
				cell: ({ row }) => <span className="text-primary font-medium">{formatCurrency(row.original.revenue, displayCurrency)}</span>
			}
		],
		[displayCurrency]
	);

	// 5. Define columns for the transaction table
	const columns = useMemo<ColumnDef<Transaction>[]>(
		() => [
			{
				accessorKey: 'date',
				header: 'Date',
				cell: ({ row }) => new Date(row.original.date).toLocaleDateString()
			},
			{
				accessorKey: 'description',
				header: 'Description'
			},
			{
				accessorKey: 'type',
				header: 'Type',
				cell: ({ row }) => {
					const isCredit = row.original.type === 'Credit';
					return (
						<Badge variant={isCredit ? 'success' : 'secondary'} className="flex items-center gap-1">
							{isCredit ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
							{row.original.type}
						</Badge>
					);
				}
			},
			{
				accessorKey: 'amount',
				header: 'Amount',
				cell: ({ row }) => formatCurrency(row.original.amount, currency)
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.original.status;
					let variant: 'success' | 'destructive' | 'secondary' = 'secondary';
					if (status === 'Processed') variant = 'success';
					if (status === 'Rejected') variant = 'destructive';
					return <Badge variant={variant}>{status}</Badge>;
				}
			}
		],
		[currency]
	);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<LoadingBox />
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="flex justify-end">
				<Button className="max-md:size-10 max-md:p-0" onClick={() => router.push('/artiste/revenue/export')}>
					<Download size={16} className="md:mr-2" />
					<span className="max-md:sr-only">Export Reports</span>
				</Button>
			</div>
			<h1 className="text-2xl font-semibold">My Revenue</h1>

			{/* Summary Section */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-custom-gradient rounded-lg p-6">
					<div className="flex items-center gap-4 text-white/80 mb-2">
						<Wallet size={20} />
						<h3 className="font-medium">Available Balance</h3>
					</div>
					<p className="text-3xl font-bold text-white">{formatCurrency(balance, currency)}</p>
				</div>
				<div className="bg-secondary rounded-lg p-6">
					<h3 className="font-medium text-muted-foreground mb-2">Total Credits</h3>
					<p className="text-3xl font-bold text-success">{formatCurrency(totalCredits, currency)}</p>
				</div>
				<div className="bg-secondary rounded-lg p-6">
					<h3 className="font-medium text-muted-foreground mb-2">Total Debits</h3>
					<p className="text-3xl font-bold text-destructive">{formatCurrency(totalDebits, currency)}</p>
				</div>
			</section>

			{/* Monthly Revenue Breakdown */}
			{monthlyBreakdown.length > 0 && (
				<section>
					<h2 className="text-xl font-semibold mb-4">Revenue by Month</h2>
					<DataTable data={monthlyBreakdown} columns={monthlyColumns} />
				</section>
			)}

			{/* Transaction History Section */}
			<section>
				<h2 className="text-xl font-semibold mb-4">Transaction History</h2>
				<DataTable data={allTransactions} columns={columns} />
			</section>
		</div>
	);
};

export default ArtistRevenuePage;
