"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { filterAndSortTasks } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import {
  DeadlineCategory,
  SortOption,
  Task,
  CreateTaskDTO,
} from "@/types/task";

export default function TasksPage() {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineCategory>("all");
  const [sortBy, setSortBy] = useLocalStorage<SortOption>(
    "task_sort_preference",
    "nearest_deadline",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = filterAndSortTasks(
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    deadlineFilter,
    sortBy,
  );

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (data: CreateTaskDTO) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNav onOpenCreateModal={handleOpenCreate} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Task Management</h1>

          <TaskFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            deadlineFilter={deadlineFilter}
            setDeadlineFilter={setDeadlineFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {loading ? (
            <p className="text-center py-8">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleOpenEdit}
              onDelete={deleteTask}
              onStatusChange={(id, status) => updateTask(id, { status })}
            />
          )}
        </main>
      </div>

      <TaskFormModal
        key={editingTask ? editingTask.id : "new"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitForm}
        initialTask={editingTask}
      />
    </div>
  );
}
