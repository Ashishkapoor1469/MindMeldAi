import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ModelSelectionDialog } from "./ModelSelectionDialog";
import { AnalyticsDialog } from "./AnalyticsDialog";
import { Message } from "@/types/chat";
import { Bot, Sparkles } from "lucide-react";

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
  onRegenerate?: (messageId: string) => void;
}

export function ChatArea({ messages, isTyping, onRegenerate }: ChatAreaProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-chat-text-primary">
            Welcome to MindMeld AI Pro
          </h2>
          <p className="text-chat-text-secondary">
            Choose your AI model and start a powerful conversation. Access advanced features, analytics, and premium models.
          </p>
          <div className="flex gap-3 justify-center">
            <ModelSelectionDialog />
            <AnalyticsDialog />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
      <div className="min-h-full">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRegenerate={
              message.role === 'assistant' && onRegenerate
                ? () => onRegenerate(message.id)
                : undefined
            }
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}