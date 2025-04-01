
import React, { useState } from 'react';
import { Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Link from 'next/link';
import { Notepad2 } from 'iconsax-react';
import { LinkButton, PreviousPageButton } from '@/components/ui';

const AllTicketsPage: React.FC = () => {
    // Mock tickets data
    const tickets = Array.from({ length: 6 }, (_, i) => ({
        id: 1234,
        title: 'Upload Errors',
        user: 'Nina Dobrev',
        date: '28th Feb, 2025',
        priority: 'High'
    }));

    const totalTickets = 1234;

    return (
        <div className="space-y-6">
            <PreviousPageButton/>
            <header className="flex justify-between items-center mb-12">
                <h2 className="text-xl font-semibold">Tickets</h2>
                <div className="flex items-center">
                    <div className="mr-4">Total: {totalTickets.toLocaleString()} Tickets</div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="md" className="border-border bg-secondary">
                            <Filter size={16} className="mr-2" />
                            Filter
                        </Button>
                        <Button size="md" >
                            <Download size={16} className="mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            </header>


            <div className="grid md:[grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-x-6 gap-y-5">
                {tickets.map((ticket, index) => (
                    <article key={index} className="flex flex-col gap-2 bg-custom-gradient px-5 py-4 rounded-lg overflow-hidden">
                        <LinkButton size="thin" href={`/admin/support/tickets/${ticket.id}`} className="rounded-full self-end" >
                            View Ticket
                        </LinkButton>
                        <div className="p-4 space-y-4 divide-y">
                            <div className="flex items-start gap-3">
                                <div className="bg-[#2F363E] rounded-md p-1">
                                    <Notepad2 variant="Bold" className="fill-white" size={22} />
                                </div>
                                <div>
                                    <h3 className="font-medium">{ticket.title}</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-4 pt-3">
                                <div>
                                    <p className="text-xs text-white/50">User</p>
                                    <p className="text-sm">{ticket.user}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/50">Date Submitted</p>
                                    <p className="text-sm">{ticket.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/50">Priority</p>
                                    <p className="text-sm">{ticket.priority}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/50">Ticket ID</p>
                                    <p className="text-sm">{ticket.id}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronLeft size={16} />
                    </Button>
                    <span className="text-xs">
                        1/16
                    </span>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ChevronRight size={16} />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white/50">Rows per page:</span>
                    <select className="bg-secondary border border-border rounded p-1 text-sm">
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AllTicketsPage;
