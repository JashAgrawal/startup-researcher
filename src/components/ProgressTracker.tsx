import { ChecklistItem } from '../types';

interface ProgressTrackerProps {
  checklist: ChecklistItem[];
}

export default function ProgressTracker({ checklist }: ProgressTrackerProps) {
  const categories = Array.from(new Set(checklist.map(item => item.category)));
  const completedItems = checklist.filter(item => item.completed).length;
  const progress = (completedItems / checklist.length) * 100;

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-900 mb-2">{category}</h3>
            <div className="space-y-3">
              {checklist
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                        readOnly
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}