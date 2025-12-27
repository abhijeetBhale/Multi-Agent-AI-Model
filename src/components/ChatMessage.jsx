import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Copy, Check } from 'lucide-react';

const ChatMessage = ({ message, modelId }) => {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`group mb-8 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}
        >
            <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                {/* Message Label */}
                <div className="text-xs font-medium text-tertiary mb-2 px-1">
                    {isUser ? 'You' : 'AI'}
                </div>

                {/* Message Content */}
                <div
                    className={`
            relative px-4 py-3 rounded-2xl shadow-sm
            ${isUser
                            ? 'bg-primary border border-primary text-primary'
                            : 'bg-card border border-primary text-primary'
                        }
          `}
                >
                    {/* Copy Button */}
                    {!isUser && (
                        <motion.button
                            onClick={handleCopy}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute -top-2 -right-2 p-1.5 bg-secondary border border-primary rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-tertiary shadow-sm"
                            title="Copy message"
                        >
                            {copied ? (
                                <Check size={12} className="text-primary" strokeWidth={2.5} />
                            ) : (
                                <Copy size={12} className="text-secondary" strokeWidth={2} />
                            )}
                        </motion.button>
                    )}

                    {/* Message Text */}
                    {isUser ? (
                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                    ) : (
                        <div className="markdown-content text-sm">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        return inline ? (
                                            <code className="bg-tertiary px-1.5 py-0.5 rounded text-primary font-mono text-xs border border-primary" {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <div className="relative group/code my-3">
                                                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto border border-primary">
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                </pre>
                                                <motion.button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(String(children));
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="absolute top-2 right-2 p-1.5 bg-tertiary border border-primary rounded opacity-0 group-hover/code:opacity-100 transition-all shadow-sm"
                                                >
                                                    <Copy size={12} strokeWidth={2} />
                                                </motion.button>
                                            </div>
                                        );
                                    },
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Timestamp */}
                <span className="text-xs text-tertiary mt-1.5 px-1">
                    {message.timestamp
                        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                </span>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
