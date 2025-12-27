import React from 'react';
import { PanelLeft, ChevronDown } from 'lucide-react';

const ChatHeader = ({ sidebarOpen, toggleSidebar, currentModel }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              <PanelLeft size={20} />
            </button>
        )}
        
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
          <span className="font-semibold text-lg text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">
            {currentModel || 'Gemini'}
          </span>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;