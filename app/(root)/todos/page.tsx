"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { addTask, getUserTasks, updateTask, deleteTask } from "@/lib/firestore";
import { TaskParams } from "@/types";
import TodoCard from "@/components/shared/TodoCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 

export default function page() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<TaskParams[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskParams | null>(null);
  const [editableTodos, setEditableTodos] = useState([
    { id: 1, text: "", completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const fetchedTasks = await getUserTasks(user.id);
        setTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const task: TaskParams = {
        title: newTask,
        completed: false,
        priority: "Medium",
        dueDate: "Today",
      };

      if (user?.id) {
        await addTask(user.id, task);
        const fetchedTasks = await getUserTasks(user.id);
        setTasks(fetchedTasks);
      }

      setNewTask("");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (user) {
      await deleteTask(user.id, taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const openModal = (task: TaskParams) => {
    setSelectedTask(task);
    setEditableTodos([
      { id: 1, text: task.title ?? "", completed: task.completed ?? false }
    ]);
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" && index === editableTodos.length - 1) {
      e.preventDefault();
      setEditableTodos((prev) => [
        ...prev,
        { id: prev.length + 1, text: "", completed: false },
      ]);

      setTimeout(() => {
        const newIndex = inputRefs.current.length - 1;
        inputRefs.current[newIndex]?.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      editableTodos[index].text === "" &&
      editableTodos.length > 1
    ) {
      e.preventDefault();
      setEditableTodos((prev) => prev.filter((_, i) => i !== index));
      if (index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 0);
      }
    }
  };

  const handleTodoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTodos = [...editableTodos];
    newTodos[index].text = e.target.value;
    setEditableTodos(newTodos);
  };

  const setRef = (el: HTMLInputElement | null, index: number) => {
    if (el) {
      inputRefs.current[index] = el;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-wrap gap-4 justify-between">
        {tasks.map((task) => (
          <Dialog key={task.id} open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <div onClick={() => openModal(task)}>
                <TodoCard task={task} />
              </div>
            </DialogTrigger>
            <DialogContent>
              {selectedTask && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex-between mb-4">
                      <div>{selectedTask.title}</div>
                      <div>Edit</div>
                    </DialogTitle>
                    <DialogDescription>
                      {editableTodos.map((todo, index) => (
                        <div
                          className="flex items-center gap-2 mb-2"
                          key={todo.id}
                        >
                          <Checkbox checked={todo.completed} />
                          <Input
                            type="text"
                            value={todo.text}
                            placeholder="Type a task..."
                            onChange={(e) => handleTodoChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => setRef(el, index)}
                          />
                        </div>
                      ))}
                    </DialogDescription>
                  </DialogHeader>
                </>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
