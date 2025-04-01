'use client'

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button, LinkButton } from '@/components/ui';
import Link from 'next/link';

const TicketDetails: React.FC = () => {
    const { ticket_id } = useParams<{ ticket_id: string}>();
    const ticket = {
        id: Number(ticket_id),
    user: 'NinaDobrev',
    email: 'ninadobrev@gmail.com',
    subject: 'Upload Error',
    status: 'In progress',
    dateSubmitted: '28th Feb, 2025',
    issue: "Hi, I can't seem to upload my music. It says \"Error checking updates\" when I tried to log out and log in to the platform via my browser, it redirects me help and support. Pls help."
  };

  return (
    <div className="bg-custom-gradient rounded-lg text-white min-h-[70vh]">
      <div className=" mx-auto px-6 py-4">
        <div className="flex items-center mb-6">
          <Link href="/admin/support/tickets" className="flex items-center text-white">
            <ArrowLeft size={20} className="mr-2" />
            All Ticket 
          </Link>
        </div>

        <div className=" rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-2xl gap-x-6 gap-y-4 ">
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">User</p>
              <p className="font-medium">{ticket.user}</p>
            </div>
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">Email Address</p>
              <p className="font-medium">{ticket.email}</p>
            </div>
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">Subject Title</p>
              <p className="font-medium">{ticket.subject}</p>
            </div>
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">Date Submitted</p>
              <p className="font-medium">{ticket.dateSubmitted}</p>
            </div>
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">Status</p>
              <p className="font-medium">{ticket.status}</p>
            </div>
            <div>
              <p className="text-[#D8D8D8] text-sm mb-1">Ticket ID</p>
              <p className="font-medium">{ticket.id}</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-6 mb-8">
          <h3 className="text-white mb-4">Ticket Issue</h3>
          <p className="text-gray-300 mb-6 text-sm">{ticket.issue}</p>
          
          <div className="border border-dashed border-primary p-6 flex justify-center items-center w-24 h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D8D8D8]"></div>
          </div>
        </div>

        <div className="flex flex-col gap-7 items-center justify-center mb-6">
          <Button  size="md">
            This ticket has been solved.
          </Button>
          
          <Button variant="outline" size="md">
            This ticket is deferred.
          </Button>

          <LinkButton href="" size="lg" className="rounded-full">
            Add Response
            <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;