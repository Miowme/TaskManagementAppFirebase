import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isBefore, isToday, isFuture, startOfDay } from "date-fns";
import { Task, DeadlineCategory, SortOption } from "../types/task";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTaskOverdue(task: {
  status: string;
  dueDate: string | null;
}): boolean {
  if (task.status === "completed" || !task.dueDate) return false;
  const due = new Date(task.dueDate);
  const todayStart = startOfDay(new Date());
  return isBefore(due, todayStart);
}

export function isTaskDueToday(dueDate: string | null): boolean {
  if (!dueDate) return false;
  return isToday(new Date(dueDate));
}

export function isTaskUpcoming(dueDate: string | null): boolean {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const todayStart = startOfDay(new Date());
  return isFuture(due) && !isToday(due);
}

export function filterAndSortTasks(
  tasks: Task[],
  searchQuery: string,
  statusFilter: string,
  priorityFilter: string,
  deadlineFilter: DeadlineCategory,
  sortBy: SortOption,
): Task[] {
  return tasks
    .filter((task) => {
      // Search
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      // Priority
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      // Deadline Category
      let matchesDeadline = true;
      if (deadlineFilter === "overdue") matchesDeadline = isTaskOverdue(task);
      else if (deadlineFilter === "today")
        matchesDeadline = isTaskDueToday(task.dueDate);
      else if (deadlineFilter === "upcoming")
        matchesDeadline = isTaskUpcoming(task.dueDate);
      else if (deadlineFilter === "no_deadline")
        matchesDeadline = !task.dueDate;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesDeadline
      );
    })
    .sort((a, b) => {
      const priorityMap = { high: 3, medium: 2, low: 1 };

      switch (sortBy) {
        case "nearest_deadline":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "farthest_deadline":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        case "priority_high":
          return priorityMap[b.priority] - priorityMap[a.priority];
        case "priority_low":
          return priorityMap[a.priority] - priorityMap[b.priority];
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
}
