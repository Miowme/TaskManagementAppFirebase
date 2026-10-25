import { Search } from "lucide-react";
import { DeadlineCategory, SortOption } from "@/types/task";
import { useAppSettings } from "@/contexts/AppSettingsContext";

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  priorityFilter: string;
  setPriorityFilter: (p: string) => void;
  deadlineFilter: DeadlineCategory;
  setDeadlineFilter: (d: DeadlineCategory) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
}

export function TaskFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  deadlineFilter,
  setDeadlineFilter,
  sortBy,
  setSortBy,
}: TaskFiltersProps) {
  const { t } = useAppSettings();

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
        >
          <option value="nearest_deadline">Nearest Deadline</option>
          <option value="farthest_deadline">Farthest Deadline</option>
          <option value="priority_high">Highest Priority</option>
          <option value="priority_low">Lowest Priority</option>
          <option value="newest">Newest Created</option>
          <option value="oldest">Oldest Created</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t dark:border-gray-700">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Deadline Filter */}
        <select
          value={deadlineFilter}
          onChange={(e) =>
            setDeadlineFilter(e.target.value as DeadlineCategory)
          }
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
        >
          <option value="all">All Deadlines</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due Today</option>
          <option value="upcoming">Upcoming</option>
          <option value="no_deadline">No Deadline</option>
        </select>
      </div>
    </div>
  );
}
