import { calculateOverallCompletion } from "@/utils/calculateCompletion";
import { TaskParams } from "@/types";

interface OverallCompletionProps {
  tasks: TaskParams[];
}

export default function OverallCompletion({ tasks }: OverallCompletionProps) {
  const completion = calculateOverallCompletion(tasks);

  const getCompletionColor = () => {
    if (completion === 100) return "bg-green-500";
    if (completion >= 80) return "bg-yellow-300";
    if (completion >= 60) return "bg-yellow-100";
    if (completion >= 50) return "bg-red-200";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-600 rounded-lg">
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
        <div
          className={`h-full ${getCompletionColor()}`}
          style={{ width: `${completion}%` }}
        ></div>
      </div>
      <span className="text-lg font-semibold">{completion}%</span>
    </div>
  );
}
