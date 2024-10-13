import { TaskParams } from "@/types";

export const calculateOverallCompletion = (tasks: TaskParams[]) => {
  if (tasks.length === 0) return 0;
  
  const totalTodos = tasks.reduce((sum, task) => sum + task.todos.length, 0);
  const completedTodos = tasks.reduce(
    (sum, task) => sum + task.todos.filter((todo) => todo.completed).length,
    0
  );

  return Math.round((completedTodos / totalTodos) * 100);
};
