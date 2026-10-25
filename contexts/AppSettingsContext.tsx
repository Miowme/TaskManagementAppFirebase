"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Theme = "light" | "dark";
type Language = "en" | "id";

interface AppSettingsContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    tasks: "Tasks",
    calendar: "Calendar",
    totalTasks: "Total Tasks",
    todo: "To Do",
    inProgress: "In Progress",
    completed: "Completed",
    overdue: "Overdue",
    createTask: "Create Task",
    searchPlaceholder: "Search tasks...",
    allStatuses: "All Statuses",
    allPriorities: "All Priorities",
    allDeadlines: "All Deadlines",
    sortBy: "Sort By",
    noTasksFound: "No tasks found",
    actions: "Actions",
    confirmDelete: "Are you sure you want to delete this task?",
  },
  id: {
    dashboard: "Dasbor",
    tasks: "Tugas",
    calendar: "Kalender",
    totalTasks: "Total Tugas",
    todo: "Belum Selesai",
    inProgress: "Sedang Dikerjakan",
    completed: "Selesai",
    overdue: "Terlambat",
    createTask: "Buat Tugas",
    searchPlaceholder: "Cari tugas...",
    allStatuses: "Semua Status",
    allPriorities: "Semua Prioritas",
    allDeadlines: "Semua Tenggat",
    sortBy: "Urutkan",
    noTasksFound: "Tidak ada tugas ditemukan",
    actions: "Aksi",
    confirmDelete: "Apakah Anda yakin ingin menghapus tugas ini?",
  },
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(
  undefined,
);

export function AppSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorage<Theme>("app_theme", "light");
  const [language, setLanguage] = useLocalStorage<Language>(
    "app_language",
    "en",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppSettingsContext.Provider
      value={{ theme, language, toggleTheme, setLanguage, t }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error(
      "useAppSettings must be used within an AppSettingsProvider",
    );
  }
  return context;
}
