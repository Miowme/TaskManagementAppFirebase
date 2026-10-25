"use client";

import { Sun, Moon, Globe } from "lucide-react";
import { useAppSettings } from "@/contexts/AppSettingsContext";

interface TopNavProps {
  onOpenCreateModal: () => void;
}

export function TopNav({ onOpenCreateModal }: TopNavProps) {
  const { theme, toggleTheme, language, setLanguage, t } = useAppSettings();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        {/* TopNav bisa menampung judul halaman atau indikator cepat */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === "en" ? "id" : "en")}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{language}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-400" />
          )}
        </button>

        {/* Create Task Button */}
        <button
          onClick={onOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + {t("createTask")}
        </button>
      </div>
    </header>
  );
}
