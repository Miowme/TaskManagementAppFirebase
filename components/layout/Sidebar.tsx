"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Calendar, Settings } from "lucide-react";
import { useAppSettings } from "@/contexts/AppSettingsContext";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useAppSettings();

  const navItems = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/tasks", label: t("tasks"), icon: CheckSquare },
    { href: "/calendar", label: t("calendar"), icon: Calendar },
    { href: "/settings", label: t("settings") || "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden md:flex flex-col">
      <div className="p-6 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          TaskMaster
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
