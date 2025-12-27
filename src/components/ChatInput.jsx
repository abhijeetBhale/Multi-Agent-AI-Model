import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Paperclip, List, Settings } from 'lucide-react';

const ChatInput = ({ onSend, isLoading, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading && !disabled) {
            onSend(input.trim());
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full px-4 py-6 bg-primary border-t border-primary">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {/* Input Container */}
                    <div className="relative flex items-end gap-2 bg-secondary border border-primary rounded-2xl p-2.5 focus-within:border-hover transition-all shadow-sm">
                        {/* Slash Command Button */}
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 w-8 h-8 hover:bg-tertiary rounded-lg transition-all flex items-center justify-center"
                            title="Commands"
                        >
                            <span className="text-secondary text-base font-medium">/</span>
                        </motion.button>

                        {/* Input Field */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={disabled ? "Configure API keys to start..." : "How can I help you today"}
                            disabled={disabled || isLoading}
                            rows={1}
                            className="flex-1 bg-transparent text-primary placeholder-tertiary focus:outline-none resize-none max-h-[200px] overflow-y-auto disabled:opacity-50 text-sm py-1.5 leading-relaxed"
                            style={{ minHeight: '28px' }}
                        />

                        {/* Right Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 hover:bg-tertiary rounded-lg transition-all flex items-center justify-center"
                                title="Voice input"
                            >
                                <Mic size={17} className="text-secondary" strokeWidth={2} />
                            </motion.button>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 hover:bg-tertiary rounded-lg transition-all flex items-center justify-center"
                                title="Attach file"
                            >
                                <Paperclip size={17} className="text-secondary" strokeWidth={2} />
                            </motion.button>

                            <motion.button
                                type="submit"
                                disabled={!input.trim() || disabled || isLoading}
                                whileHover={{ scale: input.trim() && !disabled && !isLoading ? 1.05 : 1 }}
                                whileTap={{ scale: input.trim() && !disabled && !isLoading ? 0.95 : 1 }}
                                className={`
                  w-8 h-8 rounded-lg transition-all flex items-center justify-center
                  ${input.trim() && !disabled && !isLoading
                                        ? 'bg-primary text-primary hover:bg-tertiary border border-primary'
                                        : 'text-tertiary cursor-not-allowed'
                                    }
                `}
                            >
                                <Send size={17} strokeWidth={2} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-3 flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                            <motion.button
                                type="button"
                                whileHover={{ x: 2 }}
                                className="flex items-center gap-1.5 px-2 py-1 text-xs text-secondary hover:text-primary transition-all rounded-md hover:bg-secondary"
                            >
                                <List size={13} strokeWidth={2} />
                                <span className="font-medium">My Prompts</span>
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1.5 px-2 py-1 text-xs text-secondary hover:text-primary transition-all rounded-md hover:bg-secondary"
                            >
                                <Settings size={13} strokeWidth={2} />
                            </motion.button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
