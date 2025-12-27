import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, Settings, Trash2, Plus } from 'lucide-react';
import { MODELS } from '../config/apiConfig';
import { useChatContext } from '../context/ChatContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { currentModel, switchModel, clearAllConversations } = useChatContext();

    const handleClearAll = () => {
        if (window.confirm('Clear all conversations? This cannot be undone.')) {
            clearAllConversations();
        }
    };

    const sidebarIcons = [
        { icon: MessageSquare, label: 'Chat', action: () => { } },
        { icon: Users, label: 'Teams', badge: true, action: () => { } },
        { icon: Settings, label: 'Settings', action: () => { } },
    ];

    return (
        <>
            {/* Compact Icon Sidebar */}
            <div className="w-14 h-screen bg-secondary border-r border-primary flex flex-col items-center py-3 gap-1">
                {/* New Chat Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-card border border-primary hover:bg-tertiary hover:border-hover transition-all flex items-center justify-center group shadow-sm"
                    title="New chat"
                >
                    <Plus size={18} className="text-secondary group-hover:text-primary transition-colors" />
                </motion.button>

                {/* Divider */}
                <div className="w-7 h-px bg-border my-1"></div>

                {/* Sidebar Icons */}
                {sidebarIcons.map((item, index) => (
                    <motion.button
                        key={index}
                        onClick={item.action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-lg hover:bg-tertiary transition-all flex items-center justify-center relative group"
                        title={item.label}
                    >
                        <item.icon size={18} className="text-secondary group-hover:text-primary transition-colors" />
                        {item.badge && (
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-primary rounded-full border border-secondary"></span>
                        )}
                    </motion.button>
                ))}

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Bottom Icons */}
                <motion.button
                    onClick={handleClearAll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg hover:bg-tertiary transition-all flex items-center justify-center group"
                    title="Clear all"
                >
                    <Trash2 size={16} className="text-secondary group-hover:text-primary transition-colors" />
                </motion.button>

                {/* User Avatar */}
                <div className="w-9 h-9 rounded-full bg-tertiary border border-primary flex items-center justify-center cursor-pointer hover:border-hover transition-all">
                    <span className="text-xs font-medium text-secondary">U</span>
                </div>
            </div>

            {/* Expanded Model Selection Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: -280, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -280, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed left-14 top-0 h-screen w-64 bg-secondary border-r border-primary z-50 shadow-lg"
                        >
                            <div className="flex flex-col h-full p-4">
                                <div className="mb-4">
                                    <h2 className="text-sm font-semibold text-primary">Select Model</h2>
                                    <p className="text-xs text-tertiary mt-0.5">Choose your AI assistant</p>
                                </div>

                                <div className="space-y-1.5 flex-1 overflow-y-auto">
                                    {Object.values(MODELS).map((model) => {
                                        const isActive = currentModel === model.id;

                                        return (
                                            <motion.button
                                                key={model.id}
                                                onClick={() => {
                                                    switchModel(model.id);
                                                    setIsOpen(false);
                                                }}
                                                whileHover={{ x: 2 }}
                                                className={`
                          w-full p-3 rounded-lg text-left transition-all
                          border
                          ${isActive
                                                        ? 'bg-tertiary border-hover shadow-sm'
                                                        : 'bg-card border-primary hover:bg-tertiary hover:border-hover'
                                                    }
                        `}
                                            >
                                                <h3 className="font-medium text-sm text-primary mb-0.5">{model.name}</h3>
                                                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                                                    {model.description}
                                                </p>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
