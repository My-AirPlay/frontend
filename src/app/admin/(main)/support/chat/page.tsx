
import React from 'react';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkButton, PreviousPageButton } from '@/components/ui';
import Link from 'next/link';
import { Headphone } from 'iconsax-react';

const ChatsLists: React.FC = () => {

    const chats = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        user: 'Nina Dobrev',
        message: 'Help I need to see my analytics page. It is not working',
        date: '28th Feb, 2025'
    }));

    const totalMessages = 234;

    return (
        <div className="space-y-6">
            <PreviousPageButton />
            <header className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Chat Messages</h2>
                <div className="flex items-center">
                    <div className="mr-4 max-md:text-xs">Total: {totalMessages.toLocaleString()} Messages</div>
                    <Button variant="outline" size="sm" className="border-border bg-secondary">
                        <Filter size={16} className="mr-2" />
                        Filter
                    </Button>
                </div>
            </header>

            {/* Chat messages grid */}
            <div className="grid md:[grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-5">
                {chats.map((chat, index) => (
                    <article key={index} className="flex flex-col bg-custom-gradient px-5 py-4 rounded-lg overflow-hidden">
                        <LinkButton size="thin" href={`/admin/support/chat/${chat.id}`} className="max-md:hidden rounded-full self-end" >
                            View chat
                        </LinkButton>

                        <div className="grid  gap-y-6 md:p-4 md:mt-3">
                            <header className="flex justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="bg-[#2F363E] rounded-md p-1">
                                        <Headphone variant="Bold" className="fill-white" size={22} />
                                    </div>
                                    <p className="text-sm">{chat.user}</p>
                                </div>
                                <LinkButton size="thin" href={`/admin/support/chat/${chat.id}`} className="md:hidden rounded-full self-end" >
                                    View chat
                                </LinkButton>
                            </header>

                            <div>
                                <p className="text-[0.7rem] md:text-xs text-white/50">Message</p>
                                <p className="text-[0.825rem] md:text-sm">{chat.message}</p>
                            </div>
                            <Button variant="outline" className='w-full max-md:hidden' size="md">
                                End Chat
                            </Button>
                            <Button variant="outline" className='w-full md:hidden' size="sm">
                                End Chat
                            </Button>
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
                    <Button variant="outline" size="sm" className="h-8 min-w-8 px-3 bg-primary text-white">1</Button>
                    <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">2</Button>
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

export default ChatsLists;
