"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { isTaskOverdue } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  AlertCircle,
  ListTodo,
} from "lucide-react";
import { CreateTaskDTO, Task } from "@/types/task";

export default function DashboardPage() {
  const { tasks, loading, createTask } = useTasks();
  const { t } = useAppSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading)
    return <div className="p-12 text-center">Loading dashboard...</div>;

  const total = tasks.length;
  const todo = tasks.filter((tk) => tk.status === "todo").length;
  const inProgress = tasks.filter((tk) => tk.status === "in_progress").length;
  const completed = tasks.filter((tk) => tk.status === "completed").length;
  const overdue = tasks.filter((tk) => isTaskOverdue(tk)).length;

  const handleCreate = async (data: CreateTaskDTO) => {
    await createTask(data);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNav onOpenCreateModal={() => setIsModalOpen(true)} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">{t("dashboard")}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title={t("totalTasks")}
              value={total}
              icon={LayoutDashboard}
              colorClass="text-blue-600"
            />
            <StatCard
              title={t("todo")}
              value={todo}
              icon={ListTodo}
              colorClass="text-gray-600"
            />
            <StatCard
              title={t("inProgress")}
              value={inProgress}
              icon={Clock}
              colorClass="text-amber-600"
            />
            <StatCard
              title={t("completed")}
              value={completed}
              icon={CheckCircle}
              colorClass="text-green-600"
            />
            <StatCard
              title={t("overdue")}
              value={overdue}
              icon={AlertCircle}
              colorClass="text-red-600"
            />
          </div>
        </main>
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
