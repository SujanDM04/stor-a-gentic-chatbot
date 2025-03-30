
import { useEffect, useRef } from "react";
import { Message } from "@/lib/chat-helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessagesList = ({ messages, isLoading }: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-blue-100 text-gray-800"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              
              {message.role === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 bg-blue-50 flex items-center text-gray-800">
                <Loader2 className="h-4 w-4 animate-spin mr-2 text-blue-500" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
