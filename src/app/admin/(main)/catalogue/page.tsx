/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { DataTable, PreviousPageButton } from '@/components/ui';

const Catalogue: React.FC = () => {

    // Sample data
    const releases = [
        { id: 1, title: 'The Good Book', artist: 'Hannah', catNo: '89656', barCode: '89656' },
        { id: 2, title: 'Highest in the Room', artist: 'Travis Scott', catNo: '89656', barCode: '89656' },
        { id: 3, title: 'The Climb', artist: 'Miley Cyrus', catNo: '89656', barCode: '89656' },
        { id: 4, title: 'Kiss your Hand', artist: 'R2Bees', catNo: '89656', barCode: '89656' },
        { id: 5, title: 'Buy a Drink', artist: 'Tpain', catNo: '89656', barCode: '89656' },
        { id: 6, title: 'Good Girl, Gone Bad', artist: 'Rihanna', catNo: '89656', barCode: '89656' },
        { id: 7, title: 'A Good Time', artist: 'Davido', catNo: '89656', barCode: '89656' },
        { id: 8, title: 'Johnny', artist: 'Yemi Alade', catNo: '89656', barCode: '89656' },
        { id: 9, title: 'Side to Side', artist: 'Ariana Grande', catNo: '89656', barCode: '89656' },
        { id: 10, title: 'Sweetest Girl', artist: 'Wyclef Jean', catNo: '89656', barCode: '89656' },
    ];
    const tracks = [
        { id: 1, title: 'The Good Book', artist: 'Hannah', isrc: 'RS6753271H' },
        { id: 2, title: 'Highest in the Room', artist: 'Travis Scott', isrc: 'RS6753271H' },
        { id: 3, title: 'The Climb', artist: 'Miley Cyrus', isrc: 'RS6753271H' },
        { id: 4, title: 'Kiss your Hand', artist: 'R2Bees', isrc: 'RS6753271H' },
        { id: 5, title: 'Buy a Drink', artist: 'Tpain', isrc: 'RS6753271H' },
        { id: 6, title: 'Good Girl, Gone Bad', artist: 'Rihanna', isrc: 'RS6753271H' },
        { id: 7, title: 'A Good Time', artist: 'Davido', isrc: 'RS6753271H' },
        { id: 8, title: 'Johnny', artist: 'Yemi Alade', isrc: 'RS6753271H' },
        { id: 9, title: 'Side to Side', artist: 'Ariana Grande', isrc: 'RS6753271H' },
        { id: 10, title: 'Sweetest Girl', artist: 'Wyclef Jean', isrc: 'RS6753271H' },
    ];



    const trackColumns = [
        {
            id: 'title',
            header: 'Title',
            cell: (info: any) => (
                <Link href={`/admin/catalogue/tracks/${info.row.original.id}`} className="text-primary hover:underline">
                    {info.row.original.title}
                </Link>
            ),
        },
        {
            id: 'artist',
            header: 'Artist',
            accessorKey: 'artist',
        },
        {
            id: 'isrc',
            header: 'ISRC',
            accessorKey: 'isrc',
        },
    ];

    const releaseColumns = [
        {
            id: 'title',
            header: 'Title',
            cell: (info: any) => (
                <Link href={`/admin/catalogue/releases/${info.row.original.id}`} className="text-primary hover:underline">
                    {info.row.original.title}
                </Link>
            ),
        },
        {
            id: 'artist',
            header: 'Artist',
            accessorKey: 'artist',
        },
        {
            id: 'catNo',
            header: 'Cat No',
            accessorKey: 'catNo',
        },
        {
            id: 'barCode',
            header: 'Bar Code',
            accessorKey: 'barCode',
        },
    ];


    return (
        <div className="space-y-6">
            <PreviousPageButton />


            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-semibold">Catalogue</h1>
                <div className="flex items-center space-x-2">
                    <div className="text-sm text-muted">
                        Total: {releases.length}
                    </div>
                    <Button variant="outline" className="bg-secondary text-foreground border-border">
                        <Filter size={16} className="mr-2" />
                        <span>Filter</span>
                    </Button>
                    <Button className="admin-button-primary">
                        <Download size={16} className="mr-2" />
                        <span>Download</span>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="releases">
                <TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
                    <TabsTrigger
                        value="releases"
                        className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
                    >
                        Releases
                    </TabsTrigger>
                    <TabsTrigger
                        value="tracks"
                        className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
                    >
                        Tracks
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="releases" className="mt-0">
                    <DataTable
                        data={releases}
                        columns={releaseColumns}
                        showCheckbox={true}
                        pagination={true}
                        defaultRowsPerPage={10}

                    />
                </TabsContent>

                <TabsContent value="tracks" className="mt-0">
                    <DataTable
                        data={tracks}
                        columns={trackColumns}
                        showCheckbox={true}
                        pagination={true}
                        defaultRowsPerPage={10}

                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Catalogue;
