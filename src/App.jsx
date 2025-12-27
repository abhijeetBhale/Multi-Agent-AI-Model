import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
          {/* Sidebar with state passed down */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full relative">
            <ChatContainer 
              sidebarOpen={sidebarOpen} 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            />
          </div>
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;