import React from 'react';
import { Plus, MessageSquare, Settings, User } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { clearAllConversations } = useChatContext();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-30
          flex flex-col h-full w-[260px] 
          bg-black/95 text-gray-300
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden'}
        `}
      >
        {/* New Chat Button */}
        <div className="p-3 mb-2">
          <button 
            onClick={() => window.location.reload()} // Simple reset for now
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors text-sm text-left border border-gray-700"
          >
            <Plus size={16} />
            <span className="font-medium">New chat</span>
          </button>
        </div>

        {/* Navigation / History */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="text-xs font-semibold text-gray-500 px-3 py-2 mb-1 uppercase tracking-wider">Today</div>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm truncate">
            <MessageSquare size={16} />
            <span>Project Discussion</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-800">
          <button 
            onClick={clearAllConversations}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            <Settings size={16} />
            <span>Clear History</span>
          </button>
          
          <div className="flex items-center gap-3 mt-2 px-3 py-2">
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <div className="text-sm font-medium text-white">User Account</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;