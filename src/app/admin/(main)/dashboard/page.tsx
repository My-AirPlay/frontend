'use client';

import React, { useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { SiAudiomack, SiSpotify, SiApplemusic, SiYoutube } from 'react-icons/si'; // Removed SiDeezer
import { TbBrandDeezer } from 'react-icons/tb'; // Added correct Deezer icon import
import { FaDollarSign } from 'react-icons/fa'; // Added react-icons imports
// Import necessary icons from lucide-react for recent sales
import { ChevronRight, ArrowLeft, ArrowRight, Filter, Disc, Music, Video, RadioTower, Download, Users, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMobile, useWindowWidth } from '@/hooks';
import { useGetAdminMedia } from '../catalogue/api';
import moment from 'moment';
import { useGetAllAlbums } from '../catalogue/api/getAdminGetAllAlbums';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useGetFullAnalysis } from './api/getFullAnalysis';

// Define an interface for the DSP data structure
interface DspData {
	name: string;
	totalStreams: number;
	totalRevenue: number;
	periodBreakdown?: Record<string, { streams?: number; revenue?: number }>; // Add optional periodBreakdown
}

// Define an interface for the period summary data structure
interface PeriodSummaryData {
	totalStreams: number;
	totalRevenue: number;
}

// Helper function to get Sale icon based on type
const getSaleIcon = (type: string | undefined) => {
	const iconSize = 16; // Smaller icon size for the list
	const iconColor = 'hsl(var(--primary))'; // Use primary color

	switch (type?.toLowerCase()) {
		case 'streaming':
			return <RadioTower size={iconSize} color={iconColor} />;
		case 'download':
			return <Download size={iconSize} color={iconColor} />;
		case 'ugc': // User Generated Content
			return <Users size={iconSize} color={iconColor} />;
		case 'audio tier':
			return <AudioLines size={iconSize} color={iconColor} />;
		case 'webcasting':
			return <RadioTower size={iconSize} color={iconColor} />; // Similar to streaming
		// Add more cases as needed
		default:
			return <FaDollarSign size={iconSize} color={iconColor} />; // Default icon
	}
};

// Helper function to get DSP icon
const getDspIcon = (name: string | undefined) => {
	const iconSize = 24; // Adjust size as needed
	const iconColor = '#ffffff'; // Default white color, adjust if needed

	switch (name?.toLowerCase()) {
		case 'audiomack':
			return <SiAudiomack size={iconSize} color={iconColor} />;
		case 'spotify':
			return <SiSpotify size={iconSize} color={iconColor} />;
		case 'apple music':
			return <SiApplemusic size={iconSize} color={iconColor} />;
		case 'youtube streaming': // Match the exact name from data
		case 'youtube':
			return <SiYoutube size={iconSize} color={iconColor} />;
		case 'deezer':
			return <TbBrandDeezer size={iconSize} color={iconColor} />; // Use correct Deezer icon
		// Add more cases for other DSPs if needed
		default:
			return <FaDollarSign size={iconSize} color={iconColor} />; // Default icon
	}
};

// Update chartConfig for the new data structure
const chartConfig = {
	totalRevenue: {
		label: 'Revenue', // Label for the single data series
		color: 'hsl(var(--primary))' // Use primary color
	},
	totalStreams: {
		label: 'Streams', // Updated label for better readability
		color: 'hsl(var(--foreground))'
	}
} satisfies ChartConfig;

