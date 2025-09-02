import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-4 px-6 py-6 bg-chat-ai-message">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-chat-surface border border-chat-border">
        <Bot className="h-4 w-4 text-chat-text-primary" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-chat-text-muted rounded-full animate-bounce"></div>
          </div>
          <span className="text-chat-text-muted text-sm ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
}