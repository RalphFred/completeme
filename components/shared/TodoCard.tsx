import { TaskParams } from "@/types";

interface TodoCardProps {
  task?: TaskParams;
  onClick?: () => void;
}


export default function TodoCard({ task, onClick }: TodoCardProps) {
  return (
    <div className="bg-blue-5 dark:bg-blue-1 p-4 rounded-lg h-[150px] w-full sm:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[320px]" onClick={onClick}>
      <h1 className="text-xl font-semibold mb-4">{task?.dueDate}</h1>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>Finish building contactME</span>
      </div>
    </div>
  );
}
