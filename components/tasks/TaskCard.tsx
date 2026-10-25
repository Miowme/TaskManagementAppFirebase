"use client";

import React from "react";
import { Task } from "@/types/task";
import { isTaskOverdue, isTaskDueToday, isTaskUpcoming } from "@/lib/utils";
import { Calendar, Trash2, Edit } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const overdue = isTaskOverdue(task);
  const dueToday = isTaskDueToday(task.dueDate);
  const upcoming = isTaskUpcoming(task.dueDate);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold dark:text-white">{task.title}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full uppercase font-bold ${
            task.priority === "high"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div className="flex items-center text-xs space-x-2">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
          {overdue && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px]">
              Overdue
            </span>
          )}
          {dueToday && (
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[10px]">
              Due Today
            </span>
          )}
          {upcoming && (
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-[10px]">
              Upcoming
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t dark:border-gray-700">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          className="text-xs p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:text-blue-500 text-gray-500"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 hover:text-red-500 text-gray-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
