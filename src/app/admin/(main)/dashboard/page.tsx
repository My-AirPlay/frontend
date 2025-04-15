'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChevronRight, ArrowLeft, ArrowRight, Filter, Disc, Music, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMobile, useWindowWidth } from '@/hooks';
import { useGetAdminMedia } from '../catalogue/api';
import moment from 'moment';
import { useGetAllAlbums } from '../catalogue/api/getAdminGetAllAlbums';
import { LoadingBox } from '@/components/ui/LoadingBox';

const chartData = [
	{ month: '17 Sun', this_week: 186, last_week: 80 },
	{ month: '18 Mon', this_week: 305, last_week: 200 },
	{ month: '19 Tue', this_week: 237, last_week: 120 },
	{ month: '20 Wed', this_week: 73, last_week: 190 },
	{ month: '21 Thur', this_week: 209, last_week: 130 },
	{ month: '22 Fri', this_week: 214, last_week: 140 },
	{ month: '23 Sat', this_week: 237, last_week: 120 }
];
const chartConfig = {
	this_week: {
		label: 'This week',
		color: 'hsl(var(--primary))'
	},
	last_week: {
		label: 'Last week',
		color: 'hsl(var(--foreground))'
	}
} satisfies ChartConfig;

const Dashboard: React.FC = () => {
	const isMobile = useMobile();
	const windowWidth = useWindowWidth();

	const { data: audio, isLoading: audioLoading } = useGetAdminMedia({ type: 'audio' });
	const { data: video, isLoading: videoLoading } = useGetAdminMedia({ type: 'video' });
	const { data: albums, isLoading: albumsLoading } = useGetAllAlbums({});

	// Mock data
	const uploads = [
		{ id: 1, type: 'Music - Tracks', lastUploaded: audio?.data?.[0]?.createdAt, category: 'Tracks', count: audio?.total || 0, icon: <Music color="#fe6b02" size={24} /> },
		{ id: 2, type: 'Music - Album', lastUploaded: video?.data?.[0]?.createdAt, category: 'Album', count: video?.total || 0, icon: <Disc color="#fe6b02" size={24} /> },
		{ id: 3, type: 'Music - Videos', lastUploaded: albums?.data?.[0]?.createdAt, category: 'Videos', count: albums?.total || 0, icon: <Video color="#fe6b02" size={24} /> }
	];

	// const weeklyData = [
	//   { day: '17 Sun', current: 750, previous: 650 },
	//   { day: '18 Mon', current: 820, previous: 700 },
	//   { day: '19 Tue', current: 750, previous: 800 },
	//   { day: '20 Wed', current: 850, previous: 750 },
	//   { day: '21 Thu', current: 900, previous: 850 },
	//   { day: '22 Fri', current: 950, previous: 800 },
	//   { day: '23 Sat', current: 880, previous: 830 },
	// ];

	// Recent sales data
	const recentSales = [
		{ id: 1, type: 'Royalties', amount: '₦4,625,874', date: '22 Jan 2025', revenue: true },
		{ id: 2, type: 'Streaming', amount: '₦3,625,874', date: '20 Jan 2025', revenue: true },
		{ id: 3, type: 'Downloads', amount: '₦2,625,874', date: '17 Jan 2025', revenue: true }
	];

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
						<Link href="/uploads" className="text-sm text-white/70-foreground hover:text-foreground flex items-center">
							View All <ChevronRight size={16} />
						</Link>
					</header>

					<div className="grid gap-8 rounded-lg bg-custom-gradient px-6 py-4">
						{audioLoading || videoLoading || albumsLoading ? (
							<div className="w-full px-6 py-4 flex justify-center items-center">
								{' '}
								<LoadingBox size={32} />
							</div>
						) : (
							uploads?.map(upload => (
								<div key={upload?.id} className="">
									<div className="flex justify-between items-center">
										<div className="flex items-center space-x-3">
											<div className="bg-accent p-2 rounded-md">
												{/* <div className="w-6 h-6 bg-primary rounded-md"></div> */}
												{upload?.icon}
											</div>
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
						<div className="mb-4">
							<h3 className="text-2xl font-bold">₦2,040,399</h3>
							<p className="text-sm text-white/70">All Revenue</p>
						</div>

						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<div>
									<h4 className="text-sm font-medium">Revenue Type</h4>
									<p className="text-sm">YouTube</p>
									<p className="text-sm text-white/70">Streaming</p>
								</div>
								<div className="flex space-x-2 items-center">
									<div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
										<span className="text-white text-xs">YT</span>
									</div>
									<span className="text-sm font-bold">₦25,000</span>
								</div>
							</div>

							<div className="flex justify-between items-center">
								<button className="flex items-center text-white/70 hover:text-foreground">
									<ArrowLeft size={16} className="mr-1" />
									<span className="text-sm">Previous</span>
								</button>

								<div className="flex space-x-1">
									<span className="w-2 h-2 bg-primary rounded-full"></span>
									<span className="w-2 h-2 bg-accent rounded-full"></span>
									<span className="w-2 h-2 bg-accent rounded-full"></span>
								</div>

								<button className="flex items-center text-white/70 hover:text-foreground">
									<span className="text-sm">Next</span>
									<ArrowRight size={16} className="ml-1" />
								</button>
							</div>
						</div>
					</div>
				</article>
			</section>

			<div className="border-t my-6 "></div>

			<section className="grid lg:grid-cols-[0.5fr,1fr] gap-x-8 gap-y-5 lg:items-stretch max-w-[1300px]">
				<article>
					<header className="flex justify-between items-center mb-3">
						<h2 className="text-xl font-normal">Recent Sales</h2>
						<Link href="/sales" className="text-sm text-white/70 hover:text-foreground flex items-center">
							View All <ChevronRight size={16} />
						</Link>
					</header>

					<div className="p-4 rounded-lg bg-custom-gradient px-6 py-4">
						<div className="flex border-b border-border mb-4">
							<button className="admin-tab active">All</button>
							<button className="admin-tab">Revenue</button>
							<button className="admin-tab">Expenses</button>
						</div>

						<div className="space-y-4">
							{recentSales.map(sale => (
								<div key={sale.id} className="flex justify-between items-center py-2">
									<div className="flex items-center space-x-3">
										<div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
											<div className="w-4 h-4 bg-primary rounded-sm"></div>
										</div>
										<div>
											<h3 className="max-md:text-sm font-medium">{sale.type}</h3>
											<p className="text-xs text-white/70">{sale.date}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-medium max-md:text-sm">{sale.amount}</p>
										<p className="text-xs text-white/70">Revenue</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</article>

				<article>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-normal">Revenue</h2>
					</div>

					<div className="p-4 rounded-lg bg-custom-gradient px-6 py-4">
						<div className="flex justify-between items-center flex-wrap mb-4">
							<div className="flex items-center">
								<h3 className="md:text-lg font-medium">Weekly Comparison</h3>
								<ChevronRight size={16} className="ml-1 text-white/70" />
							</div>

							<div className="flex space-x-4">
								<div className="flex items-center">
									<div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
									<span className="text-xs md:text-sm">This week</span>
								</div>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-gray-500 rounded-sm mr-2"></div>
									<span className="text-xs md:text-sm">Last week</span>
								</div>
							</div>
						</div>

						<div
							className="max-md:h-[400px] w-full max-w-full"
							style={{
								maxWidth: isMobile ? windowWidth - 800 : '100%'
							}}
						>
							<ChartContainer config={chartConfig} className="max-md:h-full md:max-h-[275px] w-full max-w-full">
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
										width={windowWidth - 100}
									>
										<CartesianGrid horizontal={false} />
										<YAxis dataKey="month" type="category" tickLine={false} axisLine={false} width={65} tickMargin={5} />
										<XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
										<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
										<Bar dataKey="this_week" fill="var(--color-this_week)" radius={4} barSize={10} />
										<Bar dataKey="last_week" fill="var(--color-last_week)" radius={4} barSize={10} />
									</BarChart>
								) : (
									// Vertical bar chart for desktop
									<BarChart
										accessibilityLayer
										data={chartData}
										margin={{
											left: 10,
											right: 10,
											top: 10,
											bottom: 10
										}}
									>
										<CartesianGrid vertical={false} />
										<XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value.slice(0, 7)} />
										<YAxis tickLine={false} axisLine={false} tickMargin={8} />
										<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
										<Bar dataKey="this_week" fill="var(--color-this_week)" radius={4} barSize={16} />
										<Bar dataKey="last_week" fill="var(--color-last_week)" radius={4} barSize={16} />
									</BarChart>
								)}
							</ChartContainer>
						</div>
					</div>
				</article>
			</section>
		</div>
	);
};

export default Dashboard;
