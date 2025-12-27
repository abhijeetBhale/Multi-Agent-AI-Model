import React, { useState, useEffect } from 'react';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setSidebarOpen(prev => !prev);
    };

    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-primary text-primary overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <ChatContainer sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
