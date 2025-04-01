'use client'
import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui';
import { AccountCoins } from './misc/icons';

const ArtistRevenue: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const artists = [
        { id: 1, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 2, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 3, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 4, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 5, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 6, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 7, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 8, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 9, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
        { id: 10, name: 'Nina', realName: 'Nina Dobrev', revenue: '₦4,000,000' },
    ];
    const artistsColumns: ColumnDef<{
        id: number;
        name: string;
        realName: string;
        revenue: string;
    }>[] = [
            {
                id: 'name',
                header: 'Artist Name',
                cell: (info) => (
                    <Link href={`./artist-revenue/${info.row.original.id}/details`} className="font-medium text-primary hover:underline">
                        {info.row.original.name}
                    </Link>
                ),
            },
            {
                id: 'realName',
                header: 'Artist Real Name',
                accessorKey: 'realName',
            },
            {
                id: 'revenue',
                header: 'Revenue Generated',
                accessorKey: 'revenue',
            },
        ];





    const totalRevenue = '₦23,000,000';

    return (
        <div className="space-y-8">
            <div className="bg-secondary rounded-lg p-4 flex gap-4 items-center">
                <AccountCoins className="size-12" />

                <div>
                    <p className="text-sm text-muted">Total Revenue Made</p>
                    <h3 className="text-2xl font-bold">{totalRevenue}</h3>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Artists Revenue</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-border bg-secondary">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Download size={16} className="mr-2" />
                            Download
                        </Button>
                    </div>
                </div>

                <div className="relative w-full mb-6 flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search for artists"
                        className="bg-secondary border-none rounded-md py-2 pl-10 pr-4 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <DataTable
                    data={artists}
                    columns={artistsColumns}
                    showCheckbox={true}
                    pagination={true}
                    defaultRowsPerPage={10}

                />

            </div>
        </div>
    );
};

export default ArtistRevenue;
