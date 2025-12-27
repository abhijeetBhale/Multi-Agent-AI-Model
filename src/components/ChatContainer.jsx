import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '../context/ChatContext';
import aiService from '../services/aiService';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';

const ChatContainer = ({ sidebarOpen }) => {
    const {
        currentModel,
        getCurrentMessages,
        addMessage,
        clearCurrentConversation,
        deleteLastResponse,
        isLoading,
        setIsLoading,
    } = useChatContext();

    const messagesEndRef = useRef(null);
    const [error, setError] = useState(null);
    const messages = getCurrentMessages();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        setError(null);
    }, [currentModel]);

    const handleSendMessage = async (content) => {
        if (!aiService.isModelConfigured(currentModel)) {
            setError('Please configure the API key for this model in your .env file');
            return;
        }

        setError(null);

        const userMessage = {
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
        };
        addMessage(userMessage);

        setIsLoading(true);

        try {
            const conversationHistory = [...messages, userMessage];
            const response = await aiService.sendMessage(conversationHistory, currentModel);

            if (response.success) {
                const aiMessage = {
                    role: 'assistant',
                    content: response.message,
                    timestamp: new Date().toISOString(),
                    usage: response.usage,
                };
                addMessage(aiMessage);
            } else {
                setError(response.error);

                const errorMessage = {
                    role: 'assistant',
                    content: `Error: ${response.error}\n\nPlease check your API configuration and try again.`,
                    timestamp: new Date().toISOString(),
                    isError: true,
                };
                addMessage(errorMessage);
            }
        } catch (err) {
            console.error('Chat error:', err);
            setError('An unexpected error occurred. Please try again.');

            const errorMessage = {
                role: 'assistant',
                content: `Unexpected Error: ${err.message}\n\nPlease try again or check your internet connection.`,
                timestamp: new Date().toISOString(),
                isError: true,
            };
            addMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (prompt) => {
        handleSendMessage(prompt);
    };

    const handleToggleSidebar = () => {
        const event = new CustomEvent('toggleSidebar');
        window.dispatchEvent(event);
    };

    const isConfigured = aiService.isModelConfigured(currentModel);

    return (
        <div className="flex flex-col h-screen bg-primary">
            {/* Header */}
            <ChatHeader onToggleSidebar={handleToggleSidebar} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                    <EmptyState
                        modelId={currentModel}
                        onSuggestionClick={handleSuggestionClick}
                    />
                ) : (
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    message={message}
                                    modelId={currentModel}
                                />
                            ))}
                        </AnimatePresence>

                        {isLoading && <TypingIndicator modelId={currentModel} />}

                        {error && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-card border border-primary rounded-xl text-secondary text-sm"
                            >
                                <strong>Error:</strong> {error}
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <ChatInput
                onSend={handleSendMessage}
                isLoading={isLoading}
                disabled={!isConfigured}
            />
        </div>
    );
};

export default ChatContainer;
