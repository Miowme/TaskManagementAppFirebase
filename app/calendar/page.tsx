"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { CreateTaskDTO } from "@/types/task";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const { tasks, loading, createTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleCreate = async (data: CreateTaskDTO) => {
    await createTask(data);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNav onOpenCreateModal={() => setIsModalOpen(true)} />

        <main className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold dark:text-white">
              Monthly Calendar
            </h1>

            {/* Kontrol Navigasi Bulan */}
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-2 rounded-xl border dark:border-gray-700 shadow-sm">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-semibold text-sm min-w-[140px] text-center dark:text-white">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 dark:text-gray-400">
              Loading calendar...
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden">
              {/* Header Hari (Sun - Sat) */}
              <div className="grid grid-cols-7 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-center">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Tanggal */}
              <div className="grid grid-cols-7 auto-rows-fr bg-gray-200 dark:bg-gray-700 gap-[1px]">
                {days.map((day, idx) => {
                  // Cari tugas yang memiliki dueDate pada tanggal ini
                  const dayTasks = tasks.filter((task) => {
                    if (!task.dueDate) return false;
                    return isSameDay(new Date(task.dueDate), day);
                  });

                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={idx}
                      className={`min-h-[110px] p-2 bg-white dark:bg-gray-800 flex flex-col justify-between transition-colors ${
                        !isCurrentMonth
                          ? "opacity-40 bg-gray-50 dark:bg-gray-900/40"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            isToday
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {format(day, "d")}
                        </span>
                      </div>

                      {/* Daftar Task pada Tanggal Tersebut */}
                      <div className="flex-1 mt-2 space-y-1 overflow-y-auto max-h-[80px]">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`text-[11px] px-2 py-1 rounded truncate font-medium ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 line-through"
                                : task.priority === "high"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                            }`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
