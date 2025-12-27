import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="
        relative flex items-end gap-2 
        bg-gray-100 dark:bg-[#212121] 
        rounded-[26px] p-3 
        focus-within:ring-1 focus-within:ring-gray-300 dark:focus-within:ring-gray-600
        transition-all
      "
    >
      <button 
        type="button" 
        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        <Paperclip size={20} />
      </button>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message AI..."
        className="
          flex-1 max-h-[150px] py-2 
          bg-transparent border-none outline-none resize-none 
          text-gray-900 dark:text-white placeholder:text-gray-500
          leading-relaxed
        "
        rows={1}
      />

      {input.trim() ? (
        <button 
          type="submit"
          disabled={isLoading}
          className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      ) : (
         <button 
          type="button" 
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <Mic size={20} />
        </button>
      )}
    </form>
  );
};

export default ChatInput;