import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "../types/task";

const COLLECTION_NAME = "tasks";

export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "",
        description: data.description || "",
        status: data.status || "todo",
        priority: data.priority || "medium",
        dueDate: data.dueDate || null,
        createdAt: data.createdAt?.toDate?.()
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString(),
      } as Task;
    });
    callback(tasks);
  });
};

export const createTask = async (dto: CreateTaskDTO) => {
  return await addDoc(collection(db, COLLECTION_NAME), {
    ...dto,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateTask = async (id: string, dto: UpdateTaskDTO) => {
  const taskRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(taskRef, {
    ...dto,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTask = async (id: string) => {
  const taskRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(taskRef);
};
