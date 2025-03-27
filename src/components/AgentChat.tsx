import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { Send, Loader2 } from "lucide-react";
import { getAIChatModel } from "../utils/gemini";
import { Chat } from "@google/genai";
import ReactMarkdown from "react-markdown";

interface AgentChatProps {
  agentId: string;
}

export default function AgentChat({ agentId }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_${agentId}`);
    const idea = localStorage.getItem("idea");

    const getChat = async () => {
      if (!agentId) return;
      setInitialLoading(true);
      const chatInstance = await getAIChatModel(agentId, idea || "");
      setChat(chatInstance);
      setInitialLoading(false);
    };
    getChat();

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [agentId]);

  useEffect(() => {
    localStorage.setItem(`chat_${agentId}`, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat) return;
    const inputMessage = input.trim();

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      agentId,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    const response = await chat.sendMessage({ message: inputMessage });
    setLoading(false);

    if (!response || !response.text) return;

    const responseMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: response.text,
      sender: "agent",
      timestamp: new Date(),
      agentId,
    };
    setMessages((prev) => [...prev, responseMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {initialLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-gray-500 h-8 w-8" />
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                  message.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t bg-white flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
        </button>
      </form>
    </div>
  );
}