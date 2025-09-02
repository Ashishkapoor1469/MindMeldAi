import { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatSidebar } from './ChatSidebar';
import { ChatArea } from './ChatArea';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export function ChatInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    conversations,
    currentConversationId,
    isTyping,
    sendMessage,
    selectConversation,
    deleteConversation,
    startNewChat,
    getCurrentConversation,
  } = useChat();

  const currentConversation = getCurrentConversation();
  const messages = currentConversation?.messages || [];

  const handleNewChat = () => {
    startNewChat();
    setIsSidebarOpen(true);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="h-screen bg-chat-background flex overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={selectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={deleteConversation}
        isOpen={isSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onToggleSidebar={handleToggleSidebar}
          onNewChat={handleNewChat}
          isSidebarOpen={isSidebarOpen}
        />
        
        <ChatArea
          messages={messages}
          isTyping={isTyping}
        />
        
        <ChatInput
          onSendMessage={sendMessage}
          disabled={isTyping}
          placeholder="Send a message to MindMeld AI..."
        />
      </div>
    </div>
  );
}