import { ChatMessage } from "../types";

export const getChatsByAgent = (agentId: string): ChatMessage[] => {
    const storedMessages = localStorage.getItem(`chat_${agentId}`);
    if (storedMessages) {
        return JSON.parse(storedMessages) as ChatMessage[];
    }
    return [];
}