import { TaskParams } from "@/types";
import { Checkbox } from "../ui/checkbox";

interface TodoCardProps {
  task?: TaskParams;
  onClick?: () => void;
}

export default function TodoCard({ task, onClick }: TodoCardProps) {
  return (
    <div
      className="bg-blue-5 dark:bg-blue-1 p-4 rounded-lg w-full sm:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[320px] cursor-pointer"
      onClick={onClick}
    >
      <h1 className="text-xl font-semibold mb-2 truncate">{task?.title}</h1> {/* Truncate long titles */}
      <div className="space-y-2">
        {task?.todos.slice(0, 2).map((todo) => ( /* Preview up to 3 todos */
          <div className="flex gap-4 items-center" key={todo.id}>
            <Checkbox
              checked={todo.completed}
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              } truncate`} 
            >
              {todo.text || "Untitled Todo"}
            </span>
          </div>
        ))}
        {task && task.todos.length > 2 && (
          <div className="text-sm text-gray-500">
            + {task.todos.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}
