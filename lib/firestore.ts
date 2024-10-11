import { TaskParams } from "@/types";
import { db } from "./firebase"; 
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";


export const getUserTasksByDay = async (userId: string, date: string) => {
  const tasks: TaskParams[] = [];
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'dailyTasks', date, 'tasks'));
  querySnapshot.forEach((doc) => {
    tasks.push({ ...doc.data(), id: doc.id } as TaskParams);
  });
  return tasks;
};

export const addTask = async (userId: string, date: string, task: TaskParams) => {
  const dailyTasksCollectionRef = collection(db, 'users', userId, 'dailyTasks', date, 'tasks'); 
  const taskDocRef = doc(dailyTasksCollectionRef, task.id);
  await setDoc(taskDocRef, task); 
};

export const updateTask = async (userId: string, date: string, taskId: string, taskData: Partial<TaskParams>) => {
  const taskDocRef = doc(db, 'users', userId, 'dailyTasks', date, 'tasks', taskId);
  await updateDoc(taskDocRef, taskData);
};

// export const updateTask = async (userId: string, date: string, taskId: string, updatedTask: TaskParams) => {
//   const userTasksRef = firestore.collection("users").doc(userId).collection("tasks").doc(date);
//   await userTasksRef.set(
//     {
//       [`tasks.${taskId}`]: updatedTask,
//     },
//     { merge: true }
//   );
// };


export const deleteTask = async (userId: string, date: string, taskId: string) => {
  const taskDocRef = doc(db, 'users', userId, 'dailyTasks', date, 'tasks', taskId);
  await deleteDoc(taskDocRef);
};

