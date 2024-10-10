import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase"; // Import the Firestore instance


export const getUserTasks = async (userId: any) => {
  const tasksCollection = collection(firestore, `users/${userId}/tasks`);
  const taskSnapshot = await getDocs(tasksCollection);
  const tasksList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return tasksList;
};

export const addTask = async (userId: any, task: any) => {
  const tasksCollection = collection(firestore, `users/${userId}/tasks`);
  await addDoc(tasksCollection, task);
};

export const updateTask = async (userId: any, taskId: string, updatedData: any) => {
  const taskDoc = doc(firestore, `users/${userId}/tasks`, taskId);
  await updateDoc(taskDoc, updatedData);
};

export const deleteTask = async (userId: any, taskId: string) => {
  const taskDoc = doc(firestore, `users/${userId}/tasks`, taskId);
  await deleteDoc(taskDoc);
};
