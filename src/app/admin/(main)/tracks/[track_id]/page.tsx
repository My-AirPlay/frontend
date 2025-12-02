'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Trash2, Copy, Save, Plus, Loader2, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useParams } from 'next/navigation';
import { useDeleteTrack, useGetTrack, useUpdateTrack } from '@/app/admin/(main)/tracks/api/trackHooks';

// --- Types based on your getReportData structure ---

interface StreamAnalyticsData {
	_id: string;
	firstTitle: string;
	otherTitles: string[];
	titleCount: number;
	artistName: string;
	artistId: string;
	artistRealName: string;
	activityPeriod: string; // e.g., "2023-10" or "Q3 2023"
	catalogueId?: string;
	isrcCode?: string;
	currency: string;
	total: number; // This is the calculated revenue sum
	reportId: string;
	sharedRevenue: {
		artistId: string;
		percentage: number;
		artistName: string;
		activityPeriod: string;
	}[];
}

interface SharedRevenueItem {
	artistId: string;
	artistName: string;
	percentage: number;
}

interface TrackData {
	_id: string;
	artist: string;
	trackTitle: string;
	isrcCode?: string;
	upcCode?: string;
	catalogueId?: string;
	sharedRevenue: SharedRevenueItem[];
	// The backend populates this array using getReportData logic
	streamAnalyticsRefs: StreamAnalyticsData[];
	createdAt: string;
	updatedAt: string;
}

