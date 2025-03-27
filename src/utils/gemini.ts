import { Chat, GoogleGenAI } from "@google/genai";
import { agents } from "../data";
import { getChatsByAgent } from "./lib";

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateStartupInsights(idea: string) {
  const prompt = `
    Analyze this startup idea and provide comprehensive insights:
    "${idea}"
    
    Generate a structured response with:
    1. Problem Analysis
    2. Target Market
    3. Solution Overview
    4. Business Model
    5. Market Size
    6. Competitive Analysis
    7. Financial Projections
    8. Legal Considerations
    9. Growth Strategy
    10. Funding Requirements
    
    Format the response as a JSON object with these sections as keys.
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    if(!response || !response.text){
      throw new Error("Failed to generate response");
    }
    const text = response.text.trim();
    console.log(text);
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    console.log(match);
    if (match) {
      try {
        const parsedResponse = JSON.parse(match[1]);
        return parsedResponse;
      } catch (error) {
        console.log(error);
        throw new Error("Invalid Json");
      }
    } else {
      throw new Error("Invalid Json");
    }

  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI response");
  }
}

export async function getAIChatModel(agentId: string, idea: string): Promise<Chat | null> {
  console.log(agentId);
  if(!agentId){
    return null;
  }
  const agent = agents.find(agent => agent.id === agentId) || agents[0];
  console.log(agent);
  if(!agent){
    throw new Error("Invalid agent id");
  }
  const prevChats = getChatsByAgent(agentId);
  console.log(prevChats)
  const chat = ai.chats.create({
    model:"gemini-2.0-flash",
    history: prevChats.map(chat => ({
      role: chat.sender === "user" ? "user" : "model",
      parts: [{text:chat.content}]
    })),
    config:{
      systemInstruction: agent.prompt + "\n for business idea: " + idea
    }
  });
  return chat;
}