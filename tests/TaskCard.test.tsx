import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Task } from "@/types/task";

const mockTask: Task = {
  id: "1",
  title: "Test Task Title",
  description: "Test Task Description",
  status: "todo",
  priority: "high",
  dueDate: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TaskCard Component", () => {
  test("renders task title and priority badge", () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onStatusChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Test Task Title")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    const handleDelete = jest.fn();
    render(
      <TaskCard
        task={mockTask}
        onEdit={jest.fn()}
        onDelete={handleDelete}
        onStatusChange={jest.fn()}
      />,
    );

    const deleteBtn = screen.getByRole("button", { name: "" });
    fireEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith("1");
  });
});
