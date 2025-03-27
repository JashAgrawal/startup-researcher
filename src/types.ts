export interface Agent {
  id: string;
  type: AIAgentTypes;
  name: string;
  role: string;
  icon: string;
  description: string;
  prompt: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  agentId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentId: string;
}

export interface StartupInsights {
  "Problem Analysis": string;
  "Target Market": string;
  "Solution Overview": string;
  "Business Model": string;
  "Market Size": string;
  "Competitive Analysis": string;
  "Financial Projections": string;
  "Legal Considerations": string;
  "Growth Strategy": string;
  "Funding Requirements": string;
}

export type AIAgentTypes = "personal-assistant" | "pitch-expert" | "financial-analyst" | "market-researcher" | "legal-consultant" | "growth-strategist" | "fundraising-coach";