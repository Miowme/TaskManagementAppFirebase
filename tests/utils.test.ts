import { isTaskOverdue } from "../lib/utils";

describe("isTaskOverdue", () => {
  test("returns true for an incomplete task with a past deadline", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const result = isTaskOverdue({
      status: "todo",
      dueDate: yesterday.toISOString(),
    });
    expect(result).toBe(true);
  });

  test("returns false for a completed task even if past deadline", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const result = isTaskOverdue({
      status: "completed",
      dueDate: yesterday.toISOString(),
    });
    expect(result).toBe(false);
  });

  test("returns false for a task without a deadline", () => {
    const result = isTaskOverdue({
      status: "todo",
      dueDate: null,
    });
    expect(result).toBe(false);
  });
});
