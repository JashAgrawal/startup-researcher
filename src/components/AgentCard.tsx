import React from 'react';
import { Agent } from '../types';
import { Presentation as PresentationScreen, LineChart, Search, Scale, Rocket, HandCoins } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  'PresentationScreen': PresentationScreen,
  'LineChart': LineChart,
  'Search': Search,
  'Scale': Scale,
  'Rocket': Rocket,
  'HandCoins': HandCoins,
};

export default function AgentCard({ agent }: AgentCardProps) {
  const Icon = iconMap[agent.icon];

  if (!Icon) {
    return <div>Invalid Icon</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{agent.description}</p>
      <div className="mt-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          agent.status === 'completed' ? 'bg-green-100 text-green-800' :
          agent.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {agent.status.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
}