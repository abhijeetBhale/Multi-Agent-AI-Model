import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = ({ modelId }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start mb-8"
        >
            <div className="max-w-[85%]">
                {/* Message Label */}
                <div className="text-xs font-medium text-tertiary mb-2 px-1">
                    AI
                </div>

                {/* Typing Animation */}
                <div className="bg-card border border-primary rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-tertiary rounded-full"
                                animate={{
                                    y: [0, -6, 0],
                                    opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TypingIndicator;
