export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";
export type DeadlineCategory =
  | "all"
  | "overdue"
  | "today"
  | "upcoming"
  | "no_deadline";
export type SortOption =
  | "nearest_deadline"
  | "farthest_deadline"
  | "priority_high"
  | "priority_low"
  | "newest"
  | "oldest";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDTO = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
