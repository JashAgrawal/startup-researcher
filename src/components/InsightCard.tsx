interface InsightCardProps {
  title: string;
  icon:any;
  content: string;
  color: string;
}

export default function InsightCard({ title, icon: Icon, content, color }: InsightCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {typeof content === 'string' ? content : ''}
            {typeof content === 'object' ? (<>
            {Object.values(content).join('\n .  \n')}
            </>) : ''}
          </p>
        </div>
      </div>
    </div>
  );
}