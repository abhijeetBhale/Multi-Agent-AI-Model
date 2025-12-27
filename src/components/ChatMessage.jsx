import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Ensure you have: npm install react-markdown

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-4 max-w-3xl w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
          ${isUser ? 'bg-gray-200 dark:bg-gray-700' : 'bg-black dark:bg-white'}
        `}>
          {isUser ? (
            <User size={18} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Bot size={18} className="text-white dark:text-black" />
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-hidden ${isUser ? 'text-right' : 'text-left'}`}>
            <div className={`
                inline-block text-base leading-relaxed
                ${isUser 
                  ? 'bg-gray-100 dark:bg-gray-800 rounded-2xl px-5 py-3 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-900 dark:text-gray-100 py-1'
                }
            `}>
                {isUser ? (
                    message.content
                ) : (
                    <div className="prose dark:prose-invert max-w-none">
                       {/* If you installed react-markdown, use: <ReactMarkdown>{message.content}</ReactMarkdown> */}
                       {/* Otherwise just render text: */}
                       {message.content.split('\n').map((line, i) => (
                           <p key={i} className="mb-2">{line}</p>
                       ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;