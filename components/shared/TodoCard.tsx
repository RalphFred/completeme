import { TaskParams } from "@/types";
import { Checkbox } from "../ui/checkbox";

interface TodoCardProps {
  task?: TaskParams;
  onClick?: () => void;
}

function getCompletionStatus(todos: { completed: boolean }[]) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const completionPercentage = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;

  let bgColor;
  if (completionPercentage === 100) {
    bgColor = "bg-green-200"; // Green for 100% completed
  } else if (completionPercentage >= 80) {
    bgColor = "bg-yellow-200"; // Yellow for 80% or more
  } else if (completionPercentage < 50) {
    bgColor = completionPercentage === 0 ? "bg-red-400" : "bg-red-200"; // Light red for below 50%, darker red for 0%
  } else {
    bgColor = "bg-yellow-100"; // Neutral color for in-between cases
  }

  return { completionPercentage, bgColor };
}



export default function TodoCard({ task, onClick }: TodoCardProps) {

  const { completionPercentage, bgColor } = task
    ? getCompletionStatus(task.todos)
    : { completionPercentage: 0, bgColor: "bg-gray-200" };

  return (
    <div
      className="bg-blue-5 dark:bg-blue-1 h-[150px] p-4 rounded-lg w-full sm:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[320px] cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-xl font-semibold mb-2 truncate">{task?.title}</h1>
      <div className="space-y-2">
        {task?.todos.slice(0, 2).map((todo) => (
          <div className="flex gap-4 items-center" key={todo.id}>
            <Checkbox checked={todo.completed} />
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              } truncate`}
            >
              {todo.text || "Untitled Todo"}
            </span>
          </div>
        ))}
        <div className="flex-between">
          {task && task.todos.length > 2 && (
            <div className="text-sm text-gray-500">
              + {task.todos.length - 2} more
            </div>
          )}
          <div className={`dark:text-black text-xs px-2 py-1 rounded-full ${bgColor}`}>
          {completionPercentage}% done
          </div>
        </div>
      </div>
    </div>
  );
}
