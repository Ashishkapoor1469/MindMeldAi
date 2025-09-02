import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/types/chat";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
}

export function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isOpen
}: ChatSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-chat-sidebar border-r border-chat-border flex flex-col h-full">
      <div className="p-3 border-b border-chat-border">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-3 bg-chat-accent hover:bg-chat-accent-hover text-chat-accent-foreground"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors",
                currentConversationId === conversation.id
                  ? "bg-chat-surface-hover text-chat-text-primary"
                  : "text-chat-text-secondary hover:bg-chat-sidebar-hover hover:text-chat-text-primary"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate">{conversation.title}</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-chat-surface-hover transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-chat-surface border-chat-border">
                  <DropdownMenuItem className="flex items-center gap-2 text-chat-text-secondary hover:text-chat-text-primary hover:bg-chat-surface-hover">
                    <Edit3 className="h-3 w-3" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}