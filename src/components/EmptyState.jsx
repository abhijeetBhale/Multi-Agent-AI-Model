import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Code, Image, FileText, ArrowRight } from 'lucide-react';

const EmptyState = ({ modelId, onSuggestionClick }) => {
    const agents = [
        {
            icon: Mail,
            iconBg: '#FEF3C7',
            iconColor: '#D97706',
            title: 'Cold Email Template Expert',
            description: 'Helped many people before to create cold email templates for various purposes.',
        },
        {
            icon: FileText,
            iconBg: '#DBEAFE',
            iconColor: '#2563EB',
            title: 'YouTube Content Writer',
            description: 'Helped many people before to create cold email templates for various purposes.',
        },
        {
            icon: Code,
            iconBg: '#E0E7FF',
            iconColor: '#4F46E5',
            title: 'Pro Coder',
            description: 'Helped many people before to create cold email templates for various purposes.',
        },
        {
            icon: Image,
            iconBg: '#FFEDD5',
            iconColor: '#EA580C',
            title: 'Blog Image Generator',
            description: 'Helped many people before to create cold email templates for various purposes.',
        },
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 py-16">
            <div className="max-w-4xl w-full">
                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-card border border-primary flex items-center justify-center shadow-md"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-2xl font-semibold text-primary mb-2 tracking-tight"
                    >
                        Hey, I'm TypingMind.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-secondary text-sm"
                    >
                        How can I help you today?
                    </motion.p>
                </motion.div>

                {/* Agent Cards */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-sm font-medium text-primary">Your AI agents</h3>
                        <button className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1 group">
                            <span>All agents</span>
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {agents.map((agent, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                                whileHover={{ y: -2 }}
                                onClick={() => onSuggestionClick(`Help me with ${agent.title.toLowerCase()}`)}
                                className="p-4 bg-card border border-primary rounded-xl text-left hover:border-hover hover:shadow-md transition-all card-hover"
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                                        style={{
                                            backgroundColor: agent.iconBg,
                                        }}
                                    >
                                        <agent.icon size={20} style={{ color: agent.iconColor }} strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm text-primary mb-1 leading-tight">
                                            {agent.title}
                                        </h4>
                                        <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                                            {agent.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
