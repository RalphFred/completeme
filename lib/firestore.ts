import { TaskParams } from "@/types";
import { db } from "./firebase"; 
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Get all tasks for a user
export const getUserTasks = async (userId: string) => {
  const tasks: TaskParams[] = [];
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'tasks'));
  querySnapshot.forEach((doc) => {
    tasks.push({ ...doc.data(), id: doc.id } as TaskParams);
  });
  return tasks;
};

// Add a new task
export const addTask = async (userId: string, task: TaskParams) => {
  const taskCollectionRef = collection(db, 'users', userId, 'tasks');
  const taskDocRef = doc(taskCollectionRef, task.id);  // Use task ID
  await setDoc(taskDocRef, task);
};

// Update an existing task
export const updateTask = async (userId: string, taskId: string, taskData: Partial<TaskParams>) => {
  const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskDocRef, taskData);
};

// Delete a task
export const deleteTask = async (userId: string, taskId: string) => {
  const taskDocRef = doc(db, 'users', userId, 'tasks', taskId);
  await deleteDoc(taskDocRef);
};
