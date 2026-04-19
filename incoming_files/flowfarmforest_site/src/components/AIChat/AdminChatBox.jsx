import React, { useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles } from 'lucide-react';
import ChatInput from '@/components/AIChat/ChatInput';
import MessageBubble from '@/components/AIChat/MessageBubble';

const SYSTEM_MESSAGE = {
  role: 'system',
  content: 'You are the admin helper for this Flow Farm site. Help the admin understand and improve the website, answer questions about sections on the page, and suggest concise next steps when useful.'
};

export default function AdminChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi — I’m your admin helper. Ask me about this page, content, layout, or what to change next.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const conversationMessages = useMemo(
    () => [
      SYSTEM_MESSAGE,
      ...messages.map(({ role, content }) => ({ role, content }))
    ],
    [messages]
  );

  const handleSubmit = async (text) => {
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setIsLoading(true);

    const response = await base44.functions.invoke('chatWithAI', {
      messages: [SYSTEM_MESSAGE, ...nextMessages.map(({ role, content }) => ({ role, content }))],
      sessionId: 'admin-chat-box'
    });

    setMessages([
      ...nextMessages,
      {
        role: 'assistant',
        content: response.data?.message || 'I could not generate a reply.'
      }
    ]);
    setIsLoading(false);
  };

  return (
    <section className="border-t border-black/10 bg-[#fbfaf7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/45">Admin Helper</p>
            <h3 className="mb-2 font-display text-[clamp(1.8rem,3vw,3rem)] font-normal leading-[0.98] text-black">AI chat box</h3>
            <p className="mb-0 max-w-2xl font-sans text-[0.98rem] leading-[1.8] text-black/65">Use this box to ask for help with this site while you review the page.</p>
          </div>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="mb-4 max-h-[420px] space-y-4 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} message={message} />
            ))}
            {isLoading && (
              <MessageBubble message={{ role: 'assistant', content: 'Thinking…' }} />
            )}
          </div>
          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}