import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export function MessageBubble({ message, onRegenerate }: MessageBubbleProps) {
  const { toast } = useToast();
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to your clipboard.",
    });
  };

  return (
    <div className={cn(
      "flex gap-4 px-6 py-6 group",
      isUser ? "bg-transparent" : "bg-chat-ai-message"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-gradient-user" : "bg-chat-surface border border-chat-border"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-chat-text-primary" />
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="prose prose-invert max-w-none">
          <p className="text-chat-text-primary whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>
        
        {!isUser && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 text-chat-text-muted hover:text-chat-text-primary hover:bg-chat-surface-hover"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="h-8 px-2 text-chat-text-muted hover:text-chat-text-primary hover:bg-chat-surface-hover"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}