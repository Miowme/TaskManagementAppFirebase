import { useEffect, useState } from "react";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types/task";
import {
  subscribeToTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../lib/taskservice";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // setLoading(true); // Dihapus karena state sudah diinisialisasi true di atas
    const unsubscribe = subscribeToTasks((fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async (dto: CreateTaskDTO) => {
    try {
      await createTask(dto);
    } catch (err) {
      setError("Failed to create task");
      throw err;
    }
  };

  const handleUpdate = async (id: string, dto: UpdateTaskDTO) => {
    try {
      await updateTask(id, dto);
    } catch (err) {
      setError("Failed to update task");
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (err) {
      setError("Failed to delete task");
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask: handleCreate,
    updateTask: handleUpdate,
    deleteTask: handleDelete,
  };
}
