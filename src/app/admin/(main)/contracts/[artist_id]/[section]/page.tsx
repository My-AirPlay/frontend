'use client'
import React from 'react';
import { Trash2, Pencil, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PreviousPageButton } from '@/components/ui';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArtistAnalytics, ArtistOverview, ArtistContract } from '../../misc/components';

const ArtistDetails: React.FC = () => {
    const { section } = useParams<{ artist_id: string; section: string }>();

    return (
        <div className="space-y-6">
            <PreviousPageButton />


            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-semibold">Artist Details</h1>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="max-md:size-10 max-md:p-0">
                        <Trash2 size={16} className="md:mr-2" />
                        <span className='max-md:sr-only'>Delete</span>
                    </Button>
                    <Button variant="outline" className="max-md:size-10 max-md:p-0">
                        <Pencil size={16} className="md:mr-2" />
                        <span className='max-md:sr-only'>Edit</span>
                    </Button>
                    <Button className="max-md:size-10 max-md:p-0">
                        <Save size={16} className="md:mr-2" />
                        <span className='max-md:sr-only'>Save</span>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue={section || "overview"} value={section}>
                <TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
                    <Link href={`./overview`} replace>
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
                        >
                            Overview
                        </TabsTrigger>
                    </Link>

                    <Link href={`./contract`} replace>
                        <TabsTrigger
                            value="contract"
                            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
                        >
                            Contract
                        </TabsTrigger>
                    </Link>
                    <Link href={`./analytics`} replace>

                        <TabsTrigger
                            value="analytics"
                            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
                        >
                            Analytics
                        </TabsTrigger>
                    </Link>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <ArtistOverview />
                </TabsContent>

                <TabsContent value="contract" className="mt-0">
                    <ArtistContract />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                    <ArtistAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ArtistDetails;
