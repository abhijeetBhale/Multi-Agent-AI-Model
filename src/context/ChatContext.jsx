import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_MODEL } from '../config/apiConfig';

const ChatContext = createContext();

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    // Current selected model
    const [currentModel, setCurrentModel] = useState(DEFAULT_MODEL);

    // Conversations for each model - stored as { modelId: [...messages] }
    const [conversations, setConversations] = useState(() => {
        const saved = localStorage.getItem('ai-chat-conversations');
        return saved ? JSON.parse(saved) : {};
    });

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Save conversations to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('ai-chat-conversations', JSON.stringify(conversations));
    }, [conversations]);

    /**
     * Get messages for current model
     */
    const getCurrentMessages = () => {
        return conversations[currentModel] || [];
    };

    /**
     * Add a message to current conversation
     */
    const addMessage = (message) => {
        setConversations(prev => ({
            ...prev,
            [currentModel]: [...(prev[currentModel] || []), message],
        }));
    };

    /**
     * Update the last message (useful for streaming or regeneration)
     */
    const updateLastMessage = (content) => {
        setConversations(prev => {
            const messages = prev[currentModel] || [];
            if (messages.length === 0) return prev;

            const updatedMessages = [...messages];
            updatedMessages[updatedMessages.length - 1] = {
                ...updatedMessages[updatedMessages.length - 1],
                content,
            };

            return {
                ...prev,
                [currentModel]: updatedMessages,
            };
        });
    };

    /**
     * Clear conversation for current model
     */
    const clearCurrentConversation = () => {
        setConversations(prev => ({
            ...prev,
            [currentModel]: [],
        }));
    };

    /**
     * Clear all conversations
     */
    const clearAllConversations = () => {
        setConversations({});
        localStorage.removeItem('ai-chat-conversations');
    };

    /**
     * Switch to a different model
     */
    const switchModel = (modelId) => {
        setCurrentModel(modelId);
    };

    /**
     * Delete last AI response (for regeneration)
     */
    const deleteLastResponse = () => {
        setConversations(prev => {
            const messages = prev[currentModel] || [];
            if (messages.length < 2) return prev;

            // Remove last two messages (user message + AI response)
            const updatedMessages = messages.slice(0, -2);

            return {
                ...prev,
                [currentModel]: updatedMessages,
            };
        });
    };

    /**
     * Get conversation count for a specific model
     */
    const getMessageCount = (modelId) => {
        return (conversations[modelId] || []).length;
    };

    const value = {
        currentModel,
        conversations,
        isLoading,
        setIsLoading,
        getCurrentMessages,
        addMessage,
        updateLastMessage,
        clearCurrentConversation,
        clearAllConversations,
        switchModel,
        deleteLastResponse,
        getMessageCount,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