const Dashboard: React.FC = () => {
	const isMobile = useMobile();
	const windowWidth = useWindowWidth();

	const { data: audio, isLoading: audioLoading } = useGetAdminMedia({ type: 'audio' });
	const { data: video, isLoading: videoLoading } = useGetAdminMedia({ type: 'video' });
	const { data: albums, isLoading: albumsLoading } = useGetAllAlbums({});
	const { data: analysis, isLoading: analysisLoading } = useGetFullAnalysis({});
	const [currentDspIndex, setCurrentDspIndex] = useState(0);
	const [activeSalesTab, setActiveSalesTab] = useState<'All' | 'Revenue' | 'Expenses'>('All'); // State for sales tabs including Expenses

	// Memoize topDSPs to avoid unnecessary recalculations
	const topDSPs = useMemo(() => analysis?.topDSPs || [], [analysis]);

	// Process periodSummary for the chart
	const chartData = useMemo(() => {
		if (!analysis?.periodSummary) {
			return [];
		}
		return Object.entries(analysis.periodSummary)
			.map(([monthYear, data]) => {
				// Attempt to parse the date for sorting
				const date = moment(monthYear, 'MMMM YYYY').toDate();
				return {
					month: moment(date).isValid() ? moment(date).format('MMM YYYY') : monthYear, // Format for display
					// Cast data to PeriodSummaryData here to resolve TS error
					totalStreams: (data as PeriodSummaryData).totalStreams || 0,
					totalRevenue: (data as PeriodSummaryData).totalRevenue || 0,
					date: date // Keep original date for sorting
				};
			})
			.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort chronologically
	}, [analysis]);

	// Process deliveryBreakdown for recent sales display
	const recentSales = useMemo(() => {
		if (!analysis?.deliveryBreakdown) {
			return [];
		}

		// Ensure deliveryBreakdown is treated as an object with periodBreakdown
		const breakdown = analysis.deliveryBreakdown as Record<string, DspData>; // Use DspData which includes periodBreakdown

		return Object.entries(breakdown)
			.map(([type, data]) => {
				let mostRecentDate = 'N/A'; // Default date
				if (data.periodBreakdown && Object.keys(data.periodBreakdown).length > 0) {
					// Find the most recent date key
					const dates = Object.keys(data.periodBreakdown).map(key => moment(key, 'MMMM YYYY').toDate());
					const validDates = dates.filter(date => moment(date).isValid());
					if (validDates.length > 0) {
						validDates.sort((a, b) => b.getTime() - a.getTime()); // Sort descending
						mostRecentDate = moment(validDates[0]).format('DD MMM YYYY'); // Format the most recent date
					}
				}

				return {
					id: type, // Use type as a unique identifier
					type: type, // Use the delivery type name (e.g., "Streaming", "UGC")
					// Format the revenue amount with '₦' and two decimal places
					amount: `₦${(data.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
					date: mostRecentDate, // Use the determined most recent date
					revenue: true, // Assuming all these are revenue entries
					icon: getSaleIcon(type) // Get the appropriate icon
				};
			})
			.sort((a, b) => {
				// Optional: Sort sales by date if needed, handling 'N/A'
				const dateA = a.date === 'N/A' ? 0 : moment(a.date, 'DD MMM YYYY').valueOf();
				const dateB = b.date === 'N/A' ? 0 : moment(b.date, 'DD MMM YYYY').valueOf();
				return dateB - dateA; // Sort descending by date
			});
	}, [analysis]); // Dependency array includes analysis

	// Filtered recent sales based on the active tab
	const filteredRecentSales = useMemo(() => {
		if (activeSalesTab === 'Revenue') {
			// Filter for items marked as revenue
			return recentSales.filter(sale => sale.revenue);
		} else if (activeSalesTab === 'Expenses') {
			// Filter for items marked as expenses (currently none)
			return recentSales.filter(sale => !sale.revenue); // Assuming !sale.revenue indicates an expense
		}
		return recentSales; // 'All' tab shows everything
	}, [recentSales, activeSalesTab]);

	// Mock data - Ensure data access is safe even if analysis is loading/undefined
	const uploads = [
		{ id: 1, type: 'Music - Tracks', lastUploaded: audio?.data?.[0]?.createdAt, category: 'Tracks', count: audio?.total || 0, icon: <Music color="#fe6b02" size={24} /> },
		{ id: 2, type: 'Music - Album', lastUploaded: video?.data?.[0]?.createdAt, category: 'Album', count: video?.total || 0, icon: <Disc color="#fe6b02" size={24} /> },
		{ id: 3, type: 'Music - Videos', lastUploaded: albums?.data?.[0]?.createdAt, category: 'Videos', count: albums?.total || 0, icon: <Video color="#fe6b02" size={24} /> }
	];

	// analysis?.periodSummary?.map((x)=>({month:x.}))

	return (
		<div className="space-y-8">
			<div className="flex justify-between">
				<div></div>
				<Button variant="outline" className="flex items-center gap-2 bg-secondary border-border text-foreground hover:bg-accent/50">
					<Filter size={16} />
					<span className="max-sm:hidden">Filter</span>
				</Button>
			</div>

			<section className="grid md:[grid-template-columns:repeat(auto-fill,minmax(375px,1fr))] gap-x-8 gap-y-5 md:items-stretch">
				<article className="flex flex-col">
					<header className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-normal">Uploads</h2>
						<Link href="/admin/catalogue" className="text-sm text-white/70-foreground hover:text-foreground flex items-center">
							View All <ChevronRight size={16} />
						</Link>
					</header>

					<div className="grid gap-8 rounded-lg bg-custom-gradient px-6 py-4">
						{audioLoading || videoLoading || albumsLoading ? (
							<div className="w-full px-6 py-4 flex justify-center items-center">
								<LoadingBox size={32} />
							</div>
						) : (
							uploads?.map(upload => (
								<div key={upload?.id} className="">
									<div className="flex justify-between items-center">
										<div className="flex items-center space-x-3">
											<div className="bg-accent p-2 rounded-md">{upload?.icon}</div>
											<div>
												<h3 className="max-md:text-sm font-medium capitalize">{upload?.type}</h3>
												<p className="text-[0.7rem] md:text-xs text-white/70 ">Last Uploaded: {moment(upload?.lastUploaded).format('DD MMM, YYYY')}</p>
											</div>
										</div>
										<div className="md:text-xl font-bold bg-[#272727] p-2.5 rounded-md">{upload?.count?.toLocaleString()}</div>
									</div>
								</div>
							))
						)}
					</div>
				</article>

				<article className="flex flex-col">
					<header className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-normal">Total Revenue</h2>
					</header>

					<div className="p-4 px-8 rounded-lg bg-custom-gradient grow">
						{analysisLoading ? (
							<div className="w-full px-6 py-4 flex justify-center items-center">
								<LoadingBox size={32} />
							</div>
						) : (
							<>
								<div className="mb-4 flex justify-between items-center gap-4">
									<h3 className="text-2xl font-bold">₦{analysis?.totalRevenue?.toLocaleString() || 0}</h3>
									<p className="text-sm text-white/70">All Revenue</p>
								</div>

								{topDSPs.length > 0 ? (
									<div className="space-y-4">
										{/* Container for smooth cross-fade */}
										<div className="relative min-h-[120px]">
											{' '}
											{/* Adjust min-h as needed */}
											<AnimatePresence>
												<motion.div
													key={currentDspIndex} // Key change triggers animation
													initial={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }} // Absolute positioning
													animate={{ opacity: 1, position: 'absolute', top: 0, left: 0, right: 0 }}
													exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
													transition={{ duration: 0.3 }} // Adjust duration as needed
													className=" w-full" // Ensure full width
												>
													<p className="text-sm text-white/70">Revenue type</p>
													<div className="flex justify-between items-center">
														<div>
															<h4 className="text-sm font-medium">{topDSPs[currentDspIndex]?.name || 'N/A'}</h4>
															<p className="text-sm text-white/70">Streaming</p>
														</div>
														<div className="flex flex-col items-center">
															<div className="w-6 h-6 flex items-center justify-center mb-1">{getDspIcon(topDSPs[currentDspIndex]?.name)}</div>
															<span className="text-sm font-bold">₦{topDSPs[currentDspIndex]?.totalRevenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</span>
														</div>
													</div>
												</motion.div>
											</AnimatePresence>
										</div>

										<div className="mt-14">
											<div className="flex justify-between items-center ">
												<button
													onClick={() => {
														setCurrentDspIndex(prev => Math.max(0, prev - 1));
													}}
													disabled={currentDspIndex === 0}
													className="flex items-center text-white/70 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<ArrowLeft size={16} className="mr-1" />
													<span className="text-sm">Previous</span>
												</button>

												<div className="flex space-x-1">
													{topDSPs.map((_: DspData, index: number) => (
														<motion.button
															whileTap={{ scale: 0.8 }}
															whileHover={{ scale: 1.2 }}
															transition={{ type: 'spring' }}
															onClick={() => {
																setCurrentDspIndex(index);
															}}
															key={index}
															className={`w-2 h-2 rounded-full transition ${index === currentDspIndex ? 'bg-primary hover:bg-accent' : 'bg-accent hover:bg-primary'} `}
														/>
													))}
												</div>

												<button
													onClick={() => {
														setCurrentDspIndex(prev => Math.min(topDSPs.length - 1, prev + 1));
													}}
													disabled={currentDspIndex === topDSPs.length - 1}
													className="flex items-center text-white/70 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<span className="text-sm">Next</span>
													<ArrowRight size={16} className="ml-1" />
												</button>
											</div>
										</div>
									</div>
								) : (
									<p className="text-sm text-white/70 text-center py-4">No DSP data available.</p>
								)}
							</>
						)}
					</div>
				</article>
			</section>

			<div className="border-t my-6 "></div>

			<section className="grid lg:grid-cols-[0.5fr,1fr] gap-x-8 gap-y-5 lg:items-stretch  max-w-[1300px]">
				<article>
					<header className="flex justify-between items-center mb-3">
						<h2 className="text-xl font-normal">Recent Sales</h2>
						<Link href="/admin/sales" className="text-sm text-white/70 hover:text-foreground flex items-center">
							View All <ChevronRight size={16} />
						</Link>
					</header>

					<div className="p-4 rounded-lg bg-custom-gradient px-6 py-4 min-h-[200px]">
						{' '}
						{/* Added min-height */}
						{analysisLoading ? (
							<div className="w-full h-full flex justify-center items-center min-h-[350px]">
								<LoadingBox size={32} />
							</div>
						) : (
							<>
								<div className="flex border-b border-border mb-4">
									{/* Updated Tabs */}
									<button onClick={() => setActiveSalesTab('All')} className={`admin-tab ${activeSalesTab === 'All' ? 'active' : ''}`}>
										All
									</button>
									<button onClick={() => setActiveSalesTab('Revenue')} className={`admin-tab ${activeSalesTab === 'Revenue' ? 'active' : ''}`}>
										Revenue
									</button>
									{/* Added Expenses tab back */}
									<button onClick={() => setActiveSalesTab('Expenses')} className={`admin-tab ${activeSalesTab === 'Expenses' ? 'active' : ''}`}>
										Expenses
									</button>
								</div>

								<div className="space-y-4">
									{filteredRecentSales.length > 0 ? (
										filteredRecentSales.map(sale => (
											<div key={sale.id} className="flex justify-between items-center py-2">
												<div className="flex items-center space-x-3">
													{/* Use the dynamic icon */}
													<div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">{sale.icon}</div>
													<div>
														<h3 className="max-md:text-sm font-medium">{sale.type}</h3>
														{/* Display the most recent date */}
														<p className="text-xs text-white/70">{sale.date}</p>
													</div>
												</div>
												<div className="text-right">
													<p className="font-medium max-md:text-sm">{sale.amount}</p>
													<p className="text-xs text-white/70">Revenue</p>
												</div>
											</div>
										))
									) : (
										<p className="text-sm text-white/70 text-center py-4">No sales data for this category.</p>
									)}
								</div>
							</>
						)}
					</div>
				</article>

				<article>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-normal">Revenue</h2>
					</div>

					<div className="p-4 rounded-lg bg-custom-gradient px-6 py-4 min-h-[350px]">
						{' '}
						{/* Added min-height */}
						{analysisLoading ? (
							<div className="w-full h-full flex justify-center items-center  min-h-[350px]">
								<LoadingBox size={32} />
							</div>
						) : (
							<>
								<div className="flex justify-between items-center flex-wrap mb-4">
									<div className="flex items-center">
										<h3 className="md:text-lg font-medium">Weekly Comparison</h3>
										<ChevronRight size={16} className="ml-1 text-white/70" />
									</div>

									{/* Update Legend for single data series */}
									<div className="flex space-x-4">
										<div className="flex items-center">
											{/* Use the color defined in chartConfig for totalRevenue */}
											<div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: chartConfig.totalRevenue.color }}></div>
											<span className="text-xs md:text-sm">{chartConfig.totalRevenue.label}</span>
										</div>
										{/* Added legend item for totalStreams */}
										<div className="flex items-center">
											<div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: chartConfig.totalStreams.color }}></div>
											<span className="text-xs md:text-sm">{chartConfig.totalStreams.label}</span>
										</div>
									</div>
								</div>

								<div
									className="max-md:h-[400px] w-full max-w-full"
									style={{
										maxWidth: isMobile ? windowWidth - 800 : '100%' // Note: This calculation might need review for responsiveness
									}}
								>
									<ChartContainer config={chartConfig} className="max-md:h-full md:max-h-[275px] w-full max-w-[90vw] sm:max-w-full">
										{isMobile ? (
											// Horizontal bar chart for mobile/tablts
											<BarChart
												accessibilityLayer
												layout="vertical"
												data={chartData}
												margin={{
													left: 5,
													right: 10,
													top: 10,
													bottom: 10
												}}
												width={windowWidth - 100} // Adjust width calculation if needed
											>
												<CartesianGrid horizontal={false} />
												{/* Use 'month' for YAxis label */}
												<YAxis dataKey="month" type="category" tickLine={false} axisLine={false} width={65} tickMargin={5} />
												{/* Use 'totalRevenue' for XAxis data */}
												<XAxis type="number" dataKey="totalRevenue" tickLine={false} axisLine={false} tickMargin={8} />
												<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
												{/* Use 'totalRevenue' for Bar dataKey and color from config */}
												<Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={4} barSize={10} />
												{/* Added Bar for totalStreams */}
												<Bar dataKey="totalStreams" fill="var(--color-totalStreams)" radius={4} barSize={10} />
											</BarChart>
										) : (
											// Vertical bar chart for desktop
											<BarChart
												accessibilityLayer
												data={chartData} // Use dynamic chartData
												margin={{
													left: 10,
													right: 10,
													top: 10,
													bottom: 10
												}}
											>
												<CartesianGrid vertical={false} />
												{/* Use 'month' for XAxis label */}
												<XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value.slice(0, 7)} />
												{/* Use 'totalRevenue' for YAxis data */}
												<YAxis dataKey="totalRevenue" tickLine={false} axisLine={false} tickMargin={8} />
												<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
												{/* Use 'totalRevenue' for Bar dataKey and color from config */}
												<Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={4} barSize={16} />
												{/* Added Bar for totalStreams */}
												<Bar dataKey="totalStreams" fill="var(--color-totalStreams)" radius={4} barSize={16} />
											</BarChart>
										)}
									</ChartContainer>
								</div>
							</>
						)}
					</div>
				</article>
			</section>
		</div>
	);
};

export default Dashboard;
