"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { addTask, getUserTasks, updateTask, deleteTask } from "@/lib/firestore";
import { TaskParams } from "@/types";
import TodoCard from "@/components/shared/TodoCard";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<TaskParams[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskParams | null>(null);
  const [editableTodos, setEditableTodos] = useState([
    { id: 1, text: "", completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Fetch all tasks
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
    if (newTaskTitle) {
      const task: TaskParams = {
        id: new Date().getTime().toString(),
        title: newTaskTitle,
        todos: editableTodos,
        completed: false,
      };

      if (user?.id) {
        await addTask(user.id, task);
        const fetchedTasks = await getUserTasks(user.id);
        setTasks(fetchedTasks);
      }

      setNewTaskTitle("");
      setEditableTodos([{ id: 1, text: "", completed: false }]);
      setIsModalOpen(false);
    }
  };

  const handleUpdateTask = async () => {
    if (user && selectedTask) {
      await updateTask(user.id, selectedTask.id, {
        title: selectedTask.title,
        todos: editableTodos,
        completed: selectedTask.completed,
      });

      const fetchedTasks = await getUserTasks(user.id);
      setTasks(fetchedTasks);

      setIsModalOpen(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (user) {
      await deleteTask(user.id, taskId); // Delete task
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const openModal = (task: TaskParams) => {
    setSelectedTask(task);
    setEditableTodos(task.todos);
    setIsModalOpen(true);
    setIsAddingTask(false); // Indicate editing mode
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <Dialog
          open={isModalOpen && isAddingTask}
          onOpenChange={setIsModalOpen}
        >
          <DialogTrigger asChild>
            <div
              className="bg-blue-5 dark:bg-blue-1 p-4 rounded-lg w-full h-[150px] sm:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[320px] flex-center cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
                setIsAddingTask(true);
                setEditableTodos([{ id: 1, text: "", completed: false }]);
              }}
            >
              <span className="text-xl font-semibold">Add New Task</span>
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <Input
                type="text"
                value={newTaskTitle}
                placeholder="Enter task title..."
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <DialogDescription>
                {editableTodos.map((todo, index) => (
                  <div className="flex items-center gap-2 mb-2" key={todo.id}>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => {
                        const updatedTodos = [...editableTodos];
                        updatedTodos[index].completed =
                          !updatedTodos[index].completed;
                        setEditableTodos(updatedTodos);
                        console.log(todo.completed);
                      }}
                    />
                    <Input
                      type="text"
                      value={todo.text}
                      placeholder="Enter todo..."
                      onChange={(e) => handleTodoChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => setRef(el, index)}
                    />
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleAddTask}>Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>

        {tasks.map((task) => (
          <Dialog
            key={task.id}
            open={isModalOpen && !isAddingTask}
            onOpenChange={setIsModalOpen}
          >
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
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => {
                              const updatedTodos = [...editableTodos];
                              updatedTodos[index].completed =
                                !updatedTodos[index].completed;
                              setEditableTodos(updatedTodos);
                              console.log(todo.completed);
                            }}
                          />
                          <Input
                            type="text"
                            value={todo.text}
                            placeholder="Type a todo..."
                            onChange={(e) => handleTodoChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => setRef(el, index)}
                          />
                        </div>
                      ))}
                    </DialogDescription>
                    <DialogClose>
                      <Button onClick={handleUpdateTask} className="w-full">Save Changes</Button>
                    </DialogClose>
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
