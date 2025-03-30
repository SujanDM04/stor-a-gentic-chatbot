import { useState, useEffect } from "react";
import { MessagesList } from "@/components/chat/MessagesList";
import { MessageInput } from "@/components/chat/MessageInput";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { QuickReplyButtons } from "@/components/chat/QuickReplyButtons";
import { createFakeMessage } from "@/lib/chat-helpers";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/lib/chat-helpers";
import { generateGroqResponse, getQuickResponse } from "@/lib/groq";
import { createCustomerInquiry, fetchFaqs } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";

const Index = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    createFakeMessage("assistant", "👋 Hello! I'm Stor-a-gentic, your friendly storage assistant. How can I help you today?"),
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);

  // Load FAQs on component mount
  useEffect(() => {
    const loadFaqs = async () => {
      const faqData = await fetchFaqs();
      setFaqs(faqData);
    };
    loadFaqs();
  }, []);

  // Quick reply options
  const quickReplies = [
    { id: "book", label: "Book a collection", action: () => handleQuickReply("I want to book a collection service") },
    { id: "hours", label: "Store hours", action: () => handleQuickReply("What are your store hours?") },
    { id: "sizes", label: "Storage sizes", action: () => handleQuickReply("What size storage units do you offer?") },
    { id: "security", label: "Security", action: () => handleQuickReply("How secure are your facilities?") },
    { id: "human", label: "Talk to human", action: () => handleQuickReply("I'd like to speak with a human representative") },
  ];

  const findMatchingFaq = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return faqs.find(faq => 
      faq.question.toLowerCase().includes(lowerQuery) || 
      lowerQuery.includes(faq.question.toLowerCase())
    );
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage = createFakeMessage("user", content);
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // First, check for matching FAQ
      const matchingFaq = findMatchingFaq(content);
      let responseContent;

      if (matchingFaq) {
        // Use FAQ answer if found
        responseContent = matchingFaq.answer;
      } else {
        // If no FAQ match, try Groq API
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        
        if (apiKey) {
          const response = await getQuickResponse(content);
          responseContent = response.content;
        } else {
          // Fallback to simulated response if no API key
          responseContent = getSimulatedResponse(content);
        }
      }
      
      // Save inquiry to database with the final response
      await createCustomerInquiry({
        name: "Chat User",
        email: "chat@example.com", // Placeholder as we don't collect this in simple chat
        message: content,
        status: 'new',
        response: responseContent // Store the final response
      });
      
      // Add AI response to chat
      const assistantMessage = createFakeMessage("assistant", responseContent);
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Show toast notification
      toast({
        title: "New message",
        description: "Assistant has responded to your query",
      });
    } catch (error) {
      console.error("Error handling message:", error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (content: string) => {
    handleSendMessage(content);
  };

  // Simple response simulation for fallback when API key isn't available
  const getSimulatedResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("book") || lowerQuery.includes("collection")) {
      return "I'd be happy to help you book a collection! Currently, we have slots available next week. When would you prefer us to come by?";
    } else if (lowerQuery.includes("hours") || lowerQuery.includes("time")) {
      return "Our stores are open Monday to Friday from 9am to 7pm, and on weekends from 10am to 5pm.";
    } else if (lowerQuery.includes("human") || lowerQuery.includes("representative") || lowerQuery.includes("speak")) {
      return "I'll connect you with one of our customer service representatives. Please wait a moment while I transfer your chat, or call us directly at (555) 123-4567.";
    } else if (lowerQuery.includes("size") || lowerQuery.includes("unit")) {
      return "We offer a variety of storage unit sizes:\n- Small (5x5): Perfect for small furniture, boxes\n- Medium (10x10): Good for a 1-bedroom apartment\n- Large (10x20): Fits contents of a 2-3 bedroom house\n- Extra Large (10x30): Ideal for business inventory or large household moves";
    } else if (lowerQuery.includes("security") || lowerQuery.includes("secure")) {
      return "Your items' security is our top priority! Our facilities feature 24/7 video surveillance, electronic gate access, on-site management, and individually alarmed units.";
    } else if (lowerQuery.includes("faq") || lowerQuery.includes("question")) {
      return "Here are some frequently asked questions:\n- What size storage units do you offer?\n- Do you offer climate controlled units?\n- How secure are your facilities?\n- What are your payment options?";
    } else {
      return "Thanks for your message! I'm still learning. For specific inquiries, you might want to check our FAQ section or speak with a human representative.";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessagesList messages={messages} isLoading={isLoading} />
        
        <div className="p-4 border-t bg-white">
          <QuickReplyButtons options={quickReplies} />
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
