import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          AI
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-black text-white'
              : 'bg-slate-100 text-slate-900 border border-slate-200'
          }`}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-sm">
              <ReactMarkdown
                components={{
                  code: ({ inline, className, children }) => (
                    inline ? (
                      <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-slate-800 text-slate-100 p-3 rounded-md overflow-x-auto my-2">
                        <code className="font-mono text-xs">{children}</code>
                      </pre>
                    )
                  ),
                  p: ({ children }) => <p className="mb-2">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  h3: ({ children }) => <h3 className="font-bold mb-2">{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="mt-2 text-xs"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}