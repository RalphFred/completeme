"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addTask,
  getUserTasksByDay,
  updateTask,
  deleteTask,
} from "@/lib/firestore";
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
import { format } from "date-fns";

export default function Page() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<TaskParams[]>([]);
  const [newTask, setNewTask] = useState<TaskParams[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskParams | null>(null);
  const [editableTodos, setEditableTodos] = useState([
    { id: 1, text: "", completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const today = format(new Date(), "dd-MM-yyyy");

  // Fetch tasks for today by default
  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const fetchedTasks = await getUserTasksByDay(user.id, today); // Fetch tasks for today
        setTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, [user, today]);

  const handleAddTask = async () => {
    if (newTask) {
      const task: TaskParams = {
        id: new Date().getTime().toString(),
        completed: false,
        dueDate: today, 
      };

      if (user?.id) {
        await addTask(user.id, today, task); // Add task for today's date
        const fetchedTasks = await getUserTasksByDay(user.id, today);
        setTasks(fetchedTasks);
      }

      setNewTask("");
      setIsModalOpen(false); // Close the dialog after adding
    }
  };

  const handleUpdateTask = async () => {
    if (user && selectedTask) {
      for (let i = 0; i < editableTodos.length; i++) {
        const todo = editableTodos[i];
  
        const updatedTask: TaskParams = {
          ...selectedTask,
          id: todo.id.toString(),  
          title: todo.text,
          completed: todo.completed,
        };
  
      
        await updateTask(user.id, today, updatedTask.id || "", updatedTask);
      }
  
      const fetchedTasks = await getUserTasksByDay(user.id, today);
      setTasks(fetchedTasks);
  
      setIsModalOpen(false);
    }
  };
  
  

  const handleDeleteTask = async (taskId: string) => {
    if (user) {
      await deleteTask(user.id, today, taskId); // Delete task for today's date
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const openModal = (task: TaskParams) => {
    setSelectedTask(task);
    setEditableTodos([
      { id: 1, text: task.title ?? "", completed: task.completed ?? false },
    ]);
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
              <DialogTitle>{today}</DialogTitle> {/* Show the current date */}
              <DialogDescription>
                {/* Map over editableTodos to show input and checkbox for the new task */}
                {editableTodos.map((todo, index) => (
                  <div className="flex items-center gap-2 mb-2" key={todo.id}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => {
                        const updatedTodos = [...editableTodos];
                        updatedTodos[index].completed =
                          !updatedTodos[index].completed;
                        setEditableTodos(updatedTodos);
                      }}
                    />
                    <Input
                      type="text"
                      value={todo.text}
                      placeholder="Enter task title..."
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
                      <div>{selectedTask.dueDate}</div>
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
                    <Button onClick={handleUpdateTask}>Save Changes</Button>
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
