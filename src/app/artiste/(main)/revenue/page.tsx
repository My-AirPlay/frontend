'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useAuthContext } from '@/contexts/AuthContext'; // Assumes you have an auth context
import { WithdrawalSlipData } from '@/lib/types';
import { DataTable, Badge, Button } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { formatCurrency } from '@/utils/currency';
import { ArrowDownLeft, ArrowUpRight, Download, Wallet } from 'lucide-react';
import { useGetAllWithdrawalSlips } from '@/app/artiste/(main)/dashboard/misc/api';
import { useRouter } from 'next/navigation';

// A new, simplified type for the artist's transaction view
type Transaction = {
	date: string;
	description: string;
	type: 'Credit' | 'Debit';
	status: string;
	amount: number;
};

const ArtistRevenuePage: React.FC = () => {
	const { artist } = useAuthContext();
	const artistId = artist!._id;
	const router = useRouter();
	const { data: withdrawalsData, isLoading } = useGetAllWithdrawalSlips({
		page: 1,
		limit: 2000,
		artistId: artistId
	});
	const allTransactionsRaw: WithdrawalSlipData[] = withdrawalsData?.data || [];

	const creditTransactions = allTransactionsRaw.filter(slip => slip.status !== 'Pending');
	const debitTransactions = allTransactionsRaw.filter(slip => slip.status === 'Pending');

	const totalCredits = creditTransactions.reduce((sum, slip) => sum + (Number(slip.totalRevenue) || 0), 0);
	const totalDebits = debitTransactions.reduce((sum, slip) => sum + (Number(slip.totalRevenue) || 0), 0);
	const balance = totalCredits - totalDebits;

	// 4. Combine and sort all transactions for display in the table
	const allTransactions = useMemo<Transaction[]>(() => {
		const formattedCredits: Transaction[] = creditTransactions.map(slip => {
			let description = `Royalty Payout (${slip.activityPeriods.join(', ')})`;
			if (slip.activityPeriods.length == 0) {
				description = 'Account credit by Admin';
			}
			return {
				date: slip.createdAt,
				description: description,
				type: 'Credit' as const,
				status: slip.status,
				amount: Number(slip.totalRevenue) || 0
			};
		});

		const formattedDebits: Transaction[] = debitTransactions.map(slip => ({
			date: slip.createdAt,
			description: slip.notes || '',
			type: 'Debit' as const,
			status: slip.status,
			amount: Number(slip.totalRevenue) || 0
		}));

		return [...formattedCredits, ...formattedDebits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}, [creditTransactions, debitTransactions]);

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
					const isCredit = row.original.status !== 'Pending';
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
				cell: ({ row }) => formatCurrency(row.original.amount, 'NGN')
			},
			{
				accessorKey: 'action',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.original.status;
					let variant: 'success' | 'destructive' | 'secondary' = 'secondary';
					if (status === 'Processed') variant = 'success';
					if (status === 'Rejected') variant = 'destructive';
					return <Badge variant={variant}>Processed</Badge>;
				}
			}
		],
		[]
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
					<p className="text-3xl font-bold text-white">{formatCurrency(balance, 'NGN')}</p>
				</div>
				<div className="bg-secondary rounded-lg p-6">
					<h3 className="font-medium text-muted-foreground mb-2">Total Credits</h3>
					<p className="text-3xl font-bold text-success">{formatCurrency(totalCredits, 'NGN')}</p>
				</div>
				<div className="bg-secondary rounded-lg p-6">
					<h3 className="font-medium text-muted-foreground mb-2">Total Debits</h3>
					<p className="text-3xl font-bold text-destructive">{formatCurrency(totalDebits, 'NGN')}</p>
				</div>
			</section>

			{/* Transaction History Section */}
			<section>
				<h2 className="text-xl font-semibold mb-4">Transaction History</h2>
				<DataTable data={allTransactions} columns={columns} />
			</section>
		</div>
	);
};

export default ArtistRevenuePage;
