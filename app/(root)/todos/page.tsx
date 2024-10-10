"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs'; 
import { addTask, getUserTasks, updateTask, deleteTask } from '@/lib/firestore';  
import { TaskParams } from '@/types';
import TodoCard from '@/components/shared/TodoCard';

export default function page() {

  const { user } = useUser(); 
  const [tasks, setTasks] = useState<TaskParams[]>([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const fetchedTasks: TaskParams[] = await getUserTasks(user.id);
        setTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await addTask(user?.id, { title: newTask, completed: false, priority: 'Medium', dueDate: 'Today' });
      setNewTask('');
      const fetchedTasks: TaskParams[] = await getUserTasks(user?.id);
      setTasks(fetchedTasks);  
    }
  };

  const handleDeleteTask = async (taskId: string ) => {
    await deleteTask(user?.id, taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div className='p-4 lg:p-8'>
      <div className="flex flex-wrap gap-4 justify-between">
      <TodoCard />
      <TodoCard />
      <TodoCard />
      </div>
    </div>
  );
}