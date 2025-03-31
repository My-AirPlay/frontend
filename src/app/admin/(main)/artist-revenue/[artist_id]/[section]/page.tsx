'use client'

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Download, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArtistOverview, ArtistAnalytics, ArtistTransactions } from '../../misc/components';

const ArtistRevenueDetails: React.FC = () => {
    const { section, artist_id } = useParams<{ artist_id: string; section: string }>();

    // Mock artist data
    const artist = {
        id: Number(artist_id),
        name: 'Nina',
        realName: 'Nina Dobrev',
        email: 'ninadobrev@gmail.com',
        revenue: '₦4,000,000',
        credits: '₦4,000,000',
        debits: '₦0,000,000'
    };

    const totalRevenue = '₦23,000,000';

    const tabs = [
        {
            title: 'Details',
            value: 'details',
            path: `./details`,
            component: <ArtistOverview artistId={Number(artist_id)} />,
        },
        {
            title: 'Analytics',
            value: 'analytics',
            path: `./analytics`,
            component: <ArtistAnalytics artistId={Number(artist_id)} />,

        },
        {
            title: 'Transaction',
            value: 'transactions',
            path: `./transactions`,
            component: <ArtistTransactions artistId={Number(artist_id)} />,

        }
    ]

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-10 rounded-lg p-4 md:p-6 bg-custom-gradient">
                <div className="flex gap-4 items-center">
                    <div className="bg-primary/10 p-3 rounded-md">
                        <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-white/60">Total Revenue Made</p>
                        <h3 className="text-2xl font-bold">{totalRevenue}</h3>
                    </div>
                </div>

                <div className=" ">
                    <div className="grid lg:grid-cols-7 gap-4 text-sm">
                        <div className="col-span-1">
                            <p className="text-white/60">Artist Name</p>
                            <p className="font-medium">{artist.name}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white/60">Artist Real Name</p>
                            <p className="font-medium">{artist.realName}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-white/60">Email Address</p>
                            <p className="font-medium">{artist.email}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white/60">Revenue Generated</p>
                            <p className="font-medium">{artist.revenue}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white/60">Credits</p>
                            <p className="font-medium">{artist.credits}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white/60">Debits</p>
                            <p className="font-medium">{artist.debits}</p>
                        </div>
                    </div>
                </div>
            </section>

            <h2 className="text-xl font-semibold">Overview</h2>

            <Tabs value={section} className="w-full bg-custom-gradient p-4 rounded-lg">
                <TabsList className="bg-transparent border-b border-border w-full justify-start gap-4 h-auto p-0">
                    {
                        tabs.map((tab) => (
                            <Link href={tab.path} key={tab.value} replace>
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={`pb-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-0 data-[state=active]:bg-transparent`}
                                >
                                    {tab.title}
                                </TabsTrigger>
                            </Link>
                        ))

                    }
                </TabsList>

                {
                    tabs.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value} className="mt-6">
                            {tab.component}
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>
    );
};

export default ArtistRevenueDetails;
