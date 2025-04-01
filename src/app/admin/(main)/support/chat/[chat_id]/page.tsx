'use client'
import React, { useState } from 'react';
import { ArrowLeft, Send, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ChatDetails: React.FC = () => {
  const { chat_id } = useParams<{ chat_id: string }>();
  const [message, setMessage] = useState('');
  
  
  const chat = {
    id: Number(chat_id),
    user: 'Nina Dobrev',
    status: 'Online',
    messages: [
      {
        id: 1, 
        sender: 'admin',
        content: 'Have you tried re-uploading the file?',
        time: '',
        isAttachment: true
      },
      {
        id: 2,
        sender: 'user',
        content: 'This is user message',
        time: '10:00 AM',
        isAttachment: true
      },
      {
        id: 3,
        sender: 'admin',
        content: 'Have you tried re-uploading the file?',
        time: '',
        isAttachment: true
      }
    ]
  };
  
  const handleSend = () => {
    if (message.trim()) {
      // Here we would normally add the message to the chat
      setMessage('');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/support/chat" className="text-white/50 hover:text-foreground flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Chat Bot Messages
        </Link>
      </div>
      
      <div className="bg-custom-gradient rounded-lg overflow-hidden">
   
        <div className="p-4 flex items-center gap-8 border-b w-full">
          <div>
            <p className="text-xs md:text-sm text-white/50">User</p>
            <p className="text-sm text-[0.9rem]">{chat.user}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-white/50">Status</p>
            <p className="text-sm text-[0.9rem]">{chat.status}</p>
          </div>
          <Button variant="outline" className="">
            End Chat
          </Button>
        </div>


        <div className="p-4 space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto">
          {chat.messages.map((msg) => (
            <div key={msg.id} className={`space-y-2 ${msg.sender === 'admin' ? 'admin-message' : ''}`}>
              <div className="flex items-center gap-2">
                {msg.sender === 'admin' ? (
                  <>
                    <div className="bg-primary h-6 w-6 rounded-full flex items-center justify-center text-white text-xs">A</div>
                    <span className="text-sm font-medium">Admin Chat Bot Response</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium">{chat.user}</span>
                    <span className="text-xs text-white/50">• online</span>
                  </>
                )}
              </div>
              
              <div className="p-3 bg-background rounded-md">
                <p className="text-sm">{msg.content}</p>
                
                {msg.isAttachment && (
                  <div className="mt-2 w-32 h-32 border-2 border-dashed border-muted rounded-md flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                
                {msg.time && <p className="text-xs text-right text-white/50 mt-1">{msg.time}</p>}
              </div>
            </div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-border">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[100px] bg-background border-border pr-12"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Smile size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Paperclip size={18} />
              </Button>
              <Button 
                onClick={handleSend}
                size="icon" 
                className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
