import {
  Brain,
  Presentation as PresentationScreen,
  LineChart,
  Search,
  Scale,
  Rocket,
  HandCoins,
  Grid2X2,
} from "lucide-react";

interface SidebarProps {
  selectedAgent: string;
  onSelectAgent: (agentId: string) => void;
}

const agents = [
  {
    id: "personal-assistant",
    name: "Personal Assistant",
    icon: Brain,
    description: "Your AI companion for general guidance",
  },
  {
    id: "pitch-expert",
    name: "Pitch Expert",
    icon: PresentationScreen,
    description: "Helps craft compelling investor presentations",
  },
  {
    id: "financial-analyst",
    name: "Financial Analyst",
    icon: LineChart,
    description: "Assists with financial projections",
  },
  {
    id: "market-researcher",
    name: "Market Researcher",
    icon: Search,
    description: "Analyzes market trends and competitors",
  },
  {
    id: "legal-consultant",
    name: "Legal Consultant",
    icon: Scale,
    description: "Provides legal guidance and compliance",
  },
  {
    id: "growth-strategist",
    name: "Growth Strategist",
    icon: Rocket,
    description: "Plans expansion and scaling strategies",
  },
  {
    id: "fundraising-coach",
    name: "Fundraising Coach",
    icon: HandCoins,
    description: "Guides through fundraising process",
  },
];

export default function Sidebar({
  selectedAgent,
  onSelectAgent,
}: SidebarProps) {
  return (
    <div className="flex w-full border border-black shadow-md overflow-hidden h-full rounded-xl">
      <div className="w-full bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Your Team</h2>
        </div>

        <nav className="mt-4">
          <button
            onClick={() => onSelectAgent("0")}
            className={`w-full text-left px-4 py-4 text-lg flex items-center space-x-3 hover:bg-gray-50 ${
              selectedAgent === "0"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700"
            }`}
          >
            <Grid2X2 className="h-5 w-5" />
            <span className="text-lg font-medium">Dashboard</span>
          </button>
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => onSelectAgent(agent.id)}
                className={`w-full text-left px-4 py-4 text-lg flex items-center space-x-3 hover:bg-gray-50 ${
                  selectedAgent === agent.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-lg font-medium">{agent.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

     
    </div>
  );
}
