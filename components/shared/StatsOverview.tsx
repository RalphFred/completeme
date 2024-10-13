import { TaskParams } from "@/types";
import { getTasksStats } from "@/utils/stats";

interface StatisticsOverviewProps {
  tasks: TaskParams[];
}

export default function StatisticsOverview({ tasks }: StatisticsOverviewProps) {
  const { completedToday, completedThisWeek, completedThisMonth } = getTasksStats(
    tasks
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
      <div className="space-y-2">
        <div>Tasks Completed Today: {completedToday}</div>
        <div>Tasks Completed This Week: {completedThisWeek}</div>
        <div>Tasks Completed This Month: {completedThisMonth}</div>
      </div>
    </div>
  );
}
