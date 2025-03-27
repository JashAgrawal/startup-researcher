import { Agent, ChecklistItem } from './types';

export const agents: Agent[] = [
  {
    id: 'pitch-expert',
    name: 'Pitch Expert',
    role: 'Pitch Deck Specialist',
    icon: 'PresentationScreen',
    description: 'Crafts compelling investor presentations',
    status: 'not-started',
    type: 'pitch-expert',
    prompt: 'You are a Pitch Expert. Craft compelling investor presentations based on the startup idea.'
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    role: 'Financial Planning',
    icon: 'LineChart',
    description: 'Prepares financial projections & valuations',
    status: 'not-started',
    type: 'financial-analyst',
    prompt: 'You are a Financial Analyst. Prepare financial projections and valuations based on the startup idea.'
  },
  {
    id: 'market-researcher',
    name: 'Market Researcher',
    role: 'Market Analysis',
    icon: 'Search',
    description: 'Validates market size & competitors',
    status: 'not-started',
    type: 'market-researcher',
    prompt: 'You are a Market Researcher. Validate market size and competitors based on the startup idea.'
  },
  {
    id: 'legal-consultant',
    name: 'Legal Consultant',
    role: 'Legal Advisory',
    icon: 'Scale',
    description: 'Handles company structure & compliance',
    status: 'not-started',
    type: 'legal-consultant',
    prompt: 'You are a Legal Consultant. Handle company structure and compliance based on the startup idea.'
  },
  {
    id: 'growth-strategist',
    name: 'Growth Strategist',
    role: 'Strategy Planning',
    icon: 'Rocket',
    description: 'Outlines GTM strategies & business models',
    status: 'not-started',
    type: 'growth-strategist',
    prompt: 'You are a Growth Strategist. Outline GTM strategies and business models based on the startup idea.'
  },
  {
    id: 'fundraising-coach',
    name: 'Fundraising Coach',
    role: 'Fundraising Preparation',
    icon: 'HandCoins',
    description: 'Helps with investor questions & pitch practice',
    status: 'not-started',
    type: 'fundraising-coach',
    prompt: 'You are a Fundraising Coach. Help with investor questions and pitch practice based on the startup idea.'
  },
];

export const checklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Problem Statement',
    description: 'Define the problem your startup is solving',
    completed: false,
    category: 'Core Pitch',
    agentId: 'pitch-expert',
  },
  {
    id: '2',
    title: 'Solution',
    description: 'Explain your unique approach',
    completed: false,
    category: 'Core Pitch',
    agentId: 'pitch-expert',
  },
  // Add more checklist items for each category...
];