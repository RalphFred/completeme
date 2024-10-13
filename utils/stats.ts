import { TaskParams } from "@/types";

export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getTasksStats = (tasks: TaskParams[]) => {
  const today = getTodayDate();
  const completedToday = tasks.filter(
    (task) => task.todos.some((todo) => todo.completed && task.title === today)
  ).length;

  const completedThisWeek = tasks.filter(
    (task) =>
      task.todos.filter(
        (todo) => todo.completed && task.title >= today
      ).length >= 7
  ).length;

  const completedThisMonth = tasks.filter(
    (task) =>
      task.todos.filter(
        (todo) => todo.completed && task.title.substring(0, 7)
      ).length
  ).length;

  return { completedToday, completedThisWeek, completedThisMonth };
};
