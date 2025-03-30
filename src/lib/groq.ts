import { toast } from "sonner";

// Types for Groq API
export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type GroqResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

// Groq API models
export const GROQ_MODELS = {
  LLAMA3_8B: "llama3-8b-8192",
  LLAMA3_70B: "llama3-70b-8192",
  MIXTRAL_8X7B: "mixtral-8x7b-32768",
  GEMMA_7B: "gemma-7b-it"
};

// Default system message for storage assistant
const DEFAULT_SYSTEM_MESSAGE = `You are Stor-a-gentic, a friendly and helpful AI assistant for a storage company. 
Your role is to help customers with inquiries about storage units, bookings, locations, and services. 
Be friendly, informative, and concise. If you don't know an answer, acknowledge that and offer to connect the customer with a human representative.`;

// Function to generate responses using Groq API
export async function generateGroqResponse(
  messages: Message[],
  options?: {
    model?: string;
    temperature?: number;
    systemMessage?: string;
    maxTokens?: number;
  }
) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.warn("Groq API key not found. Please set VITE_GROQ_API_KEY in your environment variables.");
    return { 
      content: "I'm currently in development mode and can't generate a response. Please try again later or contact support.", 
      error: true 
    };
  }

  const model = options?.model || GROQ_MODELS.LLAMA3_8B;
  const temperature = options?.temperature ?? 0.7;
  const systemMessage = options?.systemMessage || DEFAULT_SYSTEM_MESSAGE;
  const maxTokens = options?.maxTokens || 1024;

  // Add system message if not already present
  if (!messages.some(msg => msg.role === 'system')) {
    messages = [{ role: 'system', content: systemMessage }, ...messages];
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${error}`);
    }

    const data = await response.json() as GroqResponse;
    return { 
      content: data.choices[0].message.content,
      error: false
    };
  } catch (error) {
    console.error("Groq API failed:", error);
    toast.error("Failed to generate AI response. Using fallback.");
    return {
      content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. I'll forward your question to our support team who will get back to you shortly.",
      error: true
    };
  }
}

// Simplified function to get a quick response
export async function getQuickResponse(userMessage: string) {
  const messages: Message[] = [
    { role: 'user', content: userMessage }
  ];
  
  return generateGroqResponse(messages);
}
