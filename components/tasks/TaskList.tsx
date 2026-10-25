import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed dark:border-gray-700 rounded-xl">
        <p className="text-gray-500 dark:text-gray-400">
          No tasks found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
