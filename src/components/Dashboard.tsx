import { useState, useEffect } from "react";
import { StartupInsights } from "../types";
import Sidebar from "./Sidebar";
import InsightCard from "./InsightCard";
import { Brain, Users, LineChart, Scale, Rocket, Coins } from "lucide-react";
import AgentChat from "./AgentChat";

export default function Dashboard() {
  const [insights, setInsights] = useState<StartupInsights | null>(null);
  const [selectedAgent, setSelectedAgent] = useState("0");

  useEffect(() => {
    const storedInsights = localStorage.getItem("startupInsights");
    if (storedInsights) {
      setInsights(JSON.parse(storedInsights));
    }
  }, []);

  if (!insights) {
    return <div>Loading...</div>;
  }

  const insightCards = [
    {
      title: "Problem Analysis",
      icon: Brain,
      content: insights["Problem Analysis"],
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Target Market",
      icon: Users,
      content: insights["Target Market"],
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Business Model",
      icon: LineChart,
      content: insights["Business Model"],
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Legal Considerations",
      icon: Scale,
      content: insights["Legal Considerations"],
      color: "bg-red-50 text-red-700",
    },
    {
      title: "Growth Strategy",
      icon: Rocket,
      content: insights["Growth Strategy"],
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Funding Requirements",
      icon: Coins,
      content: insights["Funding Requirements"],
      color: "bg-indigo-50 text-indigo-700",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 p-8 space-x-8">
      <div className="w-1/4">
        <Sidebar
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
        />
      </div>
      {selectedAgent === "0" ? (
        <main className="w-full flex-1 overflow-auto">
          <div className="py-6">
            <div className=" mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Startup Dashboard
              </h1>
            </div>

            <div className=" mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {insightCards.map((card) => (
                    <InsightCard
                      key={card.title}
                      title={card.title}
                      icon={card.icon}
                      content={card.content}
                      color={card.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="w-full border-r border-gray-200">
          <AgentChat agentId={selectedAgent} />
        </div>
      )}
    </div>
  );
}
