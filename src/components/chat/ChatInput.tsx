import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Send a message..." 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = 200; // Max height in pixels
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  return (
    <div className="border-t border-chat-border bg-chat-background p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 bg-chat-input border border-chat-input-border rounded-2xl p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-8 w-8 hover:bg-chat-surface-hover text-chat-text-muted hover:text-chat-text-primary "
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent px-2 py-2",
              "text-chat-text-primary placeholder:text-chat-text-muted",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "scrollbar-thin scrollbar-thumb-chat-border scrollbar-track-transparent"
            )}
            style={{ height: 'auto' }}
          />
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-chat-surface-hover text-chat-text-muted hover:text-chat-text-primary"
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              size="icon"
              className={cn(
                "h-8 w-8 rounded-lg transition-all duration-200",
                message.trim() && !disabled
                  ? "bg-chat-accent hover:bg-chat-accent-hover text-white"
                  : "bg-chat-surface text-chat-text-muted cursor-not-allowed"
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-chat-text-muted text-center mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
}