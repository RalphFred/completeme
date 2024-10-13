"use client"
import { useState, useEffect } from "react";
import { TaskParams } from "@/types";
import { getUserTasks } from "@/lib/firestore";
import { useUser } from "@clerk/nextjs";
import OverallCompletion from "@/components/shared/OverallCompletion";
import StatisticsOverview from "@/components/shared/StatsOverview";

export default function page() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<TaskParams[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const fetchedTasks = await getUserTasks(user.id);
        setTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Overall Task Completion</h1>
      <OverallCompletion tasks={tasks} />
      <StatisticsOverview tasks={tasks} />
    </div>
  );
}
