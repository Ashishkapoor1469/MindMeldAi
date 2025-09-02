import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Menu, Plus, HelpCircle, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  isSidebarOpen: boolean;
}

export function ChatHeader({ onToggleSidebar, onNewChat, isSidebarOpen }: ChatHeaderProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 border-b border-chat-border bg-chat-surface">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hover:bg-chat-surface-hover transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-chat-text-primary">MindMeld AI</h1>
            <Badge variant="secondary" className="text-xs bg-chat-accent/20 text-chat-accent border-0">
              Pro
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            className="hover:bg-chat-surface-hover transition-colors"
            title="New Chat"
          >
            <Plus className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-chat-surface-hover transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-chat-surface border-chat-border">
              <DropdownMenuItem className="flex items-center gap-2 text-chat-text-secondary hover:text-chat-text-primary hover:bg-chat-surface-hover">
                <Zap className="h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-chat-text-secondary hover:text-chat-text-primary hover:bg-chat-surface-hover">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-chat-border" />
              <DropdownMenuItem 
                className="flex items-center gap-2 text-chat-text-secondary hover:text-chat-text-primary hover:bg-chat-surface-hover"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </>
  );
}