const TrackDetailPage = () => {
	const router = useRouter();
	const { track_id } = useParams<{ track_id: string }>();
	console.log(track_id);

	// 1. API Hooks
	const { data: fetchedTrack, isLoading, isError } = useGetTrack(track_id);
	const updateMutation = useUpdateTrack();
	const deleteMutation = useDeleteTrack();

	// 2. Local State
	const [track, setTrack] = useState<TrackData | null>(null);
	const [activeTab, setActiveTab] = useState('overview');
	const [salesContracts, setSalesContracts] = useState<SharedRevenueItem[]>([]);
	const [costsContracts, setCostsContracts] = useState<SharedRevenueItem[]>([]);

	// 3. Sync State
	useEffect(() => {
		if (fetchedTrack) {
			setTrack(fetchedTrack);
			setSalesContracts(fetchedTrack.sharedRevenue || []);
			setCostsContracts([]); // Default empty for now
		}
	}, [fetchedTrack]);

	// 4. Calculate Analytics (Updated for getReportData structure)
	const analyticsSummary = useMemo(() => {
		if (!track || !track.streamAnalyticsRefs || track.streamAnalyticsRefs.length === 0) {
			return { totalRevenue: 0, currency: 'USD', history: [] };
		}

		// Sum up the 'total' field from all reports
		const totalRevenue = track.streamAnalyticsRefs.reduce((acc, curr) => acc + (curr.total || 0), 0);

		// Grab currency from first report (fallback USD)
		const currency = track.streamAnalyticsRefs[0]?.currency || 'USD';

		// Sort history by activity period (assuming strings like ISO dates or similar sortable formats)
		const history = [...track.streamAnalyticsRefs].sort((a, b) => (b.activityPeriod || '').localeCompare(a.activityPeriod || ''));

		return { totalRevenue, currency, history };
	}, [track]);

	// --- Handlers ---

	const handleInputChange = (field: keyof TrackData, value: string) => {
		setTrack(prev => (prev ? { ...prev, [field]: value } : null));
	};

	const handleDelete = () => {
		if (confirm('Are you sure you want to delete this track? This cannot be undone.')) {
			deleteMutation.mutate(track_id);
		}
	};

	const handleSave = () => {
		if (!track) return;
		const payload = {
			artist: track.artist,
			trackTitle: track.trackTitle,
			isrcCode: track.isrcCode,
			upcCode: track.upcCode,
			catalogueId: track.catalogueId,
			sharedRevenue: salesContracts
		};
		updateMutation.mutate({ id: track_id, data: payload });
	};

	const handleCopy = () => console.log('Copy not implemented');

	// --- Contract Handlers ---
	const addSalesContract = () => setSalesContracts([...salesContracts, { artistId: '', artistName: '', percentage: 0 }]);
	const removeSalesContract = (index: number) => setSalesContracts(salesContracts.filter((_, i) => i !== index));
	const updateSalesContract = (index: number, field: keyof SharedRevenueItem, value: string | number) => {
		const updated = [...salesContracts];
		// @ts-expect-error dynamic assignment
		updated[index][field] = field === 'percentage' ? Number(value) : value;
		setSalesContracts(updated);
	};

	const addCostsContract = () => setCostsContracts([...costsContracts, { artistId: '', artistName: '', percentage: 0 }]);
	const removeCostsContract = (index: number) => setCostsContracts(costsContracts.filter((_, i) => i !== index));
	const updateCostsContract = (index: number, field: keyof SharedRevenueItem, value: string | number) => {
		const updated = [...costsContracts];
		// @ts-expect-error dynamic assignment
		updated[index][field] = field === 'percentage' ? Number(value) : value;
		setCostsContracts(updated);
	};
	const copyFromSales = () => setCostsContracts([...salesContracts]);

	// --- Render ---

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<span className="ml-2 text-muted-foreground">Loading Track Details...</span>
			</div>
		);
	}

	if (isError || !track) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
				<p className="text-destructive text-lg">Failed to load track data.</p>
				<Button onClick={() => router.back()} variant="outline">
					<ArrowLeft size={16} className="mr-2" /> Go Back
				</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
					<ArrowLeft size={20} />
					<span>Back to Catalogue</span>
				</button>

				<div className="flex gap-2">
					<Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2" disabled={deleteMutation.isPending}>
						{deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
						Delete
					</Button>
					<Button onClick={handleCopy} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600">
						<Copy size={16} />
						Copy
					</Button>
					<Button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" disabled={updateMutation.isPending}>
						{updateMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
						Save
					</Button>
				</div>
			</div>

			<div className="space-y-1">
				<h1 className="text-3xl font-bold tracking-tight">{track.trackTitle}</h1>
				<p className="text-muted-foreground text-lg">{track.artist}</p>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="bg-transparent border-b border-border w-full justify-start overflow-x-auto">
					{['overview', 'rights', 'aliases', 'releases', 'analytics'].map(tab => (
						<TabsTrigger key={tab} value={tab} className="uppercase data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-6">
							{tab}
						</TabsTrigger>
					))}
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview" className="space-y-6 mt-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Artist</Label>
							<Input value={track.artist} onChange={e => handleInputChange('artist', e.target.value)} className="bg-secondary border-border" />
						</div>
						<div className="space-y-2">
							<Label>Track Title</Label>
							<Input value={track.trackTitle} onChange={e => handleInputChange('trackTitle', e.target.value)} className="bg-secondary border-border" />
						</div>
						<div className="space-y-2">
							<Label>ISRC Code</Label>
							<Input value={track.isrcCode || ''} onChange={e => handleInputChange('isrcCode', e.target.value)} className="bg-secondary border-border" />
						</div>
						<div className="space-y-2">
							<Label>UPC Code</Label>
							<Input value={track.upcCode || ''} onChange={e => handleInputChange('upcCode', e.target.value)} className="bg-secondary border-border" />
						</div>
						<div className="space-y-2">
							<Label>Catalogue ID</Label>
							<Input value={track.catalogueId || ''} onChange={e => handleInputChange('catalogueId', e.target.value)} className="bg-secondary border-border" />
						</div>
						<div className="space-y-2">
							<Label>Created At</Label>
							<Input value={new Date(track.createdAt).toLocaleDateString()} disabled className="bg-secondary border-border opacity-60" />
						</div>
					</div>
				</TabsContent>

				{/* Rights Tab */}
				<TabsContent value="rights" className="space-y-6 mt-6">
					<div>
						<h2 className="text-2xl font-light text-foreground mb-2">Participation Rates</h2>
						<p className="text-muted-foreground mb-6">Configure how revenue is split for this track.</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold uppercase">Sales/Returns</h3>
							<div className="space-y-4">
								{salesContracts.map((contract, index) => (
									<div key={index} className="grid grid-cols-[1fr_100px_40px] gap-3 items-end">
										<div className="space-y-2">
											<Label className="text-xs text-muted-foreground">CONTRACT</Label>
											<Input value={contract.artistName} onChange={e => updateSalesContract(index, 'artistName', e.target.value)} className="bg-secondary border-border" placeholder="Artist Name" />
										</div>
										<div className="space-y-2">
											<Label className="text-xs text-muted-foreground">RATE (%)</Label>
											<Input type="number" value={contract.percentage} onChange={e => updateSalesContract(index, 'percentage', e.target.value)} className="bg-secondary border-border" min="0" max="100" />
										</div>
										<Button onClick={() => removeSalesContract(index)} variant="destructive" size="icon" className="h-10 w-10">
											<Trash2 size={16} />
										</Button>
									</div>
								))}
								<Button onClick={addSalesContract} className="bg-cyan-600 hover:bg-cyan-700">
									<Plus size={16} className="mr-2" />
									Add Contract
								</Button>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold uppercase">Costs (Draft)</h3>
								<Button onClick={copyFromSales} variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white border-0">
									<Copy size={16} className="mr-2" />
									Copy from Sales
								</Button>
							</div>
							<div className="space-y-4">
								{costsContracts.map((contract, index) => (
									<div key={index} className="grid grid-cols-[1fr_100px_40px] gap-3 items-end">
										<div className="space-y-2">
											<Label className="text-xs text-muted-foreground">CONTRACT</Label>
											<Input value={contract.artistName} onChange={e => updateCostsContract(index, 'artistName', e.target.value)} className="bg-secondary border-border" />
										</div>
										<div className="space-y-2">
											<Label className="text-xs text-muted-foreground">RATE (%)</Label>
											<Input type="number" value={contract.percentage} onChange={e => updateCostsContract(index, 'percentage', e.target.value)} className="bg-secondary border-border" min="0" max="100" />
										</div>
										<Button onClick={() => removeCostsContract(index)} variant="destructive" size="icon" className="h-10 w-10">
											<Trash2 size={16} />
										</Button>
									</div>
								))}
								<Button onClick={addCostsContract} className="bg-cyan-600 hover:bg-cyan-700">
									<Plus size={16} className="mr-2" />
									Add Contract
								</Button>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="aliases" className="space-y-6 mt-6">
					<div className="text-center py-12 text-muted-foreground">
						<p>No aliases configured.</p>
					</div>
				</TabsContent>
				<TabsContent value="releases" className="space-y-6 mt-6">
					<div className="text-center py-12 text-muted-foreground">
						<p>No releases configured.</p>
					</div>
				</TabsContent>

				{/* Analytics Tab - Updated for getReportData */}
				<TabsContent value="analytics" className="space-y-6 mt-6">
					{/* Main Revenue Card */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
							<div className="relative z-10">
								<div className="flex items-center gap-2 text-blue-100 mb-2 font-medium">
									<DollarSign size={18} />
									<span>TOTAL REVENUE</span>
								</div>
								<div className="text-4xl font-bold tracking-tight">
									{analyticsSummary.currency} {analyticsSummary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
								</div>
								<p className="text-sm text-blue-200 mt-2 opacity-80">Lifetime earnings from stream analytics</p>
							</div>
						</div>
					</div>

					{/* Revenue History Table */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Calendar className="text-muted-foreground" size={20} />
							<h3 className="text-lg font-semibold uppercase">Revenue History</h3>
						</div>

						<div className="border border-border rounded-lg overflow-hidden bg-background">
							<div className="grid grid-cols-12 bg-secondary/50 font-semibold text-sm border-b border-border">
								<div className="col-span-4 p-4">ACTIVITY PERIOD</div>
								<div className="col-span-5 p-4">ARTIST NAME</div>
								<div className="col-span-3 p-4 text-right">REVENUE</div>
							</div>

							{analyticsSummary.history.length === 0 ? (
								<div className="p-8 text-center text-muted-foreground">No analytics data available for this track.</div>
							) : (
								analyticsSummary.history.map((item, index) => (
									<div key={index} className="grid grid-cols-12 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-sm">
										<div className="col-span-4 p-4 font-medium flex flex-col justify-center">
											<span>{item.activityPeriod}</span>
											<span className="text-xs text-muted-foreground truncate">{item.reportId}</span>
										</div>
										<div className="col-span-5 p-4 flex items-center text-muted-foreground">{item.artistName}</div>
										<div className="col-span-3 p-4 text-right font-mono flex items-center justify-end">
											{item.currency} {item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TrackDetailPage;
