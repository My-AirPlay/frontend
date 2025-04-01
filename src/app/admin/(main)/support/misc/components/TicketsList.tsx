
import { LinkButton } from '@/components/ui';
import { Notepad2 } from 'iconsax-react';
import React from 'react';

interface TicketsListProps {
  limit?: number;
}

interface Ticket {
  id: number;
  title: string;
  user: string;
  date: string;
  status: 'open' | 'closed' | 'pending';
}

const TicketsList: React.FC<TicketsListProps> = ({ limit = 10 }) => {

  const tickets: Ticket[] = [
    { id: 1, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 2, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 3, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 4, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 5, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
    { id: 6, title: 'Upload Error', user: 'Nina Dobrev', date: '28th Feb, 2025', status: 'open' },
  ];

  const displayedTickets = tickets.slice(0, limit);

  return (
    <div className="space-y-3 mt-4">
      {
        displayedTickets.map((ticket, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border-t border-border pt-3 shadow-sm"
          >
            <div className="bg-[#2F363E] rounded-md p-1">
              <Notepad2 variant="Bold" className="fill-white" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{ticket.title}</h4>
                  <p className="text-xs text-white/60">{ticket.user}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <LinkButton
                    href={`./support/tickets/${ticket.id}`}
                    size="thin"
                    className="text-white rounded-full"
                  >
                    Open
                  </LinkButton>
                  <span className="text-xs text-white/60">{ticket.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))
        }
    </div>
  );
};

export default TicketsList;
