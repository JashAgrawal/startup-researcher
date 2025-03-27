import React, { useState } from 'react';
import { Agent, ChatMessage } from '../types';

interface ChatInterfaceProps {
  agents: Agent[];
}

export default function ChatInterface({ agents }: ChatInterfaceProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      agentId: selectedAgent.id,
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
      <div className="p-4 border-b">
        <select
          className="w-full p-2 border rounded-md"
          value={selectedAgent.id}
          onChange={(e) => setSelectedAgent(agents.find(a => a.id === e.target.value) || agents[0])}
        >
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
        {messages
          .filter(m => m.agentId === selectedAgent.id)
          .map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${selectedAgent.name} a question...`}
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}