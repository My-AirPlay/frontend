/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge, DataTable, PreviousPageButton } from '@/components/ui';

const Contracts = () => {

    const contracts = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: 'Amarae',
        type: 'Royalty',
        category: 'None',
        dateCreated: '27 Jan 2025',
        status: index % 2 === 0 ? 'Pending' : 'Completed',
    }));

    const totalContracts = 100;

    const columns = [
        {
            id: 'name',
            header: 'Name',
            cell: (info: any) => (
                <Link
                    href={`/admin/contracts/${info.row.original.id}/overview`}
                    className="text-admin-primary hover:underline"
                >
                    {info.row.original.name}
                </Link>
            ),
        },
        {
            id: 'type',
            header: 'Type',
            cell: (info: any) => (
                <span className="royalty-badge bg-primary/20 text-primary border border-primary/50 text-xs px-3 py-1 rounded-md">{info.row.original.type}</span>
            ),
        },
        {
            id: 'category',
            header: 'Category',
            accessorKey: 'category',
        },
        {
            id: 'dateCreated',
            header: 'Date Created',
            accessorKey: 'dateCreated',
        },
        {
            id: 'status',
            header: 'Status',
            cell: (info: any) => (
                <Badge variant={info.row.original.status === 'Pending' ? "destructive" : "success"}>
                    {info.row.original.status}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <PreviousPageButton />

            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-semibold">Contracts</h1>
                <div className="flex items-center space-x-2">
                    <div className="text-sm text-admin-muted">
                        Total: {totalContracts}
                    </div>
                    <Button variant="outline" className="max-md:size-10 max-md:p-0">
                        <Filter size={16} className="md:mr-2" />
                        <span className="max-md:sr-only">Filter</span>
                    </Button>
                    <Button className="max-md:size-10 max-md:p-0">
                        <Download size={16} className="md:mr-2" />
                        <span className="max-md:sr-only">Download</span>
                    </Button>
                </div>
            </div>

            <div className="flex border-b border-admin-border">
                <button className="admin-tab active">All</button>
            </div>

            <DataTable
                data={contracts}
                columns={columns}
                showCheckbox={true}
                pagination={true}
                defaultRowsPerPage={10}
            // filterComponent={
            //   <DataTableFilter label="Filter">
            //     <div className="p-4">
            //       <div className="space-y-4">
            //         <h4 className="font-medium">Filter Options</h4>
            //         {/* Filter options will be added here */}
            //       </div>
            //     </div>
            //   </DataTableFilter>
            // }
            />
        </div>
    );
};

export default Contracts;
