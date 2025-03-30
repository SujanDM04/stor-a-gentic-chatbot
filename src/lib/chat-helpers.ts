
import { v4 as uuidv4 } from 'uuid';

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export const createFakeMessage = (role: MessageRole, content: string): Message => {
  return {
    id: uuidv4(),
    role,
    content,
    timestamp: new Date(),
  };
};
