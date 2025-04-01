
import { LinkButton } from '@/components/ui';
import { Headphone } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';

interface ChatBotListProps {
  limit?: number;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  date: string;
}

const ChatBotList: React.FC<ChatBotListProps> = ({ limit = 10 }) => {
  // Mock chat messages data
  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 2,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 3,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 4,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 5,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 6,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
    {
      id: 7,
      user: 'Nina Dobrev',
      message: 'Help I need to see my analytics page. It is not working',
      date: '28th Feb, 2025'
    },
  ];

  const displayedMessages = chatMessages.slice(0, limit);

  return (
    <div className="space-y-3 mt-4">
      {
        displayedMessages.map((chat) => (
          <div
            key={chat.id}
            className="flex items-start gap-3 border-t border-border pt-3 shadow-sm"
          >
            <div className="bg-[#2F363E] rounded-md p-1.5">
              <Headphone variant="Bold" className="fill-white" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{chat.user}</h4>
                  <p className="text-xs text-white/60 max-w-[22ch] ">{chat.message}</p>
                </div>
                <div className="flex flex-col gap-1.5 items-end">
                  <LinkButton
                    size="thin"
                    href={`./support/chat/${chat.id}`}
                    className="text-white rounded-full"
                  >
                    Open
                  </LinkButton>
                  <span className="text-xs text-white/60">{chat.date}</span>

                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatBotList;
