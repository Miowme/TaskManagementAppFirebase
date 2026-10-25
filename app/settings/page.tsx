"use client";

import { useState } from "react";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { CreateTaskDTO } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

export default function SettingsPage() {
  const { theme, toggleTheme, language, setLanguage } = useAppSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createTask } = useTasks();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNav onOpenCreateModal={() => setIsModalOpen(true)} />
        <main className="p-6 space-y-6 max-w-xl">
          <h1 className="text-2xl font-bold">Settings</h1>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Theme Mode</h3>
                <p className="text-sm text-gray-500">Current theme: {theme}</p>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Toggle Theme
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
              <div>
                <h3 className="font-semibold">Language</h3>
                <p className="text-sm text-gray-500">
                  Current language: {language.toUpperCase()}
                </p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "id")}
                className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
              >
                <option value="en">English</option>
                <option value="id">Indonesian</option>
              </select>
            </div>
          </div>
        </main>
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (d) => {
          await createTask(d);
        }}
      />
    </div>
  );
}
