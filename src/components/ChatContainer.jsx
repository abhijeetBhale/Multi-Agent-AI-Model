import React, { useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import aiService from '../services/aiService';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Bot } from 'lucide-react';

const ChatContainer = ({ sidebarOpen, toggleSidebar }) => {
    const {
        currentModel,
        getCurrentMessages,
        addMessage,
        isLoading,
        setIsLoading,
    } = useChatContext();

    const messagesEndRef = useRef(null);
    const messages = getCurrentMessages();

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (content) => {
        // 1. Add User Message
        const userMessage = {
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
        };
        addMessage(userMessage);
        setIsLoading(true);

        try {
            // 2. Call API
            const conversationHistory = [...messages, userMessage];
            const response = await aiService.sendMessage(conversationHistory, currentModel);

            // 3. Add AI Response
            if (response.success) {
                addMessage({
                    role: 'assistant',
                    content: response.message,
                    timestamp: new Date().toISOString(),
                });
            } else {
                addMessage({
                    role: 'assistant',
                    content: `Error: ${response.error}`,
                    isError: true,
                });
            }
        } catch (err) {
            addMessage({
                role: 'assistant',
                content: "An unexpected error occurred. Please try again.",
                isError: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <ChatHeader 
                sidebarOpen={sidebarOpen} 
                toggleSidebar={toggleSidebar} 
                currentModel={currentModel} 
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 opacity-50">
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                                <Bot size={32} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                                How can I help you today?
                            </h2>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <ChatMessage key={idx} message={msg} />
                        ))
                    )}
                    
                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex gap-4 max-w-3xl w-full">
                            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                <Bot size={16} className="text-white dark:text-black animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1 h-8">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-transparent pb-6 pt-2">
                <div className="max-w-3xl mx-auto px-4">
                    <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                    <p className="text-center text-xs text-gray-400 mt-3">
                        AI can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;