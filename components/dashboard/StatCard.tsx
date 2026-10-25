import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  colorClass = "text-blue-600",
}: StatCardProps) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-3xl font-bold mt-1 dark:text-white">{value}</p>
      </div>
      <div
        className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${colorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
