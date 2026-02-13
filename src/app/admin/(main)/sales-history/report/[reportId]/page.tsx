'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useGetReportAnalytics } from '@/app/admin/(main)/catalogue/api/getReportAnalytics';
import { useUpdateReportRate } from '@/app/admin/(main)/catalogue/api/updateReportRate';
import { PreviousPageButton, Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/utils/currency';
import { BarChart3, Music, Globe, Users, TrendingUp, RefreshCw, Loader2, ArrowRight, AlertTriangle, FileText, Settings } from 'lucide-react';
import { NairaIcon } from '@/components/ui/naira-icon';

const CHART_COLORS = ['#8b5cf6', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316'];

const ReportAnalyticsPage: React.FC = () => {
	const params = useParams<{ reportId: string }>();
	const reportId = decodeURIComponent(params.reportId);
	const router = useRouter();

	const { data: analytics, isLoading, isError, refetch, isRefetching } = useGetReportAnalytics(reportId);
	const updateRateMutation = useUpdateReportRate();

	const [activeTab, setActiveTab] = useState('overview');
	const [newRate, setNewRate] = useState('');
	const [fromCurrency, setFromCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');
	const [isReprocessPending, startReprocessTransition] = useTransition();

	// Chart data
	const dspChartData = useMemo(() => {
		if (!analytics?.dspBreakdown) return [];
		return analytics.dspBreakdown.map((dsp, index) => ({
			name: dsp.name,
			revenue: dsp.netRevenue,
			streams: dsp.streams,
			color: CHART_COLORS[index % CHART_COLORS.length]
		}));
	}, [analytics]);

	const countryChartData = useMemo(() => {
		if (!analytics?.countryBreakdown) return [];
		return analytics.countryBreakdown.slice(0, 10).map((country, index) => ({
			name: country.name,
			revenue: country.netRevenue,
			streams: country.streams,
			color: CHART_COLORS[index % CHART_COLORS.length]
		}));
	}, [analytics]);

	const trackChartData = useMemo(() => {
		if (!analytics?.trackBreakdown) return [];
		return analytics.trackBreakdown.slice(0, 10).map(track => ({
			name: track.trackTitle.length > 20 ? track.trackTitle.substring(0, 20) + '...' : track.trackTitle,
			fullName: track.trackTitle,
			revenue: track.netRevenue,
			streams: track.streams
		}));
	}, [analytics]);

	const handleUpdateRate = () => {
		if (!newRate || isNaN(parseFloat(newRate)) || parseFloat(newRate) <= 0) return;

		updateRateMutation.mutate(
			{ reportId, newRate: parseFloat(newRate), fromCurrency },
			{
				onSuccess: () => {
					setNewRate('');
					refetch();
				}
			}
		);
	};

	const handleReprocess = () => {
		startReprocessTransition(() => {
			router.push(`/admin/sales-history/process/${encodeURIComponent(reportId)}`);
		});
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<LoadingBox size={62} />
			</div>
		);
	}

	if (isError || !analytics) {
		return (
			<div className="space-y-6">
				<PreviousPageButton />
				<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
					<AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
					<h2 className="text-xl font-semibold mb-2">Failed to load report analytics</h2>
					<p className="text-muted-foreground">Please try again later or contact support.</p>
				</div>
			</div>
		);
	}

	const { summary, trackBreakdown, exchangeRateInfo, activityPeriods } = analytics;

	return (
		<div className="space-y-6">
			<PreviousPageButton />

			{/* Header */}
			<div className="flex items-center gap-4">
				<div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
					<FileText className="w-7 h-7 text-blue-500" />
				</div>
				<div className="flex-1 min-w-0">
					<h1 className="text-xl md:text-2xl font-semibold truncate">{reportId}</h1>
					{activityPeriods && activityPeriods.length > 0 && <p className="text-sm text-muted-foreground">Periods: {activityPeriods.join(', ')}</p>}
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<Music className="w-4 h-4 text-blue-500" />
						<p className="text-xs text-muted-foreground">Streams</p>
					</div>
					<p className="text-lg font-bold">{summary.totalStreams?.toLocaleString()}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<NairaIcon className="w-4 h-4 text-purple-500" />
						<p className="text-xs text-muted-foreground">Gross</p>
					</div>
					<p className="text-lg font-bold text-purple-500">{formatCurrency(summary.totalGrossRevenue, 'NGN')}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<TrendingUp className="w-4 h-4 text-green-500" />
						<p className="text-xs text-muted-foreground">Net</p>
					</div>
					<p className="text-lg font-bold text-green-500">{formatCurrency(summary.totalNetRevenue, 'NGN')}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<BarChart3 className="w-4 h-4 text-orange-500" />
						<p className="text-xs text-muted-foreground">Avg/Stream</p>
					</div>
					<p className="text-lg font-bold">{formatCurrency(summary.averageStreamValue || 0, 'NGN')}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<Music className="w-4 h-4 text-cyan-500" />
						<p className="text-xs text-muted-foreground">Tracks</p>
					</div>
					<p className="text-lg font-bold">{summary.trackCount}</p>
				</div>
				<div className="rounded-lg p-4 bg-card border border-border">
					<div className="flex items-center gap-2 mb-2">
						<Users className="w-4 h-4 text-pink-500" />
						<p className="text-xs text-muted-foreground">Artists</p>
					</div>
					<p className="text-lg font-bold">{summary.artistCount}</p>
				</div>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="bg-card border border-border w-full justify-start gap-4 h-auto p-1">
					<TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
						<BarChart3 className="w-4 h-4 mr-2" />
						Overview
					</TabsTrigger>
					<TabsTrigger value="reprocess" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
						<RefreshCw className="w-4 h-4 mr-2" />
						Reprocess
					</TabsTrigger>
					<TabsTrigger value="currency" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
						<Settings className="w-4 h-4 mr-2" />
						Update Currency
					</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview" className="mt-6 space-y-6">
					{/* DSP Revenue Chart */}
					{dspChartData.length > 0 && (
						<div className="rounded-lg border border-border p-4 bg-card">
							<h3 className="font-semibold mb-4 flex items-center gap-2">
								<BarChart3 className="w-4 h-4" />
								Revenue by Platform (DSP)
							</h3>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={dspChartData} margin={{ top: 5, right: 20, left: 10, bottom: 40 }}>
										<CartesianGrid strokeDasharray="3 3" stroke="#383838" />
										<XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} angle={-30} textAnchor="end" />
										<YAxis tick={{ fontSize: 10, fill: '#888' }} tickFormatter={v => `₦${(v / 1000000).toFixed(1)}M`} />
										<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value, 'NGN')} />
										<Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Country Distribution Pie */}
						{countryChartData.length > 0 && (
							<div className="rounded-lg border border-border p-4 bg-card">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<Globe className="w-4 h-4" />
									Revenue by Country
								</h3>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie data={countryChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="revenue">
												{countryChartData.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={entry.color} />
												))}
											</Pie>
											<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value, 'NGN')} />
											<Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span className="text-xs">{v}</span>} />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</div>
						)}

						{/* Top Tracks Chart */}
						{trackChartData.length > 0 && (
							<div className="rounded-lg border border-border p-4 bg-card">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<Music className="w-4 h-4" />
									Top Tracks by Revenue
								</h3>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={trackChartData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
											<CartesianGrid strokeDasharray="3 3" stroke="#383838" />
											<XAxis type="number" tick={{ fontSize: 10, fill: '#888' }} tickFormatter={v => `₦${(v / 1000).toFixed(0)}K`} />
											<YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#888' }} width={95} />
											<Tooltip contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #383838', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value, 'NGN')} labelFormatter={(_, payload) => payload[0]?.payload?.fullName} />
											<Bar dataKey="revenue" fill="#22c55e" radius={[0, 4, 4, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						)}
					</div>

					{/* Track Breakdown Table */}
					{trackBreakdown && trackBreakdown.length > 0 && (
						<div className="rounded-lg border border-border overflow-hidden">
							<div className="bg-card p-4 border-b border-border">
								<h3 className="font-semibold flex items-center gap-2">
									<Music className="w-4 h-4" />
									Track Breakdown ({trackBreakdown.length})
								</h3>
							</div>
							<div className="overflow-x-auto max-h-[400px]">
								<table className="w-full">
									<thead className="bg-muted/50 sticky top-0">
										<tr>
											<th className="text-left p-3 text-xs font-medium text-muted-foreground">Track</th>
											<th className="text-right p-3 text-xs font-medium text-muted-foreground">Streams</th>
											<th className="text-right p-3 text-xs font-medium text-muted-foreground">Gross</th>
											<th className="text-right p-3 text-xs font-medium text-muted-foreground">Net</th>
											<th className="text-right p-3 text-xs font-medium text-muted-foreground">Rate</th>
										</tr>
									</thead>
									<tbody>
										{trackBreakdown.map((track, index) => (
											<tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30">
												<td className="p-3 text-sm font-medium">{track.trackTitle}</td>
												<td className="p-3 text-sm text-right">{track.streams.toLocaleString()}</td>
												<td className="p-3 text-sm text-right text-purple-500">{formatCurrency(track.grossRevenue, 'NGN')}</td>
												<td className="p-3 text-sm text-right text-green-500">{formatCurrency(track.netRevenue, 'NGN')}</td>
												<td className="p-3 text-sm text-right font-mono">₦{track.originalRate.toLocaleString()}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</TabsContent>

				{/* Reprocess Tab */}
				<TabsContent value="reprocess" className="mt-6">
					<div className="max-w-xl mx-auto">
						<div className="rounded-lg border border-border p-6 bg-card text-center">
							<div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
								<RefreshCw className="w-8 h-8 text-blue-500" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Reprocess Report</h3>
							<p className="text-muted-foreground mb-6">Reprocessing will recalculate all analytics for this report. This is useful if the original data has been updated or if there were processing errors.</p>
							<Button onClick={handleReprocess} size="lg" disabled={isReprocessPending}>
								{isReprocessPending ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Loading...
									</>
								) : (
									<>
										<RefreshCw className="w-4 h-4 mr-2" />
										Go to Reprocess Page
									</>
								)}
							</Button>
						</div>
					</div>
				</TabsContent>

				{/* Update Currency Tab */}
				<TabsContent value="currency" className="mt-6">
					<div className="max-w-xl mx-auto">
						{/* Refetching indicator */}
						{isRefetching && (
							<div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2">
								<Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
								<span className="text-sm text-blue-500">Refreshing data with updated exchange rate...</span>
							</div>
						)}

						<div className="rounded-lg border border-border p-6 bg-card relative">
							{/* Loading overlay when refetching */}
							{isRefetching && (
								<div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center z-10">
									<Loader2 className="w-8 h-8 text-primary animate-spin" />
								</div>
							)}

							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
									<NairaIcon className="w-6 h-6 text-orange-500" />
								</div>
								<div>
									<h3 className="text-lg font-semibold">Update Exchange Rate</h3>
									<p className="text-sm text-muted-foreground">Change the exchange rate for this report</p>
								</div>
							</div>

							{/* Current Rates */}
							{exchangeRateInfo && exchangeRateInfo.rates && Object.keys(exchangeRateInfo.rates).length > 0 && (
								<div className="mb-6 p-4 bg-muted/50 rounded-lg">
									<div className="flex items-center justify-between mb-2">
										<p className="text-sm font-medium">Current Exchange Rates:</p>
										{exchangeRateInfo.isDefault && (
											<Badge variant="secondary" className="text-xs">
												Default Rate
											</Badge>
										)}
									</div>
									<div className="flex flex-wrap gap-3">
										{Object.entries(exchangeRateInfo.rates).map(([currency, rate]) => (
											<div key={currency} className="flex items-center gap-2 bg-background px-3 py-2 rounded-md border">
												<span className="font-mono text-sm font-medium">{currency}</span>
												<ArrowRight className="w-3 h-3 text-muted-foreground" />
												<span className="text-sm">₦{(rate as number).toLocaleString()}</span>
											</div>
										))}
									</div>
									{exchangeRateInfo.createdAt && <p className="text-xs text-muted-foreground mt-2">Last updated: {new Date(exchangeRateInfo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>}
								</div>
							)}

							<div className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">From Currency</label>
									<Select value={fromCurrency} onValueChange={v => setFromCurrency(v as 'USD' | 'GBP' | 'EUR')} disabled={updateRateMutation.isPending || isRefetching}>
										<SelectTrigger>
											<SelectValue placeholder="Select currency" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="USD">USD (US Dollar)</SelectItem>
											<SelectItem value="GBP">GBP (British Pound)</SelectItem>
											<SelectItem value="EUR">EUR (Euro)</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">New Rate (to NGN)</label>
									<div className="relative">
										<span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground pointer-events-none">₦</span>
										<Input type="number" placeholder="e.g., 1650" value={newRate} onChange={e => setNewRate(e.target.value)} className="pl-7" min="0" step="0.01" disabled={updateRateMutation.isPending || isRefetching} />
									</div>
									<p className="text-xs text-muted-foreground">
										1 {fromCurrency} = ₦{newRate || '0'}
									</p>
								</div>

								<div className="pt-4 flex gap-3">
									<Button onClick={handleUpdateRate} disabled={updateRateMutation.isPending || isRefetching || !newRate || parseFloat(newRate) <= 0} className="flex-1">
										{updateRateMutation.isPending ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												Updating...
											</>
										) : isRefetching ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												Refreshing...
											</>
										) : (
											<>
												<RefreshCw className="w-4 h-4 mr-2" />
												Update Rate
											</>
										)}
									</Button>
								</div>

								<div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
									<div className="flex gap-2">
										<AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
										<div className="text-sm">
											<p className="font-medium text-yellow-500">Important</p>
											<p className="text-muted-foreground mt-1">Updating the exchange rate will recalculate all revenue values for this report and update any related withdrawal transactions.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ReportAnalyticsPage;
