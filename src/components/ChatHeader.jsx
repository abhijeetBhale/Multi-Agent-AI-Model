import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon, MoreHorizontal, ChevronDown } from 'lucide-react';
import { MODELS } from '../config/apiConfig';
import { useChatContext } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';

const ChatHeader = ({ onToggleSidebar }) => {
    const { currentModel } = useChatContext();
    const { theme, toggleTheme } = useTheme();
    const model = Object.values(MODELS).find(m => m.id === currentModel);

    return (
        <div className="border-b border-primary bg-secondary">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                {/* Left: Model Selector */}
                <motion.button
                    onClick={onToggleSidebar}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-tertiary transition-all border border-primary hover:border-hover shadow-sm"
                >
                    <div className="w-7 h-7 rounded-md bg-icon-bg flex items-center justify-center border border-primary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-primary">{model?.name}</span>
                    <ChevronDown size={14} className="text-tertiary" />
                </motion.button>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-16 py-2 bg-primary border border-primary rounded-lg text-sm placeholder-tertiary focus:outline-none focus:border-hover transition-all shadow-sm"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-tertiary border border-primary rounded text-xs text-tertiary font-medium">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-lg bg-primary border border-primary hover:bg-tertiary hover:border-hover transition-all flex items-center justify-center shadow-sm"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <Sun size={16} className="text-secondary" />
                        ) : (
                            <Moon size={16} className="text-secondary" />
                        )}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-lg bg-primary border border-primary hover:bg-tertiary hover:border-hover transition-all flex items-center justify-center shadow-sm"
                        title="More options"
                    >
                        <MoreHorizontal size={16} className="text-secondary" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
